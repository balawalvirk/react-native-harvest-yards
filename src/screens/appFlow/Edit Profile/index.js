import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import Header from '../../../components/Headers';
import Button from '../../../components/Button';
import { colors } from '../../../services/utilities/color';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Toast from 'react-native-toast-message';
import {
  Email,
  LeftButton,
  Upload,
  animation,
  lock,
  mappin,
} from '../../../services/utilities/assets';
import { appStyles } from '../../../services/utilities/appStyles';
import CustomTextInput from '../../../components/Textinputs';
import { SafeAreaView } from 'react-native-safe-area-context';
import firestore from '@react-native-firebase/firestore'; // Correct import statement
import auth from '@react-native-firebase/auth'; // Make sure you've imported auth if used
import LottieView from 'lottie-react-native';
import CustomSwitch from '../../../components/Switch';
export default function EditProfile({ navigation }) {
  const [userId, setUserId] = useState('');
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [UserName, setUserName] = useState('');
  const [email, setemail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [Password, setPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const currentUser = auth().currentUser;
      if (currentUser) {
        setLoading(true);
        const userRef = firestore().collection('users').doc(currentUser.uid);
        const doc = await userRef.get();

        if (doc.exists) {
          const userData = doc.data();
          setUserId(currentUser.uid);
          setfirstName(userData.firstName || '');
          setlastName(userData.lastName || '');
          setemail(userData.email || '');
          setPhoneNumber(userData.phoneNumber || '');
          setStreet(userData.street || '');
          setCity(userData.city || '');
          setState(userData.state || '');
          setZip(userData.zip || '');
          setUserName(userData.UserName || '');
          setConfirmPassword(userData.ConfirmPassword || '');
          setPassword(userData.Password || '');
          setLoading(false);
        }
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setLoading(false);
    }
  };

  const saveChanges = async () => {
    setLoading(true);
    try {
      if (!validateInputs()) {
        setLoading(false);
        return;
      }

      const currentUser = auth().currentUser;

      if (currentUser) {
        // Update email if it has been changed
        if (email !== currentUser.email) {
          await currentUser.updateEmail(email);
        }

        // Update password if it has been changed
        if (Password) {
          await currentUser.updatePassword(Password);
        }

        const userRef = firestore().collection('users').doc(userId);
        const notificationValue = switchValue ? 'yes' : 'no';

        await userRef.update({
          firstName,
          lastName,
          UserName,
          email,
          phoneNumber,
          street,
          city,
          state,
          zip,
          notification: notificationValue,
        });

        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Save changes successfully!',
        });

        navigation.navigate('FindFood');
      }
    } catch (error) {
      showToast('Error saving changes');
    } finally {
      setLoading(false); // Set loading to false regardless of success or error
    }
  };
  const [switchValue, setSwitchValue] = useState(false);
  const phonePattern = /^\d{10}$/;
  const handleToggle = (value) => {
    // Handle the toggle action here
    setSwitchValue(value);
  };
  const validateInputs = () => {
    if (!firstName) {
      showToast('First name is required');
      return false;
    } else if (firstName.length < 3) {
      showToast('First name must be at least 3 characters');
      return false;
    }

    if (!lastName) {
      showToast('Last name is required');
      return false;
    } else if (lastName.length < 3) {
      showToast('Last name must be at least 3 characters');
      return false;
    }

    if (!UserName) {
      showToast('Username is required');
      return false;
    } else if (UserName.length < 3) {
      showToast('Username must be at least 3 characters');
      return false;
    }

    if (!email) {
      showToast('Email is required');
      return false;
    } else if (!isValidEmail(email)) {
      showToast('Invalid email');
      return false;
    }
    // if (!phoneNumber) {
    //   showToast('Phone Number is required');
    //   return false;
    // } else if (!phonePattern.test(phoneNumber)) {
    //   showToast('Invalid Phone Number.');
    //   return false;
    // }

    if (!street) {
      showToast('street is required');
      return false;
    }
    if (!city) {
      showToast('city is required');
      return false;
    }
    if (!state) {
      showToast('state is required');
      return false;
    }
    if (!zip) {
      showToast('zip is required');
      return false;
    }
    if (!Password) {
      showToast('Password is required');
      return false;
    } else if (Password.length < 8) {
      showToast('Password should be at least 8 characters');
      return false;
    } else if (!ConfirmPassword) {
      showToast('Confirm Password is required');
      return false;
    } else if (ConfirmPassword !== Password) {
      showToast('Passwords do not match');
      return false;
    }
    return true;
  };

  const showToast = (message) => {
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: message,
    });
  };
  const isValidEmail = (email) => {
    // Implement your email validation logic
    return /\S+@\S+\.\S+/.test(email);
  };

  return (
    <SafeAreaView style={appStyles.container}>
      <Header
        imageSource={LeftButton}
        headerText="Edit Profile"
        showImage={true}
        onPress={() => navigation.goBack()}
        customTextMarginLeft={responsiveWidth(25)}
      />
      <ScrollView
        contentContainerStyle={appStyles.scrollViewContainer}
        showsVerticalScrollIndicator={false}>
        <Text style={appStyles.infotxt}>Basic Info</Text>
        <CustomTextInput
          label="First Name"
          keyboardType="default"
          placeholder="John"
          responsiveMarginTop={3}
          value={firstName}
          onChangeText={(text) => setfirstName(text)}
        />
        <CustomTextInput
          label="Last Name"
          keyboardType="default"
          placeholder="Doe"
          responsiveMarginTop={7}
          value={lastName}
          onChangeText={(text) => setlastName(text)}
        />

        <CustomTextInput
          label="Username"
          keyboardType="default"
          placeholder="example123"
          responsiveMarginTop={7}
          value={UserName}
          onChangeText={(text) => setUserName(text)}
        />
        <CustomTextInput
          label="Email Address"
          keyboardType="default"
          placeholder="example@email.com"
          responsiveMarginTop={7}
          autoCapitalize={true}
          value={email}
          onChangeText={(text) => setemail(text)}
        />

        <CustomTextInput
          label="Phone Number"
          keyboardType="phone-pad"
          placeholder="Enter a number"
          responsiveMarginTop={7}
          value={phoneNumber} // Add value prop to display user data
          onChangeText={(text) => setPhoneNumber(text)}
        />
        <Text style={[appStyles.modalText1, { marginLeft: responsiveWidth(5), marginTop: responsiveHeight(7) }]}>Address</Text>
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
        <View style={{ flexDirection: 'row', marginLeft: responsiveWidth(5) }}>
          <CustomTextInput
            label="State"
            keyboardType="default"
            placeholder="state"
            placeholderMarginLeft={responsiveWidth(3)}
            responsiveMarginTop={7}
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
            responsiveMarginTop={7}
            custommarginleft={responsiveWidth(5)}
            source={mappin}
            inputWidth={responsiveWidth(42)}
            TextinputWidth={responsiveWidth(28)}
            value={zip}
            onChangeText={(text) => setZip(text)}
          />
        </View>

        <Text style={[appStyles.infotxt, { marginTop: responsiveHeight(7) }]}>Secure Your Account</Text>
        <CustomTextInput
          label="Password"
          keyboardType="default"
          placeholder="Minimum 8 characters"
          placeholderMarginLeft={responsiveWidth(3)}
          responsiveMarginTop={3}
          TextinputWidth={responsiveWidth(67)}
          source={lock}
          showeye={true}
          value={Password}
          onChangeText={(text) => setPassword(text)}
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
          value={ConfirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
        />
        <View style={[appStyles.createcheckview, { marginTop: responsiveHeight(8), marginLeft: responsiveWidth(5) }]}>
          <CustomSwitch
            // offColor={colors.color33}
            onColor={colors.color33}
            thumbOffStyle={appStyles.thumbOffStyle}
            value={switchValue}
            trackOffStyle={appStyles.trackOffStyle}
            toggleSwitch={handleToggle}
          />
          <View style={{ width: responsiveWidth(87) }}>
            <Text style={[appStyles.Accept, { marginTop: responsiveHeight(1.2), marginLeft: responsiveWidth(3) }]}>Turn push notifications on/off</Text>
          </View>
        </View>
        <TouchableOpacity style={{ ...appStyles.Lubemeupcontainer, marginTop: responsiveHeight(7) }}>
          <Button
            label="Save Changes"
            customImageMarginRight={responsiveWidth(3)}
            onPress={saveChanges}
          />
        </TouchableOpacity>
        <View style={{ height: responsiveHeight(6) }} />

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
      </ScrollView>

    </SafeAreaView>

  );
}
