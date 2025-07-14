import React, { createContext, useContext, useState } from 'react';

type Language = 'fr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  fr: {
    // Header
    'nav.home': 'Accueil',
    'nav.machines': 'Machines',
    'nav.accessories': 'Accessoires',
    'nav.about': 'À propos',
    'nav.contact': 'Contact',
    'nav.getQuote': 'Demander un devis',
    
    // Hero
    'hero.title': 'Votre partenaire de confiance pour l\'équipement de construction',
    'hero.subtitle': 'Spécialisés dans la vente d\'excavateurs et d\'équipements de construction de qualité supérieure pour les professionnels de Monaco et du Sud de la France.',
    'hero.cta.primary': 'Voir nos machines',
    'hero.cta.secondary': 'Demander un devis',
    
    // Featured Machines
    'featured.title': 'Machines Vedettes',
    'featured.subtitle': 'Découvrez notre sélection d\'équipements de construction premium',
    'featured.viewAll': 'Voir toutes les machines',
    'featured.viewDetails': 'Voir les détails',
    'featured.inStock': 'En stock',
    'featured.preOrder': 'Pré-commande',
    
    // Trust Section
    'trust.title': 'Partenaires de confiance',
    'trust.subtitle': 'Nous travaillons avec les marques les plus respectées de l\'industrie',
    
    // Services
    'services.title': 'Services Professionnels d\'Équipement',
    'services.subtitle': 'De la livraison à la maintenance, nous fournissons un support complet pour maintenir vos équipements de construction en parfait état.',
    'services.requestService': 'Demander un service',
    'services.emergency': 'Urgence',
    'services.completeSupport': 'Support Complet d\'Équipement',
    'services.completeSupport.subtitle': 'Nous ne vendons pas seulement des équipements – nous sommes vos partenaires tout au long du cycle de vie',
    'services.warranty.title': 'Garantie & Service Après-Vente',
    'services.warranty.desc': 'Garantie complète de 2 ans sur tous les équipements neufs avec couverture complète des pièces et de la main-d\'œuvre.',
    'services.warranty.features.0': 'Garantie complète de 2 ans',
    'services.warranty.features.1': 'Service de réparation sur site',
    'services.warranty.features.2': 'Support d\'urgence en cas de panne',
    'services.warranty.features.3': 'Programmes de maintenance régulière',
    'services.spareParts.title': 'Fourniture de Pièces Détachées',
    'services.spareParts.desc': 'Pièces détachées d\'origine pour toutes les grandes marques avec livraison rapide à travers Monaco et le Sud de la France.',
    'services.spareParts.features.0': 'Pièces OEM d\'origine',
    'services.spareParts.features.1': 'Livraison 24-48 heures',
    'services.spareParts.features.2': 'Prix compétitifs',
    'services.spareParts.features.3': 'Support technique',
    'services.customBranding.title': 'Marquage & Peinture Personnalisés',
    'services.customBranding.desc': 'Personnalisez vos équipements avec des couleurs de peinture personnalisées et le marquage de votre entreprise.',
    'services.customBranding.features.0': 'Schemes de couleurs personnalisés',
    'services.customBranding.features.1': 'Application de logo',
    'services.customBranding.features.2': 'Marquage d\'entreprise',
    'services.customBranding.features.3': 'Revêtements protecteurs',
    'services.delivery.title': 'Livraison & Transport',
    'services.delivery.desc': 'Service de livraison professionnel avec transport sécurisé jusqu\'à votre chantier.',
    'services.delivery.features.0': 'Transport assuré',
    'services.delivery.features.1': 'Planification flexible',
    'services.delivery.features.2': 'Livraison sur site',
    'services.delivery.features.3': 'Positionnement d\'équipement',
    'services.financing.title': 'Financement d\'Équipement',
    'services.financing.desc': 'Options de financement flexibles pour vous aider à acquérir l\'équipement dont vous avez besoin.',
    'services.financing.features.0': 'Taux compétitifs',
    'services.financing.features.1': 'Conditions flexibles',
    'services.financing.features.2': 'Approbation rapide',
    'services.financing.features.3': 'Options de location disponibles',
    'services.maintenance.title': 'Services de Maintenance',
    'services.maintenance.desc': 'Maintenance professionnelle pour maintenir vos équipements à leur performance optimale.',
    'services.maintenance.features.0': 'Maintenance programmée',
    'services.maintenance.features.1': 'Service du système hydraulique',
    'services.maintenance.features.2': 'Diagnostics moteur',
    'services.maintenance.features.3': 'Optimisation des performances',
    'services.emergency.title': 'Service d\'Urgence 24/7',
    'services.emergency.subtitle': 'Panne d\'équipement ? Notre équipe d\'intervention d\'urgence est disponible 24h/24 pour vous remettre en marche rapidement.',
    'services.emergency.call': 'Appeler la ligne d\'urgence',
    'services.coverage.title': 'Zone de Couverture des Services',
    'services.coverage.subtitle': 'Nous fournissons des services dans tout Monaco et la Côte d\'Azur',
    'services.coverage.notListed': 'Vous ne voyez pas votre localisation ?',
    'services.coverage.contactUs': 'Contactez-nous',
    'services.coverage.mayServe': '- nous pouvons peut-être encore desservir votre région.',
    'services.cta.title': 'Prêt à commencer ?',
    'services.cta.subtitle': 'Que vous ayez besoin d\'équipement, de service ou de support, notre équipe est là pour vous aider à réussir vos projets de construction.',
    'services.cta.getQuote': 'Obtenir un devis de service',
    'services.cta.browseEquipment': 'Parcourir l\'équipement',
    
    // Machines
    'machines.title': 'Équipement de Construction à Vendre',
    'machines.subtitle': 'Parcourez notre vaste collection d\'équipements de construction premium. Tous les équipements sont livrés avec garantie et support professionnel.',
    'machines.search': 'Rechercher des machines...',
    'machines.category': 'Catégorie',
    'machines.brand': 'Marque',
    'machines.allCategories': 'Toutes les catégories',
    'machines.allBrands': 'Toutes les marques',
    'machines.found': 'Machine trouvée',
    'machines.foundPlural': 'Machines trouvées',
    'machines.showingResults': 'Affichage des résultats pour vos critères de recherche',
    'machines.priceOnRequest': 'Prix sur demande',
    'machines.noResults': 'Aucune machine trouvée',
    'machines.noResults.subtitle': 'Essayez d\'ajuster vos critères de recherche ou parcourez tous les équipements disponibles.',
    'machines.clearFilters': 'Effacer les filtres',
    
    // About
    'about.hero.title': 'À Propos de TBC.MC',
    'about.hero.subtitle': 'Votre partenaire de confiance pour l\'équipement de construction depuis plus de 10 ans',
    'about.story.title': 'Notre Histoire',
    'about.story.text': 'Fondée à Monaco, TBC.MC s\'est établie comme le fournisseur leader d\'équipement de construction dans la région. Nous servons les entrepreneurs, les entreprises de location et les professionnels de la construction avec des machines de la plus haute qualité et un service exceptionnel.',
    'about.mission.title': 'Notre Mission',
    'about.mission.text': 'Fournir aux professionnels de la construction l\'équipement et le support dont ils ont besoin pour réussir leurs projets, tout en maintenant les plus hauts standards de qualité et de service.',
    'about.values.title': 'Nos Valeurs',
    'about.values.quality': 'Qualité',
    'about.values.quality.desc': 'Nous ne proposons que les meilleures marques et équipements',
    'about.values.service': 'Service',
    'about.values.service.desc': 'Support client exceptionnel à chaque étape',
    'about.values.trust': 'Confiance',
    'about.values.trust.desc': 'Relations à long terme basées sur la fiabilité',
    'about.values.expertise': 'Expertise',
    'about.values.expertise.desc': 'Connaissance approfondie de l\'industrie et des équipements',
    'about.coverage.title': 'Zone de Couverture',
    'about.coverage.subtitle': 'Nous servons Monaco et toute la région du Sud de la France',
    'about.team.title': 'Notre Équipe',
    'about.team.subtitle': 'Des professionnels expérimentés dédiés à votre succès',
    'about.cta.title': 'Travaillons Ensemble',
    'about.cta.subtitle': 'Découvrez pourquoi les professionnels de la construction nous font confiance pour leurs besoins en équipement.',
    
    // Contact
    'contact.hero.title': 'Contactez-Nous',
    'contact.hero.subtitle': 'Prêt à discuter de vos besoins en équipement ? Notre équipe est là pour vous aider.',
    'contact.form.title': 'Envoyez-nous un message',
    'contact.form.name': 'Nom complet',
    'contact.form.email': 'Email',
    'contact.form.phone': 'Téléphone',
    'contact.form.company': 'Entreprise',
    'contact.form.subject': 'Sujet',
    'contact.form.message': 'Message',
    'contact.form.send': 'Envoyer le message',
    'contact.info.title': 'Informations de Contact',
    'contact.info.address': 'Adresse',
    'contact.info.phone': 'Téléphone',
    'contact.info.email': 'Email',
    'contact.info.hours': 'Heures d\'ouverture',
    'contact.info.hours.weekdays': 'Lun - Ven: 8h00 - 18h00',
    'contact.info.hours.saturday': 'Sam: 9h00 - 17h00',
    'contact.info.hours.sunday': 'Dim: Fermé',
    'contact.emergency.title': 'Service d\'Urgence',
    'contact.emergency.subtitle': 'Pour les urgences en dehors des heures d\'ouverture',
    'contact.emergency.available': 'Disponible 24/7',
    
    // Product Detail
    'product.backToMachines': 'Retour aux machines',
    'product.requestQuote': 'Demander un devis',
    'product.specifications': 'Spécifications',
    'product.description': 'Description',
    'product.related': 'Produits Similaires',
    'product.weight': 'Poids',
    'product.power': 'Puissance',
    'product.category': 'Catégorie',
    'product.brand': 'Marque',
    
    // Footer
    'footer.description': 'Votre partenaire de confiance pour les équipements de construction à Monaco et dans le Sud de la France. Machines de qualité, service professionnel, prix compétitifs.',
    'footer.location': 'Monaco • Sud de la France',
    'footer.quickLinks': 'Liens rapides',
    'footer.equipment': 'Équipements',
    'footer.miniExcavators': 'Mini-pelles',
    'footer.backhoeLoaders': 'Chargeuses-pelleteuses',
    'footer.hydraulicHammers': 'Marteaux hydrauliques',
    'footer.buckets': 'Godets et accessoires',
    'footer.spareParts': 'Pièces détachées',
    'footer.hours.weekdays': '7h00 - 20h00',
    'footer.hours.saturday': '7 jours sur 7',
    'footer.hours.sunday': 'Service disponible',
    'footer.copyright': '© 2024 TBC.MC. Tous droits réservés.',
    'footer.privacy': 'Politique de confidentialité',
    'footer.terms': 'Conditions d\'utilisation',
    'footer.warranty': 'Garantie',
    
    // Common
    'common.learnMore': 'En savoir plus',
    'common.viewDetails': 'Voir les détails',
    'common.getQuote': 'Demander un devis',
    'common.contactUs': 'Nous contacter',
    'common.premium': 'Premium',
    'common.fast': 'Rapide',
    'common.custom': 'Personnalisé',
    'common.reliable': 'Fiable',
    'common.flexible': 'Flexible',
    'common.expert': 'Expert',
  },
  en: {
    // Header
    'nav.home': 'Home',
    'nav.machines': 'Machines',
    'nav.accessories': 'Accessories',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.getQuote': 'Get Quote',
    
    // Hero
    'hero.title': 'Your Trusted Partner for Construction Equipment',
    'hero.subtitle': 'Specializing in premium excavators and construction equipment sales for professionals across Monaco and South of France.',
    'hero.cta.primary': 'View Our Machines',
    'hero.cta.secondary': 'Get Quote',
    
    // Featured Machines
    'featured.title': 'Featured Machines',
    'featured.subtitle': 'Discover our selection of premium construction equipment',
    'featured.viewAll': 'View All Machines',
    'featured.viewDetails': 'View Details',
    'featured.inStock': 'In Stock',
    'featured.preOrder': 'Pre-order',
    
    // Trust Section
    'trust.title': 'Trusted Partners',
    'trust.subtitle': 'We work with the most respected brands in the industry',
    
    // Services
    'services.title': 'Professional Equipment Services',
    'services.subtitle': 'From delivery to maintenance, we provide comprehensive support to keep your construction equipment running smoothly.',
    'services.requestService': 'Request Service',
    'services.emergency': 'Emergency',
    'services.completeSupport': 'Complete Equipment Support',
    'services.completeSupport.subtitle': 'We don\'t just sell equipment – we partner with you for the entire lifecycle',
    'services.warranty.title': 'Warranty & After-Sales Service',
    'services.warranty.desc': 'Comprehensive 2-year warranty on all new equipment with full parts and labor coverage.',
    'services.warranty.features.0': '2-year comprehensive warranty',
    'services.warranty.features.1': 'On-site repair service',
    'services.warranty.features.2': 'Emergency breakdown support',
    'services.warranty.features.3': 'Regular maintenance programs',
    'services.spareParts.title': 'Spare Parts Supply',
    'services.spareParts.desc': 'Genuine spare parts for all major brands with fast delivery across Monaco and South of France.',
    'services.spareParts.features.0': 'Genuine OEM parts',
    'services.spareParts.features.1': '24-48 hour delivery',
    'services.spareParts.features.2': 'Competitive pricing',
    'services.spareParts.features.3': 'Technical support',
    'services.customBranding.title': 'Custom Branding & Paint',
    'services.customBranding.desc': 'Personalize your equipment with custom paint colors and company branding.',
    'services.customBranding.features.0': 'Custom color schemes',
    'services.customBranding.features.1': 'Logo application',
    'services.customBranding.features.2': 'Company branding',
    'services.customBranding.features.3': 'Protective coatings',
    'services.delivery.title': 'Delivery & Transportation',
    'services.delivery.desc': 'Professional delivery service with secure transportation to your job site.',
    'services.delivery.features.0': 'Insured transportation',
    'services.delivery.features.1': 'Flexible scheduling',
    'services.delivery.features.2': 'On-site delivery',
    'services.delivery.features.3': 'Equipment positioning',
    'services.financing.title': 'Equipment Financing',
    'services.financing.desc': 'Flexible financing options to help you acquire the equipment you need.',
    'services.financing.features.0': 'Competitive rates',
    'services.financing.features.1': 'Flexible terms',
    'services.financing.features.2': 'Quick approval',
    'services.financing.features.3': 'Lease options available',
    'services.maintenance.title': 'Maintenance Services',
    'services.maintenance.desc': 'Professional maintenance to keep your equipment running at peak performance.',
    'services.maintenance.features.0': 'Scheduled maintenance',
    'services.maintenance.features.1': 'Hydraulic system service',
    'services.maintenance.features.2': 'Engine diagnostics',
    'services.maintenance.features.3': 'Performance optimization',
    'services.emergency.title': '24/7 Emergency Service',
    'services.emergency.subtitle': 'Equipment breakdown? Our emergency response team is available around the clock to get you back up and running quickly.',
    'services.emergency.call': 'Call Emergency Line',
    'services.coverage.title': 'Service Coverage Area',
    'services.coverage.subtitle': 'We provide services throughout Monaco and the French Riviera',
    'services.coverage.notListed': 'Don\'t see your location?',
    'services.coverage.contactUs': 'Contact us',
    'services.coverage.mayServe': '- we may still be able to serve your area.',
    'services.cta.title': 'Ready to Get Started?',
    'services.cta.subtitle': 'Whether you need equipment, service, or support, our team is here to help you succeed in your construction projects.',
    'services.cta.getQuote': 'Get Service Quote',
    'services.cta.browseEquipment': 'Browse Equipment',
    
    // Machines
    'machines.title': 'Construction Equipment for Sale',
    'machines.subtitle': 'Browse our extensive collection of premium construction machinery. All equipment comes with warranty and professional support.',
    'machines.search': 'Search machines...',
    'machines.category': 'Category',
    'machines.brand': 'Brand',
    'machines.allCategories': 'All Categories',
    'machines.allBrands': 'All Brands',
    'machines.found': 'Machine Found',
    'machines.foundPlural': 'Machines Found',
    'machines.showingResults': 'Showing results for your search criteria',
    'machines.priceOnRequest': 'Price on request',
    'machines.noResults': 'No machines found',
    'machines.noResults.subtitle': 'Try adjusting your search criteria or browse all available equipment.',
    'machines.clearFilters': 'Clear Filters',
    
    // About
    'about.hero.title': 'About TBC.MC',
    'about.hero.subtitle': 'Your trusted construction equipment partner for over 10 years',
    'about.story.title': 'Our Story',
    'about.story.text': 'Founded in Monaco, TBC.MC has established itself as the leading construction equipment supplier in the region. We serve contractors, rental companies, and construction professionals with the highest quality machinery and exceptional service.',
    'about.mission.title': 'Our Mission',
    'about.mission.text': 'To provide construction professionals with the equipment and support they need to succeed in their projects, while maintaining the highest standards of quality and service.',
    'about.values.title': 'Our Values',
    'about.values.quality': 'Quality',
    'about.values.quality.desc': 'We only offer the finest brands and equipment',
    'about.values.service': 'Service',
    'about.values.service.desc': 'Exceptional customer support at every step',
    'about.values.trust': 'Trust',
    'about.values.trust.desc': 'Long-term relationships built on reliability',
    'about.values.expertise': 'Expertise',
    'about.values.expertise.desc': 'Deep industry and equipment knowledge',
    'about.coverage.title': 'Coverage Area',
    'about.coverage.subtitle': 'We serve Monaco and the entire South of France region',
    'about.team.title': 'Our Team',
    'about.team.subtitle': 'Experienced professionals dedicated to your success',
    'about.cta.title': 'Let\'s Work Together',
    'about.cta.subtitle': 'Discover why construction professionals trust us for their equipment needs.',
    
    // Contact
    'contact.hero.title': 'Contact Us',
    'contact.hero.subtitle': 'Ready to discuss your equipment needs? Our team is here to help.',
    'contact.form.title': 'Send us a message',
    'contact.form.name': 'Full Name',
    'contact.form.email': 'Email',
    'contact.form.phone': 'Phone',
    'contact.form.company': 'Company',
    'contact.form.subject': 'Subject',
    'contact.form.message': 'Message',
    'contact.form.send': 'Send Message',
    'contact.info.title': 'Contact Information',
    'contact.info.address': 'Address',
    'contact.info.phone': 'Phone',
    'contact.info.email': 'Email',
    'contact.info.hours': 'Business Hours',
    'contact.info.hours.weekdays': 'Mon - Fri: 8:00 AM - 6:00 PM',
    'contact.info.hours.saturday': 'Sat: 9:00 AM - 5:00 PM',
    'contact.info.hours.sunday': 'Sun: Closed',
    'contact.emergency.title': 'Emergency Service',
    'contact.emergency.subtitle': 'For after-hours emergencies',
    'contact.emergency.available': 'Available 24/7',
    
    // Product Detail
    'product.backToMachines': 'Back to Machines',
    'product.requestQuote': 'Request Quote',
    'product.specifications': 'Specifications',
    'product.description': 'Description',
    'product.related': 'Related Products',
    'product.weight': 'Weight',
    'product.power': 'Power',
    'product.category': 'Category',
    'product.brand': 'Brand',
    
    // Footer
    'footer.description': 'Your trusted partner for construction equipment in Monaco and the South of France. Quality machines, professional service, competitive prices.',
    'footer.location': 'Monaco • South of France',
    'footer.quickLinks': 'Quick Links',
    'footer.equipment': 'Equipment',
    'footer.miniExcavators': 'Mini-excavators',
    'footer.backhoeLoaders': 'Backhoe loaders',
    'footer.hydraulicHammers': 'Hydraulic hammers',
    'footer.buckets': 'Buckets & attachments',
    'footer.spareParts': 'Spare parts',
    'footer.hours.weekdays': 'Mon-Fri: 8:00 - 18:00',
    'footer.hours.saturday': 'Sat: 9:00 - 16:00',
    'footer.hours.sunday': 'Sun: By appointment',
    'footer.copyright': '© 2024 TBC.MC. All rights reserved.',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.warranty': 'Warranty',
    
    // Common
    'common.learnMore': 'Learn More',
    'common.viewDetails': 'View Details',
    'common.getQuote': 'Get Quote',
    'common.contactUs': 'Contact Us',
    'common.premium': 'Premium',
    'common.fast': 'Fast',
    'common.custom': 'Custom',
    'common.reliable': 'Reliable',
    'common.flexible': 'Flexible',
    'common.expert': 'Expert',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('fr'); // Français par défaut

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};