import {
  View,
  Text,
  Image,
  FlatList,
  ActivityIndicatorBase,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { images } from '@/constants/images';
import MovieCard from '../components/MovieCard';
import { useGetMoviesListByPopularity } from '@/hooks/queries/useGetMoviesListByPopularity';
import SearchBar from '../components/SearchBar';
import { icons } from '@/constants/icons';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState<string | null | undefined>('');
  const {
    data: moviesListDataByPopularity,
    isLoading: isLoadingMoviesListDataByPopularity,
    refetch: refetchMoviesListDataByPopularity,
    isError: isErrorMoviesListDataByPopularity,
  } = useGetMoviesListByPopularity(searchQuery as string, false);

  useEffect(() => {
    if (searchQuery?.trim()) {
      refetchMoviesListDataByPopularity();
    }
  }, [searchQuery]);

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="w-full flex-1 absolute z-0 " resizeMode="cover" />
      <FlatList
        data={moviesListDataByPopularity?.data?.results}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        className="px-5"
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: 'center',
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        ListHeaderComponent={
          <>
            <View className="w-full flex-row justify-center mt-20">
              <Image source={icons.logo} className="w-12 h-10" />
            </View>
            <View className="my-5">
              <SearchBar
                placeHolder="Search Movies"
                onChangeText={(text) => setSearchQuery(text)}
                onSubmit={() => {
                  refetchMoviesListDataByPopularity();
                }}
                value={searchQuery as string}
              />
            </View>
            {isLoadingMoviesListDataByPopularity && (
              <ActivityIndicator className="flex-1 my-3 " size="large" color="#000ff" />
            )}
            {!isLoadingMoviesListDataByPopularity &&
              moviesListDataByPopularity?.data?.results.length > 0 && (
                <Text className="text-xl text-white font-bold">
                  Search Results for :<Text className="text-accent"> {searchQuery}</Text>
                </Text>
              )}
          </>
        }
        ListEmptyComponent={
          !isLoadingMoviesListDataByPopularity && !isErrorMoviesListDataByPopularity ? (
            <View className="mt-10 px-5">
              <Text className="text-center text-gray-500">
                {searchQuery?.trim() ? 'No movies found' : 'Search for movies'}
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default Search;
