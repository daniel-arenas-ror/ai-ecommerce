import type { OptionType } from './option_types'

export interface Product {
  id: number;
  name: string;
  slug: string;
  code: string;
  description: string;
  price: number;
  formattedPrice: string;
  allImages: productImages[];
  optionValues: optionValues[];
  variants: variant[];
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

export interface variant {
  id: number;
  sku: string;
  name: string;
  price: number;
  isMaster: boolean;
  formattedPrice: string;
  optionTypeName: string;
  optionValues: optionValues[];
  images: productImages[];
}
