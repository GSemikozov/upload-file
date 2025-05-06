import { render, screen, fireEvent } from '@testing-library/react';

import '@testing-library/jest-dom';
import FileUpload from './FileUpload';

test('renders file input and handles upload', () => {
    const mockUpload = jest.fn();
    render(<FileUpload onUpload={mockUpload} />);

    const input = screen.getByLabelText(/upload a file/i);
    expect(input).toBeInTheDocument();

    const file = new File(['test'], 'test.txt', { type: 'text/plain' });
    fireEvent.change(input, { target: { files: [file] } });

    // Can't fully test uploadFile without mocking the fetch or uploadFile fn
});
