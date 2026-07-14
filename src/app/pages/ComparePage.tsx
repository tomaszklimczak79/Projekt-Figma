import { Link, useNavigate } from '../router';
import { useApp } from '../store/AppContext';
import { PRODUCTS, CONDITION_LABELS, CONDITION_STYLES, savingsPercent } from '../data/products';
import { X, ShoppingBag, Check, BatteryCharging, GitCompare } from 'lucide-react';

const COMPARE_SPECS = ['Chip', 'RAM', 'Storage', 'Display', 'Battery Health', 'Battery Cycles', 'Condition', 'Category', 'In Stock'];

export function ComparePage() {
  const { compareList, toggleCompare, addToCart } = useApp();
  const navigate = useNavigate();

  const products = compareList
    .map(id => PRODUCTS.find(p => p.id === id))
    .filter(Boolean) as typeof PRODUCTS;

  if (products.length === 0) {
    return (
      <div style={{ paddingTop: '56px', background: '#f5f5f7', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="text-center px-6">
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-5" style={{ background: '#fff' }}>
            <GitCompare size={36} style={{ color: '#6e6e73' }} />
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#1d1d1f', letterSpacing: '-0.025em', marginBottom: '10px' }}>No products to compare</h1>
          <p style={{ fontSize: '16px', color: '#6e6e73', marginBottom: '24px' }}>Add up to 3 products using the compare button on any product card.</p>
          <Link to="/shop" className="px-6 py-3 rounded-full" style={{ background: '#0071e3', color: '#fff', fontSize: '15px', fontWeight: 500 }}>
            Browse Shop
          </Link>
        </div>
      </div>
    );
  }

  const getVal = (p: typeof PRODUCTS[0], spec: string): string => {
    switch (spec) {
      case 'Chip': return p.chip;
      case 'RAM': return p.ram ? `${p.ram}GB` : '—';
      case 'Storage': return p.storage ? `${p.storage}GB` : '—';
      case 'Display': return `${p.screenSize}"`;
      case 'Battery Health': return p.batteryHealth ? `${p.batteryHealth}%` : '—';
      case 'Battery Cycles': return p.batteryCycles ? `${p.batteryCycles}` : '—';
      case 'Condition': return CONDITION_LABELS[p.condition];
      case 'Category': return p.category.charAt(0).toUpperCase() + p.category.slice(1);
      case 'In Stock': return p.inStock ? 'Yes' : 'No';
      default: return '—';
    }
  };

  return (
    <div style={{ paddingTop: '56px', background: '#f5f5f7', minHeight: '100vh' }}>
      <div className="max-w-[1100px] mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#1d1d1f', letterSpacing: '-0.025em' }}>Compare Products</h1>
          <Link to="/shop" style={{ fontSize: '14px', color: '#0071e3' }}>← Back to shop</Link>
        </div>

        <div className="overflow-x-auto">
          <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0 }}>
            {/* Product header row */}
            <thead>
              <tr>
                <th style={{ width: '180px', padding: '0 12px 24px 0', verticalAlign: 'bottom' }}>
                  <span style={{ fontSize: '12px', color: '#6e6e73', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    Comparing {products.length} product{products.length > 1 ? 's' : ''}
                  </span>
                </th>
                {products.map(p => {
                  const badge = CONDITION_STYLES[p.condition];
                  const label = CONDITION_LABELS[p.condition];
                  const savings = savingsPercent(p.price, p.originalPrice);
                  return (
                    <th key={p.id} style={{ padding: '0 12px 24px', verticalAlign: 'top', minWidth: '220px' }}>
                      <div className="rounded-2xl overflow-hidden" style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.07)' }}>
                        <div className="relative" style={{ background: '#f5f5f7', aspectRatio: '4/3' }}>
                          <img src={p.images[0]} alt={p.shortName} className="w-full h-full object-cover" />
                          <button
                            className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center"
                            style={{ background: 'rgba(255,255,255,0.9)' }}
                            onClick={() => toggleCompare(p.id)}
                          >
                            <X size={13} style={{ color: '#1d1d1f' }} />
                          </button>
                        </div>
                        <div className="p-4">
                          <span className="inline-flex px-2 py-0.5 rounded-full mb-2" style={{ ...badge, fontSize: '11px', fontWeight: 600 }}>{label}</span>
                          <div style={{ fontSize: '14px', fontWeight: 600, color: '#1d1d1f', lineHeight: 1.3, marginBottom: '8px' }}>{p.shortName}</div>
                          <div className="flex items-end gap-2 mb-3">
                            <span style={{ fontSize: '20px', fontWeight: 700, color: '#1d1d1f' }}>${p.price.toLocaleString()}</span>
                            <span style={{ fontSize: '13px', color: '#6e6e73', textDecoration: 'line-through' }}>${p.originalPrice.toLocaleString()}</span>
                            <span style={{ fontSize: '12px', color: '#1a7f37', fontWeight: 600 }}>-{savings}%</span>
                          </div>
                          <button
                            className="w-full py-2.5 rounded-full flex items-center justify-center gap-1.5"
                            style={{ background: p.inStock ? '#0071e3' : '#e5e5e5', color: p.inStock ? '#fff' : '#6e6e73', fontSize: '13px', fontWeight: 500 }}
                            onClick={() => { if (p.inStock) { addToCart(p); navigate('/cart'); } }}
                            disabled={!p.inStock}
                          >
                            <ShoppingBag size={13} />
                            {p.inStock ? 'Add to Cart' : 'Sold Out'}
                          </button>
                        </div>
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>

            {/* Spec rows */}
            <tbody>
              {COMPARE_SPECS.map((spec, si) => (
                <tr key={spec} style={{ background: si % 2 === 0 ? 'transparent' : 'rgba(0,0,0,0.02)' }}>
                  <td style={{ padding: '14px 12px 14px 0', fontSize: '13px', color: '#6e6e73', verticalAlign: 'middle' }}>
                    {spec === 'Battery Health' && <BatteryCharging size={12} style={{ display: 'inline', marginRight: '4px', color: '#1a7f37' }} />}
                    {spec}
                  </td>
                  {products.map(p => {
                    const val = getVal(p, spec);
                    const isGood = spec === 'In Stock' && val === 'Yes';
                    const isBad = spec === 'In Stock' && val === 'No';
                    return (
                      <td key={p.id} style={{ padding: '14px 12px', fontSize: '14px', color: isGood ? '#1a7f37' : isBad ? '#e53e3e' : '#1d1d1f', fontWeight: 500, verticalAlign: 'middle' }}>
                        {isGood ? <><Check size={13} style={{ display: 'inline', marginRight: '4px' }} />In Stock</> : val}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
