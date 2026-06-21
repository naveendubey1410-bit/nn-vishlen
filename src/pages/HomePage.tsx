import { Link } from 'react-router-dom';
import { ArrowRight, Flame, ShoppingBag } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import ProductCardGrid from '../components/ProductCardGrid';
import LoadingSpinner from '../components/LoadingSpinner';

const categories = ['Hoodies', 'T-shirts', 'Pants', 'Sneakers'];

export default function HomePage() {
  const { products, loading, error } = useProducts();
  const featured = products.slice(0, 4);

  return (
    <section className="space-y-14 py-10">
      <div className="relative overflow-hidden rounded-[3rem] border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(248,196,36,0.32),_transparent_45%)] p-10 shadow-glow sm:p-16">
        <div className="absolute inset-0 bg-hero-gradient opacity-90" />
        <div className="relative grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-6 text-white">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.4em] text-amber-300">
              <Flame className="h-4 w-4" /> New drop
            </span>
            <h1 className="max-w-3xl text-5xl font-semibold leading-tight tracking-tight sm:text-6xl">
              Void Streetwear — Premium essentials built for movement.
            </h1>
            <p className="max-w-xl text-lg leading-8 text-slate-300">
              Discover modern silhouettes, bold textures, and refined details made for city nights and street style.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/shop" className="inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100">
                Shop the drop <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/cart" className="inline-flex items-center gap-2 rounded-full border border-white/10 px-6 py-3 text-sm text-white transition hover:border-white/20">
                <ShoppingBag className="h-4 w-4" /> View cart
              </Link>
            </div>
          </div>
          <div className="rounded-[2.5rem] border border-white/10 bg-slate-950/70 p-8 backdrop-blur-xl">
            <h2 className="text-sm uppercase tracking-[0.4em] text-amber-300">Featured categories</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {categories.map((category) => (
                <div key={category} className="rounded-3xl border border-white/10 bg-slate-900/80 p-5 transition hover:border-amber-300/40 hover:bg-slate-900">
                  <p className="text-sm text-slate-400">{category}</p>
                  <p className="mt-3 text-xl font-semibold text-white">{category} edit</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-slate-500">Featured collection</p>
            <h2 className="text-3xl font-semibold text-white">Premium streetwear essentials</h2>
          </div>
          <Link to="/shop" className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-300 transition hover:text-white">
            Browse all
          </Link>
        </div>
        {error && <p className="rounded-3xl border border-red-500/10 bg-red-500/5 p-4 text-sm text-red-300">{error}</p>}
        {loading ? <LoadingSpinner /> : <ProductCardGrid products={featured} />}
      </div>
    </section>
  );
}
