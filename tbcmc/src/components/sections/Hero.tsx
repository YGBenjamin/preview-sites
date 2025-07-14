import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import heroImage from "@/assets/hero-excavator.jpg";

const Hero = () => {
  const { t } = useLanguage();
  
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="TBC.MC Construction Equipment"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-white">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            {t('hero.title')}
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            {t('hero.subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button variant="cta" size="lg" asChild className="text-lg px-8 py-6">
              <Link to="/contact">
                {t('hero.cta.secondary')}
                <ArrowRight className="ml-2" />
              </Link>
            </Button>
            
            <Button variant="machinery" size="lg" asChild className="text-lg px-8 py-6">
              <Link to="/machines">
                {t('hero.cta.primary')}
              </Link>
            </Button>
          </div>

          {/* Quick Contact */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-lg">
            <a href="tel:+33620351337" className="flex items-center gap-2 bg-black/30 backdrop-blur rounded-lg px-4 py-2 hover:bg-black/40 transition-colors whitespace-nowrap">
              <Phone size={20} />
              <span className="font-semibold">+33 6 20 35 13 37</span>
            </a>
            <span className="text-gray-300 text-base sm:text-lg">Appelez-nous maintenant pour une assistance immédiate</span>
          </div>
        </div>
      </div>

    </section>
  );
};

export default Hero;