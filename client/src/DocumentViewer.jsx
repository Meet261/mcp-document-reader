
import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function DocumentViewer({ url, onRead }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const nextPage = () => setPageNumber((p) => Math.min(p + 1, numPages));
  const prevPage = () => setPageNumber((p) => Math.max(p - 1, 1));

  return (
    <div>
      <div className="my-4">
        <Document file={url} onLoadSuccess={({ numPages }) => setNumPages(numPages)}>
          <Page pageNumber={pageNumber} />
        </Document>
        <p>Page {pageNumber} of {numPages}</p>
      </div>
      <div className="flex justify-center gap-4">
        <button onClick={prevPage}>⬅️ Prev</button>
        <button onClick={() => onRead(url, pageNumber)}>🗣️ Read This Page</button>
        <button onClick={nextPage}>Next ➡️</button>
      </div>
    </div>
  );
}

function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(utterance);
}
