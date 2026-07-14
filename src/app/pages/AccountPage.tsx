import { useState } from 'react';
import { Link, useParams } from '../router';
import { Package, Heart, MapPin, User, Shield, RotateCcw, ChevronRight, Check, Star, ExternalLink, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import { useApp } from '../store/AppContext';
import { PRODUCTS, CONDITION_LABELS } from '../data/products';

type Tab = 'dashboard' | 'orders' | 'wishlist' | 'addresses' | 'profile' | 'warranty' | 'returns';

const TABS: { id: Tab; label: string; icon: React.FC<{ size?: number; style?: React.CSSProperties }> }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: User },
  { id: 'orders', label: 'Orders', icon: Package },
  { id: 'wishlist', label: 'Wishlist', icon: Heart },
  { id: 'addresses', label: 'Addresses', icon: MapPin },
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'warranty', label: 'Warranty Claims', icon: Shield },
  { id: 'returns', label: 'Returns', icon: RotateCcw },
];

const MOCK_ORDERS = [
  { id: 'ORD-2025-0012', date: 'May 12, 2025', status: 'Delivered', total: 1499, product: PRODUCTS[0] },
  { id: 'ORD-2025-0008', date: 'April 3, 2025', status: 'Delivered', total: 749, product: PRODUCTS[3] },
  { id: 'ORD-2025-0015', date: 'June 1, 2025', status: 'In Transit', total: 1049, product: PRODUCTS[1] },
];

const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  Delivered: { bg: '#f0fff4', color: '#1a7f37' },
  'In Transit': { bg: '#f0f7ff', color: '#0071e3' },
  Processing: { bg: '#fff8f0', color: '#d97706' },
  Cancelled: { bg: '#fff3f3', color: '#e53e3e' },
};

export function AccountPage() {
  const { tab } = useParams<{ tab?: Tab }>();
  const [activeTab, setActiveTab] = useState<Tab>(tab || 'dashboard');
  const { wishlist } = useApp();
  const [profileForm, setProfileForm] = useState({ name: 'Alex Johnson', email: 'alex@example.com', phone: '+1 555 234 5678' });
  const wishlistProducts = PRODUCTS.filter(p => wishlist.includes(p.id));

  return (
    <div style={{ paddingTop: '56px', background: '#f5f5f7', minHeight: '100vh' }}>
      <div className="max-w-[1200px] mx-auto px-6 py-10">
        <div className="flex items-center gap-2 mb-6">
          <Link to="/" style={{ fontSize: '13px', color: '#6e6e73' }}>Home</Link>
          <ChevronRight size={12} style={{ color: '#6e6e73' }} />
          <span style={{ fontSize: '13px', color: '#1d1d1f' }}>My Account</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="p-4 rounded-2xl" style={{ background: '#fff' }}>
              {/* User */}
              <div className="flex items-center gap-3 p-3 mb-4 rounded-xl" style={{ background: '#f5f5f7' }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: '#0071e3', color: '#fff', fontSize: '16px', fontWeight: 700 }}>A</div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#1d1d1f' }}>{profileForm.name}</div>
                  <div style={{ fontSize: '12px', color: '#6e6e73' }}>{profileForm.email}</div>
                </div>
              </div>
              {TABS.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl mb-0.5 transition-colors text-left"
                  style={{
                    background: activeTab === id ? '#f0f7ff' : 'transparent',
                    color: activeTab === id ? '#0071e3' : '#1d1d1f',
                  }}
                >
                  <Icon size={16} />
                  <span style={{ fontSize: '14px', fontWeight: activeTab === id ? 600 : 400 }}>{label}</span>
                </button>
              ))}
            </div>
          </aside>

          {/* Content */}
          <main className="lg:col-span-3">
            <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
              {/* Dashboard */}
              {activeTab === 'dashboard' && (
                <div>
                  <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1d1d1f', letterSpacing: '-0.02em', marginBottom: '20px' }}>Welcome back, Alex!</h1>
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {[
                      { label: 'Total Orders', value: MOCK_ORDERS.length, icon: Package, color: '#0071e3' },
                      { label: 'Wishlist Items', value: wishlistProducts.length, icon: Heart, color: '#e53e3e' },
                      { label: 'Warranties', value: 2, icon: Shield, color: '#1a7f37' },
                    ].map(({ label, value, icon: Icon, color }) => (
                      <div key={label} className="p-5 rounded-2xl" style={{ background: '#fff' }}>
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ background: `${color}15` }}>
                          <Icon size={18} style={{ color }} />
                        </div>
                        <div style={{ fontSize: '24px', fontWeight: 700, color: '#1d1d1f', letterSpacing: '-0.02em' }}>{value}</div>
                        <div style={{ fontSize: '13px', color: '#6e6e73' }}>{label}</div>
                      </div>
                    ))}
                  </div>
                  <div className="p-5 rounded-2xl" style={{ background: '#fff', marginBottom: '16px' }}>
                    <div style={{ fontSize: '15px', fontWeight: 600, color: '#1d1d1f', marginBottom: '12px' }}>Recent Orders</div>
                    {MOCK_ORDERS.slice(0, 2).map(order => (
                      <div key={order.id} className="flex items-center gap-3 py-3" style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                        <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0" style={{ background: '#f5f5f7' }}>
                          <img src={order.product.images[0]} alt={order.product.shortName} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <div style={{ fontSize: '14px', fontWeight: 500, color: '#1d1d1f' }}>{order.product.shortName}</div>
                          <div style={{ fontSize: '12px', color: '#6e6e73' }}>{order.id} · {order.date}</div>
                        </div>
                        <span className="px-2.5 py-1 rounded-full" style={{ ...STATUS_STYLE[order.status], fontSize: '12px', fontWeight: 500 }}>{order.status}</span>
                      </div>
                    ))}
                    <button onClick={() => setActiveTab('orders')} className="flex items-center gap-1 mt-3" style={{ fontSize: '14px', color: '#0071e3' }}>
                      View all orders <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              )}

              {/* Orders */}
              {activeTab === 'orders' && (
                <div>
                  <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1d1d1f', letterSpacing: '-0.02em', marginBottom: '20px' }}>My Orders</h1>
                  <div className="flex flex-col gap-4">
                    {MOCK_ORDERS.map(order => (
                      <div key={order.id} className="p-5 rounded-2xl" style={{ background: '#fff' }}>
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <div style={{ fontSize: '14px', fontWeight: 600, color: '#1d1d1f' }}>{order.id}</div>
                            <div className="flex items-center gap-1.5 mt-1">
                              <Clock size={12} style={{ color: '#6e6e73' }} />
                              <span style={{ fontSize: '12px', color: '#6e6e73' }}>{order.date}</span>
                            </div>
                          </div>
                          <span className="px-3 py-1.5 rounded-full" style={{ ...STATUS_STYLE[order.status], fontSize: '13px', fontWeight: 600 }}>{order.status}</span>
                        </div>
                        <div className="flex items-center gap-3 py-3" style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                          <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0" style={{ background: '#f5f5f7' }}>
                            <img src={order.product.images[0]} alt={order.product.shortName} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1">
                            <div style={{ fontSize: '14px', fontWeight: 500, color: '#1d1d1f' }}>{order.product.shortName}</div>
                            <div style={{ fontSize: '12px', color: '#6e6e73' }}>{CONDITION_LABELS[order.product.condition]}</div>
                          </div>
                          <div style={{ fontSize: '16px', fontWeight: 700, color: '#1d1d1f' }}>${order.total.toLocaleString()}</div>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <button className="flex items-center gap-1.5 px-4 py-2 rounded-full" style={{ background: '#f5f5f7', fontSize: '13px', color: '#1d1d1f' }}>
                            <ExternalLink size={13} /> Track order
                          </button>
                          {order.status === 'Delivered' && (
                            <button className="flex items-center gap-1.5 px-4 py-2 rounded-full" style={{ background: '#f5f5f7', fontSize: '13px', color: '#1d1d1f' }}>
                              <Star size={13} /> Leave review
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Wishlist */}
              {activeTab === 'wishlist' && (
                <div>
                  <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1d1d1f', letterSpacing: '-0.02em', marginBottom: '20px' }}>My Wishlist</h1>
                  {wishlistProducts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 text-center p-6 rounded-2xl" style={{ background: '#fff' }}>
                      <Heart size={36} style={{ color: '#d1d1d6', marginBottom: '12px' }} />
                      <div style={{ fontSize: '17px', fontWeight: 600, color: '#1d1d1f', marginBottom: '8px' }}>Your wishlist is empty</div>
                      <p style={{ fontSize: '14px', color: '#6e6e73', marginBottom: '20px' }}>Save products you love to revisit later</p>
                      <Link to="/shop" className="px-5 py-2.5 rounded-full" style={{ background: '#0071e3', color: '#fff', fontSize: '15px' }}>Browse Products</Link>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {wishlistProducts.map((p, i) => (
                        <div key={p.id} className="p-4 rounded-2xl flex gap-3" style={{ background: '#fff' }}>
                          <Link to={`/product/${p.id}`} className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0" style={{ background: '#f5f5f7' }}>
                            <img src={p.images[0]} alt={p.shortName} className="w-full h-full object-cover" />
                          </Link>
                          <div className="flex-1">
                            <Link to={`/product/${p.id}`} style={{ fontSize: '14px', fontWeight: 600, color: '#1d1d1f' }}>{p.shortName}</Link>
                            <div style={{ fontSize: '12px', color: '#6e6e73', marginTop: '2px' }}>{CONDITION_LABELS[p.condition]}</div>
                            <div style={{ fontSize: '16px', fontWeight: 700, color: '#1d1d1f', marginTop: '6px' }}>${p.price.toLocaleString()}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Addresses */}
              {activeTab === 'addresses' && (
                <div>
                  <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1d1d1f', letterSpacing: '-0.02em', marginBottom: '20px' }}>Saved Addresses</h1>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-5 rounded-2xl" style={{ background: '#fff', border: '2px solid #0071e3' }}>
                      <div className="flex items-center justify-between mb-3">
                        <span style={{ fontSize: '13px', fontWeight: 600, color: '#0071e3' }}>Default Address</span>
                        <Check size={15} style={{ color: '#0071e3' }} />
                      </div>
                      <div style={{ fontSize: '15px', fontWeight: 600, color: '#1d1d1f' }}>{profileForm.name}</div>
                      <div style={{ fontSize: '14px', color: '#6e6e73', marginTop: '4px', lineHeight: 1.6 }}>123 Main Street<br />New York, NY 10001<br />United States</div>
                      <button style={{ fontSize: '13px', color: '#0071e3', marginTop: '12px' }}>Edit</button>
                    </div>
                    <button className="p-5 rounded-2xl flex flex-col items-center justify-center gap-2" style={{ background: '#fff', border: '1.5px dashed rgba(0,0,0,0.15)' }}>
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#f5f5f7' }}>
                        <span style={{ fontSize: '22px', color: '#6e6e73' }}>+</span>
                      </div>
                      <span style={{ fontSize: '14px', color: '#6e6e73' }}>Add New Address</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Profile */}
              {activeTab === 'profile' && (
                <div>
                  <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1d1d1f', letterSpacing: '-0.02em', marginBottom: '20px' }}>Profile Settings</h1>
                  <div className="p-6 rounded-2xl" style={{ background: '#fff' }}>
                    <div className="flex flex-col gap-4 max-w-md">
                      {[
                        { label: 'Full Name', key: 'name', placeholder: 'Your name' },
                        { label: 'Email', key: 'email', placeholder: 'your@email.com' },
                        { label: 'Phone', key: 'phone', placeholder: '+1 234 567 8900' },
                      ].map(field => (
                        <div key={field.key}>
                          <label style={{ fontSize: '13px', fontWeight: 500, color: '#1d1d1f', display: 'block', marginBottom: '6px' }}>{field.label}</label>
                          <input
                            value={profileForm[field.key as keyof typeof profileForm]}
                            onChange={e => setProfileForm(f => ({ ...f, [field.key]: e.target.value }))}
                            placeholder={field.placeholder}
                            className="w-full px-4 py-3 rounded-xl outline-none"
                            style={{ background: '#f5f5f7', fontSize: '15px', color: '#1d1d1f', border: '1.5px solid transparent' }}
                            onFocus={e => (e.currentTarget.style.borderColor = '#0071e3')}
                            onBlur={e => (e.currentTarget.style.borderColor = 'transparent')}
                          />
                        </div>
                      ))}
                      <button className="px-6 py-3 rounded-full mt-2" style={{ background: '#0071e3', color: '#fff', fontSize: '15px', fontWeight: 500, width: 'fit-content' }}>
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Warranty */}
              {activeTab === 'warranty' && (
                <div>
                  <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1d1d1f', letterSpacing: '-0.02em', marginBottom: '20px' }}>Warranty Claims</h1>
                  {[{ id: 'WC-001', product: 'MacBook Pro 14" M3', date: 'May 12, 2025', expires: 'May 12, 2026', status: 'Active' }].map(w => (
                    <div key={w.id} className="p-5 rounded-2xl mb-4" style={{ background: '#fff' }}>
                      <div className="flex items-center justify-between mb-3">
                        <div style={{ fontSize: '15px', fontWeight: 600, color: '#1d1d1f' }}>{w.product}</div>
                        <span className="px-2.5 py-1 rounded-full" style={{ background: '#f0fff4', color: '#1a7f37', fontSize: '12px', fontWeight: 600 }}>✓ {w.status}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div style={{ fontSize: '13px', color: '#6e6e73' }}>Warranty ID: <span style={{ color: '#1d1d1f' }}>{w.id}</span></div>
                        <div style={{ fontSize: '13px', color: '#6e6e73' }}>Expires: <span style={{ color: '#1d1d1f' }}>{w.expires}</span></div>
                      </div>
                      <button className="mt-4 px-4 py-2 rounded-full" style={{ background: '#f5f5f7', fontSize: '13px', color: '#1d1d1f' }}>File a Claim</button>
                    </div>
                  ))}
                  <div className="p-5 rounded-2xl" style={{ background: '#fff', border: '1.5px dashed rgba(0,0,0,0.12)' }}>
                    <div style={{ fontSize: '14px', color: '#6e6e73', textAlign: 'center' }}>All active warranties appear here. Need help? <Link to="/contact" style={{ color: '#0071e3' }}>Contact Support</Link></div>
                  </div>
                </div>
              )}

              {/* Returns */}
              {activeTab === 'returns' && (
                <div>
                  <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1d1d1f', letterSpacing: '-0.02em', marginBottom: '20px' }}>Returns Management</h1>
                  <div className="p-6 rounded-2xl" style={{ background: '#fff', marginBottom: '16px' }}>
                    <div style={{ fontSize: '16px', fontWeight: 600, color: '#1d1d1f', marginBottom: '8px' }}>14-Day Return Policy</div>
                    <p style={{ fontSize: '14px', color: '#6e6e73', lineHeight: 1.6 }}>
                      You can return any device within 14 days of delivery for a full refund, no questions asked. Simply initiate a return below and we'll provide a free prepaid label.
                    </p>
                  </div>
                  <div className="p-6 rounded-2xl" style={{ background: '#fff' }}>
                    <div style={{ fontSize: '15px', fontWeight: 600, color: '#1d1d1f', marginBottom: '16px' }}>Initiate a Return</div>
                    <div className="flex flex-col gap-4 max-w-sm">
                      <div>
                        <label style={{ fontSize: '13px', fontWeight: 500, color: '#1d1d1f', display: 'block', marginBottom: '6px' }}>Order Number</label>
                        <input placeholder="ORD-2025-XXXX" className="w-full px-4 py-3 rounded-xl outline-none" style={{ background: '#f5f5f7', fontSize: '15px', color: '#1d1d1f', border: '1.5px solid transparent' }}
                          onFocus={e => (e.currentTarget.style.borderColor = '#0071e3')} onBlur={e => (e.currentTarget.style.borderColor = 'transparent')} />
                      </div>
                      <div>
                        <label style={{ fontSize: '13px', fontWeight: 500, color: '#1d1d1f', display: 'block', marginBottom: '6px' }}>Reason</label>
                        <select className="w-full px-4 py-3 rounded-xl outline-none" style={{ background: '#f5f5f7', fontSize: '15px', color: '#1d1d1f', border: '1.5px solid transparent' }}>
                          <option>Changed my mind</option>
                          <option>Device doesn't match description</option>
                          <option>Technical issue</option>
                          <option>Received wrong item</option>
                        </select>
                      </div>
                      <button className="px-6 py-3 rounded-full" style={{ background: '#0071e3', color: '#fff', fontSize: '15px', fontWeight: 500, width: 'fit-content' }}>
                        Submit Return Request
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  );
}
