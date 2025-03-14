import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import { Link, useRouter } from 'expo-router';
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native';
import SearchBar from '../components/SearchBar';
import { useGetMoviesListByPopularity } from '@/hooks/queries/useGetMoviesListByPopularity';
import { useState } from 'react';

export default function Index() {
  const [searchQuery, setSearchQuery] = useState<string | null | undefined>('');
  const router = useRouter();
  const {
    data: moviesListDataByPopularity,
    isLoading: isLoadingMoviesListDataByPopularity,
    refetch: refetchMoviesListDataByPopularity,
    isError: isErrorMoviesListDataByPopularity,
  } = useGetMoviesListByPopularity('superman');

  // Log the value of moviesListDataByPopularity
  console.log('Movies List Data by Popularity:', moviesListDataByPopularity?.data?.results);

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />
      {isLoadingMoviesListDataByPopularity ? (
        <ActivityIndicator size="large" color={'#0000ff'} className="mt-10 self-center" />
      ) : isErrorMoviesListDataByPopularity ? (
        <Text>Error Fetching Movies Data</Text>
      ) : (
        <FlatList
          data={moviesListDataByPopularity?.data?.results}
          renderItem={({ item }) => <Text className="text-white text-sm">{item.title}</Text>}
          ListHeaderComponent={
            <>
              <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
              <SearchBar
                onPress={() => {
                  // refetchMoviesListDataByPopularity();
                }}
                placeHolder="Search For A Movie :)"
              />
              <Text className="text-lg font-bold mt-5 mb-3 text-white">Latest Movies</Text>
            </>
          }
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingBottom: 10,
          }}
        />
      )}
    </View>
  );
}
