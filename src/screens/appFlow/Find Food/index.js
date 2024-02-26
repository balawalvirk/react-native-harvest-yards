import React, {useState, useEffect, useRef} from 'react';
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
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {appStyles} from '../../../services/utilities/appStyles';
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
import { PERMISSIONS, RESULTS } from 'react-native-permissions';
const FindFood = ({navigation}) => {
  const [isHelpCalloutModalVisible, setHelpCalloutModalVisible] =
    useState(false);
  console.log('isHelpCalloutModalVisible', isHelpCalloutModalVisible);
  const [searchText, setSearchText] = useState('');
  const [distributorsData, setDistributorsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingAnimation, setLoadingAnimation] = useState(false);
  const hasLocationPermission = useRef(false);

  const {currentLocation, calculateDistance} = useLocation();
  // console.log('currentLocation: ', currentLocation)
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
              ? distributorsData
              : distributorsData.filter(item =>
                  item.organization
                    ?.toLowerCase()
                    ?.includes(searchText?.toLowerCase()),
                )
          }
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => <MemoizedRenderItem navigation={navigation} item={item} />}
         
        />
        <View style={{height: responsiveHeight(4)}} />
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
