import { useState, useRef } from 'react';
import { Link } from '../router';
import { ChevronRight, Shield, Lock, Check, CreditCard, Truck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../store/AppContext';
import { CONDITION_LABELS } from '../data/products';

type Step = 'contact' | 'shipping' | 'payment' | 'confirm';

function Input({ label, placeholder, type = 'text', value, onChange, required, error }: {
  label: string; placeholder: string; type?: string;
  value: string; onChange: (v: string) => void; required?: boolean; error?: string;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label style={{ fontSize: '13px', fontWeight: 500, color: '#1d1d1f', display: 'block', marginBottom: '6px' }}>
        {label} {required && <span style={{ color: '#e53e3e' }}>*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        required={required}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full px-4 py-3 rounded-xl outline-none transition-all"
        style={{
          background: '#f5f5f7',
          fontSize: '15px',
          color: '#1d1d1f',
          border: `1.5px solid ${error ? '#e53e3e' : focused ? '#0071e3' : 'transparent'}`,
        }}
      />
      {error && <div style={{ fontSize: '12px', color: '#e53e3e', marginTop: '4px' }}>{error}</div>}
    </div>
  );
}

const STEPS: { id: Step; label: string }[] = [
  { id: 'contact', label: 'Contact' },
  { id: 'shipping', label: 'Shipping' },
  { id: 'payment', label: 'Payment' },
  { id: 'confirm', label: 'Review' },
];

export function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useApp();
  const [step, setStep] = useState<Step>('contact');
  const [placed, setPlaced] = useState(false);
  const [placing, setPlacing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const orderNum = useRef(`MO-${Date.now().toString(36).toUpperCase()}`);
  const [form, setForm] = useState({
    email: '', phone: '',
    firstName: '', lastName: '', address: '', city: '', zip: '', country: 'US',
    cardNumber: '', cardName: '', cardExpiry: '', cardCvv: '',
    payMethod: 'card' as 'card' | 'paypal' | 'applepay',
    shippingMethod: 'standard' as 'standard' | 'express',
  });

  const set = (k: keyof typeof form) => (v: string) => {
    setForm(f => ({ ...f, [k]: v }));
    setErrors(e => { const next = { ...e }; delete next[k]; return next; });
  };

  const shipping = form.shippingMethod === 'express' ? 49 : (cartTotal > 500 ? 0 : 29);
  const total = cartTotal + shipping;

  const stepIndex = STEPS.findIndex(s => s.id === step);

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (step === 'contact') {
      if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Valid email required';
    }
    if (step === 'shipping') {
      if (!form.firstName.trim()) errs.firstName = 'Required';
      if (!form.lastName.trim()) errs.lastName = 'Required';
      if (!form.address.trim()) errs.address = 'Required';
      if (!form.city.trim()) errs.city = 'Required';
      if (!form.zip.trim()) errs.zip = 'Required';
    }
    if (step === 'payment' && form.payMethod === 'card') {
      if (form.cardNumber.replace(/\s/g, '').length < 12) errs.cardNumber = 'Enter a valid card number';
      if (!form.cardName.trim()) errs.cardName = 'Required';
      if (!form.cardExpiry.trim()) errs.cardExpiry = 'Required';
      if (!form.cardCvv.trim()) errs.cardCvv = 'Required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (!validate()) return;
    const steps: Step[] = ['contact', 'shipping', 'payment', 'confirm'];
    const i = steps.indexOf(step);
    if (i < steps.length - 1) setStep(steps[i + 1]);
  };

  const handlePlaceOrder = () => {
    setPlacing(true);
    setTimeout(() => {
      setPlacing(false);
      setPlaced(true);
      clearCart();
    }, 1800);
  };

  if (placed) {
    return (
      <div style={{ paddingTop: '56px', background: '#f5f5f7', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md mx-auto px-6 text-center"
        >
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: '#0071e3' }}>
            <Check size={36} style={{ color: '#fff' }} />
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#1d1d1f', letterSpacing: '-0.025em', marginBottom: '12px' }}>
            Order Placed!
          </h1>
          <div className="px-5 py-3 rounded-2xl mb-5 inline-block" style={{ background: '#f5f5f7' }}>
            <div style={{ fontSize: '12px', color: '#6e6e73' }}>Order number</div>
            <div style={{ fontSize: '17px', fontWeight: 700, color: '#1d1d1f', letterSpacing: '0.04em' }}>{orderNum.current}</div>
          </div>
          <p style={{ fontSize: '17px', color: '#6e6e73', lineHeight: 1.6, marginBottom: '8px' }}>
            Thank you for your order. A confirmation has been sent to <strong>{form.email}</strong>.
          </p>
          <p style={{ fontSize: '14px', color: '#6e6e73', marginBottom: '32px' }}>
            Your certified Apple device ships within 1–2 business days.
          </p>
          <div className="flex flex-col gap-3">
            <Link to="/account/orders" className="w-full py-3.5 rounded-full text-center" style={{ background: '#0071e3', color: '#fff', fontSize: '16px', fontWeight: 500 }}>
              Track My Order
            </Link>
            <Link to="/shop" className="w-full py-3 rounded-full text-center" style={{ background: '#f5f5f7', color: '#1d1d1f', fontSize: '15px' }}>
              Continue Shopping
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: '56px', background: '#f5f5f7', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ background: '#fff', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
        <div className="max-w-[900px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 22 22" fill="none"><path d="M18.1 14.9c-.4.9-.6 1.3-1.1 2.1-.7 1.1-1.7 2.5-3 2.5-1.1.1-1.4-.7-2.9-.7s-1.9.7-3 .7c-1.2 0-2.2-1.3-2.9-2.4C3.1 14.7 2.6 11 3.9 9.1c.9-1.3 2.3-2.1 3.7-2.1 1.4 0 2.2.7 3.4.7 1.1 0 1.8-.7 3.4-.7 1.2 0 2.5.7 3.4 1.8-3 1.7-2.5 5.9.3 6.1zM13.5 5.2c.6-.8 1-1.9.8-3-.9.1-2 .6-2.6 1.5-.6.7-.9 1.8-.8 2.8 1-.1 2-.6 2.6-1.3z" fill="#1d1d1f" /></svg>
              <span style={{ fontWeight: 600, fontSize: '16px', color: '#1d1d1f' }}>MacOutlet</span>
            </Link>
            <div className="flex items-center gap-1.5">
              <Lock size={13} style={{ color: '#1a7f37' }} />
              <span style={{ fontSize: '13px', color: '#1a7f37' }}>Secure Checkout</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[900px] mx-auto px-6 py-8">
        {/* Progress */}
        <div className="flex items-center gap-0 mb-8">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center flex-1">
              <button
                onClick={() => i < stepIndex && setStep(s.id)}
                className="flex items-center gap-2"
                disabled={i > stepIndex}
              >
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    background: i < stepIndex ? '#0071e3' : i === stepIndex ? '#1d1d1f' : '#e5e5e5',
                    color: i <= stepIndex ? '#fff' : '#6e6e73',
                    fontSize: '12px', fontWeight: 600,
                  }}
                >
                  {i < stepIndex ? <Check size={13} /> : i + 1}
                </div>
                <span style={{ fontSize: '13px', color: i === stepIndex ? '#1d1d1f' : '#6e6e73', fontWeight: i === stepIndex ? 600 : 400 }}>
                  {s.label}
                </span>
              </button>
              {i < STEPS.length - 1 && <div className="flex-1 h-px mx-3" style={{ background: i < stepIndex ? '#0071e3' : '#e5e5e5' }} />}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Form */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="p-6 rounded-2xl"
                style={{ background: '#fff' }}
              >
                {step === 'contact' && (
                  <>
                    <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#1d1d1f', marginBottom: '20px' }}>Contact Information</h2>
                    <div className="flex flex-col gap-4">
                      <Input label="Email" placeholder="your@email.com" type="email" value={form.email} onChange={set('email')} required error={errors.email} />
                      <Input label="Phone" placeholder="+1 234 567 8900" type="tel" value={form.phone} onChange={set('phone')} />
                    </div>
                  </>
                )}

                {step === 'shipping' && (
                  <>
                    <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#1d1d1f', marginBottom: '20px' }}>Shipping Address</h2>
                    <div className="flex flex-col gap-4">
                      <div className="grid grid-cols-2 gap-3">
                        <Input label="First Name" placeholder="John" value={form.firstName} onChange={set('firstName')} required error={errors.firstName} />
                        <Input label="Last Name" placeholder="Doe" value={form.lastName} onChange={set('lastName')} required error={errors.lastName} />
                      </div>
                      <Input label="Street Address" placeholder="123 Main St" value={form.address} onChange={set('address')} required error={errors.address} />
                      <div className="grid grid-cols-2 gap-3">
                        <Input label="City" placeholder="New York" value={form.city} onChange={set('city')} required error={errors.city} />
                        <Input label="ZIP Code" placeholder="10001" value={form.zip} onChange={set('zip')} required error={errors.zip} />
                      </div>
                      <div>
                        <label style={{ fontSize: '13px', fontWeight: 500, color: '#1d1d1f', display: 'block', marginBottom: '6px' }}>Country</label>
                        <select value={form.country} onChange={e => set('country')(e.target.value)} className="w-full px-4 py-3 rounded-xl outline-none" style={{ background: '#f5f5f7', fontSize: '15px', color: '#1d1d1f', border: '1.5px solid transparent' }}>
                          <option value="US">United States</option>
                          <option value="GB">United Kingdom</option>
                          <option value="DE">Germany</option>
                          <option value="FR">France</option>
                          <option value="PL">Poland</option>
                          <option value="NL">Netherlands</option>
                        </select>
                      </div>

                      {/* Shipping method */}
                      <div>
                        <label style={{ fontSize: '13px', fontWeight: 500, color: '#1d1d1f', display: 'block', marginBottom: '10px' }}>Shipping Method</label>
                        {(['standard', 'express'] as const).map(method => (
                          <label key={method} className="flex items-center gap-3 p-4 rounded-xl cursor-pointer mb-2" style={{ border: `1.5px solid ${form.shippingMethod === method ? '#0071e3' : 'rgba(0,0,0,0.08)'}`, background: form.shippingMethod === method ? '#f0f7ff' : '#fff' }}>
                            <input type="radio" name="shipping" value={method} checked={form.shippingMethod === method} onChange={() => set('shippingMethod')(method)} className="hidden" />
                            <div className="w-4 h-4 rounded-full flex items-center justify-center" style={{ border: `2px solid ${form.shippingMethod === method ? '#0071e3' : '#d1d1d6'}` }}>
                              {form.shippingMethod === method && <div className="w-2 h-2 rounded-full" style={{ background: '#0071e3' }} />}
                            </div>
                            <div className="flex-1">
                              <div style={{ fontSize: '14px', fontWeight: 600, color: '#1d1d1f' }}>{method === 'standard' ? 'Standard Delivery (2–3 days)' : 'Express Delivery (next day)'}</div>
                              <div style={{ fontSize: '13px', color: '#6e6e73' }}>{method === 'standard' ? (cartTotal > 500 ? 'Free' : '$29') : '$49'}</div>
                            </div>
                            <Truck size={16} style={{ color: '#6e6e73' }} />
                          </label>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {step === 'payment' && (
                  <>
                    <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#1d1d1f', marginBottom: '20px' }}>Payment Method</h2>
                    <div className="flex gap-2 mb-5">
                      {(['card', 'paypal', 'applepay'] as const).map(m => (
                        <button
                          key={m}
                          onClick={() => set('payMethod')(m)}
                          className="flex-1 py-3 rounded-xl text-center transition-all"
                          style={{ border: `1.5px solid ${form.payMethod === m ? '#0071e3' : 'rgba(0,0,0,0.1)'}`, background: form.payMethod === m ? '#f0f7ff' : '#fff', fontSize: '14px', color: form.payMethod === m ? '#0071e3' : '#6e6e73', fontWeight: 500 }}
                        >
                          {m === 'card' ? '💳 Card' : m === 'paypal' ? 'PayPal' : ' Apple Pay'}
                        </button>
                      ))}
                    </div>
                    {form.payMethod === 'card' && (
                      <div className="flex flex-col gap-4">
                        <Input label="Card Number" placeholder="1234 5678 9012 3456" value={form.cardNumber} onChange={set('cardNumber')} error={errors.cardNumber} />
                        <Input label="Cardholder Name" placeholder="John Doe" value={form.cardName} onChange={set('cardName')} error={errors.cardName} />
                        <div className="grid grid-cols-2 gap-3">
                          <Input label="Expiry" placeholder="MM / YY" value={form.cardExpiry} onChange={set('cardExpiry')} error={errors.cardExpiry} />
                          <Input label="CVV" placeholder="123" value={form.cardCvv} onChange={set('cardCvv')} error={errors.cardCvv} />
                        </div>
                      </div>
                    )}
                    {form.payMethod !== 'card' && (
                      <div className="flex flex-col items-center justify-center py-8 rounded-2xl" style={{ background: '#f5f5f7' }}>
                        <div style={{ fontSize: '15px', color: '#6e6e73' }}>You'll be redirected to {form.payMethod === 'paypal' ? 'PayPal' : 'Apple Pay'} to complete payment.</div>
                      </div>
                    )}
                    <div className="flex items-center gap-2 mt-5 p-3 rounded-xl" style={{ background: '#f5f5f7' }}>
                      <Lock size={14} style={{ color: '#1a7f37' }} />
                      <span style={{ fontSize: '12px', color: '#6e6e73' }}>Your payment info is encrypted and secure. We never store card details.</span>
                    </div>
                  </>
                )}

                {step === 'confirm' && (
                  <>
                    <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#1d1d1f', marginBottom: '20px' }}>Review Your Order</h2>
                    <div className="flex flex-col gap-3 mb-5">
                      {[
                        { label: 'Email', value: form.email },
                        { label: 'Ship to', value: `${form.firstName} ${form.lastName}, ${form.address}, ${form.city}` },
                        { label: 'Shipping', value: form.shippingMethod === 'standard' ? 'Standard (2–3 days)' : 'Express (next day)' },
                        { label: 'Payment', value: form.payMethod === 'card' ? `Card ending ${form.cardNumber.slice(-4)}` : form.payMethod === 'paypal' ? 'PayPal' : 'Apple Pay' },
                      ].filter(r => r.value.trim()).map(row => (
                        <div key={row.label} className="flex items-start gap-4">
                          <span style={{ fontSize: '13px', color: '#6e6e73', minWidth: '70px', flexShrink: 0 }}>{row.label}</span>
                          <span style={{ fontSize: '14px', color: '#1d1d1f' }}>{row.value}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                <button
                  onClick={step === 'confirm' ? handlePlaceOrder : handleNext}
                  disabled={placing}
                  className="w-full py-3.5 rounded-full mt-6 flex items-center justify-center gap-2 transition-colors"
                  style={{ background: placing ? '#6e6e73' : '#0071e3', color: '#fff', fontSize: '16px', fontWeight: 500, cursor: placing ? 'not-allowed' : 'pointer' }}
                  onMouseEnter={e => !placing && ((e.currentTarget as HTMLElement).style.background = '#0077ed')}
                  onMouseLeave={e => !placing && ((e.currentTarget as HTMLElement).style.background = '#0071e3')}
                >
                  {placing ? (
                    <><span className="inline-block w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" /> Processing…</>
                  ) : step === 'confirm' ? (
                    <><Check size={16} /> Place Order</>
                  ) : (
                    <>Continue <ChevronRight size={16} /></>
                  )}
                </button>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Order summary sidebar */}
          <div className="lg:col-span-2">
            <div className="p-5 rounded-2xl sticky top-20" style={{ background: '#fff' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#1d1d1f', marginBottom: '14px' }}>Order Summary</h3>
              <div className="flex flex-col gap-3 mb-4">
                {cart.map(({ product, quantity }) => (
                  <div key={product.id} className="flex gap-3">
                    <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0" style={{ background: '#f5f5f7' }}>
                      <img src={product.images[0]} alt={product.shortName} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <div style={{ fontSize: '13px', fontWeight: 500, color: '#1d1d1f' }}>{product.shortName}</div>
                      <div style={{ fontSize: '11px', color: '#6e6e73' }}>{CONDITION_LABELS[product.condition]} · Qty {quantity}</div>
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: '#1d1d1f' }}>${(product.price * quantity).toLocaleString()}</div>
                  </div>
                ))}
              </div>
              <div className="border-t pt-3 flex flex-col gap-2" style={{ borderColor: 'rgba(0,0,0,0.07)' }}>
                <div className="flex justify-between"><span style={{ fontSize: '13px', color: '#6e6e73' }}>Subtotal</span><span style={{ fontSize: '13px', color: '#1d1d1f' }}>${cartTotal.toLocaleString()}</span></div>
                <div className="flex justify-between"><span style={{ fontSize: '13px', color: '#6e6e73' }}>Shipping</span><span style={{ fontSize: '13px', color: shipping === 0 ? '#1a7f37' : '#1d1d1f' }}>{shipping === 0 ? 'Free' : `$${shipping}`}</span></div>
                <div className="flex justify-between pt-2 border-t" style={{ borderColor: 'rgba(0,0,0,0.07)' }}>
                  <span style={{ fontSize: '15px', fontWeight: 700, color: '#1d1d1f' }}>Total</span>
                  <span style={{ fontSize: '17px', fontWeight: 700, color: '#1d1d1f' }}>${total.toFixed(0)}</span>
                </div>
              </div>
              <div className="mt-4 flex flex-col gap-1.5">
                {[Shield, Lock, CreditCard].map((Icon, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Icon size={13} style={{ color: '#0071e3' }} />
                    <span style={{ fontSize: '12px', color: '#6e6e73' }}>{['12-Month Warranty included', 'SSL encrypted & secure', 'Apple-certified devices'][i]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
