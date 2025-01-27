import { FilterIcon } from 'lucide-react';
import BaseFilterContent from './base';

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-16 flex h-[calc(100vh-64px)] w-64 min-w-64 flex-col overflow-y-auto px-4 pt-2">
      <div className="mb-4 flex items-center space-x-2">
        <p className="font-medium">Filters</p>
        <FilterIcon className="size-4" />
      </div>

      <BaseFilterContent />
    </aside>
  );
}
