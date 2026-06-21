import { Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { currency } from '../utils/format';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, total, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <section className="py-20">
        <div className="mx-auto max-w-3xl rounded-[3rem] border border-white/10 bg-slate-900/80 p-12 text-center">
          <h1 className="text-4xl font-semibold text-white">Your bag is empty</h1>
          <p className="mt-4 text-slate-400">Add premium streetwear to your cart and return here when you're ready.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-10">
      <div className="grid gap-8 xl:grid-cols-[1.4fr_0.6fr]">
        <div className="space-y-6 rounded-[3rem] border border-white/10 bg-slate-900/80 p-6 shadow-glow">
          {items.map((item) => (
            <div key={`${item.product.id}-${item.size}`} className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-slate-950/80 p-6 sm:flex-row sm:items-center">
              <img src={item.product.image} alt={item.product.name} className="h-36 w-36 rounded-3xl object-cover" />
              <div className="flex-1 space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm uppercase tracking-[0.35em] text-slate-500">{item.product.category}</p>
                    <h2 className="text-xl font-semibold text-white">{item.product.name}</h2>
                  </div>
                  <button onClick={() => removeFromCart(item.product.id, item.size)} className="rounded-full border border-white/10 p-3 text-slate-400 transition hover:border-red-400/40 hover:text-red-300">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-sm text-slate-300">
                  <span>Size: {item.size}</span>
                  <span>Qty: {item.quantity}</span>
                  <span>{currency(item.product.price)}</span>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)} className="rounded-full border border-white/10 px-3 py-2 text-slate-200 transition hover:border-white/20 hover:bg-white/5">
                    -
                  </button>
                  <span className="min-w-[2rem] text-center text-base font-semibold text-white">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)} className="rounded-full border border-white/10 px-3 py-2 text-slate-200 transition hover:border-white/20 hover:bg-white/5">
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="rounded-[3rem] border border-white/10 bg-slate-900/80 p-8 shadow-glow">
          <h2 className="text-2xl font-semibold text-white">Order summary</h2>
          <div className="mt-6 space-y-4 rounded-3xl border border-white/10 bg-slate-950/70 p-6">
            <div className="flex items-center justify-between text-sm text-slate-400">
              <span>Subtotal</span>
              <span>{currency(total)}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-slate-400">
              <span>Shipping</span>
              <span>Free</span>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-between text-lg font-semibold text-white">
            <span>Total</span>
            <span>{currency(total)}</span>
          </div>
          <button className="mt-6 w-full rounded-full bg-amber-300 px-6 py-4 text-sm font-semibold text-slate-950 transition hover:bg-amber-200">
            Checkout now
          </button>
          <button onClick={clearCart} className="mt-4 w-full rounded-full border border-white/10 px-6 py-4 text-sm text-slate-200 transition hover:border-white/20 hover:bg-white/5">
            Clear cart
          </button>
        </div>
      </div>
    </section>
  );
}
