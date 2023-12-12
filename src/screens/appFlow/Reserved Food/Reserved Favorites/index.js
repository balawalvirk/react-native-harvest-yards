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
  

    useEffect(() => {
        const fetchReservationDate = async () => {
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

                console.log('Reserved Date from Firestore:', reservedFood.length > 0 ? reservedFood[0].reservationDate : 'No reservation date');
                const firestoreTimestampSeconds = 1702035600; // Replace this with the retrieved timestamp from Firestore

                // Convert Firestore Timestamp to a JavaScript Date object
                const date = new Date(firestoreTimestampSeconds * 1000);

                // Define month names
                const monthNames = [
                    'January', 'February', 'March', 'April', 'May', 'June',
                    'July', 'August', 'September', 'October', 'November', 'December'
                ];

                // Extract date components
                const month = monthNames[date.getMonth()];
                const day = date.getDate();
                const year = date.getFullYear();

                // Format the date to "Month Day, Year" format
                const formattedDate = `${month} ${day}, ${year}`;

                console.log('Formatted Date:', formattedDate); // Output: Formatted Date: June 20, 2023

                setSelectedDate(formattedDate); // Set the formatted date to selectedDate
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
            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: 'Reservation added to favorites!',
            });
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
            const indexToRemove = favoritesArray.findIndex(
                (item) =>
                    item.profileImage === item.profileImage &&
                    item.organization === item.organization &&
                    item.address === item.address &&
                    item.reservationDate === selectedDate
            );
            if (indexToRemove !== -1) {
                favoritesArray.splice(indexToRemove, 1);
                await userDocRef.update({
                    favorites: favoritesArray,
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
                    pickupsource={greenheart}
                    description={item.address}
                    Availabletxt={'favorite'}
                    additionalInfo={item.additionalInfo}
                    showPickupsView={true}
                    // onPress={() => handleCancelReservation(item.cardID)}
                />

                <CustomTextInput
                    placeholder={selectedDate ? selectedDate.toString() : 'No reservation date'} // Check if selectedDate exists before conversion
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
                />
                <GetButton
                    label='Reserve Food'
                    customImageSource={greenshoppingbag}
                    customImageMarginRight={responsiveWidth(2)}
                    marginTop={responsiveHeight(1)}
                    onPress={()=>navigation.navigate('DrawerNavigation',{screen:'ReserveFood'})}
                />
            </ScrollView>
        </SafeAreaView>
    );
};
export default Reservedfavorites;
