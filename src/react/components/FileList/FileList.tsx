import React,
{ useState } from 'react';
import { ipcRenderer } from 'electron';
import { IpcRendererEvent } from 'electron/main';
import { Grid } from '../Grid';
import { FileListItem } from './FileListItem';

export const FileList = () => {
  const [files, setFiles] = useState<Array<FileData>>([]);

  ipcRenderer.on('video-data-async', (event: IpcRendererEvent, file: FileData) => {
    setFiles([...files, file]);    
  });

  return (
    <Grid
      justifyContent='center'
      alignItems='center'
      flexDirection='column'
    >
      {files.map((file: FileData) => (
        <FileListItem
          key={file.videoInfo.format.filename}
          file={file}
        />
      ))}
    </Grid>
  );
};
