import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FileData, MonthlyResultRow, TableRow } from "@/types/types";

export const useTableData = (selectedFile: FileData | null, filterQuery: string) => {
  const [tableData, setTableData] = useState<TableRow[]>([]);
  const [monthlyResultData, setMonthlyResultData] = useState<MonthlyResultRow[]>([]);
  const [tableLoading, setTableLoading] = useState(false);
  const [monthlyResultLoading, setMonthlyResultLoading] = useState(false);

  const fetchTableData = async () => {
    if (!selectedFile) {
      setTableData([]);
      setMonthlyResultData([]);
      return;
    }
    setTableLoading(true);
    setMonthlyResultLoading(true);
    try {
      const [response, response2] = await Promise.all([
        axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}filter?uploaded_file=${selectedFile.id}&${filterQuery}`),
        axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}aggregate/${selectedFile.id}/`),
      ]);
      setTableData(response.data);
      setMonthlyResultData(response2.data);
    } catch (error) {
      toast.error("Error fetching table data.");
      console.error("Error fetching table data:", error);
    } finally {
      setTableLoading(false);
      setMonthlyResultLoading(false);
    }
  };

  useEffect(() => {
    fetchTableData();
  }, [selectedFile, filterQuery]);

  const memoizedTableData = useMemo(() => tableData, [tableData]);
  const memoizedMonthlyData = useMemo(() => monthlyResultData, [monthlyResultData]);

  return { memoizedTableData, memoizedMonthlyData, tableLoading, monthlyResultLoading };
};
