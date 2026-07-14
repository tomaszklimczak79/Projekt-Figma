import { useState } from 'react';
import { Link } from '../router';
import { Heart, ShoppingBag, GitCompare } from 'lucide-react';
import { motion } from 'motion/react';
import type { Product } from '../data/products';
import { CONDITION_LABELS, CONDITION_STYLES, savingsPercent } from '../data/products';
import { useApp } from '../store/AppContext';

interface Props {
  product: Product;
  index?: number;
  showCompare?: boolean;
}

export function ProductCard({ product, index = 0, showCompare = true }: Props) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const { toggleWishlist, isInWishlist, addToCart, toggleCompare, isInCompare } = useApp();
  const liked = isInWishlist(product.id);
  const inCompare = isInCompare(product.id);
  const savings = savingsPercent(product.price, product.originalPrice);
  const badge = CONDITION_STYLES[product.condition];
  const label = CONDITION_LABELS[product.condition];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group relative rounded-2xl overflow-hidden cursor-pointer"
      style={{
        background: '#fff',
        border: '1px solid rgba(0,0,0,0.07)',
        boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
        transition: 'box-shadow 0.3s ease, transform 0.3s ease',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 40px rgba(0,0,0,0.1)';
        (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 12px rgba(0,0,0,0.04)';
        (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
      }}
    >
      {/* Image */}
      <Link to={`/product/${product.id}`} className="block relative overflow-hidden" style={{ background: '#f5f5f7', aspectRatio: '4/3' }}>
        <img
          src={product.images[0]}
          alt={product.shortName}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          style={{ opacity: imgLoaded ? 1 : 0, transition: 'opacity 0.3s, transform 0.5s' }}
          onLoad={() => setImgLoaded(true)}
        />
        {!imgLoaded && <div className="absolute inset-0" style={{ background: '#ececec' }} />}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-1.5">
          <span className="px-2.5 py-1 rounded-full" style={{ ...badge, fontSize: '11px', fontWeight: 600 }}>
            {label}
          </span>
          {product.badge && product.badge !== label && (
            <span className="px-2 py-1 rounded-full" style={{ background: '#1d1d1f', color: '#fff', fontSize: '11px', fontWeight: 600 }}>
              {product.badge}
            </span>
          )}
        </div>
        <span className="absolute top-3 right-10 px-2 py-1 rounded-full" style={{ background: 'rgba(0,0,0,0.65)', color: '#fff', fontSize: '11px', fontWeight: 700 }}>
          -{savings}%
        </span>

        {/* Wishlist */}
        <button
          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-all"
          style={{ background: 'rgba(255,255,255,0.9)' }}
          onClick={(e) => { e.preventDefault(); toggleWishlist(product.id); }}
        >
          <Heart size={14} fill={liked ? '#e53e3e' : 'none'} style={{ color: liked ? '#e53e3e' : '#6e6e73' }} />
        </button>
      </Link>

      {/* Info */}
      <div className="p-4">
        <Link to={`/product/${product.id}`} className="block">
          <div style={{ fontSize: '12px', color: '#6e6e73', marginBottom: '2px' }}>
            {[product.chip, product.ram ? `${product.ram}GB` : '', product.storage ? `${product.storage}GB` : ''].filter(Boolean).join(' · ')}
          </div>
          <div style={{ fontSize: '15px', fontWeight: 600, color: '#1d1d1f', letterSpacing: '-0.01em', lineHeight: 1.3 }}>
            {product.shortName}
          </div>

          {product.batteryHealth && (
            <div className="flex items-center gap-1.5 mt-2">
              <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: '#ececec' }}>
                <div className="h-full rounded-full" style={{ width: `${product.batteryHealth}%`, background: product.batteryHealth >= 90 ? '#34c759' : product.batteryHealth >= 80 ? '#f59e0b' : '#ef4444' }} />
              </div>
              <span style={{ fontSize: '11px', color: '#6e6e73' }}>🔋 {product.batteryHealth}%</span>
            </div>
          )}
        </Link>

        <div className="flex items-end justify-between mt-3">
          <div>
            <div style={{ fontSize: '19px', fontWeight: 700, color: '#1d1d1f', letterSpacing: '-0.02em' }}>
              ${product.price.toLocaleString()}
            </div>
            <div style={{ fontSize: '12px', color: '#6e6e73', textDecoration: 'line-through' }}>
              ${product.originalPrice.toLocaleString()}
            </div>
          </div>
          {product.inStock ? (
            <button
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full transition-all duration-200"
              style={{ background: '#0071e3', color: '#fff', fontSize: '13px', fontWeight: 500 }}
              onClick={() => addToCart(product)}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = '#0077ed')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = '#0071e3')}
            >
              <ShoppingBag size={13} /> Add
            </button>
          ) : (
            <span className="px-3.5 py-2 rounded-full" style={{ background: '#f5f5f7', color: '#6e6e73', fontSize: '13px', fontWeight: 500 }}>
              Sold Out
            </span>
          )}
        </div>

        {showCompare && (
          <button
            className="flex items-center gap-1.5 mt-2 w-full py-1.5 rounded-xl justify-center transition-colors"
            style={{ background: inCompare ? '#f0f7ff' : '#f5f5f7', color: inCompare ? '#0071e3' : '#6e6e73', fontSize: '12px' }}
            onClick={() => toggleCompare(product.id)}
          >
            <GitCompare size={12} />
            {inCompare ? 'Remove from compare' : 'Add to compare'}
          </button>
        )}
      </div>
    </motion.div>
  );
}
