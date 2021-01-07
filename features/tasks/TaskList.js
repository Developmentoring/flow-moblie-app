import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	setTasks,
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

	const navigation = useNavigation();
	const [isLoading, setLoading] = useState(true);

	useEffect(() => {
		fetch('http://localhost:3000/api/tasks.json', {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			}
		}).then((response) => response.json())
			.then((json) => {
				dispatch(setTasks(json.tasks))
				setLoading(false)
			})
			.catch((error) => alert(error))
	}, []);

	return (
		<View style={{ flex: 1, padding: 24 }}>
			{isLoading ? <ActivityIndicator /> : (
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
			)}
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