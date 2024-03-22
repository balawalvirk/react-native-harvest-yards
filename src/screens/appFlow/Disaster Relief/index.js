import { View, Text, Image, ScrollView, SafeAreaView, TouchableOpacity, Linking } from 'react-native'
import React, { useState } from 'react'
import Header from '../../../components/Headers'

import { responsiveFontSize, responsiveHeight, responsiveWidth, } from 'react-native-responsive-dimensions';
import { appStyles } from '../../../services/utilities/appStyles'
import { GreenLock, Handtea, LeftButton, Redduck, } from '../../../services/utilities/assets'
import { scale } from 'react-native-size-matters';
import RightArrow from "../../../assets/images/arrowright.png";
export default function DisasterRelief({ navigation }) {

  const [activeTab, setActiveTab] = useState(null);

  const handleLinkPress = (link) => {
    const url = link;
    Linking.openURL(url);
  };

  const linkData = [
    {
      title: 'American Red Cross',
      phoneNumber: '1 800 RED CROSS (1-800-733-2767)',
      link: 'https://www.redcross.org',
      description:
        'From small house fires to multi-state natural disasters, the American Red Cross goes wherever we’re needed, so people can have clean water, safe shelter and hot meals when they need them most.',
    },
    {
      title: 'Salvation Army',
      phoneNumber: '703-302-8640',
      link: 'https://www.salvationarmyusa.org',
      description:
        'Earthquakes, hurricanes, tornadoes, wildfires, droughts, floods, and other major disasters pose a great threat to our country. We’re here to help — in any given year, The Salvation Army provides support, hope, and healing to nearly 600,000 survivors and first responders.'
    },
    {
      title: 'FEMA (Federal Emergency Management Agency)',
      phoneNumber: '1-800-621-3362',
      link: 'https://www.fema.gov',
      description:
        'The agencys primary purpose is to coordinate the response to a disaster that has occurred in the United States and that overwhelms the resources of local and state authorities. The governor of the state in which the disaster occurs must declare a state of emergency and formally request from the President that FEMA and the federal government respond to the disaster.'
    },
    {
      title: 'Americares',
      phoneNumber: 'M-F: 9AM-5PM (EST)  1-203-658-9500',
      link: 'https://www.americares.org',
      description:
        'Americares is a health-focused relief and development organization that saves lives and improves health for people affected by poverty or disaster.',
    },
    {
      title: 'Team Rubicon',
      phoneNumber: '',
      link: 'https://teamrubiconusa.org',
      description:
        'Team Rubicon served communities all over the world in 2023, from an earthquake in Morocco to a typhoon in Guam, expanded Rebuild operations in Kentucky and hurricane response in Florida. Team Rubicon works with community leaders, emergency managers, and local organizations to determine how to best assist with unmet needs. If you’ve been directly affected by a disaster or crisis we encourage reaching out to your local municipality for assistance and resources.',
    },
    {
      title: 'World Central Kitchen',
      phoneNumber: '+1 (202) 844-6330',
      link: 'https://www.wck.org',
      description:
        'Food is essential to life every single day, all over the world—and it is more important than ever in a crisis. Not only is a thoughtful, freshly prepared meal one less thing someone has to worry about in the wake of a disaster, it is a reminder that you are not alone, someone is thinking about you, and someone cares.',
    },
    {
      title: 'USA.gov',
      phoneNumber: '',
      link: 'https://www.usa.gov',
      description:
        'Financial Assistance after a disaster. Find out how to get emergency financial help from the government if you have been affected by a natural disaster.',
    },
    {
      title: 'Disaster Assistance',
      phoneNumber: '',
      link: 'https://www.disasterassistance.gov',
      description:
        'This website offers links to a large variety of sites dedicated to disaster assistance and emergency relief programs for individuals and businesses.',
    },
  ];

  const toggleTab = (tabIndex) => {
    setActiveTab(activeTab === tabIndex ? null : tabIndex);
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
        <View style={appStyles.disastertab}>
          <Text style={[appStyles.txtpartner, { lineHeight: scale(18.9) }]}>
          </Text>

          <View style={appStyles.tabview}>
            {linkData.map((item, index) => (
              <TouchableOpacity key={index} onPress={() => toggleTab(index)}>
                <View style={[appStyles.tabContainer, activeTab === index && appStyles.activeTabContainer]}>
                  <View style={appStyles.tabRow}>
                    <Image source={RightArrow} style={appStyles.tabImage} />
                    <Text style={[appStyles.tabTitle, activeTab === index && appStyles.activeTabTitle]}>{item.title}</Text>
                  </View>
                  {activeTab === index && (
                    <View style={appStyles.tabContent}>
                      <Text style={appStyles.tabText}>{item.phoneNumber}</Text>
                      <TouchableOpacity onPress={() => handleLinkPress(item.link)}>
                        <Text style={[appStyles.tabLink, activeTab === index && appStyles.activeTabLink]}>{item.link}</Text>
                      </TouchableOpacity>
                      <Text style={appStyles.tabText}>{item.description}</Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* <View>
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
      </View> */}
      
        </View>
        <View style={{ height: responsiveHeight(2) }} />
      </ScrollView>
    </SafeAreaView>
  )
}  