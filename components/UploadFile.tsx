import { Dispatch, SetStateAction, useState } from "react";
import axios from "axios";
import { PlusIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

interface UploadFileI {
  isUploadFile: boolean;
  setIsUploadFile: Dispatch<SetStateAction<boolean>>;
}

const UploadFile = ({ isUploadFile, setIsUploadFile }: UploadFileI) => {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileName(e.target.value);
  };

  const handleUpload = async () => {
    if (!file || !fileName) {
      alert("Please select a file and enter a file name.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", fileName);

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}upload/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        alert("File uploaded successfully!");
      } else {
        alert("Failed to upload file.");
      }
    } catch (error) {
      alert("An error occurred while uploading the file.");
      console.error(error);
    }
  };

  return (
    <div className={`${!isUploadFile && "hidden"} flex items-center space-x-4`}>
      <div className="fixed top-0 left-0 h-screen w-screen flex justify-center items-center backdrop-blur-sm bg-zinc-900/80">
        <motion.div
          className="h-screen w-screen fixed top-0 left-0 z-10"
          onClick={() => setIsUploadFile(false)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
        <motion.div
          className="min-h-[20rem] min-w-[20rem] bg-white flex flex-col p-4 rounded-lg z-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <input 
            className="hidden" 
            id="upload-file" 
            type="file" 
            accept=".xlsx" 
            onChange={handleFileChange} 
          />
          <h1 className="uppercase font-semibold">Add File</h1>
          <label
            htmlFor="upload-file"
            className={`${!file?"bg-zinc-100":"bg-blue-100"} cursor-pointer h-[5rem] w-full justify-center items-center flex rounded-md  hover:bg-zinc-200 transition-all duration-75 mx-auto my-2 flex-col`}
          >
            <PlusIcon className="h-6 w-6 text-blue-500 hover:text-blue-700" />
            <span className="text-[0.7rem] uppercase mt-2 text-zinc-400">{!file?"Browse your computer":"Change File"}</span>
          </label>
          <input
            type="text"
            placeholder="Enter Name for File 'max char: 20'"
            value={fileName}
            onChange={handleNameChange}
            maxLength={20}
            className="border border-gray-300 p-2 rounded-md text-[0.9rem]"
          />
          <button
            onClick={handleUpload}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mt-2"
          >
            Upload
          </button>
          <p className="text-[0.8rem] mt-8 text-zinc-600 bg-zinc-50 p-2 border-l-4 border-zinc-300 italic">
            only <span className="text-red">.xlsx</span> format file allowed
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default UploadFile;
