import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import {Base, Button} from '../../components';
import {login} from '../../features/auth/auth.reducer';
import {useAppDispatch, useAppSelector} from '../../app/hooks';

const Auth = () => {
  const dispatch = useAppDispatch();
  const authSelector = useAppSelector(state => state.auth);

  const [email, setEmail] = useState<string>('');
  const [pass, setPass] = useState<string>('');
  const [load, setLoad] = useState(false);

  const handleSubmit = () => {
    const postData = {
      username: 'kminchelle',
      password: '0lelplR',
      expiresInMins: 0.2,
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
