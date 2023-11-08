import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity,ScrollView, Image } from 'react-native';
import { appStyles } from '../../../services/utilities/appStyles';
import CustomTextInput from '../../../components/Textinputs';
import { colors } from '../../../services/utilities/color';
import { responsiveFontSize, responsiveHeight, responsiveWidth, } from 'react-native-responsive-dimensions';
import Checkbox from '../../../components/Checkbox';
import Button from '../../../components/Button';
import LinearGradient from 'react-native-linear-gradient';
import { Email, HYlogo, HYlogowhite, Logo, MaskGroup19, User, lock, login } from '../../../services/utilities/assets';
import { SafeAreaView } from 'react-native-safe-area-context';
export default function Login({navigation}) {
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const toggleCheckbox = () => {
    setCheckboxChecked((prevChecked) => !prevChecked);
  };
  const handlearrow = () => {
    navigation.navigate('ResetPassword')
  };
  return (
    <SafeAreaView style={appStyles.container}>
       <ScrollView contentContainerStyle={appStyles.scrollViewContainer} showsVerticalScrollIndicator={false}>
   <Image source={HYlogowhite} style={appStyles.logo}/>
      <Text style={appStyles.Accounttxt}>Login To Your Account</Text>
      {/* <Text style={appStyles.Entertxt}>Enter Your Email Address And Password</Text> */}
      <CustomTextInput
        label="Email Address"
        keyboardType="default"
        placeholder="example@email.com"
        placeholderMarginLeft={responsiveWidth(3)}
        responsiveMarginTop={5}
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
      <View style={appStyles.rowContainer}>
       
       <View style={{flexDirection:'row',justifyContent:'space-between'}}>
      <View>
      <Checkbox checked={checkboxChecked} onPress={toggleCheckbox} />
      </View>
       
        <Text style={appStyles.rememberMeText}>Remember Me</Text>
        </View> 
        <TouchableOpacity onPress={handlearrow}>
          <Text style={appStyles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
     <TouchableOpacity style={appStyles.Lubemeupcontainer}>
     <Button
          label="Login"
          customImageSource={login}
          customImageMarginRight={responsiveWidth(2)}
       onPress={()=>navigation.navigate('DrawerNavigation',{screen:'FindFood'})}
        />
     </TouchableOpacity>
      

      <View style={appStyles.loginbottomview}>
        {/* <Text style={appStyles.DontAccounttxt}>Don't have an account?</Text> */}
       <TouchableOpacity onPress={()=>navigation.navigate('CreateAccount')}>
       <View style={appStyles.AccountView}>
          <Image source={User}
            style={appStyles.user} />
          <Text style={appStyles.CAtxt}>Create Account</Text>
        </View>
        </TouchableOpacity> 
      </View>
      <View style={{ height: responsiveHeight(6) }}/>
      </ScrollView>
    </SafeAreaView>
  );
}
