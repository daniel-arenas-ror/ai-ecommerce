import React from 'react';
import { ShoppingCart, User } from 'lucide-react';
import { motion, useAnimation } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useCompany } from '../context/CompanyContext';
import { Link } from 'react-router-dom';

interface HeaderProps {
  cartLength: number;
  onCartButtonClick: () => void;
}

const Header: React.FC<HeaderProps> = () => {
  const { isAuthenticated, logout } = useAuth();
  const { items } = useCart();
  const { company } = useCompany();
  const cartLength = items.length;
  const controls = useAnimation();

  React.useEffect(() => {
    controls.start({
      scale: [1, 1.1, 1],
      transition: { duration: 0.3 }
    });
  }, [cartLength, controls]);

  return (
    <header className="bg-white shadow-sm p-4 flex justify-between items-center z-10">
      <a href="/">
        <img src={import.meta.env.VITE_BACKEND_URL + (company?.iconUrl || '/default-icon.png')} alt={company?.name} className="h-8 mr-2" />
      </a>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-gray-600 border-r pr-4">
          <User size={20} />
          {isAuthenticated ? (
            <>
              <span className="font-medium">Daniel Arenas</span>
              <a href="/orders" className="ml-2 hover:text-blue-500">My Orders</a>
              <a href="/profile" className="ml-2 hover:text-blue-500">Profile</a>
              <button onClick={logout} className="ml-2 hover:text-blue-500">Logout</button>
            </>
          ) : (
            <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded">Login</Link>
          )}
        </div>
        <motion.button
          animate={controls}
          onClick={() => {}}
          className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ShoppingCart size={24} />
          <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
            {cartLength}
          </span>
        </motion.button>
      </div>
    </header>
  );
};

export default Header;
