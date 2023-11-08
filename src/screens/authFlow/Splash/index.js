import React from 'react';
import { Image, ImageBackground, Text, View } from 'react-native';
import { appStyles } from '../../../../src/services/utilities/appStyles';
import { HYlogo, Logo, Splash1 } from '../../../services/utilities/assets';
import { SafeAreaView } from 'react-native-safe-area-context';
const Splash = ({ navigation }) => {
  setTimeout(() => {
    navigation.navigate('Login');
  }, 1500);
  return (
    <ImageBackground
      source={Splash1}
      style={appStyles.imageBackground}>
      <SafeAreaView style={appStyles.Splashcontainer}>
        <View style={appStyles.splashview}>
          <Image source={HYlogo} style={appStyles.splashlogo} />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};
export default Splash;