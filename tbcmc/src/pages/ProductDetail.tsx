import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowLeft, 
  Download, 
  Phone, 
  Mail,
  CheckCircle,
  ArrowRight,
  Truck,
  Shield,
  Wrench,
  Loader2
} from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams();
  const { language } = useLanguage();
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState(0);
  const [product, setProduct] = useState<any>(null);
  const [category, setCategory] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [compatibleItems, setCompatibleItems] = useState<any[]>([]);

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    }
  });

  const quoteForm = useForm({
    defaultValues: {
      name: "",
      company_name: "",
      email: "",
      phone: "",
      product_id: "",
    }
  });

  // Content translations
  const content = {
    fr: {
      backToMachines: "Retour aux Machines",
      inStock: "En Stock",
      preOrder: "Pré-commande",
      priceOnRequest: "Prix sur demande",
      contactForQuote: "Contactez-nous pour un devis personnalisé et des options de financement",
      weight: "Poids",
      power: "Puissance",
      maxDiggingDepth: "Profondeur de creusement max",
      maxDumpingHeight: "Hauteur de déversement max",
      transportWidth: "Largeur transport",
      operatingWeight: "Poids opérationnel",
      bucketCapacity: "Capacité godet",
      fuelTankCapacity: "Capacité réservoir",
      hydraulicFlow: "Débit hydraulique",
      enginePower: "Puissance moteur",
      requestQuote: "Demander un Devis",
      callUs: "Appeler +33 6 XX XX XX XX",
      downloadSpecs: "Télécharger la Fiche Technique (PDF)",
      specifications: "Spécifications",
      features: "Caractéristiques",
      accessories: "Accessoires",
      benefits: "Avantages",
      technicalSpecs: "Spécifications Techniques",
      loading: "Chargement...",
      error: "Erreur lors du chargement du produit",
      productNotFound: "Produit non trouvé",
      getTechSheet: "📄 Obtenir la fiche technique",
      techSheetForm: "Obtenir la fiche technique",
      name: "Nom",
      email: "Adresse e-mail",
      phone: "Téléphone",
      product: "Produit",
      send: "Envoyer",
      nameOptional: "Nom (facultatif)",
      emailRequired: "Adresse e-mail *",
      phoneOptional: "Téléphone (facultatif, pour mieux vous conseiller)",
      productRequired: "Produit *",
      sending: "Envoi en cours...",
      thankYou: "Merci ! La fiche technique vous a été envoyée par e-mail.",
      validEmailRequired: "Veuillez saisir une adresse e-mail valide",
      compatibility: "Compatibilité",
      compatibilityPlaceholder: "Compatible avec les mini-excavateurs (détails à venir)",
      dimensions: "Dimensions",
      compatibleAccessories: "Accessoires compatibles",
      compatibleMachines: "Machines compatibles",
      noCompatibleItems: "Aucun élément compatible trouvé",
      quoteRequest: "Demande de Devis",
      fullName: "Nom complet *",
      companyName: "Nom de l'entreprise (facultatif)",
      phoneRequired: "Numéro de téléphone *",
      selectProduct: "Sélectionner un produit *",
      quoteThankYou: "Merci pour votre demande, votre devis sera envoyé dans moins de 24h !",
      requiredField: "Ce champ est obligatoire",
      validPhoneRequired: "Veuillez saisir un numéro de téléphone valide",
      readyToStart: "Prêt à commencer ?",
      contactSpecialists: "Contactez nos spécialistes en équipement pour un devis personnalisé et des recommandations professionnelles pour votre projet.",
      requestDetailedQuote: "Demander un devis détaillé",
    },
    en: {
      backToMachines: "Back to Machines",
      inStock: "In Stock",
      preOrder: "Pre-order",
      priceOnRequest: "Price on request",
      contactForQuote: "Contact us for a personalized quote and financing options",
      weight: "Weight",
      power: "Power",
      maxDiggingDepth: "Max Digging Depth",
      maxDumpingHeight: "Max Dumping Height",
      transportWidth: "Transport Width",
      operatingWeight: "Operating Weight",
      bucketCapacity: "Bucket Capacity",
      fuelTankCapacity: "Fuel Tank Capacity",
      hydraulicFlow: "Hydraulic Flow",
      enginePower: "Engine Power",
      requestQuote: "Request Quote",
      callUs: "Call +33 6 XX XX XX XX",
      downloadSpecs: "Download Specification Sheet (PDF)",
      specifications: "Specifications",
      features: "Features",
      accessories: "Accessories",
      benefits: "Benefits",
      technicalSpecs: "Technical Specifications",
      loading: "Loading...",
      error: "Error loading product",
      productNotFound: "Product not found",
      getTechSheet: "📄 Get Technical Datasheet",
      techSheetForm: "Get Technical Datasheet",
      name: "Name",
      email: "Email Address",
      product: "Product",
      send: "Send",
      nameOptional: "Name (optional)",
      emailRequired: "Email Address *",
      phoneOptional: "Phone (optional, to better advise you)",
      productRequired: "Product *",
      sending: "Sending...",
      thankYou: "Thank you! The technical datasheet has been sent to your email.",
      validEmailRequired: "Please enter a valid email address",
      compatibility: "Compatibility",
      compatibilityPlaceholder: "Compatible with mini-excavators (details coming soon)",
      dimensions: "Dimensions",
      compatibleAccessories: "Compatible Accessories",
      compatibleMachines: "Compatible Machines",
      noCompatibleItems: "No compatible items found",
      quoteRequest: "Quote Request",
      fullName: "Full Name *",
      companyName: "Company Name (optional)",
      phoneRequired: "Phone Number *",
      selectProduct: "Select Product *",
      quoteThankYou: "Thank you for your request, your quote will be sent within 24 hours!",
      requiredField: "This field is required",
      validPhoneRequired: "Please enter a valid phone number",
      readyToStart: "Ready to Get Started?",
      contactSpecialists: "Contact our equipment specialists for a personalized quote and professional recommendations for your project.",
      requestDetailedQuote: "Request Detailed Quote",
    }
  };

  const currentContent = content[language];

  // Handle form submission for tech sheet
  const onSubmit = async (data: { name: string; email: string; phone: string }) => {
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('leads')
        .insert([
          {
            name: data.name || null,
            email: data.email,
            phone: data.phone || null,
            product_id: product?.id || null,
            type: 'fiche'
          }
        ]);

      if (error) throw error;

      toast({
        title: currentContent.thankYou,
        duration: 5000,
      });

      form.reset();
      
      // Close modal after 3 seconds
      setTimeout(() => {
        setIsModalOpen(false);
      }, 3000);

    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle quote form submission
  const onQuoteSubmit = async (data: { name: string; company_name: string; email: string; phone: string; product_id: string }) => {
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('leads')
        .insert([
          {
            name: data.name,
            company_name: data.company_name || null,
            email: data.email,
            phone: data.phone,
            product_id: data.product_id,
            type: 'devis'
          }
        ]);

      if (error) throw error;

      toast({
        title: currentContent.quoteThankYou,
        duration: 5000,
      });

      quoteForm.reset();
      
      // Close modal after 3 seconds
      setTimeout(() => {
        setIsQuoteModalOpen(false);
      }, 3000);

    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Load all products for the quote form
  const loadProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('id, name, brand')
        .order('name');

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error loading products:', error);
    }
  };

  // Load compatible items for this product
  const loadCompatibleItems = async () => {
    if (!product) return;
    
    try {
      if (isAccessory()) {
        // For accessories, find compatible machines
        const { data, error } = await supabase
          .from('accessories_products')
          .select(`
            product_id,
            products!accessories_products_product_id_fkey (
              id,
              name,
              brand,
              image_url,
              price_label
            )
          `)
          .eq('accessory_id', product.id);

        if (error) throw error;
        setCompatibleItems(data?.map(item => item.products).filter(Boolean) || []);
      } else {
        // For machines, find compatible accessories
        const { data, error } = await supabase
          .from('accessories_products')
          .select(`
            accessory_id,
            products!accessories_products_accessory_id_fkey (
              id,
              name,
              brand,
              image_url,
              price_label
            )
          `)
          .eq('product_id', product.id);

        if (error) throw error;
        setCompatibleItems(data?.map(item => item.products).filter(Boolean) || []);
      }
    } catch (error) {
      console.error('Error loading compatible items:', error);
    }
  };

  // Load product data from Supabase
  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        
        const { data: productData, error: productError } = await supabase
          .from('products')
          .select('*')
          .eq('id', id)
          .single();

        if (productError) throw productError;
        
        if (productData) {
          setProduct(productData);
          
          // Load category if product has category_id
          if (productData.category_id) {
            const { data: categoryData, error: categoryError } = await supabase
              .from('categories')
              .select('*')
              .eq('id', productData.category_id)
              .single();
            
            if (!categoryError && categoryData) {
              setCategory(categoryData);
            }
          }
        }
      } catch (err: any) {
        setError(err.message);
        console.error('Error loading product:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadProduct();
      loadProducts();
    }
  }, [id]);

  // Load compatible items when product and category are loaded
  useEffect(() => {
    if (product && category) {
      loadCompatibleItems();
    }
  }, [product, category]);

  // Set default product in quote form when product is loaded
  useEffect(() => {
    if (product && !quoteForm.getValues('product_id')) {
      quoteForm.setValue('product_id', product.id);
    }
  }, [product, quoteForm]);

  // Check if product is an accessory
  const isAccessory = () => {
    return product?.accessories === true;
  };

  // Create specifications object from database fields
  const getSpecifications = (): Record<string, string> => {
    if (!product) return {};
    
    const specs: Record<string, string> = {};
    
    if (isAccessory()) {
      // For accessories, show basic specs only (no compatibility since there's a separate tab)
      if (product.operating_weight) specs[currentContent.weight] = product.operating_weight;
      if (product.transport_width) specs[currentContent.dimensions] = product.transport_width;
      
      // Fill missing accessory specs with dashes
      const accessorySpecKeys = [
        currentContent.weight,
        currentContent.dimensions
      ];
      
      accessorySpecKeys.forEach(key => {
        if (!specs[key]) specs[key] = "-";
      });
    } else {
      // For Mini-excavateurs, show full engine specs
      if (product.operating_weight) specs[currentContent.operatingWeight] = product.operating_weight;
      if (product.engine_power) specs[currentContent.enginePower] = product.engine_power;
      if (product.bucket_capacity) specs[currentContent.bucketCapacity] = product.bucket_capacity;
      if (product.max_digging_depth) specs[currentContent.maxDiggingDepth] = product.max_digging_depth;
      if (product.max_dumping_height) specs[currentContent.maxDumpingHeight] = product.max_dumping_height;
      if (product.transport_width) specs[currentContent.transportWidth] = product.transport_width;
      if (product.fuel_tank_capacity) specs[currentContent.fuelTankCapacity] = product.fuel_tank_capacity;
      if (product.hydraulic_flow) specs[currentContent.hydraulicFlow] = product.hydraulic_flow;
      
      // Fill missing machine specs with dashes
      const machineSpecKeys = [
        currentContent.operatingWeight,
        currentContent.enginePower,
        currentContent.bucketCapacity,
        currentContent.maxDiggingDepth,
        currentContent.maxDumpingHeight,
        currentContent.transportWidth,
        currentContent.fuelTankCapacity,
        currentContent.hydraulicFlow
      ];
      
      machineSpecKeys.forEach(key => {
        if (!specs[key]) specs[key] = "-";
      });
    }
    
    return specs;
  };

  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">{currentContent.loading}</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (error || !product) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-500 mb-4">{error || currentContent.productNotFound}</p>
            <Button variant="outline" asChild>
              <Link to="/machines">{currentContent.backToMachines}</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const benefits = [
    {
      icon: Truck,
      title: "Free Delivery",
      description: "Professional delivery to your job site"
    },
    {
      icon: Shield,
      title: "2-Year Warranty",
      description: "Comprehensive parts and labor coverage"
    },
    {
      icon: Wrench,
      title: "Service Support",
      description: "Professional maintenance and repair"
    }
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Breadcrumb */}
        <section className="py-4 border-b">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-primary">Home</Link>
              <span>/</span>
              <Link to="/machines" className="hover:text-primary">Machines</Link>
              <span>/</span>
              <span className="text-foreground">{product.name || "Machine"}</span>
            </div>
          </div>
        </section>

        {/* Product Header */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <Button variant="outline" size="sm" asChild className="mb-6">
              <Link to={isAccessory() ? "/accessories" : "/machines"}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                {isAccessory() ? "Retour aux accessoires" : currentContent.backToMachines}
              </Link>
            </Button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Product Images */}
              <div>
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-4 aspect-[4/3] overflow-hidden">
                  <img
                    src={product.image_url || "/placeholder.svg"}
                    alt={product.name || "Machine"}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Simplified thumbnails for now - can be enhanced later */}
                <div className="flex gap-2">
                  <div className="w-20 h-20 rounded-lg overflow-hidden border-2 border-primary">
                    <img
                      src={product.image_url || "/placeholder.svg"}
                      alt={product.name || "Machine"}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="outline">{product.brand || "TBC.MC"}</Badge>
                  <Badge variant="secondary">{category?.name || "Équipement"}</Badge>
                  <Badge variant={product.available ? "default" : "secondary"}>
                    {product.available ? currentContent.inStock : currentContent.preOrder}
                  </Badge>
                </div>

                <h1 className="text-3xl font-bold mb-4">{product.name || "Machine"}</h1>
                
                <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
                  {product.description || "Description non disponible"}
                </p>

                <div className="mb-6">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {product.price_label || currentContent.priceOnRequest}
                  </div>
                  <p className="text-muted-foreground">
                    {currentContent.contactForQuote}
                  </p>
                </div>

                {/* Quick Specs */}
                <div className="grid grid-cols-2 gap-4 mb-8 p-4 bg-muted/30 rounded-lg">
                  <div>
                    <div className="text-sm text-muted-foreground">{currentContent.operatingWeight}</div>
                    <div className="font-semibold">{product.operating_weight || "-"}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">{currentContent.enginePower}</div>
                    <div className="font-semibold">{product.engine_power || "-"}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">{currentContent.maxDiggingDepth}</div>
                    <div className="font-semibold">{product.max_digging_depth || "-"}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">{currentContent.bucketCapacity}</div>
                    <div className="font-semibold">{product.bucket_capacity || "-"}</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Dialog open={isQuoteModalOpen} onOpenChange={setIsQuoteModalOpen}>
                      <DialogTrigger asChild>
                        <Button variant="cta" size="lg" className="flex-1 h-14 sm:h-12">
                          <Mail className="w-5 h-5 mr-2" />
                          {currentContent.requestQuote}
                        </Button>
                      </DialogTrigger>
                    </Dialog>
                    <Button 
                      variant="secondary" 
                      size="lg" 
                      className="flex-1 h-14 sm:h-12 bg-green-600 hover:bg-green-700 text-white border-0"
                      asChild
                    >
                      <a href="tel:+33620351337" className="flex items-center justify-center">
                        <Phone className="w-5 h-5 mr-2" />
                        06 20 35 13 37
                      </a>
                    </Button>
                  </div>
                  
                  <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="lg" className="w-full h-14 sm:h-12 border-2 border-primary hover:bg-primary hover:text-primary-foreground">
                        <Download className="w-5 h-5 mr-2" />
                        {currentContent.getTechSheet}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>{currentContent.techSheetForm}</DialogTitle>
                      </DialogHeader>
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{currentContent.nameOptional}</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="email"
                            rules={{
                              required: currentContent.validEmailRequired,
                              pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: currentContent.validEmailRequired
                              }
                            }}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{currentContent.emailRequired}</FormLabel>
                                <FormControl>
                                  <Input {...field} type="email" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{currentContent.phoneOptional}</FormLabel>
                                <FormControl>
                                  <Input {...field} type="tel" placeholder="+33 6 12 34 56 78" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <div className="space-y-2">
                            <Label>{currentContent.productRequired}</Label>
                            <div className="p-3 bg-muted rounded-md">
                              <p className="text-sm font-medium">{product.name}</p>
                              <p className="text-xs text-muted-foreground">{product.brand}</p>
                            </div>
                          </div>

                          <Button 
                            type="submit" 
                            className="w-full" 
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? currentContent.sending : currentContent.send}
                          </Button>
                        </form>
                      </Form>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quote Request Modal */}
        <Dialog open={isQuoteModalOpen} onOpenChange={setIsQuoteModalOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{currentContent.quoteRequest}</DialogTitle>
            </DialogHeader>
            <Form {...quoteForm}>
              <form onSubmit={quoteForm.handleSubmit(onQuoteSubmit)} className="space-y-4">
                <FormField
                  control={quoteForm.control}
                  name="name"
                  rules={{
                    required: currentContent.requiredField
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{currentContent.fullName}</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Jean Dupont" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={quoteForm.control}
                  name="company_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{currentContent.companyName}</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Nom de votre entreprise" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={quoteForm.control}
                  name="email"
                  rules={{
                    required: currentContent.requiredField,
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: currentContent.validEmailRequired
                    }
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{currentContent.emailRequired}</FormLabel>
                      <FormControl>
                        <Input {...field} type="email" placeholder="votre.email@exemple.com" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={quoteForm.control}
                  name="phone"
                  rules={{
                    required: currentContent.requiredField,
                    pattern: {
                      value: /^[+]?[\d\s\-()]{10,}$/,
                      message: currentContent.validPhoneRequired
                    }
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{currentContent.phoneRequired}</FormLabel>
                      <FormControl>
                        <Input {...field} type="tel" placeholder="+33 6 12 34 56 78" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={quoteForm.control}
                  name="product_id"
                  rules={{
                    required: currentContent.requiredField
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{currentContent.selectProduct}</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Choisir un produit" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {products.map((productItem) => (
                            <SelectItem key={productItem.id} value={productItem.id}>
                              {productItem.name} - {productItem.brand}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? currentContent.sending : currentContent.send}
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>

        {/* Detailed Information */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="specifications" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="specifications">{currentContent.specifications}</TabsTrigger>
                <TabsTrigger value="compatibility">{currentContent.compatibility}</TabsTrigger>
                <TabsTrigger value="benefits">{currentContent.benefits}</TabsTrigger>
              </TabsList>

              <TabsContent value="specifications" className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle>{currentContent.technicalSpecs}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(getSpecifications()).map(([key, value]) => (
                        <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                          <span className="font-medium">{key}</span>
                          <span className="text-muted-foreground">{value}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="compatibility" className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {isAccessory() ? currentContent.compatibleMachines : currentContent.compatibleAccessories}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {compatibleItems.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {compatibleItems.map((item) => (
                          <div key={item.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                            <div className="aspect-[4/3] mb-3 bg-muted rounded-lg overflow-hidden">
                              <img
                                src={item.image_url || "/placeholder.svg"}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <h4 className="font-semibold text-sm mb-1">{item.name}</h4>
                            <p className="text-xs text-muted-foreground mb-2">{item.brand}</p>
                            <p className="text-xs font-medium text-primary">
                              {item.price_label || currentContent.priceOnRequest}
                            </p>
                            <Button variant="outline" size="sm" className="w-full mt-3" asChild>
                              <Link to={`/machines/${item.id}`}>
                                Voir détails
                              </Link>
                            </Button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground text-center py-8">
                        {currentContent.noCompatibleItems}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="benefits" className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {benefits.map((benefit, index) => (
                    <Card key={index}>
                      <CardContent className="p-6 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                          <benefit.icon className="w-8 h-8 text-primary" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                        <p className="text-muted-foreground">{benefit.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">{currentContent.readyToStart}</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              {currentContent.contactSpecialists}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" asChild>
                <Link to="/contact">
                  {currentContent.requestDetailedQuote}
                  <ArrowRight className="ml-2" />
                </Link>
              </Button>
              <Button 
                variant="secondary" 
                size="lg" 
                className="bg-white text-primary hover:bg-gray-100"
                asChild
              >
                <a href="tel:+33620351337" className="flex items-center justify-center">
                  <Phone className="mr-2" />
                  06 20 35 13 37
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ProductDetail;