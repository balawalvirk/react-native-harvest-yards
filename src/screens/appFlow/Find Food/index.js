import React,{useState} from 'react';
import { View, ScrollView, SafeAreaView, Image, Text,TouchableOpacity, FlatList } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { appStyles } from '../../../services/utilities/appStyles';
import Header from '../../../components/Headers';
import { HelpCalloutModal } from '../../../components/Modal/Tip Modal';
import { MenueButton, search, locationtag, Image5, Image6, Image7, Image10, Image11, Image12, Image13, Image14, HelpCallout } from '../../../services/utilities/assets';
import CustomLocationInput from '../../../components/Textinputs/Locationinput';
import CardView from '../../../components/CardView';
import { Image8 } from '../../../services/utilities/assets';
import { scale } from 'react-native-size-matters';
import { colors } from '../../../services/utilities/color';
const FindFood = ({ navigation }) => {
  const [isHelpCalloutModalVisible, setHelpCalloutModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const data = [
    {
        source:Image8, 
      title: 'CareFood Pantry',
      description: '888 Opera Place, Vienna, Austria',
      Availabletxt: '11 Available',
      additionalInfo: '6 km away',
    },
    {
        source:Image6, 
      title: 'CareFood Pantry',
      description: '888 Opera Place, Vienna, Austria',
      Availabletxt: '11 Available',
      additionalInfo: '6 km away',
    },
    {
        source:Image7, 
      title: 'CareFood Pantry',
      description: '888 Opera Place, Vienna, Austria',
      Availabletxt: '11 Available',
      additionalInfo: '6 km away',
    },
    {
        source:Image10, 
      title: 'CareFood Pantry',
      description: '888 Opera Place, Vienna, Austria',
      Availabletxt: '11 Available',
      additionalInfo: '6 km away',
    },
    {
        source:Image11, 
      title: 'CareFood Pantry',
      description: '888 Opera Place, Vienna, Austria',
      Availabletxt: '11 Available',
      additionalInfo: '6 km away',
    },
    {
        source:Image12, 
      title: 'CareFood Pantry',
      description: '888 Opera Place, Vienna, Austria',
      Availabletxt: '11 Available',
      additionalInfo: '6 km away',
    },
    {
        source:Image13, 
      title: 'CareFood Pantry',
      description: '888 Opera Place, Vienna, Austria',
      Availabletxt: '11 Available',
      additionalInfo: '6 km away',
    },
    {
        source:Image14, 
      title: 'CareFood Pantry',
      description: '888 Opera Place, Vienna, Austria',
      Availabletxt: '11 Available',
      additionalInfo: '6 km away',
    },
    {
        source:Image11, 
      title: 'CareFood Pantry',
      description: '888 Opera Place, Vienna, Austria',
      Availabletxt: '11 Available',
      additionalInfo: '6 km away',
    },
  ];
  const filteredData = data.filter(
    item => item.title.toLowerCase().includes(searchText.toLowerCase())
  );
  return (
    <SafeAreaView style={appStyles.container}>
      <Header
        imageSource={MenueButton}
        headerText="Find Food"
        showImage={true}
        onPress={() => navigation.openDrawer()}
        customTextMarginLeft={responsiveWidth(26)}
        showImage2={true}
        marginleft={-responsiveWidth(2)}
        bellmarginleft={responsiveWidth(32)}
      />
      <ScrollView>
        <CustomLocationInput
          showsearch={true}
          source={search}
          marginBottom={responsiveHeight(1)}
          inputWidth={responsiveWidth(75)}
          inneriinputtwidth={responsiveWidth(65)}
          placeholder='Search...'       
          placeholderTextColor={colors.color29}
          maininputmarginleft={-responsiveWidth(16.6)}
          marginLeft={responsiveWidth(2)}
          onChangeText={(text) => setSearchText(text)}
          value={searchText}
        />
           {/* Conditional rendering for button related to search */}
      {searchText !== '' && (
        <TouchableOpacity onPress={() => setSearchText('')}>
          {/* Your button related to search input */}
          {/* <Text>Clear Search</Text> */}
        </TouchableOpacity>
      )}
        <TouchableOpacity onPress={ () => navigation.navigate('AppNavigation',{screen:'Location'})}>
          <Image source={locationtag} style={appStyles.locationtag} />
        </TouchableOpacity>
        <Text style={[appStyles.infotxt, {marginBottom:responsiveHeight(0.1)}]}>Nearby</Text>
        <FlatList
           data={searchText === '' ? data : filteredData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <CardView
              customMarginTop={responsiveHeight(1)}
              source={item.source}
              title={item.title}
              description={item.description}
              Availabletxt={item.Availabletxt}
              additionalInfo={item.additionalInfo}
              onPress={()=> navigation.navigate('AppNavigation',{screen:'Reservedfood1', params: { item: item }})}
            />
          )}
        />
        <View style={{ height: responsiveHeight(4) }} />
      </ScrollView>
      <TouchableOpacity  onPress={() => setHelpCalloutModalVisible(true)}>
      <Image source={HelpCallout} style={[appStyles.locationtag,{width:scale(60),height:scale(60),marginBottom:-responsiveHeight(3)}]} />
      </TouchableOpacity>
      <HelpCalloutModal
        isVisible={isHelpCalloutModalVisible}
        onBackdropPress={() => setHelpCalloutModalVisible(false)}
        toggleModal={() => setHelpCalloutModalVisible(false)}
        Title='Find Food Help'
        helpcallouttxt='Leave the search box blank to find food near you.
        Enter an address to find food near a specific location.
        Scroll through the list of food suppliers and select a food supplier to get the details of what they offer.'
      />
    </SafeAreaView>
  );
};

export default FindFood;
