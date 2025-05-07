import cn from 'classnames';
import React, { type HTMLAttributes, forwardRef } from 'react';

export interface FileUploaderItemTitleProps extends HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode | string;
    className?: string;
}

export const FileUploaderItemTitle = forwardRef<HTMLDivElement, FileUploaderItemTitleProps>(
    ({ children, className, ...props }, ref) => {
        return (
            <div ref={ref} className={cn('text-sm font-medium text-gray-900 truncate', className)} {...props}>
                {children}
            </div>
        );
    }
);

FileUploaderItemTitle.displayName = 'FileUploaderItemTitle';
