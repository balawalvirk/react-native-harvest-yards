import React, {useState,useEffect, cloneElement} from 'react';
import {View, TextInput, Text, Image} from 'react-native';
import {appStyles} from '../../../src/services/utilities/appStyles';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {colors} from '../../services/utilities/color';
import {TouchableOpacity} from 'react-native-gesture-handler';
import { MaskGroup19, closeeye } from '../../services/utilities/assets';
const CustomTextInput = ({
  label,
  keyboardType,
  placeholder,
  inputWidth,
  source,
  inputHeight,
  onfocus,
  TextinputWidth,
  inputBackgroundColor,
  responsiveMarginTop = 1,
  placeholderMarginTop,
  placeholderMarginLeft = -responsiveWidth(2),
  placeholderMarginRight = -responsiveWidth(62),
  placeholderFontSize,
  placeholderFontFamily,
  customImageMarginRight,
  editable,
  maxlength,
  showeye,
  customWidth,
  custommarginleft,
  rowReverse,
  showImage,
  source1,
  marginLeft,
  value,
  onpress,
  onImgPress,
  onChangeText,
  placeholderTextColor = colors.color29,
  customTextInputMarginRight,
  borderRadius,
  secureTextEntry = false,
  error,
  autoCapitalize

}) => {
  const [isPasswordVisible, setPasswordVisibility] = useState(secureTextEntry);

  useEffect(() => {
    setPasswordVisibility(secureTextEntry);
  }, [secureTextEntry]);

  const togglePasswordVisibility = () => {
    setPasswordVisibility((prevState) => !prevState);
  };
  return (
    
    <View
      style={[
        appStyles.inputmainview,
        {
          marginTop: responsiveHeight(responsiveMarginTop),
          width: customWidth,
          marginLeft: custommarginleft,
        },
      ]}>
      <Text style={appStyles.label}>{label}</Text>
      <View
        style={[
          appStyles.inputView,
          {
            width: inputWidth || responsiveWidth(90),
            height: inputHeight || responsiveHeight(7),
            backgroundColor:
              inputBackgroundColor || appStyles.inputView.backgroundColor,
            flexDirection: rowReverse ? 'row-reverse' : 'row',
            borderRadius: borderRadius || responsiveWidth(3.2), // Apply the custom border radius
          },
        ]}>
        {source ? (
          <TouchableOpacity onPress={onImgPress}>
            <Image
              source={source}
              style={[appStyles.Email, {marginRight: customImageMarginRight}]}
            />
          </TouchableOpacity>
        ) : (
          <View
            style={{
              marginLeft: responsiveWidth(3),
              marginRight: customImageMarginRight,
            }}
          />
        )}
        <TextInput
          style={[
            appStyles.input,
            {
              // flex: 1,
              marginRight:
                customTextInputMarginRight !== undefined
                  ? customTextInputMarginRight
                  : placeholderMarginRight,
              marginTop: -responsiveHeight(placeholderMarginTop || 0),
              marginLeft: placeholderMarginLeft,
              width: TextinputWidth || responsiveWidth(75),
            
            },
          ]}
          keyboardType={keyboardType}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          color={colors.color18}
          placeholderFontSize={placeholderFontSize}
          placeholderFontFamily={placeholderFontFamily}
          editable={editable}
          secureTextEntry={isPasswordVisible} 
          maxLength={maxlength}
          onFocus={onfocus}
          value={value}
          onChangeText={onChangeText}
          autoCapitalize={autoCapitalize}
        />
        {showImage && (
          // <TouchableOpacity style={{width:responsiveWidth(5),height:responsiveHeight(3)}} onPress={onpress}>
           <Image
         source={source1}
           style={[appStyles.uploadimage, { marginLeft: marginLeft }]}
/>

          // </TouchableOpacity>
        )}
       {showeye &&(  
       <TouchableOpacity
  style={{width:responsiveWidth(6)}}
       onPress={togglePasswordVisibility}>
          <Image
            source={
              isPasswordVisible
                ? closeeye
                : MaskGroup19
            }
            style={appStyles.eye} // Adjust the size as needed
          />
        </TouchableOpacity>
       )}
      </View>
      {error && (
            <Text style={{ color: colors.color32 }}>{error}</Text>
        )}
    </View>
  );
};
export default CustomTextInput;
