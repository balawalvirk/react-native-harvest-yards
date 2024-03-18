import { View, Text, TouchableOpacity, Image, TouchableWithoutFeedback } from 'react-native';
import React, { useState, useEffect,useRef } from 'react';
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
    LeftButton,
    User,
    lock,
} from '../../../services/utilities/assets';
import { Picker } from '@react-native-picker/picker';
import { appStyles } from '../../../services/utilities/appStyles';
import CustomTextInput from '../../../components/Textinputs';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SentModal } from '../../../components/Modal';
import { Loaders } from '../../../components';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-toast-message';
export default function AdditionalInfo({ route, navigation }) {
    const { firstName,lastName,phoneNumber,dob, street, city, state,zip, isUnhoused, isReceivingAssistance } = route.params;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [Confirmpassword, setConfirmPassword] = useState('');
    const [householdSize, setHouseholdSize] = useState('');
    const [smsUpdates, setSmsUpdates] = useState('');
    const [acceptTerms, setAcceptTerms] = useState('');
    const [islinksentModalVisible, setIslinksentModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const handlearrow = () => {
        navigation.goBack();
    };
    const isValidEmail = (email) => {
      // Implement your email validation logic
      return /\S+@\S+\.\S+/.test(email);
    };

    const handlesendresetlink = async () => {
        try {

            if (!email) {
                Toast.show({
                  type: 'error',
                  text1: 'Error',
                  text2: 'Email is required',
                });
                return;
              }
              if (!isValidEmail(email)) {
                Toast.show({
                  type: 'error',
                  text1: 'Error',
                  text2: 'Invalid email address',
                });
                return;
              }

              // Validate password
              if (!password) {
                Toast.show({
                  type: 'error',
                  text1: 'Error',
                  text2: 'Password is required',
                });
                return;
              }

              // Validate password length
              if (password.length < 8) {
                Toast.show({
                  type: 'error',
                  text1: 'Error',
                  text2: 'Password must be at least 8 characters',
                });
                return;
              }

              // Validate Confirm Password
              if (!Confirmpassword) {
                Toast.show({
                  type: 'error',
                  text1: 'Error',
                  text2: 'Confirm Password is required',
                });
                return;
              }

              // Validate password match
              if (password !== Confirmpassword) {
                Toast.show({
                  type: 'error',
                  text1: 'Error',
                  text2: 'Password and Confirm Password do not match',
                });
                return;
              }
              if (!householdSize) {
                Toast.show({
                  type: 'error',
                  text1: 'Error',
                  text2: 'Householdsize is required',
                });
                return;
              }
              if (!acceptTerms) {
                // Show a toast message indicating that the terms and conditions need to be accepted
                Toast.show({
                  type: 'error',
                  text1: 'Error',
                  text2: 'Please accept the terms and conditions',
                });
                return;
              }
            setLoading(true);
            const numberOfPackages = (householdSize <= 4) ? 1 : (householdSize <= 8) ? 2 : 3
            const lowerCaseEmail = email.trim().toLowerCase();
            // Create user in Firebase Authentication
            const authResponse = await auth().createUserWithEmailAndPassword(email.trim().toLowerCase(), password);
            const userId = authResponse.user.uid;
            setIslinksentModalVisible(true);
            console.log('Modal should show now...');
            // Pass data to Firestore
            await firestore().collection('users').doc(authResponse.user.uid).set({
                userId,
                firstName,
                lastName,
                dob: dob,
                street,
                city,
                state,
                zip,
                isUnhoused: isUnhoused ? 'Yes' : 'No',
                isReceivingAssistance: isReceivingAssistance ? 'Yes' : 'No',
                email: lowerCaseEmail,
                phoneNumber,
                householdSize,
                agreementAccepted: acceptTerms ? 'Yes' : 'No',
                smsUpdates: smsUpdates ? 'Yes' : 'No',
                numberOfPackages: numberOfPackages
            });
            setIslinksentModalVisible(true);
            navigation.navigate('DrawerNavigation', { screen: 'FindFood' });
          } catch (error) {
            console.error('Firebase Error:', error);
            // Display a more informative error message or log specific error details.
            Toast.show({
              type: 'error',
              text1: 'Error',
              text2: 'This email address is already in use.',
            });
         }
         finally {
          setLoading(false);
          setIslinksentModalVisible(false)
        }
    };

    return (
        <SafeAreaView style={appStyles.container}>
            <Header
                imageSource={LeftButton}
                headerText="Additional info"
                showImage={true}
                onPress={handlearrow}
                customTextMarginLeft={responsiveWidth(22)}
            />
            <KeyboardAwareScrollView
                contentContainerStyle={appStyles.scrollViewContainer}
                showsVerticalScrollIndicator={false}
                extraScrollHeight={responsiveHeight(20)}>
                <CustomTextInput
                    label="Email Address"
                    keyboardType="default"
                    placeholder="example@gmail.com"
                    placeholderMarginLeft={responsiveWidth(3)}
                    responsiveMarginTop={5}
                    source={User}
                    autoCapitalize={true}
                    value={email.trim()}
                    onChangeText={(text) => setEmail(text)}
                />

                <CustomTextInput
                    label="Password"
                    keyboardType="default"
                    placeholder="Minimum 8 characters"
                    placeholderMarginLeft={responsiveWidth(3)}
                    responsiveMarginTop={6}
                    source={User}
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
                <CustomTextInput
                    label="Confirm Password"
                    keyboardType="default"
                    placeholder="Minimum 8 characters"
                    placeholderMarginLeft={responsiveWidth(3)}
                    responsiveMarginTop={6}
                    TextinputWidth={responsiveWidth(67)}
                    source={lock}
                    showeye={true}
                    value={Confirmpassword}
                    onChangeText={(text) => setConfirmPassword(text)}
                />

                <CustomTextInput
                    label="How many people in your household?"
                    keyboardType="phone-pad"
                    placeholder="How many people in your household?"
                    placeholderMarginLeft={responsiveWidth(3)}
                    responsiveMarginTop={6}
                    source={User}
                    value={householdSize}
                    onChangeText={(text) => setHouseholdSize(text)} />
                <View style={[appStyles.createcheckview, { marginTop: responsiveHeight(8), marginLeft: responsiveWidth(5) }]}>
                    <CustomCheckbox
                        checked={smsUpdates} onPress={() => setSmsUpdates(!smsUpdates)} />
                    <View style={{ width: responsiveWidth(87) }}>
                        <Text style={[appStyles.Accept, { marginTop: -responsiveHeight(0.5) }]}>I agree to the use of my phone number for receiving SMS updates and notifications</Text>
                    </View>
                </View>
                <View style={[appStyles.acceptview, { marginTop: responsiveHeight(2) }]}>
                    <View>
                        <CustomCheckbox
                            checked={acceptTerms} onPress={() => setAcceptTerms(!acceptTerms)} />
                    </View>
                    <Text style={appStyles.Accept}>Accept</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Termsandconditions')}>
                        <Text style={appStyles.TermsText}>Terms & Conditions</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={[appStyles.Lubemeupcontainer, { marginTop: responsiveHeight(3) }]}>
                    <Button
                        label="Create Account"
                        customImageMarginRight={responsiveWidth(3)}
                        onPress={handlesendresetlink}
                    />
                </TouchableOpacity>
                <View style={{ height: responsiveHeight(6) }} />
            </KeyboardAwareScrollView>
            <SentModal isVisible={islinksentModalVisible}
                LinkSent='Account Created'
                passowrd='Your account has been registered successfully.'
            />
             <Loaders.AbsolutePrimary
              isVisible={loading}
            />
        </SafeAreaView>
    );
}




