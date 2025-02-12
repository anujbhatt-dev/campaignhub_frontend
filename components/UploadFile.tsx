import { Dispatch, SetStateAction, useState } from "react";
import axios from "axios";
import { PlusIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CheckIcon } from "@heroicons/react/24/outline";

interface UploadFileProps {
  isUploadFile: boolean;
  setIsUploadFile: Dispatch<SetStateAction<boolean>>;
}

const UploadFile = ({ isUploadFile, setIsUploadFile }: UploadFileProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFile = e.target.files[0];

      // Validate file type
      if (!selectedFile.name.endsWith(".xlsx")) {
        toast.error("Invalid file format. Only .xlsx files are allowed.");
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileName(e.target.value);
  };

  const handleUpload = async () => {
    if (!file || !fileName) {
      toast.warn("Please select a file and enter a file name.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", fileName);

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}upload/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 201) {
        setIsUploadFile(false);
        toast.success("File uploaded successfully!");
      } else {
        toast.error("Failed to upload file.");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error("Server Error:", error.response.data);
        toast.error(error.response.data.error || "Upload failed!");
      } else {
        console.error("Unexpected Error:", error);
        toast.error("Something went wrong!");
      }
    } finally {
      setLoading(false);
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
          className="min-h-[20rem] min-w-[20rem] bg-white flex flex-col p-4 rounded-lg z-20 shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="uppercase font-semibold text-lg">Add File</h1>

          <label
            htmlFor="upload-file"
            className={`cursor-pointer h-[5rem] w-full flex justify-center items-center rounded-md transition-all duration-75 mx-auto my-2 flex-col ${
              !file ? "bg-zinc-100 hover:bg-zinc-200" : "bg-blue-100 hover:bg-blue-200"
            }`}
          > {
            !file ?
              <PlusIcon className="h-6 w-6 text-blue-500 hover:text-blue-700" />
              :
              <CheckIcon className="h-6 w-6 text-green " />
            }
            <span className="text-[0.7rem] uppercase mt-2 text-zinc-400">
              {!file ? "Browse your computer" : "Change File"}
            </span>
          </label>

          <input
            className="hidden"
            id="upload-file"
            type="file"
            accept=".xlsx"
            onChange={handleFileChange}
          />

          <input
            type="text"
            placeholder="Enter Name for File (max: 20 chars)"
            value={fileName}
            onChange={handleNameChange}
            maxLength={20}
            className="border border-gray-300 p-2 rounded-md text-[0.9rem] w-full"
          />

          <button
            onClick={handleUpload}
            disabled={loading}
            className={`px-4 py-2 text-white rounded-md mt-2 hover:animate-shake ${
              loading ? "bg-gray-400 cursor-not-allowed" : file? "bg-green": "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {loading ? "Uploading..." : file?"Submit":"Upload"}
          </button>

          <p className="text-[0.8rem] mt-8 text-zinc-600 bg-zinc-50 p-2 border-l-4 border-zinc-300 italic">
            Only <span className="text-red">.xlsx</span> format files are allowed.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default UploadFile;
