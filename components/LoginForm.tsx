import React, { useState } from "react";
import { TextInput, Button } from 'react-native';

import { Text, TextProps } from './Themed';

export default function LoginForm() {
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');

  return (
    <div>
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

function createSession(email: string, password: string) {
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
  });
}
