import 'regenerator-runtime/runtime';
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
import * as icons from '../Icon/icons';

library.add(icons);

const StyledApp = styled.div((props) => ({
  height: '100%',
  width: '100%',
  fontFamily: '"Work Sans", serif',
  padding: props.theme.spacing(2)
}));

const Logo = styled.h1({
  fontFamily: '"Sora"',
  fontSize: '4.209em'
});

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
          <Logo>Namer</Logo>
          <Home />
        </Grid>
      </StyledApp>
    </ThemeProvider>
  );
};
