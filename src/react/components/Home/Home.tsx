import React,
{ useState } from 'react';
import styled from 'styled-components';
import { FilePicker } from '../FilePicker';
import { Grid } from '../Grid';
import { FileList } from '../FileList';

const File = styled.div((props) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  backgroundColor: props.theme.palette.background.secondary,
  padding: props.theme.spacing(2),
  borderRadius: props.theme.shapes.borderRadius
}));

export const Home = () => {
  const [selectedFiles, setSelectedFiles] = useState<Array<File>>([]);

  const handleFiles = (files: Array<File>) => {
    setSelectedFiles(files);
  };

  return (
    <Grid
      justifyContent='center'
      alignItems='center'
      flexDirection='column'
    >
      <FilePicker onChange={handleFiles} />
      <FileList files={selectedFiles} />
    </Grid>
  );
};
