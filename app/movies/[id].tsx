import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';

const MovieDetails = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  return (
    <View>
      <Text>{id}</Text>
    </View>
  );
};

export default MovieDetails;
