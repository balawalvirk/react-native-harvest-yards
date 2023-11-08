import React, { useState } from 'react';
import { scale } from 'react-native-size-matters';
import { View, ScrollView, SafeAreaView, Image, TouchableOpacity, FlatList } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { appStyles } from '../../../services/utilities/appStyles';
import Header from '../../../components/Headers';
import { MenueButton, search, locationtag, Image5, Image6, Image7, Image10, Image11, Image12, Image13, Image14, LeftButton, HelpCallout } from '../../../services/utilities/assets';
import CustomLocationInput from '../../../components/Textinputs/Locationinput';
import CardView from '../../../components/CardView';
import { Image8 } from '../../../services/utilities/assets';
import DonationView from '../../../components/DonationView';
import { HelpCalloutModal } from '../../../components/Modal/Tip Modal';
const Donation = ({ navigation }) => {
    const [isHelpCalloutModalVisible, setHelpCalloutModalVisible] = useState(false);
    const data = [
        {
            source: Image13,
            title: 'Project Warm Hearts',
            description: 'Ensure underprivileged children have access to quality education, scholarships, and school supplies, enabling them to break the cycle of poverty.',
        },
        {
            source: Image11,
            title: 'Project Warm Hearts',
            description: 'Ensure underprivileged children have access to quality education, scholarships, and school supplies, enabling them to break the cycle of poverty.',
        },
        {
            source: Image14,
            title: 'Project Warm Hearts',
            description: 'Ensure underprivileged children have access to quality education, scholarships, and school supplies, enabling them to break the cycle of poverty.',

        },
        {
            source: Image10,
            title: 'Project Warm Hearts',
            description: 'Ensure underprivileged children have access to quality education, scholarships, and school supplies, enabling them to break the cycle of poverty.',
        },
        {
            source: Image11,
            title: 'Project Warm Hearts',
            description: 'Ensure underprivileged children have access to quality education, scholarships, and school supplies, enabling them to break the cycle of poverty.',
        },
        {
            source: Image12,
            title: 'Project Warm Hearts',
            description: 'Ensure underprivileged children have access to quality education, scholarships, and school supplies, enabling them to break the cycle of poverty.',
        },
        {
            source: Image13,
            title: 'Project Warm Hearts',
            description: 'Ensure underprivileged children have access to quality education, scholarships, and school supplies, enabling them to break the cycle of poverty.',
        },
        {
            source: Image14,
            title: 'Project Warm Hearts',
            description: 'Ensure underprivileged children have access to quality education, scholarships, and school supplies, enabling them to break the cycle of poverty.',
        },
        {
            source: Image11,
            title: 'Project Warm Hearts',
            description: 'Ensure underprivileged children have access to quality education, scholarships, and school supplies, enabling them to break the cycle of poverty.',
        },
    ];

    return (
        <SafeAreaView style={appStyles.container}>
            <Header
                imageSource={LeftButton}
                headerText="Donations"
                showImage={true}
                onPress={() => navigation.goBack()}
                customTextMarginLeft={responsiveWidth(28)}
                marginleft={-responsiveWidth(2)}

            />
            <ScrollView>
                <CustomLocationInput
                    showsearch={true}
                    source={search}
                    inputWidth={responsiveWidth(92)}
                    inneriinputtwidth={responsiveWidth(82)}
                    placeholder='Search...'
                    marginLeft={responsiveWidth(2)}

                />
                <FlatList
                    data={data}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <DonationView
                            customMarginTop={responsiveHeight(1)}
                            source={item.source}
                            title={item.title}
                            description={item.description}
                            onPress={() => navigation.navigate('AppNavigation', { screen: 'MainDonation', params: { item: item } })}
                        />
                    )}
                />
            </ScrollView>
            <TouchableOpacity onPress={() => setHelpCalloutModalVisible(true)}>
                <Image source={HelpCallout} style={[appStyles.locationtag, { width: scale(60), height: scale(60) }]} />
            </TouchableOpacity>
            <HelpCalloutModal
                isVisible={isHelpCalloutModalVisible}
                onBackdropPress={() => setHelpCalloutModalVisible(false)}
                // toggleModal={() => setHelpCalloutModalVisible(false)}
                Title='Donations Help'
                helpcallouttxt='Donations may be in a variety of forms:  Food, Money, Cars, Real Estate, Toys, etc. Your donations to Harvest Yards will be used to support our efforts to fight food insecurity. Please fill out the information and we will contact you for details and to arrange for your donation. Your contributions are tax deductible and Harvest Yards will provide you with the document(s) you need to for your taxes. If you are interested in donating to one of our nonprofit partners please indicate which partner and we will forward your request to them.
                Thank you for your support!'
                bottom={responsiveHeight(4.5)}
            />
        </SafeAreaView>
    );
};

export default Donation;
