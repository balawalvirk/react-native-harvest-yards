import React from 'react';
import { Image, View, Text, ImageBackground } from 'react-native';
import { appStyles } from '../../services/utilities/appStyles';
import { Bell, Logo } from '../../services/utilities/assets';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
export default function Header({
  showImage,
  headerText,
  onPress,
  imageSource,
  showImage2,
  onPress2,
  customTextstyle,
  marginleft,
  customTextMarginLeft, 
  bellmarginleft
}) {
  const radius = 12;
  const headerStyle = {
    ...appStyles.headerContainer,
    borderBottomWidth: 0, 
  };
  const textStyles = [
    appStyles.headerText,
    customTextstyle,
    { marginLeft: customTextMarginLeft }, // Apply custom marginLeft to the text
  ];
  return (
    <View style={headerStyle}>
      {showImage && (
        <TouchableOpacity onPress={onPress}>
          <Image source={imageSource} style={[appStyles.arrow,{marginLeft:marginleft}]} />
        </TouchableOpacity>
      )}
        
      <Text style={textStyles}>{headerText}</Text>
      {showImage2 && (
        <TouchableOpacity onPress={onPress2}>
  <Image source={Bell} style={[appStyles.arrow,{marginLeft:bellmarginleft}]}/>
        </TouchableOpacity>
        
      )}
    </View>
  );
}
