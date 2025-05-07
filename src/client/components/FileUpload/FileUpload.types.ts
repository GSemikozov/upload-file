export interface FileUploadProps {
    label?: string;
    accept?: string;
    multiple?: boolean;
    onSubmit?: (files: File[]) => Promise<void>;
}
