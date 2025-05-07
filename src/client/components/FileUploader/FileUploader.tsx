import cn from 'classnames';
import React, { useId, useMemo, forwardRef, type HTMLAttributes } from 'react';

import { FileUploaderContext } from './FileUploaderContext';

export interface FileUploaderProps extends HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    disabled?: boolean;
    id?: string;
    name: string;
    required?: boolean;
    className?: string;
}

export const FileUploader = forwardRef<HTMLDivElement, FileUploaderProps>(
    ({ disabled, id: idProp, name, required = false, className, children, ...props }, ref) => {
        const uniqueId = useId();
        const id = idProp || uniqueId;
        const contextValue = useMemo(() => ({ disabled, id, name, required }), [disabled, id, name, required]);

        return (
            <FileUploaderContext.Provider value={contextValue}>
                <div ref={ref} className={cn('max-w-md', className)} {...props}>
                    {children}
                </div>
            </FileUploaderContext.Provider>
        );
    }
);

FileUploader.displayName = 'FileUploader';
