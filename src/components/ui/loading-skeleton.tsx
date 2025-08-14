import { cn } from "@/lib/utils";

interface LoadingSkeletonProps {
  className?: string;
}

export const LoadingSkeleton = ({ className }: LoadingSkeletonProps) => (
  <div className={cn("animate-pulse bg-muted rounded-md", className)} />
);

export const ProductCardSkeleton = () => (
  <div className="bg-card border border-border rounded-xl p-6 shadow-card">
    <LoadingSkeleton className="aspect-square w-full mb-4" />
    <LoadingSkeleton className="h-6 w-3/4 mb-2" />
    <LoadingSkeleton className="h-4 w-1/2 mb-4" />
    <LoadingSkeleton className="h-10 w-full" />
  </div>
);

export const ProductDetailSkeleton = () => (
  <div className="grid md:grid-cols-2 gap-8">
    <LoadingSkeleton className="aspect-square w-full" />
    <div className="space-y-4">
      <LoadingSkeleton className="h-8 w-3/4" />
      <LoadingSkeleton className="h-6 w-1/3" />
      <LoadingSkeleton className="h-4 w-full" />
      <LoadingSkeleton className="h-4 w-5/6" />
      <LoadingSkeleton className="h-4 w-4/5" />
      <LoadingSkeleton className="h-12 w-1/2 mt-6" />
    </div>
  </div>
);