import React, { useState } from 'react';
import { View, Text, ScrollView, Share, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { appStyles } from '../../services/utilities/appStyles';
import { colors } from '../../services/utilities/color';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { User, icon8, tag, Donation, Star, Info, share, Logout, HYlogowhite, Splash2 } from '../../services/utilities/assets';
import Line from '../Line';
import Buttonview from '../ButtonView';
import Button2view from '../Button2view';
import { ModalRemoveUser } from '../Modal';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fontSize } from '../../services/utilities/fonts';
const DrawerContent = ({ navigation }) => {
  const [selectedLabel, setSelectedLabel] = useState(null);
  const [isRemoveUserModalVisible, setIsRemoveUserModalVisible] = useState(false);

  const handleRemoveUserPress = () => {
    setIsRemoveUserModalVisible(true);
  };
  const handleLogout = async () => {
    try {
      await auth().signOut();
      await AsyncStorage.removeItem('email');
      await AsyncStorage.removeItem('password');
      navigation.reset({
        index: 0,
        routes: [{ name: 'AuthNavigation' }],
      });
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  const navigateToScreen = (screenName) => {
    navigation.navigate('AppNavigation', { screen: screenName });
  };
  const handleLabelSelect = (label) => {
    setSelectedLabel(selectedLabel === label ? null : label); // Toggle selected label
    navigateToScreen(label);
  };
  const shareAppContent = async () => {
    try {
      const result = await Share.share({
        message: 'Check out this amazing app!',
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Shared successfully');
        } else {
          console.log('Shared successfully');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Share sheet dismissed');
      }
    } catch (error) {
      console.error('Error sharing app:', error.message);
    }
  };
  return (
    <SafeAreaView style={{ flexGrow: 1, backgroundColor: 'white', paddingBottom: responsiveWidth(13), borderTopRightRadius: responsiveWidth(15), borderBottomRightRadius: responsiveWidth(15) }}>
      <ScrollView contentContainerStyle={appStyles.scrollViewContainer} showsVerticalScrollIndicator={false}>
        <Image source={Splash2} style={[appStyles.logo, { marginTop: responsiveHeight(2) }]} />

        <TouchableOpacity onPress={() => handleLabelSelect('Editprofile')}>
          <Buttonview
            source={User}
            text="Edit Profile"
            customMarginRight={responsiveWidth(40)}
            customMarginTop={responsiveHeight(1)}
            customTextColor={selectedLabel === 'Editprofile' ? colors.color4 : colors.color4}
            customFontSize={selectedLabel === 'Editprofile' ? fontSize.h16 : fontSize.h10}
            onPress={() => handleLabelSelect('Editprofile')}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateToScreen('DisasterRelief')}>
          <Buttonview
            source={icon8}
            text="Disaster Relief"
            customMarginRight={responsiveWidth(35)}
            customMarginTop={responsiveHeight(1)}
            customimagestyle={appStyles.imagedisaster}
            customTextColor={selectedLabel === 'DisasterRelief' ? colors.color4 : colors.color4}
            customFontSize={selectedLabel === 'DisasterRelief' ? fontSize.h16 : fontSize.h10}
            onPress={() => handleLabelSelect('DisasterRelief')}
          />
        </TouchableOpacity>
        <Line />
        <TouchableOpacity onPress={() => navigateToScreen('Coupons')}>
          <Buttonview
            source={tag}
            text="Coupons"
            customMarginRight={responsiveWidth(43)}
            customMarginTop={responsiveHeight(1.5)}
            customTextColor={selectedLabel === 'Coupons' ? colors.color4 : colors.color4}
            customFontSize={selectedLabel === 'Coupons' ? fontSize.h16 : fontSize.h10}
            onPress={() => handleLabelSelect('Coupons')}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigateToScreen('NewDonation')}>
          <Buttonview
            source={Donation}
            text="Donations"
            customMarginRight={responsiveWidth(41)}
            customMarginTop={responsiveHeight(1.5)}
            customTextColor={selectedLabel === 'NewDonation' ? colors.color4 : colors.color4}
            customFontSize={selectedLabel === 'NewDonation' ? fontSize.h16 : fontSize.h10}
            MarginRight={-responsiveWidth(7)}
            onPress={() => handleLabelSelect('NewDonation')}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigateToScreen('BecomeaPartner')}>
          <Buttonview
            source={Star}
            text="Become a Partner"
            customMarginRight={responsiveWidth(27)}
            customMarginTop={responsiveHeight(1.5)}
            customTextColor={selectedLabel === 'BecomeaPartner' ? colors.color4 : colors.color4}
            customFontSize={selectedLabel === 'BecomeaPartner' ? fontSize.h16 : fontSize.h10}
            onPress={() => handleLabelSelect('BecomeaPartner')}
          />
        </TouchableOpacity>
        <Line />
        <TouchableOpacity onPress={() => navigateToScreen('PrivicyPolicy')}>
          <Buttonview
            source={Info}
            text="Privacy Policy"
            customMarginRight={responsiveWidth(34)}
            customMarginTop={responsiveHeight(1.5)}
            customTextColor={selectedLabel === 'PrivicyPolicy' ? colors.color4 : colors.color4}
            customFontSize={selectedLabel === 'PrivicyPolicy' ? fontSize.h16 : fontSize.h10}
            onPress={() => handleLabelSelect('PrivicyPolicy')}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateToScreen('Aboutus')}>
          <Buttonview
            source={Info}
            text="About Us"
            customMarginRight={responsiveWidth(41)}
            customMarginTop={responsiveHeight(1.5)}
            customTextColor={selectedLabel === 'Aboutus' ? colors.color4 : colors.color4}
            customFontSize={selectedLabel === 'Aboutus' ? fontSize.h16 : fontSize.h10}
            onPress={() => handleLabelSelect('Aboutus')}
          />
        </TouchableOpacity>
        {/* <TouchableOpacity>
        <Buttonview
          source={share}
          text="Share Our App"
          customMarginRight={responsiveWidth(33)}
          customMarginTop={responsiveHeight(1.5)}
          customTextColor={selectedLabel === 'Share Our App' ? colors.color4 : colors.color4}
          customFontSize={selectedLabel === 'Share Our App' ? fontSize.h16 : fontSize.h10} // Change the font size here
          onPress={() => {
            shareAppContent();
            setSelectedLabel('Share Our App');
          }}
        />
        </TouchableOpacity>


        <Button2view
          text='Follow Us'
          customTextColor={selectedLabel === 'Follow Us' ? colors.color4 : colors.color4}
          customFontSize={selectedLabel === 'Follow Us' ? fontSize.h16 : fontSize.h10}
          customMarginTop={responsiveHeight(1.5)}
        /> */}
        <Line />
        <TouchableOpacity>
          <Buttonview
            source={Logout}
            text="Logout"
            customMarginRight={responsiveWidth(40)}
            customMarginTop={responsiveHeight(1.5)}
            customTextColor={selectedLabel === 'Logout' ? colors.color4 : colors.color4}
            customFontSize={selectedLabel === 'Logout' ? fontSize.h16 : fontSize.h10}
            showtxt={true}
            MarginRight={-responsiveWidth(7)}
            onPress={() => {
              setSelectedLabel('Logout');
              handleRemoveUserPress();
            }}
          />
        </TouchableOpacity>
        <View style={{ height: responsiveHeight(8) }} />
      </ScrollView>
      <ModalRemoveUser
        Logout='Logout?'
        onPress={handleLogout}
        isVisible={isRemoveUserModalVisible}
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

export default DrawerContent;
