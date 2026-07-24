import { useState, useMemo, useEffect } from 'react';
import { Search, Plus, Minus, ChevronRight } from 'lucide-react';
import { Link, useLocation } from '../router';
import { motion, AnimatePresence } from 'motion/react';

const CATEGORIES = [
  { id: 'all', label: 'All Questions' },
  { id: 'warranty', label: 'Warranty' },
  { id: 'shipping', label: 'Shipping' },
  { id: 'returns', label: 'Returns' },
  { id: 'condition', label: 'Device Condition' },
  { id: 'battery', label: 'Battery Health' },
  { id: 'financing', label: 'Financing' },
  { id: 'payments', label: 'Payments' },
  { id: 'authenticity', label: 'Authenticity' },
];

const FAQS = [
  { id: 1, cat: 'warranty', q: 'What does the 12-month warranty cover?', a: 'Our 12-month warranty covers all hardware defects and failures — display issues, keyboard problems, port failures, logic board faults, and more. If your device has a covered issue within 12 months of purchase, we will repair or replace it at no charge to you.' },
  { id: 2, cat: 'warranty', q: 'How do I make a warranty claim?', a: 'Log in to your account, go to "Warranty Claims", and select the relevant order. Describe the issue and submit. Our team will respond within 24 hours with next steps. You can also contact us directly at support@macoutlet.com.' },
  { id: 3, cat: 'warranty', q: 'Does the warranty transfer if I sell the device?', a: 'No — our warranty is registered to the original purchaser and does not transfer upon resale.' },
  { id: 4, cat: 'shipping', q: 'How long does shipping take?', a: 'Standard delivery typically takes 2–3 business days. Express next-day delivery is available at checkout. Orders placed before 2pm EST on business days are dispatched the same day.' },
  { id: 5, cat: 'shipping', q: 'Do you ship internationally?', a: 'Yes! We ship to Europe, Canada, Australia, and most countries. International shipping times vary from 3–7 business days depending on location. Import duties may apply.' },
  { id: 6, cat: 'shipping', q: 'Is shipping free?', a: 'Standard shipping is free on orders over $500. For orders under $500, standard shipping is $29. Express shipping is $49 regardless of order value.' },
  { id: 7, cat: 'returns', q: 'What is your return policy?', a: 'We offer a 14-day hassle-free return policy. If you\'re not satisfied for any reason, return the device within 14 days of delivery for a full refund. We\'ll provide a prepaid return label — you pay nothing.' },
  { id: 8, cat: 'returns', q: 'How long does a refund take?', a: 'Once we receive and inspect the returned device (typically 2–3 business days), we process the refund immediately. Your bank should reflect the refund within 3–5 business days.' },
  { id: 9, cat: 'condition', q: 'What does "Open Box" mean?', a: '"Open Box" devices were purchased and returned without being used, or briefly opened for display/testing purposes only. They are in essentially new condition and often include all original accessories and packaging.' },
  { id: 10, cat: 'condition', q: 'What does "Like New" mean?', a: '"Like New" devices have been very lightly used and show no cosmetic marks or wear. They are functionally and cosmetically indistinguishable from new. Battery health is typically 95%+.' },
  { id: 11, cat: 'condition', q: 'What does "Excellent" mean?', a: '"Excellent" condition devices may have very minor cosmetic marks — perhaps a faint scuff barely visible under direct light. They are fully functional and pass all our 60-point checks. Battery health is typically 85%+.' },
  { id: 12, cat: 'condition', q: 'What does "Good" mean?', a: '"Good" condition devices show visible cosmetic signs of use — scratches or marks that are noticeable. However, they are fully functional and have been serviced and cleaned. This grade offers the best value.' },
  { id: 13, cat: 'battery', q: 'What does battery health percentage mean?', a: 'Battery health is a macOS metric showing remaining battery capacity relative to when it was new. 100% means full factory capacity. We recommend 80%+ for confident use; devices above 90% behave like new batteries.' },
  { id: 14, cat: 'battery', q: 'Is the battery health guaranteed?', a: 'Yes. We guarantee the battery health is at or above the stated percentage at the time of delivery. If it\'s lower upon receipt, contact us immediately for a resolution.' },
  { id: 15, cat: 'battery', q: 'Can I get the battery replaced?', a: 'Yes. Any MacOutlet device can have its battery replaced by our in-house technicians. Contact support for pricing and availability.' },
  { id: 16, cat: 'financing', q: 'Do you offer financing?', a: 'Yes! We offer 0% APR financing over 12 months through our payment partners. At checkout, choose "Pay in 12 installments" and complete a quick credit check. Subject to approval.' },
  { id: 17, cat: 'financing', q: 'What financing terms are available?', a: 'We offer 6, 12, and 24 month financing options. The 6 and 12 month plans are interest-free. The 24-month plan carries a low APR — rates shown at checkout.' },
  { id: 18, cat: 'payments', q: 'What payment methods do you accept?', a: 'We accept all major credit and debit cards (Visa, Mastercard, Amex), PayPal, Apple Pay, and Google Pay. Bank transfer is available for orders over $2,000.' },
  { id: 19, cat: 'payments', q: 'Is checkout secure?', a: 'Absolutely. All payments are processed through PCI-DSS compliant providers. We use 256-bit SSL encryption and never store your card details on our servers.' },
  { id: 20, cat: 'authenticity', q: 'Are the devices genuine Apple products?', a: 'Every device we sell is a 100% genuine Apple product. We source from authorised Apple channels, corporate returns, and authorised resellers. We never sell grey market or counterfeit products.' },
  { id: 21, cat: 'authenticity', q: 'How can I verify the serial number?', a: 'Every device comes with its original Apple serial number, which you can verify on Apple\'s coverage checker at checkcoverage.apple.com. The serial number is also on your receipt.' },
  { id: 22, cat: 'authenticity', q: 'Are the devices iCloud unlocked?', a: 'Yes — guaranteed. Every device is fully iCloud and activation-lock-free. You can set it up with your own Apple ID the moment you power it on.' },
];

function FAQItem({ faq, isOpen, onToggle }: { faq: typeof FAQS[0]; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="rounded-2xl overflow-hidden mb-2" style={{ border: '1px solid rgba(0,0,0,0.07)', background: '#fff' }}>
      <button className="w-full flex items-center justify-between px-5 py-4 text-left" onClick={onToggle}>
        <span style={{ fontSize: '15px', fontWeight: 500, color: '#1d1d1f', letterSpacing: '-0.01em', paddingRight: '16px' }}>{faq.q}</span>
        <span className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors" style={{ background: isOpen ? '#0071e3' : '#f5f5f7' }}>
          {isOpen ? <Minus size={13} style={{ color: '#fff' }} /> : <Plus size={13} style={{ color: '#6e6e73' }} />}
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <div className="px-5 pb-5 pt-3" style={{ fontSize: '14px', color: '#6e6e73', lineHeight: 1.7, borderTop: '1px solid rgba(0,0,0,0.06)' }}>
              {faq.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQPage() {
  const { search } = useLocation();
  const [activeCategory, setActiveCategory] = useState(() => new URLSearchParams(search).get('cat') || 'all');
  const [searchQ, setSearchQ] = useState('');

  useEffect(() => {
    const cat = new URLSearchParams(search).get('cat') || 'all';
    setActiveCategory(cat);
  }, [search]);
  const [openId, setOpenId] = useState<number | null>(1);

  const filtered = useMemo(() => {
    let pool = activeCategory === 'all' ? FAQS : FAQS.filter(f => f.cat === activeCategory);
    if (searchQ.trim()) pool = pool.filter(f => f.q.toLowerCase().includes(searchQ.toLowerCase()) || f.a.toLowerCase().includes(searchQ.toLowerCase()));
    return pool;
  }, [activeCategory, searchQ]);

  return (
    <div style={{ paddingTop: '56px', background: '#fff' }}>
      {/* Hero */}
      <section style={{ background: '#f5f5f7', padding: '64px 0 48px' }}>
        <div className="max-w-[860px] mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Link to="/" style={{ fontSize: '13px', color: '#6e6e73' }}>Home</Link>
            <ChevronRight size={12} style={{ color: '#6e6e73' }} />
            <span style={{ fontSize: '13px', color: '#1d1d1f' }}>FAQ</span>
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: '#1d1d1f', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '12px' }}>
              Frequently Asked Questions
            </h1>
            <p style={{ fontSize: '17px', color: '#6e6e73', marginBottom: '28px' }}>
              Everything you need to know about buying certified pre-owned Apple devices.
            </p>
          </motion.div>

          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: '#6e6e73' }} />
            <input
              value={searchQ}
              onChange={e => setSearchQ(e.target.value)}
              placeholder="Search questions…"
              className="w-full pl-11 pr-4 py-3.5 rounded-full outline-none transition-all"
              style={{ background: '#fff', fontSize: '16px', color: '#1d1d1f', border: '1.5px solid transparent', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}
              onFocus={e => (e.currentTarget.style.borderColor = '#0071e3')}
              onBlur={e => (e.currentTarget.style.borderColor = 'transparent')}
            />
          </div>
        </div>
      </section>

      <section style={{ padding: '48px 0 80px' }}>
        <div className="max-w-[1000px] mx-auto px-6">
          {/* Category tabs */}
          <div className="flex gap-2 flex-wrap mb-8">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className="px-4 py-2 rounded-full transition-all"
                style={{
                  background: activeCategory === cat.id ? '#0071e3' : '#f5f5f7',
                  color: activeCategory === cat.id ? '#fff' : '#1d1d1f',
                  fontSize: '14px',
                  fontWeight: activeCategory === cat.id ? 600 : 400,
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Results count */}
          <div style={{ fontSize: '14px', color: '#6e6e73', marginBottom: '16px' }}>
            {filtered.length} {filtered.length === 1 ? 'result' : 'results'}
            {searchQ && <span> for "<strong style={{ color: '#1d1d1f' }}>{searchQ}</strong>"</span>}
          </div>

          {/* FAQs */}
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Search size={36} style={{ color: '#d1d1d6', marginBottom: '12px' }} />
              <div style={{ fontSize: '17px', fontWeight: 600, color: '#1d1d1f', marginBottom: '8px' }}>No results found</div>
              <p style={{ fontSize: '14px', color: '#6e6e73', marginBottom: '20px' }}>Try a different search term or browse all categories</p>
              <button onClick={() => { setSearchQ(''); setActiveCategory('all'); }} className="px-5 py-2.5 rounded-full" style={{ background: '#0071e3', color: '#fff', fontSize: '15px' }}>
                Show all questions
              </button>
            </div>
          ) : (
            <div>
              {filtered.map(faq => (
                <FAQItem
                  key={faq.id}
                  faq={faq}
                  isOpen={openId === faq.id}
                  onToggle={() => setOpenId(openId === faq.id ? null : faq.id)}
                />
              ))}
            </div>
          )}

          {/* Still need help */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 p-8 rounded-2xl text-center"
            style={{ background: '#f5f5f7' }}
          >
            <div style={{ fontSize: '1.3rem', fontWeight: 700, color: '#1d1d1f', marginBottom: '8px' }}>Still have questions?</div>
            <p style={{ fontSize: '15px', color: '#6e6e73', marginBottom: '20px' }}>Our support team is ready to help. We respond within 4 business hours.</p>
            <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-full" style={{ background: '#0071e3', color: '#fff', fontSize: '15px', fontWeight: 500 }}>
              Contact Support <ChevronRight size={15} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
