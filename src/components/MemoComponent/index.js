import React from 'react';
import CardView from '../../components/CardView';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import {
  useLocation,
  roundToDecimal
} from '../../services'
const MemoizedRenderItem = React.memo(({ item, navigation }) => {
  const {currentLocation, calculateDistance} = useLocation()
  const { latitude, longitude } = item;
  const location = latitude && longitude ? { latitude, longitude } : null;
  const distance = currentLocation && location ? calculateDistance(location) : null;
  const distanceInMile = distance * 0.621371; 
  const distanceInDecimal = distanceInMile ? roundToDecimal(distanceInMile, 2) : null;
  const distanceInMiles = distanceInDecimal ? distanceInDecimal + ' Miles' : '';
  const parts = item.address.split(',');
const streetAddress = parts[0].trim();
const cityAndZip = parts.slice(1).join(',').trim();

  return (
    <CardView
      customMarginTop={responsiveHeight(1)}
      source={{ uri: item.profileImage }}
      title={item.organization}
      description={streetAddress}
      description2={cityAndZip}
      distance={distanceInMiles}
      Availabletxt={`${item.availableMeals !== undefined ? item?.availableMeals : 0} Available`}
      additionalInfo={distanceInMiles}
      onPress={() => {
        const { availableMeals, ...otherItemDetails } = item;
        navigation.navigate('AppNavigation', {
          screen: 'Reservedfood1',
          params: { item, userId: item.userId },
        });
      }}
    />
  );
});

export default MemoizedRenderItem;
