'use client';

import { useFilters } from '@/app/(main)/products/sections/filter/base';
import { useLoadingBar } from '@jodd/next-top-loading-bar';
import { SearchIcon, X } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react';

export default function Search() {
  return (
    <Suspense>
      <BaseComponent />
    </Suspense>
  );
}

function BaseComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchInput, setSearchInput] = useState(searchParams.get('q') || '');

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const startRouteTransition = useLoadingBar.getState().start;
    const url = `/products${searchInput ? `?q=${searchInput}` : ''}`;
    startRouteTransition(url);
    router.push(url);
    useFilters.setState({ ...useFilters.getInitialState(), q: searchInput || undefined });
  };

  useEffect(() => {
    const currentSearchInput = new URLSearchParams(location.search).get('q');
    setSearchInput(currentSearchInput || '');
  }, []);

  return (
    <form onSubmit={onSubmit} className="relative">
      <SearchIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-foreground/80" />
      <input
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="Search products..."
        className="h-11 w-full rounded-lg border-2 border-foreground/10 bg-transparent pl-9 pr-8 text-base text-foreground ring-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2"
      />
      {searchInput && (
        <X
          onClick={() => setSearchInput('')}
          className="absolute right-3 top-1/2 size-4 -translate-y-1/2 cursor-pointer text-muted-foreground"
        />
      )}
    </form>
  );
}
