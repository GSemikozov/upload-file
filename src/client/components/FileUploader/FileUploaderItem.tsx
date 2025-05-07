import cn from 'classnames';
import { FileX, Loader2, Trash2, X, FileText } from 'lucide-react';
import React, { type LiHTMLAttributes } from 'react';

import { FileUploaderItemContext } from './FileUploaderItemContext';

export interface FileUploaderItemProps extends LiHTMLAttributes<HTMLLIElement> {
    variant?: 'default' | 'error' | 'loading';
    fileIcon?: React.ReactNode;
    onButtonClick?: () => void;
}

export const FileUploaderItem: React.FC<FileUploaderItemProps> = ({
    variant = 'default',
    fileIcon,
    onButtonClick,
    ...props
}) => {
    const icon =
        variant === 'loading' ? (
            <Loader2 className="w-5 h-5 animate-spin text-gray-500" />
        ) : variant === 'error' ? (
            <FileX className="w-5 h-5 text-red-600" />
        ) : (
            fileIcon ?? <FileText className="w-5 h-5 text-gray-500" />
        );

    const buttonIcon =
        variant === 'error' || variant === 'loading' ? (
            <X className="w-4 h-4 text-gray-500" />
        ) : (
            <Trash2 className="w-4 h-4 text-gray-500" />
        );

    return (
        <FileUploaderItemContext.Provider value={{ variant }}>
            <li
                className={cn('grid grid-cols-[auto_1fr_auto] items-center gap-4 p-4 border rounded-md', {
                    'border-gray-200 bg-white': variant === 'default' || variant === 'loading',
                    'border-red-300 bg-red-50': variant === 'error',
                })}
                {...props}
            >
                <div>{icon}</div>
                <div className="flex flex-col gap-1 overflow-hidden">{props.children}</div>
                <button
                    type="button"
                    onClick={onButtonClick}
                    aria-label="Remove file"
                    className="p-1 hover:text-red-600 focus:outline-none"
                >
                    {buttonIcon}
                </button>
            </li>
        </FileUploaderItemContext.Provider>
    );
};
