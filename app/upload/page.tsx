"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useState, useRef } from "react";

const ParkinsonDetectionUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [url, setUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [uploadedSize, setUploadedSize] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    if (selectedFile) {
      if (!selectedFile.name.endsWith(".bdf")) {
        setErrorMessage("Please upload a valid BDF file.");
        return;
      }
      setFile(selectedFile);
      setUploadProgress(0);
      setUploadedSize(0);
      setErrorMessage("");

      // Auto-upload after file selection
      handleUpload(selectedFile);
    }
  };

  // Handle URL input change
  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  // Drag & Drop File Handling
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      if (!droppedFile.name.endsWith(".bdf")) {
        setErrorMessage("Please upload a valid BDF file.");
        return;
      }
      setFile(droppedFile);
      setUploadProgress(0);
      setUploadedSize(0);
      setErrorMessage("");

      // Auto-upload after file drop
      handleUpload(droppedFile);
    }
  };

  // Simulated file upload
  const handleUpload = (file: File) => {
    if (file) {
      const totalSize = file.size;
      const interval = setInterval(() => {
        setUploadProgress((prevProgress) => {
          if (prevProgress < 100) {
            const progressIncrement = 5;
            setUploadedSize((prevUploaded) => 
              Math.min(prevUploaded + (totalSize * progressIncrement) / 100, totalSize)
            );
            return prevProgress + progressIncrement;
          } else {
            clearInterval(interval);
            return 100;
          }
        });
      }, 500);
    } else if (url) {
      alert("URL uploaded: " + url);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="p-8 max-w-4xl mx-auto bg-white rounded-lg space-y-6 shadow-lg">
        <h1 className="text-3xl font-semibold mb-4 text-center text-gray-800">
          Parkinson’s Disease Detection with EEG Data
        </h1>

        <div className="mb-8 text-center">
          <p className="text-lg text-gray-600">
            Upload your EEG dataset in BDF format. Our system will analyze the EEG signals and provide insights into potential Parkinson’s disease symptoms.
          </p>
          <p className="mt-2 text-sm text-gray-500">Supported file type: BDF (.bdf).</p>
        </div>

        {/* Error Message */}
        {errorMessage && (
          <div className="mb-4 p-4 text-sm text-red-700 bg-red-100 border border-red-400 rounded-md">
            {errorMessage}
          </div>
        )}

        <div className="space-y-8">
          {/* Drag & Drop File Upload */}
          <div
            className="w-full h-40 border-2 border-blue-700 rounded-3xl border-dashed flex items-center justify-center cursor-pointer"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <p className="text-center text-gray-400">
              {file ? file.name : "Drag and drop your BDF file here or click to upload"}
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept=".bdf"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {/* URL Input */}
          <div className="w-full">
            <p>Import from URL</p>
            <Input
              type="text"
              placeholder="https://example.com/dataset.bdf"
              value={url}
              className="mt-2 text-gray-400"
              onChange={handleUrlChange}
            />
          </div>
        </div>

        {/* Progress Bar */}
        {uploadProgress > 0 && (
          <div className="mt-6">
            <Progress value={uploadProgress} className="w-full" />
          </div>
        )}

        {/* File Size and Uploaded Size */}
        {file && uploadProgress > 0 && (
          <div className="mt-4 text-center text-sm text-gray-500">
            <div>
              <strong>File Size:</strong>{" "}
              {Math.round(file.size / 1024 / 1024)} MB
            </div>
            <div>
              <strong>Uploaded:</strong>{" "}
              {Math.round(uploadedSize / 1024 / 1024)} MB /{" "}
              {Math.round(file.size / 1024 / 1024)} MB
            </div>
          </div>
        )}

        {/* Upload & Analyze Button */}
        <div className="mt-6 text-center">
          <Button
            onClick={() => handleUpload(file!)} 
            className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600"
          >
            {uploadProgress < 100 ? "Upload & Analyze" : "Analysis Completed"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ParkinsonDetectionUpload;
