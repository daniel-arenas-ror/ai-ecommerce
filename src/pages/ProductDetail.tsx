import React, { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from "@apollo/client/react";
import type { Product, productImages, variant } from '../types/product';
import { GET_PRODUCT_DETAIL } from '../api/queries/product';
import ProductDetailComponent from '../components/ProductDetailComponent'
import ProductImageComponent from '../components/ProductImages'
import { Minus, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext'
import Categories from '../components/Categories';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [ product, setProduct ] = useState<Product>();
  const [images, setImages] = useState<productImages[]>();
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [productVariants, setProductVariants] = useState<variant[]>();
  const { addItem } = useCart();

  const [quantity, setQuantity] = useState<number>(1);

  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const companyId = import.meta.env.VITE_COMPANNY_ID as string | undefined;
  const { loading, data } = useQuery<{ product: Product }>(GET_PRODUCT_DETAIL, {
    variables: {
      companyId: companyId,
      productSlug: id
    }
  });

  const selectedVariant = useMemo(() => {
    console.log('Current Selections:', selections);
    console.log('productVariants:', productVariants);

    if(productVariants?.length === 1){
      return productVariants[0];
    }

    const hasSelections = Object.keys(selections).length > 0;

    const matchedVariant = hasSelections 
    ? productVariants?.find((variant: any) => {
        if (variant.optionValues.length === 0) return false;
        return variant.optionValues.every((optValue: any) => {
          return selections[optValue.optionTypeName] === optValue.id;
        });
      })
    : productVariants?.find((variant: any) => !variant.isMaster) || productVariants?.[0]; // Fallback to master or first variant if no selections

    console.log("Matched Variant:", matchedVariant);

    if(hasSelections && matchedVariant && matchedVariant?.images?.length > 0){
      setImages(matchedVariant?.images);
    }

    return matchedVariant;

  }, [selections, productVariants]);

  useEffect(() => {
    if (data?.product) {
      setProduct(data.product);
      setImages(data.product?.allImages);
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
    <div className="w-full bg-gray-50 min-h-screen">
      <Categories />

      <div className="grid grid-cols-2 gap-12 p-8 max-w-7xl mx-auto items-start">
        <div className="sticky top-28 h-[600px] overflow-hidden rounded-[32px] bg-white border border-gray-100 shadow-lg">
          <ProductImageComponent productImages={images} />
        </div>

        <div className="space-y-10">
          <ProductDetailComponent product={product} />

          <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-xl space-y-8">
            {productVariants?.length !== 1 && (
              <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">
                Configuración de Producto
              </h3>
            )}

            {product?.groupedOptionValues.map((optionType) => (
              <div key={optionType.id} className="space-y-4">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-bold text-gray-900 uppercase tracking-tight">
                    {optionType.name}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  {optionType.optionValues.map((optionValue: any) => {
                    const isSelected = selections[optionType.name] === optionValue.id;

                    return (
                      <button
                        key={optionValue.id}
                        onClick={() => handleSelect(optionType.name, optionValue.id)}
                        className={`
                          min-w-[70px] px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200
                          border-2 flex items-center justify-center
                          ${isSelected 
                            ? 'border-black bg-black text-white shadow-md transform scale-105' 
                            : 'border-gray-100 bg-white text-gray-600 hover:border-gray-300 hover:text-black'
                          }
                        `}
                      >
                        {optionValue.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-900">
                  Cantidad:
                </label>
                
                <div className="flex items-center w-fit border border-gray-300">
                  <button
                    onClick={decrement}
                    className="p-3 hover:bg-gray-50 text-gray-600 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={16} strokeWidth={3} />
                  </button>
                  
                  <div className="w-12 text-center font-medium text-gray-900 select-none">
                    {quantity}
                  </div>
                  
                  <button
                    onClick={increment}
                    className="p-3 hover:bg-gray-50 text-gray-600 transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus size={16} strokeWidth={3} />
                  </button>
                </div>
              </div>

              {/* --- ACTION BUTTON --- */}
              <button 
                className="w-full bg-[#1A1A1A] hover:bg-black text-white font-black uppercase tracking-widest py-5 px-8 transition-all active:scale-[0.98] shadow-sm"
                onClick={() => addItem(selectedVariant, quantity)}
              >
                Agregar al carrito
              </button>
            </div>
          </div>

          <div className="h-[400px] bg-gray-100 rounded-[32px] flex items-center justify-center text-gray-400 text-sm italic">
            [ Additional Scrollable Details Here ]
          </div>
        </div>
      </div>

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
