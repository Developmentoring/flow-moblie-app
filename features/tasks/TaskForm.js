import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateNewTask
} from './tasksSlice';
import { View, TextInput, StyleSheet } from 'react-native';
import { CheckBox } from 'react-native-elements'
import { ActivityIndicator, FlatList } from 'react-native';

export default function TaskForm() {
  const dispatch = useDispatch();
  const newTask = useSelector(state => state.tasks.newTask)
  const isLoaded = function () { return true }

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text => dispatch(updateNewTask(text))}
        value={newTask.name}
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