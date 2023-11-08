import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'; // Import LinearGradient
import { appStyles } from '../../services/utilities/appStyles';
import { Checkcirclewhite, Email, checkmark } from '../../services/utilities/assets';
import { colors } from '../../services/utilities/color';
export default function Purchasingview({
  Unlimitedplan,
  txt1,
  txt2,
  txt3,
  txt4,
  txt5,
 monthly,
  showtick,
  useGradient,
  onPress, 
  textColor, 
  custommarginleft,
  isYearly, 

}) {
  console.log(isYearly); 
  const gradientColors = [colors.color3, colors.color20]; 
  const defaultTextColor = textColor || colors.color10; 
  const textStyle = { ...appStyles.personalitytxt, color: defaultTextColor };
  if (useGradient) {
    return (
      <LinearGradient
        colors={gradientColors}
        style={appStyles.purchasinggrview}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
      >
        <Text style={{ ...appStyles.plantxt, color: defaultTextColor }}>{Unlimitedplan}</Text>
        {showtick && (
          <Image source={Checkcirclewhite} style={appStyles.circle} />
        )}
        <Text style={textStyle}>
          {'\u2022'} {txt1}{'\n'}
          {'\u2022'} {txt2}{'\n'}
          {'\u2022'} {txt3}{'\n'}
          {'\u2022'} {txt4}
        </Text>
        <Text style={{ ...appStyles.dllortext, color: defaultTextColor ,marginLeft:custommarginleft}}>{txt5}</Text>
        <Text style={{ ...appStyles.monthlytxt, color: defaultTextColor }}>{monthly}</Text>
      </LinearGradient>
    );
  } else {
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={appStyles.purchasingview}>
          <Text style={appStyles.plantxt}>{Unlimitedplan}</Text>
          {showtick && (
            <Image source={Email} style={appStyles.circle} />
          )}
          <Text style={textStyle}>
            {'\u2022'} {txt1}{'\n'}
            {'\u2022'} {txt2}{'\n'}
            {'\u2022'} {txt3}{'\n'}
            {'\u2022'} {txt4}
          </Text>
          <Text style={{ ...appStyles.dllortext, color: defaultTextColor }}>{txt5}</Text>
          <Text style={{ ...appStyles.monthlytxt, color: defaultTextColor }}>{monthly}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}
