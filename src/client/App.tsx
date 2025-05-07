import { type ReactElement } from 'react';

import { FileUploaderCompositeField } from './components/FileUploaderCompositeField/FileUploaderCompositeField';

export const App = (): ReactElement => {
    return (
        <main className="min-h-screen flex justify-center bg-gray-50 p-4">
            <div className="w-full max-w-xl">
                <FileUploaderCompositeField
                    name="my-file"
                    label="Upload your documents"
                    helpText="Files must be less than 10MB. Only PDF, PNG, JPG are allowed."
                    acceptedMimeTypes={['application/pdf', 'image/png', 'image/jpeg']}
                />
            </div>
        </main>
    );
};
