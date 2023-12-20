import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { StyleSheet, View } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const GooglePlacesInput = () => {
  return (
   <View style={{marginTop:responsiveHeight(4),width:responsiveWidth(90)}}>


    <GooglePlacesAutocomplete
      placeholder='Search'
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(data, details);
      }}
      query={{
         key: 'AIzaSyCWymlaPZyBhBw78qINEvZUzjzWUFsRkss',
        language: 'en',
      }}
      
    />
    </View>
  );
};
export default GooglePlacesInput;