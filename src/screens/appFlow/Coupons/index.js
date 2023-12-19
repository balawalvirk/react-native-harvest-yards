import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { appStyles } from '../../../services/utilities/appStyles';
import Header from '../../../components/Headers';
import CustomTextInput from '../../../components/Textinputs';
import { HelpCallout, Image10, Image11, Image12, Image13, Image14, Image2, Image5, Image6, Image7, Image8, LeftButton, MenueButton, checksquare, copy, locationtag, redtag, search, tag, x } from '../../../services/utilities/assets';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import CouponsView from '../../../components/CouponsView';
import { scale } from 'react-native-size-matters';
import { colors } from '../../../services/utilities/color';
import firestore from '@react-native-firebase/firestore';
import { HelpCalloutModal } from '../../../components/Modal/Tip Modal';
const Coupons = ({ navigation }) => {
  const [isHelpCalloutModalVisible, setHelpCalloutModalVisible] = useState(false);


  const [couponsData, setCouponsData] = useState([]);

  useEffect(() => {
    const fetchCouponsFromFirestore = async () => {
      try {
        const snapshot = await firestore().collection('coupons').doc('couponlist').get();

        if (snapshot.exists) {
          const data = snapshot.data();
          const coupons = data.coupons || [];
          setCouponsData(coupons);
        } else {
          console.log('Document does not exist');
        }
      } catch (error) {
        console.error('Error fetching coupons:', error);
      }
    };

    fetchCouponsFromFirestore();
  }, []);
  // const addCouponsToFirestore = async () => {
  //   const couponsArray = [
  //     { couponId: '#TAKE15OFF', ExpiryDate: 'Expires on:Oct 5, 2023' },
  //     { couponId: '#GRAB10OFF', ExpiryDate: 'Expires on:Oct 8, 2023' },
  //     { couponId: '#WINTERSAL', ExpiryDate: 'Expires on:Oct 1, 2023' },
  //     { couponId: '#SIZZLING50', ExpiryDate: 'Expires on:Oct 1, 2023' },
  //   ];

  //   try {
  //     await firestore().collection('coupons').doc('couponlist').set({
  //       coupons: couponsArray
  //     });
  //     console.log('Coupons added to Firestore successfully!');
  //   } catch (error) {
  //     console.error('Error adding coupons to Firestore:', error);
  //   }
  // };

  // addCouponsToFirestore();

  return (
    <SafeAreaView style={appStyles.container}>
      <Header
        imageSource={LeftButton}
        headerText="Coupons"
        showImage={true}
        onPress={() => navigation.goBack()}
        customTextMarginLeft={responsiveWidth(26)}
        marginleft={-responsiveWidth(2)}
      />

      <ScrollView>
        {/* <CouponsView
          customMarginTop={responsiveHeight(1)}
          source={tag}
          source1={copy}
          title='#TAKE15OFF'
           coupontxt1={colors.color4}
          expirecolor={colors.color4}
          description='Expires on:Oct 5, 2023'
          imagemarginleft={responsiveWidth(38)}

        />
        <CouponsView
          customMarginTop={responsiveHeight(1)}
          source={tag}
          source1={copy}
          title='#GRAB10OFF'
          coupontxt1={colors.color4}
          expirecolor={colors.color4}
          description='Expires on:Oct 8, 2023'
          imagemarginleft={responsiveWidth(38)}
        />
        <CouponsView
          customMarginTop={responsiveHeight(1)}
          source={tag}
          source1={copy}
          title='#WINTERSALE25'
          coupontxt1={colors.color4}
          expirecolor={colors.color4}
          description='Expires on:Oct 1, 2023'
          imagemarginleft={responsiveWidth(36)}
        />
        <CouponsView
          customMarginTop={responsiveHeight(1)}
          source={tag}
          source1={checksquare}
          customstyle={appStyles.customstyle}
          coupontxt1={colors.color4}
          expirecolor={colors.color4}
          title={coupon.couponsId}
          customstyletitle={appStyles.customstyletitle}
          customdescriptionstyle={appStyles.customdescriptionstyle}
          description={couponsData.ExpiryDate}
          imagemarginleft={responsiveWidth(36)}

        />
        <CouponsView
          customMarginTop={responsiveHeight(1)}
          source={tag}
          source1={checksquare}
          coupontxt1={colors.color4}
          expirecolor={colors.color4}
          customstyle={appStyles.customstyle}
          title='#FINALSALE75'
          customstyletitle={appStyles.customstyletitle}
          customdescriptionstyle={appStyles.customdescriptionstyle}
          description='Expires on:Oct 13, 2023'
          imagemarginleft={responsiveWidth(36)}
        />
        <CouponsView
          customMarginTop={responsiveHeight(1)}
          source={tag}
          source1={checksquare}
          customstyle={appStyles.customstyle}
          title='#AMAZINGDISCOUNT'
          coupontxt1={colors.color4}
          expirecolor={colors.color4}
          customstyletitle={appStyles.customstyletitle}
          customdescriptionstyle={appStyles.customdescriptionstyle}
          description='Expires on:Oct 22, 2023'
          imagemarginleft={responsiveWidth(26)}
        />*}
        <CouponsView
          customMarginTop={responsiveHeight(1)}
          source={redtag}
          source1={x}
          customstyle={appStyles.customstyle}
          title='#SIZZLING50'
          customstyletitle={appStyles.customstyletitle}
          customdescriptionstyle={appStyles.customdescriptionstyle}
          description='Expired'
          expirecolor={colors.color32}
          coupontxt1={colors.color32}
          imagemarginleft={responsiveWidth(44)}
        /> */}

        {couponsData.map((coupon, index) => (
          <CouponsView
            key={index}
            customMarginTop={responsiveHeight(1)}
            source={tag}
            source1={checksquare}
            coupontxt1={colors.color4}
            expirecolor={colors.color4}
            title={coupon.couponId}
            description={coupon.ExpiryDate}
       
          />
        ))}
        {couponsData.map((coupon, index) => (
          <CouponsView
            customMarginTop={responsiveHeight(1)}
            source={tag}
            source1={checksquare}
            coupontxt1={colors.color4}
            expirecolor={colors.color4}
            customstyle={appStyles.customstyle}
            title={coupon.couponId}
            customstyletitle={appStyles.customstyletitle}
            customdescriptionstyle={appStyles.customdescriptionstyle}
            description={coupon.ExpiryDate}
          
          />
        ))}
        {couponsData.map((coupon, index) => (
          <CouponsView
            customMarginTop={responsiveHeight(1)}
            source={redtag}
            source1={x}
            customstyle={appStyles.customstyle}
            title={coupon.couponId}
            customstyletitle={appStyles.customstyletitle}
            customdescriptionstyle={appStyles.customdescriptionstyle}
            description='Expired'
            expirecolor={colors.color32}
            coupontxt1={colors.color32}
          
          />
        ))}
        <View style={{height:responsiveHeight(4)}}/>
      </ScrollView>
      <TouchableOpacity onPress={() => setHelpCalloutModalVisible(true)}>
        <Image source={HelpCallout} style={[appStyles.helpview, { width: scale(60), height: scale(60), marginLeft: responsiveWidth(85), marginBottom: responsiveHeight(3.5) }]} />
      </TouchableOpacity>
      <HelpCalloutModal
        isVisible={isHelpCalloutModalVisible} s
        Title='Coupons Help'
        onBackdropPress={() => setHelpCalloutModalVisible(false)}
        toggleModal={() => setHelpCalloutModalVisible(false)}
        bottom={responsiveHeight(7.3)}
        helpcallouttxt='Grocery stores, markets, restaurants, etc. that would like to offer discounts to our consumers are welcome to contact us. Maybe your restaurant has an abundance of a certain type of dish that will spoil if it is not sold soon. We can arrange for limited coupons to match your availability to out consumers. The coupon can be confirmed by their QR code and/or ID # for verification. Waste not, want not.' />
    </SafeAreaView>
  );
};

export default Coupons;