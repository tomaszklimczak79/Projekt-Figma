import { useState } from 'react';
import { Link, useNavigate } from '../router';
import { Search } from 'lucide-react';

const CATEGORIES = [
  { label: 'MacBooks', to: '/shop/macbook', emoji: '💻' },
  { label: 'iPhones', to: '/shop/iphone', emoji: '📱' },
  { label: 'iPads', to: '/shop/ipad', emoji: '📲' },
  { label: 'Apple Watch', to: '/shop/watch', emoji: '⌚' },
];

export function NotFoundPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) navigate(`/shop?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <div style={{ paddingTop: '56px', background: '#fff', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="text-center px-6 max-w-lg mx-auto">
        <div style={{ fontSize: '7rem', fontWeight: 700, color: '#f0f0f0', lineHeight: 1, letterSpacing: '-0.05em' }}>404</div>
        <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#1d1d1f', letterSpacing: '-0.02em', marginTop: '-12px', marginBottom: '10px' }}>Page not found</div>
        <p style={{ fontSize: '16px', color: '#6e6e73', marginBottom: '28px', lineHeight: 1.6 }}>The page you're looking for doesn't exist or has been moved.</p>

        <form onSubmit={handleSearch} className="flex gap-2 mb-8">
          <div className="flex-1 flex items-center gap-2 px-4 py-3 rounded-full" style={{ background: '#f5f5f7', border: '1.5px solid transparent' }}>
            <Search size={16} style={{ color: '#6e6e73', flexShrink: 0 }} />
            <input
              type="text"
              placeholder="Search products…"
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="flex-1 outline-none bg-transparent"
              style={{ fontSize: '15px', color: '#1d1d1f' }}
            />
          </div>
          <button type="submit" className="px-5 py-3 rounded-full" style={{ background: '#0071e3', color: '#fff', fontSize: '15px', fontWeight: 500 }}>
            Search
          </button>
        </form>

        <div style={{ fontSize: '13px', color: '#6e6e73', marginBottom: '12px' }}>Or browse a category:</div>
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {CATEGORIES.map(c => (
            <Link key={c.to} to={c.to} className="flex items-center gap-2 px-4 py-2 rounded-full" style={{ background: '#f5f5f7', color: '#1d1d1f', fontSize: '14px' }}>
              {c.emoji} {c.label}
            </Link>
          ))}
        </div>

        <Link to="/" className="px-6 py-3 rounded-full" style={{ background: '#1d1d1f', color: '#fff', fontSize: '15px', fontWeight: 500 }}>
          Back to Home
        </Link>
      </div>
    </div>
  );
}
