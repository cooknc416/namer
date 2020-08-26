import React,
{
  useEffect,
  useState 
} from 'react';
import styled from 'styled-components';
import {
  unit,
  max, 
  mean
} from 'mathjs';
import { format } from 'date-fns';
import { Icon } from '../Icon';
import {
  Badge,
  StyledBadge 
} from '../Badge';
import { searchMovie } from '../../services/moviedb';
import { MovieMetadata } from '../../../types';

const POSTER_URL = 'https://image.tmdb.org/t/p/';

const byteMap: { [key:string]: string; } = {
  gigabyte: 'GB',
  megabyte: 'MB',
  kilobyte: 'KB'
};

const rateMap: { [key:string]: string; } = {
  gigabyte: 'GB/s',
  megabyte: 'MB/s',
  kilobyte: 'KB/s'
};

const BadgeList = styled.div((props) => ({
  [StyledBadge]: {
    margin: props.theme.spacing(0.5)
  }
}));

const File = styled.div((props) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: props.theme.palette.background.secondary,
  padding: props.theme.spacing(1),
  margin: props.theme.spacing(1),
  borderRadius: props.theme.shapes.borderRadius,
  userSelect: 'none'
}));

const StyledMetadata = styled.div((props) => ({
  display: 'flex',
  padding: props.theme.spacing(1),
  width: '100%',
  fontSize: props.theme.font.size.small
}));

const Poster = styled.img((props) => ({
  borderRadius: props.theme.shapes.borderRadius,
  marginRight: props.theme.spacing(1)
}));

const Synopsis = styled.div((props) => ({
  marginTop: props.theme.spacing(1),
  maxWidth: 300
}));

interface MetadataProps {
  metadata: MovieMetadata;
}

export const Metadata = (props: MetadataProps) => {
  const { metadata } = props;

  return (
    <StyledMetadata>
      <Poster
        src={`${POSTER_URL}w92/${metadata.poster_path}`}
        alt={metadata.title}
      />
      <div>
        <strong>{metadata.title}</strong>
        {` (${format(new Date(metadata.release_date), 'yyyy')}) `}
        <Synopsis>{metadata.overview}</Synopsis>
      </div>
    </StyledMetadata>
  );
};

export interface FileFormat {
  bit_rate: number;
  duration: number;
  filename: string;
  format_long_name: string;
  format_name: string;
  nb_programs: number;
  nb_streams: number;
  probe_score: number;
  size: number;
  start_time: number;
  tags: {encoder: string, creation_time: string};
}

export interface VideoInfo {
  streams: Array<any>;
  chapters: Array<any>;
  format: FileFormat;
}

interface FileListItemProps {
  file: VideoInfo;
}

export const FileListItem = (props: FileListItemProps) => {
  const { file } = props;
  const [metadata, setMetaData] = useState<MovieMetadata>();

  const selectMatch = (data: Array<MovieMetadata>): void => {
    const maxPopularity = max(data.map((item) => item.popularity));
    const meanPopularity = mean(data.map((item) => item.popularity));

    if (maxPopularity / 4 > meanPopularity) {
      setMetaData(data[0]);
    }
  };

  const searchForMovie = async () => {
    try {
      const filename = file.format.filename.substring(file.format.filename.lastIndexOf('/') + 1);
      const { results } = await searchMovie(filename);
      selectMatch(results);
    } catch (error) {
      console.error(error);
    }
  };

  const getFileSize = (size: number): string => {
    const rawString = unit(size, 'byte').toString();
    const [num, unitStr] = rawString.split(' ');
    const trimmedNum = num.substring(0, 4);
    return `${trimmedNum} ${byteMap[unitStr]}`;
  };

  const getBitRate = (rate: number): string => {
    const rawString = unit(rate, 'byte').toString();
    const [num, unitStr]: Array<string> = rawString.split(' ');
    const trimmedNum = num.substring(0, 4);
    return `${trimmedNum} ${rateMap[unitStr]}`;
  };

  const getDuration = (sec: number): string => {
    const hrs = Math.floor(sec / 3600);
    const min = Math.floor((sec - (hrs * 3600)) / 60);
    let seconds = Math.round(sec - (hrs * 3600) - (min * 60));
    seconds = Math.round(seconds * 100) / 100;
    return `${hrs}:${min < 10 ? `0${min}` : min}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  useEffect(() => {
    searchForMovie();
  }, []);

  return (
    <File>
      <div>
        {file.format.filename.substring(file.format.filename.lastIndexOf('/') + 1)}
      </div>
      <BadgeList>
        <Badge
          color='primary'
          size='sm'
        >
          <Icon icon='file-video' />
          <span>{file.format.format_long_name}</span>
        </Badge>
        <Badge
          color='primary'
          size='sm'
        >
          <Icon icon='weight-hanging' />
          <span>{getFileSize(file.format.size)}</span>
        </Badge>
        <Badge
          color='primary'
          size='sm'
        >
          <Icon icon='chart-area' />
          <span>{getBitRate(file.format.bit_rate)}</span>
        </Badge>
        <Badge
          color='primary'
          size='sm'
        >
          <Icon icon='stopwatch' />
          <span>{getDuration(file.format.duration)}</span>
        </Badge>
      </BadgeList>
      {metadata && (<Metadata metadata={metadata} />)}
    </File>
  );
};
