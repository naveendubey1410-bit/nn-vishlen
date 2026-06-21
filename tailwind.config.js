export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#0f172a',
        accent: '#f8fafc',
        highlight: '#facc15',
        surface: '#111827',
      },
      boxShadow: {
        glow: '0 20px 50px rgba(255,255,255,0.08)',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(180deg, rgba(15,23,42,0.96) 0%, rgba(15,23,42,0.85) 100%)',
      },
    },
  },
  plugins: [],
};
