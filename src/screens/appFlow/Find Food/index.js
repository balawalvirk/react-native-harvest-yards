import React, { useState, useEffect } from 'react';
import { View, ScrollView, SafeAreaView, Image, Text, TouchableOpacity, FlatList, BackHandler } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { appStyles } from '../../../services/utilities/appStyles';
import Header from '../../../components/Headers';
import { HelpCalloutModal } from '../../../components/Modal/Tip Modal';
import { MenueButton, search, locationtag, HelpCallout, animation, mappin } from '../../../services/utilities/assets';
import CustomLocationInput from '../../../components/Textinputs/Locationinput';
import CardView from '../../../components/CardView';
import Toast from 'react-native-toast-message';
import firestore from '@react-native-firebase/firestore';
import { scale } from 'react-native-size-matters';
import { colors } from '../../../services/utilities/color';
import LottieView from 'lottie-react-native';
import { RefreshControl } from 'react-native';
import { roundToDecimal, useLocation } from '../../../services';
import { Loaders } from '../../../components';
const FindFood = ({ navigation }) => {
  const [isHelpCalloutModalVisible, setHelpCalloutModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [distributorsData, setDistributorsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingAnimation, setLoadingAnimation] = useState(false);

  const { currentLocation, calculateDistance } = useLocation()
  console.log('currentLocation: ', currentLocation)
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backPressed);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backPressed);
    };
  }, []);
  const backPressed = () => {
    if (navigation.isFocused()) {
      BackHandler.exitApp();
    }
  };
  const fetchDistributorsData = async () => {
    try {
      setLoading(true);
      setLoadingAnimation(true);
      const distributorsCollection = await firestore().collection('distributors').get();
      const fetchedData = [];
      distributorsCollection.forEach((doc) => {
        fetchedData.push({ ...doc.data(), userId: doc.id });
      });
      setDistributorsData(fetchedData);
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Data fetched successfully!',
      });
      setLoading(false);
      setLoadingAnimation(false);
    } catch (error) {
      setLoading(false);
      setLoadingAnimation(false);
      console.error('Error fetching distributors data:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to fetch data. Please try again.',
      });
    }
  };
  const onRefresh = () => {
    setRefreshing(true);
    fetchDistributorsData().then(() => setRefreshing(false));
  };
  useEffect(() => {
    fetchDistributorsData();
  }, []);
  return (
    <SafeAreaView style={appStyles.container}>
      <Header
        imageSource={MenueButton}
        headerText="Find Food"
        showImage={true}
        onPress={() => navigation.openDrawer()}
        customTextMarginLeft={responsiveWidth(26)}
        // showImage2={true}
        marginleft={-responsiveWidth(2)}
        bellmarginleft={responsiveWidth(32)}
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
          onChangeText={(text) => setSearchText(text)}
          value={searchText}
        />
        {searchText !== '' && (
          <TouchableOpacity onPress={() => setSearchText('')}>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => navigation.navigate('AppNavigation', { screen: 'Location' })}>
          <View style={appStyles.locationview}>
            <TouchableOpacity onPress={() => navigation.navigate('AppNavigation', { screen: 'Location' })}>
              <Image source={mappin} style={appStyles.locationtag} />
            </TouchableOpacity>
          </View>

        </TouchableOpacity>
        <Text style={[appStyles.infotxt, { marginBottom: responsiveHeight(0.1) }]}>Nearby</Text>
        <FlatList
          data={searchText === '' ? distributorsData : distributorsData.filter(item =>
            item.organization?.toLowerCase()?.includes(searchText?.toLowerCase())
          )}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
            const { latitude, longitude } = item
            const location = latitude && longitude ? { latitude, longitude } : null
            const distance = currentLocation && location ? calculateDistance(location) : null
            const distanceInDecimal=distance?roundToDecimal(distance,2):null
            const distanceInKm=distanceInDecimal?distanceInDecimal+' km away':''
          //  __DEV__&& console.log('location: ',location)
          //  __DEV__&& console.log('distance: ',distance)
          //  __DEV__&& console.log('distanceInDecimal: ',distanceInDecimal)
          //  __DEV__&& console.log('distanceInKm: ',distanceInKm)
            return (
              <CardView
                customMarginTop={responsiveHeight(1)}
                source={{ uri: item.profileImage }}
                title={item.organization}
                description={item.address}
                distance={distanceInKm}
                Availabletxt={`${item.availableMeals !== undefined ? item.availableMeals : '0'} Available`} // Check if availableMeals is defined, if not, show '0'
                additionalInfo={distanceInKm}
                onPress={() => {
                  const { availableMeals, ...otherItemDetails } = item; // Destructuring to exclude availableMeals
                  navigation.navigate('AppNavigation', {
                    screen: 'Reservedfood1',
                    params: {item, userId: item.userId },
                  });
                }}
              />
            )
          }}
        />
        <View style={{ height: responsiveHeight(4) }} />
      </ScrollView>
      <TouchableOpacity onPress={() => setHelpCalloutModalVisible(true)}>
        <Image source={HelpCallout} style={[appStyles.helpview, { width: scale(60), height: scale(60), marginBottom: -responsiveHeight(3) }]} />
      </TouchableOpacity>
       <Loaders.AbsolutePrimary
          isVisible={loading}
        />
      <HelpCalloutModal
        isVisible={isHelpCalloutModalVisible}
        onBackdropPress={() => setHelpCalloutModalVisible(false)}
        toggleModal={() => setHelpCalloutModalVisible(false)}
        Title='Find Food Help'
        helpcallouttxt='Leave the search box blank to find food near you.
        Enter an address to find food near a specific location.
        Scroll through the list of food suppliers and select a food supplier to get the details of what they offer.'
      />
    </SafeAreaView>
  );
};
export default FindFood;
