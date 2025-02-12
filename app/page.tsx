"use client";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import ChooseFile from "@/components/chooseFile";
import SideMenu from "@/components/Sidemenu";
import TopBar from "@/components/Topbar";
// import TableData from "@/components/TableData";
import UploadFile from "@/components/UploadFile";
import { PlusIcon } from "@heroicons/react/24/outline";
// import MonthlyResultData from "@/components/MonthlyResultData";
import ScatterPlot from "@/components/ScatterPlot";
import MonthlySalesExpensesChart from "@/components/MonthlySalesExpensesChart";
import { FileData } from "@/types/types";
import { useFiles } from "@/hooks/useFiles";
import { useTableData } from "@/hooks/useTableData";
import { useUploadFile } from "@/hooks/useUploadFile";
import { Suspense, lazy } from "react";

const TableData = lazy(() => import("@/components/TableData"));
const MonthlyResultData = lazy(() => import("@/components/MonthlyResultData"));

export default function Home() {
  const { files, loading } = useFiles();
  const [selectedFile, setSelectedFile] = useState<FileData | null>(null);
  const [filterQuery, setFilterQuery] = useState<string>("");

  const { memoizedTableData, memoizedMonthlyData, tableLoading, monthlyResultLoading } = useTableData(
    selectedFile,
    filterQuery
  );

  const { isUploadFile, toggleUploadFile } = useUploadFile();

  // State to track whether it's safe to use `localStorage`
  const [isClient, setIsClient] = useState(false);

  // Use effect to set the flag that we are on the client-side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Only access localStorage on the client side
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleSideMenu = () => {
    setIsOpen(prev => {
      const newIsOpen = !prev;
      // Persist the updated state in localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("isOpen", JSON.stringify(newIsOpen));
      }
      return newIsOpen;
    });
  };

  useEffect(() => {
    if (isClient) {
      const storedIsOpen = localStorage.getItem("isOpen");
      if (storedIsOpen) {
        setIsOpen(JSON.parse(storedIsOpen));
      }
    }
  }, [isClient]);

  useEffect(() => {
    if (selectedFile) {
      localStorage.setItem("selectedFile", JSON.stringify(selectedFile));
    }
  }, [selectedFile]);

  useEffect(() => {
    const storedFile = localStorage.getItem("selectedFile");

    if (storedFile) {
      try {
        setSelectedFile(JSON.parse(storedFile));
      } catch (error) {
        console.error("Failed to parse selectedFile from localStorage", error);
      }
    }
  }, []);

  return (
    <div className="bg-backgroundLight flex min-h-screen relative">
      <SideMenu isOpen={isOpen} onFilterChange={setFilterQuery} selectedFileId={selectedFile?.id} />
      <div className="flex-grow transition-all duration-200  mb-[5rem]">
        <TopBar toggleSidemenu={toggleSideMenu} />
        <div className="mx-2 flex justify-between items-center lg:items-start lg:flex-row flex-col-reverse gap-2 my-2">
          <ChooseFile files={files} selectedFile={selectedFile} loading={loading} onFileChange={setSelectedFile} />
          <div className="flex gap-x-6 justify-between items-baseline">
              <div className="text-zinc-500 text-sm">Tolal Files  <span className="font-semibold text-black text-xl">{files.length}</span></div>
              <button
                onClick={toggleUploadFile}
                className="flex gap-2 font-semibold justify-center items-center bg-green/90 hover:bg-green transition-all duration-75 hover:animate-shake p-2 rounded-full lg:rounded-lg text-white border-2 border-black/40 lg:px-4"
                >
                <PlusIcon className="h-6 w-6 text-white" />
                <span className="hidden lg:inline-block">New</span>
              </button>
            </div>
        </div>

        <div className="flex flex-col items-center">
          <Suspense fallback={<div>Loading...</div>}>
            <TableData isOpen={isOpen} data={memoizedTableData} loading={tableLoading} />            
          </Suspense>
          {/* <TableData isOpen={isOpen} data={memoizedTableData} loading={tableLoading} /> */}
          {memoizedTableData.length !== 0 && (
            <div className="">
              <ScatterPlot data={memoizedTableData} />              
            </div>
          )}
          <Suspense fallback={<div>Loading...</div>}>            
            <MonthlyResultData isOpen={isOpen} data={memoizedMonthlyData} loading={monthlyResultLoading} />
          </Suspense>
          {/* <MonthlyResultData isOpen={isOpen} data={memoizedMonthlyData} loading={monthlyResultLoading} /> */}
          {memoizedTableData.length !== 0 && (
            <div className="">
              <MonthlySalesExpensesChart data={memoizedMonthlyData} />
            </div>
          )}
        </div>
      </div>

      {isUploadFile && <UploadFile isUploadFile={isUploadFile} setIsUploadFile={toggleUploadFile} />}
    </div>
  );
}
