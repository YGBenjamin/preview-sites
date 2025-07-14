import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Package, TrendingUp, Calendar } from "lucide-react";

interface Stats {
  totalLeads: number;
  leadsThisMonth: number;
  leadsThisWeek: number;
  emailsSent: number;
  totalProducts: number;
  availableProducts: number;
  accessories: number;
  recentLeads: any[];
}

export function StatsSection() {
  const [stats, setStats] = useState<Stats>({
    totalLeads: 0,
    leadsThisMonth: 0,
    leadsThisWeek: 0,
    emailsSent: 0,
    totalProducts: 0,
    availableProducts: 0,
    accessories: 0,
    recentLeads: [],
  });
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      // Fetch leads stats
      const { data: leads, error: leadsError } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (leadsError) throw leadsError;

      // Fetch products stats
      const { data: products, error: productsError } = await supabase
        .from('products')
        .select('*');

      if (productsError) throw productsError;

      // Calculate date ranges
      const now = new Date();
      const startOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() - now.getDay());
      startOfWeek.setHours(0, 0, 0, 0);

      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

      // Calculate stats
      const leadsThisWeek = leads?.filter(lead => 
        new Date(lead.created_at) >= startOfWeek
      ).length || 0;

      const leadsThisMonth = leads?.filter(lead => 
        new Date(lead.created_at) >= startOfMonth
      ).length || 0;

      const emailsSent = leads?.filter(lead => lead.sent).length || 0;

      const availableProducts = products?.filter(product => product.available).length || 0;
      const accessories = products?.filter(product => product.accessories).length || 0;

      setStats({
        totalLeads: leads?.length || 0,
        leadsThisMonth,
        leadsThisWeek,
        emailsSent,
        totalProducts: products?.length || 0,
        availableProducts,
        accessories,
        recentLeads: leads?.slice(0, 5) || [],
      });

    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();

    // Subscribe to real-time updates
    const leadsChannel = supabase
      .channel('stats-leads-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'leads'
        },
        () => {
          fetchStats();
        }
      )
      .subscribe();

    const productsChannel = supabase
      .channel('stats-products-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'products'
        },
        () => {
          fetchStats();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(leadsChannel);
      supabase.removeChannel(productsChannel);
    };
  }, []);

  if (loading) {
    return <div className="p-6">Chargement des statistiques...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalLeads}</div>
            <p className="text-xs text-muted-foreground">
              +{stats.leadsThisMonth} ce mois
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cette semaine</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.leadsThisWeek}</div>
            <p className="text-xs text-muted-foreground">
              nouveaux leads
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Emails envoyés</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.emailsSent}</div>
            <p className="text-xs text-muted-foreground">
              {((stats.emailsSent / Math.max(stats.totalLeads, 1)) * 100).toFixed(1)}% du total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Produits</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProducts}</div>
            <p className="text-xs text-muted-foreground">
              {stats.availableProducts} disponibles
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Répartition des leads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Fiches techniques</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full" 
                      style={{ 
                        width: `${(stats.recentLeads.filter(l => l.type === 'fiche').length / Math.max(stats.totalLeads, 1)) * 100}%` 
                      }}
                    />
                  </div>
                  <span className="text-sm font-medium">
                    {stats.recentLeads.filter(l => l.type === 'fiche').length}
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Demandes de devis</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-muted rounded-full h-2">
                    <div 
                      className="bg-secondary h-2 rounded-full" 
                      style={{ 
                        width: `${(stats.recentLeads.filter(l => l.type === 'devis').length / Math.max(stats.totalLeads, 1)) * 100}%` 
                      }}
                    />
                  </div>
                  <span className="text-sm font-medium">
                    {stats.recentLeads.filter(l => l.type === 'devis').length}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Catalogue produits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Machines</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full" 
                      style={{ 
                        width: `${((stats.totalProducts - stats.accessories) / Math.max(stats.totalProducts, 1)) * 100}%` 
                      }}
                    />
                  </div>
                  <span className="text-sm font-medium">
                    {stats.totalProducts - stats.accessories}
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Accessoires</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-muted rounded-full h-2">
                    <div 
                      className="bg-secondary h-2 rounded-full" 
                      style={{ 
                        width: `${(stats.accessories / Math.max(stats.totalProducts, 1)) * 100}%` 
                      }}
                    />
                  </div>
                  <span className="text-sm font-medium">
                    {stats.accessories}
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Disponibles</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-muted rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ 
                        width: `${(stats.availableProducts / Math.max(stats.totalProducts, 1)) * 100}%` 
                      }}
                    />
                  </div>
                  <span className="text-sm font-medium">
                    {stats.availableProducts}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Leads récents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {stats.recentLeads.map((lead) => (
              <div key={lead.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">{lead.name || 'Anonyme'}</div>
                  <div className="text-sm text-muted-foreground">{lead.email}</div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(lead.created_at).toLocaleString()}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Badge variant={lead.type === 'fiche' ? 'default' : 'secondary'}>
                    {lead.type === 'fiche' ? 'Fiche' : 'Devis'}
                  </Badge>
                  <Badge variant={lead.sent ? 'default' : 'destructive'}>
                    {lead.sent ? 'Envoyé' : 'En attente'}
                  </Badge>
                </div>
              </div>
            ))}
            {stats.recentLeads.length === 0 && (
              <div className="text-center py-4 text-muted-foreground">
                Aucun lead récent
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}