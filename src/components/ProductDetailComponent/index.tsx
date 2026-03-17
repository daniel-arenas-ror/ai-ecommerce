import React from 'react';
import type { ProductDetailStyle } from './types'
import { getProductDetailFromConfig, cardFactory } from "./factory"
import type { Product } from '../../types/product';

interface ProductDetailProps {
  product: Product;
  style?: ProductDetailStyle;
  config?: Record<string, unknown>;
}

const ProductDetailComponent: React.FC<ProductDetailProps> = ({
  product,
  style: explicitStyle,
  config,
}) => {

  const style = explicitStyle || getProductDetailFromConfig(config)

  const { component: CardComponent } = cardFactory(style)

  return (
    <CardComponent
      product={product}
    />
  )
}

export default ProductDetailComponent;
