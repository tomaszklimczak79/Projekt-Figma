import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from '../router';
import { ChevronRight, Heart, ShoppingBag, Zap, Shield, Truck, RotateCcw, Star, ChevronLeft, Check, BatteryCharging } from 'lucide-react';
import { motion } from 'motion/react';
import { getProductById, getRelatedProducts, savingsPercent, CONDITION_LABELS, CONDITION_STYLES } from '../data/products';
import { useApp } from '../store/AppContext';
import { ProductCard } from '../components/ProductCard';
import { RecentlyViewed } from '../components/RecentlyViewed';

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={13} fill={i < Math.round(rating) ? '#0071e3' : 'none'} style={{ color: i < Math.round(rating) ? '#0071e3' : '#d1d1d6' }} />
      ))}
    </div>
  );
}

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(id!);
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isInWishlist, addRecentlyViewed } = useApp();
  const [activeImg, setActiveImg] = useState(0);
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'warranty' | 'reviews'>('overview');
  const [qty, setQty] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    if (product) addRecentlyViewed(product.id);
  }, [product?.id]);

  if (!product) {
    return (
      <div className="pt-32 pb-16 text-center">
        <h1 style={{ fontSize: '2rem', color: '#1d1d1f' }}>Product not found</h1>
        <Link to="/shop" style={{ color: '#0071e3' }}>Back to shop</Link>
      </div>
    );
  }

  const savings = savingsPercent(product.price, product.originalPrice);
  const conditionStyle = CONDITION_STYLES[product.condition];
  const conditionLabel = CONDITION_LABELS[product.condition];
  const liked = isInWishlist(product.id);
  const related = getRelatedProducts(product);

  const handleAddToCart = () => {
    addToCart(product, qty);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2500);
  };

  return (
    <div style={{ paddingTop: '56px', background: '#fff' }}>
      {/* Breadcrumb */}
      <div style={{ background: '#f5f5f7', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
        <div className="max-w-[1200px] mx-auto px-6 py-3 flex items-center gap-2">
          <Link to="/" style={{ fontSize: '13px', color: '#6e6e73' }}>Home</Link>
          <ChevronRight size={12} style={{ color: '#6e6e73' }} />
          <Link to="/shop" style={{ fontSize: '13px', color: '#6e6e73' }}>Shop</Link>
          <ChevronRight size={12} style={{ color: '#6e6e73' }} />
          <Link to={`/shop/${product.category}`} style={{ fontSize: '13px', color: '#6e6e73' }}>
            {product.category.charAt(0).toUpperCase() + product.category.slice(1)}s
          </Link>
          <ChevronRight size={12} style={{ color: '#6e6e73' }} />
          <span style={{ fontSize: '13px', color: '#1d1d1f' }}>{product.shortName}</span>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-[1200px] mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Gallery */}
          <div className="sticky top-20">
            <motion.div
              key={activeImg}
              initial={{ opacity: 0.6, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              className="relative rounded-3xl overflow-hidden mb-3"
              style={{ background: '#f5f5f7', aspectRatio: '4/3' }}
            >
              <img src={product.images[activeImg]} alt={product.shortName} className="w-full h-full object-cover" />
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="px-2.5 py-1 rounded-full" style={{ ...conditionStyle, fontSize: '12px', fontWeight: 600 }}>{conditionLabel}</span>
                <span className="px-2.5 py-1 rounded-full" style={{ background: '#1d1d1f', color: '#fff', fontSize: '12px', fontWeight: 700 }}>-{savings}%</span>
              </div>
              {product.images.length > 1 && (
                <>
                  <button className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.9)' }} onClick={() => setActiveImg((activeImg - 1 + product.images.length) % product.images.length)}>
                    <ChevronLeft size={16} />
                  </button>
                  <button className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.9)' }} onClick={() => setActiveImg((activeImg + 1) % product.images.length)}>
                    <ChevronRight size={16} />
                  </button>
                </>
              )}
            </motion.div>
            <div className="flex gap-2">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className="w-16 h-12 rounded-xl overflow-hidden transition-all"
                  style={{
                    border: i === activeImg ? '2px solid #0071e3' : '2px solid transparent',
                    background: '#f5f5f7',
                    opacity: i === activeImg ? 1 : 0.65,
                  }}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product info */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-1 rounded-full" style={{ ...conditionStyle, fontSize: '12px', fontWeight: 600 }}>{conditionLabel}</span>
              {product.inStock ? (
                <span className="px-2.5 py-1 rounded-full" style={{ background: '#f0fff4', color: '#1a7f37', fontSize: '12px', fontWeight: 600 }}>✓ In Stock</span>
              ) : (
                <span className="px-2.5 py-1 rounded-full" style={{ background: '#fff3f3', color: '#e53e3e', fontSize: '12px', fontWeight: 600 }}>Out of Stock</span>
              )}
            </div>

            <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 700, color: '#1d1d1f', letterSpacing: '-0.025em', lineHeight: 1.2, marginBottom: '8px' }}>
              {product.name}
            </h1>

            <div className="flex items-center gap-3 mb-5">
              <Stars rating={product.rating} />
              <span style={{ fontSize: '14px', color: '#6e6e73' }}>{product.rating} ({product.reviewCount} reviews)</span>
            </div>

            {/* Price */}
            <div className="p-5 rounded-2xl mb-5" style={{ background: '#f5f5f7' }}>
              <div className="flex items-end gap-3 mb-2">
                <span style={{ fontSize: '2.4rem', fontWeight: 700, color: '#1d1d1f', letterSpacing: '-0.03em', lineHeight: 1 }}>
                  ${product.price.toLocaleString()}
                </span>
                <div>
                  <div style={{ fontSize: '15px', color: '#6e6e73', textDecoration: 'line-through' }}>${product.originalPrice.toLocaleString()}</div>
                  <div style={{ fontSize: '13px', color: '#1a7f37', fontWeight: 600 }}>You save ${(product.originalPrice - product.price).toLocaleString()} ({savings}%)</div>
                </div>
              </div>
              <div style={{ fontSize: '13px', color: '#6e6e73' }}>or from ${Math.round(product.price / 12)}/mo with 0% financing over 12 months</div>
            </div>

            {/* Battery health */}
            {product.batteryHealth && (
              <div className="p-4 rounded-2xl mb-5" style={{ background: '#f0fff4', border: '1px solid #bbf7d0' }}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <BatteryCharging size={16} style={{ color: '#1a7f37' }} />
                    <span style={{ fontSize: '14px', fontWeight: 600, color: '#1a7f37' }}>Battery Health: {product.batteryHealth}%</span>
                  </div>
                  <span style={{ fontSize: '12px', color: '#6e6e73' }}>{product.batteryCycles} cycles</span>
                </div>
                <div className="w-full h-2 rounded-full" style={{ background: '#d1fae5' }}>
                  <div className="h-full rounded-full" style={{ width: `${product.batteryHealth}%`, background: '#1a7f37' }} />
                </div>
                <div style={{ fontSize: '12px', color: '#6e6e73', marginTop: '6px' }}>
                  {product.batteryHealth >= 90 ? 'Excellent battery condition — like a new battery' : product.batteryHealth >= 80 ? 'Good battery health — typical for light usage' : 'Moderate wear — consider replacement within a year'}
                </div>
              </div>
            )}

            {/* Quick specs */}
            <div className="grid grid-cols-2 gap-2 mb-5">
              {product.specs.slice(0, 4).map(spec => (
                <div key={spec.label} className="p-3 rounded-xl" style={{ background: '#f5f5f7' }}>
                  <div style={{ fontSize: '11px', color: '#6e6e73', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '2px' }}>{spec.label}</div>
                  <div style={{ fontSize: '13px', fontWeight: 500, color: '#1d1d1f' }}>{spec.value}</div>
                </div>
              ))}
            </div>

            {/* Quantity + CTA */}
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center gap-2 px-3 py-2 rounded-full" style={{ background: '#f5f5f7' }}>
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-6 h-6 flex items-center justify-center rounded-full transition-colors" style={{ background: qty === 1 ? '#ececec' : '#fff' }}>
                  <span style={{ fontSize: '18px', color: '#1d1d1f', lineHeight: 1 }}>−</span>
                </button>
                <span style={{ fontSize: '15px', fontWeight: 600, color: '#1d1d1f', minWidth: '24px', textAlign: 'center' }}>{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="w-6 h-6 flex items-center justify-center rounded-full" style={{ background: '#fff' }}>
                  <span style={{ fontSize: '18px', color: '#1d1d1f', lineHeight: 1 }}>+</span>
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full transition-all duration-200"
                style={{ background: addedToCart ? '#1a7f37' : '#0071e3', color: '#fff', fontSize: '16px', fontWeight: 500 }}
              >
                {addedToCart ? <><Check size={16} /> Added!</> : <><ShoppingBag size={16} /> Add to Cart</>}
              </button>

              <button
                className="w-12 h-12 rounded-full flex items-center justify-center transition-colors"
                style={{ background: liked ? '#fff3f3' : '#f5f5f7' }}
                onClick={() => toggleWishlist(product.id)}
              >
                <Heart size={18} fill={liked ? '#e53e3e' : 'none'} style={{ color: liked ? '#e53e3e' : '#6e6e73' }} />
              </button>
            </div>

            <button
              className="w-full py-3.5 rounded-full mb-5 transition-colors"
              style={{ background: '#1d1d1f', color: '#fff', fontSize: '16px', fontWeight: 500 }}
              onClick={() => { addToCart(product, qty); navigate('/checkout'); }}
            >
              <Zap size={15} style={{ display: 'inline', marginRight: '6px' }} />Buy Now
            </button>

            {/* Trust icons */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Shield, text: '12-Month Warranty' },
                { icon: Truck, text: 'Free Shipping' },
                { icon: RotateCcw, text: '14-Day Returns' },
                { icon: Check, text: 'Authenticity Verified' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 p-3 rounded-xl" style={{ background: '#f5f5f7' }}>
                  <Icon size={15} style={{ color: '#0071e3', flexShrink: 0 }} />
                  <span style={{ fontSize: '13px', color: '#1d1d1f' }}>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-16">
          <div className="flex gap-1 p-1 rounded-2xl w-fit mb-8" style={{ background: '#f5f5f7' }}>
            {(['overview', 'specs', 'warranty', 'reviews'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-5 py-2.5 rounded-xl capitalize transition-all"
                style={{
                  background: activeTab === tab ? '#fff' : 'transparent',
                  color: activeTab === tab ? '#1d1d1f' : '#6e6e73',
                  fontSize: '15px',
                  fontWeight: activeTab === tab ? 600 : 400,
                  boxShadow: activeTab === tab ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
                }}
              >
                {tab === 'reviews' ? `Reviews (${product.reviewCount})` : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#1d1d1f', marginBottom: '12px' }}>About this device</h3>
                <p style={{ fontSize: '16px', color: '#6e6e73', lineHeight: 1.7 }}>{product.description}</p>
                <div className="mt-6 p-5 rounded-2xl" style={{ background: '#f5f5f7' }}>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#1d1d1f', marginBottom: '8px' }}>What's included</div>
                  {(['Device', ...(product.condition === 'open-box' ? ['Original charger', 'All original accessories', 'Original packaging'] : ['Compatible charger']), '12-month warranty certificate', 'Condition report']).map(item => (
                    <div key={item} className="flex items-center gap-2 py-1.5">
                      <Check size={13} style={{ color: '#1a7f37' }} />
                      <span style={{ fontSize: '14px', color: '#6e6e73' }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-5 rounded-2xl" style={{ background: '#f5f5f7' }}>
                <div style={{ fontSize: '14px', fontWeight: 600, color: '#1d1d1f', marginBottom: '12px' }}>Condition Report</div>
                {[
                  { label: 'Display', status: 'Perfect', ok: true },
                  { label: 'Keyboard', status: 'Perfect', ok: true },
                  { label: 'Trackpad', status: 'Perfect', ok: true },
                  { label: 'Ports', status: 'All functional', ok: true },
                  { label: 'Camera', status: 'Perfect', ok: true },
                  { label: 'Speakers', status: 'Perfect', ok: true },
                  { label: 'Battery', status: product.batteryHealth ? `${product.batteryHealth}% health` : 'N/A', ok: true },
                  { label: 'Cosmetic', status: product.condition === 'open-box' || product.condition === 'like-new' ? 'No marks' : 'Minor marks', ok: product.condition !== 'good' },
                ].map(item => (
                  <div key={item.label} className="flex items-center justify-between py-2" style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                    <span style={{ fontSize: '14px', color: '#6e6e73' }}>{item.label}</span>
                    <span className="flex items-center gap-1.5" style={{ fontSize: '13px', color: item.ok ? '#1a7f37' : '#d97706', fontWeight: 500 }}>
                      {item.ok ? <Check size={13} /> : null}
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(0,0,0,0.08)' }}>
              {product.specs.map((spec, i) => (
                <div key={spec.label} className="flex items-center py-4 px-6 gap-6" style={{ background: i % 2 === 0 ? '#fff' : '#fafafa', borderBottom: i < product.specs.length - 1 ? '1px solid rgba(0,0,0,0.06)' : 'none' }}>
                  <div style={{ fontSize: '14px', color: '#6e6e73', minWidth: '160px', flexShrink: 0 }}>{spec.label}</div>
                  <div style={{ fontSize: '14px', color: '#1d1d1f', fontWeight: 500 }}>{spec.value}</div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'warranty' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: '12-Month Hardware Warranty', desc: 'Full coverage for hardware defects and failures. We repair or replace at no cost.', icon: Shield },
                { title: '14-Day Return Policy', desc: 'Not satisfied? Return within 14 days for a full refund. No questions asked.', icon: RotateCcw },
                { title: 'Free Technical Support', desc: 'Our Apple-certified technicians are available Mon–Fri, 9am–6pm to help.', icon: Check },
                { title: 'Battery Health Guarantee', desc: `We guarantee battery health is ${product.batteryHealth || 85}% or better at delivery.`, icon: BatteryCharging },
              ].map(({ title, desc, icon: Icon }) => (
                <div key={title} className="p-6 rounded-2xl" style={{ background: '#f5f5f7' }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: '#f0f7ff' }}>
                    <Icon size={18} style={{ color: '#0071e3' }} />
                  </div>
                  <div style={{ fontSize: '16px', fontWeight: 600, color: '#1d1d1f', marginBottom: '8px' }}>{title}</div>
                  <div style={{ fontSize: '14px', color: '#6e6e73', lineHeight: 1.6 }}>{desc}</div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div>
              <div className="flex items-center gap-6 mb-8 p-6 rounded-2xl" style={{ background: '#f5f5f7' }}>
                <div className="text-center">
                  <div style={{ fontSize: '3.5rem', fontWeight: 700, color: '#1d1d1f', letterSpacing: '-0.04em', lineHeight: 1 }}>{product.rating}</div>
                  <Stars rating={product.rating} />
                  <div style={{ fontSize: '13px', color: '#6e6e73', marginTop: '4px' }}>{product.reviewCount} reviews</div>
                </div>
                <div className="flex-1">
                  {[5, 4, 3, 2, 1].map(n => {
                    const pct = n === 5 ? 78 : n === 4 ? 15 : n === 3 ? 5 : n === 2 ? 1 : 1;
                    return (
                      <div key={n} className="flex items-center gap-2 mb-1">
                        <span style={{ fontSize: '12px', color: '#6e6e73', width: '8px' }}>{n}</span>
                        <div className="flex-1 h-1.5 rounded-full" style={{ background: '#e5e5e5' }}>
                          <div className="h-full rounded-full" style={{ width: `${pct}%`, background: '#0071e3' }} />
                        </div>
                        <span style={{ fontSize: '12px', color: '#6e6e73', width: '28px' }}>{pct}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.reviews.map(review => (
                  <div key={review.id} className="p-5 rounded-2xl" style={{ border: '1px solid rgba(0,0,0,0.07)' }}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <img src={review.avatar} alt={review.author} className="w-9 h-9 rounded-full object-cover" />
                        <div>
                          <div style={{ fontSize: '14px', fontWeight: 600, color: '#1d1d1f' }}>{review.author}</div>
                          <div style={{ fontSize: '12px', color: '#6e6e73' }}>{review.location}</div>
                        </div>
                      </div>
                      <span style={{ fontSize: '12px', color: '#6e6e73' }}>{review.date}</span>
                    </div>
                    <Stars rating={review.rating} />
                    <div style={{ fontSize: '14px', fontWeight: 600, color: '#1d1d1f', margin: '8px 0 4px' }}>{review.title}</div>
                    <div style={{ fontSize: '14px', color: '#6e6e73', lineHeight: 1.6 }}>"{review.body}"</div>
                    {review.verified && <div className="mt-3 flex items-center gap-1.5"><Check size={12} style={{ color: '#1a7f37' }} /><span style={{ fontSize: '12px', color: '#1a7f37' }}>Verified purchase</span></div>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <RecentlyViewed excludeId={product.id} />

      {/* Related products */}
      {related.length > 0 && (
        <section style={{ background: '#f5f5f7', padding: '64px 0' }}>
          <div className="max-w-[1200px] mx-auto px-6">
            <h2 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#1d1d1f', letterSpacing: '-0.025em', marginBottom: '24px' }}>You might also like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
