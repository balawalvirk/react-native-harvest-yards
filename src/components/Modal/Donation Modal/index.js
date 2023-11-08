import React, { useState, useContext } from 'react';
import {
  View,
  Text,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { appStyles } from '../../../services/utilities/appStyles';
import Modal from 'react-native-modal';
import { fontFamily } from '../../../services/utilities/fonts';
import { colors } from '../../../services/utilities/color';
export const DonationModal = ({
  isVisible,
  toggleModal,
  onBackdropPress,
  Title,
  Title2,
}) => {
  return (
    <Modal
      onBackdropPress={onBackdropPress}
      animationType='slide'
      transparent={true}
      backdropOpacity={0.3}
      visible={isVisible}>
      <View style={[appStyles.downmodal,{height:responsiveHeight(17),width:responsiveWidth(110),marginLeft:-responsiveWidth(12),justifyContent:'center',marginTop:responsiveHeight(4)}]}>
        <Text style={appStyles.DonationModal}>{Title}</Text>
        <Text style={appStyles.DonationModal}>{Title2}</Text>
      </View>
    </Modal>
  );
};
