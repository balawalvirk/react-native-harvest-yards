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
import DropDownPicker from 'react-native-dropdown-picker';
import Geolocation from '@react-native-community/geolocation';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
export default function LocationRadious({ navigation }) {
    const [userId, setUserId] = useState(''); // State to store the current user's ID
    const [title, setTitle] = useState('');
    const [error, setError] = useState(null);
    const [currentLocation, setCurrentLocation] = useState({ latitude: 0, longitude: 0 });


    const [location, setLocation] = useState('');
    useEffect(() => {
        const currentUser = auth().currentUser;
        if (currentUser) {
            setUserId(currentUser.uid);
        }
    }, []);
    const circleRadius = 3500;
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
                title,
                location,
                status,
            };

            locations.push(newLocation);

            await userDocRef.set({ locations }, { merge: true });

            navigation.navigate('Location');
        } catch (error) {
            console.error('Error saving data:', error);
        }
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
                            onPress={(data, details = null) => {
                                console.log(JSON.stringify(details?.geometry?.location));
                                console.log(data, details);
                                setLocation(data.description);
                                moveToLocation(details?.geometry?.location.lat, details?.geometry?.location.lng);
                                handleLocationSelect(data, details); // This is where handleLocationSelect is called
                            }}
                            query={{
                                key: 'AIzaSyCWymlaPZyBhBw78qINEvZUzjzWUFsRkss',
                                language: 'en',
                            }}
                            onFail={error => console.log(error)}
                            styles={{
                                textInput: {
                                    height: responsiveHeight(5),

                                    //   backgroundColor: '#eee',
                                    marginVertical: 5,
                                },
                                listView: {
                                    // Adjust the zIndex here to control the dropdown stacking order
                                    zIndex: 9999,
                                    width: responsiveWidth(87),
                                    alignSelf: 'center',
                                    marginTop: responsiveHeight(6),
                                    position: 'absolute'
                                    // Additional styles if needed
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
                            />
                        )}

                        {currentLocation && (
                            <Circle
                                center={currentLocation}
                                radius={circleRadius} // Set the radius in meters
                                fillColor="rgba(14, 166, 39, 0.3)" // Set the fill color for the circle
                                strokeColor="rgba(14, 166, 39, 0.7)" // Set the stroke color for the circle
                                strokeWidth={2}
                            />
                        )}
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
                            placeholder={' '}
                            dropDownMaxHeight={responsiveHeight(15)}
                            containerStyle={appStyles.dcontainer}
                            style={appStyles.Dropdown}
                            setValue={value => setStatus(value)}
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
