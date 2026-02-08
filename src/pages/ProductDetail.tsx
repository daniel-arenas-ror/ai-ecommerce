import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { Product } from '../types/product';
import { getProduct } from '../api/repositories/product';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) return <div>Loading product details...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  if (!product) return <div>Product not found.</div>;

  return (
    <div className="product-container" style={{ display: 'flex', gap: '2rem', padding: '20px' }}>
      {/* Image Gallery */}
      <div className="product-images" style={{ flex: 1 }}>
        {product.url_images.map((img, index) => (
          <img 
            key={index} 
            src={img} 
            alt={`${product.name} - ${index}`} 
            style={{ width: '100%', marginBottom: '10px', borderRadius: '8px' }} 
          />
        ))}
      </div>

      {/* Product Info */}
      <div className="product-info" style={{ flex: 1 }}>
        <h1>{product.name}</h1>
        <p className="price" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
          ${product.price.toLocaleString()}
        </p>
        <p className="description">{product.description}</p>
        
        <h3>Amenities</h3>
        <ul>
          {product.amenities.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        <a href={product.url} target="_blank" rel="noreferrer">
          View Original Source
        </a>

        <div style={{ marginTop: '20px' }}>
          <button style={{ padding: '10px 20px', cursor: 'pointer' }}>
            Add to Shopping Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
