import { fireEvent, render, screen } from '@testing-library/react';

import { Button } from '../button';

describe('Button tests', () => {
  it('Button render is OK', () => {
    const handler = jest.fn();

    render(<Button text='test-text' onClick={handler} />);

    const button = screen.getByText(/test-text/i);
    expect(button).toBeInTheDocument();

    fireEvent.click(button);

    expect(handler).toHaveBeenCalledTimes(1);
  });
});
