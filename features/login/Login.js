import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setToken,
  selectSessionToken,
} from './sessionSlice';
import {
  TextInput,
  Button,
  View
} from 'react-native';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Login() {
  const sessionToken = useSelector(selectSessionToken);
  const dispatch = useDispatch();

  const navigation = useNavigation();

  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');


  function createSession(email, password) {
    fetch('http://localhost:3000/api/sessions', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: {
          email: email,
          password: password
        }
      })
    }).then((response) => response.json())
      .then((session) => {
        if (session.error) {
          throw session.error
        } else {
          dispatch(setToken(session))
          navigation.navigate('Home')
        }
      })
      .catch((error) => alert(error))
  }

  return (
    <View style={styles.view}>
      <TextInput
        style={styles.input}
        onChangeText={email => onChangeEmail(email)}
        placeholder='email'
        value={email}
      />
      <TextInput
        style={styles.input}
        onChangeText={password => onChangePassword(password)}
        placeholder='password'
        secureTextEntry={true}
        value={password}
      />
      <Button
        onPress={() => {
          createSession(email, password);
        }}
        title='Submit'
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    width: '100%'
  },
  view: {
    flexDirection: 'column',
    width: '100%',
    maxWidth: 450,
    paddingLeft: 30,
    paddingRight: 30
  },
});