import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {StyleSheet, Text, View, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  OrderScreen,
  Searchscreen,
  CartScreen,
  UserProfile,
  FoodDetailScreen,
  RestaurantScreen,
  HomeScreen,
} from '../screen/index';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const CartStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Order"
        component={OrderScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const TabStack = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarStyle: styles.tabBar,
        tabBarIcon: ({color, size}) => {
          if (route.name === 'home') {
            return <Icon name={'home'} size={size} color={color} />;
          } else if (route.name === 'userProfile') {
            return <Icon name={'person'} size={size} color={color} />;
          } else if (route.name === 'cart') {
            return <Icon name={'shopping-cart'} size={size} color={color} />;
          } else if (route.name === 'search') {
            return <Icon name={'search'} size={size} color={color} />;
          }
        },
        tabBarLabelStyle: styles.tabBarLabel,
      })}>
      <Tab.Screen
        name="home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="userProfile"
        component={UserProfile}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="cart"
        component={CartStack}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={TabStack}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Restaurant"
        component={RestaurantScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="foodDetail"
        component={FoodDetailScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="search"
        component={Searchscreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AppStack;

const styles = StyleSheet.create({
  tabBar: {
    height: 55,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderColor: 'grey',
  },
  tabBarLabel: {
    paddingBottom: 5,
  },
});
