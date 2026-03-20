import React from 'react';
import type { ProductImageStyle } from './types'
import { getProductImagesFromConfig, cardFactory } from "./factory"
import type { productImages } from '../../types/product';

interface ProductDetailProps {
  productImages: productImages[] | undefined;
  style?: ProductImageStyle;
  config?: Record<string, unknown>;
}

const ProductImageComponent: React.FC<ProductDetailProps> = ({
  productImages,
  style: explicitStyle,
  config,
}) => {
  if(productImages === undefined) return <div></div>;

  const style = explicitStyle || getProductImagesFromConfig(config)

  const { component: CardComponent } = cardFactory(style)

  return (
    <CardComponent images={productImages}
    />
  )
}

export default ProductImageComponent;
