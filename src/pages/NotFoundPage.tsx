import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-3xl rounded-[3rem] border border-white/10 bg-slate-900/80 p-12 text-center">
        <p className="text-sm uppercase tracking-[0.4em] text-amber-300">404</p>
        <h1 className="mt-4 text-5xl font-semibold text-white">Page not found</h1>
        <p className="mt-4 text-slate-400">This page doesn’t exist — return home and keep browsing the latest essentials.</p>
        <Link to="/" className="mt-8 inline-flex rounded-full bg-white px-8 py-4 text-sm font-semibold text-slate-950 transition hover:bg-slate-200">
          Return home
        </Link>
      </div>
    </section>
  );
}
