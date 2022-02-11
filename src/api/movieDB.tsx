import axios from 'axios';

const movieDB = axios.create({
  baseURL: 'http://api.themoviedb.org/3/movie',
  params: {
    api_key: 'ae83d6ea3011de0865fbf939ba0ef06a',
    language: 'es-ES',
  },
});

export default movieDB;
