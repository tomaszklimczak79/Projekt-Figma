import { motion } from 'motion/react';
import { Link } from '../router';
import { ShieldCheck, Zap, Leaf, Globe, Award, ChevronRight, Heart, Recycle, Sprout, Euro } from 'lucide-react';

const STATS = [
  { value: '15+', label: 'Years on the market' },
  { value: '12k+', label: 'Devices sold' },
  { value: '98%', label: 'Customer satisfaction' },
  { value: '12mo', label: 'Warranty on every device' },
];

const TEAM_VALUES = [
  {
    icon: Heart,
    title: 'Apple enthusiasts',
    body: "We're a team of genuine Apple fans. We use these products every day — that's why we know exactly what to look for when selecting devices for our customers.",
  },
  {
    icon: Globe,
    title: 'Sourced in the USA',
    body: 'Every device we sell is sourced from verified, trusted suppliers across the United States. We know where our stock comes from — and so will you.',
  },
  {
    icon: ShieldCheck,
    title: 'Expert technicians',
    body: 'Our certified technicians thoroughly test every device before it goes on sale. After testing, each device receives a detailed condition report — no surprises after purchase.',
  },
  {
    icon: Zap,
    title: 'We love to advise',
    body: 'With 15 years of experience, we know this ecosystem inside out. Not sure which MacBook or iPad is right for you? Just ask — we are happy to help you make the right choice.',
  },
  {
    icon: Award,
    title: 'Every grade, honestly described',
    body: 'From sealed-box new to Open Box and pre-owned Excellent — we sell across the full spectrum, always with complete transparency about the condition of every item.',
  },
  {
    icon: Leaf,
    title: 'Good for the planet',
    body: "Buying a certified pre-owned device keeps electronics out of landfill, reduces manufacturing demand, and saves you money. It's the smarter choice — for your wallet and for the Earth.",
  },
];

export function AboutPage() {
  return (
    <div style={{ paddingTop: '56px' }}>

      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: '#1d1d1f', padding: '96px 0 80px' }}>
        <div className="max-w-[900px] mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6" style={{ background: 'rgba(0,113,227,0.15)', color: '#0071e3', fontSize: '13px', fontWeight: 500 }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#0071e3' }} />
              Our story
            </div>
            <h1 style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)', fontWeight: 700, color: '#fff', letterSpacing: '-0.035em', lineHeight: 1.08, marginBottom: '20px' }}>
              Passionate about Apple.<br />Honest about everything else.
            </h1>
            <p style={{ fontSize: '19px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, maxWidth: '640px', margin: '0 auto 36px' }}>
              For over 15 years we have been connecting people with exceptional Apple devices — sourced carefully, tested rigorously, and sold transparently.
            </p>
            <Link to="/shop" className="inline-flex items-center gap-2 px-6 py-3 rounded-full" style={{ background: '#0071e3', color: '#fff', fontSize: '16px', fontWeight: 500 }}>
              Browse devices <ChevronRight size={16} />
            </Link>
          </motion.div>
        </div>

        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(0,113,227,0.12) 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(0,113,227,0.08) 0%, transparent 70%)', transform: 'translate(-30%, 30%)' }} />
      </section>

      {/* Stats */}
      <section style={{ background: '#fff', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
        <div className="max-w-[1200px] mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="text-center"
              >
                <div style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: '#0071e3', letterSpacing: '-0.03em', lineHeight: 1 }}>
                  {s.value}
                </div>
                <div style={{ fontSize: '14px', color: '#6e6e73', marginTop: '6px' }}>{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main story */}
      <section style={{ background: '#f5f5f7', padding: '96px 0' }}>
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div className="inline-block px-3 py-1 rounded-full mb-4" style={{ background: 'rgba(0,113,227,0.08)', color: '#0071e3', fontSize: '13px', fontWeight: 500 }}>
                Who we are
              </div>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', fontWeight: 700, color: '#1d1d1f', letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: '20px' }}>
                15 years of finding the perfect Apple device for the right person
              </h2>
              <div style={{ fontSize: '16px', color: '#6e6e73', lineHeight: 1.75 }} className="flex flex-col gap-4">
                <p>
                  MacOutlet was founded by a group of Apple enthusiasts who believed that everyone deserves access to great Apple hardware — without paying full retail price. What started as a passion project has grown into a trusted destination for thousands of customers across Europe.
                </p>
                <p>
                  We source our entire inventory from carefully vetted suppliers in the United States. Whether it is a sealed-box new device, an Open Box unit that was never truly used, or a pre-owned Mac in excellent condition — we know exactly where it came from and what it has been through.
                </p>
                <p>
                  Our speciality is pre-owned and Open Box Apple products. But we also occasionally carry brand-new, factory-sealed devices when we find exceptional value. Whatever we sell, we stand behind it with a <strong style={{ color: '#1d1d1f' }}>12-month warranty</strong>.
                </p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div className="relative rounded-3xl overflow-hidden" style={{ aspectRatio: '4/3' }}>
                <img
                  src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=900&h=675&fit=crop"
                  alt="MacBook on a desk"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom right, rgba(0,113,227,0.08), transparent)' }} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values grid */}
      <section style={{ background: '#fff', padding: '96px 0' }}>
        <div className="max-w-[1200px] mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-14 text-center">
            <div className="inline-block px-3 py-1 rounded-full mb-4" style={{ background: '#f5f5f7', color: '#6e6e73', fontSize: '13px', fontWeight: 500 }}>
              What sets us apart
            </div>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', fontWeight: 700, color: '#1d1d1f', letterSpacing: '-0.03em' }}>
              The MacOutlet difference
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEAM_VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="p-7 rounded-2xl"
                style={{ background: '#f5f5f7' }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: 'rgba(0,113,227,0.1)' }}>
                  <v.icon size={20} style={{ color: '#0071e3' }} />
                </div>
                <h3 style={{ fontSize: '17px', fontWeight: 600, color: '#1d1d1f', marginBottom: '10px' }}>{v.title}</h3>
                <p style={{ fontSize: '14px', color: '#6e6e73', lineHeight: 1.7 }}>{v.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technicians section */}
      <section style={{ background: '#f5f5f7', padding: '96px 0' }}>
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div className="relative rounded-3xl overflow-hidden" style={{ aspectRatio: '4/3' }}>
                <img
                  src="https://images.unsplash.com/photo-1692645214212-ea7fdb37ca6d?w=900&h=675&fit=crop"
                  alt="Technician carefully cleaning a MacBook"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div className="inline-block px-3 py-1 rounded-full mb-4" style={{ background: 'rgba(0,113,227,0.08)', color: '#0071e3', fontSize: '13px', fontWeight: 500 }}>
                Our technicians
              </div>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', fontWeight: 700, color: '#1d1d1f', letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: '20px' }}>
                No surprises. Every device tested, every detail documented.
              </h2>
              <p style={{ fontSize: '16px', color: '#6e6e73', lineHeight: 1.75, marginBottom: '28px' }}>
                Before any device reaches a customer, it goes through a rigorous inspection by our qualified technicians. We test every function — display, battery, keyboard, ports, camera, speakers — and document everything in a detailed condition report that goes with the device.
              </p>
              <p style={{ fontSize: '16px', color: '#6e6e73', lineHeight: 1.75, marginBottom: '32px' }}>
                That report is yours to keep. It tells you exactly what we found, what condition the device is in, and what battery health it has. You buy with full information — not hope.
              </p>
              <div className="flex flex-col gap-3">
                {[
                  'Display, battery & port testing',
                  'Full software diagnostics',
                  'Battery health & cycle count verified',
                  'Detailed written condition report included',
                ].map(item => (
                  <div key={item} className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#0071e3' }}>
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1.5 4L4 6.5L8.5 1.5" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                    <span style={{ fontSize: '15px', color: '#1d1d1f' }}>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Ecology section */}
      <section style={{ background: '#1d1d1f', padding: '96px 0' }}>
        <div className="max-w-[900px] mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ background: 'rgba(52,199,89,0.15)' }}>
              <Leaf size={28} style={{ color: '#34c759' }} />
            </div>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', fontWeight: 700, color: '#fff', letterSpacing: '-0.03em', marginBottom: '16px' }}>
              The greenest new Mac is one that already exists.
            </h2>
            <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, marginBottom: '40px' }}>
              Manufacturing a new device consumes enormous resources. By choosing a certified pre-owned Mac — tested by our technicians, backed by a 12-month warranty, and in excellent working condition — you give a device a second life, reduce electronic waste, and save money. It is the smarter choice for you and for the planet.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { Icon: Recycle, title: 'Circular economy', desc: 'Every device we sell is one less device in a landfill.' },
                { Icon: Sprout, title: 'Lower carbon footprint', desc: 'No new manufacturing means significantly fewer emissions.' },
                { Icon: Euro, title: 'Save up to 40%', desc: 'Premium Apple quality at a fraction of the retail price.' },
              ].map(item => (
                <div key={item.title} className="p-6 rounded-2xl text-left" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: 'rgba(52,199,89,0.15)' }}>
                    <item.Icon size={20} style={{ color: '#34c759' }} />
                  </div>
                  <div style={{ fontSize: '15px', fontWeight: 600, color: '#fff', marginBottom: '6px' }}>{item.title}</div>
                  <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: '#fff', padding: '80px 0' }}>
        <div className="max-w-[700px] mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 700, color: '#1d1d1f', letterSpacing: '-0.025em', marginBottom: '12px' }}>
              Ready to find your next Apple device?
            </h2>
            <p style={{ fontSize: '16px', color: '#6e6e73', marginBottom: '28px' }}>
              Browse our curated selection or reach out — we are always happy to advise.
            </p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <Link to="/shop" className="inline-flex items-center gap-2 px-6 py-3 rounded-full" style={{ background: '#0071e3', color: '#fff', fontSize: '15px', fontWeight: 500 }}>
                Browse all devices <ChevronRight size={15} />
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-full" style={{ background: '#f5f5f7', color: '#1d1d1f', fontSize: '15px', fontWeight: 500 }}>
                Contact us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
