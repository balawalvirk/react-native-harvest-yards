import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, PermissionsAndroid, Platform, } from 'react-native';
import { appStyles } from '../../../../services/utilities/appStyles';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomTextInput from '../../../../components/Textinputs';
import Button from '../../../../components/Button';
import { Buttonminus, Buttonplus, Down, GPS, LeftButton, mappin } from '../../../../services/utilities/assets';
import { colors } from '../../../../services/utilities/color';
import Header from '../../../../components/Headers';
import MapView, { Marker, Circle } from 'react-native-maps';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { scale } from 'react-native-size-matters';
import Geocoder from 'react-native-geocoding';
import DropDownPicker from 'react-native-dropdown-picker';
import Geolocation from '@react-native-community/geolocation';
import GetLocation from 'react-native-get-location'
import { v4 as uuidv4 } from 'uuid';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
export default function LocationRadious({ navigation, route }) {
    const [userId, setUserId] = useState(''); // State to store the current user's ID
    const [title, setTitle] = useState('');
    const [error, setError] = useState(null);
    const [currentLocation, setCurrentLocation] = useState({ latitude: 0, longitude: 0 });
    const [location, setLocation] = useState('');
    const [distributorsLocations, setDistributorsLocations] = useState([]);
    const [distributors, setDistributors] = useState([]);
    const { location: initialLocation, status: initialStatus, title: initialTitle } = route.params || {};
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
        if (initialStatus) {
            setStatus(initialStatus);
        }
    }, [initialTitle, initialLocation, initialStatus]);

    const handleLocationChange = (text) => {
        // Update location state when the text changes
        setLocation(text);
    };

    // useEffect(() => {
    //     const getLocation = async () => {
    //         try {
    //             const location = await GetLocation.getCurrentPosition({
    //                 enableHighAccuracy: true,
    //                 timeout: 10000,
    //             });
    //             setCurrentLocation({ latitude: location.latitude, longitude: location.longitude });
    //             console.log('Current Latitude:', location.latitude);
    //             console.log('Current Longitude:', location.longitude);
    //         } catch (error) {
    //             console.warn('Error getting location:', error);
    //         }
    //     };

    //     getLocation();
    // }, []);
    const getCurrentLocation = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Location Permission',
                    message: 'This app needs access to your location.',
                    buttonPositive: 'OK',
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                Geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        setCurrentLocation({ latitude, longitude });
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
                    (error) => {
                        console.error('Error getting location: ', error);
                    },
                    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
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
                snapshot.forEach((doc) => {
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
                console.log('Fetched distributor coordinates:', coordinates);
            } catch (error) {
                console.error('Error fetching distributor coordinates:', error);
            }
        };
        fetchDistributorsCoordinates();
    }, []);


    const [distributorsCoordinates, setDistributorsCoordinates] = useState([]);



    useEffect(() => {

        const currentUser = auth().currentUser;
        if (currentUser) {
            setUserId(currentUser.uid);
        }
    }, []);
    const [circleRadius, setCircleRadius] = useState(3500);
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
            };

            // Check if there is an ID passed from the previous screen
            const { id: id } = route.params || {};

            // Find the index of the location in the locations array based on the routeId
            const locationIndex = locations.findIndex(loc => loc.id === id);

            if (locationIndex !== -1) {
                // If the location exists with the provided ID, update its values
                locations[locationIndex] = {
                    ...locations[locationIndex],
                    title: newLocation.title,
                    location: newLocation.location,
                    status: newLocation.status,
                };
            } else {
                // If no ID is passed or the ID doesn't exist in the locations array, add a new location
                locations.push(newLocation);
            }

            await userDocRef.set({ locations }, { merge: true });

            navigation.navigate('Location');
        } catch (error) {
            console.error('Error saving data:', error);
        }
    };
    const handleRadiusChange = (value) => {
        let newRadius = 3500; // Default radius or fallback value
    
        // Update radius based on the selected dropdown value
        if (value === '1 miles') {
            newRadius = 1609.34; // Convert 1 mile to meters (approx. value)
        } else if (value === '2 miles') {
            newRadius = 3218.68; // Convert 2 miles to meters (approx. value)
        }
        // Add other conditions for different radius values as needed...
    
        setCircleRadius(newRadius); // Set the new circle radius
    
        console.log('Selected Radius:', value);
    };

    const [isOpen, setIsOpen] = useState(false);
    const [status, setStatus] = useState('');
    const [mapRegion, setMapRegion] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

    const handleZoomIn = () => {
        const newRegion = {
            ...mapRegion,
            latitudeDelta: mapRegion.latitudeDelta / 2,
            longitudeDelta: mapRegion.longitudeDelta / 2,
        };
        setMapRegion(newRegion);
    };

    const handleZoomOut = () => {
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
        const { geometry } = details;
        if (geometry) {
            const { location } = geometry;
            const { lat, lng } = location;

            // Create a new region based on the selected location
            const newRegion = {
                latitude: lat,
                longitude: lng,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            };
            // Update the map region to the selected location
            setMapRegion(newRegion);
            setMarkerCoordinate({ latitude: lat, longitude: lng });
            setCurrentLocation({ latitude: lat, longitude: lng }); // Set current location
        }
    };
    const items = [
        { label: '1 miles', value: '1 miles' },
        { label: '2 miles', value: '2 miles' },
        { label: '3 miles', value: '3 miles' },
        { label: '4 miles', value: '4 miles' },
        { label: '5 miles', value: '5 miles' },
        // {label: '6 miles', value: '6 miles'},
        // {label: '7 miles', value: '7 miles'},
        // {label: '8 miles', value: '8 miles'},
        // {label: '9 miles', value: '9 miles'},
        // {label: '10 miles', value: '10 miles'},
    ];
    const mapRef = useRef(null);
    async function moveToLocation(latitude, longitude) {
        mapRef.current.animateToRegion(
            {
                latitude,
                longitude,
                latitudeDelta: 0.015,
                longitudeDelta: 0.015
            },
            2000,
        )
    }
    return (
        <SafeAreaView style={appStyles.container}>
            <Header
                imageSource={LeftButton}
                headerText="Location & Radius"
                showImage={true}
                onPress={() => navigation.goBack()}
                customTextMarginLeft={responsiveWidth(23)}
                marginleft={-responsiveWidth(2)}
            />

            <ScrollView contentContainerStyle={appStyles.scrollViewContainer}
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
                    onChangeText={(text) => setTitle(text)}
                />
                <Text style={[appStyles.label, { marginTop: responsiveHeight(5), marginLeft: responsiveWidth(5.5) }]}>Location</Text>
                <View style={appStyles.searchmain}>
                    <Image source={mappin} style={[appStyles.Email, { marginLeft: responsiveWidth(10) }]} />
                    <View style={appStyles.searchinput}>
                        <GooglePlacesAutocomplete
                            placeholder='ABC Center, New York'
                            fetchDetails={true}
                            textInputProps={{
                                value: location,
                                onChange: handleLocationChange
                            }}
                            onPress={(data, details = null) => {
                                console.log(JSON.stringify(details?.geometry?.location));
                                console.log(data, details);
                                setLocation(data.description);
                                moveToLocation(details?.geometry?.location.lat, details?.geometry?.location.lng);
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
                                    color:colors.color18,

                                },
                                listView: {
                                    zIndex: 9999,
                                    width: responsiveWidth(87),
                                    alignSelf: 'center',
                                    marginTop: responsiveHeight(6),
                                    position: 'absolute'
                                },

                            }}
                        />
                    </View>
                    <Image source={GPS} style={[appStyles.Email, { marginRight: responsiveWidth(9) }]} />
                </View>
                <View style={appStyles.mapmainview}>
                    <MapView
                        style={{ width: scale(320), height: scale(247) }}
                        region={mapRegion}
                        ref={mapRef}
                    >
                        {currentLocation && (
                            <Marker
                                coordinate={currentLocation}
                                pinColor={colors.color33}
                                title={'current location'}
                            />
                        )}

                        {currentLocation && (
                            <Circle
                                center={currentLocation}
                                radius={circleRadius}
                                fillColor="rgba(14, 166, 39, 0.3)"
                                strokeColor="rgba(14, 166, 39, 0.7)"
                                strokeWidth={2}
                            />
                        )}
                        {distributors.map((distributor) => (
                            <Marker
                                key={distributor.id}
                                coordinate={{
                                    latitude: distributor.latitude, // Corrected property name
                                    longitude: distributor.longitude,

                                }}
                                pinColor={colors.color33}
                                title={distributor.organization}
                            />
                        ))}
                    </MapView>
                </View>


                <TouchableOpacity onPress={handleZoomIn}>
                    <Image source={Buttonplus} style={[appStyles.plusbutton, { marginTop: -responsiveHeight(11.5) }]} />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleZoomOut}>
                    <Image source={Buttonminus} style={[appStyles.plusbutton, { marginTop: -responsiveHeight(6.5) }]} />
                </TouchableOpacity>
                <View style={[appStyles.dropdownContainer, { marginTop: responsiveHeight(3) }]}>
                    <Text style={[appStyles.label, { marginLeft: responsiveWidth(5) }]}>Radius Area</Text>
                    <View style={{ marginHorizontal: responsiveWidth(5) }}>
                        <DropDownPicker
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
                            setValue={(value) => {
                                console.log('Selected Value:', value); // Add this log to check the selected value
                                setStatus(value);
                                handleRadiusChange(value); // Call the function to update the circle radius
                            }}
                            setOpen={() => setIsOpen(!isOpen)}
                            open={isOpen}
                            value={status}
                            dropDownStyle={appStyles.dropDownStyle}
                            dropDownDirection='Top'

                        />
                    </View>
                </View>

                <TouchableOpacity style={[appStyles.Lubemeupcontainer, { marginTop: responsiveHeight(4) }]}>
                    <Button
                        label="Save"
                        customImageMarginRight={responsiveWidth(2)}
                        onPress={saveDataToFirestore}
                    />
                </TouchableOpacity>
                <View style={{ height: responsiveHeight(16) }} />
            </ScrollView>
        </SafeAreaView>
    );
}
