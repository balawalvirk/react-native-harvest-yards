import { View, Text, Image,TouchableOpacity } from 'react-native'
import React from 'react'
import { appStyles } from '../../services/utilities/appStyles'

import { Facebook, Frame1, Instagram, XLogo, arrowright } from '../../services/utilities/assets'
const Button2view = ({
    onPress,
    text,
    customTextColor, 
    customMarginRight,
    customMarginTop,
    customfontsize
}) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={[appStyles.buttonview, { marginTop: customMarginTop }]}>
              <View >
              <Text
          style={[
            appStyles.follow,
            { marginRight: customMarginRight, color: customTextColor ,fontSize:customfontsize}, // Apply customTextColor if provided
          ]}
        >
       {text}
        </Text>
              </View>
                
               
                 <View style={appStyles.facebookview}>
                 <Image source={Facebook} style={appStyles.Setting} />
                  <Image source={Instagram} style={appStyles.Setting} />
                  <Image source={XLogo} style={appStyles.Setting} />
                 </View>
                 
            </View>
        </TouchableOpacity>
    )
}




export default Button2view;


