import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {appStyles} from '../../../../services/utilities/appStyles';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomTextInput from '../../../../components/Textinputs';
import Button from '../../../../components/Button';
import {
  Buttonminus,
  Buttonplus,
  Down,
  GPS,
  LeftButton,
  mappin,
} from '../../../../services/utilities/assets';
import {colors} from '../../../../services/utilities/color';
import Header from '../../../../components/Headers';
import MapView, {Marker, Circle} from 'react-native-maps';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {scale} from 'react-native-size-matters';
import Geocoder from 'react-native-geocoding';
import DropDownPicker from 'react-native-dropdown-picker';
import { Dropdown } from 'react-native-element-dropdown';
import Geolocation from '@react-native-community/geolocation';
import GetLocation from 'react-native-get-location';
import {v4 as uuidv4} from 'uuid';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import DropdownComp from '../../../../components/DropDownPiker';
export default function LocationRadious({navigation, route}) {
  const [userId, setUserId] = useState(''); // State to store the current user's ID
  const [title, setTitle] = useState('');
  const [error, setError] = useState(null);
  const [latLocation, setlatLocation] = useState('');
  const [lonLocatuon, setlonLocatuon] = useState('');


  const [currentLocation, setCurrentLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [location, setLocation] = useState('');
  const [distributorsLocations, setDistributorsLocations] = useState([]);
  const [distributors, setDistributors] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState("2 miles");
  const [circleRadius, setCircleRadius] = useState(3500);
  // const [mapRegion, setMapRegion] = useState(null);
  // const [currentLocation, setCurrentLocation] = useState(null);
  const [mapRegion, setMapRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  console.log('distributors>>>>', JSON.stringify(distributors, null, 2));
  const {
    location: initialLocation,
    status: initialStatus,
    title: initialTitle,
    latLocation: initiallatitude,
    lonLocatuon: initiallongitude,
  } = route.params || {};
  console.log(console.log('initialLocation',initialLocation));
  const generateUniqueID = () => {
    return Math.random().toString(36).substr(2, 9);
  };
  useEffect(() => {
    if (initialTitle) {
      setTitle(initialTitle);
    }
    if (initialLocation) {
      setLocation(initialLocation);
    }
    // if (initiallatitude && initiallongitude) {
    //   setMapRegion({
    //     initiallatitude,
    //     initiallongitude,
    //     latitudeDelta: 0.0922,
    //     longitudeDelta: 0.0421,
    //   });
    // }
    if (initialStatus) {
      setStatus(initialStatus);
    }
  }, [initialTitle, initialLocation, initialStatus,circleRadius]);

  const handleLocationChange = text => {
    setLocation(text);
  };

  
  const getCurrentLocation = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app needs access to your location.',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          position => {
            const {latitude, longitude} = position.coords;
            setCurrentLocation({latitude, longitude});
            setMapRegion({
              latitude,
              longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            });

            // Log latitude and longitude here
            console.log('Current Latitude:', latitude);
            console.log('Current Longitude:', longitude);
          },
          error => {
            console.error('Error getting location: ', error);
          },
          {enableHighAccuracy: false, timeout: 15000, },
        );
      } else {
        console.log('Location permission denied');
      }
    } catch (error) {
      console.error('Error requesting location permission: ', error);
    }
  };

  // Effect to get the current location when component mounts
  useEffect(() => {
    getCurrentLocation();
  }, []);
  useEffect(() => {
    const fetchDistributorsCoordinates = async () => {
      try {
        const snapshot = await firestore().collection('distributors').get();
        const coordinates = [];
        snapshot.forEach(doc => {
          const data = doc.data();
          if (data.latitude && data.longitude) {
            coordinates.push({
              id: doc.id,
              latitude: parseFloat(data.latitude),
              longitude: parseFloat(data.longitude),
              organization: data.organization,
            });
          }
        });
        setDistributors(coordinates);
        // console.log('Fetched distributor coordinates:', coordinates);
      } catch (error) {
        console.error('Error fetching distributor coordinates:', error);
      }
    };
    fetchDistributorsCoordinates();
  }, []);

 

  useEffect(() => {
    const currentUser = auth().currentUser;
    if (currentUser) {
      setUserId(currentUser.uid);
    }
  }, []);
 
  // Function to save data to Firestore

  const saveDataToFirestore = async () => {
    try {
      const userDocRef = firestore().collection('LocationDetail').doc(userId);

      const doc = await userDocRef.get();
      let locations = [];

      if (doc.exists) {
        const data = doc.data();
        if (data.locations) {
          locations = data.locations;
        }
      }

      const newLocation = {
        id: generateUniqueID(),
        title,
        location,
        status,
        latitude: latLocation, 
        longitude: lonLocatuon, 
     
      };

      // Check if there is an ID passed from the previous screen
      const {id: id} = route.params || {};

      // Find the index of the location in the locations array based on the routeId
      const locationIndex = locations.findIndex(loc => loc.id === id);

      if (locationIndex !== -1) {
        // If the location exists with the provided ID, update its values
        locations[locationIndex] = {
          ...locations[locationIndex],
          title: newLocation.title,
          location: newLocation.location,
          status: newLocation.status,
          latitude:latLocation,
          longitude:lonLocatuon,
        
        };
      } else {
        // If no ID is passed or the ID doesn't exist in the locations array, add a new location
        locations.push(newLocation);
      }

      await userDocRef.set({locations}, {merge: true});

      navigation.navigate('Location');
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };
  const handleRadiusChange = value => {
    console.log("value>>",value);
    const miles = parseFloat(value);
      console.log("miles>>>",miles);
    if (!isNaN(miles)) {
      const newRadius = miles * 1609.34; // Convert to meters
      console.log('Selected Radius:', value);
      console.log('newRadius:', newRadius);
      setCircleRadius(newRadius);
    } else {
      setCircleRadius(1609.34);
      console.error('Invalid value:', value);
    }
  };

 
  console.log("status>>",status);
  

  const handleZoomIn = () => {
    console.log("handleZoomIn called");
    const newRegion = {
      ...mapRegion,
      latitudeDelta: mapRegion.latitudeDelta / 2,
      longitudeDelta: mapRegion.longitudeDelta / 2,
    };
    setMapRegion(newRegion);
  };

  const handleZoomOut = () => {
    console.log("handleZoomOut called");
    const newRegion = {
      ...mapRegion,
      latitudeDelta: mapRegion.latitudeDelta * 2,
      longitudeDelta: mapRegion.longitudeDelta * 2,
    };
    setMapRegion(newRegion);
  };
  const [markerCoordinate, setMarkerCoordinate] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });
  const handleLocationSelect = (data, details) => {
    const {geometry} = details;
    if (geometry) {
      const {location} = geometry;
      const {lat, lng} = location;

      // Create a new region based on the selected location
      const newRegion = {
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
      // Update the map region to the selected location
      setMapRegion(newRegion);
      setMarkerCoordinate({latitude: lat, longitude: lng});
      setCurrentLocation({latitude: lat, longitude: lng}); // Set current location
    }
  };
  const items = [
    {id: '2 miles', value: '2 miles'},
    {id: '5 miles', value: '5 miles'},
    {id: '10 miles', value: '10 miles'},
    {id: '20 miles', value: '20 miles'},
    {id: '50 miles', value: '50 miles'},
  ];
  const mapRef = useRef(null);
  async function moveToLocation(latitude, longitude) {
    mapRef.current.animateToRegion(
      {
        latitude,
        longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.015,
      },
      2000,
    );
  }
  return (
    <SafeAreaView style={appStyles.container}>
      <Header
        imageSource={LeftButton}
        headerText="Location & Radius"
        showImage={true}
        onPress={() => navigation.goBack()}
        customTextMarginLeft={responsiveWidth(23)}
        marginleft={-responsiveWidth(0)}
      />

      <ScrollView
        contentContainerStyle={appStyles.scrollViewContainer}
        keyboardShouldPersistTaps={'handled'}
        showsVerticalScrollIndicator={false}>
        <CustomTextInput
          label="Title"
          keyboardType="default"
          placeholder="Home"
          // responsiveMarginTop={14}
          inputHeight={responsiveHeight(6)}
          placeholderTextColor={colors.color4}
          value={title}
          onChangeText={text => setTitle(text)}
        />
        <Text
          style={[
            appStyles.label,
            {marginTop: responsiveHeight(5), marginLeft: responsiveWidth(5.5)},
          ]}>
          Location
        </Text>
        <View style={appStyles.searchmain}>
          <Image
            source={mappin}
            style={[appStyles.Email, {marginLeft: responsiveWidth(10)}]}
          />
          <View style={appStyles.searchinput}>
            <GooglePlacesAutocomplete
              placeholder="ABC Center, New York"
              fetchDetails={true}
              textInputProps={{
                value: location,
                onChange: handleLocationChange,
            
              }}
              onPress={(data, details = null) => {
                console.log(JSON.stringify(details?.geometry?.location));
                console.log(data, details);
                setLocation(data.description);
                moveToLocation(
                  details?.geometry?.location.lat,
                  details?.geometry?.location.lng,
                );
                console.log(
                  details?.geometry?.location.lat,
                  '<<<>>>>',
                  details?.geometry?.location.lng,
                );
                setlatLocation( details?.geometry?.location.lat)
                setlonLocatuon( details?.geometry?.location.lng)

                handleLocationSelect(data, details); // This is where handleLocationSelect is called
              }}
              query={{
                key: 'AIzaSyCWymlaPZyBhBw78qINEvZUzjzWUFsRkss', // Replace with your API key
                language: 'en',
              }}
              onFail={error => console.log(error)}
              styles={{
                textInput: {
                  height: responsiveHeight(5),
                  marginVertical: 5,
                  color: colors.color18,
                },
               
                listView: {
                  zIndex: 9999,
                  width: responsiveWidth(87),
                  alignSelf: 'center',
                  marginTop: responsiveHeight(6),
                  position: 'absolute',
                 
                },
                description: {
                  color: colors.color18,
                },
              }}
            />
          </View>
          <Image
            source={GPS}
            style={[appStyles.Email, {marginRight: responsiveWidth(9)}]}
          />
        </View>
        <View style={appStyles.mapmainview}>
          <MapView
            style={{width: scale(320), height: scale(247)}}
            region={mapRegion}
            ref={mapRef}>
            {currentLocation && (
              <Marker
                coordinate={currentLocation}
                pinColor={colors.color33}
                title={'current location'}
              />
            )}

{/* {distributors.map(distributor => (
              <Marker
              key={distributor.id}
              coordinate={{
                // latitude: distributor.latitude,
                latitude: distributor?.latitude,
                //   latitude: 31.47737649999999,
                //   longitude: 74.3070546,
                longitude: distributor?.longitude,
              }}
              pinColor={'#FF0000'}
                title={'current location'}
              />
            ))} */}

            {currentLocation && (
              <Circle
                center={currentLocation}
                radius={circleRadius}
                fillColor="rgba(14, 166, 39, 0.3)"
                strokeColor="rgba(14, 166, 39, 0.7)"
                strokeWidth={2}
              />
            )}

            {distributors.map(distributor => (
              <Marker
                key={distributor.id}
                coordinate={{
                  // latitude: distributor.latitude,
                  latitude: distributor?.latitude,
                  //   latitude: 31.47737649999999,
                  //   longitude: 74.3070546,
                  longitude: distributor?.longitude,
                }}
                pinColor={'red'}
                
                title={distributor.organization}
                // image={require('../../../../assets/images/Basket3.png')}
              >
                <Image
                  source={require('../../../../assets/images/GreenLocation.png')}
                  style={{
                    width: 40, // Adjust the width as needed
                    height: 40, // Adjust the height as needed
                    resizeMode: 'contain', // Adjust the resizeMode as needed
                  }}
                />
              </Marker>
            ))}
          </MapView>
        </View>

        <TouchableOpacity  onPress={()=>handleZoomIn()}>
          <Image
            source={Buttonplus}
            style={[appStyles.plusbutton, {marginTop: -responsiveHeight(6.3),marginLeft: responsiveWidth(69),}]}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>handleZoomOut()}>
          <Image
            source={Buttonminus}
            style={[appStyles.plusbutton, {marginTop: -responsiveHeight(7)}]}
          />
        </TouchableOpacity>
        <View
          style={[
            appStyles.dropdownContainer,
            {marginTop: responsiveHeight(3)},
          ]}>
          {/* <Text style={[appStyles.label, {marginLeft: responsiveWidth(5)}]}>
            Radius Area
          </Text> */}
          <View style={{alignSelf:'center'}}>
            {/* <DropDownPicker
              items={items.map((item, index) => ({
                label: item.label,
                value: item.value,
                key: index.toString(),
              }))}
              arrowColor={colors.color4}
              labelStyle={appStyles.label}
              placeholder={'Miles'}
              dropDownMaxHeight={responsiveHeight(15)}
              containerStyle={appStyles.dcontainer}
              style={appStyles.Dropdown}
              setValue={(value) => 
              ( console.log("calllllll",value),
                setStatus(value),
                handleRadiusChange(status) )
              }
              setOpen={() => setIsOpen(!isOpen)}
              open={isOpen}
              value={status}
              dropDownStyle={appStyles.dropDownStyle}
              dropDownDirection="Top"
            /> */}
            <DropdownComp
            data={items}
            labelField={'value'}
            valueField={'id'}
            placeholder="Select CBD"
            value={status || ''}
            onChange={item => {
              setStatus(item?.value);
              handleRadiusChange(item?.value)
              console.log('item', item);
            }}
            search={false}
            title="Radius Area"
            // titleStyle={{marginLeft: wp(5)}}
            // dropdownStyle={styles.dropdownStyle}
          />
          </View>
        </View>

        <TouchableOpacity
          style={[
            appStyles.Lubemeupcontainer,
            {marginTop: responsiveHeight(4)},
          ]}>
          <Button
            label="Save"
            customImageMarginRight={responsiveWidth(2)}
            onPress={saveDataToFirestore}
          />
        </TouchableOpacity>
        <View style={{height: responsiveHeight(16)}} />
      </ScrollView>
    </SafeAreaView>
  );
}
