import {useState, useEffect} from 'react';
import movieDB from '../api/movieDB';
import {MovieFull} from '../interfaces/movieInterface';
import {CreditsResponse, Cast} from '../interfaces/creditsInterface';

interface MovieDetail {
  isLoading: boolean;
  movieFull: MovieFull | undefined;
  cast: Cast[];
}

export const useMovieDetails = (movieId: number) => {
  const [state, setState] = useState<MovieDetail>({
    isLoading: true,
    movieFull: undefined,
    cast: [],
  });

  const getMovieDetails = async () => {
    try {
      const movieDetailPromise = movieDB.get<MovieFull>(`/${movieId}`);
      const castPromise = movieDB.get<CreditsResponse>(`/${movieId}/credits`);

      const [movieDetailResp, castResp] = await Promise.all([
        movieDetailPromise,
        castPromise,
      ]);

      setState({
        isLoading: false,
        movieFull: movieDetailResp.data,
        cast: castResp.data.cast,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMovieDetails();
  }, []);

  return {
    ...state,
  };
};
