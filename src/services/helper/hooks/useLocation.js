import React, { useState, useEffect } from 'react';
import { View, Text, Button, Platform, Alert } from 'react-native';
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
      console.log('locationPermission: ', locationPermission);

      if (locationPermission === RESULTS.GRANTED) {
        // Get current location
        Geolocation.getCurrentPosition(
          position => {
            const { latitude, longitude } = position.coords;
            setCurrentLocation({ latitude, longitude });
          },
          error => {
            console.error('Error getting current location:', error);
          },
          { enableHighAccuracy: false, timeout: 15000 },
        );
      } else {
        console.log('Location permission denied.');
        // Check if user denied permission permanently
        if (locationPermission === RESULTS.BLOCKED) {
          showPermissionDeniedAlert();
        }
      }
    } catch (error) {
      console.error('Error requesting location permission:', error);
    }
  };

  const requestAndroidLocationPermission = async () => {
    const permissionStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    if (permissionStatus === RESULTS.GRANTED) {
      return RESULTS.GRANTED; // Already granted, no need to request again
    }
    return request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
  };

  const requestIOSLocationPermission = async () => {
    const permissionStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    if (permissionStatus === RESULTS.GRANTED) {
      return RESULTS.GRANTED; // Already granted, no need to request again
    }
    return request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
  };

  const calculateDistance = targetLocation => {
    let distance = 0;
    if (currentLocation) {
      const { latitude: lat1, longitude: lon1 } = currentLocation;
      const { latitude: lat2, longitude: lon2 } = targetLocation;

      const R = 6371; // Earth's radius in kilometers

      const dLat = toRad(lat2 - lat1);
      const dLon = toRad(lon2 - lon1);

      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) *
          Math.cos(toRad(lat2)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);

      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

      const distanceInKm = R * c;

      distance = distanceInKm;
    }
    return distance;
  };

  const toRad = value => {
    return (value * Math.PI) / 180;
  };

  const showPermissionDeniedAlert = () => {
    Alert.alert(
      'Location Permission Denied',
      'Please enable location permissions from your device settings to use this feature.',
      [{ text: 'OK' }],
    );
  };

  return {
    currentLocation,
    calculateDistance,
  };
}
