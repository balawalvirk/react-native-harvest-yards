import React, { useState, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity, FlatList, Text, SafeAreaView, Image } from 'react-native';
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
const ReservedPickups = ({ route, navigation }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showLubemeup, setShowLubemeup] = useState(true);
  const [showGetButton, setShowGetButton] = useState(false);
  const [selectedCardID, setSelectedCardID] = useState(null);
  const [isRemoveUserModalVisible, setIsRemoveUserModalVisible] = useState(false);
  const [reservedFoodData, setReservedFoodData] = useState([]);
  
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
    console.log('Route Params:', route.params);
    const { selectedCardID } = route.params;
    console.log('Selected Card ID:', selectedCardID);
  
    const logReservationDateForSelectedCard = async () => {
      try {
        const currentUser = auth().currentUser;
        const userId = currentUser ? currentUser.uid : null;
        if (!userId) {
          console.error('User is not authenticated');
          return;
        }
  
        const userDocRef = firestore().collection('users').doc(userId);
        const userDoc = await userDocRef.get();
        const userData = userDoc.data();
        const reservedFood = userData && userData.reservedFood ? userData.reservedFood : [];
  
        const selectedCard = reservedFood.find(reservation => reservation.cardID === selectedCardID);
  
        if (selectedCard) {
          const { reservationDate } = selectedCard;
          if (reservationDate) {
            const firestoreTimestamp = reservationDate;
            const { seconds, nanoseconds } = firestoreTimestamp;
  
            if (!isNaN(seconds) && !isNaN(nanoseconds)) {
              const date = new Date(seconds * 1000 + nanoseconds / 1000000);
              const formattedDate = `${date.toLocaleString('default', { month: 'long' })} ${date.getDate()}, ${date.getFullYear()}`;
              setSelectedDate(formattedDate); 
            } else {
              console.error('Invalid timestamp for selected card');
            }
          } else {
            console.error('Reservation date not found for selected card');
          }
        } else {
          console.error('Selected card not found in reserved food');
        }
      } catch (error) {
        console.error('Error fetching reservation date:', error);
      }
    };
  
    logReservationDateForSelectedCard();
  }, [route.params]);
  const handleCancelReservation = async (cardID) => {
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
      let reservedFoodArray = userData && userData.reservedFood ? userData.reservedFood : [];

      const indexToRemove = reservedFoodArray.findIndex((item) => item.cardID === cardID);

      if (indexToRemove !== -1) {
        reservedFoodArray.splice(indexToRemove, 1);
        await userDocRef.update({
          reservedFood: reservedFoodArray,
        });

        // Fetch updated reserved food data after successful cancellation
        const updatedUserDoc = await userDocRef.get();
        const updatedUserData = updatedUserDoc.data();

        if (updatedUserData && updatedUserData.reservedFood) {
          // Set the updated reserved food data fetched from Firestore to state
          setReservedFoodData(updatedUserData.reservedFood);
        }

        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Reservation canceled and removed!',
        });

        navigation.navigate('DrawerNavigation', { screen: 'ReserveFood' });
      } else {
        console.error('Item not found in reserved food array');
      }
    } catch (error) {
      console.error('Error removing reservation:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to cancel reservation. Please try again.',
      });
    }
  };
  const handleReservation = async () => {
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
          profileImage: item.profileImage,
          organization: item.organization,
          address: item.address,
          reservationDate: selectedDate,
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
  
  const { item } = route.params;
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
          source={{ uri: item.profileImage }}
          title={item.organization}
          pickupsource={pocket1}
          description={item.address}
          Availabletxt={'Pending'}
          additionalInfo={item.additionalInfo}
          showPickupsView={true}
          onPress={() => handleCancelReservation(item.cardID)}
        />
        {selectedDate && (
        <CustomTextInput
          placeholder={selectedDate.toString()}
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
      )}
        <View style={appStyles.qrmainview}>
          <Image source={QRcode} style={[appStyles.QRcode, { marginTop: responsiveHeight(1) }]} />
          <TouchableOpacity>
            <Image source={Buttonzoom} style={[appStyles.locationtag, { marginTop: -responsiveHeight(20), marginLeft: responsiveWidth(73) }]} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={Buttondownload} style={[appStyles.locationtag, { marginTop: -responsiveHeight(13), marginLeft: responsiveWidth(73) }]} />
          </TouchableOpacity>
          <Text style={[appStyles.title, { marginTop: responsiveHeight(1) }]}>
            QR code
          </Text>
        </View>
        <Text style={[appStyles.title, { alignSelf: 'center' }]}>
          ID# 3737379847547
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
              onPress={handleReservation}
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
        />
     <TouchableOpacity onPress={() => {
        setSelectedCardID(item.cardID); // Set the selected card ID
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
    </SafeAreaView>
  );
};
export default ReservedPickups;

