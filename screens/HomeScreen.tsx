import * as React from 'react';
import { SafeAreaView } from 'react-native';


import TaskList from '../features/tasks/TaskList'
import TaskForm from '../features/tasks/TaskForm'

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <TaskList />
      <TaskForm />
    </SafeAreaView>
  );
}
