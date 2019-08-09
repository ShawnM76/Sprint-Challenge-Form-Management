import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/react/cleanup-after-each';

import Forms from './Forms';

describe('<Forms />', () => {
  it('renders without crashing', () => {
    render(<Forms />);
  });

  it('test for one element', () => {
    const { getByText } = render(<Forms />);
    getByText('SignUp');
  });

  it('test for one event', () => {
    const { getByText } = render(<Forms />);
    let button = getByText(/SignUp/i);
    fireEvent.click(button);
  });
});
