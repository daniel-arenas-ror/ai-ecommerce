import type { Product } from '../../types/types';

export type CardStyle = 'minimal' | 'premium' | 'compact' | 'detailed';

export interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onViewDetail: (product: Product) => void;
  style?: CardStyle;
}

export interface CardComponent {
  component: React.FC<ProductCardProps>;
  description: string;
}
