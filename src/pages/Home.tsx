import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { ProductGrid } from '@/components/product/ProductGrid';
import { CategoryFilter } from '@/components/filters/CategoryFilter';
import { Product } from '@/contexts/CartContext';
import { fetchProducts, fetchCategories, fetchProductsByCategory } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

export const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [productsData, categoriesData] = await Promise.all([
          fetchProducts(),
          fetchCategories()
        ]);
        setProducts(productsData);
        setCategories(categoriesData);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load products. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
        setCategoriesLoading(false);
      }
    };

    loadInitialData();
  }, [toast]);

  const handleCategorySelect = async (category: string | null) => {
    setSelectedCategory(category);
    setLoading(true);

    try {
      const data = category ? await fetchProductsByCategory(category) : await fetchProducts();
      setProducts(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to filter products. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-primary py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-4">
            Discover Amazing Products
          </h1>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
            Shop from our curated collection of high-quality products at unbeatable prices
          </p>
        </div>
      </section>

      {/* Products Section */}
      <main className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Browse by Category
          </h2>
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategorySelect={handleCategorySelect}
            loading={categoriesLoading}
          />
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-foreground">
            {selectedCategory 
              ? `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Products` 
              : 'All Products'
            }
          </h3>
          <p className="text-muted-foreground">
            {loading ? 'Loading...' : `${products.length} products found`}
          </p>
        </div>

        <ProductGrid products={products} loading={loading} />
      </main>
    </div>
  );
};