import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';
import { ActivityIndicator, FlatList } from 'react-native';
import { Movie } from '../types';

export default function TabSamScreen() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<Movie[]>([]);

  useEffect(() => {
    fetch('https://pacific-peak-69023.herokuapp.com/movies.json')
      .then((response) => response.json())
      .then((json) => setData(json.movies))
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
            <Text>{item.id}. {item.title}, {item.releaseYear}</Text>
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
