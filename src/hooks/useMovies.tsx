import {useEffect, useState} from 'react';
import movieDB from '../api/movieDB';
import {MovieDbResponse, Movie} from '../interfaces/movieInterface';

interface MoviesState {
  nowPlaying: Movie[];
  popular: Movie[];
  topRated: Movie[];
  upcoming: Movie[];
}

export const useMovies = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [moviesState, setMoviesState] = useState<MoviesState>({
    nowPlaying: [],
    popular: [],
    topRated: [],
    upcoming: [],
  });

  const getMovies = async () => {
    try {
      const nowPlayingPromise = movieDB.get<MovieDbResponse>('/now_playing');
      const popularPromise = movieDB.get<MovieDbResponse>('/popular');
      const topRatedPromise = movieDB.get<MovieDbResponse>('/top_rated');
      const upcomingPromise = movieDB.get<MovieDbResponse>('/upcoming');

      const resp = await Promise.all([
        nowPlayingPromise,
        popularPromise,
        topRatedPromise,
        upcomingPromise,
      ]);

      setMoviesState({
        nowPlaying: resp[0].data.results,
        popular: resp[1].data.results,
        topRated: resp[2].data.results,
        upcoming: resp[3].data.results,
      });

      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return {
    ...moviesState,
    isLoading,
  };
};
