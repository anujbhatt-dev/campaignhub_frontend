import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FileData } from "@/types/types";

export const useFiles = () => {
  const [files, setFiles] = useState<FileData[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFiles = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}files`);
      setFiles(response.data);
    } catch (error) {
      toast.error("Error fetching files.");
      console.error("Error fetching files:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return { files, loading };
};
