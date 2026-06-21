import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Heart, Minus, Plus, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useProducts } from '../hooks/useProducts';
import LoadingSpinner from '../components/LoadingSpinner';
import { currency } from '../utils/format';
import type { Product } from '../types';

const sizes = ['S', 'M', 'L', 'XL'];

export default function ProductDetailPage() {
  const { productId } = useParams();
  const { products, loading } = useProducts();
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const product = useMemo(() => products.find((item) => item.id === productId), [products, productId]);

  useEffect(() => {
    if (product && product.size.length) {
      setSelectedSize(product.size[0]);
    }
  }, [product]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!product) {
    return (
      <div className="mx-auto my-24 max-w-3xl rounded-3xl border border-white/10 bg-slate-900/80 p-10 text-center text-slate-300">
        <h1 className="text-3xl font-semibold text-white">Product not found</h1>
        <p className="mt-4">Please return to the shop and choose another item.</p>
      </div>
    );
  }

  return (
    <section className="py-10">
      <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-8 rounded-[3rem] border border-white/10 bg-slate-900/80 p-6 shadow-glow sm:p-10">
          <div className="grid gap-4 sm:grid-cols-[1fr_350px]">
            <div className="space-y-4">
              <img src={product.image} alt={product.name} className="h-[520px] w-full rounded-[2.5rem] object-cover" />
              <div className="grid gap-4 sm:grid-cols-3">
                {Array.from({ length: 3 }).map((_, index) => (
                  <img key={index} src={product.image} alt={`${product.name} ${index + 1}`} className="h-28 w-full rounded-3xl object-cover transition hover:scale-105" />
                ))}
              </div>
            </div>
            <div className="space-y-6 rounded-[2.5rem] border border-white/10 bg-slate-950/80 p-8">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm uppercase tracking-[0.4em] text-slate-500">{product.category}</p>
                  <h1 className="mt-3 text-4xl font-semibold text-white">{product.name}</h1>
                </div>
                <button className="rounded-full border border-white/10 bg-white/5 p-3 text-slate-100 transition hover:border-amber-300/50 hover:bg-white/10">
                  <Heart className="h-5 w-5" />
                </button>
              </div>
              <div className="flex items-center gap-3 text-amber-300">
                <Star className="h-4 w-4" />
                <span className="font-semibold">5.0</span>
                <span className="text-sm text-slate-400">Premium streetwear review</span>
              </div>
              <p className="text-slate-300">{product.description}</p>
              <div className="space-y-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.32em] text-slate-500">Select size</p>
                  <div className="mt-3 flex flex-wrap gap-3">
                    {sizes.map((sizeOption) => (
                      <button
                        key={sizeOption}
                        onClick={() => setSelectedSize(sizeOption)}
                        className={`rounded-3xl border px-4 py-3 text-sm transition ${selectedSize === sizeOption ? 'border-amber-300 bg-amber-300/10 text-white' : 'border-white/10 text-slate-300 hover:border-white/20'}`}>
                        {sizeOption}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.32em] text-slate-500">Quantity</p>
                  <div className="mt-3 flex items-center gap-3 rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-3">
                    <button onClick={() => setQuantity((cur) => Math.max(1, cur - 1))} className="rounded-full border border-white/10 p-2 text-slate-100 transition hover:border-white/20 hover:bg-white/5">
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="min-w-[2rem] text-center text-lg font-semibold text-white">{quantity}</span>
                    <button onClick={() => setQuantity((cur) => cur + 1)} className="rounded-full border border-white/10 p-2 text-slate-100 transition hover:border-white/20 hover:bg-white/5">
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <p className="text-3xl font-semibold text-white">{currency(product.price)}</p>
                <button
                  onClick={() => addToCart(product, selectedSize, quantity)}
                  className="w-full rounded-full bg-amber-300 px-6 py-4 text-sm font-semibold text-slate-950 transition hover:bg-amber-200">
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
