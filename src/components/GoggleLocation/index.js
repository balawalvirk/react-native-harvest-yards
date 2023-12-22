// import React from 'react';
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
// import { StyleSheet, View } from 'react-native';
// import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

// const GooglePlacesInput = () => {
//   return (
//     // <View style={{flex:1}}>


//   //  <View style={{marginTop:responsiveHeight(4),width:responsiveWidth(90)}}>
//     <GooglePlacesAutocomplete
//       placeholder='Search'
//       onPress={(data, details = null) => {
//         // Ensure the correct location data is being set in the state
//         setSelectedLocation(data.description); // Or details.description, based on the structure
//       }}
//       query={{
//          key: 'AIzaSyCWymlaPZyBhBw78qINEvZUzjzWUFsRkss',
//         language: 'en',
//       }} 
//     />
//     // </View>
//     // </View>
//   );
// };
// export default GooglePlacesInput;
import React, { useState } from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const GooglePlacesInput = () => {
  const [userLocationOrZipcode, setUserLocationOrZipcode] = useState('');

  return (
    <GooglePlacesAutocomplete
      placeholder='Location/Zipcode'
      minLength={2}
      autoFocus={false}
      returnKeyType={'search'}
      listViewDisplayed={false}
      fetchDetails={false}
      onChangeText={(text) => setUserLocationOrZipcode(text)}
      onPress={(data, details = null) => {
        if (details && details.description) {
          console.log("--->", details, data);
          setUserLocationOrZipcode(details.description);
        }
      }}
      getDefaultValue={() => ''}
      query={{
        key: 'AIzaSyCWymlaPZyBhBw78qINEvZUzjzWUFsRkss',
        language: 'en',
        types: '(regions)',
      }}
      styles={{
        container: {
          marginTop: 45,
          zIndex: 9999,
          width: '100%',
          borderWidth: 1,
          margin: 0,
          padding: 0,
          position: 'absolute',
          backgroundColor: 'white',
        },
        textInput: {
          color: 'black',
          paddingTop: 0,
          paddingBottom: 0,
          paddingLeft: 0,
          paddingRight: 0,
          marginTop: 0,
          marginLeft: 0,
          marginRight: 0,
          borderWidth: 0,
          height: 44,
        },
        textInputContainer: {
          backgroundColor: 'rgba(0,0,0,0)',
          borderTopWidth: 0,
          borderBottomWidth: 0,
        },
        listView: {
          position: 'absolute',
          backgroundColor: 'white',
          borderWidth: 1,
          width: '100%',
          zIndex: 9999,
        },
      }}
      currentLocation={true}
      currentLocationLabel='Current location'
      nearbyPlacesAPI='GooglePlacesSearch'
      GoogleReverseGeocodingQuery={{}}
      GooglePlacesSearchQuery={{
        rankby: 'distance',
      }}
      debounce={200}
    />
  );
};

export default GooglePlacesInput;
