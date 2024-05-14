import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Base, Button} from '../../components';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../app/store';
import {logout} from '../../features/auth/auth.reducer';
import {profileService} from '../../features/profile/profile.service';

const Home = () => {
  const dispatch: AppDispatch = useDispatch();

  const fetchProfile = async () => {
    const res = await profileService.getUserProfile();
  };

  return (
    <Base>
      <>
        <Button title="Logout" onPress={() => dispatch(logout())} />
        <Button title="Profile" onPress={fetchProfile} />
      </>
    </Base>
  );
};

export default Home;

const styles = StyleSheet.create({});
