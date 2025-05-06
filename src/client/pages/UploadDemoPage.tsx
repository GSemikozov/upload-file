import { useEffect, useState } from 'react';

import FileUpload from '../components/FileUpload/FileUpload';

type UploadedFile = {
    name: string;
    size: number;
};

type FilesResponse = {
    files: UploadedFile[];
};

function UploadDemoPage() {
    const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

    const fetchUploadedFiles = async () => {
        try {
            const res = await fetch('/api/files');
            if (!res.ok) {
                throw new Error('Failed to fetch files');
            }

            const data: unknown = await res.json();
            if (
                typeof data === 'object' &&
                data !== null &&
                'files' in data &&
                Array.isArray((data as FilesResponse).files)
            ) {
                setUploadedFiles((data as FilesResponse).files);
            } else {
                throw new Error('Unexpected response format');
            }
        } catch (error) {
            console.error('Error fetching files:', error);
        }
    };

    const handleUpload = async () => {
        await fetchUploadedFiles();
    };

    useEffect(() => {
        fetchUploadedFiles().catch((error) => {
            console.error('Error in useEffect:', error);
        });
    }, []);

    return (
        <div className="p-8 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Upload a file</h1>
            <FileUpload onUpload={handleUpload} />

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
