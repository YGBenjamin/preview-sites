import { Shield, Award, Users, Wrench } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const TrustSection = () => {
  const { t } = useLanguage();
  
  const stats = [
    {
      icon: Users,
      value: "50+",
      label: "Chantiers Accompagnés",
      description: "Projets réalisés avec succès depuis 2023"
    },
    {
      icon: Award,
      value: "7j/7",
      label: "Service Disponible",
      description: "Réactivité exceptionnelle toute la semaine"
    },
    {
      icon: Shield,
      value: "100%",
      label: "Qualité Vérifiée",
      description: "Machines contrôlées avant livraison"
    },
    {
      icon: Wrench,
      value: "24h",
      label: "Réponse Rapide",
      description: "Devis sous 24h maximum"
    }
  ];


  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4 group-hover:bg-primary/20 transition-colors">
                <stat.icon className="w-8 h-8 text-primary" />
              </div>
              <div className="text-3xl font-bold text-machinery-black mb-2">
                {stat.value}
              </div>
              <div className="font-semibold mb-1">{stat.label}</div>
              <div className="text-sm text-muted-foreground">
                {stat.description}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TrustSection;