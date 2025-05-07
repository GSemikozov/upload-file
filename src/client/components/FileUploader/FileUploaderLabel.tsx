import cn from 'classnames';
import React, { useContext, forwardRef, type LabelHTMLAttributes } from 'react';

import { FileUploaderContext } from './FileUploaderContext';

export interface FileUploaderLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
    children: React.ReactNode;
    className?: string;
}

export const FileUploaderLabel = forwardRef<HTMLLabelElement, FileUploaderLabelProps>(
    ({ children, className, ...props }, ref) => {
        const { id, disabled, required } = useContext(FileUploaderContext);

        return (
            <label
                ref={ref}
                htmlFor={id}
                aria-disabled={disabled}
                className={cn(
                    'block text-sm font-medium text-gray-700 mb-1',
                    disabled && 'opacity-50 cursor-not-allowed',
                    className
                )}
                {...props}
            >
                {children}
                {required && <span className="text-red-600 ml-1">*</span>}
            </label>
        );
    }
);

FileUploaderLabel.displayName = 'FileUploaderLabel';
