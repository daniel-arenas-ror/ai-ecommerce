import React, { useEffect } from 'react';
import { useQuery } from "@apollo/client/react";
import { GET_CATEGORY_SLIDER_DATA } from '../../../api/queries/category';
import type { Category } from '../../../types/category';

//TODO: select correct slide category style
import CategorySection from './styles/styles1';

const CategorySlider: React.FC = () => {
  const [category, setCategory] = React.useState<Category | null>(null);
  const companyId = import.meta.env.VITE_COMPANNY_ID as string | undefined;
  const { loading, data } = useQuery<{ category: Category }>(GET_CATEGORY_SLIDER_DATA, {
    variables: {
      companyId: companyId,
      categorySlug: 'mujeres'
    }
  });

  useEffect(() => {
    if (data?.category) {
      setCategory(data.category);
    }
  }, [data?.category?.subCategories?.length]);

  if (loading || !category) return <div>Loading...</div>;

  return (
    <div>
      <CategorySection category={category} />
    </div>
  )
}

export default CategorySlider;
