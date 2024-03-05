import React from 'react';
import CardView from '../../components/CardView';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
const MemoizedRenderItem = React.memo(({ item, currentLocation, calculateDistance, roundToDecimal, navigation }) => {

  const { latitude, longitude } = item;
  const location = latitude && longitude ? { latitude, longitude } : null;
  const distance = currentLocation && location ? calculateDistance(location) : null;
  const distanceInDecimal = distance ? roundToDecimal(distance, 2) : null;
  const distanceInKm = distanceInDecimal ? distanceInDecimal + ' km away' : '';

  return (
    <CardView
      customMarginTop={responsiveHeight(1)}
      source={{ uri: item.profileImage }}
      title={item.organization}
      description={item.address}
      distance={distanceInKm}
      Availabletxt={`${item.availableMeals !== undefined ? item?.availableMeals : 0} Available`}
      additionalInfo={distanceInKm}
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
