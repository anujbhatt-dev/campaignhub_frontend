import { useState } from "react";

export const useUploadFile = () => {
  const [isUploadFile, setIsUploadFile] = useState(false);

  const toggleUploadFile = () => setIsUploadFile((prev) => !prev);

  return { isUploadFile, toggleUploadFile };
};
