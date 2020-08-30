import { genreLookup } from '../constants/api';

const fsPromises = require('fs').promises;

const getDateString = (value: string, format: string): string => {
  const dateArray = value.split('-');
  switch (format) {
    case 'releaseYear':
      return dateArray[0];
    case 'releaseMonth':
      return dateArray[1];
    case 'releaseDay':
      return dateArray[2];
    default:
      return '';
  }
};

const displayToProperty: { [key: string]: any } = {
  voteCount: 'vote_count',
  video: 'video',
  originalLanguage: 'original_language',
  originalTitle: 'original_title',
  genre: {
    key: 'genre_ids',
    callback: (value: Array<string>) => genreLookup[value[0]]
  },
  allGenres: {
    key: 'genre_ids',
    callback: (value: Array<string>) => value.map((val) => genreLookup[val]).join(',')
  },
  title: 'title',
  rating: 'vote_average',
  overview: 'overview',
  releaseYear: {
    key: 'release_date',
    callback: (value: string) => getDateString(value, 'releaseYear')
  },
  releaseMonth: {
    key: 'release_date',
    callback: (value: string) => getDateString(value, 'releaseMonth')
  },
  releaseDay: {
    key: 'release_date',
    callback: (value: string) => getDateString(value, 'releaseDay')
  },
  releaseDate: 'release_date',
  codecName: {
    key: 'codec_name',
    callback: (value: string) => value.toUpperCase()
  },
  codecLongName: 'codec_long_name',
  profile: 'profile',
  width: 'width',
  height: 'height',
  codedWidth: 'coded_width',
  codedHeight: 'coded_height',
  aspectRatio: 'display_aspect_ratio',
  pixelFormat: 'pix_fmt',
  level: 'level',
  colorRange: 'color_range',
  colorSpace: 'color_space',
  colorTransfer: 'color_transfer',
  colorPrimaries: 'color_primaries',
  timeCode: 'timecode',
  frameRate: {
    key: 'avg_frame_rate',
    callback: (value: string): string => {
      const splt = value.split('/');
      return (parseInt(splt[0], 10) / parseInt(splt[1], 10)).toString();
    }
  },
  durationTs: 'duration_ts',
  duration: 'duration',
  bitRate: 'bit_rate',
  maxBitRate: 'max_bit_rate',
  bitsPerRawSample: 'bits_per_raw_sample',
  nbFrames: 'nb_frames',
  nbReadFrames: 'nb_read_frames',
  nbReadPackets: 'nb_read_packets',
  sampleFormat: 'sample_fmt',
  sampleRate: 'sample_rate',
  channels: {
    key: 'channels',
    callback: (value: string) => `${value}ch`
  },
  channelLayout: {
    key: 'channel_layout',
    callback: (value: string) => value.substring(0, value.indexOf('('))
  },
  bitsPerSample: 'bits_per_sample'
};

const generateNewFileName = (renameData: FileRenameData): string => {
  const {
    currentPath,
    format,
    videoInfo,
    metadata 
  } = renameData;

  const fileData: { [key: string]: any, video?: Stream, audio?: Stream, format?: FileFormat, metadata: MovieMetadata } = {
    metadata 
  };
  const filename = currentPath.substring(currentPath.lastIndexOf('/') + 1);
  const extension = filename.substring(filename.lastIndexOf('.'));
  const videoStream = videoInfo.streams.find((stream) => stream.codec_type === 'video');
  const audioStream = videoInfo.streams.find((stream) => stream.codec_type === 'audio');
  fileData.video = videoStream;
  fileData.audio = audioStream;
  fileData.format = videoInfo.format;

  const formatArray = format.string.split('|');
  const nameArray: Array<any> = [];

  formatArray.forEach((key) => {
    if (key in displayToProperty) {
      const lookupKey = displayToProperty[key];
      Object.keys(fileData).forEach((section) => {
        Object.entries(fileData[section]).forEach(([foundKey, value]) => {
          if (lookupKey.key === foundKey) {
            const funcVal = lookupKey.callback(value);
            nameArray.push(funcVal);
          }
          if (lookupKey === foundKey) nameArray.push(value);
        });
      });
    }
  });

  const delimitedNameArray = nameArray.map((val: string) => val.toString().replace(/ /, format.delimiter));

  return `${currentPath.substring(0, currentPath.lastIndexOf('/') + 1)}${delimitedNameArray.join(format.delimiter)}${extension}`;
};

export const renameFile = async (renameData: FileRenameData): Promise<any> => {
  try {
    const { currentPath } = renameData;
    const newPath = generateNewFileName(renameData);
    const response = await fsPromises.rename(currentPath, newPath);
    return response;
  } catch (error) {
    console.log(error);
  }
};
