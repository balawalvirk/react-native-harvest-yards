import React from 'react';
import { View, TextInput, Text, Image, TouchableOpacity } from 'react-native';
import { appStyles } from '../../../../src/services/utilities/appStyles';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { colors } from '../../../services/utilities/color';
const Calenderinput = ({
  label,
  placeholder,
  inputWidth,
  source,
  showsearch,
  customImageMarginRight,
  onImagePress,
  customTextInputMarginRight,
  inneriinputtwidth,
  marginLeft,
  responsiveMarginTop,
  customWidth,
  customMarginLeft,
}) => {
  return (
  <View>


      <Text style={[appStyles.label,{marginLeft:responsiveWidth(5),marginTop:responsiveHeight(2.5)}]}>{label}</Text>
   
      <TouchableOpacity style={appStyles.inputView }>
        <TextInput
          style={[
            appStyles.input,
            { width: inneriinputtwidth || responsiveWidth(75) },
            { marginRight: customTextInputMarginRight },
            { marginLeft: marginLeft },
            
          ]}
          placeholder={placeholder}
          placeholderTextColor={colors.color29}
          color={colors.color18}
          editable={false}
        />
        {showsearch && (
          <TouchableOpacity onPress={onImagePress}>
            <Image source={source} style={[appStyles.search,{marginLeft:responsiveWidth(6)}]} />
          </TouchableOpacity>
        )}
        </TouchableOpacity>
   
 </View>
  );
};

export default Calenderinput;
