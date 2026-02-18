import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();

  const navigation = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.courses'), path: '/courses' },
    { name: t('nav.videos'), path: '/videos' },
    { name: t('nav.funding'), path: '/funding' },
    { name: t('nav.contact'), path: '/contact' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="https://customer-assets.emergentagent.com/job_ccna-loudun/artifacts/klaxr3o2_logo%20saint%20georges.webp" 
              alt="Saint-Georges Academy"
              className="h-16 w-auto object-contain hover:scale-105 transition-transform"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`px-5 py-2.5 rounded-lg text-base font-semibold transition-all ${
                  isActive(item.path)
                    ? 'text-white bg-[#0f1f3d]'
                    : 'text-[#0f1f3d] hover:text-white hover:bg-[#0f1f3d]/90'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <LanguageSwitcher />
            <Button className="ml-3 bg-[#d4af37] hover:bg-[#b8941f] text-[#0f1f3d] font-bold px-6 py-2.5 text-base shadow-lg">
              {t('nav.register')}
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
        <div className="md:hidden bg-white border-t-2 border-gray-200 shadow-lg">
          <div className="px-4 pt-2 pb-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block px-5 py-3 rounded-lg text-base font-semibold transition-all ${
                  isActive(item.path)
                    ? 'text-white bg-[#0f1f3d]'
                    : 'text-[#0f1f3d] hover:text-white hover:bg-[#0f1f3d]/90'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <div className="px-5 py-3">
              <LanguageSwitcher />
            </div>
            <Button className="w-full mt-3 bg-[#d4af37] hover:bg-[#b8941f] text-[#0f1f3d] font-bold py-3 text-base shadow-lg">
              {t('nav.register')}
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
