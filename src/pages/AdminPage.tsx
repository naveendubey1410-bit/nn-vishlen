import { FormEvent, useMemo, useState } from 'react';
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../hooks/useProducts';
import type { Product } from '../types';

const defaultForm = {
  name: '',
  price: 0,
  category: 'Hoodies',
  image: '',
  size: 'S,M,L,XL',
  description: '',
};

export default function AdminPage() {
  const { profile } = useAuth();
  const { products, loading } = useProducts();
  const [form, setForm] = useState(defaultForm);
  const [message, setMessage] = useState('');

  const isAdmin = profile?.role === 'admin';

  const productDocs = useMemo(() => products, [products]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage('');
    try {
      const collectionRef = collection(db, 'products');
      await addDoc(collectionRef, {
        name: form.name,
        price: form.price,
        category: form.category,
        image: form.image,
        size: form.size.split(',').map((s) => s.trim()),
        description: form.description,
        createdAt: Date.now(),
      });
      setForm(defaultForm);
      setMessage('Product added successfully. Refresh the page to see changes.');
    } catch (error) {
      console.error(error);
      setMessage('Unable to add product.');
    }
  };

  const handleDelete = async (productId: string) => {
    try {
      await deleteDoc(doc(db, 'products', productId));
      setMessage('Product deleted. Refresh to update list.');
    } catch (error) {
      console.error(error);
      setMessage('Unable to delete product.');
    }
  };

  const handleUpdate = async (productId: string) => {
    try {
      const target = products.find((item) => item.id === productId);
      if (!target) return;
      const documentRef = doc(db, 'products', productId);
      await updateDoc(documentRef, {
        price: target.price + 1,
      });
      setMessage('Product updated. Refresh to see the latest value.');
    } catch (error) {
      console.error(error);
      setMessage('Unable to update product.');
    }
  };

  if (!isAdmin) {
    return (
      <section className="py-20">
        <div className="mx-auto max-w-3xl rounded-[3rem] border border-white/10 bg-slate-900/80 p-10 text-center">
          <h1 className="text-4xl font-semibold text-white">Access denied</h1>
          <p className="mt-4 text-slate-400">Only admin users can manage products here.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-10 py-10">
      <div className="rounded-[3rem] border border-white/10 bg-slate-900/80 p-8 shadow-glow">
        <h1 className="text-3xl font-semibold text-white">Admin panel</h1>
        <p className="mt-2 text-slate-400">Create, update, and delete products stored in Firestore.</p>
        <form onSubmit={handleSubmit} className="mt-8 grid gap-4 sm:grid-cols-2">
          <input
            value={form.name}
            onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
            placeholder="Product name"
            className="rounded-3xl border border-white/10 bg-slate-950/70 px-4 py-4 text-slate-100 outline-none"
          />
          <input
            value={form.price}
            onChange={(event) => setForm((prev) => ({ ...prev, price: Number(event.target.value) }))}
            type="number"
            placeholder="Price"
            className="rounded-3xl border border-white/10 bg-slate-950/70 px-4 py-4 text-slate-100 outline-none"
          />
          <input
            value={form.category}
            onChange={(event) => setForm((prev) => ({ ...prev, category: event.target.value }))}
            placeholder="Category"
            className="rounded-3xl border border-white/10 bg-slate-950/70 px-4 py-4 text-slate-100 outline-none"
          />
          <input
            value={form.image}
            onChange={(event) => setForm((prev) => ({ ...prev, image: event.target.value }))}
            placeholder="Image URL"
            className="rounded-3xl border border-white/10 bg-slate-950/70 px-4 py-4 text-slate-100 outline-none"
          />
          <input
            value={form.size}
            onChange={(event) => setForm((prev) => ({ ...prev, size: event.target.value }))}
            placeholder="Sizes (S,M,L,XL)"
            className="rounded-3xl border border-white/10 bg-slate-950/70 px-4 py-4 text-slate-100 outline-none"
          />
          <textarea
            value={form.description}
            onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
            placeholder="Description"
            className="col-span-full min-h-[120px] rounded-3xl border border-white/10 bg-slate-950/70 px-4 py-4 text-slate-100 outline-none"
          />
          <button type="submit" className="col-span-full rounded-full bg-amber-300 px-6 py-4 text-sm font-semibold text-slate-950 transition hover:bg-amber-200">
            Add product
          </button>
        </form>
        {message && <p className="mt-6 rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-slate-200">{message}</p>}
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">Current products</h2>
        <div className="grid gap-4">
          {loading ? (
            <p className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 text-slate-400">Loading products…</p>
          ) : (
            productDocs.map((product) => (
              <div key={product.id} className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 sm:flex sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-white">{product.name}</h3>
                  <p className="mt-2 text-sm text-slate-400">{product.category} · ${product.price}</p>
                </div>
                <div className="mt-4 flex flex-wrap gap-3 sm:mt-0">
                  <button onClick={() => handleUpdate(product.id)} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:border-amber-300/40">Update</button>
                  <button onClick={() => handleDelete(product.id)} className="rounded-full border border-red-400/20 bg-red-500/5 px-4 py-2 text-sm text-red-200 transition hover:bg-red-500/10">Delete</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
