import React, { useState } from "react";
import { useParams } from 'react-router-dom';
import type { Product } from '../types/product';
import Categories from "../components/Categories";

const Category: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [products, setProducts] = useState<Product | null>(null);

  return (
    <>
      <Categories />
      Category Page {id}
    </>
  )
}

export default Category;