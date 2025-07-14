import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Filter, Search } from "lucide-react";

interface Lead {
  id: string;
  email: string;
  name: string | null;
  type: string;
  sent: boolean | null;
  created_at: string;
  product_id: string | null;
  phone: string | null;
  company_name: string | null;
  message: string | null;
}

export function LeadsSection() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const { toast } = useToast();

  const fetchLeads = async () => {
    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLeads(data || []);
      setFilteredLeads(data || []);
    } catch (error) {
      console.error('Error fetching leads:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les leads",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const testEmailFunction = async (leadId: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('send-tech-sheet', {
        body: { record: leads.find(l => l.id === leadId) }
      });

      if (error) throw error;
      
      toast({
        title: "Test réussi",
        description: "Email de test envoyé",
      });

      fetchLeads();
    } catch (error) {
      console.error('Error testing email:', error);
      toast({
        title: "Erreur",
        description: "Erreur lors du test d'email",
        variant: "destructive"
      });
    }
  };

  const filterLeads = () => {
    let filtered = leads;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(lead => 
        lead.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.company_name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by type
    if (typeFilter !== "all") {
      filtered = filtered.filter(lead => lead.type === typeFilter);
    }

    // Filter by date
    if (dateFilter !== "all") {
      const now = new Date();
      const filterDate = new Date();
      
      switch (dateFilter) {
        case "today":
          filterDate.setHours(0, 0, 0, 0);
          break;
        case "week":
          filterDate.setDate(now.getDate() - 7);
          break;
        case "month":
          filterDate.setMonth(now.getMonth() - 1);
          break;
      }
      
      if (dateFilter !== "all") {
        filtered = filtered.filter(lead => new Date(lead.created_at) >= filterDate);
      }
    }

    setFilteredLeads(filtered);
  };

  useEffect(() => {
    fetchLeads();

    // Subscribe to real-time updates
    const channel = supabase
      .channel('leads-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'leads'
        },
        () => {
          fetchLeads();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    filterLeads();
  }, [searchTerm, typeFilter, dateFilter, leads]);

  if (loading) {
    return <div className="p-6">Chargement des leads...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher par nom, email ou société..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Type de demande" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les types</SelectItem>
            <SelectItem value="fiche">Fiche technique</SelectItem>
            <SelectItem value="devis">Demande de devis</SelectItem>
          </SelectContent>
        </Select>
        <Select value={dateFilter} onValueChange={setDateFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <Calendar className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Période" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les dates</SelectItem>
            <SelectItem value="today">Aujourd'hui</SelectItem>
            <SelectItem value="week">Cette semaine</SelectItem>
            <SelectItem value="month">Ce mois</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{leads.length}</div>
            <div className="text-sm text-muted-foreground">Total leads</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">
              {leads.filter(l => l.sent).length}
            </div>
            <div className="text-sm text-muted-foreground">Emails envoyés</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">
              {leads.filter(l => !l.sent).length}
            </div>
            <div className="text-sm text-muted-foreground">En attente</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">
              {filteredLeads.length}
            </div>
            <div className="text-sm text-muted-foreground">Résultats filtrés</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Leads ({filteredLeads.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredLeads.map((lead) => (
              <div key={lead.id} className="p-4 border rounded-lg">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="font-medium">{lead.name || 'Anonyme'}</div>
                    <div className="text-sm text-muted-foreground">{lead.email}</div>
                    {lead.phone && (
                      <div className="text-sm text-muted-foreground">📞 {lead.phone}</div>
                    )}
                    {lead.company_name && (
                      <div className="text-sm text-muted-foreground">🏢 {lead.company_name}</div>
                    )}
                    <div className="text-xs text-muted-foreground mt-1">
                      {new Date(lead.created_at).toLocaleString()}
                    </div>
                    {lead.message && (
                      <div className="text-sm mt-2 p-2 bg-muted rounded text-muted-foreground">
                        {lead.message}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant={lead.type === 'fiche' ? 'default' : 'secondary'}>
                      {lead.type === 'fiche' ? 'Fiche technique' : 'Demande de devis'}
                    </Badge>
                    <Badge variant={lead.sent ? 'default' : 'destructive'}>
                      {lead.sent ? 'Envoyé' : 'En attente'}
                    </Badge>
                    {lead.type === 'fiche' && !lead.sent && (
                      <Button 
                        size="sm" 
                        onClick={() => testEmailFunction(lead.id)}
                      >
                        Test Email
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {filteredLeads.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                Aucun lead trouvé avec ces filtres
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}