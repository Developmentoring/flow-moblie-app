import React from 'react';
import { StyleSheet } from 'react-native';

import { View } from '../components/Themed';

import TaskList from '../features/tasks/TaskList'


export default function TabSamScreen() {
  return (
    <View>
      <TaskList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
