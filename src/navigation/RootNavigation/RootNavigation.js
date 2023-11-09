// RootNavigation.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppNavigation from '../appNavigation';
import AuthNavigation from '../authNavigation'
import DrawerNavigation from '../Drawer Navigation';
const Stack = createStackNavigator();
const RootNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='AuthNavigation'>
        <Stack.Screen name='AuthNavigation' component={AuthNavigation} />
        <Stack.Screen name='AppNavigation' component={AppNavigation} />
        <Stack.Screen name='DrawerNavigation' component={DrawerNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default RootNavigation;
