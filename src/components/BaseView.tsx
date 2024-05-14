import {StyleSheet, View, ColorValue, SafeAreaView} from 'react-native';
import React from 'react';

interface BaseProps {
  bgcolor?: ColorValue;
  statusBarColor?: ColorValue;
  children: React.JSX.Element;
}

const BaseView = (props: BaseProps): React.JSX.Element => {
  return (
    <View style={{flex: 1, backgroundColor: props.bgcolor || '#fff'}}>
      <SafeAreaView
        style={{
          backgroundColor:
            props.bgcolor || props.statusBarColor || 'rgba(0,0,0,0)',
        }}
      />
      {props.children}
    </View>
  );
};

export default BaseView;

const styles = StyleSheet.create({});
