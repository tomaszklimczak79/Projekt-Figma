import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, ChevronRight, Check, MessageSquare } from 'lucide-react';
import { Link } from '../router';
import { motion } from 'motion/react';

export function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [focused, setFocused] = useState('');

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const inputStyle = (field: string) => ({
    background: '#f5f5f7', fontSize: '15px', color: '#1d1d1f',
    border: `1.5px solid ${focused === field ? '#0071e3' : 'transparent'}`,
    transition: 'border-color 0.2s',
  });

  return (
    <div style={{ paddingTop: '56px', background: '#fff' }}>
      {/* Hero */}
      <section style={{ background: '#f5f5f7', padding: '64px 0 48px' }}>
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex items-center gap-2 mb-4">
            <Link to="/" style={{ fontSize: '13px', color: '#6e6e73' }}>Home</Link>
            <ChevronRight size={12} style={{ color: '#6e6e73' }} />
            <span style={{ fontSize: '13px', color: '#1d1d1f' }}>Contact</span>
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-block px-3 py-1 rounded-full mb-3" style={{ background: 'rgba(255,255,255,0.8)', color: '#6e6e73', fontSize: '13px', fontWeight: 500 }}>
              Get in Touch
            </div>
            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: '#1d1d1f', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
              We're here to help
            </h1>
            <p style={{ fontSize: '17px', color: '#6e6e73', marginTop: '10px', maxWidth: '480px' }}>
              Questions about a product, order, warranty, or just need advice? Our team responds within 4 business hours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact cards */}
      <section style={{ background: '#fff', padding: '48px 0' }}>
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {[
              { icon: Mail, title: 'Email', value: 'hello@macoutlet.com', sub: 'Reply within 4 hours', href: 'mailto:hello@macoutlet.com' },
              { icon: Phone, title: 'Phone', value: '+1 (888) 123-4567', sub: 'Mon–Fri, 9am–6pm EST', href: 'tel:+18881234567' },
              { icon: MessageSquare, title: 'Live Chat', value: 'Start a chat', sub: 'Available weekdays', href: '#' },
              { icon: MapPin, title: 'Address', value: '123 Tech Plaza', sub: 'New York, NY 10001', href: '#' },
            ].map(({ icon: Icon, title, value, sub, href }) => (
              <motion.a
                key={title}
                href={href}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex flex-col p-5 rounded-2xl group"
                style={{ background: '#f5f5f7', textDecoration: 'none', transition: 'box-shadow 0.2s, transform 0.2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: '#f0f7ff' }}>
                  <Icon size={18} style={{ color: '#0071e3' }} />
                </div>
                <div style={{ fontSize: '12px', fontWeight: 600, color: '#6e6e73', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>{title}</div>
                <div style={{ fontSize: '15px', fontWeight: 600, color: '#1d1d1f' }}>{value}</div>
                <div style={{ fontSize: '13px', color: '#6e6e73', marginTop: '2px' }}>{sub}</div>
              </motion.a>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Contact form */}
            <div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#1d1d1f', letterSpacing: '-0.025em', marginBottom: '24px' }}>Send us a message</h2>

              {sent ? (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ background: '#0071e3' }}>
                    <Check size={28} style={{ color: '#fff' }} />
                  </div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#1d1d1f', marginBottom: '8px' }}>Message Sent!</div>
                  <p style={{ fontSize: '15px', color: '#6e6e73' }}>We'll get back to you at {form.email} within 4 hours.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    {[{ k: 'name' as const, l: 'Full Name', p: 'John Doe', type: 'text' }, { k: 'email' as const, l: 'Email Address', p: 'john@example.com', type: 'email' }].map(({ k, l, p, type }) => (
                      <div key={k}>
                        <label style={{ fontSize: '13px', fontWeight: 500, color: '#1d1d1f', display: 'block', marginBottom: '6px' }}>{l}</label>
                        <input type={type} value={form[k]} onChange={set(k)} placeholder={p} required className="w-full px-4 py-3 rounded-xl outline-none" style={inputStyle(k)}
                          onFocus={() => setFocused(k)} onBlur={() => setFocused('')} />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label style={{ fontSize: '13px', fontWeight: 500, color: '#1d1d1f', display: 'block', marginBottom: '6px' }}>Subject</label>
                    <select value={form.subject} onChange={set('subject')} required className="w-full px-4 py-3 rounded-xl outline-none" style={inputStyle('subject')}
                      onFocus={() => setFocused('subject')} onBlur={() => setFocused('')}>
                      <option value="">Select a topic…</option>
                      <option>Product Inquiry</option>
                      <option>Order Status</option>
                      <option>Warranty Claim</option>
                      <option>Return Request</option>
                      <option>Technical Support</option>
                      <option>Financing Options</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: '13px', fontWeight: 500, color: '#1d1d1f', display: 'block', marginBottom: '6px' }}>Message</label>
                    <textarea value={form.message} onChange={set('message')} placeholder="Tell us how we can help…" required rows={5} className="w-full px-4 py-3 rounded-xl outline-none resize-none" style={inputStyle('message')}
                      onFocus={() => setFocused('message')} onBlur={() => setFocused('')} />
                  </div>
                  <button type="submit" className="px-6 py-3.5 rounded-full w-fit transition-colors" style={{ background: '#0071e3', color: '#fff', fontSize: '16px', fontWeight: 500 }}
                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = '#0077ed')}
                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = '#0071e3')}>
                    Send Message
                  </button>
                </form>
              )}
            </div>

            {/* Right panel */}
            <div className="flex flex-col gap-5">
              {/* Hours */}
              <div className="p-6 rounded-2xl" style={{ background: '#f5f5f7' }}>
                <div className="flex items-center gap-2 mb-4">
                  <Clock size={18} style={{ color: '#0071e3' }} />
                  <span style={{ fontSize: '15px', fontWeight: 600, color: '#1d1d1f' }}>Business Hours</span>
                </div>
                {[
                  { day: 'Monday – Friday', time: '9:00 AM – 6:00 PM EST' },
                  { day: 'Saturday', time: '10:00 AM – 4:00 PM EST' },
                  { day: 'Sunday', time: 'Closed' },
                ].map(({ day, time }) => (
                  <div key={day} className="flex items-center justify-between py-2" style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                    <span style={{ fontSize: '14px', color: '#6e6e73' }}>{day}</span>
                    <span style={{ fontSize: '14px', color: time === 'Closed' ? '#e53e3e' : '#1d1d1f', fontWeight: 500 }}>{time}</span>
                  </div>
                ))}
              </div>

              {/* FAQ shortcuts */}
              <div className="p-6 rounded-2xl" style={{ background: '#f5f5f7' }}>
                <div style={{ fontSize: '15px', fontWeight: 600, color: '#1d1d1f', marginBottom: '12px' }}>Quick Answers</div>
                {[
                  { q: 'How does the 12-month warranty work?', href: '/faq#warranty' },
                  { q: 'What are your shipping times?', href: '/faq#shipping' },
                  { q: 'How do I return a device?', href: '/faq#returns' },
                  { q: 'What does battery health percentage mean?', href: '/faq#battery' },
                ].map(({ q, href }) => (
                  <Link
                    key={q}
                    to={href}
                    className="flex items-center justify-between py-2.5 transition-colors"
                    style={{ borderBottom: '1px solid rgba(0,0,0,0.06)', textDecoration: 'none' }}
                  >
                    <span style={{ fontSize: '14px', color: '#1d1d1f' }}>{q}</span>
                    <ChevronRight size={14} style={{ color: '#6e6e73', flexShrink: 0 }} />
                  </Link>
                ))}
                <Link to="/faq" className="flex items-center gap-1 mt-3" style={{ fontSize: '14px', color: '#0071e3' }}>
                  View all FAQs <ChevronRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
