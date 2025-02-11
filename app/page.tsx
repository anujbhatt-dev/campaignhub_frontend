"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import ChooseFile from "@/components/chooseFile";
import SideMenu from "@/components/Sidemenu";
import TopBar from "@/components/Topbar";
import TableData from "@/components/TableData";
import UploadFile from "@/components/UploadFile";
import { PlusIcon } from "@heroicons/react/24/outline";
import MonthlyResultData from "@/components/MonthlyResultData";
import SalesCostLineChart from "@/components/SalesCostLineChart";
import ScatterPlot from "@/components/ScatterPlot";
import MonthlySalesExpensesChart from "@/components/MonthlySalesExpensesChart";

export interface FileData {
  id: number;
  name: string;
  uploaded_at: string;
}

export interface TableRow {
  id: number;
  client: string;
  group_code: string;
  mailing_code: string;
  mlg_desc: string;
  mail_date: string;
  offer: string;
  offer_desc: string;
  product: string;
  product_desc: string;
  category: string;
  source: string;
  mailing_list: string;
  segment: string;
  ship_qty: number;
  mailed: number;
  ror_net_percent: number;
  printing_cost: number;
  lists_cost: number;
  postage_cost: number;
  lettershop_cost: number;
  dp_cost: number;
  misc_cost: number;
  total_mailing_cost: number;
  mail_orders: number;
  phone_orders: number;
  web_orders: number;
  gross_orders: number;
  gross_percent: number;
  net_orders: number;
  net_percent: number;
  ac: number;
  active_subs: number;
  inquirers: number;
  backorders: number;
  bo_amount: number;
  percent_with_bo: number;
  prod_amount: number;
  x_sell_amount: number;
  misc_amount: number;
  non_cc_amount: number;
  cc_amount: number;
  auto_ships: number;
  gross_sales: number;
  refunds: number;
  product_cost: number;
  call_ctr: number;
  merch_fee: number;
  royalties: number;
  total_cost: number;
  net_profit_loss: number;
  net_roi: number;
  percent_breakeven: number;
  be_orders: number;
  net_per_piece: number;
  avg_order: number;
  avg_with_autoship: number;
  avg_turns: number;
  mlg_cost: number;
  net_pl_order: number;
  avg_with_autoship_2: number;
  nsf_count: number;
  days: number;
  aov: number;
  be_aov: number;
  lt_aov: number;
  qty_mailed: number;
  ntf_buyers: number;
  fe_cost: number;
  fe_cpo: number;
  fe_purch: number;
  fe_aov: number;
  fe_roi: number;
  subs_percent: number;
  be_orders_2: number;
  be_mlg_qty: number;
  be_cost: number;
  be_cpo: number;
  be_purch: number;
  be_aov_last: number;
  tot_purch: number;
  tot_cost: number;
  net_pl: number;
  lt_roi: number;
  pl_per_buyers: number;
  delta: number;
  pl_per_buyer_total: number;
  action: string;
  uploaded_file: number;
}

export interface MonthlyResultRow {
  id: number;
  campaign_count: number;
  shipped: number;
  mailed: number;
  days_since_making: number;
  ror_percent: number;
  mail_order: number;
  phone_order: number;
  web_order: number;
  backorder: number;
  total_order: number;
  cost: number;
  sales: number;
  net_sales: number;
  refund_count: number;
  refunds: number;
  profit: number;
  gross_orders: number;
  year:number,
  month:number
}


export default function Home() {
  const [files, setFiles] = useState<FileData[]>([]);
  const [selectedFile, setSelectedFile] = useState<FileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [tableData, setTableData] = useState<TableRow[]>([]);
  const [tableLoading, setTableLoading] = useState(false);
  const [monthlyResultData, setMonthlyResultData] = useState<MonthlyResultRow[]>([]);
  const [monthlyResultLoading, setMonthlyResultLoading] = useState(false);
  const [filterQuery, setFilterQuery] = useState<string>("");
  const [isUploadFile,setIsUploadFile] = useState(false);


  

  // Fetch files from backend
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}files`);
        
        setFiles(response.data);
      } catch (error) {
        console.error("Error fetching files:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, []);

  // Fetch table data when file or filters change
  useEffect(() => {
    if (!selectedFile) {
      setTableData([]);
      return;
    }

    const fetchTableData = async () => {
      setTableLoading(true);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}filter?uploaded_file=${selectedFile.id}&${filterQuery}`
        );
        const response2 = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}aggregate/${selectedFile.id}/`
        );
        console.log(response2);
        setTableData(response.data);
        setMonthlyResultData(response2.data)
      } catch (error) {
        console.error("Error fetching table data:", error);
      } finally {
        setTableLoading(false);
      }
    };

    fetchTableData();
  }, [selectedFile, filterQuery]);

  return (
    <div className="bg-backgroundLight flex min-h-screen relative pb-[5rem]">
      <SideMenu onFilterChange={setFilterQuery} />
      <div className="flex-grow">
        <TopBar />
        <div className="mx-2 flex justify-between items-center x">
          <ChooseFile files={files} selectedFile={selectedFile} loading={loading} onFileChange={setSelectedFile} />
          <button onClick={()=>setIsUploadFile(true)} className=" flex gap-2 font-semibold justify-center items-center bg-blue-500 p-2 rounded-lg text-white border-2 border-black/40 px-8">
          <PlusIcon className="h-6 w-6 text-white" /><span>Add</span>
          </button>
        </div>
        {/* <SalesCostLineChart data={monthlyResultData}/> */}
        <div className="m-2">

        

        </div>
        <TableData data={tableData} loading={tableLoading} />
        <MonthlyResultData data={monthlyResultData} loading={monthlyResultLoading}/>
        {tableData.length!=0 &&<>
          <ScatterPlot data={tableData}/>        
          <MonthlySalesExpensesChart data={monthlyResultData}/>
          </>
        }
      </div>
        {isUploadFile &&
        <UploadFile isUploadFile={isUploadFile} setIsUploadFile={setIsUploadFile}/>
        }
    </div>
  );
}
