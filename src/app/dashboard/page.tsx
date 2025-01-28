'use client';

// page.tsx
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
//   import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
//   import { Alert, AlertDescription } from "@/components/ui/alert";
// import { useToast } from '@/components/ui/use-toast';
import { FormErrors, Product, ProductFormData } from '@/typing';
import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import { toast } from 'sonner';

export type CreateProductDTO = Omit<Product, 'id' | 'ownerId' | 'createdAt'>;

const ProductDashboard: React.FC = () => {
  const [formData, setFormData] = useState<ProductFormData>({
    title: '',
    description: '',
    image: '',
    category: '',
    price: '',
    stock: '',
    discount: '0'
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const addProductMutation = useMutation({
    mutationFn: async (productData: Product) => {
      const response = await fetch('https://online-grocery-server.vercel.app/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(productData)
      });

      if (!response.ok) {
        throw new Error('Failed to add product');
      }

      return response.json();
    },
    onSuccess: () => {
      toast.success('Add Product Successfully');

      // Reset form
      setFormData({
        title: '',
        description: '',
        image: '',
        category: '',
        price: '',
        stock: '',
        discount: '0'
      });
      setErrors({});
    },
    onError: (error: Error) => {
      toast.error('There was problem while adding product, add again later');
    }
  });

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Title validation
    if (!formData.title) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length > 200) {
      newErrors.title = 'Title must be less than 200 characters';
    }

    // Description validation
    if (formData.description.length > 200) {
      newErrors.description = 'Description must be less than 200 characters';
    }

    // Image validation
    if (formData.image) {
      const imageRegex = /(https?:\/\/.*.(png|gif|webp|jpeg|jpg))/i;
      if (!imageRegex.test(formData.image)) {
        newErrors.image = 'Invalid image URL format';
      }
    }

    // Category validation
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    // Price validation
    const price = Number(formData.price);
    if (!formData.price) {
      newErrors.price = 'Price is required';
    } else if (isNaN(price) || price > 100000 || price < 0) {
      newErrors.price = 'Price must be between 0 and 100000';
    }

    // Stock validation
    const stock = Number(formData.stock);
    if (!formData.stock) {
      newErrors.stock = 'Stock is required';
    } else if (isNaN(stock) || stock > 10000 || stock < 0) {
      newErrors.stock = 'Stock must be between 0 and 10000';
    }

    // Discount validation
    const discount = Number(formData.discount);
    if (isNaN(discount) || discount < 0 || discount > 100) {
      newErrors.discount = 'Discount must be between 0 and 100';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const productData: Product = {
      title: formData.title,
      description: formData.description,
      image: formData.image || null,
      category: formData.category as 'fruits' | 'vegetables',
      price: Number(formData.price),
      stock: Number(formData.stock),
      discount: Number(formData.discount)
    };

    addProductMutation.mutate(productData);
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Add New Product</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                placeholder="Product Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className={errors.title ? 'border-red-500' : ''}
              />
              {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
            </div>

            <div>
              <Input
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className={errors.description ? 'border-red-500' : ''}
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-500">{errors.description}</p>
              )}
            </div>

            <div>
              <Input
                placeholder="Image URL"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className={errors.image ? 'border-red-500' : ''}
              />
              {errors.image && <p className="mt-1 text-sm text-red-500">{errors.image}</p>}
            </div>

            <div>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger className={errors.category ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fruits">Fruits</SelectItem>
                  <SelectItem value="vegetables">Vegetables</SelectItem>
                </SelectContent>
              </Select>
              {errors.category && <p className="mt-1 text-sm text-red-500">{errors.category}</p>}
            </div>

            <div>
              <Input
                type="number"
                placeholder="Price"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className={errors.price ? 'border-red-500' : ''}
              />
              {errors.price && <p className="mt-1 text-sm text-red-500">{errors.price}</p>}
            </div>

            <div>
              <Input
                type="number"
                placeholder="Stock"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                className={errors.stock ? 'border-red-500' : ''}
              />
              {errors.stock && <p className="mt-1 text-sm text-red-500">{errors.stock}</p>}
            </div>

            <div>
              <Input
                type="number"
                placeholder="Discount %"
                value={formData.discount}
                onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                className={errors.discount ? 'border-red-500' : ''}
              />
              {errors.discount && <p className="mt-1 text-sm text-red-500">{errors.discount}</p>}
            </div>

            <Button type="submit" className="w-full" disabled={addProductMutation.isPending}>
              {addProductMutation.isPending ? 'Adding...' : 'Add Product'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductDashboard;
