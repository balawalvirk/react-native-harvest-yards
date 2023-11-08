import React from 'react';
import { TouchableOpacity, Text, Image, View } from 'react-native';
import { appStyles } from '../../../src/services/utilities/appStyles'; 
import { responsiveHeight } from 'react-native-responsive-dimensions';
const Button = ({
    label,
    onPress,
    textColor,
    shadowColor,
    fontSize,
    ImageSource1,
    ImageSource,
    customImageMarginRight,
    fontFamily,
    responsiveMarginTop = 0,
    customImageSource, 
    ImageMarginLeft
}) => {
    const buttonStyle = {
        ...appStyles.Lubemeupcontainer,   
        marginTop: responsiveHeight(responsiveMarginTop),
        shadowColor: shadowColor || appStyles.Lubemeupcontainer.shadowColor,
        flexDirection: 'row', // Arrange items horizontally
        alignItems: 'center', // Center items vertically
    };
    const textStyle = {
        ...appStyles.Lubemeuptext,
        color: textColor || appStyles.Lubemeuptext.color,
        fontSize: fontSize || appStyles.Lubemeuptext.fontSize, 
        fontFamily: fontFamily || appStyles.Lubemeuptext.fontFamily,
    };
    return (
        <TouchableOpacity onPress={onPress}  style={buttonStyle}>
            {customImageSource && (
              <Image source={customImageSource} style={[appStyles.Btnarrow, { marginRight: customImageMarginRight }]} />
            )}
            <Text style={textStyle}>{label}</Text>
            {ImageSource1 && (
              <Image source={ImageSource} style={[appStyles.Btnarrow, { marginLeft:ImageMarginLeft }]} />
            )}
        </TouchableOpacity>
    );
};
export default Button;
