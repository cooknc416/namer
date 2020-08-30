import React from 'react';
import styled from 'styled-components';
import { unit } from 'mathjs';
import { format } from 'date-fns';
import { ipcRenderer } from 'electron';
import { Icon } from '../Icon';
import {
  Badge,
  StyledBadge 
} from '../Badge';
import { Button } from '../Button';

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

interface FileListItemProps {
  file: FileData;
}

export const FileListItem = (props: FileListItemProps) => {
  const {
    file: {
      videoInfo,
      metadata 
    } 
  } = props;

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

  const onFileRename = () => {
    ipcRenderer.send('file-rename', {
      currentPath: videoInfo.format.filename,
      format: {
        string: 'title|releaseYear|height|genre',
        delimiter: '.'
      },
      videoInfo,
      metadata
    });
  };

  return (
    <File>
      <div>
        {videoInfo?.format?.filename?.substring(videoInfo?.format?.filename?.lastIndexOf('/') + 1)}
      </div>
      <BadgeList>
        <Badge
          color='primary'
          size='sm'
        >
          <Icon icon='file-video' />
          <span>{videoInfo.format.format_long_name}</span>
        </Badge>
        <Badge
          color='primary'
          size='sm'
        >
          <Icon icon='weight-hanging' />
          <span>{getFileSize(videoInfo.format.size as number)}</span>
        </Badge>
        <Badge
          color='primary'
          size='sm'
        >
          <Icon icon='chart-area' />
          <span>{getBitRate(videoInfo.format.bit_rate as number)}</span>
        </Badge>
        <Badge
          color='primary'
          size='sm'
        >
          <Icon icon='stopwatch' />
          <span>{getDuration(videoInfo.format.duration as number)}</span>
        </Badge>
      </BadgeList>
      {metadata && (<Metadata metadata={metadata} />)}
      <Button
        color='primary'
        onClick={onFileRename}
      >
        Rename
      </Button>
    </File>
  );
};
