'use client';

import { useWindowSize } from '@/hooks/use-window-size';
import { isShallowEqual } from '@/lib/utils';
import { KeyOptions } from '@/queries/use-products';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { useFilters } from './sections/filter/base';
import MobileFilter from './sections/filter/mobile';
import Sidebar from './sections/filter/sidebar';
import Results from './sections/results';

export default function page() {
  return (
    <main className="relative min-h-screen overflow-hidden pb-20 pt-28 md:pt-16">
      <Suspense>
        <BaseComponent />
      </Suspense>
    </main>
  );
}

function BaseComponent() {
  const searchParams = useSearchParams();
  const [isSetInitialSearchParams, setIsSetInitialSearchParams] = useState(false);
  const { width } = useWindowSize();

  useEffect(() => {
    const currentSearchParams = {
      q: searchParams.get('q') || undefined,
      category: (searchParams.get('category') as KeyOptions['category']) || undefined,
      owner: searchParams.get('owner') || undefined,
      sort: (searchParams.get('sort') as KeyOptions['sort']) || undefined,
      limit: Number(searchParams.get('limit')) || undefined,
      price_lte: Number(searchParams.get('price_lte')) || undefined,
      price_gte: Number(searchParams.get('price_gte')) || undefined
    } satisfies KeyOptions;

    if (!isSetInitialSearchParams || !isShallowEqual(currentSearchParams, useFilters.getState())) {
      useFilters.setState(currentSearchParams);
      setIsSetInitialSearchParams(true);
    }
  }, [searchParams, isSetInitialSearchParams]);

  if (!isSetInitialSearchParams) return null;

  return (
    <div className="flex">
      {width >= 1024 && <Sidebar />}
      <div className="px-4 md:px-5 lg:pl-64">
        {width < 1024 && (
          <div className="flex gap-x-3 py-4">
            <MobileFilter />
          </div>
        )}
        <Results />
      </div>
    </div>
  );
}
