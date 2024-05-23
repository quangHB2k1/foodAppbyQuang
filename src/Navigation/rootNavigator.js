import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import AppStack from './appStack';
import AuthStack from './authStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {setUser} from '../redux/action/authAction';
import {NavigationContainer} from '@react-navigation/native';
const RootStack = createNativeStackNavigator();
const RootNavigator = () => {
  const login = useSelector(state => state.user.login);

  return (
    <NavigationContainer>
      {login ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default RootNavigator;
