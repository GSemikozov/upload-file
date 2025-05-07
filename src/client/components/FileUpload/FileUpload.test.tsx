import { render, screen, fireEvent } from '@testing-library/react';

import '@testing-library/jest-dom';
import FileUpload from './FileUpload';

test('renders file input and handles upload', () => {
    const mockSubmit = jest.fn();
    render(<FileUpload onSubmit={mockSubmit} />);

    const input = screen.getByLabelText(/upload a file/i);
    expect(input).toBeInTheDocument();

    const file = new File(['test'], 'test.txt', { type: 'text/plain' });
    fireEvent.change(input, { target: { files: [file] } });

    // todo: can't fully test uploadFile without mocking the fetch or uploadFile fn
});
