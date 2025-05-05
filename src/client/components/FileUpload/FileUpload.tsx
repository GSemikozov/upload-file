import { useFileUpload } from './useFileUpload';
import { FileUploadProps } from './FileUpload.types';

function FileUpload({ onUpload, label = 'Upload a file' }: FileUploadProps) {
    const { inputRef, handleChange, isUploading } = useFileUpload({ onUpload });

    return (
        <div className="w-full max-w-md p-4 border border-gray-300 rounded-lg">
            <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700 mb-2">
                {label}
            </label>
            <input
                id="file-upload"
                ref={inputRef}
                type="file"
                onChange={handleChange}
                className="block w-full text-sm text-gray-900 file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700
          hover:file:bg-blue-100"
                aria-busy={isUploading}
            />
        </div>
    );
}

export default FileUpload;
