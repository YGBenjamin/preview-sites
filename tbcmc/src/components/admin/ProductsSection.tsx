import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Package, Search } from "lucide-react";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Product {
  id: string;
  name: string | null;
  brand: string | null;
  description: string | null;
  price_label: string | null;
  image_url: string | null;
  datasheet_url: string | null;
  available: boolean | null;
  accessories: boolean;
  category_id: string | null;
  weight_class: string | null;
  engine_power: string | null;
  operating_weight: string | null;
  bucket_capacity: string | null;
  max_digging_depth: string | null;
  max_dumping_height: string | null;
  transport_width: string | null;
  fuel_tank_capacity: string | null;
  hydraulic_flow: string | null;
  created_at: string;
}

interface ProductFormData {
  name: string;
  brand: string;
  description: string;
  price_label: string;
  image_url: string;
  datasheet_url: string;
  available: boolean;
  accessories: boolean;
  weight_class: string;
  engine_power: string;
  operating_weight: string;
  bucket_capacity: string;
  max_digging_depth: string;
  max_dumping_height: string;
  transport_width: string;
  fuel_tank_capacity: string;
  hydraulic_flow: string;
}

const emptyFormData: ProductFormData = {
  name: "",
  brand: "",
  description: "",
  price_label: "",
  image_url: "",
  datasheet_url: "",
  available: true,
  accessories: false,
  weight_class: "",
  engine_power: "",
  operating_weight: "",
  bucket_capacity: "",
  max_digging_depth: "",
  max_dumping_height: "",
  transport_width: "",
  fuel_tank_capacity: "",
  hydraulic_flow: "",
};

export function ProductsSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<ProductFormData>(emptyFormData);
  const { toast } = useToast();

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
      setFilteredProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les produits",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    if (!searchTerm) {
      setFilteredProducts(products);
      return;
    }

    const filtered = products.filter(product => 
      product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleSaveProduct = async () => {
    try {
      if (editingProduct) {
        // Update existing product
        const { error } = await supabase
          .from('products')
          .update(formData)
          .eq('id', editingProduct.id);

        if (error) throw error;
        toast({
          title: "Succès",
          description: "Produit mis à jour avec succès",
        });
      } else {
        // Create new product
        const { error } = await supabase
          .from('products')
          .insert([formData]);

        if (error) throw error;
        toast({
          title: "Succès",
          description: "Produit créé avec succès",
        });
      }

      setIsDialogOpen(false);
      setEditingProduct(null);
      setFormData(emptyFormData);
      fetchProducts();
    } catch (error) {
      console.error('Error saving product:', error);
      toast({
        title: "Erreur",
        description: "Erreur lors de la sauvegarde",
        variant: "destructive"
      });
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) return;

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId);

      if (error) throw error;
      
      toast({
        title: "Succès",
        description: "Produit supprimé avec succès",
      });
      
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      toast({
        title: "Erreur",
        description: "Erreur lors de la suppression",
        variant: "destructive"
      });
    }
  };

  const openEditDialog = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name || "",
      brand: product.brand || "",
      description: product.description || "",
      price_label: product.price_label || "",
      image_url: product.image_url || "",
      datasheet_url: product.datasheet_url || "",
      available: product.available ?? true,
      accessories: product.accessories,
      weight_class: product.weight_class || "",
      engine_power: product.engine_power || "",
      operating_weight: product.operating_weight || "",
      bucket_capacity: product.bucket_capacity || "",
      max_digging_depth: product.max_digging_depth || "",
      max_dumping_height: product.max_dumping_height || "",
      transport_width: product.transport_width || "",
      fuel_tank_capacity: product.fuel_tank_capacity || "",
      hydraulic_flow: product.hydraulic_flow || "",
    });
    setIsDialogOpen(true);
  };

  const openCreateDialog = () => {
    setEditingProduct(null);
    setFormData(emptyFormData);
    setIsDialogOpen(true);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [searchTerm, products]);

  if (loading) {
    return <div className="p-6">Chargement des produits...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un produit..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button onClick={openCreateDialog}>
          <Plus className="mr-2 h-4 w-4" />
          Nouveau produit
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{products.length}</div>
            <div className="text-sm text-muted-foreground">Total produits</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">
              {products.filter(p => p.available).length}
            </div>
            <div className="text-sm text-muted-foreground">Disponibles</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">
              {products.filter(p => p.accessories).length}
            </div>
            <div className="text-sm text-muted-foreground">Accessoires</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Produits ({filteredProducts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produit</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Prix</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {product.image_url ? (
                        <img 
                          src={product.image_url} 
                          alt={product.name || ""} 
                          className="w-12 h-12 rounded object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded bg-muted flex items-center justify-center">
                          <Package className="h-6 w-6 text-muted-foreground" />
                        </div>
                      )}
                      <div>
                        <div className="font-medium">{product.name || 'Sans nom'}</div>
                        <div className="text-sm text-muted-foreground">{product.brand}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={product.accessories ? "secondary" : "default"}>
                      {product.accessories ? "Accessoire" : "Machine"}
                    </Badge>
                  </TableCell>
                  <TableCell>{product.price_label || "Sur demande"}</TableCell>
                  <TableCell>
                    <Badge variant={product.available ? "default" : "destructive"}>
                      {product.available ? "Disponible" : "Indisponible"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => openEditDialog(product)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredProducts.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              Aucun produit trouvé
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingProduct ? "Modifier le produit" : "Nouveau produit"}
            </DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nom</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="brand">Marque</Label>
                <Input
                  id="brand"
                  value={formData.brand}
                  onChange={(e) => setFormData(prev => ({ ...prev, brand: e.target.value }))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price_label">Prix indicatif</Label>
                <Input
                  id="price_label"
                  value={formData.price_label}
                  onChange={(e) => setFormData(prev => ({ ...prev, price_label: e.target.value }))}
                  placeholder="Ex: Sur demande, À partir de 50 000€"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight_class">Classe de poids</Label>
                <Input
                  id="weight_class"
                  value={formData.weight_class}
                  onChange={(e) => setFormData(prev => ({ ...prev, weight_class: e.target.value }))}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="image_url">URL de l'image</Label>
                <Input
                  id="image_url"
                  value={formData.image_url}
                  onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="datasheet_url">URL fiche technique</Label>
                <Input
                  id="datasheet_url"
                  value={formData.datasheet_url}
                  onChange={(e) => setFormData(prev => ({ ...prev, datasheet_url: e.target.value }))}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="engine_power">Puissance moteur</Label>
                <Input
                  id="engine_power"
                  value={formData.engine_power}
                  onChange={(e) => setFormData(prev => ({ ...prev, engine_power: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="operating_weight">Poids opérationnel</Label>
                <Input
                  id="operating_weight"
                  value={formData.operating_weight}
                  onChange={(e) => setFormData(prev => ({ ...prev, operating_weight: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bucket_capacity">Capacité godet</Label>
                <Input
                  id="bucket_capacity"
                  value={formData.bucket_capacity}
                  onChange={(e) => setFormData(prev => ({ ...prev, bucket_capacity: e.target.value }))}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="max_digging_depth">Profondeur de fouille max</Label>
                <Input
                  id="max_digging_depth"
                  value={formData.max_digging_depth}
                  onChange={(e) => setFormData(prev => ({ ...prev, max_digging_depth: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="max_dumping_height">Hauteur de déversement max</Label>
                <Input
                  id="max_dumping_height"
                  value={formData.max_dumping_height}
                  onChange={(e) => setFormData(prev => ({ ...prev, max_dumping_height: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="transport_width">Largeur de transport</Label>
                <Input
                  id="transport_width"
                  value={formData.transport_width}
                  onChange={(e) => setFormData(prev => ({ ...prev, transport_width: e.target.value }))}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fuel_tank_capacity">Capacité réservoir</Label>
                <Input
                  id="fuel_tank_capacity"
                  value={formData.fuel_tank_capacity}
                  onChange={(e) => setFormData(prev => ({ ...prev, fuel_tank_capacity: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hydraulic_flow">Débit hydraulique</Label>
                <Input
                  id="hydraulic_flow"
                  value={formData.hydraulic_flow}
                  onChange={(e) => setFormData(prev => ({ ...prev, hydraulic_flow: e.target.value }))}
                />
              </div>
            </div>

            <div className="flex items-center gap-8">
              <div className="flex items-center space-x-2">
                <Switch
                  id="available"
                  checked={formData.available}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, available: checked }))}
                />
                <Label htmlFor="available">Disponible</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="accessories"
                  checked={formData.accessories}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, accessories: checked }))}
                />
                <Label htmlFor="accessories">Accessoire</Label>
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button onClick={handleSaveProduct} className="flex-1">
                {editingProduct ? "Mettre à jour" : "Créer"}
              </Button>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Annuler
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}