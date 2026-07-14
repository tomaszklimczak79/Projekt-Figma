import { X, ArrowRight } from 'lucide-react';
import { useApp } from '../store/AppContext';
import { PRODUCTS } from '../data/products';
import { Link } from '../router';

export function CompareBar() {
  const { compareList, toggleCompare, clearCompare } = useApp();
  if (compareList.length === 0) return null;

  const products = compareList.map(id => PRODUCTS.find(p => p.id === id)!).filter(Boolean);

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40"
      style={{
        background: 'rgba(29,29,31,0.95)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(255,255,255,0.1)',
      }}
    >
      <div className="max-w-[1200px] mx-auto px-6 py-3 flex items-center gap-4 flex-wrap">
        <span style={{ fontSize: '14px', fontWeight: 500, color: 'rgba(255,255,255,0.7)', flexShrink: 0 }}>
          Compare ({compareList.length}/3)
        </span>
        <div className="flex gap-3 flex-1 flex-wrap">
          {products.map(p => (
            <div key={p.id} className="flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.1)' }}>
              <span style={{ fontSize: '13px', color: '#fff' }}>{p.shortName}</span>
              <button onClick={() => toggleCompare(p.id)}><X size={13} style={{ color: 'rgba(255,255,255,0.6)' }} /></button>
            </div>
          ))}
          {Array.from({ length: 3 - compareList.length }).map((_, i) => (
            <div key={i} className="flex items-center justify-center px-3 py-1.5 rounded-full" style={{ border: '1px dashed rgba(255,255,255,0.2)', minWidth: '100px' }}>
              <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.3)' }}>+ Add product</span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {compareList.length >= 2 && (
            <Link
              to={`/shop?compare=${compareList.join(',')}`}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full transition-colors"
              style={{ background: '#0071e3', color: '#fff', fontSize: '14px', fontWeight: 500 }}
            >
              Compare <ArrowRight size={14} />
            </Link>
          )}
          <button
            onClick={clearCompare}
            className="px-3 py-2 rounded-full transition-colors"
            style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)', fontSize: '13px' }}
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}
