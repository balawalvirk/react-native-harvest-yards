import React, { useState, useEffect } from 'react';
import { View, Text, Button, Platform } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

export default function useLocation() {
    const [currentLocation, setCurrentLocation] = useState(null);

    useEffect(() => {
        // Get current location when the component mounts
        requestLocationPermission();
    }, []);

    const requestLocationPermission = async () => {
        try {
            let locationPermission;

            if (Platform.OS === 'android') {
                locationPermission = await requestAndroidLocationPermission();
            } else if (Platform.OS === 'ios') {
                locationPermission = await requestIOSLocationPermission();
            }
console.log('locationPermission: ',locationPermission)
            if (locationPermission === RESULTS.GRANTED) {
                // Get current location
                Geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        setCurrentLocation({ latitude, longitude });
                    },
                    (error) => {
                        console.error('Error getting current location:', error);
                    },
                    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
                );
            } else {
                console.log('Location permission denied.');
            }
        } catch (error) {
            console.error('Error requesting location permission:', error);
        }
    };

    const requestAndroidLocationPermission = async () => {
        return request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    };

    const requestIOSLocationPermission = async () => {
        return request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    };

    const calculateDistance = (targetLocation) => {
        let distance=0
        if (currentLocation) {
            const { latitude: lat1, longitude: lon1 } = currentLocation;
            const { latitude: lat2, longitude: lon2 } = targetLocation;

            const R = 6371; // Earth's radius in kilometers

            const dLat = toRad(lat2 - lat1);
            const dLon = toRad(lon2 - lon1);

            const a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

            const distanceInKm = R * c;

            distance=distanceInKm
        }
        return distance
    };

    const toRad = (value) => {
        return (value * Math.PI) / 180;
    };

    return {
        currentLocation,
        calculateDistance
    };
};

