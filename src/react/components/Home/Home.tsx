import React from 'react';
import { FilePicker } from '../FilePicker';
import { Grid } from '../Grid';
import { FileList } from '../FileList';

export const Home = () => {
  return (
    <Grid
      justifyContent='center'
      alignItems='center'
      flexDirection='column'
    >
      <FilePicker />
      <FileList />
    </Grid>
  );
};
