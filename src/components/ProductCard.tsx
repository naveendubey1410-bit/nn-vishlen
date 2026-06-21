import { Link } from 'react-router-dom';
import { Heart, Star } from 'lucide-react';
import type { Product } from '../types';

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-white/10 bg-slate-900/80 shadow-glow transition hover:-translate-y-1 hover:bg-white/5">
      <Link to={`/product/${product.id}`} className="block overflow-hidden">
        <img src={product.image} alt={product.name} className="h-72 w-full object-cover transition duration-500 group-hover:scale-105" />
      </Link>
      <div className="space-y-3 p-5">
        <div className="flex items-center justify-between text-xs uppercase tracking-[0.32em] text-slate-500">
          <span>{product.category}</span>
          <span className="inline-flex items-center gap-1 text-amber-300">
            <Star className="h-3.5 w-3.5" />
            5.0
          </span>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-white">{product.name}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-400">{product.description}</p>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xl font-semibold">${product.price}</span>
          <button className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-slate-900 transition hover:border-white/20 hover:bg-white/10">
            <Heart className="h-5 w-5" />
          </button>
        </div>
      </div>
    </article>
  );
}
