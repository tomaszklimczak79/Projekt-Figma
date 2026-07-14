import { useState, useMemo } from 'react';
import { useParams, useLocation, Link } from '../router';
import { SlidersHorizontal, ChevronDown, X, Search, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ProductCard } from '../components/ProductCard';
import { PRODUCTS, type Category, type Condition, CONDITION_LABELS, CATEGORY_META } from '../data/products';

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

export function ProductListingPage() {
  const { category } = useParams();
  const { search } = useLocation();
  const qParam = new URLSearchParams(search).get('q') || '';

  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 4500]);
  const [selectedConditions, setSelectedConditions] = useState<Set<Condition>>(new Set());
  const [selectedChips, setSelectedChips] = useState<Set<string>>(new Set());
  const [selectedRam, setSelectedRam] = useState<Set<number>>(new Set());
  const [selectedStorage, setSelectedStorage] = useState<Set<number>>(new Set());
  const [searchQ, setSearchQ] = useState(qParam);

  const toggleSet = <T,>(set: Set<T>, value: T): Set<T> => {
    const next = new Set(set);
    next.has(value) ? next.delete(value) : next.add(value);
    return next;
  };

  const activeFilters = selectedConditions.size + selectedChips.size + selectedRam.size + selectedStorage.size +
    (priceRange[0] > 0 || priceRange[1] < 4500 ? 1 : 0);

  const clearFilters = () => {
    setSelectedConditions(new Set()); setSelectedChips(new Set());
    setSelectedRam(new Set()); setSelectedStorage(new Set());
    setPriceRange([0, 4500]); setSearchQ('');
  };

  const filtered = useMemo(() => {
    let pool = category ? PRODUCTS.filter(p => p.category === (category as Category)) : PRODUCTS;
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
  }, [category, searchQ, priceRange, selectedConditions, selectedChips, selectedRam, selectedStorage, sortBy]);

  const meta = category ? CATEGORY_META[category] : null;
  const pageTitle = meta ? meta.label : 'All Products';

  const FilterPanel = () => (
    <div className="flex flex-col gap-6">
      {/* Search */}
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

      {/* Price */}
      <div>
        <div style={{ fontSize: '13px', fontWeight: 600, color: '#1d1d1f', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '4px' }}>Price</div>
        <RangeSlider min={0} max={4500} value={priceRange} onChange={setPriceRange} />
      </div>

      {/* Condition */}
      <div>
        <div style={{ fontSize: '13px', fontWeight: 600, color: '#1d1d1f', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '4px' }}>Condition</div>
        {CONDITIONS.map(c => (
          <FilterCheckbox key={c} label={CONDITION_LABELS[c]} checked={selectedConditions.has(c)} onChange={() => setSelectedConditions(s => toggleSet(s, c))} />
        ))}
      </div>

      {/* Chip */}
      <div>
        <div style={{ fontSize: '13px', fontWeight: 600, color: '#1d1d1f', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '4px' }}>Processor</div>
        {CHIPS.map(c => (
          <FilterCheckbox key={c} label={c} checked={selectedChips.has(c)} onChange={() => setSelectedChips(s => toggleSet(s, c))} />
        ))}
      </div>

      {/* RAM */}
      {(!category || category === 'macbook' || category === 'imac') && (
        <div>
          <div style={{ fontSize: '13px', fontWeight: 600, color: '#1d1d1f', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '4px' }}>RAM</div>
          {RAMS.map(r => (
            <FilterCheckbox key={r} label={`${r}GB`} checked={selectedRam.has(r)} onChange={() => setSelectedRam(s => toggleSet(s, r))} />
          ))}
        </div>
      )}

      {/* Storage */}
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
    <div style={{ paddingTop: '56px', background: '#fff', minHeight: '100vh' }}>
      {/* Header */}
      {meta?.image ? (
        <div className="relative overflow-hidden" style={{ height: '220px' }}>
          <img src={meta.image} alt={meta.label} className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)' }} />
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-[1200px] mx-auto px-6 w-full">
              <div className="flex items-center gap-2 mb-3">
                <Link to="/" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)' }}>Home</Link>
                <ChevronRight size={12} style={{ color: 'rgba(255,255,255,0.4)' }} />
                <Link to="/shop" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)' }}>Shop</Link>
                <ChevronRight size={12} style={{ color: 'rgba(255,255,255,0.4)' }} />
                <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.9)' }}>{pageTitle}</span>
              </div>
              <h1 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 700, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
                {pageTitle}
              </h1>
              <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.75)', marginTop: '6px' }}>
                {filtered.length} certified {filtered.length === 1 ? 'device' : 'devices'} available
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ background: '#f5f5f7', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
          <div className="max-w-[1200px] mx-auto px-6 py-8">
            <div className="flex items-center gap-2 mb-3">
              <Link to="/" style={{ fontSize: '13px', color: '#6e6e73' }}>Home</Link>
              <ChevronRight size={12} style={{ color: '#6e6e73' }} />
              <span style={{ fontSize: '13px', color: '#1d1d1f' }}>{pageTitle}</span>
            </div>
            <h1 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 700, color: '#1d1d1f', letterSpacing: '-0.025em' }}>
              {pageTitle}
            </h1>
            <p style={{ fontSize: '15px', color: '#6e6e73', marginTop: '4px' }}>
              {filtered.length} certified {filtered.length === 1 ? 'device' : 'devices'} available
            </p>
          </div>
        </div>
      )}

      <div className="max-w-[1200px] mx-auto px-6 py-8">
        {/* Toolbar */}
        <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
          <button
            className="flex items-center gap-2 px-4 py-2.5 rounded-full transition-colors"
            style={{ background: filtersOpen ? '#1d1d1f' : '#f5f5f7', fontSize: '14px', color: filtersOpen ? '#fff' : '#1d1d1f' }}
            onClick={() => setFiltersOpen(!filtersOpen)}
          >
            <SlidersHorizontal size={15} /> Filters
            {activeFilters > 0 && <span className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: '#0071e3', color: '#fff', fontSize: '11px' }}>{activeFilters}</span>}
          </button>

          {/* Active filter chips */}
          <div className="flex gap-2 flex-wrap flex-1">
            {[...selectedConditions].map(c => (
              <button key={c} onClick={() => setSelectedConditions(s => toggleSet(s, c))} className="flex items-center gap-1.5 px-3 py-1 rounded-full" style={{ background: '#f0f7ff', color: '#0071e3', fontSize: '12px' }}>
                {CONDITION_LABELS[c]} <X size={11} />
              </button>
            ))}
            {[...selectedChips].map(c => (
              <button key={c} onClick={() => setSelectedChips(s => toggleSet(s, c))} className="flex items-center gap-1.5 px-3 py-1 rounded-full" style={{ background: '#f0f7ff', color: '#0071e3', fontSize: '12px' }}>
                {c} <X size={11} />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <span style={{ fontSize: '13px', color: '#6e6e73' }}>Sort by:</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as SortOption)}
                className="appearance-none pr-8 pl-4 py-2 rounded-full outline-none cursor-pointer"
                style={{ background: '#f5f5f7', fontSize: '14px', color: '#1d1d1f', border: 'none' }}
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

        {/* Filter drawer — overlays content on all screen sizes */}
        <AnimatePresence>
          {filtersOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50"
              style={{ background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(2px)' }}
              onClick={() => setFiltersOpen(false)}
            >
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'tween', duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="absolute left-0 top-0 bottom-0 overflow-y-auto p-6"
                style={{ background: '#fff', width: 'min(320px, 85vw)', boxShadow: '4px 0 32px rgba(0,0,0,0.12)' }}
                onClick={e => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <span style={{ fontSize: '17px', fontWeight: 600, color: '#1d1d1f' }}>Filters</span>
                  <div className="flex items-center gap-3">
                    {activeFilters > 0 && (
                      <button onClick={clearFilters} style={{ fontSize: '13px', color: '#0071e3' }}>Clear all ({activeFilters})</button>
                    )}
                    <button onClick={() => setFiltersOpen(false)} className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: '#f5f5f7' }}>
                      <X size={15} style={{ color: '#1d1d1f' }} />
                    </button>
                  </div>
                </div>
                <FilterPanel />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Product grid — always full width */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4" style={{ background: '#f5f5f7' }}>
              <Search size={28} style={{ color: '#6e6e73' }} />
            </div>
            <div style={{ fontSize: '20px', fontWeight: 600, color: '#1d1d1f', marginBottom: '8px' }}>No products found</div>
            <div style={{ fontSize: '15px', color: '#6e6e73', marginBottom: '20px' }}>Try adjusting your filters or search query</div>
            <button onClick={clearFilters} className="px-5 py-2.5 rounded-full" style={{ background: '#0071e3', color: '#fff', fontSize: '15px' }}>
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
