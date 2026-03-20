import React, { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from "@apollo/client/react";
import type { Product, productImages, variants } from '../types/product';
import { GET_PRODUCT_DETAIL } from '../api/queries/product';
import ProductDetailComponent from '../components/ProductDetailComponent'
import ProductImageComponent from '../components/ProductImages'

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [ product, setProduct ] = useState<Product>();
  const [images, setImages] = useState<productImages[]>();
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [variantSelected, setVariantSelected] = useState<variants>();
  const [productVariants, setProductVariants] = useState<variants[]>();

  const companyId = import.meta.env.VITE_COMPANNY_ID as string | undefined;
  const { loading, data } = useQuery<{ product: Product }>(GET_PRODUCT_DETAIL, {
    variables: {
      companyId: companyId,
      productSlug: id
    }
  });

  const selectedVariant = useMemo(() => {
    return productVariants?.find((variant: any) => {
      if (variant.optionValues.length === 0) return false;
      // Check if EVERY optionValue in this variant matches the user's selection
      return variant?.optionValues?.every((optValue: any) => {
        return selections[optValue.optionTypeName] === optValue.id;
      });
    });
  }, [selections, productVariants]);

  useEffect(() => {
    if (data?.product) {
      setProduct(data.product);
      setImages(data.product?.allImages);
      setVariantSelected(data.product?.variants[0]);
      setProductVariants(data.product?.variants)
    }
  }, [data?.product]);

  if (product === undefined) return <div>Loading...</div>;
  if (loading) return <div>Loading...</div>;

  const handleSelect = (typeName: string, valueName: string) => {
    setSelections(prev => ({
      ...prev,
      [typeName]: valueName
    }));
  };

  return (
    // MAIN CONTAINER - 
    // This provides the scroll context and limits the overall maximum width.
    <div className="w-full bg-gray-50 min-h-screen">
      
      {/* 1. PRODUCT HEADER CONTAINER */}
      <header className="sticky top-0 w-full bg-white border-b border-gray-200 shadow-sm p-6">
        <h1 className="text-3xl font-black uppercase tracking-widest text-gray-900">
          {product?.name}
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Sku: {product?.code}
        </p>
      </header>

      {/* 2. IMAGE & PRODUCT DETAIL CONTAINER (THE STICKY TRACK) */}
      {/* This grid establishes the two-column layout. */}
      <div className="grid grid-cols-2 gap-12 p-8 max-w-7xl mx-auto items-start">
        
        {/* --- 2a. IMAGE CONTAINER --- */}
        {/* 'sticky top-28' is the critical class.
            When you scroll down, this div freezes 112px from the top (offsetting the header) 
            and stays frozen until the parent grid runs out of space. */}
        <div className="sticky top-28 h-[600px] overflow-hidden rounded-[32px] bg-white border border-gray-100 shadow-lg">
          <ProductImageComponent productImages={selectedVariant?.images || images} />
        </div>

        {/* --- 2b. PRODUCT DETAIL CONTAINER --- */}
        {/* This column is taller and contains a lot of text, causing it to scroll 
            independently while the image is stuck on the left. */}
        <div className="space-y-10">
          <ProductDetailComponent product={product} />

          <div className="bg-white p-10 rounded-[32px] border border-gray-100 shadow-lg">
            <h3>Opciones</h3>
            {product?.groupedOptionValues.map((optionType) => (
              <div key={optionType.id}>
                <p>{optionType.name}</p>

                {optionType.optionValues.map((optionValue: any) => (
                  <button
                    className='m-2 min-w-[60px] text-center px-4 py-2 border border-gray-200 rounded text-sm font-medium text-gray-700 hover:border-black hover:text-black hover:shadow-sm'
                    key={optionValue.id}
                    onClick={() => handleSelect(optionType.name, optionValue.id)}
                  >
                    {optionValue.name}
                  </button>
                ))}
                <hr />
              </div>
            ))}
          </div>

          <div className="h-[400px] bg-gray-100 rounded-[32px] flex items-center justify-center text-gray-400 text-sm italic">
            [ Additional Scrollable Details Here ]
          </div>
        </div>
      </div>

      {/* 3. PRODUCT AMENITIES CONTAINER */}
      {/* This section sits below the sticky track. When it becomes visible,
          it "pushes" the image container (the whole parent grid) up. */}
      <footer className="w-full h-[600px] mt-16 bg-gray-900 text-white p-16 rounded-t-[48px]">
        <div className="max-w-7xl mx-auto space-y-8">
          <h2 className="text-4xl font-extrabold tracking-tighter text-white">
            Amenities & Inclusions
          </h2>
          <div className="grid grid-cols-3 gap-8 text-sm text-gray-300">
            <div className="p-6 bg-gray-800 rounded-xl">Premium Warranty</div>
            <div className="p-6 bg-gray-800 rounded-xl">Free Global Shipping</div>
            <div className="p-6 bg-gray-800 rounded-xl">24/7 Support</div>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default ProductDetail;
