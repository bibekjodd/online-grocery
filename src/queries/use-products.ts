import { apiClient } from '@/lib/api-client';
import { concatenateSearchParams } from '@/lib/utils';
import { useInfiniteQuery } from '@tanstack/react-query';

export type KeyOptions = Partial<{
  q: string;
  owner: string;
  limit: number;
  category: 'fruits' | 'vegetables';
  sort: 'oldest' | 'recent' | 'title_asc' | 'title_desc' | 'price_asc' | 'price_desc';
  resource: 'self';
  price_gte: number;
  price_lte: number;
}>;
export const productsKey = (options?: KeyOptions) => [
  'products',
  {
    ...options,
    sort: options?.sort || 'starts_at_desc',
    q: options?.q?.trim() || undefined
  }
];

export const useProducts = (options?: KeyOptions) => {
  return useInfiniteQuery({
    queryKey: productsKey(options),
    queryFn: ({ pageParam, signal }) => fetchProducts({ cursor: pageParam, signal, ...options }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.cursor,
    select: (data) => data.pages.map((page) => page.products).flat(1)
  });
};

type Options = KeyOptions & {
  cursor: string | undefined;
  signal: AbortSignal;
};

export type FetchProductsResult = { cursor: string | undefined; products: Product[] };
export const fetchProducts = async ({
  signal,
  ...query
}: Options): Promise<FetchProductsResult> => {
  const { data } = await apiClient.get<FetchProductsResult>(
    concatenateSearchParams('/api/products', query),
    {
      signal,
      withCredentials: true
    }
  );
  return data;
};
