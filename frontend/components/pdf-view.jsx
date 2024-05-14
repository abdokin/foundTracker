"use client"
import { useState } from "react";
// import default react-pdf entry
import { Document, Page, pdfjs } from "react-pdf";
import workerSrc from "../pdf-worker";
import Link from "next/link";
import { Button } from "./ui/button";

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

export default function PDFViewer({ url }) {
  const [file, setFile] = useState(url);
  const [numPages, setNumPages] = useState(null);

  function onDocumentLoadSuccess({ numPages: nextNumPages }) {
    setNumPages(nextNumPages);
  }

  return (

    <div className="border rounded-md p-4  overflow-y-auto w-fit">
      <Link href={url} target='_blank'><Button>Open</Button></Link>
      <Document file={file} onLoadSuccess={onDocumentLoadSuccess} className={'mx-auto'}>
        <Page
          pageNumber={1}
          renderAnnotationLayer={false}
          renderTextLayer={false}
        />
      </Document>
    </div>
  );
}
