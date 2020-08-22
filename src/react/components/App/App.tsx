import React from 'react';
import styled,
{ ThemeProvider } from 'styled-components';
import { library } from '@fortawesome/fontawesome-svg-core';
import { Home } from '../Home';
import {
  theme,
  GlobalStyle
} from '../../theme';
import { Grid } from '../Grid';
import * as icons from './icons';

library.add(icons);

const StyledApp = styled.div((props) => ({
  height: '100%',
  width: '100%',
  fontFamily: '"Work Sans", serif',
  padding: props.theme.spacing(2)
}));

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <StyledApp>
        <Grid
          justifyContent='center'
          alignItems='center'
          flexDirection='column'
        >
          <h2>Welcome to Namer</h2>
          <Home />
        </Grid>
      </StyledApp>
    </ThemeProvider>
  );
};
