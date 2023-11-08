import { View, Text, TouchableOpacity, Linking,ScrollView } from 'react-native';
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
  users,
} from '../../../services/utilities/assets';
import { appStyles } from '../../../services/utilities/appStyles';
import CustomTextInput from '../../../components/Textinputs';
import { SafeAreaView } from 'react-native-safe-area-context';
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
          label="Email Address"
          keyboardType="default"
          placeholder="example@email.com"
          placeholderMarginLeft={responsiveWidth(3)}
          responsiveMarginTop={7}
          source={Email}
        />

        <CustomTextInput
          label="Password"
          keyboardType="default"
          placeholder="Minimum 8 characters"
          placeholderMarginLeft={responsiveWidth(3)}
          responsiveMarginTop={7}
          TextinputWidth={responsiveWidth(67)}
          source={lock}
          showeye={true}

        />
        <CustomTextInput
          label="Confirm Password"
          keyboardType="default"
          placeholder="Minimum 8 characters"
          placeholderMarginLeft={responsiveWidth(3)}
          responsiveMarginTop={7}
          TextinputWidth={responsiveWidth(67)}
          source={lock}
          showeye={true}
        />
        <CustomTextInput
          label="Cell Phone"
          keyboardType="default"
          placeholder="03440345050"
          placeholderMarginLeft={responsiveWidth(3)}
          responsiveMarginTop={7}
          source={Phone}
        />
        <CustomTextInput
          label="How many people in your household?"
          keyboardType="default"
          placeholder="How many people in your household?"
          placeholderMarginLeft={responsiveWidth(3)}
          responsiveMarginTop={7}
          source={User} />
        <View style={[appStyles.createcheckview, { marginTop: responsiveHeight(8), marginLeft: responsiveWidth(5) }]}>
          <CustomCheckbox />
          <View style={{ width: responsiveWidth(87) }}>
            <Text style={[appStyles.Accept, { marginTop: -responsiveHeight(0.5) }]}>I agree to the use of my phone number for receiving SMS updates and notifications</Text>
          </View>
        </View>
        <View style={[appStyles.acceptview, { marginTop: responsiveHeight(2) }]}>
          <View>
            <CustomCheckbox />
          </View>
          <Text style={appStyles.Accept}>Accept</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Termsandconditions')}>
            <Text style={appStyles.TermsText}>Terms & Conditions</Text>
          </TouchableOpacity>
        </View>
        <View style={{ width: responsiveWidth(90) }}>
          <Text style={[appStyles.TermsText, { marginLeft: responsiveWidth(3) }]}>Privacy Policy: </Text>
          {/* <TouchableOpacity onPress={() => Linking.openURL('https://www.privacypolicies.com/live/f83dcfd1-80bf-4a95-aca5-e5586a7807be')}>
            <Text style={[appStyles.TermsText, { marginLeft: responsiveWidth(3) }]}>
              https://www.privacypolicies.com/live/f83dcfd1-80bf-4a95-aca5-e5586a7807be
            </Text>
          </TouchableOpacity> */}
        </View>

        <TouchableOpacity style={[appStyles.Lubemeupcontainer, { marginTop: responsiveHeight(4) }]}>
          <Button
            label="Create Account"
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
