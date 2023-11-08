import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View, Image, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { appStyles } from '../../../../services/utilities/appStyles';
import Header from '../../../../components/Headers';
import Button from '../../../../components/Button';
import { colors } from '../../../../services/utilities/color';
import { fontSize, fontFamily } from '../../../../services/utilities/fonts';
import { LeftButton, arrowupright, calendar } from '../../../../services/utilities/assets';
import {
    responsiveFontSize,
    responsiveHeight,
    responsiveWidth,
} from 'react-native-responsive-dimensions';
import { scale } from 'react-native-size-matters';
import CustomTextInput from '../../../../components/Textinputs';
import { DonationModal } from '../../../../components/Modal/Donation Modal';
import { SentModal } from '../../../../components/Modal';
const NewDonation = ({ route, navigation }) => {
    const [selectedDate, setSelectedDate] = useState('');
    const [islinksentModalVisible, setIslinksentModalVisible] = useState(false);
  const [resetLinkSent, setResetLinkSent] = useState(false);
  const handlesendresetlink = () => {
    setIslinksentModalVisible(true);
    setResetLinkSent(true);
    setTimeout(() => {
      setIslinksentModalVisible(false);
      navigation.navigate('FindFood'); 
    }, 2000); 
  };
  useEffect(() => {
  }, [resetLinkSent]);
    const handleDateChange = date => {
        setSelectedDate(date);
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
                    />
                    <CustomTextInput
                        label="Address"
                        keyboardType="default"
                        placeholder="Address"
                        responsiveMarginTop={7} />
                    <CustomTextInput
                        label="Phone Number"
                        keyboardType="Number-pad"
                        placeholder="Enter a number"
                        responsiveMarginTop={7}
                    />
                    <CustomTextInput
                        label="Email Address"
                        keyboardType="default"
                        placeholder="example@email.com"
                        responsiveMarginTop={7}

                    />
                    <CustomTextInput
                        label="Your Message"
                        keyboardType="default"
                        placeholder="Write something here..."
                        inputHeight={scale(112)}
                        placeholderMarginTop={responsiveHeight(1)}
                        responsiveMarginTop={7}

                    />

                    <TouchableOpacity style={[appStyles.Lubemeupcontainer, { marginTop: responsiveHeight(17), width: scale(320) }]}>
                        <Button
                            label="Submit"

                            onPress={handlesendresetlink}
                        />
                    </TouchableOpacity>
                </View>
              
                <View style={{ height: responsiveHeight(6) }} />
            </ScrollView>
            <DonationModal
                isVisible={islinksentModalVisible}
                Title='Thank you for your interest.We will contact'
                Title2='you soon' />
  <SentModal isVisible={islinksentModalVisible}
       LinkSent='Thank you for your interest.We will'
       againtxt='contact you soon'
       />
        </SafeAreaView>
    );
};

export default NewDonation;
