import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, Search, Filter, Loader2, Weight } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";

const Accessories = () => {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [brandFilter, setBrandFilter] = useState("all");
  const [products, setProducts] = useState([]);
  const [dbCategories, setDbCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Static content for translations
  const content = {
    fr: {
      title: "Accessoires de Construction",
      subtitle: "Découvrez notre gamme complète d'accessoires et d'équipements complémentaires pour optimiser vos travaux de construction.",
      searchPlaceholder: "Rechercher des accessoires...",
      categoryPlaceholder: "Catégorie",
      allCategories: "Toutes les Catégories",
      brandPlaceholder: "Marque",
      allBrands: "Toutes les Marques",
      resultsText: "Accessoires Trouvés",
      showingResults: "Affichage des résultats pour vos critères de recherche",
      inStock: "En Stock",
      preOrder: "Pré-commande",
      viewDetails: "Voir les Détails",
      noAccessories: "Aucun accessoire trouvé",
      noAccessoriesDescription: "Essayez d'ajuster vos critères de recherche ou parcourez tous les accessoires disponibles.",
      clearFilters: "Effacer les Filtres",
      priceOnRequest: "Prix sur demande",
      loading: "Chargement des accessoires...",
      error: "Erreur lors du chargement des données"
    },
    en: {
      title: "Construction Accessories",
      subtitle: "Discover our complete range of accessories and complementary equipment to optimize your construction work.",
      searchPlaceholder: "Search accessories...",
      categoryPlaceholder: "Category",
      allCategories: "All Categories",
      brandPlaceholder: "Brand",
      allBrands: "All Brands",
      resultsText: "Accessories Found",
      showingResults: "Showing results for your search criteria",
      inStock: "In Stock",
      preOrder: "Pre-order",
      viewDetails: "View Details",
      noAccessories: "No accessories found",
      noAccessoriesDescription: "Try adjusting your search criteria or browse all available accessories.",
      clearFilters: "Clear Filters",
      priceOnRequest: "Price on request",
      loading: "Loading accessories...",
      error: "Error loading data"
    }
  };

  const currentContent = content[language];

  // Load data from Supabase
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Load products and categories in parallel
        const [productsResponse, categoriesResponse] = await Promise.all([
          supabase.from('products').select('*').order('created_at', { ascending: false }),
          supabase.from('categories').select('*').order('name')
        ]);

        if (productsResponse.error) throw productsResponse.error;
        if (categoriesResponse.error) throw categoriesResponse.error;

        setProducts(productsResponse.data || []);
        setDbCategories(categoriesResponse.data || []);
      } catch (err) {
        setError(err.message);
        console.error('Error loading data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Get unique brands from products
  const brands = ["all", ...new Set(products.map(product => product.brand).filter(Boolean))];

  // Get category options (excluding Mini-excavateurs)
  const accessoryCategories = dbCategories.filter(cat => cat.name !== "Mini-excavateurs");
  const categoryOptions = ["all", ...accessoryCategories.map(cat => cat.name)];

  // Filter products - only show accessories (accessories = true)
  const filteredProducts = products.filter(product => {
    if (!product.accessories) return false;
    
    const matchesSearch = product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const category = dbCategories.find(cat => cat.id === product.category_id);
    const matchesCategory = categoryFilter === "all" || category?.name === categoryFilter;
    const matchesBrand = brandFilter === "all" || product.brand === brandFilter;
    
    return matchesSearch && matchesCategory && matchesBrand;
  });

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

  if (error) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-500 mb-4">{currentContent.error}</p>
            <Button onClick={() => window.location.reload()}>Retry</Button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-machinery-black to-machinery-steel text-white py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {currentContent.title}
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl">
              {currentContent.subtitle}
            </p>
          </div>
        </section>

        {/* Filters Section */}
        <section className="py-8 bg-muted/30 border-b">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={currentContent.searchPlaceholder}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex gap-4">
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder={currentContent.categoryPlaceholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {categoryOptions.map(category => (
                      <SelectItem key={category} value={category}>
                        {category === "all" ? currentContent.allCategories : category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={brandFilter} onValueChange={setBrandFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder={currentContent.brandPlaceholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {brands.map(brand => (
                      <SelectItem key={brand} value={brand}>
                        {brand === "all" ? currentContent.allBrands : brand}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">
                {filteredProducts.length} {currentContent.resultsText}{filteredProducts.length !== 1 ? (language === 'fr' ? 's' : 's') : ''}
              </h2>
              <div className="text-muted-foreground">
                {currentContent.showingResults}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => {
                const categoryName = dbCategories.find(cat => cat.id === product.category_id)?.name || '';
                
                return (
                  <Card key={product.id} className="group hover:shadow-xl transition-all duration-150 cursor-pointer" onClick={() => window.location.href = `/machines/${product.id}`}>
                    <CardHeader className="p-0">
                      <div className="relative overflow-hidden rounded-t-lg bg-gradient-to-br from-gray-100 to-gray-200">
                        <img
                          src={product.image_url || "/placeholder.svg"}
                          alt={product.name || "Accessoire"}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-150"
                        />
                        <div className="absolute top-4 left-4 flex gap-2">
                          <Badge variant={product.available ? "default" : "secondary"}>
                            {product.available ? currentContent.inStock : currentContent.preOrder}
                          </Badge>
                        </div>
                        <div className="absolute top-4 right-4">
                          <Badge variant="outline" className="bg-white/90">
                            {product.brand || "TBC.MC"}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="mb-2">
                        <Badge variant="secondary" className="text-xs">
                          {categoryName}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl mb-2">{product.name || "Accessoire sans nom"}</CardTitle>
                      <p className="text-muted-foreground mb-4 text-sm">
                        {product.description || "Description non disponible"}
                      </p>

                      {/* Weight display for accessories */}
                      {product.weight_class && (
                        <div className="mb-4">
                          <div className="flex items-center gap-1 text-sm">
                            <span className="font-medium">Poids:</span>
                            <span>{product.weight_class}</span>
                          </div>
                        </div>
                      )}

                      <div className="flex justify-between items-center">
                        <div className="font-semibold text-lg text-primary">
                          {product.price_label || currentContent.priceOnRequest}
                        </div>
                        <Button variant="outline" size="sm" asChild onClick={(e) => e.stopPropagation()}>
                          <Link to={`/machines/${product.id}`}>
                            {currentContent.viewDetails}
                            <ArrowRight size={16} />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {filteredProducts.length === 0 && !loading && (
              <div className="text-center py-12">
                <Filter className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">{currentContent.noAccessories}</h3>
                <p className="text-muted-foreground mb-4">
                  {currentContent.noAccessoriesDescription}
                </p>
                <Button variant="outline" onClick={() => {
                  setSearchTerm("");
                  setCategoryFilter("all");
                  setBrandFilter("all");
                }}>
                  {currentContent.clearFilters}
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Accessories;