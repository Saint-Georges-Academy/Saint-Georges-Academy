import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, GraduationCap } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0f1f3d] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#d4af37] to-[#b8941f] rounded-lg flex items-center justify-center">
                <GraduationCap className="w-7 h-7 text-[#0f1f3d]" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg text-white leading-tight">Saint-Georges Academy</span>
                <span className="text-sm text-[#d4af37] leading-tight">Official Cisco Networking Academy</span>
              </div>
            </div>
            <p className="text-gray-300 text-sm mb-4 max-w-md">
              Organisme de formation professionnelle spécialisé en réseaux, cybersécurité et Unreal Engine. 
              Structure pédagogique conforme au Référentiel National Qualité.
            </p>
            <p className="text-sm text-gray-400">
              SIRET: 528 616 113 00023
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-[#d4af37] mb-4">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-300 hover:text-[#d4af37] transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/courses" className="text-gray-300 hover:text-[#d4af37] transition-colors">
                  Formations
                </Link>
              </li>
              <li>
                <Link to="/videos" className="text-gray-300 hover:text-[#d4af37] transition-colors">
                  Vidéos CCNA
                </Link>
              </li>
              <li>
                <Link to="/funding" className="text-gray-300 hover:text-[#d4af37] transition-colors">
                  Financement
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-[#d4af37] mb-4">Contact</h3>
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
          <p>© {currentYear} Saint-Georges Academy. Tous droits réservés.</p>
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
