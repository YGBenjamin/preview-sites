import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  MessageSquare,
  Send,
  CheckCircle
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";

const Contact = () => {
  const { toast } = useToast();
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    interest: "",
    message: ""
  });
  const [products, setProducts] = useState<Array<{ id: string; name: string }>>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await supabase
        .from('products')
        .select('id, name')
        .eq('available', true)
        .order('name');
      
      if (data) {
        setProducts(data);
      }
    };

    fetchProducts();
  }, []);

  // Security: Input validation and sanitization
  const sanitizeInput = (input: string): string => {
    return input.trim().replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Security: Validate and sanitize inputs
      if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
        throw new Error("Les champs nom, email et message sont obligatoires");
      }

      if (!validateEmail(formData.email)) {
        throw new Error("Veuillez entrer une adresse email valide");
      }

      if (formData.message.length > 1000) {
        throw new Error("Le message ne peut pas dépasser 1000 caractères");
      }

      // Sanitize all inputs
      const sanitizedData = {
        name: sanitizeInput(formData.name),
        email: sanitizeInput(formData.email),
        phone: sanitizeInput(formData.phone),
        company: sanitizeInput(formData.company),
        message: sanitizeInput(formData.message)
      };

      // Find the selected product by ID (not name to avoid UUID errors)
      const selectedProduct = products.find(p => p.id === formData.interest);
      
      // Format message with product name if available
      const productName = selectedProduct?.name || formData.interest;
      const formattedMessage = formData.interest 
        ? `Demande ${productName} : ${sanitizedData.message}`
        : sanitizedData.message;
      
      // Save to Supabase - use sanitized data
      const { error } = await supabase
        .from('leads')
        .insert({
          name: sanitizedData.name,
          email: sanitizedData.email,
          phone: sanitizedData.phone,
          company_name: sanitizedData.company || null,
          product_id: selectedProduct?.id || null, // Only valid UUID or null
          message: formattedMessage,
          type: 'demande'
        });

      if (error) {
        throw error;
      }

      toast({
        title: language === 'fr' ? "Demande Envoyée !" : "Request Sent!",
        description: language === 'fr' 
          ? "Merci pour votre demande, votre devis sera envoyé dans moins de 24h !"
          : "Thank you for your request, your quote will be sent within 24 hours!",
      });
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        interest: "",
        message: ""
      });
    } catch (error) {
      toast({
        title: language === 'fr' ? "Erreur" : "Error",
        description: language === 'fr' 
          ? "Une erreur est survenue. Veuillez réessayer."
          : "An error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const content = {
    fr: {
      title: "Obtenez Votre Devis d'Équipement",
      subtitle: "Prêt à démarrer votre projet ? Contactez nos spécialistes en équipement pour des recommandations personnalisées et des prix compétitifs.",
      emergency: "Support d'Urgence 24/7",
      formTitle: "Demander un Devis d'Équipement",
      formDescription: "Remplissez le formulaire ci-dessous et nous vous recontacterons dans les 24 heures avec un devis détaillé et des recommandations.",
      contactInfo: [
        {
          icon: Phone,
          title: "Téléphone",
          value: "+33 6 20 35 13 37",
          description: "Appelez-nous pour une assistance immédiate"
        },
        {
          icon: Mail,
          title: "Email",
          value: "laurent.tubocom@gmail.com",
          description: "Envoyez-nous vos questions à tout moment"
        },
        {
          icon: Clock,
          title: "Heures d'Ouverture",
          value: "Tous les jours: 7h00-20h00",
          description: "Service client disponible 7j/7"
        }
      ],
      equipmentOptions: [
        "Mini-pelle (1-3 tonnes)",
        "Mini-pelle (3-6 tonnes)",
        "Tractopelle",
        "Marteau hydraulique/BRH",
        "Godets et accessoires",
        "Pièces détachées",
        "Service et maintenance",
        "Demande d'équipement personnalisé"
      ],
      form: {
        name: "Nom Complet",
        email: "Adresse Email",
        phone: "Numéro de Téléphone",
        company: "Nom de l'Entreprise",
        interest: "Intérêt Équipement",
        message: "Détails du Projet et Exigences",
        namePlaceholder: "Votre nom complet",
        emailPlaceholder: "votre.email@entreprise.com",
        phonePlaceholder: "+33 6 XX XX XX XX",
        companyPlaceholder: "Nom de votre entreprise",
        interestPlaceholder: "Sélectionnez le type d'équipement",
        messagePlaceholder: "Parlez-nous de votre projet, calendrier et exigences spécifiques...",
        submit: "Envoyer la Demande de Devis"
      },
      whyChoose: {
        title: "Pourquoi Choisir TBC.MC ?",
        benefits: [
          "15+ années d'expérience",
          "Marques d'équipement premium",
          "Garantie complète de 2 ans",
          "Support d'urgence 24/7",
          "Prix compétitifs",
          "Livraison et installation professionnelles"
        ]
      },
    },
    en: {
      title: "Get Your Equipment Quote",
      subtitle: "Ready to start your project? Contact our equipment specialists for personalized recommendations and competitive pricing.",
      emergency: "Emergency 24/7 Support",
      formTitle: "Request Equipment Quote",
      formDescription: "Fill out the form below and we'll get back to you within 24 hours with a detailed quote and recommendations.",
      contactInfo: [
        {
          icon: Phone,
          title: "Phone",
          value: "+33 6 20 35 13 37",
          description: "Call us for immediate assistance"
        },
        {
          icon: Mail,
          title: "Email",
          value: "laurent.tubocom@gmail.com",
          description: "Send us your questions anytime"
        },
        {
          icon: Clock,
          title: "Business Hours",
          value: "Daily: 7:00-20:00",
          description: "Customer service available 7 days a week"
        }
      ],
      equipmentOptions: [
        "Mini-excavator (1-3 tons)",
        "Mini-excavator (3-6 tons)",
        "Backhoe loader",
        "Hydraulic hammer/BRH",
        "Buckets & attachments",
        "Spare parts",
        "Service & maintenance",
        "Custom equipment inquiry"
      ],
      form: {
        name: "Full Name",
        email: "Email Address",
        phone: "Phone Number",
        company: "Company Name",
        interest: "Equipment Interest",
        message: "Project Details & Requirements",
        namePlaceholder: "Your full name",
        emailPlaceholder: "your.email@company.com",
        phonePlaceholder: "+33 6 XX XX XX XX",
        companyPlaceholder: "Your company name",
        interestPlaceholder: "Select equipment type",
        messagePlaceholder: "Tell us about your project, timeline, and specific requirements...",
        submit: "Send Quote Request"
      },
      whyChoose: {
        title: "Why Choose TBC.MC?",
        benefits: [
          "15+ years of experience",
          "Premium equipment brands",
          "2-year comprehensive warranty",
          "24/7 emergency support",
          "Competitive pricing",
          "Professional delivery & setup"
        ]
      },
    }
  };

  const currentContent = content[language];

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
              <div className="flex items-center gap-4">
                <a href="tel:+33620351337" className="flex items-center gap-2 bg-black/30 backdrop-blur rounded-lg px-4 py-2 hover:bg-black/40 transition-colors">
                  <Phone size={20} />
                  <span className="font-semibold">+33 6 20 35 13 37</span>
                </a>
                <span className="text-gray-300">{currentContent.emergency}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Contact Form */}
              <div className="lg:col-span-2">
                <Card className="border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <MessageSquare className="w-6 h-6 text-primary" />
                      {currentContent.formTitle}
                    </CardTitle>
                    <p className="text-muted-foreground">
                      {currentContent.formDescription}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">{currentContent.form.name} *</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => handleInputChange("name", e.target.value)}
                            placeholder={currentContent.form.namePlaceholder}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">{currentContent.form.email} *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            placeholder={currentContent.form.emailPlaceholder}
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="phone">{currentContent.form.phone}</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                            placeholder={currentContent.form.phonePlaceholder}
                          />
                        </div>
                        <div>
                          <Label htmlFor="company">{currentContent.form.company}</Label>
                          <Input
                            id="company"
                            value={formData.company}
                            onChange={(e) => handleInputChange("company", e.target.value)}
                            placeholder={currentContent.form.companyPlaceholder}
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="interest">{currentContent.form.interest}</Label>
                        <Select value={formData.interest} onValueChange={(value) => handleInputChange("interest", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder={currentContent.form.interestPlaceholder} />
                          </SelectTrigger>
                          <SelectContent>
                            {products.map((product) => (
                              <SelectItem key={product.id} value={product.id}>
                                {product.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="message">{currentContent.form.message}</Label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) => handleInputChange("message", e.target.value)}
                          placeholder={currentContent.form.messagePlaceholder}
                          rows={4}
                        />
                      </div>

                      <Button 
                        type="submit" 
                        variant="cta" 
                        size="lg" 
                        className="w-full"
                        disabled={isSubmitting}
                      >
                        <Send className="mr-2 w-5 h-5" />
                        {isSubmitting ? "Envoi..." : currentContent.form.submit}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Information */}
              <div className="space-y-6">
                {currentContent.contactInfo.map((info, index) => (
                  <Card key={index} className="border-0 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
                          <info.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-1">{info.title}</h3>
                          {info.icon === Phone ? (
                            <a href="tel:+33620351337" className="font-medium mb-1 hover:text-primary transition-colors">{info.value}</a>
                          ) : info.icon === Mail ? (
                            <a href="mailto:laurent.tubocom@gmail.com" className="font-medium mb-1 hover:text-primary transition-colors">{info.value}</a>
                          ) : (
                            <div className="font-medium mb-1">{info.value}</div>
                          )}
                          <div className="text-sm text-muted-foreground">{info.description}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {/* Why Choose Us */}
                <Card className="border-0 shadow-lg bg-primary/5">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-4">{currentContent.whyChoose.title}</h3>
                    <div className="space-y-3">
                      {currentContent.whyChoose.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                          <span className="text-sm">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
};

export default Contact;