import { Link } from 'react-router-dom';
import { Star, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Product, useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    toast({
      title: "Added to cart",
      description: `${product.title} has been added to your cart.`,
    });
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    console.error('Image failed to load:', product.image);
    // Create diverse fallback images based on category and product ID
    const fallbackImages = {
      electronics: [
        'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=300&h=300&fit=crop&crop=center', // Laptop
        'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=300&h=300&fit=crop&crop=center', // Headphones
        'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop&crop=center', // Phone
        'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=300&fit=crop&crop=center', // Camera
        'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=300&h=300&fit=crop&crop=center', // Gaming setup
        'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=300&h=300&fit=crop&crop=center'  // Desktop computer
      ],
      jewelery: [
        'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=300&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=300&h=300&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=300&h=300&fit=crop&crop=center'
      ],
      "men's clothing": [
        'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=300&h=300&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=300&h=300&fit=crop&crop=center'
      ],
      "women's clothing": [
        'https://images.unsplash.com/photo-1485231183945-fffde7cc051e?w=300&h=300&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=300&h=300&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1445205170230-053b83016050?w=300&h=300&fit=crop&crop=center'
      ]
    };
    
    const categoryImages = fallbackImages[product.category as keyof typeof fallbackImages] || 
                          ['https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=300&fit=crop&crop=center'];
    
    // Use product ID to select a consistent but varied image for each product
    const imageIndex = product.id % categoryImages.length;
    const fallbackImage = categoryImages[imageIndex];
    
    e.currentTarget.src = fallbackImage;
  };

  const formatPrice = (price: number) => `$${price.toFixed(2)}`;

  return (
    <Card className="group relative overflow-hidden border border-border hover:shadow-card transition-all duration-300 hover:-translate-y-1">
      <Link to={`/product/${product.id}`}>
        <CardContent className="p-0">
          <div className="aspect-square overflow-hidden bg-muted">
            <img
              src={product.image}
              alt={product.title}
              className="h-full w-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
              onError={handleImageError}
              loading="lazy"
            />
          </div>
          <div className="p-6">
            <Badge variant="secondary" className="mb-2 text-xs">
              {product.category}
            </Badge>
            <h3 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
              {product.title}
            </h3>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-rating text-rating" />
                <span className="text-sm text-muted-foreground ml-1">
                  {product.rating.rate} ({product.rating.count})
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-price">
                {formatPrice(product.price)}
              </span>
            </div>
          </div>
        </CardContent>
      </Link>
      <CardFooter className="p-6 pt-0">
        <Button 
          onClick={handleAddToCart}
          className="w-full bg-gradient-accent hover:shadow-glow transition-all"
          size="sm"
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};