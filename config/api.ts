import axios from 'axios';
export const TMDB_CONFIG = {
  BASE_URL: 'https://api.themoviedb.org/3',
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
  },
};
const api = axios.create({
  baseURL: TMDB_CONFIG.BASE_URL,
  headers: TMDB_CONFIG.headers,
});

export default api;
