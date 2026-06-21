import type { Product } from '../types';

export const productCatalog: Product[] = [
  {
    id: 'z1',
    name: 'Void Runner Hoodie',
    price: 128,
    category: 'Hoodies',
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80',
    size: ['S', 'M', 'L', 'XL'],
    description: 'An oversized technical hoodie with premium matte finish and drop shoulders.',
    createdAt: 1689000000000,
  },
  {
    id: 'z2',
    name: 'Night Shift Tee',
    price: 58,
    category: 'T-shirts',
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=70',
    size: ['S', 'M', 'L', 'XL'],
    description: 'Soft longline tee built for street styling and daily performance.',
    createdAt: 1689086400000,
  },
  {
    id: 'z3',
    name: 'Steel Cargo Trousers',
    price: 142,
    category: 'Pants',
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=60',
    size: ['S', 'M', 'L', 'XL'],
    description: 'Structured cargo trousers with taper and premium hardware.',
    createdAt: 1689172800000,
  },
  {
    id: 'z4',
    name: 'Phantom Runner',
    price: 195,
    category: 'Sneakers',
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=90',
    size: ['S', 'M', 'L', 'XL'],
    description: 'Monochrome sneaker with responsive cushioning and signature sole.',
    createdAt: 1689259200000,
  },
];
