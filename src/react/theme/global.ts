import { createGlobalStyle } from 'styled-components';

import WorkSans from '../assets/fonts/WorkSans-VariableFont_wght.ttf';
import { theme } from './theme';

export const GlobalStyle = createGlobalStyle`
    body {
      -webkit-font-smoothing: antialiased;
      box-sizing: border-box;
      margin: 0;
      color: ${theme.palette.text.primary};
      background-color: ${theme.palette.background.main};
    }
    *, *::before, *::after {
      box-sizing: inherit;
    }
    *:focus {
      outline: none;
    }
    h1 {
      font-weight: 300;
      margin: 0;
      margin-bottom: .5rem;
    }
    h2 {
      font-weight: 600;
      margin: 0;
      margin-bottom: .5rem;
    }
    @font-face {
        font-family: 'Work Sans';
        src: url(${WorkSans}) format('truetype');
        font-weight: 400;
        font-style: normal;
    }
`;
