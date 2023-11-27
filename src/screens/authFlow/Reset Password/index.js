import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import Header from '../../../components/Headers';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../../../services/utilities/color';
import Button from '../../../components/Button';
import { SafeAreaView } from 'react-native-safe-area-context';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { Btntick, Email, LeftButton, Resetlock, Send, send, sendicon } from '../../../services/utilities/assets';
import { appStyles } from '../../../services/utilities/appStyles';
import CustomTextInput from '../../../components/Textinputs';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import { SentModal } from '../../../components/Modal';
import Toast from 'react-native-toast-message';
export default function Index({ navigation }) {
  const handlearrow = () => {
    navigation.goBack();
  };
  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };
  const [islinksentModalVisible, setIslinksentModalVisible] = useState(false);
  const [email, setEmail] = useState('');
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
        const userSnapshot = await firestore().collection('users').where('email', '==', email).get();

        if (userSnapshot.empty) {
         
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Email not found. Please use a registered email address.',
            });  
            return;
        }
        setIslinksentModalVisible(true);
        await auth().sendPasswordResetEmail(email);
    
        navigation.navigate('Login');
    } catch (error) {
        console.error('Error sending password reset email:', error);
        Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'Failed to send reset link. Please try again.',
        });
    } finally {
        setIslinksentModalVisible(false);
    }
};
  return (
    <SafeAreaView style={appStyles.container}>
      <Header
        imageSource={LeftButton}
        headerText="Reset Password"
        showImage={true}
        onPress={handlearrow}
        customTextMarginLeft={responsiveWidth(20)}
      />
      <ScrollView contentContainerStyle={appStyles.scrollViewContainer} showsVerticalScrollIndicator={false}>
        <Image source={Resetlock} style={appStyles.ResetLock} />
        <Text style={appStyles.ResetLocktxt1}>Enter your registered email address to receive a</Text>
        <Text style={appStyles.ResetLocktxt2}>password reset link.</Text>
        <CustomTextInput
          label="Email Address"
          keyboardType="default"
          placeholder="example@email.com"
          placeholderTextColor={colors.color29}
          placeholderMarginLeft={responsiveWidth(3)}
          responsiveMarginTop={5}
          source={Email}
          value={email}
          autoCapitalize={true}
          onChangeText={(text) => setEmail(text)}
        />
        <TouchableOpacity style={{ ...appStyles.Lubemeupcontainer, marginTop: responsiveHeight(8) }}>
          <Button
            label="Send Reset Link"
            customImageSource={send}
            customImageMarginRight={responsiveWidth(2)}
            onPress={handlesendresetlink}
          />
        </TouchableOpacity>
        <View style={{ height: responsiveHeight(3) }}></View>
      </ScrollView>
      <SentModal isVisible={islinksentModalVisible}
      LinkSent='Link Sent'
       passowrd='Your password reset link has been sent to your email '
       successfully='successfully.'
       />
    </SafeAreaView>
  );
}
