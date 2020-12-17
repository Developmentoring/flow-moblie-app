import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';
import { ActivityIndicator, FlatList } from 'react-native';
import { Task } from '../types';

export default function TabSamScreen() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<Task[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/tasks.json')
      .then((response) => response.json())
      .then((json) => setData(json.tasks))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={{ flex: 1, padding: 24 }}>
      {isLoading ? <ActivityIndicator /> : (
        <FlatList
          data={data}
          keyExtractor={({ id }) => id}
          renderItem={({ item }) => (
            <Text>{item.id}. {item.name}</Text>
          )}
        />
      )}
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
