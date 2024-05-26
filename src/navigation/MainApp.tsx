import {StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {screenNames} from './screenNames';

import Home from '../screens/home';
import {useAppDispatch, useAppSelector} from '../app/hooks';
import {fetchProfile} from '../features/profile/profile.reducer';

const STACK = createNativeStackNavigator();

const MainApp = () => {
  const dispatch = useAppDispatch();
  const {userProfile} = useAppSelector(s => s.profile);

  console.log({userProfile});
  useEffect(() => {
    dispatch(fetchProfile());
  }, []);

  return (
    <STACK.Navigator>
      <STACK.Screen component={Home} name={screenNames.home} />
    </STACK.Navigator>
  );
};

export default MainApp;

const styles = StyleSheet.create({});
