// App.tsx

import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {FlashView} from '../../components';

const App: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <FlashView style={styles.rectangle} />
      <FlashView style={styles.circle} />
      <View style={styles.customView}>
        <FlashView>
          <View style={styles.customContent} />
        </FlashView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  rectangle: {
    height: 20,
    width: 200,
    marginBottom: 20,
    borderRadius: 4,
  },
  circle: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginBottom: 20,
  },
  customView: {
    width: 80,
    height: 100,
    marginBottom: 20,
    borderRadius: 90,
    borderWidth: 2,
  },
  customFlash: {
    flex: 1,
    borderRadius: 10,
  },
  customContent: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
  },
});

export default App;
