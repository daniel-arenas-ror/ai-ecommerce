import { X, Trash2 } from 'lucide-react';
import type { Product, Coupon } from '../types/types';
import { motion } from 'framer-motion';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: Product[];
  coupon: Coupon[];
  onRemove: (id: number) => void;
  startPurchase: () => void;
}

const CartDrawer = ({ isOpen, onClose, items, coupon, onRemove, startPurchase }: CartDrawerProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0" onClick={onClose} />
      
      <div className="absolute inset-y-0 right-0 max-w-sm w-full bg-white shadow-xl flex flex-col">
        <div className="p-4 border-b flex justify-between items-center bg-gray-50">
          <h2 className="text-xl font-bold">Tu Carrito ({items.length})</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <p className="text-center text-gray-500 mt-10">El carrito está vacío</p>
          ) : (
            items.map((item, index) => (
              <div key={`${item.id}-${index}`} className="flex gap-4 border-b pb-4">
                <img src={item.image} className="w-16 h-16 object-cover rounded" alt={item.name} />
                <div className="flex-1">
                  <h4 className="font-medium">{item.name}</h4>
                  <p className="text-blue-600 font-bold">${item.price}</p>
                </div>
                <button 
                  onClick={() => onRemove(item.id)}
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
            <span>Descuentos:</span>
            {
              coupon.length > 0 && (<span className="text-green-600">- ${coupon.reduce((acc, c) => acc + c.discount, 0)}</span>)
            }
          </div>
          <div className="flex justify-between text-xl font-bold mb-4">
            <span>Sub. Total:</span>
            <span>${items.reduce((acc, item) => acc + item.price, 0)}</span>
          </div>
          <div className="flex justify-between text-xl font-bold mb-4">
            <span>Total:</span>
            <span>${items.reduce((acc, item) => acc + item.price, 0) - (coupon.length > 0 ? coupon.reduce((acc, c) => acc + c.discount, 0) : 0)}</span>
          </div>
          <motion.button
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors"
            whileTap={{ scale: 0.95 }}
            onClick={startPurchase}
          >
            Finalizar Compra
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
