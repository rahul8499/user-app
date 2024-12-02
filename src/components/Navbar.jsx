import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-orange-600 font-serif p-4">
      <div className="container mx-auto text-white">
        <Link to="/" className="text-lg font-bold">
          UserList
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
