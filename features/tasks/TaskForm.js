import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateNewTask,
  createTask
} from './tasksSlice';
import { View } from 'react-native';
import { Input } from 'react-native-elements'

export default function TaskForm() {
  const dispatch = useDispatch();
  const [taskName, setTaskName] = useState('');

  return (
    <View>
      <Input
        placeholder='Add a task'
        value={taskName}
        onChangeText={text => setTaskName(text)}
        onSubmitEditing={event =>
          taskName.length > 1 ? dispatch(createTask({ name: taskName })) : ''}
      />
    </View>
  );
}
