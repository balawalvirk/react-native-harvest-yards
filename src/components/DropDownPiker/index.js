import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {colors} from '../../services/utilities/color';
import { fontFamily, fontSize } from '../../services/utilities/fonts';

export default function DropdownComp(props) {
  const [isFocus, setIsFocus] = useState(false);
  const disabled = props.disabled || false;
  return (
    <View style={[{marginTop: responsiveHeight(1.5)}, props.mainCont]}>
      {props.title && (
        <Text style={[styles.titleStyle, props.titleStyle]}>
          {props.title || 'Title'}
        </Text>
      )}
      <Dropdown
        style={[
          styles.dropdownStyle,
          props.dropdownStyle,
          //   isFocus && styles.focusStyle,
        ]}
        itemTextStyle={{color: colors.color25}}
        data={props.data}
        placeholder={!isFocus ? props.placeholder : '...'}
        placeholderStyle={[styles.placeholderStyle, props.placeholderStyle]}
        selectedTextStyle={[styles.selectedTextStyle, props.selectedTextStyle]}
        inputSearchStyle={[styles.inputSearchStyle, props.inputSearchStyle]}
        search={props.search}
        containerStyle={[
          {width: responsiveWidth(90), borderRadius: responsiveHeight(0.5)},
          props.containerStyle,
        ]}
        iconStyle={[styles.iconStyle, props.iconStyle]}
        // fontFamily={fonts.regular}
        value={props.value}
        labelField={props.labelField}
        valueField={props.valueField}
        searcresponsiveHeightlaceholder="Search..."
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          props.onChange(item);
          setIsFocus(false);
        }}
        // renderLeftIcon={() => (
        //   <Icon
        //     type={props.iconType}
        //     name={props.iconName}
        //     size={props.iconSize}
        //     color={props.iconSize}
        //   />
        // )}
        disable={disabled}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  dropdownStyle: {
    width: responsiveWidth(88),
    height: responsiveHeight(6.4),
    borderRadius: responsiveHeight(1.8),
    backgroundColor: colors.lightGrey,
    borderWidth: 0.5,
    borderColor: colors.grey,
    paddingHorizontal: responsiveWidth(4),
    marginHorizontal: responsiveWidth(2),
    // marginTop: responsiveHeight(3),
  },
  titleStyle: {
    fontSize: fontSize.h2,
    fontFamily: fontFamily.SatoshiVariable,
    fontWeight: '700',
    color: colors.color10,
    textAlign: 'left',
    marginBottom: responsiveHeight(1),
    marginLeft:responsiveWidth(2)
    
  },
  placeholderStyle: {
    fontSize: 14,
    color: colors.grey,
  },
  selectedTextStyle: {
    fontSize: 14,
    color: colors.color35,
  },
  inputSearchStyle: {
    width: responsiveWidth(85),
    height: responsiveHeight(6),
    fontSize: 12,
    borderRadius: responsiveWidth(3.2),
    alignSelf: 'center',
    color: colors.color25,
  },

  focusStyle: {
    borderColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
});
