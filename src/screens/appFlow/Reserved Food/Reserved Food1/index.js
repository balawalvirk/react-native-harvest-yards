import React, { useEffect, useState } from 'react';
import { ScrollView, Image, View, Text,Linking, TouchableOpacity, SafeAreaView } from 'react-native';
import { appStyles } from '../../../../services/utilities/appStyles';
import Header from '../../../../components/Headers';
import Button from '../../../../components/Button';
import DatePickerInput from '../../../../components/DatePickerInput';
import { scale } from 'react-native-size-matters';
import { HelpCallout, LeftButton, arrowrightwhite, calendar, whitearrowright } from '../../../../services/utilities/assets';
import {
    responsiveFontSize,
    responsiveHeight,
    responsiveWidth,
} from 'react-native-responsive-dimensions';
import CardView from '../../../../components/CardView';
import { QRcodeModal } from '../../../../components/Modal/QR Code Modal';
import firestore from '@react-native-firebase/firestore';
import { HelpCalloutModal } from '../../../../components/Modal/Tip Modal';
const ReservedFood1 = ({ route, navigation }) => {

    const [selectedDate, setSelectedDate] = useState('');
    const [isQRModalVisible, setIsQRModalVisible] = useState(false);
    const [isHelpCalloutModalVisible, setHelpCalloutModalVisible] = useState(false);
    const [companyData, setCompanyData] = useState({});

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
    const handleQR = () => {
        setIsQRModalVisible(true);
    };

    const handleDateChange = date => {
        setSelectedDate(date);
    };
    const { item,userId} = route.params;
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
                    Availabletxt={item.Availabletxt}
                    additionalInfo={item.additionalInfo}
                />
                <View style={{marginLeft:responsiveWidth(4),marginTop:responsiveHeight(3)}}>
                    <Text style={appStyles.label}>Company Name:
                    <Text style={[appStyles.description,{marginTop:responsiveHeight(3)}]}>{companyData.organization}</Text></Text>
                    <Text style={[appStyles.label,{marginTop:responsiveHeight(3)}]}>Address:
                    <Text style={[appStyles.description,{marginTop:responsiveHeight(3)}]}>{companyData.address}</Text></Text>
                    <Text style={[appStyles.label,{marginTop:responsiveHeight(3)}]}>Phone number:
                    <Text style={[appStyles.description,{marginTop:responsiveHeight(3)}]}>{companyData.phoneNumber}</Text></Text>
                    <Text style={[appStyles.label,{marginTop:responsiveHeight(3)}]}>Hours:
                    <Text style={[appStyles.description,{marginTop:responsiveHeight(3)}]}> 9:00 AM - 5:00 PM</Text></Text>
                    <Text style={[appStyles.label,{marginTop:responsiveHeight(3)}]}>What we offer:
                    <Text style={[appStyles.description,{marginTop:responsiveHeight(3)}]}> XYZ Widgets, Inc. is your one-stop shop for all your widget needs. We offer a wide range of widgets for various applications, including residential and commercial use. </Text></Text>
                    <Text style={[appStyles.label,{marginTop:responsiveHeight(3)}]}>Website:</Text>
                   <TouchableOpacity onPress={handleLinkPress}>
                 <Text style={[appStyles.description,{textDecorationLine:'underline',marginTop:-responsiveHeight(2),marginLeft:responsiveWidth(13)}]}>www.google.com</Text>
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
                        onPress={handleQR}
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
            <QRcodeModal
                navigation={navigation}
                onBackdropPress={toggleModal}
                isVisible={isQRModalVisible} />
        </SafeAreaView>
    );
};
export default ReservedFood1;
