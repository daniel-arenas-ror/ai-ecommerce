import React, { useState, useEffect } from 'react';
import type { Category } from '../types/types';
import { useQuery } from "@apollo/client/react";
import { GET_CATEGORIES_DATA } from '../api/queries/category';
import Categories from '../components/Categories';

const Home: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const companyId = import.meta.env.VITE_COMPANNY_ID as string | undefined;

  const { loading, error, data } = useQuery(GET_CATEGORIES_DATA, {
    variables: { companyId: companyId }
  });

  useEffect(() => {
    if (data?.companyCategories) {
      console.log('Fetched categories data:', data.companyCategories);
      setCategories(data.companyCategories);
    }
  }, [data?.companyCategories?.length]);

  if (loading) return <div>Loading...</div>;
  
  return (
    <>
      <Categories categories={categories} />
      Home
    </>
  )
}

export default Home;
