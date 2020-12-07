import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  clear,
  setToken,
  selectSessionToken,
} from './sessionSlice';
import styles from './Login.module.css';
import { TextInput, Button } from 'react-native';

export default function Login() {
  const sessionToken = useSelector(selectSessionToken);
  const dispatch = useDispatch();
  // const [incrementAmount, setIncrementAmount] = useState('2');

  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');

  const [session, setSession] = useState({});

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
      .then((session) => dispatch(setToken(session)))
      .catch((error) => console.error(error))
  }

  return (
    <div>
      <span>{sessionToken}</span>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, padding: 10 }}
        onChangeText={email => onChangeEmail(email)}
        placeholder='email'
        value={email}
      />
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, padding: 10 }}
        onChangeText={password => onChangePassword(password)}
        placeholder='password'
        value={password}
      />
      <Button
        onPress={() => {
          createSession(email, password);
        }}
        title='Submit'
      />
    </div>
  );
}