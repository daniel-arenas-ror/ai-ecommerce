import React, { useState } from "react";
import { useParams } from 'react-router-dom';
import type { Product } from '../types/product';
import Categories from "../components/Categories";
import ProductDetail from "../components/ProductsContainer";

const Category: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [products, setProducts] = useState<Product | null>(null);

  return (
    <>
      <Categories />
      Category Page {id}
      <ProductDetail category_slug={id || ''} />
    </>
  )
}

export default Category;