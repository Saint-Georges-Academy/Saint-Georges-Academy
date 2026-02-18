import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();

  return (
    <footer className="bg-[#0f1f3d] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src="https://customer-assets.emergentagent.com/job_ccna-loudun/artifacts/klaxr3o2_logo%20saint%20georges.webp" 
                alt="Saint-Georges Academy"
                className="h-14 w-auto object-contain bg-white rounded-lg p-1"
              />
              <div className="flex flex-col">
                <span className="font-bold text-lg text-white leading-tight">{t('footer.brand')}</span>
                <span className="text-sm text-[#d4af37] leading-tight">{t('footer.intSchool')}</span>
              </div>
            </div>
            <p className="text-gray-300 text-sm mb-4 max-w-md">
              {t('footer.description')}
            </p>
            <p className="text-sm text-gray-400">
              SIRET: 528 616 113 00023
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-[#d4af37] mb-4">{t('footer.navigation')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-300 hover:text-[#d4af37] transition-colors">
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link to="/courses" className="text-gray-300 hover:text-[#d4af37] transition-colors">
                  {t('nav.courses')}
                </Link>
              </li>
              <li>
                <Link to="/videos" className="text-gray-300 hover:text-[#d4af37] transition-colors">
                  {t('nav.videos')}
                </Link>
              </li>
              <li>
                <Link to="/funding" className="text-gray-300 hover:text-[#d4af37] transition-colors">
                  {t('nav.funding')}
                </Link>
              </li>
            </ul>
            
            {/* Legal Links */}
            <h3 className="font-semibold text-[#d4af37] mt-6 mb-4">Informations légales</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/inscription" className="text-gray-300 hover:text-[#d4af37] transition-colors">
                  Procédure d'inscription
                </Link>
              </li>
              <li>
                <Link to="/accessibilite" className="text-gray-300 hover:text-[#d4af37] transition-colors">
                  Accessibilité & Handicap
                </Link>
              </li>
              <li>
                <Link to="/rgpd" className="text-gray-300 hover:text-[#d4af37] transition-colors">
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link to="/cgv" className="text-gray-300 hover:text-[#d4af37] transition-colors">
                  CGV
                </Link>
              </li>
              <li>
                <Link to="/mentions-legales" className="text-gray-300 hover:text-[#d4af37] transition-colors">
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link to="/indicateurs" className="text-gray-300 hover:text-[#d4af37] transition-colors">
                  Indicateurs de performance
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-[#d4af37] mb-4">{t('footer.contact')}</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-[#d4af37] mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">
                  2 venelle des Amandiers<br />
                  86200 Loudun, France
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-[#d4af37] flex-shrink-0" />
                <a href="tel:+33549227510" className="text-gray-300 hover:text-[#d4af37] transition-colors">
                  +33 (0)5 49 22 75 10
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-[#d4af37] flex-shrink-0" />
                <a href="mailto:contact@saint-georges.academy" className="text-gray-300 hover:text-[#d4af37] transition-colors">
                  contact@saint-georges.academy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-sm text-gray-400 text-center">
          <p>© {currentYear} Saint-Georges Academy. {t('footer.rights')}</p>
          <p className="mt-2">
            <a href="https://saint-georges.academy" className="hover:text-[#d4af37] transition-colors">
              www.saint-georges.academy
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
