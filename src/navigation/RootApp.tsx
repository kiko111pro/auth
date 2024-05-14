import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/auth';
import {screenNames} from './screenNames';

const STACK = createNativeStackNavigator();

const RootApp = () => {
  return (
    <STACK.Navigator>
      <STACK.Screen
        component={Login}
        name={screenNames.login}
        options={{headerShown: false}}
      />
    </STACK.Navigator>
  );
};

export default RootApp;

const styles = StyleSheet.create({});
