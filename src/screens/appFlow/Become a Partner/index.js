import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
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
  Shakehand,
  User,
  animation,
  lock,
} from '../../../services/utilities/assets';
import { appStyles } from '../../../services/utilities/appStyles';
import CustomTextInput from '../../../components/Textinputs';
import { SafeAreaView } from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-toast-message';
import { scale } from 'react-native-size-matters';
export default function BecomeaPartner({ navigation }) {
  const [fullName, setFullName] = useState('');
  const [organization, setOrganization] = useState('');
  const [orgType, setOrgType] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); 
  const handleCreateBtn = async () => {
    const userId = auth().currentUser.uid;

    // Validation checks
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

    if (!organization) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Organization is required!',
      });
      return;
    }
    if (organization.length < 3) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Organization should have at least 3 characters!',
      });
      return;
    }
    if (!orgType) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Type of Organization is required!',
      });
      return;
    }
    if (orgType.length < 3) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'OrgType should have at least 3 characters!',
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

    try {
      setLoading(true); 
      await firestore().collection('Partners').doc(userId).set({
        fullName,
        organization,
        orgType,
        email,
        phoneNumber,
        message,
        userId,
      });

      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Data stored successfully!',
      });

      navigation.navigate('FindFood');
      setLoading(false); 
    } catch (error) {
      setLoading(false); 
      console.error('Error storing data: ', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to store data!',
      });
    }
  };

  const handlearrow = () => {
    navigation.goBack();
  };

  const validateEmail = (email) => {
    // Add your email validation logic here (Regex or any validation method)
    // Example regex for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <SafeAreaView style={appStyles.container}>
      <Header
        imageSource={LeftButton}
        headerText="Become a Partner"
        showImage={true}
        onPress={handlearrow}
        customTextMarginLeft={responsiveWidth(17)}
      />
      <KeyboardAwareScrollView
        contentContainerStyle={appStyles.scrollViewContainer}
        showsVerticalScrollIndicator={false}
        extraScrollHeight={responsiveHeight(20)}>
        <Image source={Shakehand} style={appStyles.frame} />
        <View style={appStyles.partnertxtview}>
          <Text style={appStyles.txtpartner}>
            Harvest Yards is working to streamline the process of bridging the gaps between the food suppliers, food distributors/centers, consumers, and composters. If your company or organization is interested in becoming a strategic partner we would like to welcome you and work with you to join us in the fight to irradicate food insecurity
          </Text>
        </View>
        <CustomTextInput
          label="Full Name"
          keyboardType="default"
          placeholder="John Doe"
          responsiveMarginTop={3}
          value={fullName}
          onChangeText={setFullName}
        />

        <CustomTextInput
          label="Organization"
          keyboardType="default"
          placeholder="Organization"
          responsiveMarginTop={7}
          value={organization}
          onChangeText={setOrganization}
        />

        <CustomTextInput
          label="Type Of Organization"
          keyboardType="default"
          placeholder="Type of organization"
          responsiveMarginTop={7}
          value={orgType}
          onChangeText={setOrgType}
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
          label="Phone Number"
          keyboardType="number-pad"
          placeholder="Enter a number"
          responsiveMarginTop={7}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />

        <CustomTextInput
          label="Your Message"
          keyboardType="default"
          placeholder="Write something here..."
          inputHeight={scale(112)}
          placeholderMarginTop={responsiveHeight(1)}
          responsiveMarginTop={7}
          value={message}
          marginLeft={true}
       
          multiline={true}
          onChangeText={setMessage}
        />

        <TouchableOpacity style={[appStyles.Lubemeupcontainer, { marginTop: responsiveHeight(15) }]}>
          <Button
            label="Send Message"

            onPress={handleCreateBtn}
          />
        </TouchableOpacity>
        <View style={appStyles.loadingContainer}>
              {loading && (
                <LottieView
                  source={animation}
                  autoPlay
                  loop
                  style={appStyles.loadingAnimation}
                />
              )}
            </View>
        <View style={{ height: responsiveHeight(12) }} />

      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
