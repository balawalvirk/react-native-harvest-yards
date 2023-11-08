import React, {useState, useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  TouchableWithoutFeedback,
  Modal,
  StyleSheet,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {appStyles} from '../../services/utilities/appStyles';
import {
  Delete,
  Error,
  Refresh,
  User,
  Userx,
  modaltick,
} from '../../services/utilities/assets';
// import Modal from 'react-native-modal';
import Buttonview from '../ButtonView';
import Button from '../Button';
import {scale} from 'react-native-size-matters';
import {colors} from '../../services/utilities/color';
import AuthNavigation from '../../navigation/authNavigation';

export const ModalChatOption = ({
  isVisible,
  toggleModal,
  onUserPress,
  onDeletePress,
  onRemoveUserPress,
  navigation,
  onResetPress,
}) => {
  return (
    <ModelView
      visible={isVisible}
      onClose={toggleModal}
      animationType={'slide'}>
      <View style={appStyles.chatmodal}>
        <Buttonview
          source={User}
          text="Companion Profile"
          customMarginRight={responsiveWidth(49)}
          customMarginTop={responsiveHeight(1.5)}
          customTextColor={colors.color4}
          onPress={onUserPress}
        />
        <Buttonview
          source={Delete}
          text="Delete Conversation"
          customMarginRight={responsiveWidth(46)}
          customMarginTop={responsiveHeight(1.5)}
          onPress={onDeletePress}
          customTextColor={colors.color4}
        />

        <Buttonview
          source={Userx}
          text="Remove User"
          customMarginRight={responsiveWidth(55)}
          customMarginTop={responsiveHeight(1.5)}
          customTextColor={colors.color4}
          onPress={onRemoveUserPress}
        />

        <Buttonview
          source={Refresh}
          text="Conversation Reset"
          onPress={onResetPress}
          customMarginRight={responsiveWidth(46)}
          customMarginTop={responsiveHeight(1.5)}
          customTextColor={colors.color4}
        />
      </View>
    </ModelView>
  );
};
export const ModalRemoveUser = ({
  isVisible,
  toggleModal,
  onRemovePress,
  onPress,
  Logout,
  navigation,
  onCancelPress,
}) => {
  return (
    <ModelView
      visible={isVisible}
      onClose={toggleModal}
      animationType={'slide'}>
      <View style={appStyles.downmodal}>
      
        <Text style={appStyles.modalText1}>{Logout}</Text>
    
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={appStyles.nocontainer}
            onPress={onCancelPress}>
            <Text style={appStyles.notxt}>No</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={appStyles.yescontainer}
            onPress={onPress}>
            <Text style={appStyles.yestxt}>Yes</Text>
          </TouchableOpacity>
           
          
        </View>
      </View>
    </ModelView>
  );
};
export const SentModal = ({
  isVisible,
  toggleModal,
  successfully,
  passowrd,
  LinkSent,
  againtxt
}) => {
  return (
    <ModelView
      visible={isVisible}
      onClose={toggleModal}
      animationType={'slide'}>
      <View style={[appStyles.downmodal,{height:scale(240)}]}>
        <Image source={modaltick} style={appStyles.modaltick}/>
        <Text style={appStyles.modalText1}>{LinkSent}</Text>
        <Text style={[appStyles.modalText2,{marginTop:responsiveHeight(2)}]}>{passowrd}</Text>
        <Text style={appStyles.modalText2}>{successfully}</Text>
        <Text style={[appStyles.modalText1,{marginTop:-responsiveHeight(4)}]}>{againtxt}</Text>
      </View>
    </ModelView>
  );
};
export const ModelView = ({visible, animationType, onClose, children}) => {
  return (
    <Modal
      onRequestClose={onClose}
      onTouchEnd={onClose}
      animationType={animationType ? animationType : 'slide'}
      transparent={true}
      visible={visible}>
      <TouchableOpacity
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
        }}
        activeOpacity={1}
        onPress={onClose}>
        <TouchableWithoutFeedback>
          <View style={styles.modalView}>{children}</View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: colors.color7,
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    width: responsiveWidth(100),
    // paddingVertical: responsiveHeight(1),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
});
