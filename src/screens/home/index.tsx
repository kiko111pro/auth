import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Base, Button} from '../../components';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../app/store';
import {logout} from '../../features/auth/auth.reducer';
import {useAppSelector} from '../../app/hooks';
import {fetchProfile} from '../../features/profile/profile.reducer';

const Home = () => {
  const dispatch: AppDispatch = useDispatch();
  const authSelector = useAppSelector(s => s.auth);
  const profileSelector = useAppSelector(s => s.profile);

  if (!authSelector.userLoginDetails || !profileSelector.userProfile)
    return (
      <Base>
        <Text>No Profile exists</Text>
      </Base>
    );

  return (
    <Base>
      <>
        <Text>{authSelector.userLoginDetails.firstName}</Text>
        <Text>{authSelector.userLoginDetails.lastName}</Text>
        <Button title="Logout" onPress={() => dispatch(logout())} />
        <Button
          title="Profile"
          loading={profileSelector.loading}
          onPress={() => dispatch(fetchProfile())}
        />
      </>
    </Base>
  );
};

export default Home;

const styles = StyleSheet.create({});
