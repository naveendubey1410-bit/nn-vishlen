import { useEffect, useState } from 'react';
import {
  collection,
  getDocs,
  orderBy,
  query,
  type DocumentData,
} from 'firebase/firestore';
import { db } from '../firebase';
import { productCatalog } from '../data/products';
import type { Product } from '../types';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      try {
        const collectionRef = collection(db, 'products');
        const productQuery = query(collectionRef, orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(productQuery);
        if (snapshot.empty) {
          setProducts(productCatalog);
        } else {
          const loaded: Product[] = snapshot.docs.map((doc) => {
            const data = doc.data() as DocumentData;
            return {
              id: doc.id,
              name: data.name ?? 'Untitled product',
              price: Number(data.price ?? 0),
              category: data.category ?? 'Streetwear',
              image:
                data.image ??
                'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80',
              size: Array.isArray(data.size) ? data.size : ['S', 'M', 'L', 'XL'],
              description: data.description ?? 'Premium streetwear product.',
              createdAt: Number(data.createdAt ?? Date.now()),
            };
          });
          setProducts(loaded);
        }
      } catch (err) {
        console.error('Could not load products', err);
        setError('Unable to load store items. Showing curated selection.');
        setProducts(productCatalog);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  return { products, loading, error };
}
