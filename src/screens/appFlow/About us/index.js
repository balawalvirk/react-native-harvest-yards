import { View, Text, Image ,ScrollView,SafeAreaView} from 'react-native'
import React from 'react'
import Header from '../../../components/Headers'

import { responsiveFontSize, responsiveHeight, responsiveWidth, } from 'react-native-responsive-dimensions';
import { appStyles } from '../../../services/utilities/appStyles'
import { GreenLock, HYlogowhite, Handtea, LeftButton, Logo, Redduck, Splash2 } from '../../../services/utilities/assets'
import { scale } from 'react-native-size-matters';
import { fontFamily, fontSize } from '../../../services/utilities/fonts';
export default function Index({ navigation }) {
  return (
    <SafeAreaView style={appStyles.container}>
      <Header imageSource={LeftButton}
        headerText='About Us'
        showImage={true}
        onPress={() => navigation.goBack()}
        customTextMarginLeft={responsiveWidth(28)}
      />
       <ScrollView
        contentContainerStyle={appStyles.scrollViewContainer}
        showsVerticalScrollIndicator={false}>
      <Image source={Splash2} style={appStyles.frame} />
      <View style={appStyles.mainview}>
       <Text style={[appStyles.txtpartner,{lineHeight:scale(18.9)}]}>
       My sister and I are both students interested in helping to solve humanitarian and environmental issues. We’ve spent a lot of time discussing what we can do to help. We wanted to be a part of something that would solve problems in a way that would be the most impactful to as many people as possible; a solution where the results are immediately felt. We built the Harvest Yards app to do just that. We want to make sure that people suffering from food insecurity will, with the help of our app, find enough food to ensure that going to bed hungry will not be something that any adult or child has to endure. We are just getting started and our impact may be small right now, however, with your help, we hope to form a network large enough to help put an end to hunger for as many people as possible starting today.
      </Text>
       </View>
       <View style={appStyles.bottomview}>
        <Text style={[appStyles.txtpartner,{lineHeight:scale(18.9)}]}>
        Thank you for your support, Sophie and Anfissa
        </Text>
       </View>
       <View style={{height:responsiveHeight(2)}}/>
</ScrollView>
    </SafeAreaView>
  )
}  