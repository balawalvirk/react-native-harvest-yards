import React,{useEffect} from 'react';
import { Image, ImageBackground, Text, View } from 'react-native';
import { appStyles } from '../../../../src/services/utilities/appStyles';
import { HYlogo, Logo, Splash1 } from '../../../services/utilities/assets';
import { SafeAreaView } from 'react-native-safe-area-context';
import auth from '@react-native-firebase/auth';
const Splash = ({ navigation }) => {
  useEffect(() => {
    const checkAuthentication = async () => {
      const user = auth().currentUser;
      if (user) {
        navigation.navigate('DrawerNavigation', { screen: 'FindFood' });
      } else {
        navigation.navigate('AuthNavigation', { screen: 'Login' });
      }
    };
    const timeout = setTimeout(() => {
      checkAuthentication();
    }, 1500);
    return () => clearTimeout(timeout);
  }, [navigation]);
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