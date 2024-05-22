import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FindFood from '../../screens/appFlow/Find Food';
import ReserveFood from '../../screens/appFlow/Reserved Food';
import DrawerContent from '../../components/DrawerContent';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {colors} from '../../services/utilities/color';
import {search, shoppingbag} from '../../services/utilities/assets';
import {
  Image,
  View,
  TouchableOpacity,
  Text,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import {fontFamily, fontSize} from '../../services/utilities/fonts';
import {appStyles} from '../../services/utilities/appStyles';
const Drawer = createDrawerNavigator();
const Tab = createMaterialTopTabNavigator();

// Custom Tab Bar Component
const CustomTabBar = ({state, descriptors, navigation}) => {
  return (
    <View style={appStyles.tabmainview}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const {options} = descriptors[route.key];
        const marginLeft = route.name === 'FindFood' ? responsiveWidth(5) : 0;
        const marginRight =
          route.name === 'ReserveFood' ? responsiveWidth(5) : 0;
        const icon = route.name === 'FindFood' ? search : shoppingbag;
        const label = route.name === 'FindFood' ? 'Find Food' : 'Reserved Food';

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={{
              flex: 1,
              alignItems: 'center',
              padding: 10,
              marginLeft,
              marginRight,
            }}>
            <View
              style={{
                alignItems: 'center',
                backgroundColor: isFocused ? colors.color33 : 'transparent',
                flexDirection: 'row',
                // height: responsiveHeight(6),
                // width: responsiveWidth(30),
                padding: 14,
                justifyContent: 'center',
                borderRadius: responsiveWidth(50),
              }}>
              <Image
                source={icon}
                style={{
                  width: scale(24),
                  height: scale(24),
                  marginRight: responsiveWidth(2),
                  resizeMode: 'contain',
                  tintColor: isFocused ? colors.color7 : colors.color35,
                }}
              />
              <Text
                style={{
                  fontSize: fontSize.h10,
                  fontFamily: fontFamily.SatoshiVariable,
                  fontWeight: '700',
                  color: isFocused ? colors.color7 : colors.color35,
                }}>
                {label}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
const TabNavigator = () => {
  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -64} // Adjust this value according to your tab bar's height
    >
      <Tab.Navigator
        tabBarPosition="bottom"
        initialRouteName="FindFood"
        screenOptions={{
          headerShown: false,
        }}
        tabBar={props => <CustomTabBar {...props} />}
        keyboardHidesTabBar={true}>
        <Tab.Screen name="FindFood" component={FindFood} />
        <Tab.Screen name="ReserveFood" component={ReserveFood} />
      </Tab.Navigator>
    </KeyboardAvoidingView>
  );
};
const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerContent {...props} />}
      screenOptions={{
        drawerStyle: {
          backgroundColor: 'transparent',
          width: responsiveWidth(80),
        },
        headerShown: false,
      }}>
      <Drawer.Screen name="TabNavigator" component={TabNavigator} />
    </Drawer.Navigator>
  );
};
export default DrawerNavigation;
