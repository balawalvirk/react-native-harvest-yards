import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { colors } from '../../services/utilities/color';
import { appStyles } from '../../services/utilities/appStyles';
import { responsiveHeight } from 'react-native-responsive-dimensions';

const CardView = ({ title,pickupsource, description, Availabletxt, onPress, source, viewstyle, customMarginLeft, customMarginTop, imageStyle, titleStyle, descriptionStyle, additionalInfoStyle, additionalInfo, showPickupsView }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[appStyles.cardContainer, { marginTop: customMarginTop }, viewstyle]}>
      <Image source={source} style={appStyles.cardImage} />
      <View>
        <Text style={appStyles.title}>{title}</Text>
        <Text style={[appStyles.description, descriptionStyle]}>{description}</Text>
        {showPickupsView ? (
          <View style={appStyles.pickupsview}>
            <Image source={pickupsource} style={appStyles.greenbasketImage} />
            <Text style={[appStyles.Available, { color: colors.color33 }]}>{Availabletxt}</Text>
          </View>
        ) : (
          <View style={appStyles.Availabletxtview}>
            <Text style={appStyles.Available}>{Availabletxt}</Text>
          </View>
        )}
        <Text style={[appStyles.description, { marginTop: responsiveHeight(2.5) }]}>{additionalInfo}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CardView;

