import { Download } from 'lucide-react';
import React, { useEffect, useId, useState } from 'react';

import { fetchUploadedFiles } from '../../utils/fetchUploadedFiles';
import { uploadFileToServer } from '../../utils/uploadFileToServer';
import {
    FileUploader,
    FileUploaderLabel,
    FileUploaderHelpText,
    FileUploaderDropzone,
    FileUploaderDropzoneText,
    FileUploaderItemsList,
    FileUploaderItem,
    FileUploaderItemTitle,
    FileUploaderItemDescription,
    // FileUploaderErrorText, for further error handling
} from '../FileUploader';

interface FileItem {
    id: string;
    title: string;
    description: string;
    variant: 'default' | 'loading' | 'error';
}

interface FileUploaderCompositeFieldProps {
    name: string;
    label: string;
    helpText?: string;
    acceptedMimeTypes?: string[];
    maxFileSizeInMB?: number;
    multiple?: boolean;
}

export const FileUploaderCompositeField = ({
    name,
    label,
    helpText,
    acceptedMimeTypes = [],
    maxFileSizeInMB = 10,
    multiple = true,
}: FileUploaderCompositeFieldProps) => {
    const id = useId();
    const [files, setFiles] = useState<FileItem[]>([]);

    const maxSize = maxFileSizeInMB * 1024 * 1024;

    const refreshFiles = async () => {
        try {
            const serverFiles = await fetchUploadedFiles();

            const uploaded: FileItem[] = serverFiles.map((f) => ({
                id: `server-${f.name}`,
                title: f.name,
                description: `${(f.size / 1024).toFixed(1)} KB — uploaded`,
                variant: 'default',
            }));

            // Preserve error items
            setFiles((prev) => {
                const errorItems = prev.filter((f) => f.variant === 'error');
                return [...errorItems, ...uploaded];
            });
        } catch (error) {
            console.error('Failed to load uploaded files:', error);
        }
    };

    useEffect(() => {
        refreshFiles().catch((error) => {
            console.error('Failed to load uploaded files:', error);
        });
    }, []);

    const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        // Convert FileList into a proper array
        const selected = Array.from(e.target.files ?? []);

        // Build a list of "too large" files with error variant
        const tooLargeItems: FileItem[] = selected
            .filter((file) => file.size > maxSize)
            .map((file) => ({
                id: `error-${file.name}-${Date.now()}`,
                title: file.name,
                description: `Too large (${(file.size / 1024 / 1024).toFixed(2)} MB)`,
                variant: 'error',
            }));

        // Prepare a list for files that fail to upload due to server-side issues
        const failedUploads: FileItem[] = [];

        // Try uploading all valid files
        for (const file of selected) {
            if (file.size > maxSize) {
                continue; // Skip already handled too-large files
            }

            try {
                // Attempt to upload via our API
                await uploadFileToServer(file);
            } catch (error) {
                // If upload fails, track the error so it can be shown in the UI
                failedUploads.push({
                    id: `error-${file.name}-${Date.now()}`,
                    title: file.name,
                    description: (error as Error).message, // Show the error message from server
                    variant: 'error',
                });
            }
        }

        // Add error items to UI (prepend so they appear first)
        if (tooLargeItems.length > 0 || failedUploads.length > 0) {
            setFiles((prev) => [...tooLargeItems, ...failedUploads, ...prev]);
        }

        // Refresh the list from the server to display new uploaded files
        await refreshFiles();
    };

    const handleRemove = async (name: string) => {
        setFiles((prev) => prev.filter((f) => f.title !== name));

        try {
            await fetch(`/api/files/${encodeURIComponent(name)}`, {
                method: 'DELETE',
            });
        } catch (error) {
            console.error('Failed to delete file from server', error);
        }
    };

    return (
        <FileUploader id={id} name={name}>
            <FileUploaderLabel>{label}</FileUploaderLabel>
            {helpText && <FileUploaderHelpText>{helpText}</FileUploaderHelpText>}

            <FileUploaderDropzone
                acceptedMimeTypes={acceptedMimeTypes}
                multiple={multiple}
                onInputChange={handleInputChange}
            >
                <FileUploaderDropzoneText>Browse files here</FileUploaderDropzoneText>
            </FileUploaderDropzone>

            <FileUploaderItemsList>
                {files.map(({ id, title, description, variant }) => (
                    <FileUploaderItem
                        key={id}
                        variant={variant}
                        fileIcon={<Download className="w-5 h-5 text-gray-500" />}
                        onButtonClick={() => handleRemove(title)}
                    >
                        <FileUploaderItemTitle>
                            {variant === 'default' ? (
                                <a
                                    href={`/uploads/${encodeURIComponent(title)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 underline hover:text-blue-800"
                                >
                                    {title}
                                </a>
                            ) : (
                                title
                            )}
                        </FileUploaderItemTitle>
                        <FileUploaderItemDescription>{description}</FileUploaderItemDescription>
                    </FileUploaderItem>
                ))}
            </FileUploaderItemsList>
        </FileUploader>
    );
};
