"use client";

import { FC } from "react";
import { TableRow } from "@/app/page";

interface TableDataProps {
  data: TableRow[];
  loading: boolean;
}

const TableData: FC<TableDataProps> = ({ data, loading }) => {
  return (
    <div className="mt-4 p-4 bg-background shadow-md rounded-md overflow-x-auto mx-2">
      <h2 className="text-sm font-semibold mb-2">File Data</h2>

      {loading ? (
        <p className="text-gray-500">Loading data...</p>
      ) : data.length === 0 ? (
        <p className="text-gray-500">No data available.</p>
      ) : (
        <table className="w-full border border-gray-300 text-[0.7rem]">
          <thead>
            <tr className="bg-foreground text-background">
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Client</th>
              <th className="border px-4 py-2">Mailing Code</th>
              <th className="border px-4 py-2">Mail Date</th>
              <th className="border px-4 py-2">Offer</th>
              <th className="border px-4 py-2">Category</th>
              <th className="border px-4 py-2">Product</th>
              <th className="border px-4 py-2">Gross Sales</th>
              <th className="border px-4 py-2">Net Profit/Loss</th>
              <th className="border px-4 py-2">Net ROI</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id} className="border hover:bg-gray-100 dark:hover:bg-gray-800">
                <td className="border px-4 py-2">{row.id}</td>
                <td className="border px-4 py-2">{row.client}</td>
                <td className="border px-4 py-2">{row.mailing_code}</td>
                <td className="border px-4 py-2">{new Date(row.mail_date).toLocaleDateString()}</td>
                <td className="border px-4 py-2">{row.offer}</td>
                <td className="border px-4 py-2">{row.category}</td>
                <td className="border px-4 py-2">{row.product_desc}</td>
                <td className="border px-4 py-2">${row.gross_sales.toFixed(2)}</td>
                <td className="border px-4 py-2">${row.net_profit_loss.toFixed(2)}</td>
                <td className="border px-4 py-2">{(row.net_roi * 100).toFixed(2)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TableData;
