export interface Category {
  id: string | number;
  name: string;
  slug: string;
  subCategories?: Category[];
  images: categoryImages[]
}

export interface categoryImages {
  id: number;
  url: string;
}
