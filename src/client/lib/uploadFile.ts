export async function uploadFile(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('file', file, file.name);

    const res = await fetch('/api/upload-single', {
        method: 'POST',
        body: formData,
    });

    if (!res.ok) {
        let message = 'Upload failed';
        try {
            const errorData: unknown = await res.json();
            if (
                typeof errorData === 'object' &&
                errorData !== null &&
                'message' in errorData &&
                typeof (errorData as { message: unknown }).message === 'string'
            ) {
                message = (errorData as { message: string }).message;
            }
        } catch {
            if (res.status === 413) {
                message = 'File too large.';
            }
        }

        throw new Error(message);
    }

    return file.name;
}
