import { apiClient } from '@/lib/api-client';
import { Product } from '@/typing';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

export const productKey = (id: string) => ['product', id];

export const useProduct = (
  productId: string,
  queryOptions?: Partial<UseQueryOptions<Product | null>>
) => {
  return useQuery<Product | null>({
    queryKey: productKey(productId),
    queryFn: ({ signal }) => fetchProduct({ productId, signal }),
    ...queryOptions
  });
};

export const fetchProduct = async ({
  productId,
  signal
}: {
  productId: string;
  signal: AbortSignal;
}): Promise<Product> => {
  const res = await apiClient.get<{ product: Product }>(`/api/products/${productId}`, {
    signal,
    withCredentials: true
  });
  return res.data.product;
};
