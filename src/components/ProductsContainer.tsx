import React, { useEffect, useState } from 'react';
import { useQuery } from "@apollo/client/react";
import type { Product } from '../types/product';
import { GET_PRODUCT_BY_CATEGORY } from '../api/queries/product';
import ProductCard from './ProductCard';
import { useSearchParams, useNavigate } from "react-router-dom";

const ProductDetail: React.FC<{ category_slug: string }> = ({ category_slug }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);

const buildRansackFilter = () => {
  const selectedOptions = searchParams.get("option_values")?.split(",") || [];
  const maxPrice = searchParams.get("max_p");

  return {
    variants_option_values_id_in: selectedOptions.length > 0 ? selectedOptions : undefined,
    price_lteq: maxPrice ? Number(maxPrice) : undefined,
    // to deal with min range proce
    // price_gteq: minPrice ? Number(minPrice) : undefined
  };
};

  const companyId = import.meta.env.VITE_COMPANNY_ID as string | undefined;
  const { loading, data } = useQuery<{ categoryProducts: Product[] }>(GET_PRODUCT_BY_CATEGORY, {
    variables: {
      companyId: companyId,
      categorySlug: category_slug,
      filter: buildRansackFilter()
    }
  });

  useEffect(() => {
    if (data?.categoryProducts) {
      setProducts(data.categoryProducts);
    }
  }, [data?.categoryProducts?.length]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 px-4 py-8">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={() => console.log('Added to cart:', product.name)}
          onViewDetail={() =>  navigate(`/profile/${product.slug}`) }
        />
      ))}
    </div>
  )
}

export default ProductDetail;
