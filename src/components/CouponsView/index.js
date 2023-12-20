import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { colors } from '../../services/utilities/color';
import { appStyles } from '../../services/utilities/appStyles';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { scale } from 'react-native-size-matters';
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-toast-message'; // Import Toast from react-native-toast-message

const CouponsView = ({
  title,
  description,
  backgroundcolor = colors.color7,
  source1,
  customdescriptionstyle,
  imagemarginleft,
  expirecolor,
  coupontxt1,
  source,
  customstyletitle,
  customstyle,
  customMarginTop,
  copyToClipboardCondition, // Condition to copy text and show toast message
  messageType, // New prop to differentiate toast messages
}) => {
  const handleCopyToClipboard = () => {
    if (copyToClipboardCondition) {
      const textToCopy = `${title}\n${description}`;
      Clipboard.setString(textToCopy);
      showToast();
    }
  };

  const showToast = () => {
    let text1, text2;

    if (messageType === 'coupon') {
      text1 = 'Coupon Copied';
      text2 = 'Copied to Clipboard!';
    } else if (messageType === 'location') {
      text1 = 'Location Copied';
      text2 = 'Copied to Clipboard!';
    } else {
      text1 = 'Text Copied';
      text2 = 'Copied to Clipboard!';
    }
    Toast.show({
      type: 'success',
      text1,
      text2,
      visibilityTime: 2000,
    });
  };

  return (
    <View style={[appStyles.cardContainer, customstyle, { marginTop: customMarginTop, height: scale(72), backgroundColor: backgroundcolor }]}>
      <Image source={source} style={appStyles.tagimage} />
      <View style={{ marginLeft: responsiveWidth(3), width: responsiveWidth(65), height: responsiveHeight(8) }}>
        <Text style={[appStyles.title, customstyletitle, { marginLeft: responsiveWidth(2), color: coupontxt1 }]}>{title}</Text>
        <Text style={[appStyles.description, customdescriptionstyle, { marginLeft: responsiveWidth(2), color: expirecolor }]}>{description}</Text>
      </View>
      <TouchableOpacity onPress={handleCopyToClipboard}>
        <View style={{ width: responsiveWidth(9), height: responsiveHeight(6) }}>
          <Image source={source1} style={[appStyles.copyimage, { marginLeft: imagemarginleft }]} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CouponsView;
