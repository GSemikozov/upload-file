import { useRef, useState } from 'react';
import { uploadFile } from '../../lib/uploadFile';

interface UseFileUploadProps {
    onUpload: (url: string) => void;
}

export function useFileUpload({ onUpload }: UseFileUploadProps) {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        try {
            const uploadedUrl = await uploadFile(file);
            onUpload(uploadedUrl);
        } catch (error) {
            console.error('Upload failed', error);
        } finally {
            setIsUploading(false);
        }
    };

    return { inputRef, handleChange, isUploading };
}
