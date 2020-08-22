import { get } from './fetch';
import { MovieMetadata } from '../../types';

const API_KEY = process.env.MOVIEDB_API_KEY_V4;
const MOVIE_DB_URL = 'https://api.themoviedb.org/4/';

const SPECIAL_REGEXP = new RegExp('[^A-Za-z0-9]', 'g');
const YEAR_REGEXP = new RegExp('(19|20)\\d{2}', 'g');
const NUMBER_REGEXP = new RegExp('[0-9]', 'g');
const FILTER_WORDS = [
  'the',
  'and',
  'a',
  'i'
];

const extractFileMetadata = (filename: string): { name: string, year: string } => {
  const despecializedName = filename.replace(SPECIAL_REGEXP, ' ').split(' ');
  const nameArray = despecializedName.slice(0, despecializedName.length - 1);
  let year = '';
  const potentialArray: Array<string> = [];
  nameArray.forEach((string) => {
    const searchString = string.trim().toLowerCase();
    // Check if string is a year
    if (YEAR_REGEXP.test(searchString)) {
      year = searchString;
      return;
    }

    // Check if string is a word
    if (!NUMBER_REGEXP.test(searchString) && !FILTER_WORDS.includes(searchString)) {
      potentialArray.push(searchString);
    }
  });

  const name = potentialArray.slice(0, 2).join(' ');

  return {
    name,
    year
  };
};

export interface MovieSearchResponse {
  page: number;
  results: Array<MovieMetadata>;
  total_pages: number;
  total_results: number;
}

export const searchMovie = (filename: string): Promise<MovieSearchResponse> => {
  const requestOptions = {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      'Content-Type': 'application/json;charset=utf-8'
    }
  };

  const {
    name
    // year 
  } = extractFileMetadata(filename);

  const safeName = name.replace(SPECIAL_REGEXP, ' ');

  const requestParams = {
    query: safeName
  };

  return get(`${MOVIE_DB_URL}search/movie`, requestOptions, requestParams);
};
