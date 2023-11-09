import { View, Text, Image,TouchableOpacity } from 'react-native'
import React from 'react'
import { appStyles } from '../../services/utilities/appStyles'
import { responsiveFontSize, responsiveHeight, responsiveWidth, } from 'react-native-responsive-dimensions';
import { Frame1, arrowright } from '../../services/utilities/assets'
const Buttonview = ({
    onPress,
    text,
    source,
    showtxt,
    customTextColor, 
    customMarginRight,
    MarginRight,
    customMarginTop,
    customimagestyle
}) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={[appStyles.buttonview, { marginTop: customMarginTop }]}>
                <Image source={source} style={[appStyles.Setting,customimagestyle]} />
                <Text
          style={[
            appStyles.subsciption,
            { marginRight: customMarginRight, color: customTextColor }, // Apply customTextColor if provided
          ]}
        >
         {text}
        </Text>
                {showtxt && (
                 <View style={{marginLeft:-responsiveWidth(7)}}> 
                  <Image source={arrowright} style={[appStyles.frame1, { marginRight: MarginRight }]} />
               </View>
                )}
            </View>
        </TouchableOpacity>
    )
}




export default Buttonview;


