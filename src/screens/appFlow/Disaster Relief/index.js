import { View, Text, Image ,ScrollView,SafeAreaView} from 'react-native'
import React from 'react'
import Header from '../../../components/Headers'

import { responsiveFontSize, responsiveHeight, responsiveWidth, } from 'react-native-responsive-dimensions';
import { appStyles } from '../../../services/utilities/appStyles'
import { GreenLock, Handtea, LeftButton, Redduck, } from '../../../services/utilities/assets'
import { scale } from 'react-native-size-matters';
import { fontFamily, fontSize } from '../../../services/utilities/fonts';
export default function DisasterRelief({ navigation }) {
  return (
    <SafeAreaView style={appStyles.container}>
      <Header imageSource={LeftButton}
        headerText='Disaster Relief'
        showImage={true}
        onPress={() => navigation.goBack()}
        customTextMarginLeft={responsiveWidth(22)}
      />
       <ScrollView
        contentContainerStyle={appStyles.scrollViewContainer}
        showsVerticalScrollIndicator={false}>
      <Image source={GreenLock} style={appStyles.frame} />
       <View style={appStyles.mainview}>
       <Text style={[appStyles.txtpartner,{lineHeight:scale(18.9)}]}>
       This is a future function. In the event of a disaster in your area, information will be posted here to direct you toward shelter, food, water, and/or additional aid/relief services, as well as links to websites that will help you to communicate your well-being to loved ones. 
      </Text>
       </View>
       <View style={{height:responsiveHeight(2)}}/>
</ScrollView>
    </SafeAreaView>
  )
}  