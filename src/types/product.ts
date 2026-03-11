export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  allImages: productImages[];
}

export interface productImages {
  id: number;
  url: string;
  thumbUrl: string;
  mediumUrl: string;
  largeUrl: string;
}
