import React from 'react';
import styled from 'styled-components';
import { ipcRenderer } from 'electron';
import { Grid } from '../Grid';

const File = styled.div((props) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  backgroundColor: props.theme.palette.background.secondary,
  padding: props.theme.spacing(2),
  borderRadius: props.theme.shapes.borderRadius
}));

interface FileListProps {
  files: Array<File>;
}

export const FileList = (props: FileListProps) => {
  const {
    files 
  } = props;

  ipcRenderer.on('video-data-async', (event: any, data: any) => {
    console.log(data);
  });

  return (
    <Grid
      justifyContent='center'
      alignItems='center'
      flexDirection='column'
    >
      {files.map((file: File) => <File key={file.name}>{file.name}</File>)}
    </Grid>
  );
};
