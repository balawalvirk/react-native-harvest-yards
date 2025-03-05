import React from 'react'
import Toast from 'react-native-toast-message';
import RootNavigation from './src/navigation/RootNavigation'
import { SafeAreaView, Text, View } from 'react-native';
const App = () => {
  return (
    <>
      <RootNavigation />
      <Toast />
      {/* <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
        <Text
        onPress={()=>console.log('app.js')}
        >App.js</Text>
      </View> */}
    </>
  );
};

export default App;