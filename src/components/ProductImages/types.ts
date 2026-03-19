import type { Product } from '../../types/product';

export type ProductImageStyle = 'default'

export interface ProductImagesProps {
  product: Product;
}

export interface ProductImageComponent {
  component: React.FC<ProductImagesProps>;
  description: string;
}
