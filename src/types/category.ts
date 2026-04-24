import type { Product } from './product';
export interface Category {
  id: string | number;
  name: string;
  slug: string;
  subCategories?: Category[];
  images: categoryImages[];
  products?: Product[];
}

export interface categoryImages {
  id: number;
  url: string;
}
