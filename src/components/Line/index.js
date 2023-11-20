import React from 'react';
import { View } from 'react-native';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import { appStyles } from '../../services/utilities/appStyles';
import { scale } from 'react-native-size-matters';
const HorizontalLine = ({ marginTop,width,marginLeft }) => {
  return (
    <View style={[appStyles.horizontalLine, { marginTop: marginTop || responsiveHeight(1.5), width:width || scale(170),marginLeft:marginLeft}]} />
    );
};      






export default HorizontalLine;
