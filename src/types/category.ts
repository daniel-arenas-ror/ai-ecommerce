export interface Category {
  id: string | number;
  name: string;
  slug: string;
  subCategories?: Category[];
  images: []
}
