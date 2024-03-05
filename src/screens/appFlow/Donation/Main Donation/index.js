import React, { useState,useEffect } from 'react';
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
const MainDonation = ({ route, navigation }) => {
    const [selectedDate, setSelectedDate] = useState('');
    const [isDonationModalVisible, setIsDonationModalVisible] = useState(false);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  
    const handleDonationModal = () => {
      setIsFormSubmitted(true); 
    };
    useEffect(() => {
      if (isFormSubmitted) {
        setIsDonationModalVisible(true); 
        setTimeout(() => {
          setIsDonationModalVisible(false); 
          setIsFormSubmitted(false); 
          navigation.navigate('Donation'); 
        }, 2000); 
      }
    }, [isFormSubmitted, navigation]);
    const handleDateChange = date => {
        setSelectedDate(date);
    };
    const { item } = route.params;
    return (
        <SafeAreaView style={appStyles.container}>
            <Header
                imageSource={LeftButton}
                headerText="Donation"
                showImage={true}
                onPress={() => navigation.goBack()}
                customTextMarginLeft={responsiveWidth(29)}
                marginleft={-responsiveWidth(0)}
            />
            <ScrollView
                contentContainerStyle={appStyles.scrollViewContainer}
                showsVerticalScrollIndicator={false}>
                <View >
                    <Image source={item.source} style={mainDonationStyles.itemImage} />
                    <Text style={mainDonationStyles.itemTitle}>{item.title}</Text>
                    <View style={mainDonationStyles.itemContainer}>
                        <Text style={mainDonationStyles.itemDescription}>{item.description}</Text>
                        <Text style={[mainDonationStyles.itemDescription, { marginTop: responsiveHeight(2) }]}>Name:XYZ Widgets, Inc.</Text>
                        <Text style={mainDonationStyles.itemDescription}>Phone:(555) 555-5555</Text>
                        <Text style={mainDonationStyles.itemDescription}>Email:example@gmail.com</Text>
                        <Text style={mainDonationStyles.itemDescription}>Type of donation:In-Kind Donation</Text>
                        <Text></Text>
                    </View>
                </View>
                <Text style={[appStyles.title,{alignSelf:'center',fontSize:fontSize.h8}]}>Form</Text>
                <View style={[appStyles.qrmainview,{width:responsiveWidth(95),height:responsiveHeight(75),marginTop:responsiveHeight(1)}]}>
                <CustomTextInput
                    label="Full Name"
                    keyboardType="default"
                    placeholder="John Doe"
                    responsiveMarginTop={3}
                />
                <CustomTextInput
                    label="Email Address"
                    keyboardType="default"
                    placeholder="example@email.com"
                    responsiveMarginTop={7}

                />
                <CustomTextInput
                    label="Phone Number"
                    keyboardType="Number-pad"
                    placeholder="Enter a number"
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

                <TouchableOpacity style={[appStyles.Lubemeupcontainer, { marginTop: responsiveHeight(17),width:scale(320)}]}>
                    <Button
                        label="Submit"

                       onPress={handleDonationModal}
                    />
                </TouchableOpacity>
                </View>
                <TouchableOpacity style={[appStyles.Lubemeupcontainer, { marginTop: responsiveHeight(5), width: scale(320) }]}>
                    <Button
                        label="Visit Website"
                        customImageSource={arrowupright}
                        customImageMarginRight={responsiveWidth(3)}
                        onPress={() => navigation.navigate('Donation')}
                    />
                </TouchableOpacity>
                <View style={{ height: responsiveHeight(6) }} />
            </ScrollView>
         <DonationModal
         isVisible={isDonationModalVisible}
         Title='Thank you for your interest.We will contact'
         Title2='you soon'/>

        </SafeAreaView>
    );
};
const mainDonationStyles = StyleSheet.create({
    itemContainer: {
        width: responsiveWidth(90),
        height: responsiveHeight(20),
        alignSelf: 'center',
        marginTop: responsiveHeight(3)
    },
    itemImage: {
        width: scale(390),
        height: scale(390)
    },
    itemTitle: {
        fontSize: fontSize.h7,
        fontWeight: '700',
        color: colors.color7,
        zIndex: 1,
        marginBottom: responsiveHeight(0.5),
        marginTop: -responsiveHeight(5),
        marginLeft: responsiveWidth(4),
        fontFamily: fontFamily.SatoshiMedium,
    },
    itemDescription: {
        fontSize: fontSize.h2,
        color: colors.color10,
        fontFamily: fontFamily.SatoshiRegular,
        fontWeight: '400',
        marginTop: responsiveHeight(0.5)
    },
    itemGoal: {
        fontSize: fontSize.h6,
        fontWeight: '700',
        color: colors.color4,
        marginBottom: responsiveHeight(0.5),
        fontFamily: fontFamily.SatoshiMedium,
    },
});
export default MainDonation;
