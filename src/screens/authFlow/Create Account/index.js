import { View, Text, TouchableOpacity, Linking, ScrollView } from 'react-native';
import React, { useState } from 'react';
import Header from '../../../components/Headers';
import Button from '../../../components/Button';
import { colors } from '../../../services/utilities/color';
import CustomCheckbox from '../../../components/Checkbox';
import firestore from '@react-native-firebase/firestore';
import MonthYearPicker from '../../../components/DatePickerInput';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {
  LeftButton,
  Phone,
  User,
  animation,
  arrowrightwhite,
  lock,
  mappin,
  users,
  calendar,
} from '../../../services/utilities/assets';
import LottieView from 'lottie-react-native';
import { appStyles } from '../../../services/utilities/appStyles';
import CustomTextInput from '../../../components/Textinputs';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import HorizontalLine from '../../../components/Line';
import auth from '@react-native-firebase/auth';
import { scale } from 'react-native-size-matters';
import { Loaders } from '../../../components';
export default function Index({ navigation }) {
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [dob, setDOB] = useState('');
  const [zip, setZip] = useState('');
  const [isUnhoused, setIsUnhoused] = useState('');
  const [loading, setLoading] = useState(false);
  const [isReceivingAssistance, setIsReceivingAssistance] = useState('');
  const handlearrow = () => {
    navigation.goBack();
  };
  const phoneRegex = /^[0-9]{10}$/;

  const handleCreateAccount = async () => {
    if (!firstName || !state || !zip || !dob) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please fill in all required fields',
      });
      if (!zip) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Zip is required',
        });
      }
      if (!dob) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Date of Birth is required',
        });
        return;
      }
      if (!state) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'State is required',
        });
      }
      if (!city && !isUnhoused) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'City is required',
        });
      }
      if (!street && !isUnhoused) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Street is required',
        });
      }
    //   if (!phoneNumber) {
    //     Toast.show({
    //       type: 'error',
    //       text1: 'Error',
    //       text2: 'Cell Phone is required',
    //     });
    //   }

    //  else if (!phoneRegex.test(phoneNumber)) {
    //     Toast.show({
    //       type: 'error',
    //       text1: 'Error',
    //       text2: 'Please enter a valid phone number',
    //     });
    //     return;
    //   }
      if (!lastName) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Last name is required',
        });
      }
      else
        if (lastName.length < 3) {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'Last name must be at least 3 characters',
          });
       return;
        }

      if (!firstName) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'First name is required',
        });
      }
      else
        if (firstName.length < 3) {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'First name must be at least 3 characters',
          });
        }
      return;
    }

    // Add additional validation if needed (e.g., email format)
    try {
      setLoading(true);
      // Simulating an asynchronous process
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Pass data to the AdditionalInfo screen
      navigation.navigate('CreateAdditionalinfo', {
        firstName,
        lastName,
        phoneNumber,
        dob,
        street,
        city,
        state,
        zip,
        isUnhoused,
        isReceivingAssistance,
      });
    } catch (error) {
      console.error('Error creating account:', error.message);
    }
    setLoading(false);
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
          label="First Name"
          keyboardType="default"
          placeholder="John"
          placeholderMarginLeft={responsiveWidth(3)}
          responsiveMarginTop={5}
          source={User}
          value={firstName}
          onChangeText={(text) => setfirstName(text)}
        />
          <CustomTextInput
          label="Last Name"
          keyboardType="default"
          placeholder="Doe"
          placeholderMarginLeft={responsiveWidth(3)}
          responsiveMarginTop={5}
          source={User}
          value={lastName}
          onChangeText={(text) => setlastName(text)}
        />
        <CustomTextInput
          label="Cell Phone"
          keyboardType="phone-pad"
          placeholder="03440345050"
          placeholderMarginLeft={responsiveWidth(3)}
          responsiveMarginTop={7}
          source={Phone}
          value={phoneNumber}
          onChangeText={(text) => setPhoneNumber(text)}
        />

        <MonthYearPicker
            label="Date of Birth"
            responsiveMarginTop={7}
            source={calendar}
            onChangeText={(text) => setDOB(text)}
        />

    <HorizontalLine marginTop={responsiveHeight(6)} width={responsiveWidth(70)} />
        <View style={appStyles.createcheckview}>
          <Text style={appStyles.Entertxt}>I am currently unhoused</Text>
          <CustomCheckbox checked={isUnhoused} onPress={() => setIsUnhoused(!isUnhoused)}/>
        </View>
        {/* <View style={[appStyles.createcheckview, { marginTop: responsiveHeight(4) }]}>
          <Text style={appStyles.Entertxt}>I am over the age of 13</Text>
          <CustomCheckbox checked={isOver13} onPress={() => setIsOver13(!isOver13)}/>
        </View> */}

        <View style={appStyles.createcheckview2}>
          <Text style={appStyles.Entertxt}>I am currently receiving some form of public assistance</Text>
          <CustomCheckbox marginTop={responsiveHeight(0.5)} checked={isReceivingAssistance} onPress={() => setIsReceivingAssistance(!isReceivingAssistance)}/>
        </View>

        <Text style={[appStyles.modalText1, { marginLeft: responsiveWidth(5), marginTop: responsiveHeight(3) }]}>Address</Text>
        {!isUnhoused &&
        <>
        <CustomTextInput
          label="Street"
          keyboardType="default"
          placeholder="street"
          placeholderMarginLeft={responsiveWidth(3)}
          responsiveMarginTop={3}
          source={mappin}
          value={street}
          onChangeText={(text) => setStreet(text)}
        />
        <CustomTextInput
          label="City"
          keyboardType="default"
          placeholder="city"
          placeholderMarginLeft={responsiveWidth(3)}
          responsiveMarginTop={7}
          source={mappin}
          value={city}
          onChangeText={(text) => setCity(text)}
        />
        </>
}
        <View style={{ flexDirection: 'row', marginLeft: responsiveWidth(5), marginBottom: responsiveHeight(5) }}>
          <CustomTextInput
            label="State"
            keyboardType="default"
            placeholder="state"
            placeholderMarginLeft={responsiveWidth(3)}
            responsiveMarginTop={!isUnhoused ? 7 : 3}
            inputWidth={responsiveWidth(42)}
            source={mappin}
            TextinputWidth={responsiveWidth(28)}
            value={state}
            onChangeText={(text) => setState(text)}
          />
          <CustomTextInput
            label="Zip"
            keyboardType="numeric"
            placeholder="zip"
            placeholderMarginLeft={responsiveWidth(3)}
            responsiveMarginTop={!isUnhoused ? 7 : 3}
            custommarginleft={responsiveWidth(5)}
            source={mappin}
            inputWidth={responsiveWidth(42)}
            TextinputWidth={responsiveWidth(28)}
            value={zip}
            onChangeText={(text) => setZip(text)}
          />
        </View>
        
        <TouchableOpacity style={[appStyles.Lubemeupcontainer, { marginTop: responsiveHeight(4) }]}>
          <Button
            label="Continue"
            customImageSource={arrowrightwhite}
            customImageMarginRight={responsiveWidth(3)}
            onPress={handleCreateAccount}
          />
        </TouchableOpacity>
        <View style={{ height: responsiveHeight(12) }} />
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
         <Loaders.AbsolutePrimary
          isVisible={loading}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
