import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { appStyles } from '../../../services/utilities/appStyles';
import Header from '../../../components/Headers';
import CustomTextInput from '../../../components/Textinputs';
import { HelpCallout, Image10, Image11, Image12, Image13, Image14, Image2, Image5, Image6, Image7, Image8, LeftButton, MenueButton, animation, blackX, checkcircle, checksquare, copy, edit, locationtag, mappin, plus, redtag, search, tag, x } from '../../../services/utilities/assets';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import LottieView from 'lottie-react-native';
import firestore from '@react-native-firebase/firestore';
import { Clipboard } from '@react-native-clipboard/clipboard';
import CustomLocationInput from '../../../components/Textinputs/Locationinput';
import CardView from '../../../components/CardView';
import { FlatList } from 'react-native-gesture-handler';
import CouponsView from '../../../components/CouponsView';
import { colors } from '../../../services/utilities/color';
import { HelpCalloutModal } from '../../../components/Modal/Tip Modal';
import { scale } from 'react-native-size-matters';
import { RefreshControl } from 'react-native';
const Location = ({ navigation }) => {
  const [isHelpCalloutModalVisible, setHelpCalloutModalVisible] = useState(false);
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null); // State to track the selected location
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingAnimation, setLoadingAnimation] = useState(false);
  // Your useEffect hook remains the same

  const handleLocationSelect = (location) => {
    // Update the selected location when a user selects from the saved locations
    setSelectedLocation(location);
  };
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        setLoading(true);
        setLoadingAnimation(true);
        const locationsSnapshot = await firestore().collection('LocationDetail').get();
  
        const fetchedLocations = locationsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
  
        setLocations(fetchedLocations);
        console.log('Fetched Locations:', fetchedLocations); // Add this console log
        setLoading(false);
        setLoadingAnimation(false);
      } catch (error) {
        console.error('Error fetching locations:', error);
        setLoading(false);
        setLoadingAnimation(false);
      }
    };
  
    const onRefresh = () => {
      setRefreshing(true);
      fetchLocations().then(() => setRefreshing(false));
    };
  
    fetchLocations(); // Initial data fetch
  
    const unsubscribe = navigation.addListener('focus', () => {
      onRefresh(); // Fetch data when the screen comes into focus (e.g., when navigating back)
    });
  
    return unsubscribe;
  }, [navigation]);
  

  return (
    <SafeAreaView style={appStyles.container}>
      <Header
        imageSource={LeftButton}
        headerText="Location"
        showImage={true}
        onPress={() => navigation.goBack()}
        customTextMarginLeft={responsiveWidth(30)}
        marginleft={-responsiveWidth(2)}
      />

<ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            // onRefresh={onRefresh}
            colors={[colors.color33]} // Set the colors for the refresh indicator
          />
        }
      >
        <TouchableOpacity onPress={() => navigation.navigate('LocationRadious')}>
          <View style={[appStyles.getdirectioncontainer, {
            backgroundColor: colors.color16,
            marginTop: responsiveHeight(2),
            borderColor: colors.color16
          }]}>
            <Image source={plus} style={appStyles.Btnarrow} />
            <Text style={[appStyles.Lubemeuptext, { color: colors.color4 }]}>
              Add New Location
            </Text>
          </View>
        </TouchableOpacity>
        <Text style={[appStyles.infotxt, { marginTop: responsiveHeight(5) }]}>Selected</Text>
        {selectedLocation && ( // Conditionally render selected location if it exists
          <TouchableOpacity onPress={() => navigation.navigate('FindFood')}>
            <CouponsView
              customMarginTop={responsiveHeight(2)}
              source={checkcircle}
              source1={edit}
              expirecolor={colors.color4}
              coupontxt1={colors.color4}
              title={selectedLocation.title}
              backgroundcolor={colors.color36}
              description={selectedLocation.location}
            />
          </TouchableOpacity>
        )}
        <Text style={[appStyles.infotxt, { marginTop: responsiveHeight(5) }]}>Saved</Text>
        {locations.map(location => (
          <View key={location.id}>
            {location.locations.map((nestedLocation, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleLocationSelect(nestedLocation)} // Pass selected location to handleLocationSelect function
              >
                <CouponsView
                  customMarginTop={responsiveHeight(2)}
                  source={mappin}
                  source1={edit}
                  expirecolor={colors.color4}
                  coupontxt1={colors.color4}
                  title={nestedLocation.title}
                  description={nestedLocation.location}
                />
              </TouchableOpacity>
            ))}
          </View>
        ))}
<View style={{height:responsiveHeight(5)}}/>
      </ScrollView>
      <View style={appStyles.loadingContainer}>
      {loadingAnimation && (
          <LottieView
            source={animation} 
            autoPlay
            loop
            style={appStyles.loadingAnimation} 
          />
        )}
      </View>
      <TouchableOpacity onPress={() => setHelpCalloutModalVisible(true)}>
        <Image source={HelpCallout} style={[appStyles.helpview, { width: scale(60), height: scale(60) }]} />
      </TouchableOpacity>
      <HelpCalloutModal
        isVisible={isHelpCalloutModalVisible}
        onBackdropPress={() => setHelpCalloutModalVisible(false)}
        toggleModal={() => setHelpCalloutModalVisible(false)}
        bottom={responsiveHeight(4.7)}
        Title='Location Help'
        helpcallouttxt='The default location is your home address.
      You can use your current location to see the closest places to get food. 
      Or, enter an address where you would like to see places nearby to obtain food.'
      />
    </SafeAreaView>
  );
};

export default Location;
