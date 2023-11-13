import { View, Text, TouchableOpacity, Linking, ScrollView } from 'react-native';
import React, { useState } from 'react';
import Header from '../../../components/Headers';
import Button from '../../../components/Button';
import { colors } from '../../../services/utilities/color';
import CustomCheckbox from '../../../components/Checkbox';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {
  Btntick,
  Calender,
  Down,
  Email,
  LeftButton,
  Phone,
  User,
  arrowrightwhite,
  lock,
  mappin,
  users,
} from '../../../services/utilities/assets';
import { appStyles } from '../../../services/utilities/appStyles';
import CustomTextInput from '../../../components/Textinputs';
import { SafeAreaView } from 'react-native-safe-area-context';
import HorizontalLine from '../../../components/Line';
export default function Index({ navigation }) {

  const handlearrow = () => {
    navigation.goBack();
  };
  return (
    <SafeAreaView style={appStyles.container}>
      <Header
        imageSource={LeftButton}
        headerText="Create Account"
        showImage={true}
        onPress={handlearrow}
        customTextMarginLeft={responsiveWidth(23)}
      />
      <KeyboardAwareScrollView
        contentContainerStyle={appStyles.scrollViewContainer}
        showsVerticalScrollIndicator={false}
        extraScrollHeight={responsiveHeight(20)}>

        <CustomTextInput
          label="Full Name"
          keyboardType="default"
          placeholder="John Doe"
          placeholderMarginLeft={responsiveWidth(3)}
          responsiveMarginTop={5}
          source={User}
        />
        <CustomTextInput
          label="Cell Phone"
          keyboardType="default"
          placeholder="03440345050"
          placeholderMarginLeft={responsiveWidth(3)}
          responsiveMarginTop={7}
          source={Phone}
        />
        <Text style={[appStyles.modalText1, { marginLeft: responsiveWidth(5), marginTop: responsiveHeight(6) }]}>Address</Text>
        <CustomTextInput
          label="Street"
          keyboardType="default"
          placeholder="street"
          placeholderMarginLeft={responsiveWidth(3)}
          responsiveMarginTop={3}
          source={mappin}
        />

        <CustomTextInput
          label="City"
          keyboardType="default"
          placeholder="city"
          placeholderMarginLeft={responsiveWidth(3)}
          responsiveMarginTop={7}
          source={mappin}
        />
        <CustomTextInput
          label="State"
          keyboardType="default"
          placeholder="state"
          placeholderMarginLeft={responsiveWidth(3)}
          responsiveMarginTop={7}
          source={mappin}
        />
        <View style={{ flexDirection: 'row', marginLeft: responsiveWidth(5) }}>
          <CustomTextInput
            label="Unit#"
            keyboardType="default"
            placeholder="unit"
            placeholderMarginLeft={responsiveWidth(3)}
            responsiveMarginTop={7}
            inputWidth={responsiveWidth(42)}
            source={mappin}
            TextinputWidth={responsiveWidth(28)}

          />
          <CustomTextInput
            label="Zip"
            keyboardType="default"
            placeholder="zip"
            placeholderMarginLeft={responsiveWidth(3)}
            responsiveMarginTop={7}
            custommarginleft={responsiveWidth(5)}
            source={mappin}
            inputWidth={responsiveWidth(42)}
            TextinputWidth={responsiveWidth(28)}
          />
        </View>

        <HorizontalLine marginTop={responsiveHeight(6)} width={responsiveWidth(70)} />
        <View style={[appStyles.createcheckview, { marginTop: responsiveHeight(4) }]}>
          <CustomCheckbox />
          <Text style={appStyles.Entertxt}>I am over the age of 13</Text>

        </View>
        <View style={appStyles.createcheckview}>
          <CustomCheckbox />
          <Text style={appStyles.Entertxt}>Are you currently unhoused?</Text>

        </View>
        <View style={appStyles.createcheckview}>
          <CustomCheckbox />
          <Text style={appStyles.Entertxt}>Are you currently receiving any public assistance?</Text>

        </View>


        <TouchableOpacity style={[appStyles.Lubemeupcontainer, { marginTop: responsiveHeight(4) }]}>
          <Button
            label="Continue"
            customImageSource={arrowrightwhite}
            customImageMarginRight={responsiveWidth(3)}
            onPress={() => navigation.navigate('CreateAdditionalinfo')}
          />
        </TouchableOpacity>
        <View style={{ height: responsiveHeight(12) }} />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
