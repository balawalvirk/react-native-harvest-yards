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
export default function Index({ navigation }) {
  const [selectedDate, setSelectedDate] = useState('');
  const [showModel, setShowModel] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const GenderData = [{ label: 'Male' }, { label: 'Female' }, { label: 'Other' }];

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
          label="Full Name"
          keyboardType="default"
          placeholder="John Doe"
          responsiveMarginTop={3}
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
