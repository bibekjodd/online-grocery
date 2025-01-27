import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { dummyProductImage } from '@/lib/constants';
import { extractErrorMessage, formatPrice } from '@/lib/utils';
import { useProduct } from '@/queries/use-product';
import { AlertCircle, ZapIcon } from 'lucide-react';

export default function ProductOverview({ productId }: { productId: string }) {
  const { data: product, isLoading, error } = useProduct(productId);

  if (isLoading)
    return (
      <div className="grid grid-cols-2">
        <Skeleton className="aspect-video max-h-[70vh] w-full" />
        <div className="flex flex-col gap-y-2 pt-10 lg:pl-10 lg:pt-0">
          <Skeleton className="h-10" />
          <Skeleton className="h-10" />
          <Skeleton className="h-10" />
          <Skeleton className="h-10" />
          <Skeleton className="h-10" />
          <Skeleton className="h-10" />

          <div className="mt-auto pt-4">
            <Skeleton className="h-10" />
          </div>
        </div>
      </div>
    );

  if (error)
    return (
      <div>
        <Alert variant="destructive">
          <AlertCircle />
          <AlertTitle>Could not get products data</AlertTitle>
          <AlertDescription>{extractErrorMessage(error)}</AlertDescription>
        </Alert>
      </div>
    );

  if (!product) return null;
  return (
    <div className="grid lg:grid-cols-2">
      <img
        src={product.image || dummyProductImage}
        alt="product banner"
        className="aspect-video max-h-[70vh] w-full object-cover"
      />

      <section className="flex flex-col gap-y-2 pt-10 lg:pl-10 lg:pt-0">
        <h3 className="text-3xl font-semibold">{product.title}</h3>
        <p>{product.description}</p>

        <p className="text-2xl font-semibold text-brand">{formatPrice(product.price)}</p>

        <div className="mt-auto pt-4">
          <Button variant="brand" className="w-full" Icon={ZapIcon}>
            Buy now
          </Button>
        </div>
      </section>
    </div>
  );
}
