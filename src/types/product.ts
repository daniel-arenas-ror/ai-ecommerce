import type { OptionType } from './option_types'

export interface Product {
  id: number;
  name: string;
  slug: string;
  code: string;
  description: string;
  price: number;
  allImages: productImages[];
  optionValues: optionValues[];
  variants: variants[];
  groupedOptionValues: OptionType[];
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

export interface variants {
  id: number;
  sku: string;
  price: number;
  optionTypeName: string;
  optionValues: optionValues[];
  images: productImages[];
}
