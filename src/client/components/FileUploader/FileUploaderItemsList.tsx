import cn from 'classnames';
import React, { type HTMLAttributes, forwardRef } from 'react';

export interface FileUploaderItemsListProps extends HTMLAttributes<HTMLUListElement> {
    children?: React.ReactNode;
    className?: string;
}

export const FileUploaderItemsList = forwardRef<HTMLUListElement, FileUploaderItemsListProps>(
    ({ children, className, ...props }, ref) => {
        return (
            <ul ref={ref} className={cn('flex flex-col gap-4 mt-6 list-none p-0', className)} {...props}>
                {children}
            </ul>
        );
    }
);

FileUploaderItemsList.displayName = 'FileUploaderItemsList';
