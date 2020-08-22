import React,
{ useState } from 'react';
import { ipcRenderer } from 'electron';
import { Grid } from '../Grid';
import { FileListItem } from './FileListItem';

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

export const FileList = () => {
  const [files, setFiles] = useState<Array<VideoInfo>>([]);

  ipcRenderer.on('video-data-async', (event: any, videoInfo: VideoInfo) => {
    setFiles([...files, videoInfo]);    
  });

  return (
    <Grid
      justifyContent='center'
      alignItems='center'
      flexDirection='column'
    >
      {files.map((file: VideoInfo) => (
        <FileListItem
          key={file.format.filename}
          file={file}
        />
      ))}
    </Grid>
  );
};
