import React, {useState, useEffect, useRef, useLayoutEffect} from 'react';
import {
  View,
  ScrollView,
  SafeAreaView,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
  BackHandler,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {appStyles} from '../../../services/utilities/appStyles';
import {useFocusEffect} from '@react-navigation/native';
import Header from '../../../components/Headers';
import {HelpCalloutModal} from '../../../components/Modal/Tip Modal';
import {
  MenueButton,
  search,
  locationtag,
  HelpCallout,
  animation,
  mappin,
} from '../../../services/utilities/assets';
import CustomLocationInput from '../../../components/Textinputs/Locationinput';
import CardView from '../../../components/CardView';
import Toast from 'react-native-toast-message';
import firestore from '@react-native-firebase/firestore';
import {scale} from 'react-native-size-matters';
import {colors} from '../../../services/utilities/color';
import LottieView from 'lottie-react-native';
import {RefreshControl} from 'react-native';
import {roundToDecimal, useLocation} from '../../../services';
import {Loaders} from '../../../components';
import MemoizedRenderItem from '../../../components/MemoComponent';
import {PERMISSIONS, RESULTS} from 'react-native-permissions';
import { fontFamily, fontSize } from '../../../services/utilities/fonts';
const FindFood = ({navigation, route}) => {
  const [isHelpCalloutModalVisible, setHelpCalloutModalVisible] =
    useState(false);
  const [searchText, setSearchText] = useState('');
  const [distributorsData, setDistributorsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingAnimation, setLoadingAnimation] = useState(false);
  const hasLocationPermission = useRef(false);
  const {selectedLocation} = route?.params || {};
  // console.log('selectedLocation', selectedLocation)
  // console.log(distributorsData[0]);

  const {currentLocation, calculateDistance} = useLocation();
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
  useEffect(() => {
    const checkLocationPermission = async () => {
      const result = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

      if (result === RESULTS.GRANTED) {
        hasLocationPermission.current = true;
      } else {
        hasLocationPermission.current = false;
      }
    };

    // checkLocationPermission();
  }, []);
  const fetchDistributorsData = async () => {
    try {
      setLoading(true);
      setLoadingAnimation(true);
      const distributorsCollection = await firestore()
        .collection('distributors')
        .get();
      const fetchedData = [];
      distributorsCollection.forEach(doc => {
        fetchedData.push({...doc.data(), userId: doc.id});
      });
      setDistributorsData(fetchedData);
      if (hasLocationPermission.current) {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Data fetched successfully!',
        });
      }
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

  useFocusEffect(
    React.useCallback(() => {
      fetchDistributorsData();
    }, [searchText]),
  );
  //   let filteredDatabylocation =[];
  // if(selectedLocation !== undefined)
  // {
  // filteredDatabylocation = distributorsData.filter(item => {
  //   const milesValues = parseInt(selectedLocation.status);
  //   console.log('milesValues',milesValues);
  //   const maxDistance = milesValues;
  //   const metersInMile = 1609.34;

  //   if (selectedLocation && selectedLocation.latitude && selectedLocation.longitude && item && item.latitude && item.longitude) {
  //       // Convert latitudes and longitudes to radians
  //       const lat1 = selectedLocation.latitude * Math.PI / 180;
  //       const lon1 = selectedLocation.longitude  * Math.PI / 180;
  //       const lat2 = item.latitude * Math.PI / 180;
  //       const lon2 = item.longitude * Math.PI / 180;
  //       // Calculate the distance between the two points using Haversine formula
  //       const dlon = lon2 - lon1;
  //       const dlat = lat2 - lat1;
  //       const a = Math.sin(dlat / 2) * Math.sin(dlat / 2) +
  //           Math.cos(lat1) * Math.cos(lat2) *
  //           Math.sin(dlon / 2) * Math.sin(dlon / 2);
  //       const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  //       const distance = metersInMile * c; // Distance in meters
  //       console.log('distance2', distance);

  //       // Check if the distance is less than or equal to the maximum distance
  //       if (distance <= maxDistance &&
  //         item.availableMeals > 0) {
  //           console.log('distance', distance);
  //           return true;
  //       }
  //   }
  //   return false;
  // });
  //   console.log('filteredDatabylocation', filteredDatabylocation);
  // }

  return (
    <SafeAreaView style={appStyles.container}>
      <Header
        imageSource={MenueButton}
        headerText="Find Food"
        showImage={true}
        onPress={() => navigation.openDrawer()}
        customTextMarginLeft={responsiveWidth(26)}
        // showImage2={true}
        marginleft={-responsiveWidth(0)}
        bellmarginleft={responsiveWidth(32)}
      />
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.color33]}
          />
        }>
        <CustomLocationInput
          showsearch={true}
          source={search}
          marginBottom={responsiveHeight(1)}
          inputWidth={responsiveWidth(75)}
          inneriinputtwidth={responsiveWidth(65)}
          placeholder="Search..."
          placeholderTextColor={colors.color29}
          maininputmarginleft={-responsiveWidth(16.6)}
          marginLeft={responsiveWidth(2)}
          onChangeText={text => setSearchText(text)}
          value={searchText}
        />

        {searchText !== '' && (
          <TouchableOpacity
            onPress={() => setSearchText('')}></TouchableOpacity>
        )}
        <TouchableOpacity
          style={appStyles.locationview}
          onPress={() =>
            navigation.navigate('AppNavigation', {screen: 'Location'})
          }>
          <Image source={mappin} style={appStyles.locationtag} />
        </TouchableOpacity>

        <Text
          style={[appStyles.infotxt, {marginBottom: responsiveHeight(0.1)}]}>
          Nearby
        </Text>
        <FlatList
          data={
            searchText === ''
              ? //   filteredDatabylocation.length > 0 ?
                // filteredDatabylocation : selectedLocation !== undefined ? null :

                distributorsData.filter(
                  item =>
                    !isNaN(item.availableMeals) && item.availableMeals > 0,
                )
              : distributorsData.filter(
                  item =>
                    (item.organization
                      ?.toLowerCase()
                      ?.includes(searchText?.toLowerCase()) ||
                      item.address
                        ?.toLowerCase()
                        ?.includes(searchText?.toLowerCase())) &&
                    item.availableMeals > 0,
                )
          }
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={() => (
            <View
              style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
              <Text
                style={{
                  fontSize: fontSize.h5,
                  fontFamily: fontFamily.SatoshiVariable,
                  fontWeight: '700',
                  color: colors.color25,
                }}>
                No data available
              </Text>
            </View>
          )}
          renderItem={({item}) => {
            return <MemoizedRenderItem navigation={navigation} item={item} />;
          }}
        />
        <View style={{height: responsiveHeight(4)}} />
      </ScrollView>
      <TouchableOpacity
        activeOpacity={0.8}
        style={{
          right: responsiveWidth(0),
          bottom: responsiveHeight(0),
          alignItems: 'center',
          alignSelf: 'flex-end',
          position: 'absolute',
        }}
        onPress={() => {
          setHelpCalloutModalVisible(true);
        }}>
        <Image
          source={HelpCallout}
          resizeMode="cover"
          style={[appStyles.helpview, {}]}
        />
      </TouchableOpacity>
      <Loaders.AbsolutePrimary isVisible={loading} />
      {isHelpCalloutModalVisible ? (
        <HelpCalloutModal
          isVisible={isHelpCalloutModalVisible}
          onBackdropPress={() => setHelpCalloutModalVisible(false)}
          toggleModal={() => setHelpCalloutModalVisible(false)}
          Title="Find Food Help"
          helpcallouttxt="Leave the search box blank to find food near you.
        Enter an address to find food near a specific location.
        Scroll through the list of food suppliers and select a food supplier to get the details of what they offer."
        />
      ) : null}
    </SafeAreaView>
  );
};
export default FindFood;
