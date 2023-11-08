import React,{useState} from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { colors } from '../../services/utilities/color';
import { appStyles } from '../../services/utilities/appStyles';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { scale } from 'react-native-size-matters';
import Clipboard from '@react-native-clipboard/clipboard';
const CouponsView = ({ title, backgroundcolor = colors.color7, source1,customdescriptionstyle,imagemarginleft,expirecolor,coupontxt1, customstyletitle,customstyle,description,Availabletxt, source, viewstyle, customMarginLeft, customMarginTop, }) => {
  const copyToClipboard = () => {
    Clipboard.setString(title);
  };
    return (
    <View style={[appStyles.cardContainer,customstyle, { marginTop: customMarginTop,height:scale(72) ,backgroundColor:backgroundcolor,}]}>
      <Image source={source} style={appStyles.tagimage} />
      <View>
        <Text style={[appStyles.title,customstyletitle,{marginLeft:responsiveWidth(2),color:coupontxt1}]}>{title}</Text>
        <Text style={[appStyles.description,customdescriptionstyle,{marginLeft:responsiveWidth(2),color:expirecolor}]}>{description}</Text>
      </View>
  <TouchableOpacity onPress={copyToClipboard}>
  <Image source={source1} style={[appStyles.copyimage,{marginLeft:imagemarginleft}]} />
    </TouchableOpacity>    
      </View>
  );
};

export default CouponsView;
