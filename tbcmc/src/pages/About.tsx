import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  MapPin, 
  Award, 
  Target,
  Heart,
  Shield,
  Handshake,
  ArrowRight,
  CheckCircle
} from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Réactivité Exceptionnelle",
      description: "Réponse rapide à toutes vos demandes, car nous savons que le temps c'est de l'argent sur un chantier."
    },
    {
      icon: Heart,
      title: "Service Client Humain",
      description: "Une équipe à votre écoute, disponible et qui comprend vraiment les besoins du terrain."
    },
    {
      icon: Award,
      title: "Prix Compétitifs",
      description: "Les meilleurs tarifs du marché sans compromis sur la qualité de nos équipements."
    },
    {
      icon: Shield,
      title: "Qualité Vérifiée",
      description: "Chaque machine est rigoureusement contrôlée avant livraison pour votre sécurité."
    }
  ];


  const timeline = [
    {
      year: "2023",
      title: "Création de TBC.MC",
      description: "Lancement avec une vision claire : simplifier l'accès aux machines de qualité pour tous les professionnels du BTP."
    },
    {
      year: "2023",
      title: "Premiers Succès",
      description: "Très vite, notre approche terrain et notre réactivité font la différence. Les premiers clients deviennent nos ambassadeurs."
    },
    {
      year: "2024",
      title: "Expansion Nationale",
      description: "Extension de notre couverture : PACA, Monaco et région parisienne. Notre gamme s'étoffe avec de nouveaux partenaires."
    },
    {
      year: "2024",
      title: "Leader Régional",
      description: "Aujourd'hui, nous accompagnons des dizaines de chantiers avec notre expertise en mini-pelles et équipements de terrassement."
    }
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-machinery-black to-machinery-steel text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <Badge className="mb-4" variant="secondary">
                Fondée en 2023
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                TBC.MC - Machines de chantier en France
              </h1>
              <p className="text-xl text-gray-200 mb-8">
                TBC.MC simplifie l'accès aux engins de qualité pour tous les professionnels du BTP. 
                Réactivité exceptionnelle, prix compétitifs et accompagnement personnalisé.
              </p>
              <Button variant="cta" size="lg" asChild>
                <Link to="/contact">
                  Nous Contacter
                  <ArrowRight className="ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Mission & Values */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Nos Points Forts
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Ce qui nous différencie et fait notre force sur le marché des machines de chantier.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                      <value.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Company Story */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Notre Histoire</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    TBC.MC est née d'un constat simple : dans le secteur du BTP, il est difficile de trouver rapidement du matériel fiable, au bon prix, avec un vrai accompagnement. Créée en 2023 par Laurent Yang, l'entreprise s'est donnée une mission claire : simplifier l'accès aux machines de qualité pour tous les professionnels.
                  </p>
                  <p>
                    Basée dans le sud de la France, TBC.MC a démarré avec une vision terrain et une approche directe. Très vite, notre réactivité exceptionnelle et nos prix compétitifs ont fait la différence. Aujourd'hui, nous accompagnons des dizaines de chantiers partout en France.
                  </p>
                  <p>
                    Notre force ? Une approche humaine. On connaît nos produits, on comprend vos contraintes, et surtout, on vous écoute. Que vous cherchiez une mini-pelle 1,2T fiable ou un équipement spécialisé, nous sommes là pour vous conseiller rapidement, sans détour.
                  </p>
                </div>
                
                <div className="mt-8 grid grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">50+</div>
                    <div className="text-sm text-muted-foreground">Chantiers accompagnés</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">7j/7</div>
                    <div className="text-sm text-muted-foreground">Service disponible</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">2023</div>
                    <div className="text-sm text-muted-foreground">Année de création</div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg p-8 text-center">
                <Users className="w-24 h-24 text-primary mx-auto mb-6" />
                <h3 className="text-2xl font-bold mb-4">Laurent Yang - Gérant</h3>
                <p className="text-muted-foreground mb-6">
                  "Notre approche terrain nous permet de vraiment comprendre les besoins de nos clients. 
                  Chaque machine vendue, c'est une relation de confiance qui commence."
                </p>
                <div className="text-sm font-semibold text-primary">Gérant & Fondateur TBC.MC</div>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Notre Parcours</h2>
              <p className="text-xl text-muted-foreground">
                Depuis 2023, une croissance rapide basée sur la satisfaction client
              </p>
            </div>

            <div className="space-y-8 max-w-4xl mx-auto">
              {timeline.map((item, index) => (
                <div key={index} className="flex gap-6 items-start">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                      {item.year.slice(-2)}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold">{item.title}</h3>
                      <Badge variant="outline">{item.year}</Badge>
                    </div>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* Location & Coverage */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">
                  <MapPin className="inline-block w-8 h-8 text-primary mr-2" />
                  Notre Couverture
                </h2>
                <p className="text-muted-foreground mb-6">
                  Basés dans le sud de la France, nous servons la PACA, Monaco et la région parisienne 
                  avec des services de livraison rapide et un accompagnement professionnel.
                </p>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Zones Principales :</h4>
                    <p className="text-muted-foreground">
                      PACA • Monaco • Région Parisienne
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Livraison :</h4>
                    <p className="text-muted-foreground">
                      Service de livraison partout en France métropolitaine
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Spécialité :</h4>
                    <p className="text-muted-foreground">
                      Mini-pelles • Tractopelles • Équipements de terrassement
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg p-8">
                <h3 className="text-2xl font-bold mb-4">Contactez-nous</h3>
                <div className="space-y-3 text-muted-foreground">
                  <div>📞 <a href="tel:+33620351337" className="hover:text-primary transition-colors">+33 6 20 35 13 37</a></div>
                  <div>✉️ <a href="mailto:laurent.tubocom@gmail.com" className="hover:text-primary transition-colors">laurent.tubocom@gmail.com</a></div>
                  <div>👤 Laurent Yang - Gérant</div>
                  <div className="pt-2">
                    <div className="font-semibold text-foreground">Horaires d'ouverture :</div>
                    <div>7h00 - 20h00, 7j/7</div>
                    <div>Service client disponible</div>
                  </div>
                </div>
                <Button variant="cta" className="mt-6" asChild>
                  <Link to="/contact">
                    Demander un devis
                    <ArrowRight className="ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default About;