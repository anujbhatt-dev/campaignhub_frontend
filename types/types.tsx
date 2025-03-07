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
    year: number;
    month: number;
  }
  