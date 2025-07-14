import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Wrench, 
  Truck, 
  CreditCard, 
  Palette, 
  Package,
  Clock,
  Phone,
  CheckCircle,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const Services = () => {
  const { language } = useLanguage();

  const content = {
    fr: {
      title: "Services d'Équipement Professionnel",
      subtitle: "De la livraison à la maintenance, nous fournissons un support complet pour maintenir vos équipements de construction en bon état de marche.",
      requestService: "Demander un Service",
      emergency: "Urgence: +33 6 XX XX XX XX",
      sectionTitle: "Support Complet d'Équipement",
      sectionDescription: "Nous ne vendons pas seulement des équipements – nous nous associons avec vous pour tout le cycle de vie",
      services: [
        {
          icon: Shield,
          title: "Garantie et Service Après-Vente",
          description: "Garantie complète de 2 ans sur tous les nouveaux équipements avec couverture complète des pièces et de la main-d'œuvre.",
          features: [
            "Garantie complète de 2 ans",
            "Service de réparation sur site",
            "Support d'urgence en cas de panne",
            "Programmes de maintenance régulière"
          ],
          badge: "Premium"
        },
        {
          icon: Package,
          title: "Fourniture de Pièces Détachées",
          description: "Pièces détachées authentiques pour toutes les grandes marques avec livraison rapide à Monaco et dans le Sud de la France.",
          features: [
            "Pièces OEM authentiques",
            "Livraison 24-48 heures",
            "Prix compétitifs",
            "Support technique"
          ],
          badge: "Rapide"
        },
        {
          icon: Palette,
          title: "Marquage et Peinture Personnalisés",
          description: "Personnalisez votre équipement avec des couleurs de peinture personnalisées et le marquage de votre entreprise.",
          features: [
            "Schémas de couleurs personnalisés",
            "Application de logo",
            "Marquage d'entreprise",
            "Revêtements protecteurs"
          ],
          badge: "Personnalisé"
        },
        {
          icon: Truck,
          title: "Livraison et Transport",
          description: "Service de livraison professionnel avec transport sécurisé vers votre chantier.",
          features: [
            "Transport assuré",
            "Planification flexible",
            "Livraison sur site",
            "Positionnement d'équipement"
          ],
          badge: "Fiable"
        },
        {
          icon: CreditCard,
          title: "Financement d'Équipement",
          description: "Options de financement flexibles pour vous aider à acquérir l'équipement dont vous avez besoin.",
          features: [
            "Taux compétitifs",
            "Conditions flexibles",
            "Approbation rapide",
            "Options de location disponibles"
          ],
          badge: "Flexible"
        },
        {
          icon: Wrench,
          title: "Services de Maintenance",
          description: "Maintenance professionnelle pour maintenir votre équipement au maximum de ses performances.",
          features: [
            "Maintenance programmée",
            "Service du système hydraulique",
            "Diagnostics moteur",
            "Optimisation des performances"
          ],
          badge: "Expert"
        }
      ],
      emergencyService: {
        title: "Service d'Urgence 24/7",
        description: "Panne d'équipement ? Notre équipe d'intervention d'urgence est disponible 24h/24 pour vous remettre en marche rapidement.",
        callButton: "Appeler la Ligne d'Urgence"
      },
      serviceAreas: {
        title: "Zone de Couverture du Service",
        description: "Nous fournissons des services dans tout Monaco et la Côte d'Azur",
        areas: ["Monaco", "Nice", "Cannes", "Antibes", "Menton", "Grasse", "Saint-Tropez", "Toulon"],
        contact: "Vous ne voyez pas votre localisation ?",
        contactLink: "Contactez-nous",
        contactText: "- nous pouvons encore être en mesure de desservir votre région."
      },
      cta: {
        title: "Prêt à Commencer ?",
        description: "Que vous ayez besoin d'équipement, de service ou de support, notre équipe est là pour vous aider à réussir dans vos projets de construction.",
        getQuote: "Obtenir un Devis de Service",
        browseEquipment: "Parcourir l'Équipement"
      }
    },
    en: {
      title: "Professional Equipment Services",
      subtitle: "From delivery to maintenance, we provide comprehensive support to keep your construction equipment running smoothly.",
      requestService: "Request Service",
      emergency: "Emergency: +33 6 XX XX XX XX",
      sectionTitle: "Complete Equipment Support",
      sectionDescription: "We don't just sell equipment – we partner with you for the entire lifecycle",
      services: [
        {
          icon: Shield,
          title: "Warranty & After-Sales Service",
          description: "Comprehensive 2-year warranty on all new equipment with full parts and labor coverage.",
          features: [
            "2-year comprehensive warranty",
            "On-site repair service",
            "Emergency breakdown support",
            "Regular maintenance programs"
          ],
          badge: "Premium"
        },
        {
          icon: Package,
          title: "Spare Parts Supply",
          description: "Genuine spare parts for all major brands with fast delivery across Monaco and South of France.",
          features: [
            "Genuine OEM parts",
            "24-48 hour delivery",
            "Competitive pricing",
            "Technical support"
          ],
          badge: "Fast"
        },
        {
          icon: Palette,
          title: "Custom Branding & Paint",
          description: "Personalize your equipment with custom paint colors and company branding.",
          features: [
            "Custom color schemes",
            "Logo application",
            "Company branding",
            "Protective coatings"
          ],
          badge: "Custom"
        },
        {
          icon: Truck,
          title: "Delivery & Transportation",
          description: "Professional delivery service with secure transportation to your job site.",
          features: [
            "Insured transportation",
            "Flexible scheduling",
            "On-site delivery",
            "Equipment positioning"
          ],
          badge: "Reliable"
        },
        {
          icon: CreditCard,
          title: "Equipment Financing",
          description: "Flexible financing options to help you acquire the equipment you need.",
          features: [
            "Competitive rates",
            "Flexible terms",
            "Quick approval",
            "Lease options available"
          ],
          badge: "Flexible"
        },
        {
          icon: Wrench,
          title: "Maintenance Services",
          description: "Professional maintenance to keep your equipment running at peak performance.",
          features: [
            "Scheduled maintenance",
            "Hydraulic system service",
            "Engine diagnostics",
            "Performance optimization"
          ],
          badge: "Expert"
        }
      ],
      emergencyService: {
        title: "24/7 Emergency Service",
        description: "Equipment breakdown? Our emergency response team is available around the clock to get you back up and running quickly.",
        callButton: "Call Emergency Line"
      },
      serviceAreas: {
        title: "Service Coverage Area",
        description: "We provide services throughout Monaco and the French Riviera",
        areas: ["Monaco", "Nice", "Cannes", "Antibes", "Menton", "Grasse", "Saint-Tropez", "Toulon"],
        contact: "Don't see your location?",
        contactLink: "Contact us",
        contactText: "- we may still be able to serve your area."
      },
      cta: {
        title: "Ready to Get Started?",
        description: "Whether you need equipment, service, or support, our team is here to help you succeed in your construction projects.",
        getQuote: "Get Service Quote",
        browseEquipment: "Browse Equipment"
      }
    }
  };

  const currentContent = content[language];
  const services = currentContent.services;


  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-machinery-black to-machinery-steel text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {currentContent.title}
              </h1>
              <p className="text-xl text-gray-200 mb-8">
                {currentContent.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="cta" size="lg" asChild>
                  <Link to="/contact">
                    {currentContent.requestService}
                    <ArrowRight className="ml-2" />
                  </Link>
                </Button>
                <div className="flex items-center gap-2 text-lg">
                  <Phone size={20} />
                  <span>{currentContent.emergency}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {currentContent.sectionTitle}
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {currentContent.sectionDescription}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                        <service.icon className="w-6 h-6 text-primary" />
                      </div>
                      <Badge variant="secondary">{service.badge}</Badge>
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      {service.description}
                    </p>
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-2 text-sm">
                          <CheckCircle size={16} className="text-primary flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Emergency Service */}
        <section className="py-16 bg-accent text-white">
          <div className="container mx-auto px-4 text-center">
            <Clock className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">{currentContent.emergencyService.title}</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              {currentContent.emergencyService.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="text-2xl font-bold">+33 6 XX XX XX XX</div>
              <Button variant="secondary" size="lg">
                {currentContent.emergencyService.callButton}
              </Button>
            </div>
          </div>
        </section>

        {/* Service Areas */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">{currentContent.serviceAreas.title}</h2>
              <p className="text-xl text-muted-foreground">
                {currentContent.serviceAreas.description}
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {currentContent.serviceAreas.areas.map((area, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="font-semibold">{area}</div>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <p className="text-muted-foreground">
                {currentContent.serviceAreas.contact} <Link to="/contact" className="text-primary hover:underline">{currentContent.serviceAreas.contactLink}</Link> {currentContent.serviceAreas.contactText}
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">{currentContent.cta.title}</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              {currentContent.cta.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="cta" size="lg" asChild>
                <Link to="/contact">
                  {currentContent.cta.getQuote}
                  <ArrowRight className="ml-2" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/machines">
                  {currentContent.cta.browseEquipment}
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Services;