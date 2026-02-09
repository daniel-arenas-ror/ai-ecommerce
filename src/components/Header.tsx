import React from 'react';
import { ShoppingCart, User } from 'lucide-react';
import { motion, useAnimation } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  cartLength: number;
  onCartButtonClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartLength, onCartButtonClick }) => {
  const { isAuthenticated, logout } = useAuth();
  const controls = useAnimation();

  // This effect ensures the animation is triggered when cartLength changes
  React.useEffect(() => {
    controls.start({
      scale: [1, 1.1, 1],
      transition: { duration: 0.3 }
    });
  }, [cartLength, controls]);

  return (
    <header className="bg-white shadow-sm p-4 flex justify-between items-center z-10">
      <h1 className="text-2xl font-bold text-gray-800">AI Commerce</h1>
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
            <span className="font-medium">Guest</span>
          )}
        </div>
        <motion.button
          animate={controls}
          onClick={onCartButtonClick}
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
