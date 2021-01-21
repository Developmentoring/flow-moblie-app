import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchTasks,
  selectTasks,
  updateTask
} from './tasksSlice';
import { View } from 'react-native';
import { CheckBox } from 'react-native-elements'
import { ActivityIndicator, FlatList } from 'react-native';

export default function TaskList() {
  const tasks = useSelector(selectTasks);
  const dispatch = useDispatch();

  const taskStatus = useSelector(state => state.tasks.status)
  const isLoaded = function () {
    if (taskStatus === 'succeeded' || taskStatus === 'fulfilled') {
      return true
    } else {
      return false
    }
  }

  useEffect(() => {
    if (taskStatus === 'idle') {
      dispatch(fetchTasks())
    }
  }, [taskStatus, dispatch])

  return (
    <View>
      {isLoaded() ? (
        <FlatList
          data={tasks}
          keyExtractor={({ id }) => id.toString()}
          renderItem={({ item }) => (
            <CheckBox
              title={item.name}
              checked={item.completed === true}
              onPress={(a, b) => { dispatch(updateTask(item)) }}
            />
          )}
        />
      ) : <ActivityIndicator />}
    </View>
  );
}