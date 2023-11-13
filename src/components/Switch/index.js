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
  trackOffStyle,
  trackOnStyle,
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
      trackOffStyle={trackOffStyle}
      onToggle={toggleSwitch}  
      trackOnStyle={trackOnStyle}
    />
  );
};
export default CustomSwitch;
