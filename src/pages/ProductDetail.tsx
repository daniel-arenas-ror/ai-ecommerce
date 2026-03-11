import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { Product } from '../types/product';
import { getProduct } from '../api/repositories/product';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState<string>("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        getProduct(id!).then(response => {
          setProduct(response);
        });
      } catch (err) {
        setError("Could not load product details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );

  if (error || !product) return (
    <div className="text-center mt-20 text-red-500 font-semibold">{error || "Product not found"}</div>
  );

return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 lg:items-start">
        
        {/* Left Side: Image Gallery */}
        <div className="flex flex-col-reverse">
          <div className="mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none">
            <div className="grid grid-cols-4 gap-4">
              {product.url_images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(img)}
                  className={`relative h-24 bg-white rounded-md flex items-center justify-center cursor-pointer hover:opacity-75 overflow-hidden ring-offset-2 ${activeImage === img ? 'ring-2 ring-blue-500' : 'ring-0'}`}
                >
                  <img src={img} alt="" className="w-full h-full object-center object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="w-full aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-gray-100">
            {activeImage && <img
              src={activeImage}
              alt={product.name}
              className="w-full h-full object-center object-cover shadow-sm transition-all duration-300"
            />}
          </div>
        </div>

        {/* Right Side: Product Info */}
        <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">{product.name}</h1>
          
          <div className="mt-3">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl text-gray-900 font-bold">${product.price.toLocaleString()}</p>
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">Description</h3>
            <div className="mt-2 text-base text-gray-700 leading-relaxed">
              {product.description}
            </div>
          </div>

          <div className="mt-8 border-t border-gray-200 pt-8">
            <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">Amenities</h3>
            <ul className="mt-4 grid grid-cols-2 gap-y-2">
              {product.amenities}
            </ul>
          </div>

          <div className="mt-10 flex flex-col space-y-4">
            <button
              className="w-full bg-blue-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Add to Shopping Cart
            </button>
            <a
              href={product.url}
              target="_blank"
              rel="noreferrer"
              className="text-center text-sm text-blue-600 hover:text-blue-500 font-medium"
            >
              View original website →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
