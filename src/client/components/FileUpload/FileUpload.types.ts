export interface FileUploadProps {
    /**
     * Callback function triggered after a file is successfully uploaded.
     * Can be used to refresh file lists or show notifications.
     */
    onUpload: (uploadedFileName: string) => void;

    /**
     * Optional label text for the file input field.
     * Defaults to "Upload a file".
     */
    label?: string;

    /**
     * Acceptable file types (e.g., "image/*", ".pdf", etc.).
     * Passed directly to the `<input type="file">` accept attribute.
     */
    accept?: string;

    /**
     * Whether multiple files can be selected.
     * Currently only one file is supported in the handler, but this makes the component extensible.
     */
    multiple?: boolean;
}
