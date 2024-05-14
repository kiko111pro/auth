import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import {Base, Button} from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../app/store';
import {login} from '../../features/auth/auth.reducer';
import {showMessage} from 'react-native-flash-message';

const Auth = () => {
  const dispatch: AppDispatch = useDispatch();
  const authSelector = useSelector((state: RootState) => state.auth);

  const [email, setEmail] = useState<string>('');
  const [pass, setPass] = useState<string>('');
  const [load, setLoad] = useState(false);

  const handleSubmit = () => {
    const postData = {
      username: 'kminchelle',
      password: '0lelplR',
      expiresInMins: 30,
    };

    dispatch(login(postData));
  };

  return (
    <Base>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          margin: 16,
        }}>
        <TextInput
          value={email}
          onChangeText={setEmail}
          style={styles.textContainer}
          textContentType="emailAddress"
        />
        <TextInput
          value={pass}
          onChangeText={setPass}
          style={styles.textContainer}
          textContentType="password"
        />
        <Button
          onPress={handleSubmit}
          loading={load}
          disabled={false}
          title="Submit"
        />
      </View>
    </Base>
  );
};

export default Auth;

const styles = StyleSheet.create({
  textContainer: {
    // backgroundColor: 'red',
    width: 300,
    marginVertical: 10,
    paddingVertical: 10,
    color: '#000',
    borderWidth: 1,
    paddingHorizontal: 3,
  },
});
