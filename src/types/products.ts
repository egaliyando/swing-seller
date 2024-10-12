export interface Image {
  id: string;
  variant_id: string | null;
  status: string;
  path: string;
}

export interface Partner {
  id: string;
  fullname: string;
  logo: string;
}

export interface Category {
  name: string;
  level: number;
}

export interface Statistic {
  sold_count: number;
  review_count: number;
  review_rating: number;
  discussion_count: number;
}

export interface Inventory {
  stock: number;
}

export interface Product {
  id: string;
  name: string;
  prices: number[];
  discount_price: number;
  status: string;
  has_variant: boolean;
  created_at: string;
  images: Image[];
  partner: Partner;
  categories: Category[];
  statistic: Statistic;
  inventory: Inventory;
  selected?: boolean;
}

export type Products = Product[];
