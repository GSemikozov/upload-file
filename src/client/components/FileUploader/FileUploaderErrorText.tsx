import cn from 'classnames';
import React, { useContext, forwardRef, type HTMLAttributes } from 'react';

import { FileUploaderContext } from './FileUploaderContext';

export interface FileUploaderErrorTextProps extends HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    className?: string;
}

export const FileUploaderErrorText = forwardRef<HTMLDivElement, FileUploaderErrorTextProps>(
    ({ children, className, ...props }, ref) => {
        const { id } = useContext(FileUploaderContext);

        return (
            <div
                ref={ref}
                id={id ? `${id}-error-text` : undefined}
                role="alert"
                className={cn('text-sm text-red-600 mt-2', className)}
                {...props}
            >
                {children}
            </div>
        );
    }
);

FileUploaderErrorText.displayName = 'FileUploaderErrorText';
