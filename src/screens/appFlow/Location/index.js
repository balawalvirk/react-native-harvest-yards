import React, { useState } from 'react';
import { View, Text, Button, Image, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { appStyles } from '../../../services/utilities/appStyles';
import Header from '../../../components/Headers';
import CustomTextInput from '../../../components/Textinputs';
import { HelpCallout, Image10, Image11, Image12, Image13, Image14, Image2, Image5, Image6, Image7, Image8, LeftButton, MenueButton, blackX, checkcircle, checksquare, copy, edit, locationtag, mappin, plus, redtag, search, tag, x } from '../../../services/utilities/assets';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { Clipboard } from '@react-native-clipboard/clipboard';
import CustomLocationInput from '../../../components/Textinputs/Locationinput';
import CardView from '../../../components/CardView';
import { FlatList } from 'react-native-gesture-handler';
import CouponsView from '../../../components/CouponsView';
import { colors } from '../../../services/utilities/color';
import { HelpCalloutModal } from '../../../components/Modal/Tip Modal';
import { scale } from 'react-native-size-matters';

const Location = ({ navigation }) => {
  const [isHelpCalloutModalVisible, setHelpCalloutModalVisible] = useState(false);

  return (
    <SafeAreaView style={appStyles.container}>
      <Header
        imageSource={LeftButton}
        headerText="Location"
        showImage={true}
        onPress={() => navigation.goBack()}
        customTextMarginLeft={responsiveWidth(30)}
        marginleft={-responsiveWidth(2)}
      />

      <ScrollView>
        <TouchableOpacity onPress={() => navigation.navigate('LocationRadious')}>
          <View style={[appStyles.getdirectioncontainer, {
            backgroundColor: colors.color16,
            marginTop: responsiveHeight(2),
            borderColor: colors.color16
          }]}>
            <Image source={plus} style={appStyles.Btnarrow} />
            <Text style={[appStyles.Lubemeuptext, { color: colors.color4 }]}>
              Add New Location
            </Text>
          </View>
        </TouchableOpacity>
        <Text style={[appStyles.infotxt, { marginTop: responsiveHeight(5) }]}>Selected</Text>

        <TouchableOpacity onPress={() =>navigation.navigate('FindFood')}>
          <CouponsView
            customMarginTop={responsiveHeight(2)}
            source={checkcircle}
            source1={edit}
            title='Home'
            description='432 Blues Boulevard, Memphis, USA'
            imagemarginleft={responsiveWidth(19)}
            backgroundcolor={colors.color36}
          />
        </TouchableOpacity>
        <Text style={[appStyles.infotxt, { marginTop: responsiveHeight(5) }]}>Saved</Text>
        <TouchableOpacity onPress={() =>navigation.navigate('FindFood')}>
          <CouponsView
            customMarginTop={responsiveHeight(2)}
            source={mappin}
            source1={edit}
            title='University'
            description='1234 Melody Lane, Nashville, USA'
            imagemarginleft={responsiveWidth(22)}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() =>navigation.navigate('FindFood')}>
          <CouponsView
            customMarginTop={responsiveHeight(1)}
            source={mappin}
            source1={edit}
            title='Office'
            description='890 Jazz Street, Chicago, USA'
            imagemarginleft={responsiveWidth(27)}
          />
        </TouchableOpacity>

      </ScrollView>
      <TouchableOpacity  onPress={() => setHelpCalloutModalVisible(true)}>
      <Image source={HelpCallout} style={[appStyles.locationtag,{width:scale(60),height:scale(60)}]} />
      </TouchableOpacity>
      <HelpCalloutModal
        isVisible={isHelpCalloutModalVisible}
        onBackdropPress={() => setHelpCalloutModalVisible(false)}
        toggleModal={() => setHelpCalloutModalVisible(false)}
      bottom={responsiveHeight(4.7)}
      Title='Location Help'
      helpcallouttxt='The default location is your home address.
      You can use your current location to see the closest places to get food. 
      Or, enter an address where you would like to see places nearby to obtain food.'
      />
    </SafeAreaView>
  );
};

export default Location;
