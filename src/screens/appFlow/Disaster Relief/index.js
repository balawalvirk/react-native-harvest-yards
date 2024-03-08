import { View, Text, Image ,ScrollView,SafeAreaView, TouchableOpacity,Linking} from 'react-native'
import React from 'react'
import Header from '../../../components/Headers'

import { responsiveFontSize, responsiveHeight, responsiveWidth, } from 'react-native-responsive-dimensions';
import { appStyles } from '../../../services/utilities/appStyles'
import { GreenLock, Handtea, LeftButton, Redduck, } from '../../../services/utilities/assets'
import { scale } from 'react-native-size-matters';
import { fontFamily, fontSize } from '../../../services/utilities/fonts';
export default function DisasterRelief({ navigation }) {

  const link1 = 'https://www.redcross.org'
  const link2 = 'https://www.salvationarmyusa.org'
  const link3 = 'https://www.fema.gov'
  const link4 = 'https://www.americares.org'
  const link5 = 'https://teamrubiconusa.org'
  const link6 = 'https://www.wck.org'
  const link7 = 'https://www.usa.gov'
  const link8 = 'https://www.disasterassistance.gov'

    const handleLinkPress = (link) => {
      const url = link;
      Linking.openURL(url);
    };

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
      </Text>
      
      <View>
      <Text style={{fontSize:16, fontWeight:'bold', color:'black', marginTop:5}}>
        American Red Cross
      </Text>
      <Text style={{fontSize:14, fontWeight:'500'}}>
      1 800 RED CROSS ( 1-800-733-2767)
      </Text>
      <TouchableOpacity onPress={() => handleLinkPress(link1)}>
        <Text style={{ fontSize: 14, fontWeight: '500', color: 'blue', textDecorationLine: 'underline' }}>
          {link1}
        </Text>
      </TouchableOpacity>
      <Text style={{fontSize:14,color:'black',marginTop:5}}>
        From small house fires to multi-state natural disasters, the American Red Cross goes wherever we’re needed, so people can have clean water, safe shelter and hot meals when they need them most.
      </Text>
      </View>

      <View>
      <Text style={{fontSize:16, fontWeight:'bold', color:'black', marginTop:10}}>
      Salvation Army
      </Text>
      <Text style={{fontSize:14, fontWeight:'500'}}>
      703-302-8640
      </Text>
      <TouchableOpacity onPress={() => handleLinkPress(link2)}>
        <Text style={{ fontSize: 14, fontWeight: '500', color: 'blue', textDecorationLine: 'underline' }}>
        {link2}
        </Text>
      </TouchableOpacity>
      <Text style={{fontSize:14,color:'black',marginTop:5}}>
      Earthquakes, hurricanes, tornadoes, wildfires, droughts, floods, and other major disasters pose a great threat to our country. We’re here to help — in any given year, The Salvation Army provides support, hope, and healing to nearly 600,000 survivors and first responders.      </Text>
      </View>

      <View>
      <Text style={{fontSize:16, fontWeight:'bold', color:'black', marginTop:10}}>
      FEMA (Federal Emergency Management Agency)
      </Text>
      <Text style={{fontSize:14, fontWeight:'500'}}>
      1-800-621-3362
      </Text>
      <TouchableOpacity onPress={() => handleLinkPress(link3)}>
        <Text style={{ fontSize: 14, fontWeight: '500', color: 'blue', textDecorationLine: 'underline' }}>
        {link3}
        </Text>
      </TouchableOpacity>
      <Text style={{fontSize:14,color:'black',marginTop:5}}>
      The agency's primary purpose is to coordinate the response to a disaster that has occurred in the United States and that overwhelms the resources of local and state authorities. The governor of the state in which the disaster occurs must declare a state of emergency and formally request from the President that FEMA and the federal government respond to the disaster.      </Text>
      </View>

      <View>
      <Text style={{fontSize:16, fontWeight:'bold', color:'black', marginTop:10}}>
      Americares 
      </Text>
      <Text style={{fontSize:14, fontWeight:'500'}}>
      M-F: 9AM-5PM (EST)  1-203-658-9500
      </Text>
      <TouchableOpacity onPress={() => handleLinkPress(link4)}>
        <Text style={{ fontSize: 14, fontWeight: '500', color: 'blue', textDecorationLine: 'underline' }}>
        {link4}
        </Text>
      </TouchableOpacity>
      <Text style={{fontSize:14,color:'black',marginTop:5}}>
      Americares is a health-focused relief and development organization that saves lives and improves health for people affected by poverty or disaster.      </Text>
      </View>

      <View>
      <Text style={{fontSize:16, fontWeight:'bold', color:'black', marginTop:10}}>
      Team Rubicon
      </Text>
      <Text style={{fontSize:14, fontWeight:'500'}}>
      
      </Text>
      <TouchableOpacity onPress={() => handleLinkPress(link5)}>
        <Text style={{ fontSize: 14, fontWeight: '500', color: 'blue', textDecorationLine: 'underline' }}>
        {link5}
        </Text>
      </TouchableOpacity>
      <Text style={{fontSize:14,color:'black',marginTop:5}}>
      Team Rubicon served communities all over the world in 2023, from an earthquake in Morocco to a typhoon in Guam, expanded Rebuild operations in Kentucky and hurricane response in Florida. Team Rubicon works with community leaders, emergency managers, and local organizations to determine how to best assist with unmet needs. If you’ve been directly affected by a disaster or crisis we encourage reaching out to your local municipality for assistance and resources.      </Text>
      </View>

      <View>
      <Text style={{fontSize:16, fontWeight:'bold', color:'black', marginTop:10}}>
      World Central Kitchen
      </Text>
      <Text style={{fontSize:14, fontWeight:'500'}}>
      +1 (202) 844-6330
      </Text>
      <TouchableOpacity onPress={() => handleLinkPress(link6)}>
        <Text style={{ fontSize: 14, fontWeight: '500', color: 'blue', textDecorationLine: 'underline' }}>
        {link6}
        </Text>
      </TouchableOpacity>
      <Text style={{fontSize:14,color:'black',marginTop:5}}>
      Food is essential to life every single day, all over the world—and it is more important than ever in a crisis. Not only is a thoughtful, freshly prepared meal one less thing someone has to worry about in the wake of a disaster, it is a reminder that you are not alone, someone is thinking about you, and someone cares.      </Text>
      </View>

      <View>
      <Text style={{fontSize:16, fontWeight:'bold', color:'black', marginTop:10}}>
      USA.gov
      </Text>
      <Text style={{fontSize:14, fontWeight:'500'}}>
      
      </Text>
      <TouchableOpacity onPress={() => handleLinkPress(link7)}>
        <Text style={{ fontSize: 14, fontWeight: '500', color: 'blue', textDecorationLine: 'underline' }}>
        {link7}
        </Text>
      </TouchableOpacity>
      <Text style={{fontSize:14,color:'black',marginTop:5}}>
      Financial Assistance after a disaster. Find out how to get emergency financial help from the government if you have been affected by a natural disaster.      </Text>
      </View>

      <View>
      <Text style={{fontSize:16, fontWeight:'bold', color:'black', marginTop:10}}>
      Disaster Assistance
      </Text>
      <Text style={{fontSize:14, fontWeight:'500'}}>
      
      </Text>
      <TouchableOpacity onPress={() => handleLinkPress(link8)}>
        <Text style={{ fontSize: 14, fontWeight: '500', color: 'blue', textDecorationLine: 'underline' }}>
        {link8}
        </Text>
      </TouchableOpacity>
      <Text style={{fontSize:14,color:'black',marginTop:5}}>
      This website offers links to a large variety of sites dedicated to disaster assistance and emergency relief programs for individuals and businesses.      </Text>
      </View>


       </View>
       <View style={{height:responsiveHeight(2)}}/>
</ScrollView>
    </SafeAreaView>
  )
}  