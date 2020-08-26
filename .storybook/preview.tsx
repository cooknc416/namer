import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme, GlobalStyle } from '../src/react/theme';
import { library } from '@fortawesome/fontawesome-svg-core';
import * as icons from '../src/react/components/Icon/icons';

library.add(icons);

export const decorators = [
  (Story: React.ComponentType) => (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Story />
    </ThemeProvider>
  ),
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}