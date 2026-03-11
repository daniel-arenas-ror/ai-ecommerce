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
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 px-4 py-8">
      {products.map((product) => (
        <div className="">
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={() => console.log('Added to cart:', product.name)}
            onViewDetail={() => console.log('Viewing detail:', product.name)}
            style="minimal2"
          />
        </div>
      ))}
    </div>
  )
}

export default ProductDetail;
