import { View, Text, Image ,ScrollView,SafeAreaView} from 'react-native'
import React from 'react'
import Header from '../../../components/Headers'

import { responsiveFontSize, responsiveHeight, responsiveWidth, } from 'react-native-responsive-dimensions';
import { appStyles } from '../../../services/utilities/appStyles'
import { GreenLock, Handtea, LeftButton, Redduck, } from '../../../services/utilities/assets'
import { scale } from 'react-native-size-matters';
import { fontFamily, fontSize } from '../../../services/utilities/fonts';
export default function Index({ navigation }) {
  return (
    <SafeAreaView style={appStyles.container}>
      <Header imageSource={LeftButton}
        headerText='Privacy Policy'
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
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.Nam facilisis sem sed turpis elementum volutpat. Maecenas vulputate purus a dui mollis laoreet. Aenean porta, libero cursus sodales mattis, mi orci laoreet ipsum, placerat finibus orci ligula et arcu. Sed est metus, finibus in ex sed.{'\n'}{'\n'}

Praesent tempus scelerisque ornare. Mauris hendrerit efficitur massa. In vitae libero suscipit, venenatis nisl posuere, volutpat risus. Nulla nisi risus, sagittis id risus a, facilisis elementum lectus. Proin sit amet arcu id dui consectetur sollicitudin. Nam scelerisque lectus mauris, in rutrum arcu ornare et. Sed sed risus turpis. Aenean gravida iaculis ipsum,{'\n'}{'\n'}

Aliquam fringilla, mi et auctor blandit, orci orci pharetra orci, quis pulvinar elit augue ac metus. Aenean ac lobortis ipsum. Phasellus porttitor, dolor faucibus vehicula ornare, enim sem sollicitudin mi, a maximus quam tortor eu quam. Fusce maximus finibus feugiat. Pellentesque at mauris sit amet ex sagittis mollis. Praesent sit amet mauris et augue consequat congue.{'\n'}{'\n'}

Sed commodo purus sit amet est blandit, id sollicitudin mi vulputate. Maecenas ullamcorper sapien vel dolor elementum rutrum. Nam semper ac felis vehicula condimentum.{'\n'}{'\n'}

Aliquam fringilla, mi et auctor blandit, orci orci pharetra orci, quis pulvinar elit augue ac metus. Aenean ac lobortis ipsum. Phasellus porttitor, dolor faucibus vehicula ornare, enim sem sollicitudin mi, a maximus quam tortor eu quam. Fusce maximus finibus feugiat. Pellentesque at mauris sit amet ex sagittis mollis. Praesent sit amet mauris et augue consequat congue.
      </Text>
       </View>
       <View style={{height:responsiveHeight(2)}}/>
</ScrollView>
    </SafeAreaView>
  )
}  