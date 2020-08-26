import React from 'react';
import { render } from '../../../../test-utils/testUtils';
import { FilePicker } from './FilePicker';

test('should render a button element', () => {
  const { getByText } = render(<FilePicker />);

  const input = getByText('Select files...');

  expect(input).toBeInTheDocument();
});
