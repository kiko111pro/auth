import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import FlashMessage from 'react-native-flash-message';
import {Provider} from 'react-redux';

import {useAppDispatch, useAppSelector} from './src/app/hooks';

import MainApp from './src/navigation/MainApp';
import RootApp from './src/navigation/RootApp';
import {store} from './src/app/store';
import {checkLogin} from './src/features/auth/auth.reducer';
import Test from './src/screens/test';

const App = () => {
  const dispatch = useAppDispatch();
  const {loggedIn} = useAppSelector(state => state.auth);

  const isTestingSomeBullshit = true;

  useEffect(() => {
    dispatch(checkLogin());
  }, []);

  if (isTestingSomeBullshit) return <Test />;

  return loggedIn ? <MainApp /> : <RootApp />;
};

function AppWrapper(): React.JSX.Element {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <App />
        <FlashMessage position={'top'} />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({});

export default AppWrapper;
