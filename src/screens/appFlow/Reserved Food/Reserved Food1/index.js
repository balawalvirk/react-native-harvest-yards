import React, {useEffect, useMemo, useState} from 'react';
import {Alert, Image, Linking, Platform, SafeAreaView, ScrollView, Text, TouchableOpacity, View,} from 'react-native';
import {appStyles} from '../../../../services/utilities/appStyles';
import auth from '@react-native-firebase/auth';
import Header from '../../../../components/Headers';
import Button from '../../../../components/Button';
import {requestStoragePermission} from '../../../../services/utilities/permission'
import {arrowrightwhite, calendar, HelpCallout, LeftButton} from '../../../../services/utilities/assets';
import {responsiveHeight, responsiveWidth,} from 'react-native-responsive-dimensions';
import Toast from 'react-native-toast-message';
import CardView from '../../../../components/CardView';
import QRcodeModal from '../../../../components/Modal/QR Code Modal';
import firestore from '@react-native-firebase/firestore';
import {HelpCalloutModal} from '../../../../components/Modal/Tip Modal';
import {QRCode} from 'react-native-qrcode-svg';
import RNFetchBlob from 'rn-fetch-blob';
import DateTimePicker from 'react-native-modal-datetime-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    createOrder,
    firestoreCollections,
    orderStatuses,
    roundToDecimal,
    useFirebaseAuth,
    useLocation
} from '../../../../services';
import {Loaders} from '../../../../components';

const ReservedFood1 = ({route, navigation}) => {

    const {user} = useFirebaseAuth();

    const [selectedDate, setSelectedDate] = useState('');
    const [isQRModalVisible, setIsQRModalVisible] = useState(false);
    const [isHelpCalloutModalVisible, setHelpCalloutModalVisible] = useState(false);
    const [companyData, setCompanyData] = useState({});
    const [qrCodeValue, setQRCodeValue] = useState('');
    const [reservedFoodArray, setReservedFoodArray] = useState([]);
    const [isFromReservedFavourite, setIsFromReservedFavourite] = useState(false);
    const [loadingReserveFood, setLoadingReserveFood] = useState(false);
    const [numberOfPackages, setNumberOfPackages] = useState(1); // Added state for number of people
    const {currentLocation, calculateDistance} = useLocation()
    const [showDateSelector, setShowDateSelector] = useState(false); // Step 1
    const {item, userId} = route.params;
    const distributorId = item?.id || ''
    // console.log('distributer Item: ', item)

    const distributorDetails = useMemo(() => companyData || item, [companyData])

    const {latitude, longitude} = item
    const location = latitude && longitude ? {latitude, longitude} : null
    const distance = currentLocation && location ? calculateDistance(location) : null
    const distanceInDecimal = distance ? roundToDecimal(distance, 2) : null
    const distanceInKm = distanceInDecimal ? distanceInDecimal + ' km away' : ''

    useEffect(() => {
        if(selectedDate) showAlert(selectedDate)
    },[selectedDate])

    useEffect(() => {
        const fetchUser = async () => {
          try {
            const currentUser = auth().currentUser;
            if (currentUser) {
                const usersRef = firestore().collection('users').where('userId', '==', currentUser.uid);
                const snapshot = await usersRef.get();
                if (snapshot.empty) return;
                const userData = snapshot.docs[0].data();
                if(userData.numberOfPackages) setNumberOfPackages(userData.numberOfPackages)
            }
          } catch (error) {
            console.error('Error fetching user: ', error);
          }
        };

        fetchUser();
      }, []);

    useEffect(() => {

        const distrubuterDocumentRef = firestore().collection(firestoreCollections.distributors).doc(distributorId);

        const unsubscribe = distrubuterDocumentRef.onSnapshot(
            (documentSnapshot) => {
                if (documentSnapshot.exists) {
                    setCompanyData(documentSnapshot.data());
                    const availableMeals = documentSnapshot.data()?.availableMeals;
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

    useEffect(() => {
        // Check if the component was accessed from Reserved favorites
        if (route.params?.source === 'ReservedFavorites') {
            setIsFromReservedFavourite(true);
        } else {
            setIsFromReservedFavourite(false);
        }
        const fetchCompanyData = async () => {
            try {
                const {organizationId} = route.params; // Get the organizationId passed from Reservedfavorites

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

    const reserveOrder = async () => {
        try {
                setLoadingReserveFood(true);
                const _reservationDate = selectedDate;
                const startOfDay = new Date(_reservationDate);
                startOfDay.setHours(0, 0, 0, 0);

                const endOfDay = new Date(_reservationDate);
                endOfDay.setHours(23, 59, 59, 999);

                const ordersCollectionRef = firestore().collection('orders').where('userId', '==', user?.uid);
                const ordersCollectionCheckDistributerRef = ordersCollectionRef.where('distributorId', '==', distributorDetails?.id);
                const ordersCollectionCheckStatusRef = ordersCollectionCheckDistributerRef.where('status', '==', orderStatuses.pending);

                const existingDocumentQuery = ordersCollectionCheckStatusRef
                    .where('reservationDate', '>=', startOfDay)
                    .where('reservationDate', '<=', endOfDay);

                await existingDocumentQuery.get().then(async (querySnapshot) => {
                    if (!querySnapshot.empty) {
                        const errorMessage = 'Reservation with the same date already exists.';
                        console.log(errorMessage);
                        Toast.show({
                            type: 'error',
                            text1: 'Error',
                            text2: errorMessage,
                        });
                    } else {
                       await createOrder({
                                userId: user.uid,
                                distributorId: distributorDetails.id,
                                reservationDate: selectedDate,
                                numberOfPackages: numberOfPackages, 
                                companyName: companyData.organization,
                                companyAddress: companyData.address,
                                companyLocation: companyData.location
                            }).then((res) => {
                                if (res) {
                                    console.log("QR CODE VALUE", res)
                                    const qrValue = res?.id;
                                    console.log("QR CODE ID", qrValue)
                                    setQRCodeValue(qrValue);
                                    setIsQRModalVisible(true);
                                }
                            });
                        }

            });
                setLoadingReserveFood(false);
        } catch (error) {
            console.error('Error adding reserved food information:', error);
            setLoadingReserveFood(false);
        }
    };

    const showAlert = (date) => {
        Alert.alert(
            'Confirmation',
            `Are you sure you want to proceed? Your selected date is ${date.toLocaleDateString('en-GB')}`,
            [
                {
                    text: 'No',
                    onPress: () => {
                        console.log('No pressed',showDateSelector);
                        setShowDateSelector(true);
                    },
                    style: 'cancel',
                },
                {
                    text: 'Yes',
                    onPress: () => {reserveOrder()},
                },
            ],
            { cancelable: false }
        );
    };




    const handleReserveFoodValidation = () => {
        if (!distributorDetails?.availableMeals) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'No meal available',
            });
        }
        if ( distributorDetails?.availableMeals && user) {
            return true;
        }
    }

    const handleReserveFood = async () => {
        if (handleReserveFoodValidation()) setShowDateSelector(true);
    };

    const handleDateChange = date => {
        setSelectedDate(date);
        setShowDateSelector(false);
    };

    const closeDateSelector = () => {
        // Close the DateSelector component
        setShowDateSelector(false);
    };

    const saveImageToGallery = async (imageUri) => {
        console.log('Image URI:', imageUri);
        if (!imageUri) {
            throw new Error('Image URI is null or undefined');
        }

        try {
            const permissionGranted = await requestStoragePermission();
            if (permissionGranted) {
                const {config, fs} = RNFetchBlob;
                const isIOS = Platform.OS === 'ios';
                const imageLocation = isIOS ? imageUri : `file://${imageUri}`;

                const response = await config({
                    fileCache: true,
                    appendExt: 'jpg',
                }).fetch('GET', imageLocation);

                const imagePath = isIOS ? fs.dirs.DocumentDir : fs.dirs.DCIMDir;
                const imageName = `IMG_${new Date().getTime()}.jpg`;

                await fs.cp(response.path(), `${imagePath}/${imageName}`);
                await fs.scanFile([{path: `${imagePath}/${imageName}`, mime: 'image/jpeg'}]);

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
                marginleft={-responsiveWidth(0)}
            />
            <ScrollView>

                <CardView
                    customMarginTop={responsiveHeight(1)}
                    source={{uri: distributorDetails.profileImage}}
                    title={distributorDetails.organization}
                    description={distributorDetails.address}
                    Availabletxt={`${distributorDetails.availableMeals !== undefined ? distributorDetails.availableMeals : '0'} Available`} // Check if availableMeals is defined, if not, show '0'
                    //additionalInfo={item.additionalInfo}
                    additionalInfo={distanceInKm}
                />
                <View style={{marginLeft: responsiveWidth(4), marginTop: responsiveHeight(3)}}>
                    <Text style={appStyles.label}>Company Name:
                        <Text
                            style={[appStyles.description, {marginTop: responsiveHeight(3)}]}>{distributorDetails.organization}</Text></Text>
                    <Text style={[appStyles.label, {marginTop: responsiveHeight(3)}]}>Address:
                        <Text
                            style={[appStyles.description, {marginTop: responsiveHeight(3)}]}>{distributorDetails.address}</Text></Text>
                    <Text style={[appStyles.label, {marginTop: responsiveHeight(3)}]}>Phone number:
                        <Text
                            style={[appStyles.description, {marginTop: responsiveHeight(3)}]}>{distributorDetails.phoneNumber}</Text></Text>
                    <View style={{flexDirection: 'row', marginTop: responsiveHeight(3)}}>
                        <Text style={[appStyles.label, {marginTop: responsiveHeight(0.3)}]}>Hours:</Text>
                        <Text style={appStyles.description}>{distributorDetails.openAt}</Text>
                        <Text style={appStyles.label}> _ </Text>
                        <Text style={appStyles.description}>{distributorDetails.closeAt}</Text>
                    </View>
                    <Text style={[appStyles.label, {marginTop: responsiveHeight(3)}]}>What we offer:
                        <Text
                            style={[appStyles.description, {marginTop: responsiveHeight(3)}]}>{distributorDetails.whatWeOffer}</Text></Text>
                    <Text style={[appStyles.label, {marginTop: responsiveHeight(3)}]}>Website:</Text>
                    <TouchableOpacity onPress={handleLinkPress}>
                        <Text style={[appStyles.description, {
                            textDecorationLine: 'underline',
                            marginTop: -responsiveHeight(2),
                            marginLeft: responsiveWidth(13)
                        }]}>{distributorDetails.website}</Text>
                    </TouchableOpacity>
                </View>
                {showDateSelector&&(
                <DateTimePicker
                isVisible={true}
                  style={{ width: '100%', backgroundColor: 'white' }}
                  value={selectedDate}
                  mode="date"
                  minimumDate={new Date()}
                  onConfirm={handleDateChange}
                  onCancel={closeDateSelector}

                />)}

                <TouchableOpacity style={[appStyles.Lubemeupcontainer, {marginTop:250}]}>
                    <Button
                        label="Reserve Food"
                        onPress={() => handleReserveFood()}
                        // onPress={() => handleQR(item)}
                        ImageSource={arrowrightwhite}
                        ImageSource1={true}
                        ImageMarginLeft={responsiveWidth(3)}
                    />
                </TouchableOpacity>

            </ScrollView>
            <TouchableOpacity
                activeOpacity={0.8}
                style={{
                    right: responsiveWidth(0),
                    bottom: responsiveHeight(0),
                    alignItems: 'center',
                    alignSelf: 'flex-end',
                    position: 'absolute'

                }}
                onPress={() => {
                    setHelpCalloutModalVisible(true)
                }}
            >
                <Image
                    source={HelpCallout}
                    resizeMode='cover'
                    style={[
                        appStyles.helpview,
                        {},
                    ]}
                />
            </TouchableOpacity>
            {isHelpCalloutModalVisible && (
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
                />)}
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



