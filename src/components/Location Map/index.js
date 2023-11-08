import React from 'react';
import { View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const LocationMap = () => {
  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 37.78825, // Your initial latitude
          longitude: -122.4324, // Your initial longitude
          latitudeDelta: 0.0922, // Controls the zoom level
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{
            latitude: 37.78825, // Marker's latitude
            longitude: -122.4324, // Marker's longitude
          }}
          title="Marker Title"
          description="Marker Description"
        />
      </MapView>
    </View>
  );
};

export default LocationMap;
