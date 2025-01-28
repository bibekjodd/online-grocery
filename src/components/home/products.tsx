'use client';

import { Product } from '@/typing';
import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

export default function ProductGrid() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://online-grocery-server.vercel.app//api/products');
        //  // Adjust API endpoint as needed
        console.log(response.data);
        setProducts(response.data.products);
      } catch (err) {
        setError(err?.message || 'Failed to fetch products.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p className="text-center text-lg">Loading products...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (!products) return null;

  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-4 text-2xl font-bold">Products</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product: Product) => (
          <div
            key={product.id}
            className="rounded-lg border p-4 shadow-md transition-shadow hover:shadow-lg"
          >
            <Image
              src={product.image!}
              alt={product.title!}
              width={300}
              height={200}
              className="mb-4 rounded-lg object-cover"
            />
            <h2 className="text-xl font-semibold">{product.title}</h2>
            <p className="text-sm capitalize text-gray-500">{product.category}</p>
            <p className="mt-2 text-gray-700">{product.description}</p>
            <div className="mt-4">
              <p className="text-lg font-bold">Price: ${product.price}</p>
              <p className="text-sm text-gray-500">Stock: {product.stock}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
