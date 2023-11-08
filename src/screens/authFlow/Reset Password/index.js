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
import { SentModal } from '../../../components/Modal';

export default function Index({ navigation }) {
  const handlearrow = () => {
    navigation.goBack();
  };
  const [islinksentModalVisible, setIslinksentModalVisible] = useState(false);
  const [resetLinkSent, setResetLinkSent] = useState(false);
  const handlesendresetlink = () => {
    setIslinksentModalVisible(true);
    setResetLinkSent(true);
    setTimeout(() => {
      setIslinksentModalVisible(false);
      navigation.navigate('Login'); 
    }, 2000); 
  };
  useEffect(() => {
  }, [resetLinkSent]);

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
