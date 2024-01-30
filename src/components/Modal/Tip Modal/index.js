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
import { fontSize } from '../../../services/utilities/fonts';
export const HelpCalloutModal = ({
  isVisible,
  toggleModal,
  onBackdropPress,
  onClose,
  height,
  helpcallouttxt,
  Title,
  bottom =responsiveHeight(18)
}) => {
  return (
    <Modal
      onBackdropPress={onBackdropPress}
      animationType='fade'
      transparent={true}
      visible={isVisible}>
      <View style={[appStyles.helpmodal,{bottom:bottom,height:height}]}>
      <Text style={[appStyles.modaltitle,{fontSize:fontSize.h10}]}>{Title}</Text>
        <Text style={[appStyles.modalText2, { marginTop: responsiveHeight(0.5),fontSize:fontSize.h10  }]}>
        {helpcallouttxt}
         </Text>
      </View>
    </Modal>
  );
};
