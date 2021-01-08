import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	fetchTasks,
	selectTasks,
	setTaskCompleted
} from './tasksSlice';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
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
		<View style={{ flex: 1, padding: 24 }}>
			{isLoaded() ? (
				<FlatList
					data={tasks}
					keyExtractor={({ id }) => id}
					renderItem={({ item }) => (
						<CheckBox
							title={item.name}
							checked={item.completed === 'true'}
							onPress={(a, b) => { dispatch(setTaskCompleted(item)) }}
						/>
					)}
				/>
			) : <ActivityIndicator />}
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