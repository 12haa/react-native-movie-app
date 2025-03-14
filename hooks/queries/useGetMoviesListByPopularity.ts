import api from '@/config/api';
import { useQuery } from '@tanstack/react-query';

export const useGetMoviesListByPopularity = (query?: string) => {
  const endPoint = query
    ? `/search/movie?query=${encodeURIComponent(query)}`
    : `/discover/movie?sort_by=popularity.desc`;
  const { data, isLoading, refetch, isError } = useQuery({
    queryKey: ['movie', query ? 'search' : 'popularity', query],
    queryFn: async (): Promise<any> => {
      const request = await api.get(endPoint);
      return request;
    },
    enabled: true,
  });

  return { data, isLoading, refetch, isError };
};

// import api from '@/config/api';
// import { useQuery } from '@tanstack/react-query';

// // Define the response type structure
// interface MovieResponse<T> {
//   page: number;
//   results: T[];
//   total_results: number;
//   total_pages: number;
// }

// // Define the movie type (you can extend this based on your API response)
// export interface Movie {
//   id: number;
//   title: string;
//   poster_path: string;
//   release_date: string;
//   vote_average: number;
//   overview: string;
//   // Add other movie properties as needed
// }

// export const useGetMoviesListByPopularity = <T = Movie>(query?: string) => {
//   const endPoint = query
//     ? `/search/movie?query=${encodeURIComponent(query)}`
//     : `/discover/movie?sort_by=popularity.desc`;

//   const { data, isLoading, error } = useQuery<MovieResponse<T>, Error>({
//     queryKey: ['movie', query ? 'search' : 'popularity', query],
//     queryFn: async (): Promise<MovieResponse<T>> => {
//       const response = await api.get(endPoint);
//       return response.data;
//     },
//   });

//   return { data, isLoading, error };
// };
