import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { appStyles } from '../../../services/utilities/appStyles';
import Header from '../../../components/Headers';
import { MenueButton, search, locationtag, Image5, Image6, Image7, Image10, Image11, Image12, Image13, Image14, tag, pocket8, heart, pocket1, greenheart, HelpCallout } from '../../../services/utilities/assets';
import CustomLocationInput from '../../../components/Textinputs/Locationinput';
import CardView from '../../../components/CardView';
import { Image8 } from '../../../services/utilities/assets';
import { scale } from 'react-native-size-matters';
import { fontFamily, fontSize } from '../../../services/utilities/fonts';
import { HelpCalloutModal } from '../../../components/Modal/Tip Modal';
import { colors } from '../../../services/utilities/color';

const ReservedFood = ({ navigation }) => {
  const [selectedTouchable, setSelectedTouchable] = useState('Pending Pick-ups');
  const [isHelpCalloutModalVisible, setHelpCalloutModalVisible] = useState(false);
  const [showQRMainView, setShowQRMainView] = useState(false); 
  const handleNavigate = (item) => {
    setShowQRMainView(false); // Hide the QR main view
    navigation.navigate('AppNavigation', { screen: 'ReservedPickups', params: { item: item,selectedTouchable:selectedTouchable } });
  };
  const pendingPickupsData = [
    {
      source: Image8,
      title: 'CareFood Pantry',
      pickupsource:pocket1,
      description: '888 Opera Place, Vienna, Austria',
      Availabletxt: 'Pending',
      additionalInfo: '6 km away',
    },
    {
      source: Image8,
      pickupsource:pocket1,
      title: 'CareFood Pantry',
      description: '888 Opera Place, Vienna, Austria',
      Availabletxt: 'Pending',
      additionalInfo: '6 km away',
    },
    {
      source: Image6,
      pickupsource:pocket1,
      title: 'CareFood Pantry',
      description: '888 Opera Place, Vienna, Austria',
      Availabletxt: 'Pending',
      additionalInfo: '6 km away',
    },
    {
      source: Image7,
      pickupsource:pocket1,
      title: 'CareFood Pantry',
      description: '888 Opera Place, Vienna, Austria',
      Availabletxt: 'Pending',
      additionalInfo: '6 km away',
    },
    {
      source: Image10,
      pickupsource:pocket1,
      title: 'CareFood Pantry',
      description: '888 Opera Place, Vienna, Austria',
      Availabletxt: 'Pending',
      additionalInfo: '6 km away',
    },
    {
      source: Image11,
      pickupsource:pocket1,
      title: 'CareFood Pantry',
      description: '888 Opera Place, Vienna, Austria',
      Availabletxt: 'Pending',
      additionalInfo: '6 km away',
    },
    {
      source: Image12,
      pickupsource:pocket1,
      title: 'CareFood Pantry',
      description: '888 Opera Place, Vienna, Austria',
      Availabletxt: 'Pending',
      additionalInfo: '6 km away',
    },
    {
      source: Image13,
      pickupsource:pocket1,
      title: 'CareFood Pantry',
      description: '888 Opera Place, Vienna, Austria',
      Availabletxt: 'Pending',
      additionalInfo: '6 km away',
    },
    {
      source: Image14,
      pickupsource:pocket1,
      title: 'CareFood Pantry',
      description: '888 Opera Place, Vienna, Austria',
      Availabletxt: 'Pending',
      additionalInfo: '6 km away',
    },
    {
      source: Image11,
      pickupsource:pocket1,
      title: 'CareFood Pantry',
      description: '888 Opera Place, Vienna, Austria',
      Availabletxt: 'Pending',
      additionalInfo: '6 km away',
    },
  ];

  const favoritesData = [
    {
      source: Image6,
      pickupsource:greenheart,
      title: 'CareFood Pantry',
      description: '123 Main Street, City, Country',
      Availabletxt: 'Favorite',
      additionalInfo: '2 km away',
    },
    {
      source: Image7,
      pickupsource:greenheart,
      title: 'CareFood Pantry',
      description: '888 Opera Place, Vienna, Austria',
      Availabletxt: 'Favorite',
      additionalInfo: '6 km away',
    },
    {
      source: Image8,
      pickupsource:greenheart,
      title: 'CareFood Pantry',
      description: '888 Opera Place, Vienna, Austria',
      Availabletxt: 'Favorite',
      additionalInfo: '6 km away',
    },
    {
      source: Image10,
      pickupsource:greenheart,
      title: 'CareFood Pantry',
      description: '888 Opera Place, Vienna, Austria',
      Availabletxt: 'Favorite',
      additionalInfo: '6 km away',
    },
    {
      source: Image11,
      pickupsource:greenheart,
      title: 'CareFood Pantry',
      description: '888 Opera Place, Vienna, Austria',
      Availabletxt: 'Favorite',
      additionalInfo: '6 km away',
    },
    {
      source: Image12,
      pickupsource:greenheart,
      title: 'CareFood Pantry',
      description: '888 Opera Place, Vienna, Austria',
      Availabletxt: 'Favorite',
      additionalInfo: '6 km away',
    },
    {
      source: Image11,
      pickupsource:greenheart,
      title: 'CareFood Pantry',
      description: '888 Opera Place, Vienna, Austria',
      Availabletxt: 'Favorite',
      additionalInfo: '6 km away',
    },
    {
      source: Image13,
      pickupsource:greenheart,
      title: 'CareFood Pantry',
      description: '888 Opera Place, Vienna, Austria',
      Availabletxt: 'Favorite',
      additionalInfo: '6 km away',
    },
    {
      source: Image14,
      pickupsource:greenheart,
      title: 'CareFood Pantry',
      description: '888 Opera Place, Vienna, Austria',
      Availabletxt: 'Favorite',
      additionalInfo: '6 km away',
    },
    {
      source: Image11,
      pickupsource:greenheart,
      title: 'CareFood Pantry',
      description: '888 Opera Place, Vienna, Austria',
      Availabletxt: 'Favorite',
      additionalInfo: '6 km away',
    },
  ];

  const getDataToShow = () => {
    if (selectedTouchable === 'Pending Pick-ups') {
      return pendingPickupsData;
    } else if (selectedTouchable === 'Favorites') {
      return favoritesData;
    }
  };

  return (
    <SafeAreaView style={appStyles.container}>
      <Header
        imageSource={MenueButton}
        headerText="Reserved Food"
        showImage={true}
        onPress={() => navigation.openDrawer()}
        customTextMarginLeft={responsiveWidth(23)}
        showImage2={true}
        bellmarginleft={responsiveWidth(25.5)}
        marginleft={-responsiveWidth(2)}
      />
      <ScrollView>
        <View style={styles.touchablesContainer}>
          <TouchableOpacity
            style={[
              styles.touchable1,
              selectedTouchable === 'Pending Pick-ups' && {
                backgroundColor: colors.color33,
                borderRadius: responsiveWidth(50),
                width: responsiveWidth(60),
              },
            ]}
            onPress={() => setSelectedTouchable('Pending Pick-ups')}
          >
            <Image
              source={pocket8}
              style={[
                styles.touchableImage,
                {
                  tintColor: selectedTouchable === 'Pending Pick-ups' ? colors.color7 : colors.color4,
                },
              ]}
            />
            <Text style={[styles.touchableText, { color: selectedTouchable === 'Pending Pick-ups' ? 'white' : 'black' }]}>
              Pending Pick-ups
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.touchable2,
              selectedTouchable === 'Favorites' && {
                backgroundColor:colors.color33,
                borderRadius: 50,
                width: responsiveWidth(30),
              },
            ]}
            onPress={() => setSelectedTouchable('Favorites')}
          >
            <Image
              source={heart}
              style={[
                styles.touchableImage,
                {
                  tintColor: selectedTouchable === 'Favorites' ? colors.color7 : colors.color4,
                },
              ]}
            />
            <Text style={[styles.touchableText, { color: selectedTouchable === 'Favorites' ? colors.color7 : colors.color4 }]}>
              Favorites
            </Text>
          </TouchableOpacity>
        </View>

        <CustomLocationInput
          showsearch={true}
          source={search}
          inputWidth={responsiveWidth(92)}
         marginBottom={responsiveHeight(1)}
          inneriinputtwidth={responsiveWidth(82)}
          placeholder='Search...'
          placeholderTextColor={colors.color29}
          marginLeft={responsiveWidth(2)}
        
        />
        <FlatList
          data={getDataToShow()}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <CardView
              customMarginTop={responsiveHeight(1)}
              source={item.source}
              title={item.title}
              pickupsource={item.pickupsource}
              description={item.description}
              Availabletxt={item.Availabletxt}
              additionalInfo={item.additionalInfo}
              showPickupsView={true}
              onPress={() =>handleNavigate(item)}
            />
          )}
        />
            <View style={{ height: responsiveHeight(4) }} />
      </ScrollView>
      <TouchableOpacity  onPress={() => setHelpCalloutModalVisible(true)}>
      <Image source={HelpCallout} style={[appStyles.locationtag,{width:scale(60),height:scale(60)}]} />
      </TouchableOpacity>
      <HelpCalloutModal
        isVisible={isHelpCalloutModalVisible}
        onBackdropPress={() => setHelpCalloutModalVisible(false)}
        toggleModal={() => setHelpCalloutModalVisible(false)}
        Title='Reserved Food Help'
        helpcallouttxt='Pending Pick-up are reservations that you have but have not picked up the food package. 
        If you select the pending button your QR code show up on your screen. 
        You must show the QR code a the time of pick-up to receive your food package.
        You can also cancel a food reservation on the same screen.
        Press the Find Food button to return to the Find Food screen.'
      />
        {selectedTouchable === 'Favorites' && showQRMainView && (
       <View style={appStyles.qrmainview}>
          <Image source={QRcode} style={[appStyles.QRcode,{marginTop:responsiveHeight(1)}]}/>
         <TouchableOpacity>
         <Image source={Buttonzoom} style={[appStyles.locationtag,{marginTop:-responsiveHeight(20),marginLeft:responsiveWidth(73)}]}/>
          </TouchableOpacity> 
          <TouchableOpacity>
          <Image source={Buttondownload} style={[appStyles.locationtag,{marginTop:-responsiveHeight(13),marginLeft:responsiveWidth(73)}]}/>
            </TouchableOpacity>
          <Text style={[appStyles.title,{marginTop:responsiveHeight(1)}]}>
            QR code
          </Text>
          <Text style={appStyles.description}>
            Use this QR to collect the food.
          </Text>
        </View>
       )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  touchablesContainer: {
    flexDirection: 'row',
     justifyContent: 'space-evenly',
    backgroundColor:colors.color16,
    borderRadius:responsiveWidth(50),
    width:responsiveWidth(92),
    height:responsiveHeight(5),
    marginBottom:responsiveHeight(1),
    marginTop:responsiveHeight(2),
    alignSelf:'center'
  },
  touchable1: {
    flex: 0.6,
    margin: responsiveWidth(3),
    padding: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    width:responsiveWidth(48),
    height:responsiveHeight(5),
    marginTop:responsiveHeight(0),
    marginLeft:responsiveWidth(0),
  },
  touchable2: {
    flex: 0.4,
    margin: responsiveWidth(3),
    padding: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    width:responsiveWidth(43),
    height:responsiveHeight(5),
    marginTop:responsiveHeight(0),
    marginRight:responsiveWidth(0),
  },
  touchableImage: {
    width: scale(20),
    height: scale(20),
    resizeMode: 'contain',
  },
  touchableText: {
    fontSize: fontSize.h2,
    marginLeft: responsiveWidth(2),
    fontFamily: fontFamily.SatoshiVariable,
    fontWeight: '700'
  },
});

export default ReservedFood;
