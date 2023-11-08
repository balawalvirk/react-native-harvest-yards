import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, Image,TouchableOpacity } from 'react-native';
import { appStyles } from '../../../../src/services/utilities/appStyles';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { colors } from '../../../services/utilities/color';

const CustomLocationInput = ({
  label,
  placeholder,
  inputWidth,
  source,
  showsearch,
  customImageMarginRight,
  onImagePress,
  marginBottom,
  customTextInputMarginRight,
  inneriinputtwidth,
  maininputmarginleft,
  placeholderTextColor,
  marginLeft,
  ...props
}) => {
  return (
   
      <View style={[appStyles.inputView, { width: inputWidth || responsiveWidth(90),marginLeft:maininputmarginleft,marginBottom:marginBottom }]}>
       
        <TextInput
          style={[appStyles.input, { width:inneriinputtwidth || responsiveWidth(75),marginRight: customTextInputMarginRight,marginLeft:marginLeft,color:colors.color4 }]}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          {...props}
        />
         {showsearch && (
          <TouchableOpacity onPress={onImagePress}>
            <Image source={source} style={appStyles.search} />
          </TouchableOpacity>
        )}
      </View>
  
  );
};

export default CustomLocationInput;
