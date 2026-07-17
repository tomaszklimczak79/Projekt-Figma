import { useParams, Link } from '../router';
import { ChevronRight, ShieldCheck, Zap, BatteryCharging, SlidersHorizontal, X, Search, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ProductCard } from '../components/ProductCard';
import { Newsletter } from '../components/Newsletter';
import { PRODUCTS, CATEGORY_META, type Category, type Condition, CONDITION_LABELS } from '../data/products';
import { useState, useMemo } from 'react';

const SLUG_TO_CATEGORY: Record<string, Category> = {
  macbooks: 'macbook',
  ipads: 'ipad',
  imacs: 'imac',
  accessories: 'accessory',
  iphones: 'iphone',
};

const GUIDES: Record<string, { title: string; points: string[] }[]> = {
  macbook: [
    { title: 'Which MacBook is right for me?', points: ['MacBook Air for everyday tasks, students, travel', 'MacBook Pro 14" for power users and developers', 'MacBook Pro 16" for video editors and 3D artists'] },
    { title: 'Understanding condition grades', points: ['Open Box: never truly used, like buying new', 'Like New: minimal use, no cosmetic marks', 'Excellent: light use, minor marks, perfect function'] },
  ],
  ipad: [
    { title: 'iPad comparison guide', points: ['iPad Pro for creative professionals and power users', 'iPad Air for the best balance of price and performance', 'Standard iPad for casual browsing and media consumption'] },
    { title: 'Connectivity options', points: ['Wi-Fi only: cheaper, relies on home/office networks', 'Wi-Fi + Cellular: internet anywhere with a SIM card'] },
  ],
  imac: [
    { title: 'Why choose an iMac?', points: ['All-in-one saves desk space', '4.5K Retina display included', 'Perfect for home offices and creative studios'] },
  ],
};

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'savings' | 'rating' | 'newest';

const CHIPS = ['M4', 'M3 Max', 'M3 Pro', 'M3', 'M2 Pro', 'M2', 'M1', 'A17 Pro', 'H2'];
const RAMS = [8, 16, 18, 24, 32, 48];
const STORAGES = [256, 512, 1000, 2000];
const CONDITIONS: Condition[] = ['open-box', 'like-new', 'excellent', 'good'];

function FilterCheckbox({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer py-1">
      <div
        className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0 transition-colors"
        style={{ background: checked ? '#0071e3' : '#fff', border: checked ? '1.5px solid #0071e3' : '1.5px solid rgba(0,0,0,0.2)' }}
        onClick={onChange}
      >
        {checked && <svg width="9" height="7" viewBox="0 0 9 7" fill="none"><path d="M1 3.5L3.5 6L8 1" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>}
      </div>
      <span style={{ fontSize: '14px', color: '#1d1d1f' }}>{label}</span>
    </label>
  );
}

function RangeSlider({ min, max, value, onChange }: { min: number; max: number; value: [number, number]; onChange: (v: [number, number]) => void }) {
  const pct = (v: number) => ((v - min) / (max - min)) * 100;
  return (
    <div className="mt-3">
      <div className="flex justify-between mb-2">
        <span style={{ fontSize: '13px', color: '#6e6e73' }}>${value[0].toLocaleString()}</span>
        <span style={{ fontSize: '13px', color: '#6e6e73' }}>${value[1].toLocaleString()}</span>
      </div>
      <div className="relative h-1 rounded-full" style={{ background: '#e5e5e5' }}>
        <div className="absolute h-1 rounded-full" style={{ background: '#0071e3', left: `${pct(value[0])}%`, right: `${100 - pct(value[1])}%` }} />
        <input
          type="range" min={min} max={max} step={50} value={value[0]}
          onChange={e => { const v = Number(e.target.value); if (v < value[1]) onChange([v, value[1]]); }}
          className="absolute inset-0 w-full opacity-0 cursor-pointer"
        />
        <input
          type="range" min={min} max={max} step={50} value={value[1]}
          onChange={e => { const v = Number(e.target.value); if (v > value[0]) onChange([value[0], v]); }}
          className="absolute inset-0 w-full opacity-0 cursor-pointer"
        />
      </div>
    </div>
  );
}

export function CategoryPage() {
  const { slug = '' } = useParams();
  const categoryKey = SLUG_TO_CATEGORY[slug] || (slug as Category);
  const meta = CATEGORY_META[categoryKey];
  const guides = GUIDES[categoryKey] || [];

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 4500]);
  const [selectedConditions, setSelectedConditions] = useState<Set<Condition>>(new Set());
  const [selectedChips, setSelectedChips] = useState<Set<string>>(new Set());
  const [selectedRam, setSelectedRam] = useState<Set<number>>(new Set());
  const [selectedStorage, setSelectedStorage] = useState<Set<number>>(new Set());
  const [searchQ, setSearchQ] = useState('');

  const toggleSet = <T,>(set: Set<T>, value: T): Set<T> => {
    const next = new Set(set);
    next.has(value) ? next.delete(value) : next.add(value);
    return next;
  };

  const activeFilters = selectedConditions.size + selectedChips.size + selectedRam.size + selectedStorage.size +
    (priceRange[0] > 0 || priceRange[1] < 4500 ? 1 : 0);

  const clearFilters = () => {
    setSelectedConditions(new Set());
    setSelectedChips(new Set());
    setSelectedRam(new Set());
    setSelectedStorage(new Set());
    setPriceRange([0, 4500]);
    setSearchQ('');
  };

  const filtered = useMemo(() => {
    let pool = PRODUCTS.filter(p => p.category === categoryKey);
    if (searchQ) pool = pool.filter(p => p.name.toLowerCase().includes(searchQ.toLowerCase()) || p.shortName.toLowerCase().includes(searchQ.toLowerCase()));
    if (priceRange[0] > 0 || priceRange[1] < 4500) pool = pool.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
    if (selectedConditions.size) pool = pool.filter(p => selectedConditions.has(p.condition));
    if (selectedChips.size) pool = pool.filter(p => selectedChips.has(p.chip));
    if (selectedRam.size) pool = pool.filter(p => p.ram && selectedRam.has(p.ram));
    if (selectedStorage.size) pool = pool.filter(p => p.storage && selectedStorage.has(p.storage));

    return [...pool].sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'savings') return (b.originalPrice - b.price) / b.originalPrice - (a.originalPrice - a.price) / a.originalPrice;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return b.year - a.year;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [categoryKey, searchQ, priceRange, selectedConditions, selectedChips, selectedRam, selectedStorage, sortBy]);

  if (!meta) {
    return (
      <div className="pt-32 pb-16 text-center">
        <h1 style={{ fontSize: '2rem', color: '#1d1d1f' }}>Category not found</h1>
        <Link to="/shop" style={{ color: '#0071e3' }}>Browse all products</Link>
      </div>
    );
  }

  const FilterPanel = () => (
    <div className="flex flex-col gap-6">
      <div>
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#6e6e73' }} />
          <input
            value={searchQ}
            onChange={e => setSearchQ(e.target.value)}
            placeholder="Search products…"
            className="w-full pl-9 pr-4 py-2.5 rounded-xl outline-none"
            style={{ background: '#f5f5f7', fontSize: '14px', color: '#1d1d1f', border: '1.5px solid transparent' }}
            onFocus={(e) => (e.currentTarget.style.borderColor = '#0071e3')}
            onBlur={(e) => (e.currentTarget.style.borderColor = 'transparent')}
          />
        </div>
      </div>
      <div>
        <div style={{ fontSize: '13px', fontWeight: 600, color: '#1d1d1f', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '4px' }}>Price</div>
        <RangeSlider min={0} max={4500} value={priceRange} onChange={setPriceRange} />
      </div>
      <div>
        <div style={{ fontSize: '13px', fontWeight: 600, color: '#1d1d1f', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '4px' }}>Condition</div>
        {CONDITIONS.map(c => (
          <FilterCheckbox key={c} label={CONDITION_LABELS[c]} checked={selectedConditions.has(c)} onChange={() => setSelectedConditions(s => toggleSet(s, c))} />
        ))}
      </div>
      <div>
        <div style={{ fontSize: '13px', fontWeight: 600, color: '#1d1d1f', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '4px' }}>Processor</div>
        {CHIPS.map(c => (
          <FilterCheckbox key={c} label={c} checked={selectedChips.has(c)} onChange={() => setSelectedChips(s => toggleSet(s, c))} />
        ))}
      </div>
      {(categoryKey === 'macbook' || categoryKey === 'imac') && (
        <div>
          <div style={{ fontSize: '13px', fontWeight: 600, color: '#1d1d1f', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '4px' }}>RAM</div>
          {RAMS.map(r => (
            <FilterCheckbox key={r} label={`${r}GB`} checked={selectedRam.has(r)} onChange={() => setSelectedRam(s => toggleSet(s, r))} />
          ))}
        </div>
      )}
      <div>
        <div style={{ fontSize: '13px', fontWeight: 600, color: '#1d1d1f', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '4px' }}>Storage</div>
        {STORAGES.map(s => (
          <FilterCheckbox key={s} label={s >= 1000 ? `${s / 1000}TB` : `${s}GB`} checked={selectedStorage.has(s)} onChange={() => setSelectedStorage(st => toggleSet(st, s))} />
        ))}
      </div>
      {activeFilters > 0 && (
        <button onClick={clearFilters} className="flex items-center gap-2 py-2.5 px-4 rounded-full justify-center" style={{ background: '#fff3f3', color: '#e53e3e', fontSize: '13px', fontWeight: 500 }}>
          <X size={13} /> Clear all filters ({activeFilters})
        </button>
      )}
    </div>
  );

  return (
    <>
      <section className="relative overflow-hidden" style={{ paddingTop: '56px' }}>
        <div className="relative h-64 md:h-80 overflow-hidden">
          <img src={meta.image} alt={meta.label} className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)' }} />
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-[1200px] mx-auto px-6 w-full">
              <div className="flex items-center gap-2 mb-3">
                <Link to="/" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)' }}>Home</Link>
                <ChevronRight size={12} style={{ color: 'rgba(255,255,255,0.4)' }} />
                <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.9)' }}>{meta.label}</span>
              </div>
              <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
                {meta.label}
              </h1>
              <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.8)', marginTop: '8px', maxWidth: '400px' }}>
                {meta.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: '#fff', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
        <div className="max-w-[1200px] mx-auto px-6 py-8">
          <div className="grid grid-cols-3 gap-6">
            {[
              { icon: ShieldCheck, text: '12-Month Warranty on every device' },
              { icon: Zap, text: 'Tested & certified by our in-house team' },
              { icon: BatteryCharging, text: 'Battery health verified & guaranteed' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <Icon size={18} style={{ color: '#0071e3', flexShrink: 0 }} />
                <span style={{ fontSize: '14px', color: '#1d1d1f' }}>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: '#f5f5f7', padding: '48px 0' }}>
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#1d1d1f', letterSpacing: '-0.025em' }}>
                {filtered.length} {meta.label} available
              </h2>
              <p style={{ fontSize: '14px', color: '#6e6e73', marginTop: '2px' }}>All certified, tested, and warranted.</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                className="flex items-center gap-2 px-4 py-2.5 rounded-full lg:hidden"
                style={{ background: '#0071e3', fontSize: '14px', color: '#fff', fontWeight: 500 }}
                onClick={() => setMobileFiltersOpen(true)}
              >
                <SlidersHorizontal size={15} /> Filters
                {activeFilters > 0 && <span className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: '#fff', color: '#0071e3', fontSize: '11px', fontWeight: 600 }}>{activeFilters}</span>}
              </button>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value as SortOption)}
                  className="appearance-none pr-8 pl-4 py-2.5 rounded-full outline-none cursor-pointer"
                  style={{ background: '#fff', fontSize: '14px', color: '#1d1d1f', border: '1px solid rgba(0,0,0,0.1)' }}
                >
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="savings">Best Savings</option>
                  <option value="rating">Top Rated</option>
                  <option value="newest">Newest</option>
                </select>
                <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: '#6e6e73' }} />
              </div>
            </div>
          </div>

          {activeFilters > 0 && (
            <div className="flex gap-2 flex-wrap mb-5">
              {[...selectedConditions].map(c => (
                <button key={c} onClick={() => setSelectedConditions(s => toggleSet(s, c))} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ background: '#fff', color: '#0071e3', fontSize: '12px', border: '1px solid #0071e3' }}>
                  {CONDITION_LABELS[c]} <X size={11} />
                </button>
              ))}
              {[...selectedChips].map(c => (
                <button key={c} onClick={() => setSelectedChips(s => toggleSet(s, c))} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ background: '#fff', color: '#0071e3', fontSize: '12px', border: '1px solid #0071e3' }}>
                  {c} <X size={11} />
                </button>
              ))}
              {[...selectedRam].map(r => (
                <button key={r} onClick={() => setSelectedRam(s => toggleSet(s, r))} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ background: '#fff', color: '#0071e3', fontSize: '12px', border: '1px solid #0071e3' }}>
                  {r}GB RAM <X size={11} />
                </button>
              ))}
              {[...selectedStorage].map(s => (
                <button key={s} onClick={() => setSelectedStorage(st => toggleSet(st, s))} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ background: '#fff', color: '#0071e3', fontSize: '12px', border: '1px solid #0071e3' }}>
                  {s >= 1000 ? `${s / 1000}TB` : `${s}GB`} <X size={11} />
                </button>
              ))}
            </div>
          )}

          <div className="flex gap-8 items-start">
            <aside
              className="hidden lg:block flex-shrink-0 sticky top-20"
              style={{ width: '260px', background: '#fff', borderRadius: '16px', padding: '24px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
            >
              <div className="flex items-center justify-between mb-5">
                <span style={{ fontSize: '15px', fontWeight: 600, color: '#1d1d1f' }}>Filters</span>
                {activeFilters > 0 && (
                  <button onClick={clearFilters} style={{ fontSize: '12px', color: '#0071e3', fontWeight: 500 }}>Clear all</button>
                )}
              </div>
              <FilterPanel />
            </aside>

            <div className="flex-1 min-w-0">
              {filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4" style={{ background: '#fff' }}>
                    <Search size={28} style={{ color: '#6e6e73' }} />
                  </div>
                  <div style={{ fontSize: '20px', fontWeight: 600, color: '#1d1d1f', marginBottom: '8px' }}>No products found</div>
                  <div style={{ fontSize: '15px', color: '#6e6e73', marginBottom: '20px' }}>Try adjusting your filters</div>
                  <button onClick={clearFilters} className="px-5 py-2.5 rounded-full" style={{ background: '#0071e3', color: '#fff', fontSize: '15px' }}>
                    Clear filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {filtered.map((product, i) => (
                    <ProductCard key={product.id} product={product} index={i} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {mobileFiltersOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 lg:hidden"
              style={{ background: 'rgba(0,0,0,0.4)' }}
              onClick={() => setMobileFiltersOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }}
              className="fixed right-0 top-0 bottom-0 w-full sm:w-96 z-50 flex flex-col lg:hidden"
              style={{ background: '#fff', boxShadow: '-4px 0 24px rgba(0,0,0,0.15)' }}
            >
              <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: 'rgba(0,0,0,0.08)' }}>
                <span style={{ fontSize: '17px', fontWeight: 600, color: '#1d1d1f' }}>Filters</span>
                <button onClick={() => setMobileFiltersOpen(false)} className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: '#f5f5f7' }}>
                  <X size={16} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto px-6 py-6">
                <FilterPanel />
              </div>
              <div className="px-6 py-4 border-t" style={{ borderColor: 'rgba(0,0,0,0.08)' }}>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="w-full py-3 rounded-full"
                  style={{ background: '#0071e3', color: '#fff', fontSize: '15px', fontWeight: 500 }}
                >
                  Show {filtered.length} results
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {guides.length > 0 && (
        <section style={{ background: '#fff', padding: '64px 0' }}>
          <div className="max-w-[1200px] mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="inline-block px-3 py-1 rounded-full mb-3" style={{ background: '#f5f5f7', color: '#6e6e73', fontSize: '13px', fontWeight: 500 }}>
                Buying Guide
              </div>
              <h2 style={{ fontSize: '2rem', fontWeight: 700, color: '#1d1d1f', letterSpacing: '-0.025em', marginBottom: '32px' }}>
                Everything you need to know
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {guides.map((guide, i) => (
                <motion.div
                  key={guide.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 rounded-2xl"
                  style={{ background: '#f5f5f7' }}
                >
                  <h3 style={{ fontSize: '17px', fontWeight: 600, color: '#1d1d1f', marginBottom: '12px' }}>{guide.title}</h3>
                  <ul className="flex flex-col gap-2">
                    {guide.points.map(p => (
                      <li key={p} className="flex items-start gap-2.5">
                        <span className="w-4 h-4 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0" style={{ background: '#0071e3' }}>
                          <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1.5 4L3.5 6L6.5 2" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </span>
                        <span style={{ fontSize: '14px', color: '#6e6e73', lineHeight: 1.6 }}>{p}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section style={{ background: '#1d1d1f', padding: '64px 0' }}>
        <div className="max-w-[900px] mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4" style={{ background: 'rgba(0,113,227,0.15)', color: '#0071e3', fontSize: '13px', fontWeight: 500 }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#0071e3' }} />
              Price Match Guarantee
            </div>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 700, color: '#fff', letterSpacing: '-0.025em', marginBottom: '12px' }}>
              Found it cheaper? We'll match it.
            </h2>
            <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.6)', marginBottom: '28px' }}>
              If you find the same {meta.label.toLowerCase().slice(0, -1)} in the same condition cheaper, contact us and we'll price-match it.
            </p>
            <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-full" style={{ background: '#0071e3', color: '#fff', fontSize: '16px', fontWeight: 500 }}>
              Contact Us <ChevronRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      <Newsletter />
    </>
  );
}