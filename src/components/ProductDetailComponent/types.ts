import type { Product } from '../../types/product';

export type ProductDetailStyle = 'default' | 'premium'

export interface ProductDetailCardProps {
  product: Product;
}

export interface CardComponent {
  component: React.FC<ProductDetailCardProps>;
  description: string;
}
