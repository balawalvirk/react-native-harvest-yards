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
const Reservedfavorites = ({ route, navigation }) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [showLubemeup, setShowLubemeup] = useState(false);
    const [showGetButton, setShowGetButton] = useState(true);
    const [selectedCardID, setSelectedCardID] = useState(null);
    const [isRemoveUserModalVisible, setIsRemoveUserModalVisible] = useState(false);
    const [reservedFoodData, setReservedFoodData] = useState([]);
    const [organizationId, setOrganizationId] = useState(null); // New state for organizationId
    const { userId } = route.params;
    useEffect(() => {
        const fetchReservationDate = async () => {
            try {
                const currentUser = auth().currentUser;
                const userId = currentUser ? currentUser.uid : null;
                if (!userId) {
                    console.error('User is not authenticated');
                    return;
                }

                const organizationName = item.organization;

                const querySnapshot = await firestore()
                    .collection('distributors')
                    .where('organization', '==', organizationName)
                    .get();
                let organizationId = null;
                if (!querySnapshot.empty) {
                    querySnapshot.forEach((doc) => {
                        organizationId = doc.id;
                    });
                }
                console.log('Organization ID:', organizationId);

                setSelectedCardID(organizationId);

                const userDocRef = firestore().collection('users').doc(userId);
                const userDoc = await userDocRef.get();
                const userData = userDoc.data();

                if (userData && userData.reservationDate) {
                  // Assume userData.reservationDate is a Firestore timestamp object
                  const seconds = userData.reservationDate.seconds; // Get seconds from Firestore timestamp
                  const milliseconds = seconds * 1000; // Convert seconds to milliseconds
                  const date = new Date(milliseconds); // Create a JavaScript date object
  
                  const monthNames = [
                      'January', 'February', 'March', 'April', 'May', 'June',
                      'July', 'August', 'September', 'October', 'November', 'December'
                  ];
  
                  const month = monthNames[date.getMonth()];
                  const day = date.getDate();
                  const year = date.getFullYear();
  
                  const formattedDate = `${month} ${day}, ${year}`;
                  setSelectedDate(formattedDate); // Set the formatted date to selectedDate state
  
                  console.log('Retrieved Reservation Date:', formattedDate); // Add console log to show the retrieved date
              } else {
                  console.log('No reservation date found');
                  setSelectedDate(null); // If no reservation date is found in Firestore
              }
          } catch (error) {
              console.error('Error fetching reservation date:', error);
          }
      };
  
      fetchReservationDate();
  }, []);
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
  
        const itemToRemove = {
          profileImage: item.profileImage,
          organization: item.organization,
          address: item.address,
          reservationDate: selectedDate,
        };
  
        const updatedFavorites = favoritesArray.filter(
          (fav) =>
            fav.profileImage !== itemToRemove.profileImage ||
            fav.organization !== itemToRemove.organization ||
            fav.address !== itemToRemove.address
        );
  
        await userDocRef.update({
          favorites: updatedFavorites,
        });
  
        setShowLubemeup(true);
        setShowGetButton(false);
  
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Item removed from favorites!',
        });
      } catch (error) {
        console.error('Error removing favorite:', error);
  
        let errorMessage = 'Failed to remove favorite. Please try again.';
        if (error.code === 'permission-denied') {
          errorMessage = 'Permission denied. You might not have access to perform this action.';
        } else if (error.code === 'not-found') {
          errorMessage = 'Document not found. The specified document does not exist.';
        }
  
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: errorMessage,
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
                    pickupsource={greenheart}
                    description={item.address}
                    Availabletxt={'favorite'}
                    additionalInfo={item.additionalInfo}
                    showPickupsView={true}
                />

                <CustomTextInput
                    // placeholder={selectedDate ? selectedDate.toString() : 'No reservation date'} // Check if selectedDate exists before conversion
                    placeholderMarginLeft={responsiveWidth(3)}
                    responsiveMarginTop={-responsiveHeight(0.2)}
                    TextinputWidth={responsiveWidth(67)}
                    source={calendar}
                    inputHeight={responsiveHeight(6)}
                    showImage={true}
                    value={route.params.reservationDate ? route.params.reservationDate.toString() : 'No reservation date'}
                    placeholderTextColor={colors.color4}
                    marginLeft={responsiveWidth(65)}
                    source1={checkcircle}
                    editable={false}
                />


                {showGetButton && (
                    <GetButton
                        label="Remove Favorite"
                        customImageSource={greenheart}
                        customImageMarginRight={responsiveWidth(2)}
                        marginTop={responsiveHeight(8)}
                        onPress={handleRemoveFavorite}
                    />
                )}
                {showLubemeup && (
                    <TouchableOpacity
                        style={[appStyles.Lubemeupcontainer, { marginTop: responsiveHeight(8), width: responsiveWidth(90) }]}
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
                <GetButton
                    label='Get Directions'
                    customImageSource={greensend}
                    customImageMarginRight={responsiveWidth(2)}
                    marginTop={responsiveHeight(1)}
                    onPress={() => navigation.navigate('DrawerNavigation', { screen: 'ReserveFood', params: { selectedTab: 'Favorites' } })}
                />
               <GetButton
                    label='Reserve Food'
                    customImageSource={greenshoppingbag}
                    customImageMarginRight={responsiveWidth(2)}
                    marginTop={responsiveHeight(1)}
                    onPress={() => {
                        navigation.navigate('AppNavigation', {
                            screen: 'Reservedfood1',
                            params: {
                                item: item,
                                organizationId: selectedCardID, // Pass the specific organizationId here
                           userId:userId
                            }
                        });
                        
                    }}
                />
            </ScrollView>
        </SafeAreaView>
    );
};
export default Reservedfavorites;


