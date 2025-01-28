import { Product } from '@/typing';
import Image from 'next/image';
import Link from 'next/link';

type ProductCardProps = {
  product: Product;
  index: number;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/product/${product.id}`}
      className={`block rounded-[4px] border border-black/10 bg-white shadow-md`}
    >
      <div className="h-56 w-full p-4">
        <Image
          width="200"
          height="200"
          src={product.image || ''}
          className="size-full rounded-md object-cover p-2"
          alt="product"
        />
      </div>
      <div className="px-4 pb-4">
        <h1 className="mb-2 text-balance text-center text-xl font-bold">{product.name}</h1>
      </div>
    </Link>
  );
}
