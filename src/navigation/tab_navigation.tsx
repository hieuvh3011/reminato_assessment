import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '@app/presentation/home/home_screen';
import FavoriteScreen from '@app/presentation/favorite/favorite_screen';
import {
  BOOKED_SCREEN,
  FAVORITE_SCREEN,
  HOME_SCREEN,
  RootStackParamList,
} from './main_navigation';
import BookedScreen from '@app/presentation/booked/booked_screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ParamListBase, RouteProp} from '@react-navigation/native';
import colors from '@app/theme/colors';

const Tab = createBottomTabNavigator<RootStackParamList>();
const TabNavigation = () => {
  const renderIcon = (
    focused: boolean,
    color: string,
    size: number,
    route: RouteProp<ParamListBase, string>,
  ) => {
    let iconName = 'home';

    switch (route.name) {
      case HOME_SCREEN:
        iconName = 'home';
        break;
      case FAVORITE_SCREEN:
        iconName = 'heart';
        break;
      case BOOKED_SCREEN:
        iconName = 'book';
        break;
    }

    return <Icon name={iconName} size={size} color={color} />;
  };

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) =>
          renderIcon(focused, color, size, route),
        tabBarActiveTintColor: colors.primary,
      })}>
      <Tab.Screen
        name={HOME_SCREEN}
        component={HomeScreen}
        options={{title: 'Home'}}
      />
      <Tab.Screen
        name={FAVORITE_SCREEN}
        component={FavoriteScreen}
        options={{title: 'Favorite'}}
      />
      <Tab.Screen
        name={BOOKED_SCREEN}
        component={BookedScreen}
        options={{title: 'Booked'}}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
