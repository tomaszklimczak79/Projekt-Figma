import { useState } from 'react';
import { Link } from '../router';
import { Minus, Plus, Trash2, Tag, ArrowRight, ShoppingBag, Shield, Truck, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../store/AppContext';
import { PRODUCTS, CONDITION_LABELS } from '../data/products';
import { ProductCard } from '../components/ProductCard';

const COUPONS: Record<string, number> = {
  'SAVE10': 0.10,
  'OUTLET15': 0.15,
  'WELCOME20': 0.20,
};

export function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useApp();
  const [coupon, setCoupon] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponError, setCouponError] = useState('');

  const discount = appliedCoupon ? COUPONS[appliedCoupon] : 0;
  const discountAmount = cartTotal * discount;
  const shipping = cartTotal > 500 ? 0 : 29;
  const total = cartTotal - discountAmount + shipping;

  const handleApplyCoupon = () => {
    const code = coupon.trim().toUpperCase();
    if (COUPONS[code]) {
      setAppliedCoupon(code);
      setCouponError('');
    } else {
      setCouponError('Invalid coupon code');
    }
  };

  const recommended = PRODUCTS.filter(p => !cart.some(c => c.product.id === p.id) && p.featured).slice(0, 4);

  return (
    <div style={{ paddingTop: '56px', background: '#f5f5f7', minHeight: '100vh' }}>
      <div className="max-w-[1200px] mx-auto px-6 py-10">
        <h1 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 700, color: '#1d1d1f', letterSpacing: '-0.025em', marginBottom: '32px' }}>
          Shopping Cart {cart.length > 0 && <span style={{ fontSize: '1.2rem', color: '#6e6e73', fontWeight: 400 }}>({cart.length} {cart.length === 1 ? 'item' : 'items'})</span>}
        </h1>

        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-20 h-20 rounded-3xl flex items-center justify-center mb-6" style={{ background: '#fff' }}>
              <ShoppingBag size={36} style={{ color: '#6e6e73' }} />
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1d1d1f', marginBottom: '8px' }}>Your cart is empty</h2>
            <p style={{ fontSize: '16px', color: '#6e6e73', marginBottom: '24px' }}>Browse our certified pre-owned Apple devices</p>
            <Link to="/shop" className="px-6 py-3 rounded-full" style={{ background: '#0071e3', color: '#fff', fontSize: '16px', fontWeight: 500 }}>
              Shop Now
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cart items */}
            <div className="lg:col-span-2 flex flex-col gap-3">
              <AnimatePresence>
                {cart.map(({ product, quantity }) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20, height: 0 }}
                    className="flex gap-4 p-5 rounded-2xl"
                    style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.06)' }}
                  >
                    <Link to={`/product/${product.id}`} className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0" style={{ background: '#f5f5f7' }}>
                      <img src={product.images[0]} alt={product.shortName} className="w-full h-full object-cover" />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <span className="inline-block px-2 py-0.5 rounded-full mb-1" style={{ fontSize: '11px', fontWeight: 600, background: '#f5f5f7', color: '#6e6e73' }}>
                            {CONDITION_LABELS[product.condition]}
                          </span>
                          <Link to={`/product/${product.id}`}>
                            <div style={{ fontSize: '16px', fontWeight: 600, color: '#1d1d1f', letterSpacing: '-0.01em' }}>{product.shortName}</div>
                          </Link>
                          <div style={{ fontSize: '13px', color: '#6e6e73' }}>
                            {[product.chip, product.ram ? `${product.ram}GB` : '', product.storage ? `${product.storage}GB` : '', product.color].filter(Boolean).join(' · ')}
                          </div>
                        </div>
                        <button onClick={() => removeFromCart(product.id)} className="w-8 h-8 rounded-full flex items-center justify-center transition-colors flex-shrink-0" style={{ color: '#6e6e73' }}
                          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = '#fff3f3')}
                          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'transparent')}>
                          <Trash2 size={15} />
                        </button>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-1 rounded-full overflow-hidden" style={{ background: '#f5f5f7' }}>
                          <button onClick={() => updateQuantity(product.id, quantity - 1)} className="w-8 h-8 flex items-center justify-center">
                            {quantity === 1 ? <Trash2 size={13} style={{ color: '#e53e3e' }} /> : <Minus size={13} style={{ color: '#1d1d1f' }} />}
                          </button>
                          <span style={{ fontSize: '14px', fontWeight: 600, minWidth: '24px', textAlign: 'center', color: '#1d1d1f' }}>{quantity}</span>
                          <button onClick={() => updateQuantity(product.id, quantity + 1)} className="w-8 h-8 flex items-center justify-center">
                            <Plus size={13} style={{ color: '#1d1d1f' }} />
                          </button>
                        </div>
                        <div className="text-right">
                          <div style={{ fontSize: '18px', fontWeight: 700, color: '#1d1d1f' }}>${(product.price * quantity).toLocaleString()}</div>
                          {quantity > 1 && <div style={{ fontSize: '12px', color: '#6e6e73' }}>${product.price.toLocaleString()} each</div>}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Trust bar */}
              <div className="flex gap-4 p-4 rounded-2xl mt-2 flex-wrap" style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.06)' }}>
                {[
                  { icon: Shield, text: '12-Month Warranty' },
                  { icon: Truck, text: 'Free Shipping over $500' },
                  { icon: RotateCcw, text: '14-Day Returns' },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2">
                    <Icon size={15} style={{ color: '#0071e3' }} />
                    <span style={{ fontSize: '13px', color: '#6e6e73' }}>{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Order summary */}
            <div className="flex flex-col gap-4">
              <div className="p-6 rounded-2xl" style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.06)' }}>
                <h2 style={{ fontSize: '17px', fontWeight: 700, color: '#1d1d1f', marginBottom: '16px' }}>Order Summary</h2>

                <div className="flex flex-col gap-3 mb-4">
                  <div className="flex justify-between">
                    <span style={{ fontSize: '14px', color: '#6e6e73' }}>Subtotal</span>
                    <span style={{ fontSize: '14px', color: '#1d1d1f' }}>${cartTotal.toLocaleString()}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between">
                      <span style={{ fontSize: '14px', color: '#1a7f37' }}>Coupon ({appliedCoupon})</span>
                      <span style={{ fontSize: '14px', color: '#1a7f37' }}>-${discountAmount.toFixed(0)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span style={{ fontSize: '14px', color: '#6e6e73' }}>Shipping</span>
                    <span style={{ fontSize: '14px', color: shipping === 0 ? '#1a7f37' : '#1d1d1f' }}>{shipping === 0 ? 'Free' : `$${shipping}`}</span>
                  </div>
                  <div className="border-t pt-3" style={{ borderColor: 'rgba(0,0,0,0.07)' }}>
                    <div className="flex justify-between">
                      <span style={{ fontSize: '16px', fontWeight: 700, color: '#1d1d1f' }}>Total</span>
                      <span style={{ fontSize: '20px', fontWeight: 700, color: '#1d1d1f' }}>${total.toFixed(0)}</span>
                    </div>
                  </div>
                </div>

                {/* Coupon */}
                {!appliedCoupon ? (
                  <div className="mb-4">
                    <div className="flex gap-2">
                      <div className="flex-1 relative">
                        <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#6e6e73' }} />
                        <input
                          value={coupon}
                          onChange={e => { setCoupon(e.target.value); setCouponError(''); }}
                          placeholder="Coupon code"
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl outline-none"
                          style={{ background: '#f5f5f7', fontSize: '14px', color: '#1d1d1f', border: couponError ? '1.5px solid #e53e3e' : '1.5px solid transparent' }}
                        />
                      </div>
                      <button onClick={handleApplyCoupon} className="px-4 py-2.5 rounded-xl" style={{ background: '#f5f5f7', color: '#1d1d1f', fontSize: '14px', fontWeight: 500 }}>
                        Apply
                      </button>
                    </div>
                    {couponError && <p style={{ fontSize: '12px', color: '#e53e3e', marginTop: '4px' }}>{couponError}</p>}
                    <p style={{ fontSize: '12px', color: '#6e6e73', marginTop: '6px' }}>Try: SAVE10, OUTLET15, WELCOME20</p>
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-3 rounded-xl mb-4" style={{ background: '#f0fff4' }}>
                    <div className="flex items-center gap-2">
                      <Tag size={14} style={{ color: '#1a7f37' }} />
                      <span style={{ fontSize: '13px', color: '#1a7f37', fontWeight: 500 }}>{appliedCoupon} ({(discount * 100).toFixed(0)}% off)</span>
                    </div>
                    <button onClick={() => setAppliedCoupon(null)} style={{ fontSize: '12px', color: '#6e6e73' }}>Remove</button>
                  </div>
                )}

                <Link to="/checkout" className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full mb-3 transition-colors" style={{ background: '#0071e3', color: '#fff', fontSize: '16px', fontWeight: 500 }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = '#0077ed')}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = '#0071e3')}>
                  Proceed to Checkout <ArrowRight size={16} />
                </Link>
                <Link to="/shop" className="flex items-center justify-center w-full py-3 rounded-full" style={{ background: '#f5f5f7', color: '#1d1d1f', fontSize: '15px' }}>
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Recommendations */}
        {recommended.length > 0 && (
          <div className="mt-16">
            <h2 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#1d1d1f', letterSpacing: '-0.025em', marginBottom: '20px' }}>You might also like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {recommended.map((p, i) => <ProductCard key={p.id} product={p} index={i} showCompare={false} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
