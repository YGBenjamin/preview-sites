import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Phone, Mail, Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentProductIsAccessory, setCurrentProductIsAccessory] = useState<boolean | null>(null);
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();

  // Check if current product is an accessory when on product detail page
  useEffect(() => {
    const checkProductType = async () => {
      const productMatch = location.pathname.match(/^\/machines\/(.+)$/);
      if (productMatch) {
        const productId = productMatch[1];
        try {
          const { data: product } = await supabase
            .from('products')
            .select('accessories')
            .eq('id', productId)
            .single();
          
          if (product) {
            setCurrentProductIsAccessory(product.accessories);
          }
        } catch (error) {
          console.error('Error checking product type:', error);
          setCurrentProductIsAccessory(null);
        }
      } else {
        setCurrentProductIsAccessory(null);
      }
    };

    checkProductType();
  }, [location.pathname]);

  const navigationItems = [
    { name: t('nav.home'), href: "/" },
    { name: t('nav.machines'), href: "/machines" },
    { name: t('nav.accessories'), href: "/accessories" },
    { name: t('nav.about'), href: "/about" },
    { name: t('nav.contact'), href: "/contact" },
  ];

  const isActiveRoute = (href: string) => {
    if (href === "/" && location.pathname === "/") return true;
    if (href !== "/" && location.pathname.startsWith(href)) {
      // Special case for product details: if we're on /machines/id but it's an accessory
      if (href === "/machines" && currentProductIsAccessory === true) {
        return false;
      }
      if (href === "/accessories" && currentProductIsAccessory === false) {
        return false;
      }
      return true;
    }
    
    // Special case: highlight accessories tab when viewing an accessory product
    if (href === "/accessories" && location.pathname.startsWith("/machines/") && currentProductIsAccessory === true) {
      return true;
    }
    
    return false;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Top Contact Bar */}
      <div className="bg-machinery-black text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Phone size={14} />
              <a href="tel:+33620351337" className="hover:text-gray-300 transition-colors">+33 6 20 35 13 37</a>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={14} />
              <a href="mailto:laurent.tubocom@gmail.com" className="hover:text-gray-300 transition-colors">laurent.tubocom@gmail.com</a>
            </div>
          </div>
          <div className="hidden md:block">
            <span>PACA • Monaco • Région Parisienne • Depuis 2023</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/27d9c73b-7c62-4849-ab23-8e85f6c9d570.png" 
              alt="TBC.MC" 
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActiveRoute(item.href)
                    ? "text-primary border-b-2 border-primary"
                    : "text-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Globe size={16} className="mr-2" />
                  {language === 'fr' ? 'FR' : 'EN'}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setLanguage('fr')}>
                  Français
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('en')}>
                  English
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button variant="cta" size="sm" asChild className="hidden md:inline-flex">
              <Link to="/contact">{t('nav.getQuote')}</Link>
            </Button>

            {/* Mobile Navigation */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col space-y-4 mt-8">
                  {navigationItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`text-lg font-medium transition-colors hover:text-primary ${
                        isActiveRoute(item.href) ? "text-primary" : "text-foreground"
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <Button variant="cta" asChild className="mt-4">
                    <Link to="/contact" onClick={() => setIsOpen(false)}>
                      {t('nav.getQuote')}
                    </Link>
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;