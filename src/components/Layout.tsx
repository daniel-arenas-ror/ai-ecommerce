import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header cartLength={0} onCartButtonClick={() => {}} /> {/* This stays visible on all pages inside this route group */}
      <main className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet /> {/* This is where the specific page (Home, Details, etc.) renders */}
      </main>
    </div>
  );
};

export default Layout;