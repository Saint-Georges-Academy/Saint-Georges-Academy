import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();
  const { isAuthenticated, user, logout } = useAuth();

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
        <div className="flex justify-between items-center h-24">
          {/* Logo */}
          <Link to="/" className="flex items-center flex-shrink-0">
            <img 
              src="https://customer-assets.emergentagent.com/job_ccna-loudun/artifacts/klaxr3o2_logo%20saint%20georges.webp" 
              alt="Saint-Georges Academy"
              className="h-20 w-auto object-contain hover:scale-105 transition-transform"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 ml-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
                  isActive(item.path)
                    ? 'text-white bg-[#0f1f3d]'
                    : 'text-[#0f1f3d] hover:text-white hover:bg-[#0f1f3d]/90'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <LanguageSwitcher />
            
            {isAuthenticated ? (
              <div className="flex items-center gap-2 ml-2">
                <Button asChild variant="outline" className="border-[#0f1f3d] text-[#0f1f3d]">
                  <Link to="/dashboard" data-testid="nav-dashboard-btn">
                    <User className="h-4 w-4 mr-2" />
                    {user?.first_name}
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2 ml-2">
                <Button asChild variant="outline" className="border-[#0f1f3d] text-[#0f1f3d]">
                  <Link to="/auth" data-testid="nav-login-btn">
                    Connexion
                  </Link>
                </Button>
                <Button asChild className="bg-[#d4af37] hover:bg-[#b8941f] text-[#0f1f3d] font-bold px-5 py-2 text-sm shadow-lg">
                  <Link to="/inscription" data-testid="nav-register-btn">
                    {t('nav.register')}
                  </Link>
                </Button>
              </div>
            )}
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
            
            {isAuthenticated ? (
              <div className="space-y-2 pt-2">
                <Button asChild variant="outline" className="w-full border-[#0f1f3d] text-[#0f1f3d]">
                  <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                    <User className="h-4 w-4 mr-2" />
                    Mon Espace
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full text-red-600 border-red-200 hover:bg-red-50"
                  onClick={() => { logout(); setIsOpen(false); }}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Déconnexion
                </Button>
              </div>
            ) : (
              <div className="space-y-2 pt-2">
                <Button asChild variant="outline" className="w-full border-[#0f1f3d] text-[#0f1f3d]">
                  <Link to="/auth" onClick={() => setIsOpen(false)}>
                    Connexion
                  </Link>
                </Button>
                <Button asChild className="w-full bg-[#d4af37] hover:bg-[#b8941f] text-[#0f1f3d] font-bold py-3 text-base shadow-lg">
                  <Link to="/inscription" onClick={() => setIsOpen(false)}>
                    {t('nav.register')}
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
