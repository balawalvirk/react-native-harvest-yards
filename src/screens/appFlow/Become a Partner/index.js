import {View, Text, TouchableOpacity, Image,ScrollView} from 'react-native';
import React, {useState} from 'react';
import Header from '../../../components/Headers';
import Button from '../../../components/Button';
import {colors} from '../../../services/utilities/color';
import CustomCheckbox from '../../../components/Checkbox';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
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
  lock,
} from '../../../services/utilities/assets';
import {appStyles} from '../../../services/utilities/appStyles';
import CustomTextInput from '../../../components/Textinputs';
import {SafeAreaView} from 'react-native-safe-area-context';
import { scale } from 'react-native-size-matters';
export default function BecomeaPartner({navigation}) {
  const handlearrow = () => {
    navigation.goBack();
  };
  const handlecreatebtn = () => {
    navigation.navigate('FindFood');
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
        />
         <CustomTextInput
          label="Organization"
          keyboardType="default"
          placeholder="Organization"    
          responsiveMarginTop={7}
        />
          <CustomTextInput
          label="Type Of Organization"
          keyboardType="default"
          placeholder="Type of organization"    
          responsiveMarginTop={7}
        />
        <CustomTextInput
          label="Email Address"
          keyboardType="default"
          placeholder="example@email.com"    
          responsiveMarginTop={7}
        
        />
          <CustomTextInput
          label="Phone Number"
          keyboardType="Number-pad"
          placeholder="Enter a number"    
          responsiveMarginTop={7} 
        />
      <CustomTextInput
          label="Your Message"
          keyboardType="default"
          placeholder="Write something here..."
           inputHeight={scale(112)}
           placeholderMarginTop={responsiveHeight(1)}
          responsiveMarginTop={7}
       
        />
    
        <TouchableOpacity style={[appStyles.Lubemeupcontainer,{marginTop:responsiveHeight(15)}]}> 
       <Button
            label="Send Message"
          
              onPress={handlecreatebtn}
          />
       </TouchableOpacity>
        <View style={{height: responsiveHeight(12)}} />
       
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
