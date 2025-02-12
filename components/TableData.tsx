"use client";

import { TableRow } from "@/types/types";
import { FC } from "react";

interface TableDataProps {
  data: TableRow[];
  loading: boolean;
  isOpen:boolean
}

const TableData: FC<TableDataProps> = ({ data, loading, isOpen }) => {
  return (
    <div className={`mt-4 p-4 bg-background border border-black/10 rounded-md overflow-x-auto h-[70vh] mx-2 relative mb-4 shadow-sm ${isOpen ? "w-[calc(100vw-18rem)]" : "w-[calc(100vw-2rem)]"} `}>
      <h2 className="text-3xl font-semibold mb-2">File Data</h2>

      {loading ? (
        <div className="text-gray-500 absolute top-[50%] left-[50%] -translate-x-[50%]">
            <div className="h-[2.5rem] w-[2.5rem] border-4 border-zinc-400 border-b-zinc-600 rounded-full animate-spin">

            </div>
        </div>
      ) : data.length === 0 ? (
        <p className="text-gray-500 absolute top-[50%] left-[50%] -translate-x-[50%]">No data available.</p>
      ) : (
        <div className="overflow-x-auto w-full h-[60vh] scrollbar-thin scrollbar-thumb-zinc-900/20 scrollbar-thumb-rounded-xl scrollbar-track-zinc-100">
          <table className="min-w-max w-full border border-gray-300 text-[0.7rem]">
            <thead>
              <tr className="bg-foreground text-background">
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">Client</th>
                <th className="border px-4 py-2">Mailing Code</th>
                <th className="border px-4 py-2">Mail Date</th>
                <th className="border px-4 py-2">Offer</th>
                <th className="border px-4 py-2">Offer Desc</th>
                <th className="border px-4 py-2">Product</th>
                <th className="border px-4 py-2">Product Desc</th>
                <th className="border px-4 py-2">Category</th>
                <th className="border px-4 py-2">Source</th>
                <th className="border px-4 py-2">Mailing List</th>
                <th className="border px-4 py-2">Segment</th>
                <th className="border px-4 py-2">Ship Qty</th>
                <th className="border px-4 py-2">Mailed</th>
                <th className="border px-4 py-2">ROR Net Percent</th>
                <th className="border px-4 py-2">Printing Cost</th>
                <th className="border px-4 py-2">Lists Cost</th>
                <th className="border px-4 py-2">Postage Cost</th>
                <th className="border px-4 py-2">Lettershop Cost</th>
                <th className="border px-4 py-2">DP Cost</th>
                <th className="border px-4 py-2">Misc Cost</th>
                <th className="border px-4 py-2">Total Mailing Cost</th>
                <th className="border px-4 py-2">Mail Orders</th>
                <th className="border px-4 py-2">Phone Orders</th>
                <th className="border px-4 py-2">Web Orders</th>
                <th className="border px-4 py-2">Gross Orders</th>
                <th className="border px-4 py-2">Gross Percent</th>
                <th className="border px-4 py-2">Net Orders</th>
                <th className="border px-4 py-2">Net Percent</th>
                <th className="border px-4 py-2">AC</th>
                <th className="border px-4 py-2">Active Subs</th>
                <th className="border px-4 py-2">Inquirers</th>
                <th className="border px-4 py-2">Backorders</th>
                <th className="border px-4 py-2">BO Amount</th>
                <th className="border px-4 py-2">Percent With BO</th>
                <th className="border px-4 py-2">Prod Amount</th>
                <th className="border px-4 py-2">X Sell Amount</th>
                <th className="border px-4 py-2">Misc Amount</th>
                <th className="border px-4 py-2">Non CC Amount</th>
                <th className="border px-4 py-2">CC Amount</th>
                <th className="border px-4 py-2">Auto Ships</th>
                <th className="border px-4 py-2">Gross Sales</th>
                <th className="border px-4 py-2">Refunds</th>
                <th className="border px-4 py-2">Product Cost</th>
                <th className="border px-4 py-2">Call CTR</th>
                <th className="border px-4 py-2">Merch Fee</th>
                <th className="border px-4 py-2">Royalties</th>
                <th className="border px-4 py-2">Total Cost</th>
                <th className="border px-4 py-2">Net Profit/Loss</th>
                <th className="border px-4 py-2">Net ROI</th>
                <th className="border px-4 py-2">Percent Breakeven</th>
                <th className="border px-4 py-2">BE Orders</th>
                <th className="border px-4 py-2">Net Per Piece</th>
                <th className="border px-4 py-2">Avg Order</th>
                <th className="border px-4 py-2">Avg With Autoship</th>
                <th className="border px-4 py-2">Avg Turns</th>
                <th className="border px-4 py-2">MLG Cost</th>
                <th className="border px-4 py-2">Net PL Order</th>
                <th className="border px-4 py-2">Avg With Autoship 2</th>
                <th className="border px-4 py-2">NSF Count</th>
                <th className="border px-4 py-2">Days</th>
                <th className="border px-4 py-2">AOV</th>
                <th className="border px-4 py-2">BE AOV</th>
                <th className="border px-4 py-2">LT AOV</th>
                <th className="border px-4 py-2">Qty Mailed</th>
                <th className="border px-4 py-2">NTF Buyers</th>
                <th className="border px-4 py-2">FE Cost</th>
                <th className="border px-4 py-2">FE CPO</th>
                <th className="border px-4 py-2">FE Purch</th>
                <th className="border px-4 py-2">FE AOV</th>
                <th className="border px-4 py-2">FE ROI</th>
                <th className="border px-4 py-2">Subs Percent</th>
                <th className="border px-4 py-2">BE Orders 2</th>
                <th className="border px-4 py-2">BE MLG Qty</th>
                <th className="border px-4 py-2">BE Cost</th>
                <th className="border px-4 py-2">BE CPO</th>
                <th className="border px-4 py-2">BE Purch</th>
                <th className="border px-4 py-2">BE AOV Last</th>
                <th className="border px-4 py-2">Tot Purch</th>
                <th className="border px-4 py-2">Tot Cost</th>
                <th className="border px-4 py-2">Net PL</th>
                <th className="border px-4 py-2">LT ROI</th>
                <th className="border px-4 py-2">PL Per Buyers</th>
                <th className="border px-4 py-2">Delta</th>
                <th className="border px-4 py-2">PL Per Buyer Total</th>
                <th className="border px-4 py-2">Action</th>
                <th className="border px-4 py-2">Uploaded File</th>
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
                  <td className="border px-4 py-2">{row.offer_desc}</td>
                  <td className="border px-4 py-2">{row.product}</td>
                  <td className="border px-4 py-2">{row.product_desc}</td>
                  <td className="border px-4 py-2">{row.category}</td>
                  <td className="border px-4 py-2">{row.source}</td>
                  <td className="border px-4 py-2">{row.mailing_list}</td>
                  <td className="border px-4 py-2">{row.segment}</td>
                  <td className="border px-4 py-2">{row.ship_qty}</td>
                  <td className="border px-4 py-2">{row.mailed}</td>
                  <td className="border px-4 py-2">{row.ror_net_percent}</td>
                  <td className="border px-4 py-2">${row.printing_cost.toFixed(2)}</td>
                  <td className="border px-4 py-2">${row.lists_cost.toFixed(2)}</td>
                  <td className="border px-4 py-2">${row.postage_cost.toFixed(2)}</td>
                  <td className="border px-4 py-2">${row.lettershop_cost.toFixed(2)}</td>
                  <td className="border px-4 py-2">${row.dp_cost.toFixed(2)}</td>
                  <td className="border px-4 py-2">${row.misc_cost.toFixed(2)}</td>
                  <td className="border px-4 py-2">${row.total_mailing_cost.toFixed(2)}</td>
                  <td className="border px-4 py-2">{row.mail_orders}</td>
                  <td className="border px-4 py-2">{row.phone_orders}</td>
                  <td className="border px-4 py-2">{row.web_orders}</td>
                  <td className="border px-4 py-2">{row.gross_orders}</td>
                  <td className="border px-4 py-2">{row.gross_percent}</td>
                  <td className="border px-4 py-2">{row.net_orders}</td>
                  <td className="border px-4 py-2">{row.net_percent}</td>
                  <td className="border px-4 py-2">{row.ac}</td>
                  <td className="border px-4 py-2">{row.active_subs}</td>
                  <td className="border px-4 py-2">{row.inquirers}</td>
                  <td className="border px-4 py-2">{row.backorders}</td>
                  <td className="border px-4 py-2">{row.bo_amount}</td>
                  <td className="border px-4 py-2">{row.percent_with_bo}</td>
                  <td className="border px-4 py-2">${row.prod_amount.toFixed(2)}</td>
                  <td className="border px-4 py-2">${row.x_sell_amount.toFixed(2)}</td>
                  <td className="border px-4 py-2">${row.misc_amount.toFixed(2)}</td>
                  <td className="border px-4 py-2">${row.non_cc_amount.toFixed(2)}</td>
                  <td className="border px-4 py-2">${row.cc_amount.toFixed(2)}</td>
                  <td className="border px-4 py-2">{row.auto_ships}</td>
                  <td className="border px-4 py-2">${row.gross_sales.toFixed(2)}</td>
                  <td className="border px-4 py-2">${row.refunds.toFixed(2)}</td>
                  <td className="border px-4 py-2">${row.product_cost.toFixed(2)}</td>
                  <td className="border px-4 py-2">{row.call_ctr}</td>
                  <td className="border px-4 py-2">${row.merch_fee.toFixed(2)}</td>
                  <td className="border px-4 py-2">${row.royalties.toFixed(2)}</td>
                  <td className="border px-4 py-2">${row.total_cost.toFixed(2)}</td>
                  <td className="border px-4 py-2">${row.net_profit_loss.toFixed(2)}</td>
                  <td className="border px-4 py-2">{row.net_roi}%</td>
                  <td className="border px-4 py-2">{row.percent_breakeven}</td>
                  <td className="border px-4 py-2">{row.be_orders}</td>
                  <td className="border px-4 py-2">${row.net_per_piece.toFixed(2)}</td>
                  <td className="border px-4 py-2">${row.avg_order.toFixed(2)}</td>
                  <td className="border px-4 py-2">${row.avg_with_autoship.toFixed(2)}</td>
                  <td className="border px-4 py-2">{row.avg_turns}</td>
                  <td className="border px-4 py-2">${row.mlg_cost.toFixed(2)}</td>
                  <td className="border px-4 py-2">${row.net_pl_order.toFixed(2)}</td>
                  <td className="border px-4 py-2">${row.avg_with_autoship_2.toFixed(2)}</td>
                  <td className="border px-4 py-2">{row.nsf_count}</td>
                  <td className="border px-4 py-2">{row.days}</td>
                  <td className="border px-4 py-2">${row.aov.toFixed(2)}</td>
                  <td className="border px-4 py-2">${row.be_aov.toFixed(2)}</td>
                  <td className="border px-4 py-2">${row.lt_aov.toFixed(2)}</td>
                  <td className="border px-4 py-2">{row.qty_mailed}</td>
                  <td className="border px-4 py-2">{row.ntf_buyers}</td>
                  <td className="border px-4 py-2">${row.fe_cost.toFixed(2)}</td>
                  <td className="border px-4 py-2">${row.fe_cpo.toFixed(2)}</td>
                  <td className="border px-4 py-2">{row.fe_purch}</td>
                  <td className="border px-4 py-2">${row.fe_aov.toFixed(2)}</td>
                  <td className="border px-4 py-2">{row.fe_roi}</td>
                  <td className="border px-4 py-2">{row.subs_percent}</td>
                  <td className="border px-4 py-2">{row.be_orders_2}</td>
                  <td className="border px-4 py-2">{row.be_mlg_qty}</td>
                  <td className="border px-4 py-2">${row.be_cost.toFixed(2)}</td>
                  <td className="border px-4 py-2">${row.be_cpo.toFixed(2)}</td>
                  <td className="border px-4 py-2">{row.be_purch}</td>
                  <td className="border px-4 py-2">${row.be_aov_last.toFixed(2)}</td>
                  <td className="border px-4 py-2">${row.tot_purch.toFixed(2)}</td>
                  <td className="border px-4 py-2">${row.tot_cost.toFixed(2)}</td>
                  <td className="border px-4 py-2">${row.net_pl.toFixed(2)}</td>
                  <td className="border px-4 py-2">{row.lt_roi}</td>
                  <td className="border px-4 py-2">${row.pl_per_buyers.toFixed(2)}</td>
                  <td className="border px-4 py-2">{row.delta}</td>
                  <td className="border px-4 py-2">${row.pl_per_buyer_total.toFixed(2)}</td>
                  <td className="border px-4 py-2">{row.action}</td>
                  <td className="border px-4 py-2">{row.uploaded_file}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TableData;
