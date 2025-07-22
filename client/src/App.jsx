import React, { useState, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import './App.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function App() {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState('');
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);
  const fileInputRef = useRef(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
    setIsLoaded(true);
  };

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile && uploadedFile.type === 'application/pdf') {
      setFile(uploadedFile);
      setUrl('');
      setIsLoaded(false);
    }
  };

  const handleUrlUpload = async () => {
    const enteredUrl = prompt('Enter PDF URL:');
    if (enteredUrl) {
      setUrl(enteredUrl);
      setFile(null);
      setIsLoaded(false);
    }
  };

  const handleReadPage = async () => {
    try {
      const response = await fetch('http://localhost:8000/read', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ page: pageNumber })
      });
      const data = await response.json();
      const utterance = new SpeechSynthesisUtterance(data.text);
      speechSynthesis.speak(utterance);
    } catch (err) {
      alert('Failed to read page.');
    }
  };

  const reset = () => {
    setFile(null);
    setUrl('');
    setNumPages(null);
    setPageNumber(1);
    setIsLoaded(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="app">
      <h1>📚 Document Reader</h1>

      {!file && !url && (
        <>
          <input type="file" accept="application/pdf" onChange={handleFileUpload} ref={fileInputRef} />
          <button className="upload-btn" onClick={handleUrlUpload}>Upload by URL</button>
        </>
      )}

      {(file || url) && (
        <>
          <Document
            file={file || url}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={() => alert('Failed to load document')}
          >
            <Page pageNumber={pageNumber} />
          </Document>

          {isLoaded && (
            <>
              <div className="controls">
                <button onClick={() => setPageNumber(p => Math.max(p - 1, 1))}>◀ Previous</button>
                <button className="read-btn" onClick={handleReadPage}>🔊 Read This Page</button>
                <button onClick={() => setPageNumber(p => Math.min(p + 1, numPages))}>Next ▶</button>
              </div>
              <p>Page {pageNumber} of {numPages}</p>
              <button className="start-btn" onClick={reset}>📄 Upload New Document</button>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default App;
