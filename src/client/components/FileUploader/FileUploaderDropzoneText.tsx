import cn from 'classnames';
import React, { useContext, forwardRef, type HTMLAttributes } from 'react';

import { FileUploaderContext } from './FileUploaderContext';

export interface FileUploaderDropzoneTextProps extends HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    className?: string;
}

export const FileUploaderDropzoneText = forwardRef<HTMLDivElement, FileUploaderDropzoneTextProps>(
    ({ children, className, ...props }, ref) => {
        const { id } = useContext(FileUploaderContext);

        return (
            <div
                id={id ? `${id}-dropzone-text` : undefined}
                ref={ref}
                className={cn('text-sm text-gray-600 mt-2 pointer-events-none', className)}
                {...props}
            >
                {children}
            </div>
        );
    }
);

FileUploaderDropzoneText.displayName = 'FileUploaderDropzoneText';
