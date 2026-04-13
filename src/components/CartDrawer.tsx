import { X, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext'
import { href } from 'react-router-dom';

const CartDrawer = () => {
  const {
    isOpen,
    cart,
    toggleCart,
    removeItem
  } = useCart();

  if (!isOpen) return null;

  const goToCheckout = () => {
    window.location.href = "/checkout"
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0" onClick={toggleCart} />
      
      <div className="absolute inset-y-0 right-0 max-w-sm w-full bg-white shadow-xl flex flex-col">
        <div className="p-4 border-b flex justify-between items-center bg-gray-50">
          <h2 className="text-xl font-bold">Tu Carrito ({cart?.cartItems?.length || 0})</h2>
          <button onClick={toggleCart} className="p-2 hover:bg-gray-200 rounded-full">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cart?.cartItems?.length === 0 ? (
            <p className="text-center text-gray-500 mt-10">El carrito está vacío</p>
          ) : (
            cart?.cartItems?.map((item, index) => (
              <div key={`${item.variant.id}-${index}`} className="flex gap-4 border-b pb-4">
                <img src={item.variant?.images[0]?.mediumUrl} className="w-16 h-16 object-cover rounded" alt={item.variant.sku} />
                <div className="flex-1">
                  <h4 className="font-medium">{item.variant.name}-{item.variant.sku}</h4>
                  <p className="text-blue-600 font-bold">{item.variant.formattedPrice}</p>
                </div>
                <div className="flex-1">
                  <p className="text-lg text-gray-500">{item.quantity}</p>
                </div>
                <button 
                  onClick={() => removeItem(item.variant)}
                  className="text-red-500 hover:bg-red-50 px-2 rounded"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))
          )}
        </div>

        <div className="p-4 border-t bg-gray-50">
          <div className="flex justify-between text-xl font-bold mb-4">
            <span>Sub. Total:</span>
            <span>{cart?.formattedSubTotal}</span>
          </div>
          <div className="flex justify-between text-xl font-bold mb-4">
            <span>Total:</span>
            <span>{cart?.formattedTotal}</span>
          </div>
          <motion.button
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors"
            whileTap={{ scale: 0.95 }}
            onClick={() => goToCheckout()}
          >
            Comprar
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
