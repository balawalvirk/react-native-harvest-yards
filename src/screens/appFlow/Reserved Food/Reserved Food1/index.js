import React, { useEffect, useState,useRef } from 'react';
import { ScrollView, Image, View, Text, Linking, TouchableOpacity, SafeAreaView } from 'react-native';
import { appStyles } from '../../../../services/utilities/appStyles';
import Header from '../../../../components/Headers';
import Button from '../../../../components/Button';
import DatePickerInput from '../../../../components/DatePickerInput';
import { scale } from 'react-native-size-matters';

import { HelpCallout, LeftButton, arrowrightwhite, calendar, whitearrowright } from '../../../../services/utilities/assets';
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
const ReservedFood1 = ({ route, navigation, }) => {
    const [selectedDate, setSelectedDate] = useState('');
    const [isQRModalVisible, setIsQRModalVisible] = useState(false);
    const [isHelpCalloutModalVisible, setHelpCalloutModalVisible] = useState(false);
    const [companyData, setCompanyData] = useState({});
    const [qrCodeUri, setQRCodeUri] = useState(null);
    const qrCodeRef = useRef(null);
    const nextDay = new Date();
    nextDay.setDate(nextDay.getDate() + 1);
    useEffect(() => {
        const fetchCompanyData = async () => {
            try {
                const { userId } = route.params; // Get the userId passed from FindFood

                // Assuming 'organizations' is the collection name in Firestore
                const organizationDoc = await firestore().collection('distributors').doc(userId).get();

                if (organizationDoc.exists) {
                    // If the document exists, fetch and set the company data
                    setCompanyData(organizationDoc.data());
                } else {
                    console.log('Organization document not found');
                }
            } catch (error) {
                console.error('Error fetching company data:', error);
            }
        };

        fetchCompanyData();
    }, [route.params]); // Add route.params as a dependency to useEffect to trigger when it changes

    const [qrCodeValue, setQRCodeValue] = useState('');
    const toggleModal = () => {
        console.log('Toggling modal'); // Add this line for debugging
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
    const handleQR = async (item) => {
        if (!selectedDate) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Please select a reservation date.',
            });
            return;
        }

        try {
            const currentUser = auth().currentUser;
            const userId = currentUser ? currentUser.uid : null;

            if (!userId) {
                console.error('User ID not found');
                return;
            }

            const userDocRef = firestore().collection('users').doc(userId);
            const userDoc = await userDocRef.get();
            const userData = userDoc.data();
            const reservedFoodArray = userData && userData.reservedFood ? userData.reservedFood : [];

            await userDocRef.update({
                reservedFood: [...reservedFoodArray, {
                    profileImage: item.profileImage,
                    organization: item.organization,
                    address: item.address,
                    reservationDate: selectedDate,
                }],
            });

            const qrValue = `${userId}_${item.organization}_${selectedDate}`;
            setQRCodeValue(qrValue);

            setIsQRModalVisible(true);
        } catch (error) {
            console.error('Error adding reserved food information:', error);
        }
    };

    const handleDateChange = date => {
        setSelectedDate(date);
    };
    const { item, userId } = route.params;

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
                    source={{ uri: item.profileImage }}
                    title={item.organization}
                    description={item.address}
                    Availabletxt={`${item.availableMeals} Available`}
                    additionalInfo={item.additionalInfo}
                />
                <View style={{ marginLeft: responsiveWidth(4), marginTop: responsiveHeight(3) }}>
                    <Text style={appStyles.label}>Company Name:
                        <Text style={[appStyles.description, { marginTop: responsiveHeight(3) }]}>{companyData.organization}</Text></Text>
                    <Text style={[appStyles.label, { marginTop: responsiveHeight(3) }]}>Address:
                        <Text style={[appStyles.description, { marginTop: responsiveHeight(3) }]}>{companyData.address}</Text></Text>
                    <Text style={[appStyles.label, { marginTop: responsiveHeight(3) }]}>Phone number:
                        <Text style={[appStyles.description, { marginTop: responsiveHeight(3) }]}>{companyData.phoneNumber}</Text></Text>


                    <View style={{ flexDirection: 'row', marginTop: responsiveHeight(3) }}>
                        <Text style={[appStyles.label, { marginTop: responsiveHeight(0.3) }]}>Hours:</Text>
                        <Text style={appStyles.description}>{companyData.openAt}</Text>
                        <Text style={appStyles.label}>  _ </Text>
                        <Text style={appStyles.description}>{companyData.closeAt}</Text>
                    </View>

                    <Text style={[appStyles.label, { marginTop: responsiveHeight(3) }]}>What we offer:
                        <Text style={[appStyles.description, { marginTop: responsiveHeight(3) }]}>{companyData.whatWeOffer}</Text></Text>
                    <Text style={[appStyles.label, { marginTop: responsiveHeight(3) }]}>Website:</Text>
                    <TouchableOpacity onPress={handleLinkPress}>
                        <Text style={[appStyles.description, { textDecorationLine: 'underline', marginTop: -responsiveHeight(2), marginLeft: responsiveWidth(13) }]}>{companyData.website}</Text>
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
                <TouchableOpacity style={[appStyles.Lubemeupcontainer, { marginTop: responsiveHeight(9) }]}>
                    <Button
                        label="Reserve Food"
                        onPress={() => handleQR(item)}
                        ImageSource={arrowrightwhite}
                        ImageSource1={true}
                        ImageMarginLeft={responsiveWidth(3)}
                    />
                </TouchableOpacity>
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
                />
            )}

        </SafeAreaView>
    );
};
export default ReservedFood1;
