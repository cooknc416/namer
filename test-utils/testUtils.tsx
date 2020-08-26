/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import {
  render,
  RenderOptions 
} from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../src/react/theme';

interface RendererProps {
  children: React.ReactElement;
}

const AllProviders = ({ children }: RendererProps) => {
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
};

const customRender = (ui: React.ReactElement, options?: RenderOptions) => render(ui, {
  wrapper: AllProviders as React.ComponentType,
  ...options 
});

export * from '@testing-library/react';
export { customRender as render };
