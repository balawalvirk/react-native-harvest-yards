import {View, Text, TouchableOpacity, ScrollView, Image,} from 'react-native';
import React, {useState,useEffect} from 'react';
import Header from '../../../components/Headers';
import Button from '../../../components/Button';
import {colors} from '../../../services/utilities/color';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {
Settings,
  LeftButton,

} from '../../../services/utilities/assets';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import {appStyles} from '../../../services/utilities/appStyles';
import CustomTextInput from '../../../components/Textinputs';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import SelectOptionPicker from '../../../components/selectOptionPicker';
import Buttonview from '../../../components/ButtonView';
export default function Index({navigation}) {
  const [selectedDate, setSelectedDate] = useState('');
  const [showModel, setShowModel] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [imageSource, setImageSource] = useState(null);

  const openImageLibrary = () => {
    let options = {
      storageOptions: {
        path: 'image',
      },
    };

    launchImageLibrary(options, async (response) => {
      if (response && response.assets && response.assets.length > 0) {
        const imageUri = response.assets[0].uri;
  
        setImageSource(imageUri);
      } else {
        // Handle the case where the user canceled without selecting an image
        Alert.alert("User did not select an image.");
      }
    });
  }


  return (
    <SafeAreaView style={appStyles.container}>
      <Header
        imageSource={LeftButton}
        headerText="App Settings"
        showImage={true}
        onPress={() => navigation.goBack()}
        customTextMarginLeft={responsiveWidth(25)}
      />
      <ScrollView
        contentContainerStyle={appStyles.scrollViewContainer}
        showsVerticalScrollIndicator={false}>
  <Buttonview
        source={Settings}
        text="Settings Option 1"
        customMarginRight={responsiveWidth(49)}
        customMarginTop={responsiveHeight(1)}
        customTextColor={colors.color4}
      />
      <Buttonview
        source={Settings}
        text="Settings Option 2"
        customMarginRight={responsiveWidth(49)}
        customMarginTop={responsiveHeight(1)}
        customTextColor={colors.color4}
      />
      <Buttonview
        source={Settings}
        text="Settings Option 3"
        customMarginRight={responsiveWidth(49)}
        customMarginTop={responsiveHeight(1)}
        customTextColor={colors.color4}
      />
      <Buttonview
        source={Settings}
        text="Settings Option 4"
        customMarginRight={responsiveWidth(49)}
        customMarginTop={responsiveHeight(1)}
        customTextColor={colors.color4}
      />
      <Buttonview
        source={Settings}
        text="Settings Option 5"
        customMarginRight={responsiveWidth(49)}
        customMarginTop={responsiveHeight(1)}
        customTextColor={colors.color4}
      />
      </ScrollView>
     
    </SafeAreaView>
  );
}
