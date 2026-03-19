import React from 'react';
import type { ProductImageStyle } from './types'
import { getProductImagesFromConfig, cardFactory } from "./factory"
import type { productImages } from '../../types/product';

interface ProductDetailProps {
  productImages: productImages[];
  style?: ProductImageStyle;
  config?: Record<string, unknown>;
}

const ProductImageComponent: React.FC<ProductDetailProps> = ({
  productImages,
  style: explicitStyle,
  config,
}) => {

  const style = explicitStyle || getProductImagesFromConfig(config)

  const { component: CardComponent } = cardFactory(style)

  return (
    <CardComponent
      images={productImages}
    />
  )
}

export default ProductImageComponent;
