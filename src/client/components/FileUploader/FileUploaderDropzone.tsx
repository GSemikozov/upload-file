import cn from 'classnames';
import { UploadCloud } from 'lucide-react';
import React, { useContext, useState, forwardRef } from 'react';

import { FileUploaderContext } from './FileUploaderContext';
import { arrayToCsv } from './utils';

export interface FileUploaderDropzoneProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    acceptedMimeTypes?: string[];
    onInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    // TODO: implement drag-n-drop
}

export const FileUploaderDropzone = forwardRef<HTMLInputElement, FileUploaderDropzoneProps>(
    ({ acceptedMimeTypes = [], onInputChange }, ref) => {
        const { id, disabled, name, required } = useContext(FileUploaderContext);
        const [fileInputKey, setFileInputKey] = useState(0);

        const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            setFileInputKey((prev) => prev + 1);
            onInputChange?.(event);
        };

        return (
            <label
                htmlFor={id}
                className={cn(
                    'flex flex-col items-center justify-center border-2 border-dashed rounded-lg px-6 py-10 text-center transition-colors',
                    disabled
                        ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-white border-gray-300 text-gray-700 hover:border-blue-400 hover:bg-blue-50 cursor-pointer'
                )}
            >
                {/* Icon container */}
                <div className="mb-2 pointer-events-none">
                    <UploadCloud className={cn('w-8 h-8', disabled ? 'text-gray-400' : 'text-gray-500')} />
                </div>

                <div className="text-sm font-medium pointer-events-none">Click to upload</div>

                <input
                    id={id}
                    ref={ref}
                    key={fileInputKey}
                    type="file"
                    name={name}
                    required={required}
                    disabled={disabled}
                    accept={arrayToCsv(acceptedMimeTypes)} // todo: let's add const
                    onChange={handleInputChange}
                    className="sr-only"
                    // {...props} // todo: pass props safely
                />
            </label>
        );
    }
);

FileUploaderDropzone.displayName = 'FileUploaderDropzone';
