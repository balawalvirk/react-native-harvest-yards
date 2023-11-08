import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Splash from '../../screens/authFlow/Splash'
import Login from '../../screens/authFlow/Login'
import ResetPassword from '../../screens/authFlow/Reset Password'
import CreateAccount from '../../screens/authFlow/Create Account'
import Termsandconditions from '../../screens/authFlow/Terms and conditions'
import CreateAdditionalinfo from '../../screens/authFlow/Create Additional info'
const Stack = createStackNavigator();
const AuthNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
           <Stack.Screen name="Splash" component={Splash} />
           <Stack.Screen name="Login" component={Login} />
           <Stack.Screen name="CreateAccount" component={CreateAccount} />
           <Stack.Screen name="ResetPassword" component={ResetPassword} />
           <Stack.Screen name="CreateAdditionalinfo" component={CreateAdditionalinfo} />
           <Stack.Screen name="Termsandconditions" component={Termsandconditions} /> 
    </Stack.Navigator>
  );
};
export default AuthNavigation;
