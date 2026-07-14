import { Link } from '../router';
import { X, Plus, Minus, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';
import { useApp } from '../store/AppContext';
import { CONDITION_LABELS } from '../data/products';

export function CartDrawer() {
  const { cart, cartOpen, setCartOpen, removeFromCart, updateQuantity, cartTotal, cartCount } = useApp();

  return (
    <>
      {/* Backdrop */}
      {cartOpen && (
        <div
          className="fixed inset-0 z-50"
          style={{ background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(4px)' }}
          onClick={() => setCartOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className="fixed top-0 right-0 bottom-0 z-50 flex flex-col"
        style={{
          width: 'min(420px, 100vw)',
          background: '#fff',
          boxShadow: '-8px 0 40px rgba(0,0,0,0.12)',
          transform: cartOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.35s cubic-bezier(0.25,0.46,0.45,0.94)',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5" style={{ borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} style={{ color: '#1d1d1f' }} />
            <span style={{ fontSize: '17px', fontWeight: 600, color: '#1d1d1f' }}>
              Cart {cartCount > 0 && <span style={{ color: '#6e6e73', fontWeight: 400 }}>({cartCount})</span>}
            </span>
          </div>
          <button
            className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
            style={{ background: '#f5f5f7' }}
            onClick={() => setCartOpen(false)}
          >
            <X size={15} style={{ color: '#1d1d1f' }} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: '#f5f5f7' }}>
                <ShoppingBag size={28} style={{ color: '#6e6e73' }} />
              </div>
              <div>
                <div style={{ fontSize: '17px', fontWeight: 600, color: '#1d1d1f' }}>Your cart is empty</div>
                <div style={{ fontSize: '14px', color: '#6e6e73', marginTop: '4px' }}>Add some products to get started</div>
              </div>
              <button
                className="px-5 py-2.5 rounded-full transition-colors"
                style={{ background: '#0071e3', color: '#fff', fontSize: '15px' }}
                onClick={() => setCartOpen(false)}
              >
                Browse MacBooks
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {cart.map(({ product, quantity }) => (
                <div key={product.id} className="flex gap-3 p-3 rounded-2xl" style={{ border: '1px solid rgba(0,0,0,0.07)' }}>
                  <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0" style={{ background: '#f5f5f7' }}>
                    <img src={product.images[0]} alt={product.shortName} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div style={{ fontSize: '13px', color: '#6e6e73' }}>{CONDITION_LABELS[product.condition]}</div>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: '#1d1d1f', letterSpacing: '-0.01em' }} className="truncate">
                      {product.shortName}
                    </div>
                    <div style={{ fontSize: '13px', color: '#6e6e73' }}>{product.color}</div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1">
                        <button
                          className="w-6 h-6 rounded-full flex items-center justify-center transition-colors"
                          style={{ background: '#f5f5f7' }}
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                        >
                          {quantity === 1 ? <Trash2 size={11} style={{ color: '#e53e3e' }} /> : <Minus size={11} style={{ color: '#1d1d1f' }} />}
                        </button>
                        <span style={{ fontSize: '14px', fontWeight: 600, color: '#1d1d1f', minWidth: '20px', textAlign: 'center' }}>{quantity}</span>
                        <button
                          className="w-6 h-6 rounded-full flex items-center justify-center transition-colors"
                          style={{ background: '#f5f5f7' }}
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                        >
                          <Plus size={11} style={{ color: '#1d1d1f' }} />
                        </button>
                      </div>
                      <span style={{ fontSize: '15px', fontWeight: 700, color: '#1d1d1f' }}>
                        ${(product.price * quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="px-6 py-5" style={{ borderTop: '1px solid rgba(0,0,0,0.08)' }}>
            {/* Free shipping progress */}
            {cartTotal < 500 && (
              <div className="mb-4 p-3 rounded-xl" style={{ background: '#f0f7ff' }}>
                <div className="flex justify-between mb-1.5">
                  <span style={{ fontSize: '12px', color: '#0071e3' }}>
                    ${(500 - cartTotal).toLocaleString()} away from <strong>free shipping</strong>
                  </span>
                  <span style={{ fontSize: '12px', color: '#0071e3' }}>{Math.round((cartTotal / 500) * 100)}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full" style={{ background: '#bfdbfe' }}>
                  <div className="h-full rounded-full transition-all duration-500" style={{ width: `${Math.min(100, (cartTotal / 500) * 100)}%`, background: '#0071e3' }} />
                </div>
              </div>
            )}
            {cartTotal >= 500 && (
              <div className="mb-4 p-3 rounded-xl flex items-center gap-2" style={{ background: '#f0fff4' }}>
                <span style={{ fontSize: '12px', color: '#1a7f37' }}>🎉 You've unlocked <strong>free standard shipping!</strong></span>
              </div>
            )}
            <div className="flex items-center justify-between mb-4">
              <span style={{ fontSize: '15px', color: '#6e6e73' }}>Subtotal</span>
              <span style={{ fontSize: '20px', fontWeight: 700, color: '#1d1d1f' }}>${cartTotal.toLocaleString()}</span>
            </div>
            <Link
              to="/checkout"
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full transition-colors"
              style={{ background: '#0071e3', color: '#fff', fontSize: '16px', fontWeight: 500 }}
              onClick={() => setCartOpen(false)}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = '#0077ed')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = '#0071e3')}
            >
              Checkout <ArrowRight size={16} />
            </Link>
            <Link
              to="/cart"
              className="flex items-center justify-center w-full py-3 mt-2 rounded-full transition-colors"
              style={{ background: '#f5f5f7', color: '#1d1d1f', fontSize: '15px' }}
              onClick={() => setCartOpen(false)}
            >
              View cart
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
