export type ToastType = 'success' | 'error' | 'info' | 'cart';

export function toast(message: string, type: ToastType = 'success') {
  window.dispatchEvent(new CustomEvent('macoutlet-toast', { detail: { message, type, id: Date.now() } }));
}
