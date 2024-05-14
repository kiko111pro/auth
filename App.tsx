import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import FlashMessage from 'react-native-flash-message';
import {Provider, useDispatch, useSelector} from 'react-redux';

import MainApp from './src/navigation/MainApp';
import RootApp from './src/navigation/RootApp';
import {store, RootState, AppDispatch} from './src/app/store';
import {checkLogin} from './src/features/auth/auth.reducer';

const App = () => {
  const dispatch: AppDispatch = useDispatch();
  const {loggedIn} = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(checkLogin());
  }, []);

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
