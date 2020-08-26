import React from 'react';
import { render } from '../../../../test-utils/testUtils';
import { Badge } from './Badge';
import { theme } from '../../theme';

test('should render children', () => {
  const { getByText } = render(<Badge color='#333'>Test Badge</Badge>);

  const text = getByText('Test Badge');

  expect(text).toBeInTheDocument();
});

test('should apply a theme color prop', () => {
  const { getByText } = render(<Badge color='primary'>Test Badge</Badge>);

  const text = getByText('Test Badge');

  expect(text).toHaveStyle(`background-color: ${theme.palette.primary}`);
});

test('should apply a custom color prop', () => {
  const { getByText } = render(<Badge color='#333'>Test Badge</Badge>);

  const text = getByText('Test Badge');

  expect(text).toHaveStyle('background-color: #333');
});
