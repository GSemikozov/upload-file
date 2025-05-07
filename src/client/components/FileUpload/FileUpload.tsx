import React, { useState, useRef } from 'react';

import { type FileUploadProps } from './FileUpload.types';

const MAX_SIZE = 1 * 1024 * 1024; // 1MB

function FileUpload({ label = 'Upload a file', accept, multiple = false, onSubmit }: FileUploadProps) {
    const [files, setFiles] = useState<File[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = Array.from(e.target.files ?? []);
        const tooLarge = selected.find((f) => f.size > MAX_SIZE);
        if (tooLarge) {
            setErrorMessage(`"${tooLarge.name}" exceeds 1MB limit.`);
            return;
        }

        setFiles(selected);
        setErrorMessage(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (files.length === 0) {
            return;
        }

        setIsUploading(true);
        setErrorMessage(null);

        try {
            await onSubmit?.(files);
            setFiles([]);
            if (inputRef.current) {
                inputRef.current.value = '';
            }
        } catch (error) {
            console.error('Upload failed:', error);
            setErrorMessage(error instanceof Error ? error.message : 'Upload error');
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-md p-4 border border-gray-300 rounded-lg">
            <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700 mb-2">
                {label}
            </label>
            <input
                id="file-upload"
                ref={inputRef}
                type="file"
                onChange={handleFileChange}
                accept={accept}
                multiple={multiple}
                className="block w-full text-sm text-gray-900 file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0 file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                aria-describedby={errorMessage ? 'upload-error' : undefined}
                aria-invalid={!!errorMessage}
            />
            {files.length > 0 && (
                <ul className="mt-2 text-sm text-gray-600">
                    {files.map((file) => (
                        <li key={file.name}>{file.name}</li>
                    ))}
                </ul>
            )}
            {errorMessage && (
                <p id="upload-error" role="alert" className="mt-2 text-sm text-red-600">
                    {errorMessage}
                </p>
            )}
            <button
                type="submit"
                className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                disabled={isUploading || files.length === 0}
            >
                {isUploading ? 'Uploading...' : 'Submit'}
            </button>
        </form>
    );
}

export default FileUpload;
