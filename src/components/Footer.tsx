import { Instagram, Twitter, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/95 py-10 text-slate-400">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 sm:px-6 lg:px-8 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="font-semibold text-white">VOID Streetwear</p>
          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">
            Premium streetwear essentials, built for bold movement and clean lines.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <a href="#" className="transition hover:text-white"><Instagram className="h-5 w-5" /></a>
          <a href="#" className="transition hover:text-white"><Twitter className="h-5 w-5" /></a>
          <a href="#" className="transition hover:text-white"><Youtube className="h-5 w-5" /></a>
        </div>
      </div>
    </footer>
  );
}
