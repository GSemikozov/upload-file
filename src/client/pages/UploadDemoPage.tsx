import { useEffect, useState } from 'react';

import FileUpload from '../components/FileUpload/FileUpload';
import { uploadFile } from '../lib/uploadFile';

type UploadedFile = {
    name: string;
    size: number;
};

function UploadDemoPage() {
    const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

    const fetchUploadedFiles = async () => {
        try {
            const res = await fetch('/api/files');
            const data: unknown = await res.json();
            if (
                typeof data === 'object' &&
                data !== null &&
                'files' in data &&
                Array.isArray((data as { files: unknown }).files)
            ) {
                setUploadedFiles((data as { files: UploadedFile[] }).files);
            }
        } catch (error) {
            console.error('Error fetching files:', error);
        }
    };

    useEffect(() => {
        fetchUploadedFiles().catch((error) => {
            console.error('Error fetching files on mount:', error);
        });
    }, []);

    const handleSubmitFiles = async (files: File[]) => {
        for (const file of files) {
            await uploadFile(file);
        }
        await fetchUploadedFiles(); // refresh AFTER all uploads
    };

    return (
        <div className="p-8 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Upload Files</h1>
            <FileUpload onSubmit={handleSubmitFiles} multiple />

            <h2 className="text-lg font-semibold mt-8 mb-2">Uploaded Files</h2>
            <ul className="space-y-2">
                {uploadedFiles.map((file) => (
                    <li key={file.name} className="border p-3 rounded bg-gray-50">
                        <div className="font-medium">{file.name}</div>
                        <div className="text-sm text-gray-600">{(file.size / 1024).toFixed(2)} KB</div>
                        <a
                            href={`/uploads/${file.name}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline text-sm"
                        >
                            View/Download
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default UploadDemoPage;
