import React from 'react';
import { render } from '../../../../test-utils/testUtils';
import { App } from './App';

test('should render', () => {
  const { getByText } = render(<App />);

  expect(getByText('Namer')).toBeTruthy();
});
