export function go(path: string) {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
}

export function openCart() {
  window.dispatchEvent(new CustomEvent('macoutlet:open-cart'));
}

export function getCartCount(): number {
  try {
    const raw = localStorage.getItem('macoutlet-cart');
    if (!raw) return 0;
    const items = JSON.parse(raw) as Array<{ quantity: number }>;
    return items.reduce((s, i) => s + i.quantity, 0);
  } catch {
    return 0;
  }
}
