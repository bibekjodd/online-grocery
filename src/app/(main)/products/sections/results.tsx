'use client';

import ProductCard from '@/components/cards/product-card';
import InfiniteScrollObserver from '@/components/utils/infinite-scroll-observer';
import { useProducts } from '@/queries/use-products';
import { useFilters } from './filter/base';

export default function Results() {
  const filters = useFilters();
  const {
    data: products,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isLoading
  } = useProducts(filters);

  return (
    <section>
      {!isLoading && products?.length === 0 && (
        <p className="p-4 font-medium text-error">No Results found</p>
      )}

      <div className="grid gap-x-4 gap-y-7 md:grid-cols-2 lg:grid-cols-3">
        {/* {isLoading &&
          new Array(6).fill('nothing').map((_, i) => <div key={i}>{auctionCardSkeleton}</div>)} */}
        {products?.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>

      <div className="pt-4">
        <InfiniteScrollObserver
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetching={isFetching}
        />
      </div>
    </section>
  );
}
