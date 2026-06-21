import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isNewUser, setIsNewUser] = useState(false);
  const [error, setError] = useState('');
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    try {
      if (isNewUser) {
        await signup(email, password);
      } else {
        await login(email, password);
      }
      navigate('/');
    } catch (err) {
      setError('Unable to authenticate. Please check your credentials.');
      console.error(err);
    }
  };

  return (
    <section className="py-20">
      <div className="mx-auto max-w-xl rounded-[3rem] border border-white/10 bg-slate-900/80 p-10 shadow-glow">
        <div className="space-y-4 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-amber-300">Access</p>
          <h1 className="text-4xl font-semibold text-white">{isNewUser ? 'Create account' : 'Login to VOID'}</h1>
          <p className="text-sm leading-6 text-slate-400">Secure sign in with Firebase auth and access your cart, wishlist, and admin panel.</p>
        </div>
        <form onSubmit={handleSubmit} className="mt-10 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-200">Email</label>
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              required
              placeholder="you@example.com"
              className="w-full rounded-3xl border border-white/10 bg-slate-950/70 px-5 py-4 text-slate-100 outline-none transition focus:border-amber-300/80"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-200">Password</label>
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              required
              placeholder="Enter password"
              className="w-full rounded-3xl border border-white/10 bg-slate-950/70 px-5 py-4 text-slate-100 outline-none transition focus:border-amber-300/80"
            />
          </div>
          {error && <p className="rounded-3xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-sm text-red-200">{error}</p>}
          <button type="submit" className="w-full rounded-full bg-amber-300 px-6 py-4 text-sm font-semibold text-slate-950 transition hover:bg-amber-200">
            {isNewUser ? 'Sign Up' : 'Sign In'}
          </button>
        </form>
        <div className="mt-6 flex items-center justify-between text-sm text-slate-400">
          <span>{isNewUser ? 'Already have an account?' : "Don't have an account?"}</span>
          <button onClick={() => setIsNewUser((prev) => !prev)} className="font-semibold text-white transition hover:text-amber-300">
            {isNewUser ? 'Login' : 'Create account'}
          </button>
        </div>
      </div>
    </section>
  );
}
