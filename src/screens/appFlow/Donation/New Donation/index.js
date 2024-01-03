import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View, Image, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { appStyles } from '../../../../services/utilities/appStyles';
import Header from '../../../../components/Headers';
import Button from '../../../../components/Button';
import { colors } from '../../../../services/utilities/color';
import { fontSize, fontFamily } from '../../../../services/utilities/fonts';
import { LeftButton, animation, arrowupright, calendar } from '../../../../services/utilities/assets';
import {
    responsiveFontSize,
    responsiveHeight,
    responsiveWidth,
} from 'react-native-responsive-dimensions';
import { scale } from 'react-native-size-matters';
import CustomTextInput from '../../../../components/Textinputs';
import firestore from '@react-native-firebase/firestore';
import LottieView from 'lottie-react-native';
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-toast-message';
import { DonationModal } from '../../../../components/Modal/Donation Modal';
import { SentModal } from '../../../../components/Modal';
import { Loaders } from '../../../../components';
const NewDonation = ({ route, navigation }) => {
    const [selectedDate, setSelectedDate] = useState('');
    const [isLinkSentModalVisible, setIsLinkSentModalVisible] = useState(false);
    const [resetLinkSent, setResetLinkSent] = useState(false);
    const [fullName, setFullName] = useState('');
    const [address, setaddress] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSendDonation = async () => {
        const userId = auth().currentUser.uid;

        if (!fullName) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Full Name is required!',
            });
            return;
        }

        if (fullName.length < 3) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Full Name should have at least 3 characters!',
            });
            return;
        }

        if (!address) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Address is required!',
            });
            return;
        }
        if (address.length < 3) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Address should have at least 3 characters!',
            });
            return;
        }

        if (!email) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Email is required!',
            });
            return;
        }
        if (!validateEmail(email)) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Invalid email address!',
            });
            return;
        }
        setLoading(true);

        try {
            await firestore().collection('Donation').doc(userId).set({
                fullName,
                address,
                email,
                phoneNumber,
                message,
                userId
            });

            setIsLinkSentModalVisible(true);
            setTimeout(() => {
                setIsLinkSentModalVisible(false);
                navigation.navigate('FindFood');
            }, 2000);
        } catch (error) {
            console.error('Error storing data: ', error);
            setIsLinkSentModalVisible(false);
            setLoading(false);
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Failed to store data!',
            });
        }
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };


    return (
        <SafeAreaView style={appStyles.container}>
            <Header
                imageSource={LeftButton}
                headerText="Donation"
                showImage={true}
                onPress={() => navigation.goBack()}
                customTextMarginLeft={responsiveWidth(29)}
                marginleft={-responsiveWidth(2)}
            />
            <ScrollView
                contentContainerStyle={appStyles.scrollViewContainer}
                showsVerticalScrollIndicator={false}>
                <View style={appStyles.mainview}>
                    <Text style={[appStyles.txtpartner, { lineHeight: scale(18.9) }]}>
                        We hope that you find this app beneficial for yourself or for other people that you care about. Unfortunately, this app costs money to develop, maintain, and expand. Currently, the app is focused on parts of Los Angeles County, however, it takes staff to enter and manage the database and funds to pay for the storage and payroll. If you like what we are doing and would like to donate to our nonprofit or any of our partners, please do not hesitate to let us know how you would like to help and we will contact you to discuss your donation. Keep in mind that donations don't have to be cash. You can donate food to our partners, vehicles that you don't want any longer, real estate, or your time and expertise in a related field.

                    </Text>
                </View>
                <Text style={[appStyles.title, { alignSelf: 'center', fontSize: fontSize.h8 }]}>Form</Text>
                <View style={[appStyles.qrmainview, { width: responsiveWidth(95), height: responsiveHeight(88), marginTop: responsiveHeight(1) }]}>
                    <CustomTextInput
                        label="Full Name"
                        keyboardType="default"
                        placeholder="John Doe"
                        responsiveMarginTop={3}
                        value={fullName}
                        onChangeText={setFullName}
                    />
                    <CustomTextInput
                        label="Address"
                        keyboardType="default"
                        placeholder="Address"
                        responsiveMarginTop={7}
                        value={address}
                        onChangeText={setaddress} />
                    <CustomTextInput
                        label="Phone Number"
                        keyboardType="Number-pad"
                        placeholder="Enter a number"
                        responsiveMarginTop={7}
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                    />
                    <CustomTextInput
                        label="Email Address"
                        keyboardType="default"
                        placeholder="example@email.com"
                        responsiveMarginTop={7}
                        value={email}
                        onChangeText={setEmail}
                    />
                    <CustomTextInput
                        label="Your Message"
                        keyboardType="default"
                        placeholder="Write something here..."
                        inputHeight={scale(112)}
                        placeholderMarginTop={responsiveHeight(1)}
                        responsiveMarginTop={7}
                        value={message}
                        onChangeText={setMessage}
                        multiline={true}
                        marginLeft={true}
                    />
                    <TouchableOpacity style={[appStyles.Lubemeupcontainer, { marginTop: responsiveHeight(17), width: scale(320) }]}>
                        <Button
                            label="Submit"

                            onPress={handleSendDonation}
                        />
                    </TouchableOpacity>
                </View>
                <View style={{ height: responsiveHeight(6) }} />
                {/* <View style={appStyles.loadingContainer}>
                    {loading && (
                        <LottieView
                            source={animation}
                            autoPlay
                            loop
                            style={appStyles.loadingAnimation}
                        />
                    )}
                </View> */}
            </ScrollView>
            <Loaders.AbsolutePrimary
          isVisible={loading}
        />
            <DonationModal
                isVisible={isLinkSentModalVisible}
                Title='Thank you for your interest.We will contact'
                Title2='you soon' />
            <SentModal isVisible={isLinkSentModalVisible}
                LinkSent='Thank you for your interest.We will'
                againtxt='contact you soon'
            />
        </SafeAreaView>
    );
};
export default NewDonation;
