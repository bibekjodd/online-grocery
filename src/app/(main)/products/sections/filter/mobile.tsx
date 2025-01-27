'use client';

import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { SlidersHorizontalIcon } from 'lucide-react';
import BaseFilterContent, { useFilters } from './base';

export const clearFilters = () => {
  const clearedState = { ...useFilters.getState() };
  for (const key of Object.keys(clearedState)) {
    // @ts-expect-error ...
    clearedState[key] = undefined;
  }
  useFilters.setState({ ...clearedState, q: useFilters.getState().q });
};

export default function MobileFilter() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" Icon={SlidersHorizontalIcon}>
          Filters
        </Button>
      </PopoverTrigger>

      <PopoverContent className="min-w-44">
        <BaseFilterContent />
      </PopoverContent>
    </Popover>
  );
}
