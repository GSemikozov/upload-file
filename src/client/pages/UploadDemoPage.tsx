import { useEffect, useState } from 'react';
import FileUpload from '../components/FileUpload/FileUpload';

type UploadedFile = {
    name: string;
    size: number;
};

function UploadDemoPage() {
    const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

    const fetchUploadedFiles = async () => {
        const res = await fetch('/api/files');
        const data = await res.json();
        setUploadedFiles(data.files);
    };

    const handleUpload = async () => {
        await fetchUploadedFiles();
    };

    useEffect(() => {
        fetchUploadedFiles();
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
