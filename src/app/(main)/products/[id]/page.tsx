'use client';

import { useParams } from 'next/navigation';
import ProductOverview from './sections/overview';

export default function Page() {
  const { id } = useParams<{ id: string }>();

  return (
    <main className="cont pt-20">
      <ProductOverview productId={id} />
    </main>
  );
}
