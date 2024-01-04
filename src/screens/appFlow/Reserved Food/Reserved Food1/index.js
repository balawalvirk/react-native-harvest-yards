import React, { useEffect, useState, useRef, useMemo } from 'react';
import { ScrollView, Image, View, Text, Linking, TouchableOpacity, SafeAreaView, Platform, Alert } from 'react-native';
import { appStyles } from '../../../../services/utilities/appStyles';
import Header from '../../../../components/Headers';
import Button from '../../../../components/Button';
import DatePickerInput from '../../../../components/DatePickerInput';
import { scale } from 'react-native-size-matters';
import { requestStoragePermission } from '../../../../services/utilities/permission'
import { HelpCallout, LeftButton, arrowrightwhite, calendar } from '../../../../services/utilities/assets';
import {
    responsiveHeight,
    responsiveWidth,
} from 'react-native-responsive-dimensions';
import Toast from 'react-native-toast-message';
import CardView from '../../../../components/CardView';
import QRcodeModal from '../../../../components/Modal/QR Code Modal';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { HelpCalloutModal } from '../../../../components/Modal/Tip Modal';
import { QRCode } from 'react-native-qrcode-svg';
import RNFetchBlob from 'rn-fetch-blob';
import { createOrder, firestoreCollections, roundToDecimal, useFirebaseAuth, useLocation } from '../../../../services';
import { Loaders } from '../../../../components';
import moment from 'moment';

const ReservedFood1 = ({ route, navigation }) => {

    const { user } = useFirebaseAuth()

    const [selectedDate, setSelectedDate] = useState('');
    const [isQRModalVisible, setIsQRModalVisible] = useState(false);
    const [isHelpCalloutModalVisible, setHelpCalloutModalVisible] = useState(false);
    const [companyData, setCompanyData] = useState({});
    const [qrCodeValue, setQRCodeValue] = useState('');
    const [reservedFoodArray, setReservedFoodArray] = useState([]);
    const [isFromReservedFavourite, setIsFromReservedFavourite] = useState(false); // State to track the source
    const [loadingReserveFood, setLoadingReserveFood] = useState(false); // State to track the source

    const { currentLocation, calculateDistance } = useLocation()

    const { item, userId } = route.params;
    const distributorId = item?.id || ''
    console.log('distributer Item: ', item)

    const distributorDetails = useMemo(() => companyData || item, [companyData])

    const { latitude, longitude } = item
    const location = latitude && longitude ? { latitude, longitude } : null
    const distance = currentLocation && location ? calculateDistance(location) : null
    const distanceInDecimal = distance ? roundToDecimal(distance, 2) : null
    const distanceInKm = distanceInDecimal ? distanceInDecimal + ' km away' : ''


    useEffect(() => {

        const distrubuterDocumentRef = firestore().collection(firestoreCollections.distributors).doc(distributorId);

        const unsubscribe = distrubuterDocumentRef.onSnapshot(
            (documentSnapshot) => {
                if (documentSnapshot.exists) {
                    setCompanyData(documentSnapshot.data());
                    const availableMeals = documentSnapshot.data()?.availableMeals; // Adjust the field name if needed
                    console.log('Available meals:', availableMeals);
                } else {
                    console.log('Organization document not found for id:', distributorId);
                }
            },
            (error) => {
                console.error('Error fetching company data:', error);
            }
        );

        return () => unsubscribe(); // Unsubscribe when the component unmounts

    }, [distributorId]);

    // useEffect(() => {

    //     const fetchCompanyData = async () => {
    //         try {
    //             const { userId } = route.params; // Get the userId passed from FindFood

    //             const organizationDoc = await firestore().collection('distributors').doc(userId).get();

    //             if (organizationDoc.exists) {
    //                 setCompanyData(organizationDoc.data());
    //                 // Fetch available meals for the organization
    //                 const availableMeals = distributorDetails.availableMeals; // Adjust the field name if needed
    //                 console.log('Available meals:', availableMeals);
    //             } else {
    //                 console.log('Organization document not found for UserID:', userId);
    //             }
    //         } catch (error) {
    //             console.error('Error fetching company data:', error);
    //         }
    //     };

    //     fetchCompanyData();
    // }, [route.params]);

    useEffect(() => {
        // Check if the component was accessed from Reserved favorites
        if (route.params?.source === 'ReservedFavorites') {
            setIsFromReservedFavourite(true);
        } else {
            setIsFromReservedFavourite(false);
        }
        const fetchCompanyData = async () => {
            try {
                const { organizationId } = route.params; // Get the organizationId passed from Reservedfavorites

                const organizationDoc = await firestore().collection('distributors').doc(organizationId).get();

                if (organizationDoc.exists) {
                    const distributorDetails = organizationDoc.data();
                    setCompanyData(distributorDetails);

                    // Fetch available meals for the organization
                    const availableMeals = distributorDetails.availableMeals; // Adjust the field name if needed
                    console.log('Available meals:', availableMeals);
                    // Update state or perform necessary operations with available meals data
                } else {
                    console.log('Organization document not found for OrganizationID:', organizationId);
                }
            } catch (error) {
                console.error('Error fetching company data:', error);
            }
        };

        fetchCompanyData();
    }, [route.params]);

    const toggleModal = () => {
        setIsQRModalVisible(!isQRModalVisible);
    };

    const handleLinkPress = () => {
        const url = 'http://www.google.com';
        Linking.openURL(url)
            .then((supported) => {
                if (!supported) {
                    console.error('Unable to open URL');
                }
            })
            .catch((err) => console.error(err));
    };
    const fetchUserData = async (userId) => {
        try {
            const userDoc = await firestore().collection('users').doc(userId).get();
            if (userDoc.exists) {
                const userData = userDoc.data();

                return {
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                };
            } else {
                console.log('User document not found');
                return null;
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
            return null;
        }
    };
    // const addReservedFoodToOrdersCollection = async (userId, item, userData, qrCodeValue) => {
    //     try {
    //         const userDocRef = firestore().collection('users').doc(userId);

    //         const reservedFoodEntry = {
    //             profileImage: item.profileImage,
    //             organization: item.organization,
    //             address: item.address,
    //             reservationDate: selectedDate,
    //             qrCodeValue: qrCodeValue,
    //         };

    //         // Fetch the existing reservedFood array from the user document
    //         const userDoc = await userDocRef.get();
    //         const existingReservedFood = userDoc.data()?.reservedFood || [];

    //         // Check if there is an exact match for the reservation entry in the array
    //         const isExistingReservation = existingReservedFood.find(
    //             (reservation) =>
    //                 reservation.organization === reservedFoodEntry.organization &&
    //                 reservation.address === reservedFoodEntry.address &&
    //                 reservation.reservationDate === reservedFoodEntry.reservationDate &&
    //                 reservation.qrCodeValue === reservedFoodEntry.qrCodeValue
    //         );

    //         if (isExistingReservation) {
    //             console.log('Reservation already exists for this entry');
    //             // Handle if the reservation already exists, e.g., show a message or perform necessary actions
    //             return;
    //         }

    //         // Add the new reserved food entry to the existing reservedFood array
    //         const updatedReservedFood = [...existingReservedFood, reservedFoodEntry];

    //         // Update the user document with the updated reservedFood array
    //         await userDocRef.update({
    //             reservedFood: updatedReservedFood,
    //         });
    //         // Add data to the reserved_orders collection
    //         const reservedOrderRef = firestore().collection('reserved_orders').doc(userId);
    //         const reservedOrderSnapshot = await reservedOrderRef.get();

    //         if (reservedOrderSnapshot.exists) {
    //             reservedOrderRef.update({
    //                 reservations: firestore.FieldValue.arrayUnion({
    //                     userId: userId,
    //                     firstName: userData.firstName,
    //                     lastName: userData.lastName,
    //                     reservationDate: selectedDate,
    //                     qrCodeValue: qrCodeValue,
    //                 }),
    //             });
    //         } else {
    //             reservedOrderRef.set({
    //                 reservations: [{
    //                     userId: userId,
    //                     firstName: userData.firstName,
    //                     lastName: userData.lastName,
    //                     reservationDate: selectedDate,
    //                     qrCodeValue: qrCodeValue,
    //                 }],
    //             });
    //         }
    //         console.log('Reserved food added to user document and reserved_orders collection successfully!');
    //     } catch (error) {
    //         console.error('Error adding reserved food information:', error);
    //         Alert.alert('Error', 'Failed to add reserved food information.');
    //     }
    // };

    const handleReserveFoodValidation = () => {
        if (!selectedDate) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Reservation Date is required',
            });
        }
        if (!distributorDetails?.availableMeals) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'No meal available',
            });
        }
        // console.log('selectedDate: ', selectedDate)
        // console.log('distributorDetails?.availableMeals: ', distributorDetails?.availableMeals)
        // console.log('user: ', user?.uid)

        if (selectedDate && distributorDetails?.availableMeals && user) {
            return true
        }
    }

    const handleReserveFood = async () => {
        try {
            if (handleReserveFoodValidation()) {
                setLoadingReserveFood(true)
                const _reservationDate = selectedDate
                //const _reservationDate = moment(selectedDate).format('YYYY-MM-DD')
                // Calculate the start and end timestamps for the given date
                const startOfDay = new Date(_reservationDate);
                startOfDay.setHours(0, 0, 0, 0);

                const endOfDay = new Date(_reservationDate);
                endOfDay.setHours(23, 59, 59, 999);

                console.log('_reservationDate: ', _reservationDate)

                const ordersCollectionRef = firestore().collection('orders').where('userId', '==', user?.uid);
                const ordersCollectionCheckDistributerRef = ordersCollectionRef.where('distributorId', '==', distributorDetails?.id);

                // Query to check if a document with the same reservationDate already exists
                const existingDocumentQuery = ordersCollectionCheckDistributerRef
                    .where('reservationDate', '>=', startOfDay)
                    .where('reservationDate', '<=', endOfDay);

                //const existingDocumentQuery = ordersCollectionRef.where('reservationDate', '==', _reservationDate);

                await existingDocumentQuery.get().then(async (querySnapshot) => {
                    if (!querySnapshot.empty) {
                        // Document with the same reservationDate already exists
                        const errorMessage = 'Reservation with the same date already exists.'
                        console.log(errorMessage);
                        Toast.show({
                            type: 'error',
                            text1: 'Error',
                            text2: errorMessage,
                        });
                    } else {
                        //console.log('Create Order')
                        await createOrder({
                            userId: user.uid,
                            distributorId: distributorDetails.id,
                            reservationDate: selectedDate
                        }).then(res => {
                            if (res) {
                                const qrValue = res?.id;
                                setQRCodeValue(qrValue);
                                setIsQRModalVisible(true);
                            }
                        })
                    }
                })


                setLoadingReserveFood(false)
            }
        } catch (error) {
            console.error('Error adding reserved food information:', error);
            setLoadingReserveFood(false)
        }
    };

    // const handleQR = async (item) => {
    //     try {
    //         if (!selectedDate) {
    //             Toast.show({
    //                 type: 'error',
    //                 text1: 'Error',
    //                 text2: 'Reservation Date is required',
    //             });
    //             return;
    //         }
    //         const currentUser = auth().currentUser;
    //         const userId = currentUser ? currentUser.uid : null;

    //         if (!userId) {
    //             console.error('User ID not found');
    //             return;
    //         }

    //         const qrValue = `${userId}`;
    //         setQRCodeValue(qrValue);

    //         setIsQRModalVisible(true);

    //         const userData = await fetchUserData(userId);

    //         if (userData) {
    //             await addReservedFoodToOrdersCollection(userId, item, userData, qrValue);
    //         } else {
    //             console.error('User data not found');
    //         }
    //     } catch (error) {
    //         console.error('Error adding reserved food information:', error);
    //     }
    // };



    const handleDateChange = date => {
        setSelectedDate(date);
    };



    const saveImageToGallery = async (imageUri) => {
        console.log('Image URI:', imageUri);
        if (!imageUri) {
            throw new Error('Image URI is null or undefined');
        }

        try {
            const permissionGranted = await requestStoragePermission();
            if (permissionGranted) {
                const { config, fs } = RNFetchBlob;
                const isIOS = Platform.OS === 'ios';
                const imageLocation = isIOS ? imageUri : `file://${imageUri}`;

                const response = await config({
                    fileCache: true,
                    appendExt: 'jpg',
                }).fetch('GET', imageLocation);

                const imagePath = isIOS ? fs.dirs.DocumentDir : fs.dirs.DCIMDir;
                const imageName = `IMG_${new Date().getTime()}.jpg`;

                await fs.cp(response.path(), `${imagePath}/${imageName}`);
                await fs.scanFile([{ path: `${imagePath}/${imageName}`, mime: 'image/jpeg' }]);

                console.log('Image saved to gallery successfully!');
                Alert.alert('Success', 'Image saved to gallery!');
            } else {
                // Handle denied permission case
                Alert.alert('Permission Denied', 'Storage permission required.');
            }
        } catch (error) {
            console.error('Error saving image to gallery:', error);
            Alert.alert('Error', 'Failed to save image to gallery.');
        }
    };

    return (
        <SafeAreaView style={appStyles.container}>
            <Header
                imageSource={LeftButton}
                headerText="Reserve Food"
                showImage={true}
                onPress={() => navigation.goBack()}
                customTextMarginLeft={responsiveWidth(26)}
                marginleft={-responsiveWidth(2)}
            />
            <ScrollView>
                <CardView
                    customMarginTop={responsiveHeight(1)}
                    source={{ uri: distributorDetails.profileImage }}
                    title={distributorDetails.organization}
                    description={distributorDetails.address}
                    Availabletxt={`${distributorDetails.availableMeals !== undefined ? distributorDetails.availableMeals : '0'} Available`} // Check if availableMeals is defined, if not, show '0'
                    //additionalInfo={item.additionalInfo}
                    additionalInfo={distanceInKm}
                />
                <View style={{ marginLeft: responsiveWidth(4), marginTop: responsiveHeight(3) }}>
                    <Text style={appStyles.label}>Company Name:
                        <Text style={[appStyles.description, { marginTop: responsiveHeight(3) }]}>{distributorDetails.organization}</Text></Text>
                    <Text style={[appStyles.label, { marginTop: responsiveHeight(3) }]}>Address:
                        <Text style={[appStyles.description, { marginTop: responsiveHeight(3) }]}>{distributorDetails.address}</Text></Text>
                    <Text style={[appStyles.label, { marginTop: responsiveHeight(3) }]}>Phone number:
                        <Text style={[appStyles.description, { marginTop: responsiveHeight(3) }]}>{distributorDetails.phoneNumber}</Text></Text>
                    <View style={{ flexDirection: 'row', marginTop: responsiveHeight(3) }}>
                        <Text style={[appStyles.label, { marginTop: responsiveHeight(0.3) }]}>Hours:</Text>
                        <Text style={appStyles.description}>{distributorDetails.openAt}</Text>
                        <Text style={appStyles.label}>  _ </Text>
                        <Text style={appStyles.description}>{distributorDetails.closeAt}</Text>
                    </View>
                    <Text style={[appStyles.label, { marginTop: responsiveHeight(3) }]}>What we offer:
                        <Text style={[appStyles.description, { marginTop: responsiveHeight(3) }]}>{distributorDetails.whatWeOffer}</Text></Text>
                    <Text style={[appStyles.label, { marginTop: responsiveHeight(3) }]}>Website:</Text>
                    <TouchableOpacity onPress={handleLinkPress}>
                        <Text style={[appStyles.description, { textDecorationLine: 'underline', marginTop: -responsiveHeight(2), marginLeft: responsiveWidth(13) }]}>{distributorDetails.website}</Text>
                    </TouchableOpacity>
                </View>
                <DatePickerInput
                    label='Reservation Date'
                    inputWidth={responsiveWidth(92)}
                    responsiveMarginTop={3}
                    source1={calendar}
                    customWidth={responsiveWidth(92)}
                    selectedDate={selectedDate}
                    showImage={true}
                    onDateChange={handleDateChange}
                />
                {
                    item?.availableMeals ?
                        <TouchableOpacity style={[appStyles.Lubemeupcontainer, { marginTop: responsiveHeight(9) }]}>
                            <Button
                                label="Reserve Food"
                                onPress={() => handleReserveFood()}
                                // onPress={() => handleQR(item)}
                                ImageSource={arrowrightwhite}
                                ImageSource1={true}
                                ImageMarginLeft={responsiveWidth(3)}
                            />
                        </TouchableOpacity>
                        :
                        null
                }
            </ScrollView>
            <TouchableOpacity onPress={() => setHelpCalloutModalVisible(true)}>
                <Image source={HelpCallout} style={[appStyles.locationtag, { width: scale(60), height: scale(60), marginLeft: responsiveWidth(85) }]} />
            </TouchableOpacity>
            <HelpCalloutModal
                isVisible={isHelpCalloutModalVisible}
                onBackdropPress={() => setHelpCalloutModalVisible(false)}
                toggleModal={() => setHelpCalloutModalVisible(false)}
                bottom={responsiveHeight(5)}
                Title='Reserve Food Help'
                helpcallouttxt='The available bubble needs to show more than 0 for you to reserve a food package.
                Push the “Reserve Food” button to reserve a food package. 
                The number of food packages you receive is determined by the size of your household. If you require additional food for any reason you must ask when you are picking up your reserved package. 
                A QR code will be issued to you that must be scanned when you are picking up your food package.'
            />
            {isQRModalVisible && (
                <QRcodeModal
                    navigation={navigation}
                    onBackdropPress={toggleModal}
                    isVisible={isQRModalVisible}
                    qrCodeValue={qrCodeValue}
                    saveImageToGallery={saveImageToGallery}
                />
            )}
            <Loaders.AbsolutePrimary
                isVisible={loadingReserveFood}
            />
        </SafeAreaView>
    );
};
export default ReservedFood1;



