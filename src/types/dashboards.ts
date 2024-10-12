export interface Start {
  date: string; // ISO string date format
  product_detail_page_views: number;
  conversion_paid_orders: number;
  shop_visit_count: number;
  revenue: number;
}

export interface DashboardSummary {
  start: Start;
  diff_in_days: number; // Mengubah ke tipe number untuk merepresentasikan jumlah hari
}

export interface ChartData {
  date: string; // ISO string date format
  conversion_paid_orders?: number;
  shop_visit_count?: number;
  revenue?: number;
  product_detail_page_views?: number;
}

export interface Summary {
  start: {
    date: string; // ISO string date format
    conversion_paid_orders?: number;
    shop_visit_count?: number;
    revenue?: number;
    product_detail_page_views?: number;
  };
  diff_in_days: number; // Mengubah ke tipe number untuk merepresentasikan jumlah hari
}

export interface DashboardChart {
  category: string;
  summary: Summary;
  chart: ChartData[];
}
