import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-machinery-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <img 
              src="/lovable-uploads/27d9c73b-7c62-4849-ab23-8e85f6c9d570.png" 
              alt="TBC.MC" 
              className="h-8 w-auto mb-4"
            />
            <p className="text-gray-300 mb-4">
              {t('footer.description')}
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <MapPin size={16} />
              <span>{t('footer.location')}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/machines" className="text-gray-300 hover:text-primary transition-colors">
                  {t('nav.machines')}
                </Link>
              </li>
              <li>
                <Link to="/accessories" className="text-gray-300 hover:text-primary transition-colors">
                  {t('nav.accessories')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-primary transition-colors">
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-primary transition-colors">
                  {t('nav.contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Equipment Categories */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{t('footer.equipment')}</h3>
            <ul className="space-y-2 text-gray-300">
              <li>{t('footer.miniExcavators')}</li>
              <li>{t('footer.backhoeLoaders')}</li>
              <li>{t('footer.hydraulicHammers')}</li>
              <li>{t('footer.buckets')}</li>
              <li>{t('footer.spareParts')}</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{t('nav.contact')}</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Phone size={16} />
                <a href="tel:+33620351337" className="text-gray-300 hover:text-white transition-colors">+33 6 20 35 13 37</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} />
                <a href="mailto:laurent.tubocom@gmail.com" className="text-gray-300 hover:text-white transition-colors">laurent.tubocom@gmail.com</a>
              </div>
              <div className="flex items-start gap-2">
                <Clock size={16} className="mt-1" />
                <div className="text-gray-300 text-sm">
                  <div>{t('footer.hours.weekdays')}</div>
                  <div>{t('footer.hours.saturday')}</div>
                  <div>{t('footer.hours.sunday')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm">
            {t('footer.copyright')}
          </div>
          <div className="flex space-x-6 text-sm text-gray-400 mt-4 md:mt-0">
            <span>{t('footer.privacy')}</span>
            <span>{t('footer.terms')}</span>
            <span>{t('footer.warranty')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;