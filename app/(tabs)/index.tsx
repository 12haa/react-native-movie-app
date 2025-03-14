import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import { Link, useRouter } from 'expo-router';
import { ActivityIndicator, FlatList, Image, ScrollView, Text, View } from 'react-native';
import SearchBar from '../components/SearchBar';
import { useGetMoviesListByPopularity } from '@/hooks/queries/useGetMoviesListByPopularity';
import { useState, useEffect, useCallback } from 'react';
import { DataItemMovie } from '@/types/movies';
import MovieCard from '../components/MovieCard';

export default function Index() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState<string>('');
  const router = useRouter();

  const {
    data: moviesListDataByPopularity,
    isLoading: isLoadingMoviesListDataByPopularity,
    refetch: refetchMoviesListDataByPopularity,
    isError: isErrorMoviesListDataByPopularity,
  } = useGetMoviesListByPopularity(debouncedSearchQuery);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500); // 500ms delay

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />
      <ScrollView>
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
        {isLoadingMoviesListDataByPopularity ? (
          <>
            <ActivityIndicator size="large" color={'#0000ff'} className="mt-10 self-center" />
            <SearchBar
              value={searchQuery}
              onChangeText={handleSearch}
              placeHolder="Search For A Movie :)"
              onSubmit={() => {
                refetchMoviesListDataByPopularity();
              }}
            />
          </>
        ) : isErrorMoviesListDataByPopularity ? (
          <Text>Error Fetching Movies Data</Text>
        ) : (
          <View className="flex-1 mt-5">
            <SearchBar
              value={searchQuery}
              onChangeText={handleSearch}
              placeHolder="Search For A Movie :)"
              onSubmit={() => {
                refetchMoviesListDataByPopularity();
              }}
            />
            <>
              <Text className="text-lg font-bold mt-5 mb-3 text-white">Latest Movies</Text>
              <FlatList
                data={moviesListDataByPopularity?.data?.results}
                renderItem={({ item }: { item: DataItemMovie }) => <MovieCard {...item} />}
                keyExtractor={(item) => String(item.id)}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: 'flex-start',
                  gap: '20',
                  marginHorizontal: 10,
                  paddingRight: 5,
                  marginBottom: 5,
                }}
                className="mt-2 pb-32"
                scrollEnabled={false}
              />
            </>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
