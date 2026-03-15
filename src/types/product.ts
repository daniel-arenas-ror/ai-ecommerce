export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  allImages: productImages[];
  optionValues: optionValues[];
}

export interface productImages {
  id: number;
  url: string;
  thumbUrl: string;
  mediumUrl: string;
  largeUrl: string;
}

export interface optionValues {
  id: number;
  name: string;
  label: string;
  optionTypeName: string;
}
