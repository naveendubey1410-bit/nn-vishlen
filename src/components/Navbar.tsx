import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const { items } = useCart();
  const navigate = useNavigate();
  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="text-xl font-semibold tracking-[0.24em] text-white/90">
          VOID
        </Link>
        <nav className={`flex-1 items-center justify-center gap-8 text-sm ${open ? 'flex' : 'hidden'} md:flex`}>
          <NavLink to="/" className={({ isActive }) => `transition ${isActive ? 'text-white' : 'text-slate-400 hover:text-white'}`}>
            Home
          </NavLink>
          <NavLink to="/shop" className={({ isActive }) => `transition ${isActive ? 'text-white' : 'text-slate-400 hover:text-white'}`}>
            Shop
          </NavLink>
          <NavLink to="/cart" className={({ isActive }) => `transition ${isActive ? 'text-white' : 'text-slate-400 hover:text-white'}`}>
            Cart
          </NavLink>
          <NavLink to="/admin" className={({ isActive }) => `transition ${isActive ? 'text-white' : 'text-slate-400 hover:text-white'}`}>
            Admin
          </NavLink>
        </nav>
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/cart')} className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 transition hover:border-white/20 hover:bg-white/10">
            <ShoppingBag className="h-4 w-4 transition group-hover:scale-110" />
            <span>{count}</span>
          </button>
          <button onClick={() => navigate('/login')} className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 transition hover:border-white/20 hover:bg-white/10">
            {user ? 'Account' : 'Login'}
          </button>
          <button onClick={() => setOpen((prev) => !prev)} className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-100 transition hover:border-white/20 hover:bg-white/10 md:hidden">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
    </header>
  );
}
