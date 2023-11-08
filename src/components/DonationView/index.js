import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { colors } from '../../services/utilities/color';
import { appStyles } from '../../services/utilities/appStyles';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { scale } from 'react-native-size-matters';
import HorizontalLine from '../Line';

const DonationView = ({ title,Goal,pickupsource,Raised,Deadline,description, Availabletxt, onPress, source, viewstyle, customMarginLeft, customMarginTop, imageStyle, titleStyle, descriptionStyle, additionalInfoStyle, additionalInfo, showPickupsView }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[appStyles.cardContainer, { marginTop: customMarginTop,height:scale(135) },]}>
      <Image source={source} style={[appStyles.cardImage,{height:scale(120),}]} />
      <View style={{width:scale(209),height:scale(76)}}>  
        <Text style={appStyles.title}>{title}</Text>
        <Text style={appStyles.description}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default DonationView;

