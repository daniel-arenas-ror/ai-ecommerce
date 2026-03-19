import type { productImages } from '../../types/product';

export type ProductImageStyle = 'default' | 'imageGridGallery'

export interface ProductImagesProps {
  images: productImages[];
}

export interface ProductImageComponent {
  component: React.FC<ProductImagesProps>;
  description: string;
}
