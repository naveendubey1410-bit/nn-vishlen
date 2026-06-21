import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import ProductCardGrid from '../components/ProductCardGrid';
import LoadingSpinner from '../components/LoadingSpinner';
import type { Product } from '../types';

const priceRanges = [
  { label: 'Under $80', value: [0, 80] },
  { label: '$80 - $140', value: [80, 140] },
  { label: 'Above $140', value: [140, 9999] },
];

const categories = ['All', 'Hoodies', 'T-shirts', 'Pants', 'Sneakers'];
const sizes = ['All', 'S', 'M', 'L', 'XL'];

export default function ShopPage() {
  const { products, loading } = useProducts();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [priceFilter, setPriceFilter] = useState('All');
  const [size, setSize] = useState('All');
  const [sort, setSort] = useState('newest');

  const filtered = useMemo(() => {
    let list = products;
    if (search.trim()) {
      list = list.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase()),
      );
    }
    if (category !== 'All') {
      list = list.filter((product) => product.category === category);
    }
    if (priceFilter !== 'All') {
      const range = priceRanges.find((item) => item.label === priceFilter)?.value;
      if (range) {
        list = list.filter((product) => product.price >= range[0] && product.price <= range[1]);
      }
    }
    if (size !== 'All') {
      list = list.filter((product) => product.size.includes(size));
    }
    return [...list].sort((a, b) => {
      if (sort === 'price-low') return a.price - b.price;
      if (sort === 'price-high') return b.price - a.price;
      return b.createdAt - a.createdAt;
    });
  }, [products, search, category, priceFilter, size, sort]);

  return (
    <section className="space-y-10 py-10">
      <div className="rounded-[2.5rem] border border-white/10 bg-slate-900/80 p-8 shadow-glow">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-amber-300">Shop</p>
            <h1 className="mt-3 text-4xl font-semibold text-white">Explore the latest streetwear drop</h1>
          </div>
          <div className="relative max-w-md">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search items"
              className="w-full rounded-full border border-white/10 bg-slate-950/80 px-12 py-3 text-sm text-slate-100 outline-none transition focus:border-amber-300/80"
            />
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[260px_1fr]">
        <aside className="space-y-6 rounded-[2.5rem] border border-white/10 bg-slate-900/80 p-6 shadow-glow">
          <div>
            <h2 className="text-lg font-semibold text-white">Filters</h2>
            <div className="mt-4 space-y-4">
              <div>
                <p className="text-sm uppercase tracking-[0.32em] text-slate-500">Category</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {categories.map((option) => (
                    <button
                      key={option}
                      onClick={() => setCategory(option)}
                      className={`rounded-full px-4 py-2 text-sm transition ${category === option ? 'bg-amber-300 text-slate-950' : 'border border-white/10 text-slate-300 hover:bg-white/5'}`}>
                      {option}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.32em] text-slate-500">Size</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {sizes.map((option) => (
                    <button
                      key={option}
                      onClick={() => setSize(option)}
                      className={`rounded-full px-4 py-2 text-sm transition ${size === option ? 'bg-amber-300 text-slate-950' : 'border border-white/10 text-slate-300 hover:bg-white/5'}`}>
                      {option}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.32em] text-slate-500">Price</p>
                <div className="mt-3 space-y-3">
                  {priceRanges.map((option) => (
                    <button
                      key={option.label}
                      onClick={() => setPriceFilter(option.label)}
                      className={`w-full rounded-3xl border px-4 py-3 text-left text-sm transition ${priceFilter === option.label ? 'border-amber-300 bg-amber-300/10 text-white' : 'border-white/10 text-slate-300 hover:border-white/20'}`}>
                      {option.label}
                    </button>
                  ))}
                  <button
                    onClick={() => {
                      setPriceFilter('All');
                      setCategory('All');
                      setSize('All');
                    }}
                    className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-300 transition hover:border-white/20 hover:bg-white/5">
                    Reset filters
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-5">
            <p className="text-sm uppercase tracking-[0.32em] text-slate-500">Sort by</p>
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              className="mt-4 w-full rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-slate-200 outline-none transition focus:border-amber-300/80">
              <option value="newest">Newest</option>
              <option value="price-low">Price low to high</option>
              <option value="price-high">Price high to low</option>
            </select>
          </div>
        </aside>

        <div className="space-y-6">
          <div className="flex flex-col gap-4 rounded-[2.5rem] border border-white/10 bg-slate-900/80 p-6 shadow-glow sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.4em] text-amber-300">Showing</p>
              <h2 className="text-2xl font-semibold text-white">{filtered.length} items available</h2>
            </div>
          </div>
          {loading ? <LoadingSpinner /> : filtered.length === 0 ? <p className="rounded-3xl border border-white/10 bg-slate-900/80 p-10 text-center text-slate-400">No products matched your search.</p> : <ProductCardGrid products={filtered} />}
        </div>
      </div>
    </section>
  );
}
