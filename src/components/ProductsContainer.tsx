import React, { useEffect } from 'react';
import { useQuery } from "@apollo/client/react";
import type { Product } from '../types/product';
import { GET_PRODUCT_BY_CATEGORY } from '../api/queries/product';

const ProductDetail: React.FC<{ category_slug: string }> = ({ category_slug }) => {
  const [products, setProducts] = React.useState<Product[]>([]);
  const companyId = import.meta.env.VITE_COMPANNY_ID as string | undefined;
  const { loading, error, data } = useQuery(GET_PRODUCT_BY_CATEGORY, {
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
        <div key={product.id}>
          <h2>{product.name}</h2>
          {/* Render other product details as needed */}
        </div>
      ))}
    </>
  )
}

export default ProductDetail;
