import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      <nav className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-xl font-bold">
            Business Directory
          </Link>
          <div className="space-x-4">
            <Link to="/" className="hover:text-gray-300">
              Home
            </Link>
            <Link to="/add-business" className="hover:text-gray-300">
              Add Business
            </Link>
          </div>
        </div>
      </nav>
      
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
