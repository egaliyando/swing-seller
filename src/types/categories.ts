export interface Resolution {
  size: number;
  path: string;
}

export interface Image {
  id: string;
  file_name: string;
  type: string;
  resolutions: Resolution[];
  path: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  level: number;
  image: Image | null;
  parent_id: string | null;
  children: Category[];
}
