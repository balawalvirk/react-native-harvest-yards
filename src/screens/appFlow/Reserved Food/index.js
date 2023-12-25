import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView, Text, Image, TouchableOpacity, FlatList ,ActivityIndicator} from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { appStyles } from '../../../services/utilities/appStyles';
import Header from '../../../components/Headers';
import { MenueButton, search, pocket8, heart, HelpCallout, pocket1, greenheart, Refresh, animation } from '../../../services/utilities/assets';
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
const ReservedFood = () => {
  const [selectedTouchable, setSelectedTouchable] = useState('Pending Pick-ups');
  const [isHelpCalloutModalVisible, setHelpCalloutModalVisible] = useState(false);
  const [showQRMainView, setShowQRMainView] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingAnimation, setLoadingAnimation] = useState(false);
  const navigation = useNavigation();

  const handleCardPress = (item) => {
    if (selectedTouchable === 'Pending Pick-ups') {
      // Navigate to ReservedPickups screen with parameters for 'pending'
      navigation.navigate('AppNavigation', {
        screen: 'ReservedPickups',
        params: { item: item, selectedTouchable: selectedTouchable,selectedCardID: item.cardID }
      });
    } else if (selectedTouchable === 'Favorites') {
      // Navigate to Reservedfavorites screen with parameters for 'favourites'
      navigation.navigate('AppNavigation', {
        screen: 'Reservedfavorites',
        params: { item: item, selectedTouchable: selectedTouchable }
      });
    }
  };
  const onRefresh = () => {
    setRefreshing(true);
    fetchDataFromFirestore(); 
    fetchFavorites();
    setRefreshing(false); 
  };
  const [favoritesData, setFavoritesData] = useState([]);
  const fetchFavorites = async () => {
    try {
      setLoading(true); 

      setLoadingAnimation(true); 
      const currentUser = auth().currentUser;
      const userId = currentUser ? currentUser.uid : null;
      if (!userId) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'User ID not found',
        });
        return;
      }
      const userDocRef = firestore().collection('users').doc(userId);
      const userDoc = await userDocRef.get();
      const userData = userDoc.data();
      let favoritesArray = userData && userData.favorites ? userData.favorites : [];
      setFavoritesData(favoritesArray);
      setLoading(false); 

      setLoadingAnimation(false);
    } catch (error) {
      setLoading(false); 
      setLoadingAnimation(false);

      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to fetch favorites. Please try again.',
      });
    }
  };
  useEffect(() => {
    fetchFavorites();
  }, []);
  const [reservedFoodData, setReservedFoodData] = useState([]);

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const handleSearch = (text) => {
    const formattedQuery = text.toLowerCase();
    setSearchQuery(formattedQuery);

    const filteredItems = selectedTouchable === 'Pending Pick-ups'
      ? reservedFoodData.filter(item =>
        item.organization.toLowerCase().includes(formattedQuery)
      )
      : favoritesData.filter(item =>
        item.organization.toLowerCase().includes(formattedQuery)
      );

    setFilteredData(filteredItems);
  };
    const fetchDataFromFirestore = async () => {
      try {
        setLoading(true);
        setLoadingAnimation(true); 
        const currentUser = auth().currentUser;
        const userId = currentUser ? currentUser.uid : null;
        if (!userId) {
          console.error('User ID not found');
          return;
        }
        const userDocRef = firestore().collection('users').doc(userId);
        const userDoc = await userDocRef.get();
        const userData = userDoc.data();

        if (userData && userData.reservedFood) {
          // Set the reserved food data fetched from Firestore to state
          setReservedFoodData(userData.reservedFood);
        }
        setLoading(false); 
        setLoadingAnimation(false); 
      } catch (error) {
        setLoading(false); 
        setLoadingAnimation(false); 
        console.error('Error fetching reserved food information:', error);
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Failed to fetch reserved food information. Please try again.',
        });
      }
    };
    useEffect(() => {
    fetchDataFromFirestore();
  }, []);
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
          inputWidth={responsiveWidth(92)}
          marginBottom={responsiveHeight(1)}
          inneriinputtwidth={responsiveWidth(82)}
          placeholder='Search...'
          placeholderTextColor={colors.color29}
          marginLeft={responsiveWidth(2)}
          onChangeText={handleSearch} // Call handleSearch on input change
          value={searchQuery} // Bind the input value to the searchQuery state
        />
        <FlatList
          data={searchQuery !== '' ? filteredData : selectedTouchable === 'Pending Pick-ups' ? reservedFoodData : favoritesData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <CardView
              customMarginTop={responsiveHeight(1)}
              source={{ uri: item.profileImage }}
              title={item.organization}
              pickupsource={
                selectedTouchable === 'Pending Pick-ups'
                  ? pocket1
                  : greenheart
              }
              description={item.address}
              Availabletxt={
                selectedTouchable === 'Pending Pick-ups'
                  ? 'Pending' 
                  : 'Favorite' 
              }
              additionalInfo={item.additionalInfo}

              showPickupsView={true}
              onPress={() => handleCardPress(item)}
            />
          )}
        />
        <View style={{ height: responsiveHeight(4) }} />
      </ScrollView>
      <TouchableOpacity onPress={() => setHelpCalloutModalVisible(true)}>
        <Image source={HelpCallout} style={[appStyles.helpview, { width: scale(60), height: scale(60) }]} />
      </TouchableOpacity>
      <View style={appStyles.loadingContainer}>
        {loadingAnimation && (
          <LottieView
            source={animation} // Your animation source
            autoPlay
            loop
            style={appStyles.loadingAnimation} // Apply your animation styles
          />
        )}
      </View>
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
