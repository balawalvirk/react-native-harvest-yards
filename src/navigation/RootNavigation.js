import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import AppNavigation from './appNavigation';
import AuthNavigation from './authNavigation';
import DrawerNavigation from './Drawer Navigation';

const Stack = createStackNavigator();

const RootNavigation = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(currentUser => {
      setUser(currentUser);
    });

    // Clean up subscription on unmount
    return unsubscribe;
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {user ? (
          // If user exists, show AppNavigation
          <>
            <Stack.Screen
              name="DrawerNavigation"
              component={DrawerNavigation}
            />

            <Stack.Screen name="AppNavigation" component={AppNavigation} />
          </>
        ) : (
          // If user doesn't exist, show AuthNavigation
          <Stack.Screen name="AuthNavigation" component={AuthNavigation} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
