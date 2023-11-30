import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, FlatList, Text, SafeAreaView, Image } from 'react-native';
import { appStyles } from '../../../../services/utilities/appStyles';
import Header from '../../../../components/Headers';
import Button from '../../../../components/Button';
import Toast from 'react-native-toast-message';
import { Buttondownload, LeftButton, QRcode, blackX, calendar, checkcircle, greenheart, greensend, heart, Buttonzoom, locationtag, greenshoppingbag } from '../../../../services/utilities/assets';
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
  const [selectedDate, setSelectedDate] = useState('');
  const [showLubemeup, setShowLubemeup] = useState(true);
  const [showGetButton, setShowGetButton] = useState(false);
  const [isRemoveUserModalVisible, setIsRemoveUserModalVisible] = useState(false);
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
  const handleRemoveUserPress = () => {
    setIsRemoveUserModalVisible(true);
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
          pickupsource={item.pickupsource}
          description={item.address}
          Availabletxt={item.Availabletxt}
          additionalInfo={item.additionalInfo}
          showPickupsView={true}
          onPress={() => handleNavigate(item)}
        />
        {/* <DatePickerInput
                label='Reservation Date'
                    inputWidth={responsiveWidth(92)}
                    responsiveMarginTop={3}
                    source1={calendar}
                    customWidth={responsiveWidth(92)}
                    selectedDate={selectedDate}
                    showImage={true}
                    onDateChange={handleDateChange}
                /> */}
        <CustomTextInput
          placeholder="June 20, 2023"
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
        <TouchableOpacity onPress={handleRemoveUserPress}>
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
        onPress={() => navigation.navigate('ReserveFood')}
        toggleModal={() => setIsRemoveUserModalVisible(false)}
        onCancelPress={() => {
          setIsRemoveUserModalVisible(false);
        }}
        onRemovePress={() => setIsRemoveUserModalVisible(false)}
        navigation={navigation}
      />
    </SafeAreaView>
  );
};
export default ReservedPickups;
