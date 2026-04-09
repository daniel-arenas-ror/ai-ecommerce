import { Outlet } from 'react-router-dom';
import Header from './Header';
import CartDrawer from './../components/CartDrawer';

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header cartLength={0} onCartButtonClick={() => {}} />
      <main className="mx-auto sm:px-3 lg:px-4 pt-4">
        <Outlet />
      </main>

      <CartDrawer />
    </div>
  );
};

export default Layout;