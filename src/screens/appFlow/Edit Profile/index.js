import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import Header from '../../../components/Headers';
import Button from '../../../components/Button';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {
  LeftButton,
  lock,
} from '../../../services/utilities/assets';
import { appStyles } from '../../../services/utilities/appStyles';
import CustomTextInput from '../../../components/Textinputs';
import { SafeAreaView } from 'react-native-safe-area-context';
import SelectOptionPicker from '../../../components/selectOptionPicker';
import CustomCheckbox from '../../../components/Checkbox';
import CustomSwitch from '../../../components/Switch';
import { colors } from '../../../services/utilities/color';
export default function Index({ navigation }) {
  const [selectedDate, setSelectedDate] = useState('');
  const [showModel, setShowModel] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const GenderData = [{ label: 'Male' }, { label: 'Female' }, { label: 'Other' }];
  const [switchValue, setSwitchValue] = useState(false);

  const handleToggle = (value) => {
    // Handle the toggle action here
    setSwitchValue(value);
  };

  const viewModel = () => {
    setShowModel(!showModel);
  };
  const handleDateChange = date => {
    setSelectedDate(date);
  };

  return (
    <SafeAreaView style={appStyles.container}>
      <Header
        imageSource={LeftButton}
        headerText="Edit Profile"
        showImage={true}
        onPress={() => navigation.goBack()}
        customTextMarginLeft={responsiveWidth(25)}
      />
      <ScrollView
        contentContainerStyle={appStyles.scrollViewContainer}
        showsVerticalScrollIndicator={false}>
        <Text style={appStyles.infotxt}>Basic Info</Text>
        <CustomTextInput
          label="First Name"
          keyboardType="default"
          placeholder="John"
          responsiveMarginTop={3}
        />
         <CustomTextInput
          label="Last Name"
          keyboardType="default"
          placeholder="Doe"
          responsiveMarginTop={7}
        />
        <CustomTextInput
          label="Username"
          keyboardType="default"
          placeholder="example123"
          responsiveMarginTop={7}
        />
        <CustomTextInput
          label="Email Address"
          keyboardType="default"
          placeholder="example@email.com"
          responsiveMarginTop={7}

        />
        <CustomTextInput
          label="Phone Number"
          keyboardType="default"
          placeholder="Enter a number"
          responsiveMarginTop={7}
        />
        <CustomTextInput
          label="Address"
          keyboardType="default"
          placeholder="Enter Address"
          responsiveMarginTop={7}
        />
        <Text style={[appStyles.infotxt, { marginTop: responsiveHeight(7) }]}>Secure Your Account</Text>

        <CustomTextInput
          label="Password"
          keyboardType="default"
          placeholder="Minimum 8 characters"
          placeholderMarginLeft={responsiveWidth(3)}
          responsiveMarginTop={3}
          TextinputWidth={responsiveWidth(67)}
          source={lock}
          showeye={true}
        />

        <CustomTextInput
          label="Confirm Password"
          keyboardType="default"
          placeholder="Minimum 8 characters"
          placeholderMarginLeft={responsiveWidth(3)}
          responsiveMarginTop={7}
          TextinputWidth={responsiveWidth(67)}
          source={lock}
          showeye={true}
        />
        <View style={[appStyles.createcheckview, { marginTop: responsiveHeight(8), marginLeft: responsiveWidth(5) }]}>
          <CustomSwitch
            // offColor={colors.color33}
            onColor={colors.color33}
              thumbOffStyle={appStyles.thumbOffStyle}
            value={switchValue}
            trackOffStyle={appStyles.trackOffStyle}
            toggleSwitch={handleToggle}
          />
          <View style={{ width: responsiveWidth(87) }}>
            <Text style={[appStyles.Accept, { marginTop: responsiveHeight(1.2),marginLeft:responsiveWidth(3) }]}>Turn push notifications on/off</Text>
          </View>
        </View>
        <TouchableOpacity style={{ ...appStyles.Lubemeupcontainer, marginTop: responsiveHeight(7) }}>
          <Button
            label="Save Changes"
            customImageMarginRight={responsiveWidth(3)}
            onPress={() => navigation.navigate('DrawerNavigation', { screen: 'FindFood' })}
          />
        </TouchableOpacity>
        <View style={{ height: responsiveHeight(6) }} />
      </ScrollView>
      <SelectOptionPicker
        value={showModel}
        label={'Select Gender'}
        activeItem={selectedOption}
        data={GenderData}
        toggleModel={() => viewModel()}
        Selected={e => {
          setSelectedOption(e);
        }}
      />
    </SafeAreaView>
  );
}
