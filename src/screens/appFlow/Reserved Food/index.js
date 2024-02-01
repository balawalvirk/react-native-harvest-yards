import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView, Text, Image, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { appStyles } from '../../../services/utilities/appStyles';
import Header from '../../../components/Headers';
import { MenueButton, search, pocket8, heart, HelpCallout, pocket1, greenheart, Refresh, animation, appImages } from '../../../services/utilities/assets';
import CustomLocationInput from '../../../components/Textinputs/Locationinput';
import CardView from '../../../components/CardView';
import { scale } from 'react-native-size-matters';
import { fontFamily, fontSize } from '../../../services/utilities/fonts';
import { HelpCalloutModal } from '../../../components/Modal/Tip Modal';
import { colors } from '../../../services/utilities/color';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import { Toast } from 'react-native-toast-message';
import firestore from '@react-native-firebase/firestore';
import { RefreshControl } from 'react-native';
import auth from '@react-native-firebase/auth';
import { Loaders } from '../../../components';
import { useHooks } from './hooks';
const ReservedFood = (props) => {
  const navigation = useNavigation();

  const {
    //local states
    pendingPickups, setPendingPickups,
    selectedTouchable, setSelectedTouchable,
    isHelpCalloutModalVisible, setHelpCalloutModalVisible,
    showQRMainView, setShowQRMainView,
    refreshing, setRefreshing,
    loading, setLoading,
    loadingAnimation, setLoadingAnimation,
    reservedFoodData, setReservedFoodData,
    searchQuery, setSearchQuery,
    filteredData, setFilteredData,
    favoritesData, setFavoritesData,

    //data
    viewableData,
    isPendingPickupsTab,
    //local methods
    handleCardPress,
    handleSearch,
    onRefresh
    
  } = useHooks()
  // const [searchText, setSearchText] = useState('');

  return (
    <SafeAreaView style={appStyles.container}>
      <Header
        imageSource={MenueButton}
        headerText="Reserved Food"
        showImage={true}
        onPress={() => navigation.openDrawer()}
        customTextMarginLeft={responsiveWidth(23)}
        // showImage2={true}
        bellmarginleft={responsiveWidth(25.5)}
        marginleft={-responsiveWidth(2)}
      />
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.color33]} // Set the colors for the refresh indicator
          />
        }
      >
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
                backgroundColor: colors.color33,
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
          marginBottom={responsiveHeight(1)}
          inputWidth={responsiveWidth(75)}
          inneriinputtwidth={responsiveWidth(65)}
          placeholder='Search...'
          placeholderTextColor={colors.color29}
          maininputmarginleft={-responsiveWidth(16.6)}
          marginLeft={responsiveWidth(2)}
          onChangeText={(text) => setSearchQuery(text)}
          value={searchQuery}
        />
        {searchQuery !== '' && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
          </TouchableOpacity>
        )}
        {/* {console.log("viewableData>>>",JSON.stringify(viewableData,null,2))} */}
        <FlatList
          data={viewableData}
          // data={searchQuery === '' ? viewableData : viewableData?.filter(item =>
          //   // item?.organization?.toLowerCase()?.includes(searchQuery?.toLowerCase())
          //   console.log("item>>",JSON.stringify(item,null,2))
          // )}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
            const { profileImage,address,organization,distributor } = item||{}
            const imageUrl=distributor?.profileImage||profileImage||appImages.noUser
            const title=distributor?.organization||organization||'-- -- -- --'
            const description=distributor?.address||address||'-- -- -- --'
            return (
              <CardView
                customMarginTop={responsiveHeight(1)}
                source={{ uri: imageUrl }}
                title={title}
                pickupsource={
                  selectedTouchable === 'Pending Pick-ups'
                    ? pocket1
                    : greenheart
                }
                description={description}
                Availabletxt={
                  selectedTouchable === 'Pending Pick-ups'
                    ? 'Pending'
                    : 'Favorite'
                }
                additionalInfo={item.additionalInfo}

                showPickupsView={true}
                onPress={() => handleCardPress(item)}
              />
            )
          }}
        />
        <View style={{ height: responsiveHeight(4) }} />
      </ScrollView>
      <TouchableOpacity 
  activeOpacity={0.8}
  style={{
    right: responsiveWidth(0), 
    bottom: responsiveHeight(0), 
    alignItems:'center',
    alignSelf:'flex-end',
    position:'absolute'
   
  }}
  onPress={() => {setHelpCalloutModalVisible(true)}}
>
  <Image
    source={HelpCallout}
    resizeMode='cover'
    style={[
      appStyles.helpview,
      {
       
      },
    ]}
  />
</TouchableOpacity>
      {/* <View style={appStyles.loadingContainer}>
        {loadingAnimation && (
          <LottieView
            source={animation} // Your animation source
            autoPlay
            loop
            style={appStyles.loadingAnimation} // Apply your animation styles
          />
        )}
      </View> */}
      <Loaders.AbsolutePrimary
        isVisible={loading || !pendingPickups}
      />
      <HelpCalloutModal
        isVisible={isHelpCalloutModalVisible}
        onBackdropPress={() => setHelpCalloutModalVisible(false)}
        toggleModal={() => setHelpCalloutModalVisible(false)}
        Title='Reserved Food Help'
        helpcallouttxt={
          selectedTouchable === 'Pending Pick-ups'
            ? 'Pending Pick-up are reservations that you have but have not picked up the food package. If you select the pending button your QR code show up on your screen. You must show the QR code at the time of pick-up to receive your food package. You can also cancel a food reservation on the same screen. Press the Find Food button to return to the Find Food screen.'
            : selectedTouchable === 'Favorites'
              ? 'Save food centers that you have visited and/or want to save for the future as a favorite. This way you dont have to search for through multiple entries when you want to make a reservation.'
              : 'Default text if none of the conditions match.'
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  touchablesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: colors.color16,
    borderRadius: responsiveWidth(50),
    width: responsiveWidth(92),
    height: responsiveHeight(5),
    marginBottom: responsiveHeight(1),
    marginTop: responsiveHeight(2),
    alignSelf: 'center'
  },
  touchable1: {
    flex: 0.6,
    margin: responsiveWidth(3),
    padding: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    width: responsiveWidth(48),
    height: responsiveHeight(5),
    marginTop: responsiveHeight(0),
    marginLeft: responsiveWidth(0),
  },
  touchable2: {
    flex: 0.4,
    margin: responsiveWidth(3),
    padding: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    width: responsiveWidth(43),
    height: responsiveHeight(5),
    marginTop: responsiveHeight(0),
    marginRight: responsiveWidth(0),
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
  loadingIndicator: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the background color and opacity
    zIndex: 999, // Adjust the zIndex as needed
  },
});

export default ReservedFood;
