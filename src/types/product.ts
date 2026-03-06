export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  url: string;
  url_images: string[];
  amenities: string[];
  images: productImages[];
}

export interface productImages {
  id: number;
  url: string;
  thumbUrl: string;
  mediumUrl: string;
  largeUrl: string;
}
