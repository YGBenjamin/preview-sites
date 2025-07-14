import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Weight, Zap, Gauge } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const FeaturedMachines = () => {
  const { t } = useLanguage();
  
  const machines = [
    {
      id: "80d34636-ce0b-4dc2-a6b8-038f8b9299ea",
      name: "BRH 5",
      brand: "Caterpillar",
      category: "Brise-roche hydraulique",
      weight: "5942 kg",
      power: "33 kW",
      price: "Prix sur demande",
      image: "/placeholder.svg",
      featured: true,
      description: "Brise-roche hydraulique professionnel pour travaux de démolition et terrassement."
    },
    {
      id: "da610d6a-42f5-434b-a48f-a43a884e92d6",
      name: "Godet 6",
      brand: "Hitachi",
      category: "Godet de terrassement",
      weight: "5025 kg",
      power: "76 kW",
      price: "Prix sur demande",
      image: "/placeholder.svg",
      featured: true,
      description: "Godet robuste et polyvalent pour tous vos travaux de terrassement."
    },
    {
      id: "7c1281a7-1f3b-42c3-9dce-e73d3138d0bd",
      name: "Godet 8",
      brand: "Yanmar",
      category: "Godet de terrassement",
      weight: "7752 kg",
      power: "56 kW",
      price: "Prix sur demande",
      image: "/placeholder.svg",
      featured: true,
      description: "Godet haute capacité pour chantiers intensifs et travaux de grande envergure."
    }
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('featured.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('featured.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {machines.map((machine) => (
            <Card key={machine.id} className="group hover:shadow-xl transition-all duration-150 border-0 shadow-lg cursor-pointer" onClick={() => window.location.href = `/product-detail/${machine.id}`}>
              <CardHeader className="p-0">
                <div className="relative overflow-hidden rounded-t-lg bg-gradient-to-br from-gray-100 to-gray-200">
                  <img
                    src={machine.image}
                    alt={machine.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-150"
                  />
                  {machine.featured && (
                    <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                      Vedette
                    </Badge>
                  )}
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary">{machine.category}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="text-xl mb-2">
                  {machine.brand} {machine.name}
                </CardTitle>
                <p className="text-muted-foreground mb-4 text-sm">
                  {machine.description}
                </p>
                
                {/* Specs */}
                <div className="flex justify-between mb-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Weight size={16} className="text-primary" />
                    <span>{machine.weight}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Zap size={16} className="text-primary" />
                    <span>{machine.power}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="font-semibold text-lg text-primary">
                    {machine.price}
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/product-detail/${machine.id}`}>
                      {t('featured.viewDetails')}
                      <ArrowRight size={16} />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="cta" size="lg" asChild>
            <Link to="/machines">
              {t('featured.viewAll')}
              <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedMachines;