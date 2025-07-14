import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { LeadsSection } from "@/components/admin/LeadsSection";
import { ProductsSection } from "@/components/admin/ProductsSection";
import { StatsSection } from "@/components/admin/StatsSection";
import { ProtectedRoute } from "@/components/admin/ProtectedRoute";
import { Toaster } from "@/components/ui/toaster";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export default function Admin() {
  const [activeSection, setActiveSection] = useState("leads");
  const { signOut } = useAuth();

  const renderActiveSection = () => {
    switch (activeSection) {
      case "leads":
        return <LeadsSection />;
      case "products":
        return <ProductsSection />;
      case "stats":
        return <StatsSection />;
      default:
        return <LeadsSection />;
    }
  };

  return (
    <ProtectedRoute>
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <AdminSidebar 
            activeSection={activeSection} 
            onSectionChange={setActiveSection} 
          />
          <div className="flex-1 flex flex-col">
            <header className="h-14 flex items-center justify-between border-b bg-background px-4">
              <div className="flex items-center">
                <SidebarTrigger />
                <h1 className="ml-4 text-lg font-semibold text-foreground">
                  Dashboard TBC.MC - {activeSection === 'leads' ? 'Leads' : activeSection === 'products' ? 'Produits' : 'Statistiques'}
                </h1>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={signOut}
                className="flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Déconnexion
              </Button>
            </header>
            <main className="flex-1 p-6">
              {renderActiveSection()}
            </main>
          </div>
        </div>
        <Toaster />
      </SidebarProvider>
    </ProtectedRoute>
  );
}