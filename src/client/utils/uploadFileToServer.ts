export async function uploadFileToServer(file: File): Promise<void> {
    const formData = new FormData();
    formData.append('file', file, file.name);

    const res = await fetch('/api/upload-single', {
        method: 'POST',
        body: formData,
    });

    if (!res.ok) {
        try {
            const data: unknown = await res.json();
            if (
                typeof data === 'object' &&
                data !== null &&
                'message' in data &&
                typeof (data as { message: unknown }).message === 'string'
            ) {
                throw new Error((data as { message: string }).message);
            }

            throw new Error(`Upload failed (${res.status})`);
        } catch {
            throw new Error(`Upload failed (${res.status})`);
        }
    }
}
