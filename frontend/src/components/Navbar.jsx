import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, GraduationCap } from 'lucide-react';
import { Button } from './ui/button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Accueil', path: '/' },
    { name: 'Formations', path: '/courses' },
    { name: 'Vidéos CCNA', path: '/videos' },
    { name: 'Financement', path: '/funding' },
    { name: 'Contact', path: '/contact' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src="https://customer-assets.emergentagent.com/job_ccna-loudun/artifacts/klaxr3o2_logo%20saint%20georges.webp" 
              alt="Saint-Georges Academy"
              className="h-14 w-auto object-contain"
            />
            <div className="flex flex-col">
              <span className="font-bold text-lg text-[#0f1f3d] leading-tight">Saint-Georges Academy</span>
              <span className="text-xs text-gray-600 leading-tight">International School</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? 'text-[#0f1f3d] bg-[#d4af37]/10'
                    : 'text-gray-700 hover:text-[#0f1f3d] hover:bg-gray-100'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Button className="ml-4 bg-[#d4af37] hover:bg-[#b8941f] text-[#0f1f3d] font-semibold">
              Inscription
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-[#0f1f3d] hover:bg-gray-100"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 pt-2 pb-4 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-md text-base font-medium transition-colors ${
                  isActive(item.path)
                    ? 'text-[#0f1f3d] bg-[#d4af37]/10'
                    : 'text-gray-700 hover:text-[#0f1f3d] hover:bg-gray-100'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Button className="w-full mt-3 bg-[#d4af37] hover:bg-[#b8941f] text-[#0f1f3d] font-semibold">
              Inscription
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
