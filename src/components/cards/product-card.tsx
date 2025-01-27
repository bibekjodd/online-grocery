import { dummyProductImage } from '@/lib/constants';
import { formatPrice } from '@/lib/utils';
import { useProduct } from '@/queries/use-product';
import { ProgressLink } from '@jodd/next-top-loading-bar';
import { ChartNoAxesGanttIcon } from 'lucide-react';
import React from 'react';
import { Button } from '../ui/button';

export default function ProductCard({ product: initialData }: { product: Product }) {
  const { data: product } = useProduct(initialData.id, { initialData });

  if (!product) return null;

  const productLink = `/products/${product.id}`;

  return (
    <section className="flex flex-col overflow-hidden rounded-md border transition-all duration-500 ease-out hover:shadow-xl hover:shadow-brand-darker/15">
      <ProgressLink href={productLink}>
        <img
          loading="lazy"
          decoding="async"
          src={product.image || dummyProductImage}
          alt="product banner image"
          className="aspect-video w-full object-cover"
        />
      </ProgressLink>

      <section className="flex flex-col gap-y-2 p-4">
        <ProgressLink href={productLink} className="text-xl font-semibold hover:text-brand">
          <h3>{product.title}</h3>
        </ProgressLink>
        <p className="text-xl font-semibold text-brand">{formatPrice(product.price)}</p>

        <div className="mt-auto pt-2">
          <ProgressLink href={productLink}>
            <Button variant="brand" Icon={ChartNoAxesGanttIcon} className="w-full">
              See More
            </Button>
          </ProgressLink>
        </div>
      </section>
    </section>
  );
}
