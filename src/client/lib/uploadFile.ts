export async function uploadFile(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('file', file, file.name);

    const res = await fetch('/api/upload-single', {
        method: 'POST',
        body: formData,
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Upload failed');
    }

    return file.name; // Assuming you want to return the filename for now
}
