import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, Text, SafeAreaView, Image } from 'react-native';
import { appStyles } from '../../../../services/utilities/appStyles';
import Header from '../../../../components/Headers';
import Button from '../../../../components/Button';
import DatePickerInput from '../../../../components/DatePickerInput';
import { Buttondownload, LeftButton, QRcode, blackX, calendar, checkcircle, greenheart, greensend, heart, Buttonzoom, locationtag, greenshoppingbag } from '../../../../services/utilities/assets';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Calenderinput from '../../../../components/Textinputs/Calenderinput';
import CardView from '../../../../components/CardView';
import CustomTextInput from '../../../../components/Textinputs';
import { colors } from '../../../../services/utilities/color';
import GetButton from '../../../../components/GetButton';
import { ModalRemoveUser } from '../../../../components/Modal';

const ReservedPickups = ({ route, navigation }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [showLubemeup, setShowLubemeup] = useState(true);
  const [showGetButton, setShowGetButton] = useState(false);
  const [showQRMainView, setShowQRMainView] = useState(true);
  const [isRemoveUserModalVisible, setIsRemoveUserModalVisible] = useState(false);

  const handleRemoveUserPress = () => {
    setIsRemoveUserModalVisible(true);
  };
  const toggleContainer = () => {
    setShowLubemeup(!showLubemeup);
    setShowGetButton(!showGetButton);
    setShowQRMainView(!showQRMainView);
  };

  const toggleQRMainView = () => {
    setShowQRMainView(!showQRMainView);
  };
  const handleDateChange = date => {
    setSelectedDate(date);
  };
  const { item } = route.params;
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
          source={item.source}
          title={item.title}
          showPickupsView={true}
          pickupsource={item.pickupsource}
          description={item.description}
          Availabletxt={item.Availabletxt}
          additionalInfo={item.additionalInfo}
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
          <Image source={QRcode} style={[appStyles.QRcode,{marginTop:responsiveHeight(1)}]}/>
         <TouchableOpacity>
         <Image source={Buttonzoom} style={[appStyles.locationtag,{marginTop:-responsiveHeight(20),marginLeft:responsiveWidth(73)}]}/>
          </TouchableOpacity> 
          <TouchableOpacity>
          <Image source={Buttondownload} style={[appStyles.locationtag,{marginTop:-responsiveHeight(13),marginLeft:responsiveWidth(73)}]}/>
            </TouchableOpacity>
          <Text style={[appStyles.title,{marginTop:responsiveHeight(1)}]}>
            QR code
          </Text>
         
        </View>
        <Text style={[appStyles.title,{alignSelf:'center'}]}>
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
            onPress={toggleContainer}
          />
        </TouchableOpacity>
        )}
         {showGetButton && (
        <GetButton
          label="Remove Favorite"
          customImageSource={greenheart}
          customImageMarginRight={responsiveWidth(2)}
          marginTop={responsiveHeight(5)}
          onPress={toggleContainer}
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
        onPress={() =>navigation.navigate('ReserveFood')}
        
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
