"use client";

import { FileData } from "@/app/page";
import { FC } from "react";

interface ChooseFileProps {
  files: FileData[];
  selectedFile: FileData | null;
  loading: boolean;
  onFileChange: (file: FileData | null) => void;
}

const ChooseFile: FC<ChooseFileProps> = ({ files, selectedFile, loading, onFileChange }) => {
  return (
    <div className="w-full max-w-md mx-auto p-4 bg-background shadow-md rounded-md">
      <h2 className="text-lg font-semibold mb-2">Choose a File</h2>

      {loading ? (
        <p className="text-gray-500">Loading files...</p>
      ) : (
        <select
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          onChange={(e) => {
            const file = files.find((f) => f.id === Number(e.target.value));
            onFileChange(file || null);
          }}
        >
          <option value="">Select a file</option>
          {files.map((file) => (
            <option key={file.id} value={file.id}>
              {file.name} - {new Date(file.uploaded_at).toLocaleDateString()}
            </option>
          ))}
        </select>
      )}

      {selectedFile && (
        <div className="mt-4 p-2 bg-foreground text-background rounded-md">
          <p>📄 <strong>{selectedFile.name}</strong></p>
          <p>🗓 Uploaded: {new Date(selectedFile.uploaded_at).toLocaleDateString()}</p>
        </div>
      )}
    </div>
  );
};

export default ChooseFile;
