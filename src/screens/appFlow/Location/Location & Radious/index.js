import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
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
import GooglePlacesInput from '../../../../components/GoggleLocation';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
export default function LocationRadious({ navigation }) {
    const [userId, setUserId] = useState(''); // State to store the current user's ID
    const [title, setTitle] = useState('');
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
             <ScrollView contentContainerStyle={appStyles.scrollViewContainer} showsVerticalScrollIndicator={false}>
                <CustomTextInput
                    label="Title"
                    keyboardType="default"
                    placeholder="Home"
                    responsiveMarginTop={2}
                    inputHeight={responsiveHeight(6)}
                    placeholderTextColor={colors.color4}
                    value={title}
                    onChangeText={(text) => setTitle(text)}
                />
                <CustomTextInput
                    label="Location"
                    keyboardType="default"
                    placeholder="ABC Center, New York"
                    placeholderMarginLeft={responsiveWidth(3)}
                    responsiveMarginTop={7}
                    inputHeight={responsiveHeight(6)}
                    source1={GPS}
                    TextinputWidth={responsiveWidth(67)}
                    marginLeft={responsiveWidth(65)}
                    source={mappin}
                    showImage={true}
                    value={location}
                    onChangeText={(text) => setLocation(text)}
                    placeholderTextColor={colors.color4}
                />
                <View style={appStyles.mapmainview}>
                    <MapView
                        style={{ width: scale(320), height: scale(247) }}
                        region={mapRegion}
                    >
                        {/* Marker */}
                        <Marker coordinate={markerCoordinate} pinColor={colors.color33} />

                        <Marker
                            coordinate={{ latitude: 37.78845, longitude: -122.4327 }} // Set the coordinates for the second marker
                            pinColor={colors.color33} // Optionally, set a different pin color for the second marker
                        />
                        {/* Circle for Radius */}
                        <Circle
                            center={markerCoordinate}
                            radius={circleRadius} // Set the radius in meters
                            fillColor="rgba(14, 166, 39, 0.3)" // Set the fill color for the circle
                            strokeColor="rgba(14, 166, 39, 0.7)" // Set the stroke color for the circle
                            strokeWidth={2}
                        />
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

                <TouchableOpacity style={[appStyles.Lubemeupcontainer, { marginTop: responsiveHeight(8) }]}>
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
