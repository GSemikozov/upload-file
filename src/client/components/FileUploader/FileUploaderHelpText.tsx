import cn from 'classnames';
import React, { useContext, forwardRef, type HTMLAttributes } from 'react';

import { FileUploaderContext } from './FileUploaderContext';

export interface FileUploaderHelpTextProps extends HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    className?: string;
}

export const FileUploaderHelpText = forwardRef<HTMLDivElement, FileUploaderHelpTextProps>(
    ({ children, className, ...props }, ref) => {
        const { id } = useContext(FileUploaderContext);

        return (
            <div
                ref={ref}
                id={id ? `${id}-help-text` : undefined}
                className={cn('text-sm text-gray-500 mt-2', className)}
                {...props}
            >
                {children}
            </div>
        );
    }
);

FileUploaderHelpText.displayName = 'FileUploaderHelpText';
