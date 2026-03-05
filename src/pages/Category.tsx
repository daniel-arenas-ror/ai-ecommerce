import React, { useState } from "react";
import { useParams } from 'react-router-dom';
import type { Product } from '../types/product';

const Category: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [products, setProducts] = useState<Product | null>(null);

  return (
    <div>
      Category Page
    </div>
  )
}

export default Category;