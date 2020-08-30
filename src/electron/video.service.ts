import ffmpeg from 'fluent-ffmpeg';
import {
  max, 
  mean
} from 'mathjs';
import { get } from './fetch.service';

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

export const processVideo = (path: string): Promise<VideoInfo> => {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(path, (error: string, videoInfo: any) => {
      if (error) reject(error);
      resolve(videoInfo);
    });
  });
};

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

const selectMatch = (data: Array<MovieMetadata>): Array<MovieMetadata> => {
  const maxPopularity = max(data.map((item) => item.popularity));
  const meanPopularity = mean(data.map((item) => item.popularity));

  if (maxPopularity / 4 > meanPopularity) {
    return [data[0]];
  }
  return data;
};

export const getVideoData = async (path: string): Promise<FileData | undefined> => {
  try {
    const videoInfo = await processVideo(path);
    const filename = path.substring(path.lastIndexOf('/') + 1);
    const { results } = await searchMovie(filename);
    const match = selectMatch(results);
    return {
      videoInfo,
      metadata: match[0]
    };
  } catch (error) {
    console.error(error);
  }
};
