import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigation from './tab_navigation';
import BookingScreen from '@app/presentation/booking/booking_screen';

const Stack = createNativeStackNavigator<RootStackParamList>();
const HOME_SCREEN = 'HomeScreen';
const FAVORITE_SCREEN = 'FavoriteScreen';
const BOOKING_SCREEN = 'BookingScreen';
const BOOKED_SCREEN = 'BookedScreen';
const TAB_NAVIGATION = 'TabNavigation';

export type RootStackParamList = {
  HomeScreen: undefined;
  BookingScreen: undefined;
  TabNavigation: undefined;
  FavoriteScreen: undefined;
  BookedScreen: undefined;
};

const MainNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={HOME_SCREEN}>
        <Stack.Screen
          name={TAB_NAVIGATION}
          component={TabNavigation}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={BOOKING_SCREEN}
          component={BookingScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
export {HOME_SCREEN, FAVORITE_SCREEN, BOOKING_SCREEN, BOOKED_SCREEN};
