"use client";

import { FC } from "react";
import { getMonthName } from "@/utils/getMonthName";
import { MonthlyResultRow } from "@/types/types";

interface MonthlyResultDataProps {
  data: MonthlyResultRow[];
  loading: boolean;
  isOpen:boolean
}

const MonthlyResultData: FC<MonthlyResultDataProps> = ({ data, loading, isOpen }) => {
  const total = data.reduce(
    (acc, row) => {
      acc.campaign_count += row.campaign_count;
      acc.shipped += row.shipped;
      acc.mailed += row.mailed;
      acc.days_since_making += row.days_since_making;
      acc.ror_percent += row.ror_percent;
      acc.mail_order += row.mail_order;
      acc.phone_order += row.phone_order;
      acc.web_order += row.web_order;
      acc.backorder += row.backorder;
      acc.total_order += row.total_order;
      acc.cost += row.cost;
      acc.sales += row.sales;
      acc.net_sales += row.net_sales;
      acc.refund_count += row.refund_count;
      acc.refunds += row.refunds;
      acc.profit += row.profit;
      acc.gross_orders += row.gross_orders;
      return acc;
    },
    {
      campaign_count: 0,
      shipped: 0,
      mailed: 0,
      days_since_making: 0,
      ror_percent: 0,
      mail_order: 0,
      phone_order: 0,
      web_order: 0,
      backorder: 0,
      total_order: 0,
      cost: 0,
      sales: 0,
      net_sales: 0,
      refund_count: 0,
      refunds: 0,
      profit: 0,
      gross_orders: 0,
    }
  );

  return (
    <div className={`mt-4 p-4 bg-background border border-black/10 rounded-md overflow-x-auto overflow-hidden mx-2 relative mb-4 min-h-[50vh] shadow-sm ${isOpen ? "w-[calc(100vw-18rem)]" : "w-[calc(100vw-2rem)]"}  scrollbar-thin scrollbar-thumb-zinc-900/20 scrollbar-thumb-rounded-xl scrollbar-track-zinc-100`} >
      <h2 className="text-3xl font-semibold mb-2">Monthly Campaign Results</h2>

      {loading ? (
        <div className="text-gray-500 absolute top-[50%] left-[50%] -translate-x-[50%]">
        <div className="h-[2.5rem] w-[2.5rem] border-4 border-zinc-400 border-b-zinc-600 rounded-full animate-spin">

        </div>
    </div>
      ) : data.length === 0 ? (
        <p className="text-gray-500 absolute top-[50%] left-[50%] -translate-x-[50%]">No data available.</p>
      ) : (
        <table className="w-full border border-gray-300 text-[0.7rem]">
          <thead>
            <tr className="bg-foreground text-background">
              <th className="border px-4 py-2">Index</th>
              <th className="border px-4 py-2">Year</th>
              <th className="border px-4 py-2">Month</th>
              <th className="border px-4 py-2">Campaign Count</th>
              <th className="border px-4 py-2">Shipped</th>
              <th className="border px-4 py-2">Mailed</th>
              <th className="border px-4 py-2">Days Since Making</th>
              <th className="border px-4 py-2">ROR %</th>
              <th className="border px-4 py-2">Mail Orders</th>
              <th className="border px-4 py-2">Phone Orders</th>
              <th className="border px-4 py-2">Web Orders</th>
              <th className="border px-4 py-2">Backorders</th>
              <th className="border px-4 py-2">Total Orders</th>
              <th className="border px-4 py-2">Cost</th>
              <th className="border px-4 py-2">Sales</th>
              <th className="border px-4 py-2">Net Sales</th>
              <th className="border px-4 py-2">Refund Count</th>
              <th className="border px-4 py-2">Refunds</th>
              <th className="border px-4 py-2">Profit</th>
              <th className="border px-4 py-2">Gross Orders</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i} className="border hover:bg-gray-100 dark:hover:bg-gray-800">
                <th className="border px-4 py-2">{i + 1}</th>
                <td className="border px-4 py-2">{row.year}</td>
                <td className="border px-4 py-2">{getMonthName(row.month)}</td>
                <td className="border px-4 py-2">{row.campaign_count}</td>
                <td className="border px-4 py-2">{row.shipped}</td>
                <td className="border px-4 py-2">{row.mailed}</td>
                <td className="border px-4 py-2">{row.days_since_making}</td>
                <td className="border px-4 py-2">{row.ror_percent.toFixed(2)}%</td>
                <td className="border px-4 py-2">{row.mail_order}</td>
                <td className="border px-4 py-2">{row.phone_order}</td>
                <td className="border px-4 py-2">{row.web_order}</td>
                <td className="border px-4 py-2">{row.backorder}</td>
                <td className="border px-4 py-2">{row.total_order}</td>
                <td className="border px-4 py-2">${row.cost.toFixed(2)}</td>
                <td className="border px-4 py-2">${row.sales.toFixed(2)}</td>
                <td className="border px-4 py-2">${row.net_sales.toFixed(2)}</td>
                <td className="border px-4 py-2">{row.refund_count}</td>
                <td className="border px-4 py-2">${row.refunds.toFixed(2)}</td>
                <td className="border px-4 py-2">${row.profit.toFixed(2)}</td>
                <td className="border px-4 py-2">{row.gross_orders}</td>
              </tr>
            ))}
            <tr className="border hover:bg-gray-100 dark:hover:bg-gray-800 font-bold tracking-wider">
              <th className="border px-4 py-2">Total</th>
              <th className="border px-4 py-2"></th>
              <th className="border px-4 py-2"></th>
              <td className="border px-4 py-2">{total.campaign_count}</td>
              <td className="border px-4 py-2">{total.shipped}</td>
              <td className="border px-4 py-2">{total.mailed}</td>
              <td className="border px-4 py-2">{total.days_since_making}</td>
              <td className="border px-4 py-2">{(total.ror_percent / data.length).toFixed(2)}%</td>
              <td className="border px-4 py-2">{total.mail_order}</td>
              <td className="border px-4 py-2">{total.phone_order}</td>
              <td className="border px-4 py-2">{total.web_order}</td>
              <td className="border px-4 py-2">{total.backorder}</td>
              <td className="border px-4 py-2">{total.total_order}</td>
              <td className="border px-4 py-2">${total.cost.toFixed(2)}</td>
              <td className="border px-4 py-2">${total.sales.toFixed(2)}</td>
              <td className="border px-4 py-2">${total.net_sales.toFixed(2)}</td>
              <td className="border px-4 py-2">{total.refund_count}</td>
              <td className="border px-4 py-2">${total.refunds.toFixed(2)}</td>
              <td className="border px-4 py-2">${total.profit.toFixed(2)}</td>
              <td className="border px-4 py-2">{total.gross_orders}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MonthlyResultData;
