import React from 'react';
import { cardFactory, getCardStyleFromConfig } from './cardFactory';
import type { ProductCardProps, CardStyle } from './types';
import { useCompany } from '../../context/CompanyContext';

interface ProductCardContainerProps extends ProductCardProps {
  /**
   * Card style. If not provided, will try to get from company context
   * or fallback to 'minimal'
   */
  style?: CardStyle;
  /**
   * Backend config object (usually from CompanyContext)
   * Used to determine card style if 'style' prop is not provided
   */
  config?: Record<string, unknown>;
}

/**
 * ProductCard - Main component with factory pattern
 * 
 * Usage:
 * - With explicit style: <ProductCard product={p} onAddToCart={fn} style="premium" />
 * - With config: <ProductCard product={p} onAddToCart={fn} config={company} />
 * - Default: <ProductCard product={p} onAddToCart={fn} />
 */
const ProductCard: React.FC<ProductCardContainerProps> = ({
  product,
  onAddToCart,
  onViewDetail,
  style: explicitStyle,
  config,
}) => {
  const { company } = useCompany();

  // Determine which style to use
  const cardStyle = explicitStyle || company?.productCardConfiguration || getCardStyleFromConfig(config);
  
  // Get the card component from factory
  const { component: CardComponent } = cardFactory(cardStyle);

  return (
    <CardComponent
      product={product}
      onAddToCart={onAddToCart}
      onViewDetail={onViewDetail}
    />
  );
};

export default ProductCard;
export type { ProductCardProps, CardStyle };
