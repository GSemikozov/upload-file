import cn from 'classnames';
import { useContext, forwardRef, type HTMLAttributes } from 'react';

import { FileUploaderItemContext } from './FileUploaderItemContext';

export interface FileUploaderItemDescriptionProps extends HTMLAttributes<HTMLDivElement> {
    children: string;
    className?: string;
}

export const FileUploaderItemDescription = forwardRef<HTMLDivElement, FileUploaderItemDescriptionProps>(
    ({ children, className, ...props }, ref) => {
        const { variant } = useContext(FileUploaderItemContext);

        return (
            <div
                ref={ref}
                className={cn(
                    'text-xs truncate',
                    {
                        'text-red-600': variant === 'error',
                        'text-gray-500': variant !== 'error',
                    },
                    className
                )}
                {...props}
            >
                {children}
            </div>
        );
    }
);

FileUploaderItemDescription.displayName = 'FileUploaderItemDescription';
