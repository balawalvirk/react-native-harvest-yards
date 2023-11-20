import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity,ScrollView, Image } from 'react-native';
import { appStyles } from '../../../services/utilities/appStyles';
import CustomTextInput from '../../../components/Textinputs';
import LottieView from 'lottie-react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth, } from 'react-native-responsive-dimensions';
import Checkbox from '../../../components/Checkbox';
import Button from '../../../components/Button';
import { Email, HYlogo, HYlogowhite, Logo, MaskGroup19, User, animation, lock, login } from '../../../services/utilities/assets';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import auth from '@react-native-firebase/auth';
export default function Login({navigation}) {
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); 
  const toggleCheckbox = () => {
    setCheckboxChecked((prevChecked) => !prevChecked);
  };
  const handlearrow = () => {
    navigation.navigate('ResetPassword')
  };
  const isValidEmail = (email) => {
    // Implement your email validation logic
    return /\S+@\S+\.\S+/.test(email);
  };
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
  const handleLogin = async () => {
    try {
      setLoading(true); 

      const formattedEmail = capitalizeFirstLetter(email);

      // Validate if email is empty
      if (!email) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2:'Email is required',
        });
        setLoading(false);
        return;
      }

      if (!formattedEmail || !isValidEmail(formattedEmail)) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2:'Invalid email address',
        });
        setLoading(false);

        return;
      }
      // // Validate email
      // if (!email || !isValidEmail(email)) {
      //   Toast.show({
      //     type: 'error',
      //     text1: 'Error',
      //     text2: !email ? 'Email is required' : 'Invalid email address',
      //   });
      //   setLoading(false); 
      //   return;
      // }

      // Validate password
      if (!password) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Password is required',
        }); 
        setLoading(false);
        return;
      }

      const response = await auth().signInWithEmailAndPassword(email, password);

      // Additional logic after successful login, if needed
      console.log('Login successful!', response.user.uid);

      // Show success toast
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Login successful!',
      });

      // Navigate to the next screen
      navigation.navigate('DrawerNavigation', { screen: 'FindFood' });
    } catch (error) {
      console.error('Error logging in:', error.message);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to log in. Please check your Email & Password',
      });
    }
    finally {
      setLoading(false); // Set loading to false regardless of success or error
    }
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
        autoCapitalize={true}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <CustomTextInput
        label="Password"
        keyboardType="default"
        placeholder="Minimum 8 characters"
        placeholderMarginLeft={responsiveWidth(3)}
        responsiveMarginTop={7}
        value={password}
        onChangeText={(text) => setPassword(text)}
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
       onPress={handleLogin}
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
