import React, { useEffect } from 'react';
import { useQuery } from "@apollo/client/react";
import type { Product } from '../types/product';
import { GET_PRODUCT_BY_CATEGORY } from '../api/queries/product';
import ProductCard from './ProductCard';

const ProductDetail: React.FC<{ category_slug: string }> = ({ category_slug }) => {
  const [products, setProducts] = React.useState<Product[]>([]);
  const companyId = import.meta.env.VITE_COMPANNY_ID as string | undefined;
  const { loading, data } = useQuery<{ categoryProducts: Product[] }>(GET_PRODUCT_BY_CATEGORY, {
    variables: { companyId: companyId, categorySlug: category_slug }
  });

  useEffect(() => {
    if (data?.categoryProducts) {
      console.log('Fetched products data:', data.categoryProducts);
      setProducts(data.categoryProducts);
    }
  }, [data?.categoryProducts?.length]);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={() => console.log('Added to cart:', product.name)}
          onViewDetail={() => console.log('Viewing detail:', product.name)}
          style="minimal"
        />
      ))}
    </>
  )
}

export default ProductDetail;
