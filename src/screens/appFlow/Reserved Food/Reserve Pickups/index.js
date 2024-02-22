import React, { useState, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity, FlatList, Text, SafeAreaView, Image, Linking } from 'react-native';
import { appStyles } from '../../../../services/utilities/appStyles';
import Header from '../../../../components/Headers';
import Button from '../../../../components/Button';
import Toast from 'react-native-toast-message';
import { Buttondownload, LeftButton, QRcode, blackX, calendar, checkcircle, greenheart, greensend, heart, Buttonzoom, locationtag, greenshoppingbag, pocket1 } from '../../../../services/utilities/assets';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import CardView from '../../../../components/CardView';
import CustomTextInput from '../../../../components/Textinputs';
import { colors } from '../../../../services/utilities/color';
import GetButton from '../../../../components/GetButton';
import { ModalRemoveUser } from '../../../../components/Modal';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import QRCode from 'react-native-qrcode-svg';
import { scale } from 'react-native-size-matters';
import { useHooks } from './hooks';
import { orderStatuses, updateOrder, useFirebaseAuth } from '../../../../services';
import { Loaders } from '../../../../components';
import {useLocation} from '../../../../services/helper';
const ReservedPickups = ({ route, navigation }) => {
  const {currentLocation, calculateDistance} = useLocation();
  console.log('currentLocation: ', currentLocation)
  const { item, reservationDate } = route.params || {};
  const distributerDetail = item?.distributor || null
  console.log("distributerDetail>>>>>000",distributerDetail);
  const { qrCodeRef, saveQRCodeToGallery } = useHooks()
  const { user } = useFirebaseAuth()

  const [selectedDate, setSelectedDate] = useState(null);
  const [showLubemeup, setShowLubemeup] = useState(true);
  const [showGetButton, setShowGetButton] = useState(false);
  const [selectedCardID, setSelectedCardID] = useState(null);
  console.log("selectedCardID>>>",JSON.stringify(selectedCardID,null,2));
  const [isRemoveUserModalVisible, setIsRemoveUserModalVisible] = useState(false);
  const [reservedFoodData, setReservedFoodData] = useState([]);
  const [loadingCancelReservation, setLoadingCancelReservation] = useState(false);
  // const { latitude, longitude } = locationDetails;
  const start_address = `${currentLocation?.latitude},${currentLocation?.longitude}`;
  const destination_address = `${distributerDetail?.latitude},${distributerDetail?.longitude}`;
  
  console.log('start_address --> ', start_address);
  console.log('destination_address --> ', destination_address);
  
  const url = Platform.select({
    // Google Maps app
    android: `google.navigation:q=${distributerDetail?.latitude}+${distributerDetail?.longitude}`,
    ios: `comgooglemaps://?center=${distributerDetail?.latitude},${distributerDetail?.longitude}&q=${distributerDetail?.latitude},${distributerDetail?.longitude}&zoom=14&views=traffic`,
  });
  
  const appleMaps = `maps://app?saddr=${start_address}&daddr=${destination_address}`;
  const googleMapSite = `https://www.google.com/maps/dir/?api=1&destination=${distributerDetail?.latitude},${distributerDetail?.longitude}&dir_action=navigate`;


  const handleLinkPress = () => {
    Linking.canOpenURL(url)
    .then((supported) => {
        if (supported) {
            return Linking.openURL(url);
        } else {
            return Linking.openURL(googleMapSite);
        }
    })
    .catch(() => {
        if (Platform.OS === 'ios') {
            Linking.openURL(
                googleMapSite
                // appleMaps
            );
        }
    });
};
  const _id = item.id.slice(-4) || '34534534j5bh3hj5b345j'

  const handleRemoveUserPress = () => {
    setIsRemoveUserModalVisible(true);
  };

  const handleCancelConfirm = async () => {
    try {
      await handleCancelReservation(selectedCardID);
      setIsRemoveUserModalVisible(false); // Close the modal after cancellation
    } catch (error) {
      // Handle any error from the cancellation function
      setIsRemoveUserModalVisible(false); // Close the modal if an error occurs
    }
  };

  const handleCancelReject = () => {
    // Close the modal when the user rejects
    setIsRemoveUserModalVisible(false);
  };
  useEffect(() => {
    const fetchReservationDate = async () => {
      try {
        // ... (Other code remains unchanged)
        const { item } = route.params; // Destructure item from route.params

        const reservationDate = item.reservationDate ? new Date(item.reservationDate) : null;
        const formattedDate = reservationDate ? formatDate(reservationDate) : 'No reservation date';

        setSelectedDate(formattedDate); // Set the formatted date in state
      } catch (error) {
        console.error('Error fetching reservation date:', error);
      }
    };
    fetchReservationDate();
  }, []);

  // Function to format date as 'Month Day, Year' (e.g., 'June 20, 2023')
  const formatDate = (date) => {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  };

  const handleCancelReservation = async (cardID) => {
    try {
      setIsRemoveUserModalVisible(false)
      setLoadingCancelReservation(true)
      await updateOrder({ id: item?.id, data: { status: orderStatuses.cancelled } }).
        then(res => {
          if (res) {
            Toast.show({
              type: 'success',
              text1: 'Reservation Cancelled',
              text2: 'Your reservation has been cancelled.',
            });
            navigation.goBack()
          }
        })
      setLoadingCancelReservation(false)
    } catch (error) {
      __DEV__ && console.log('handleCancelReservation error: ', error)
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error?.message || 'Message...',
      });
      setLoadingCancelReservation(false)
    }
  };
 

  const handleAddFavDistributor = async () => {
    try {
      const currentUser = auth().currentUser;
      const userId = currentUser ? currentUser.uid : null;
      if (!userId) {
        console.error('User ID not found');
        return;
      }
      const userDocRef = firestore().collection('users').doc(userId);
      const userDoc = await userDocRef.get();
      const userData = userDoc.data();
      let favoritesArray = userData && userData.favorites ? userData.favorites : [];

      // Check if the item exists in favorites
      const isItemInFavorites = favoritesArray.some(
        (fav) =>
          fav.profileImage === distributerDetail.profileImage &&
          fav.organization === distributerDetail.organization &&
          fav.address === distributerDetail.address &&
          fav.reservationDate === selectedDate
      );

      if (isItemInFavorites) {
        // Show a toast indicating that the data is already in favorites
        Toast.show({
          type: 'info',
          text1: 'Info',
          text2: 'This reservation is already in favorites!',
        });
      } else {
        // Add the new reservation data to favorites
        favoritesArray.push({
          profileImage: distributerDetail.profileImage,
          organization: distributerDetail.organization,
          address: distributerDetail.address,
          reservationDate: selectedDate,
          latitude:distributerDetail.latitude,
          longitude:distributerDetail.longitude

        });

        await userDocRef.update({
          favorites: favoritesArray,
        });

        setShowLubemeup(false);
        setShowGetButton(true);

        // Show a success toast after adding to favorites
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Reservation added to favorites!',
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to add reservation. Please try again.',
      });
    }
  };


  const handleRemoveFavorite = async () => {
    try {
      const currentUser = auth().currentUser;
      const userId = currentUser ? currentUser.uid : null;
      if (!userId) {
        console.error('User ID not found');
        return;
      }
      const userDocRef = firestore().collection('users').doc(userId);
      const userDoc = await userDocRef.get();
      const userData = userDoc.data();
      let favoritesArray = userData && userData.favorites ? userData.favorites : [];
      // Check if the item exists in favorites
      const isItemInFavorites = favoritesArray.some(
        (fav) =>
          fav.profileImage === item.profileImage &&
          fav.organization === item.organization &&
          fav.address === item.address &&
          fav.reservationDate === selectedDate
      );
      if (!isItemInFavorites) {
        // Show alert that the item is not in favorites
        alert('This item is not in favorites!');
      } else {
        // Remove the item from favorites
        const filteredFavorites = favoritesArray.filter(
          (fav) =>
            fav.profileImage !== item.profileImage ||
            fav.organization !== item.organization ||
            fav.address !== item.address ||
            fav.reservationDate !== selectedDate
        );
        await userDocRef.update({
          favorites: filteredFavorites,
        });
        setShowLubemeup(true);
        setShowGetButton(false);
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Item removed from favorites!',
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to remove favorite. Please try again.',
      });
    }
  };
  return (
    <SafeAreaView style={appStyles.container}>
      <Header
        imageSource={LeftButton}
        headerText="Reserve Food"
        showImage={true}
        onPress={() => navigation.goBack()}
        customTextMarginLeft={responsiveWidth(26)}
        marginleft={-responsiveWidth(2)}
      />
      <ScrollView>
        <CardView
          customMarginTop={responsiveHeight(1)}
          source={{ uri: distributerDetail?.profileImage }}
          title={distributerDetail?.organization}
          pickupsource={pocket1}
          description={distributerDetail?.address}
          Availabletxt={'Pending'}
          additionalInfo={distributerDetail?.additionalInfo || ''}
          showPickupsView={true}
        />
        <CustomTextInput
          placeholder={selectedDate || 'No reservation date'}
          placeholderMarginLeft={responsiveWidth(3)}
          responsiveMarginTop={-responsiveHeight(0.2)}
          TextinputWidth={responsiveWidth(67)}
          source={calendar}
          inputHeight={responsiveHeight(6)}
          showImage={true}
          placeholderTextColor={colors.color4}
          marginLeft={responsiveWidth(65)}
          source1={checkcircle}
          editable={false}
        />
        <View style={appStyles.qrmainview}>
          <View style={{ height: responsiveHeight(1) }} />
          {_id ?
            <QRCode
              getRef={qrCodeRef}
              value={_id}
              size={scale(150)}
            />
            :
            null
          }

          {/* <Image source={QRcode} style={[appStyles.QRcode, { marginTop: responsiveHeight(1) }]} /> */}
          <TouchableOpacity>
            <Image source={Buttonzoom} style={[appStyles.locationtag, { marginTop: -responsiveHeight(20), marginLeft: responsiveWidth(73) }]} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => saveQRCodeToGallery(qrCodeRef)}
          >
            <Image source={Buttondownload} style={[appStyles.locationtag, { marginTop: -responsiveHeight(13), marginLeft: responsiveWidth(73) }]} />
          </TouchableOpacity>
          <Text style={[appStyles.title, { marginTop: responsiveHeight(1) }]}>
            QR code
          </Text>
        </View>
        <Text style={[appStyles.title, { alignSelf: 'center' }]}>
          ID# {_id}
        </Text>
        {showLubemeup && (
          <TouchableOpacity
            style={[appStyles.Lubemeupcontainer, { marginTop: responsiveHeight(5), width: responsiveWidth(90) }]}
          >
            <Button
              label="Mark as Favorite"
              customImageSource={heart}
              customImageMarginRight={responsiveWidth(2)}
              // onPress={toggleContainer}
              onPress={handleAddFavDistributor}
            />
          </TouchableOpacity>
        )}
        {showGetButton && (
          <GetButton
            label="Remove Favorite"
            customImageSource={greenheart}
            customImageMarginRight={responsiveWidth(2)}
            marginTop={responsiveHeight(5)}
            onPress={handleRemoveFavorite}
          />
        )}
        <GetButton
          label='Get Directions'
          customImageSource={greensend}
          customImageMarginRight={responsiveWidth(2)}
          marginTop={responsiveHeight(1)}
          onPress={()=>handleLinkPress()}
          // onPress={() => navigation.navigate('DrawerNavigation', { screen: 'ReserveFood', params: { selectedTab: 'Favorites' } })}
        />
        <TouchableOpacity onPress={() => {
          //setSelectedCardID(item.cardID); // Set the selected card ID
          setSelectedCardID(item?.id); // Set the selected card ID
          setIsRemoveUserModalVisible(true); // Open the modal
        }}>
          <View style={[appStyles.getdirectioncontainer, {
            backgroundColor: colors.color16,
            marginTop: responsiveHeight(1),
            borderColor: colors.color16
          }]}>
            <Image source={blackX} style={appStyles.Btnarrow} />
            <Text style={[appStyles.Lubemeuptext, { color: colors.color4 }]}>
              Cancel Reservation
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
      <ModalRemoveUser
        isVisible={isRemoveUserModalVisible}
        Logout='Cancel Reservation?'
        onPress={handleCancelConfirm} // Call handleCancelConfirm when user presses 'Yes'
        toggleModal={() => setIsRemoveUserModalVisible(false)}
        onCancelPress={handleCancelReject} // Call handleCancelReject when user presses 'No'
        onRemovePress={() => setIsRemoveUserModalVisible(false)}
        navigation={navigation}
      />
      <Loaders.AbsolutePrimary
      isVisible={loadingCancelReservation}
      />
    </SafeAreaView>
  );
};
export default ReservedPickups;
