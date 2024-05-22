import React, { useRef } from 'react';
import { View, TouchableOpacity, Text, Alert } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import RNFetchBlob from 'rn-fetch-blob';
import { appStyles } from '../../../services/utilities/appStyles';
import Modal from 'react-native-modal';
import { scale } from 'react-native-size-matters';
import Button from '../../Button';
import QRCode from 'react-native-qrcode-svg';
import RNFS from 'react-native-fs';
import { download } from '../../../services/utilities/assets';
import GetButton from '../../GetButton';
import { requestStoragePermission } from '../../../services/utilities/permission'
import { useStorage } from '../../../services';
const QRcodeModal = ({ isVisible, navigation, onBackdropPress, qrCodeValue, _id }) => {
  const qrCodeRef = useRef(null)
  const { saveQRCodeToGallery } = useStorage()
  const imageUri = 'nxY6upyayHZXDVRMsiAysdy6ZUE2_Web Development_Sun Dec 10 2023 20:19:00 GMT+0500';

  const saveImageToGallery = async (imageUri) => {
    console.log('Image URI:', imageUri);

    try {
      // Check and request permission if needed (Android)
      if (Platform.OS === 'android') {
        const granted = await requestStoragePermission();
        if (!granted) {
          Alert.alert('Permission Denied', 'Storage permission required.');
          return;
        }
      }

      // Other platform-specific configurations
      const { config, fs } = RNFetchBlob;
      const isIOS = Platform.OS === 'ios';
      const imageLocation = isIOS ? imageUri : `file://${imageUri}`;

      // Fetch the image
      const response = await config({
        fileCache: true,
        appendExt: 'jpg',
      }).fetch('GET', imageLocation);

      // Determine the destination path for saving the image
      const imagePath = isIOS ? fs.dirs.DocumentDir : fs.dirs.DCIMDir;
      const imageName = `IMG_${new Date().getTime()}.jpg`;

      // Save the image to the gallery
      await fs.cp(response.path(), `${imagePath}/${imageName}`);
      await fs.scanFile([{ path: `${imagePath}/${imageName}`, mime: 'image/jpeg' }]);

      console.log('Image saved to gallery successfully!');
      Alert.alert('Success', 'Image saved to gallery!');
    } catch (error) {
      console.error('Error saving image to gallery:', error);
      Alert.alert('Error', 'Failed to save image to gallery.');
    }
  };

  return (
    <Modal isVisible={isVisible} onBackdropPress={onBackdropPress} backdropOpacity={0.3} animationIn={'slideInUp'}>
      <View style={[appStyles.QRmodal, { height: scale(480) }]}>
        <Text style={[appStyles.modalText1, { marginTop: responsiveHeight(2) }]}>Food Reserved!</Text>
        <View style={appStyles.qrsecondcode}>
          <Text style={[appStyles.modalText2, { marginTop: responsiveHeight(2) }]}>
            Your food has been reserved successfully.Use the QR{'\n'}code below to collect the food from the Food Center.
            {'\n'}You can also access this QR code from the Reserved
          </Text>
          <Text style={[appStyles.modalText2, { alignSelf: 'center' }]}>Food tab.</Text>
        </View>
        <View style={{ alignSelf: 'center', marginTop: responsiveHeight(3) }}>
          <QRCode
            value={qrCodeValue}
            size={150}
            getRef={qrCodeRef}
          />
        </View>
        
        <Text style={[appStyles.title, { alignSelf: 'center' ,marginTop: responsiveHeight(1)}]}>
          ID# {_id.slice(-4)}
        </Text>
        <TouchableOpacity
          style={[appStyles.Lubemeupcontainer, { marginTop: responsiveHeight(2), width: responsiveWidth(85) }]}
          onPress={() => saveImageToGallery(qrCodeValue)}>
          <Button
            label="Download QR Code"
            //onPress={() => saveImageToGallery(qrCodeValue)}
            onPress={()=>saveQRCodeToGallery(qrCodeRef)}
            customImageSource={download}
            customImageMarginRight={responsiveWidth(3)}

          />
        </TouchableOpacity>
        <View style={appStyles.getview}>
          <GetButton
            label='Find Food'
            customwidth={responsiveWidth(43)}
            marginleft={responsiveWidth(2)}
            marginTop={responsiveHeight(1)}
            onPress={() => navigation.navigate('FindFood')}
          />
          <GetButton
            label='Reserved Food'
            customwidth={responsiveWidth(40)}
            marginleft={responsiveWidth(2)}
            customImageMarginRight={responsiveWidth(2)}
            marginTop={responsiveHeight(1)}
            onPress={() => navigation.navigate('ReserveFood')}
          />
        </View>

      </View>
    </Modal>
  );
};
export default QRcodeModal;

