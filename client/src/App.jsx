
import { useState } from 'react';
import DocumentViewer from './DocumentViewer';
import { readPage } from './api';

export default function App() {
  const [url, setUrl] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4">📚 AI Document Reader</h1>
      {!submitted ? (
        <>
          <input
            className="border px-4 py-2 w-full"
            placeholder="Enter PDF URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button className="bg-blue-600 text-white px-6 py-2 mt-4 rounded" onClick={handleSubmit}>
            Upload & Read
          </button>
        </>
      ) : (
        <DocumentViewer url={url} onRead={readPage} />
      )}
    </div>
  );
}
