import { useApp } from '../store/AppContext';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';
import { Clock } from 'lucide-react';

export function RecentlyViewed({ excludeId }: { excludeId?: string }) {
  const { recentlyViewed } = useApp();

  const products = recentlyViewed
    .filter(id => id !== excludeId)
    .map(id => PRODUCTS.find(p => p.id === id))
    .filter(Boolean) as typeof PRODUCTS;

  if (products.length === 0) return null;

  return (
    <section style={{ background: '#f5f5f7', padding: '64px 0' }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex items-center gap-2 mb-8">
          <Clock size={18} style={{ color: '#6e6e73' }} />
          <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#1d1d1f', letterSpacing: '-0.02em' }}>
            Recently Viewed
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.slice(0, 4).map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
