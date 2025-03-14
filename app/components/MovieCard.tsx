import { View, Text, Touchable, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { DataItemMovie } from '@/types/movies';
import { Link } from 'expo-router';

const MovieCard = ({
  adult,
  backdrop_path,
  genre_ids,
  id,
  original_language,
  original_title,
  overview,
  popularity,
  poster_path,
  release_date,
  title,
  video,
  vote_average,
  vote_count,
}: DataItemMovie) => {
  console.log(poster_path);
  return (
    <Link href={`/movies/${id}`} asChild>
      <TouchableOpacity className="w-[30%]">
        <Image
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : 'https://placehold.co/600x400/1a1a1a/ffffff.png',
          }}
          className="w-full h-52 rounded-lg"
          resizeMode="cover"
        />
        <Text className="text-sm font-bold text-white">{title}</Text>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;
