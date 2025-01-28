import ProductGrid from '@/components/home/products';
import Header from '@/components/layouts/header';
import React from 'react';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <ProductGrid />
      {/* <Footer /> */}
    </>
  );
}
