import React from 'react'
import Toast from 'react-native-toast-message';
import RootNavigation from './src/navigation/RootNavigation'
import { NavigationContainer } from '@react-navigation/native';
const App = () => {
  return (
    <>
      <RootNavigation />
      <Toast />
    </>

  );
};
export default App;