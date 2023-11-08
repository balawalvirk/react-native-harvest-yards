import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';
import {appStyles} from '../../services/utilities/appStyles';

const CustomSwitch = ({
  onColor,
  offColor,
  thumbOffStyle,
  value,
  toggleSwitch,
  onToggle
}) => {
  return (
    <ToggleSwitch
      isOn={value}
      onColor={onColor}
      offColor={offColor}
      thumbOffStyle={thumbOffStyle}
      thumbOnStyle={appStyles.thumbOnStyle}
      size="large"
      value={value}   
      onToggle={toggleSwitch}
      
    />
  );
};
export default CustomSwitch;
