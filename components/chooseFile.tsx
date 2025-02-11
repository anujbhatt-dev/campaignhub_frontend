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
    <div className="w-[20rem] max-w-md bg-zinc-200 p-4 rounded-md mt-4 border border-black/10 shadow-lg">
      <h2 className="font-semibold mb-1 opacity-90">Choose a File</h2>

      {loading ? (
        <p className="text-gray-500">Loading files...</p>
      ) : (
        <select
          className="w-full p-2 rounded-md focus:outline-none bg-zinc-50 text-sm"
          onChange={(e) => {
            const file = files.find((f) => f.id === Number(e.target.value));
            onFileChange(file || null);
          }}
        >
          <option className="bg-zinc-50" value="">Select a file</option>
          {files.map((file) => (
            <option key={file.id} value={file.id}>
              {file.name} - {new Date(file.uploaded_at).toLocaleDateString()}
            </option>
          ))}
        </select>
      )}

      {selectedFile && (
        <div className="mt-2 p-2 rounded-md flex bg-green text-white text-[0.8rem] justify-between items-center ">
          <p className=" text-[0.9rem] tracking-wide"><strong>{selectedFile.name}</strong></p>
          <p className="opacity-80 ">{new Date(selectedFile.uploaded_at).toLocaleDateString()}</p>
        </div>
      )}
    </div>
  );
};

export default ChooseFile;
