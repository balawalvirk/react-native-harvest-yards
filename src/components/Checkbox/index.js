
import React, { useState } from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { checkmark } from '../../services/utilities/assets';
import { appStyles } from '../../services/utilities/appStyles';
import LinearGradient from 'react-native-linear-gradient'; 
import { colors } from '../../services/utilities/color';

const CustomCheckbox = ({ checked, onPress }) => {
  const checkboxStyle = {
    borderColor: checked ? 'transparent' : colors.color33,
    backgroundColor: checked ? 'green' : 'transparent',
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <View>
        <View style={appStyles.checkboxContainer}>
          <View style={[appStyles.checkbox, checkboxStyle]}>
            {checked && (
              <Image
                source={checkmark}
                style={appStyles.imagetick}
              />
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default CustomCheckbox;
