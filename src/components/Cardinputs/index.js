import React from 'react';
import { View, TextInput, TouchableWithoutFeedback } from 'react-native';
import { appStyles } from '../../services/utilities/appStyles';
import { responsiveWidth, responsiveHeight, responsiveFontSize,
} from 'react-native-responsive-dimensions';
import { colors } from '../../services/utilities/color';
const CardInput = ({
  value,
  onChangeText,
  inputFontSize,
  customWidth,
  customHeight,
  enableBackgroundColorChange,
  placeholder,
  placeholderTextColor,
  borderRadius,
  inputWidth,
  marginLeft,
  inputHeight,
  keyboardType,
  maxLength,
  index,
  custommargintop,
  backgroundColor,
  onFocus,
  selectedCardinputIndex,
  handleCardinputSelect,
  padding,
}) => {
  const isSelected = index === selectedCardinputIndex;
  const dynamicBackgroundColor = enableBackgroundColorChange && isSelected
    ? colors.color26
    : backgroundColor || colors.color7;
  const handlePress = () => {
    if (enableBackgroundColorChange) {
      handleCardinputSelect(index);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View
        style={[
          appStyles.card,
          {
            width: customWidth || responsiveWidth(30),
            height: customHeight || responsiveHeight(13),
            backgroundColor: dynamicBackgroundColor,
            borderRadius: borderRadius || responsiveWidth(5),
            marginLeft: marginLeft || responsiveWidth(2.5),
            marginTop: custommargintop || responsiveHeight(1)
          },
        ]} >
        <TouchableWithoutFeedback onPress={handlePress}>
          <View
            style={{
              backgroundColor: dynamicBackgroundColor,
              flex: 1,
              justifyContent: 'center', // Vertically center content
              alignItems: 'center',     // Horizontally center content
            }} >
            <TextInput
              style={[
                appStyles.input2,
                {
                  width: inputWidth || responsiveWidth(15),
                  height: inputHeight || responsiveHeight(10),
                  fontSize: inputFontSize || responsiveFontSize(5),
                },
              ]}
              placeholder={placeholder}
              placeholderTextColor={placeholderTextColor}
              maxLength={maxLength || 2}
              keyboardType={keyboardType || 'numeric'}
              onFocus={onFocus}
              value={value}
              onChangeText={onChangeText}
              padding={padding}/>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  );
};
export default CardInput;
