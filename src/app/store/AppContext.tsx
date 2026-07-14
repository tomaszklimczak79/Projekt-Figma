import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import type { Product } from '../data/products';
import { toast } from '../utils/toast';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface AppState {
  cart: CartItem[];
  wishlist: string[];
  recentlyViewed: string[];
  compareList: string[];
  cartOpen: boolean;
}

interface AppActions {
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  addRecentlyViewed: (productId: string) => void;
  toggleCompare: (productId: string) => void;
  isInCompare: (productId: string) => boolean;
  clearCompare: () => void;
  setCartOpen: (open: boolean) => void;
  cartTotal: number;
  cartCount: number;
}

const AppContext = createContext<AppState & AppActions | null>(null);

function loadStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => loadStorage('macoutlet_cart', []));
  const [wishlist, setWishlist] = useState<string[]>(() => loadStorage('macoutlet_wishlist', []));
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>(() => loadStorage('macoutlet_recent', []));
  const [compareList, setCompareList] = useState<string[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    try { localStorage.setItem('macoutlet_cart', JSON.stringify(cart)); } catch {}
  }, [cart]);

  useEffect(() => {
    try { localStorage.setItem('macoutlet_wishlist', JSON.stringify(wishlist)); } catch {}
  }, [wishlist]);

  useEffect(() => {
    try { localStorage.setItem('macoutlet_recent', JSON.stringify(recentlyViewed)); } catch {}
  }, [recentlyViewed]);

  const addToCart = useCallback((product: Product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(i => i.product.id === product.id);
      if (existing) {
        return prev.map(i => i.product.id === product.id ? { ...i, quantity: i.quantity + quantity } : i);
      }
      return [...prev, { product, quantity }];
    });
    setCartOpen(true);
    toast(`${product.shortName} added to cart`, 'cart');
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCart(prev => prev.filter(i => i.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) { removeFromCart(productId); return; }
    setCart(prev => prev.map(i => i.product.id === productId ? { ...i, quantity } : i));
  }, [removeFromCart]);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleWishlist = useCallback((productId: string) => {
    setWishlist(prev => {
      if (prev.includes(productId)) {
        toast('Removed from wishlist', 'info');
        return prev.filter(id => id !== productId);
      }
      toast('Saved to wishlist', 'success');
      return [...prev, productId];
    });
  }, []);

  const isInWishlist = useCallback((productId: string) => wishlist.includes(productId), [wishlist]);

  const addRecentlyViewed = useCallback((productId: string) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(id => id !== productId);
      return [productId, ...filtered].slice(0, 8);
    });
  }, []);

  const toggleCompare = useCallback((productId: string) => {
    setCompareList(prev => {
      if (prev.includes(productId)) return prev.filter(id => id !== productId);
      if (prev.length >= 3) { toast('Max 3 products can be compared', 'info'); return prev; }
      return [...prev, productId];
    });
  }, []);

  const isInCompare = useCallback((productId: string) => compareList.includes(productId), [compareList]);
  const clearCompare = useCallback(() => setCompareList([]), []);

  const cartTotal = cart.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <AppContext.Provider value={{
      cart, wishlist, recentlyViewed, compareList, cartOpen,
      addToCart, removeFromCart, updateQuantity, clearCart,
      toggleWishlist, isInWishlist,
      addRecentlyViewed,
      toggleCompare, isInCompare, clearCompare,
      setCartOpen, cartTotal, cartCount,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
