'use client';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { productCategories } from '@/lib/constants';
import { formatPrice, getSearchString, isShallowEqual } from '@/lib/utils';
import { KeyOptions } from '@/queries/use-products';
import { useLoadingBar } from '@jodd/next-top-loading-bar';
import { createStore } from '@jodd/snap';
import { FilterXIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const useFilters = createStore<KeyOptions>(() => ({}));
export const clearFilters = () => {
  const clearedState = { ...useFilters.getState() };
  for (const key of Object.keys(clearedState)) {
    // @ts-expect-error ...
    clearedState[key] = undefined;
  }
  useFilters.setState({ ...clearedState, q: useFilters.getState().q });
};

export default function BaseFilterContent() {
  const filters = useFilters();
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      const startRouteTransition = useLoadingBar.getState().start;
      const nextRoute = `/products/${getSearchString(filters)}`;
      if (startRouteTransition(nextRoute)) router.push(nextRoute);
    }, 200);
    return () => clearTimeout(timeout);
  }, [filters, router]);

  const canClearFilters = !isShallowEqual(
    { ...filters, title: undefined },
    useFilters.getInitialState()
  );

  return (
    <div className="flex flex-col gap-y-7">
      <section className="flex flex-col space-y-2">
        <Label htmlFor="category">Category</Label>
        <Select
          value={filters.category || 'all'}
          onValueChange={(val) =>
            useFilters.setState({
              category: val === 'all' ? undefined : (val as KeyOptions['category'])
            })
          }
        >
          <SelectTrigger id="category">
            <SelectValue placeholder="Category" />
          </SelectTrigger>

          <SelectContent>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {productCategories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.title}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectContent>
        </Select>
      </section>

      <section className="flex flex-col space-y-2">
        <Label htmlFor="price_gte" className="mb-2 flex items-end justify-between">
          <span>Price</span>
          {filters.price_gte && <span>{`>${formatPrice(filters.price_gte || 0)}`}</span>}
        </Label>
        <Slider
          min={0}
          step={10}
          max={10_000}
          value={[filters.price_gte || 0]}
          onValueChange={([val]) => useFilters.setState({ price_gte: val })}
        />
      </section>

      <Button
        variant="outline"
        Icon={FilterXIcon}
        disabled={!canClearFilters}
        onClick={clearFilters}
      >
        Clear Filters
      </Button>
    </div>
  );
}
