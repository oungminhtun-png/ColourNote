import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens Import - လမ်းကြောင်း မှန်ကန်ပါစေ
import HomeScreen from '../screens/HomeScreen';
import FavouriteScreen from '../screens/FavouriteScreen';
import DeleteScreen from '../screens/DeleteScreen';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#121421',
          borderTopWidth: 0,
          height: 70,
          paddingBottom: 10,
        },
        tabBarActiveTintColor: '#6C5CE7',
        tabBarInactiveTintColor: '#636e72',
        tabBarShowLabel: false,
        tabBarIcon: ({ focused, color }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'grid' : 'grid-outline';
          } else if (route.name === 'Favourites') {
            iconName = focused ? 'star' : 'star-outline';
          } else if (route.name === 'Trash') {
            iconName = focused ? 'trash' : 'trash-outline';
          }
          return <Ionicons name={iconName} size={28} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Favourites" component={FavouriteScreen} />
      <Tab.Screen name="Trash" component={DeleteScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator; // ဤစာကြောင်း ပါဝင်ရန် အလွန်အရေးကြီးပါသည်