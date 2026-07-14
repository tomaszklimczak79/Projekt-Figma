import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, XCircle, Info, ShoppingBag, X } from 'lucide-react';
import type { ToastType } from '../utils/toast';

interface ToastItem {
  id: number;
  message: string;
  type: ToastType;
}

const ICONS = {
  success: CheckCircle2,
  error: XCircle,
  info: Info,
  cart: ShoppingBag,
};

const COLORS = {
  success: { bg: '#f0fff4', border: '#bbf7d0', icon: '#16a34a' },
  error: { bg: '#fff0f0', border: '#fecaca', icon: '#dc2626' },
  info: { bg: '#f0f7ff', border: '#bfdbfe', icon: '#0071e3' },
  cart: { bg: '#f0f7ff', border: '#bfdbfe', icon: '#0071e3' },
};

export function ToastContainer() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  useEffect(() => {
    const handler = (e: Event) => {
      const { id, message, type } = (e as CustomEvent).detail;
      setToasts(prev => [...prev, { id, message, type }]);
      setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500);
    };
    window.addEventListener('macoutlet-toast', handler);
    return () => window.removeEventListener('macoutlet-toast', handler);
  }, []);

  const dismiss = (id: number) => setToasts(prev => prev.filter(t => t.id !== id));

  return (
    <div className="fixed bottom-6 right-6 z-[300] flex flex-col gap-2 pointer-events-none" style={{ maxWidth: '360px' }}>
      <AnimatePresence>
        {toasts.map((t) => {
          const Icon = ICONS[t.type];
          const colors = COLORS[t.type];
          return (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 16, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={{ duration: 0.22 }}
              className="pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-2xl"
              style={{
                background: colors.bg,
                border: `1px solid ${colors.border}`,
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              }}
            >
              <Icon size={18} style={{ color: colors.icon, flexShrink: 0 }} />
              <span style={{ fontSize: '14px', fontWeight: 500, color: '#1d1d1f', flex: 1 }}>{t.message}</span>
              <button
                className="w-5 h-5 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(0,0,0,0.06)', flexShrink: 0 }}
                onClick={() => dismiss(t.id)}
              >
                <X size={10} style={{ color: '#6e6e73' }} />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
