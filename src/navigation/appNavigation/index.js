import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Editprofile from '../../screens/appFlow/Edit Profile'
import AppSetting from '../../screens/appFlow/App Setting'
import PrivicyPolicy from '../../screens/appFlow/Pollicy Privicy'
import Aboutus from '../../screens/appFlow/About us'
import BecomeaPartner from '../../screens/appFlow/Become a Partner'
import Coupons from '../../screens/appFlow/Coupons' 
import ReservedFood1 from '../../screens/appFlow/Reserved Food/Reserved Food1'
import ReservedPickups from '../../screens/appFlow/Reserved Food/Reserve Pickups'
import Location from '../../screens/appFlow/Location'
import Donation  from '../../screens/appFlow/Donation';
import LocationRadious from '../../screens/appFlow/Location/Location & Radious'
import MainDonation from '../../screens/appFlow/Donation/Main Donation'
import DisasterRelief from '../../screens/appFlow/Disaster Relief'
import NewDonation from '../../screens/appFlow/Donation/New Donation'
import Reservedfavorites from '../../screens/appFlow/Reserved Food/Reserved Favorites'
const Stack = createStackNavigator();
const AppNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
         <Stack.Screen name="Editprofile" component={Editprofile} />     
         <Stack.Screen name="AppSetting" component={AppSetting} />       
         <Stack.Screen name="PrivicyPolicy" component={PrivicyPolicy} />                  
         <Stack.Screen name="Aboutus" component={Aboutus} /> 
         <Stack.Screen name="Coupons" component={Coupons} /> 
         <Stack.Screen name="BecomeaPartner" component={BecomeaPartner} /> 
         <Stack.Screen name="Reservedfood1" component={ReservedFood1} /> 
         <Stack.Screen name="ReservedPickups" component={ReservedPickups} /> 
         <Stack.Screen name="Location" component={Location} /> 
         <Stack.Screen name="Donation" component={Donation} /> 
         <Stack.Screen name="NewDonation" component={NewDonation} /> 
         <Stack.Screen name="Reservedfavorites" component={Reservedfavorites} /> 
         <Stack.Screen name="MainDonation" component={MainDonation} /> 
         <Stack.Screen name="LocationRadious" component={LocationRadious} /> 
         <Stack.Screen name="DisasterRelief" component={DisasterRelief} /> 
    </Stack.Navigator>
  );
};
export default AppNavigation;
