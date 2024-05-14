import {StyleSheet} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {screenNames} from './screenNames';

import Home from '../screens/home';

const STACK = createNativeStackNavigator();

const MainApp = () => {
  return (
    <STACK.Navigator>
      <STACK.Screen component={Home} name={screenNames.home} />
    </STACK.Navigator>
  );
};

export default MainApp;

const styles = StyleSheet.create({});
