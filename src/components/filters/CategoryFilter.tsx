import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string | null;
  onCategorySelect: (category: string | null) => void;
  loading?: boolean;
}

export const CategoryFilter = ({ 
  categories, 
  selectedCategory, 
  onCategorySelect, 
  loading = false 
}: CategoryFilterProps) => {
  if (loading) {
    return (
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="h-8 w-20 bg-muted animate-pulse rounded-full" />
        ))}
      </div>
    );
  }

  const formatCategoryName = (category: string) => {
    return category
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant={selectedCategory === null ? "default" : "outline"}
        size="sm"
        onClick={() => onCategorySelect(null)}
        className={cn(
          "rounded-full transition-all",
          selectedCategory === null && "bg-gradient-primary shadow-glow"
        )}
      >
        All Products
      </Button>
      {categories.map((category) => (
        <Button
          key={category}
          variant={selectedCategory === category ? "default" : "outline"}
          size="sm"
          onClick={() => onCategorySelect(category)}
          className={cn(
            "rounded-full transition-all",
            selectedCategory === category && "bg-gradient-primary shadow-glow"
          )}
        >
          {formatCategoryName(category)}
        </Button>
      ))}
    </div>
  );
};