export interface UploadedFile {
    name: string;
    size: number;
    createdAt: string;
}

export async function fetchUploadedFiles(): Promise<UploadedFile[]> {
    const res = await fetch('/api/files');

    if (!res.ok) {
        throw new Error(`Failed to fetch files: ${res.status}`);
    }

    const data: unknown = await res.json();

    if (
        typeof data === 'object' &&
        data !== null &&
        'files' in data &&
        Array.isArray((data as { files: unknown }).files)
    ) {
        return (data as { files: UploadedFile[] }).files;
    }

    throw new Error('Unexpected response format from /api/files');
}
