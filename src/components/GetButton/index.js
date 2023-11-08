import React from 'react';
import { TouchableOpacity, Text, Image, View } from 'react-native';
import { appStyles } from '../../../src/services/utilities/appStyles'; 
import { responsiveHeight } from 'react-native-responsive-dimensions';
import { scale } from 'react-native-size-matters';
const GetButton = ({
    label,
    onPress,
    textColor,
    shadowColor,
    marginTop,
    fontSize, 
     marginleft,
    customImageMarginRight,
    customwidth=scale(320),
    fontFamily,
  
    responsiveMarginTop = 0,
    customImageSource, 
}) => {
 
    const textStyle = {
        ...appStyles.Lubemeuptext,
        color: textColor || appStyles.Lubemeuptext.color,
        fontSize: fontSize || appStyles.Lubemeuptext.fontSize, 
        fontFamily: fontFamily || appStyles.Lubemeuptext.fontFamily,
    };
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={[appStyles.getdirectioncontainer,{marginTop:marginTop,width:customwidth,marginLeft:marginleft}]}>
            {customImageSource && (
              <Image source={customImageSource} style={[appStyles.Btnarrow, { marginRight: customImageMarginRight }]} />
            )}
            <Text style={appStyles.gettxt}>{label}</Text> 
            </View>
            </TouchableOpacity>
    );
};
export default GetButton;
