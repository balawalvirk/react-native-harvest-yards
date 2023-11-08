import React, { useState, useContext } from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    Image,
} from 'react-native';
import {
    responsiveHeight,
    responsiveWidth,
} from 'react-native-responsive-dimensions';
import { appStyles } from '../../../services/utilities/appStyles';
import Modal from 'react-native-modal';
import { scale } from 'react-native-size-matters';
import Button from '../../Button';
import GetButton from '../../GetButton';
import { QRcode, download } from '../../../services/utilities/assets';
export const QRcodeModal = ({
    isVisible,
    navigation,
   onBackdropPress,
    onPress
}) => {
 
    return (
        <Modal
            isVisible={isVisible}
            onBackdropPress={onBackdropPress} 
            backdropOpacity={0.3}
            animationIn={'slideInUp'}  >
            <View style={[appStyles.QRmodal, { height: scale(480) }]}>

                <Text style={[appStyles.modalText1, { marginTop: responsiveHeight(2) }]}>Food Reserved!</Text>
                <View style={appStyles.qrsecondcode}>
                    <Text style={[appStyles.modalText2, { marginTop: responsiveHeight(2) }]}>Your food has been reserved successfully. Use the QR {'.\n'}code below to collect the food from the Food Center. {'.\n'}You can also access this QR code from the Reserved</Text>
                    <Text style={[appStyles.modalText2, { alignSelf: 'center' }]}>Food tab.</Text>
                </View>
                {/* <Text style={appStyles.modalText2}>successfully.</Text> */}
                <Image source={QRcode} style={appStyles.QRcode} />
                <TouchableOpacity style={[appStyles.Lubemeupcontainer, { marginTop: responsiveHeight(3), width: responsiveWidth(85) }]}>
                    <Button
                        label="Download QR Code"
                        onPress={onPress}
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
