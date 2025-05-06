import { type ReactElement } from 'react';

import UploadDemoPage from './pages/UploadDemoPage';

export const App = (): ReactElement => {
    return (
        <main className="relative isolate h-dvh">
            <UploadDemoPage />
        </main>
    );
};
