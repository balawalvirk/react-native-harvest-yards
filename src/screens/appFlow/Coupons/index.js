import React, { useState } from 'react';
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
import { HelpCalloutModal } from '../../../components/Modal/Tip Modal';
const Coupons = ({ navigation }) => {
  const [isHelpCalloutModalVisible, setHelpCalloutModalVisible] = useState(false);
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
        <CouponsView
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
          title='#BESTDEAL40'
          customstyletitle={appStyles.customstyletitle}
          customdescriptionstyle={appStyles.customdescriptionstyle}
          description='Expires on:Oct 29, 2023'
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
        />
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
        />
        <CouponsView
          customMarginTop={responsiveHeight(1)}
          source={redtag}
          source1={x}
          customstyle={appStyles.customstyle}
          title='#DISCOUNT50OFF'
          customstyletitle={appStyles.customstyletitle}
          customdescriptionstyle={appStyles.customdescriptionstyle}
          description='Expired'
          expirecolor={colors.color32}
          coupontxt1={colors.color32}
          imagemarginleft={responsiveWidth(33)}
        />
        <View style={{ height: responsiveHeight(10) }} />
      </ScrollView>
      <TouchableOpacity onPress={() => setHelpCalloutModalVisible(true)}>
        <Image source={HelpCallout} style={[appStyles.locationtag, { width: scale(60), height: scale(60), marginLeft: responsiveWidth(85), marginBottom: responsiveHeight(3.5) }]} />
      </TouchableOpacity>
      <HelpCalloutModal
        isVisible={isHelpCalloutModalVisible}s
        Title='Coupons Help'
        onBackdropPress={() => setHelpCalloutModalVisible(false)}
        toggleModal={() => setHelpCalloutModalVisible(false)}
        bottom={responsiveHeight(7.3)}
        helpcallouttxt='Grocery stores, markets, restaurants, etc. that would like to offer discounts to our consumers are welcome to contact us. Maybe your restaurant has an abundance of a certain type of dish that will spoil if it is not sold soon. We can arrange for limited coupons to match your availability to out consumers. The coupon can be confirmed by their QR code and/or ID # for verification. Waste not, want not.' />
    </SafeAreaView>
  );
};

export default Coupons;
