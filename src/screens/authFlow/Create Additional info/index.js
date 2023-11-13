import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import Header from '../../../components/Headers';
import Button from '../../../components/Button';
import { colors } from '../../../services/utilities/color';
import CustomCheckbox from '../../../components/Checkbox';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
    responsiveFontSize,
    responsiveHeight,
    responsiveWidth,
} from 'react-native-responsive-dimensions';
import {
    Email,
    LeftButton,
    Phone,
    User,
    lock,
} from '../../../services/utilities/assets';
import { appStyles } from '../../../services/utilities/appStyles';
import CustomTextInput from '../../../components/Textinputs';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SentModal } from '../../../components/Modal';
export default function Index({ navigation }) {
    const [islinksentModalVisible, setIslinksentModalVisible] = useState(false);
    const [resetLinkSent, setResetLinkSent] = useState(false);
    const handlesendresetlink = () => {
        setIslinksentModalVisible(true);
        setResetLinkSent(true);
        setTimeout(() => {
            setIslinksentModalVisible(false);
            navigation.navigate('DrawerNavigation',{screen:'FindFood'});
        }, 2000);
    };
    useEffect(() => {
    }, [resetLinkSent]);
    const handlearrow = () => {
        navigation.goBack();
    };
    return (
        <SafeAreaView style={appStyles.container}>
            <Header
                imageSource={LeftButton}
                headerText="Additional info"
                showImage={true}
                onPress={handlearrow}
                customTextMarginLeft={responsiveWidth(22)}
            />
            <KeyboardAwareScrollView
                contentContainerStyle={appStyles.scrollViewContainer}
                showsVerticalScrollIndicator={false}
                extraScrollHeight={responsiveHeight(20)}>

                <CustomTextInput
                    label="Email Address"
                    keyboardType="default"
                    placeholder="example@email.com"
                    placeholderMarginLeft={responsiveWidth(3)}
                    responsiveMarginTop={7}
                    source={Email}
                />

                <CustomTextInput
                    label="Password"
                    keyboardType="default"
                    placeholder="Minimum 8 characters"
                    placeholderMarginLeft={responsiveWidth(3)}
                    responsiveMarginTop={7}
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
                <CustomTextInput
                    label="How many people in your household?"
                    keyboardType="default"
                    placeholder="How many people in your household?"
                    placeholderMarginLeft={responsiveWidth(3)}
                    responsiveMarginTop={7}
                    source={User} />
                <View style={[appStyles.createcheckview, { marginTop: responsiveHeight(8), marginLeft: responsiveWidth(5) }]}>
                    <CustomCheckbox />
                    <View style={{ width: responsiveWidth(87) }}>
                        <Text style={[appStyles.Accept, { marginTop: -responsiveHeight(0.5) }]}>I agree to the use of my phone number for receiving SMS updates and notifications</Text>
                    </View>
                </View>
                <View style={[appStyles.acceptview, { marginTop: responsiveHeight(2) }]}>
                    <View>
                        <CustomCheckbox />
                    </View>
                    <Text style={appStyles.Accept}>Accept</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Termsandconditions')}>
                        <Text style={appStyles.TermsText}>Terms & Conditions</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={[appStyles.Lubemeupcontainer, { marginTop: responsiveHeight(3) }]}>
                    <Button
                        label="Create Account"
                        customImageMarginRight={responsiveWidth(3)}
                        onPress={handlesendresetlink}
                    />

                </TouchableOpacity>

                <View style={{ height: responsiveHeight(6) }} />
            </KeyboardAwareScrollView>
            <SentModal isVisible={islinksentModalVisible}
                LinkSent='Account Created'
                passowrd='Your account has been registered successfully.'
            />
        </SafeAreaView>
    );
}
