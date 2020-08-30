import {
  FfprobeStream,
  FfprobeData, 
  FfprobeFormat
} from 'fluent-ffmpeg';

export {};

declare global {
  interface MovieMetadata {
    popularity: number;
    vote_count: number;
    video: boolean;
    poster_path: string;
    id: number;
    adult: boolean;
    backdrop_path: string;
    original_language: string;
    original_title: string;
    genre_ids: Array<number>;
    title: string;
    vote_average: number;
    overview: string;
    release_date: string;
  }
  
  interface FileFormat extends FfprobeFormat {}
  
  interface VideoInfo extends FfprobeData {
    streams: Array<Stream>;
  }
  
  interface FileData {
    videoInfo: VideoInfo;
    metadata: MovieMetadata;
  }

  interface FileRenameData {
    currentPath: string;
    format: RenameFormat;
    videoInfo: VideoInfo;
    metadata: MovieMetadata;
  }

  interface Stream extends FfprobeStream {
    codec_type: 'video' | 'audio' | 'subtitle';
  }

  interface RenameFormat {
    string: string;
    delimiter: '.' | '_' | ' ';
  }
}
