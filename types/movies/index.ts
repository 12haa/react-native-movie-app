export interface DataItemMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string; // You might want to use Date if you need date-specific operations
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
