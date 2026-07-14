import { ArrowRight, Clock } from "lucide-react";
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { useNavigate } from "../router";
import { useApp } from "../store/AppContext";
import { PRODUCTS } from "../data/products";

function useCountdown(targetHours: number) {
  const [time, setTime] = useState({ h: targetHours, m: 59, s: 43 });
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => {
        let { h, m, s } = prev;
        if (s > 0) return { h, m, s: s - 1 };
        if (m > 0) return { h, m: m - 1, s: 59 };
        if (h > 0) return { h: h - 1, m: 59, s: 59 };
        return { h: 0, m: 0, s: 0 };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return time;
}

const dealProductIds = ["mbp-14-m3pro-18-512-sb-openbox", "mba-15-m3-16-256-midnight-likenew", "ipad-pro-11-m4-256-wifi-openbox"];

export function DealsBanner() {
  const time = useCountdown(11);
  const { addToCart } = useApp();
  const navigate = useNavigate();
  const [added, setAdded] = useState<Record<string, boolean>>({});

  const dealProducts = dealProductIds
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter(Boolean) as typeof PRODUCTS;

  function handleAddToCart(product: typeof PRODUCTS[0]) {
    addToCart(product);
    setAdded((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => setAdded((prev) => ({ ...prev, [product.id]: false })), 1800);
  }

  return (
    <section id="deals" style={{ background: "#1d1d1f", padding: "96px 0" }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-end justify-between gap-6 mb-12"
        >
          <div>
            <div
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full mb-4"
              style={{ background: "rgba(255,59,48,0.15)", color: "#ff453a", fontSize: "13px", fontWeight: 500 }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              Limited-Time Offers
            </div>
            <h2
              style={{
                fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                fontWeight: 700,
                color: "#fff",
                letterSpacing: "-0.025em",
                lineHeight: 1.1,
              }}
            >
              Today's Best Deals
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <Clock size={16} style={{ color: "#6e6e73" }} />
            <span style={{ fontSize: "14px", color: "#6e6e73" }}>Ends in</span>
            <div className="flex gap-2">
              {[{ val: time.h, label: "hr" }, { val: time.m, label: "min" }, { val: time.s, label: "sec" }].map(({ val, label }) => (
                <div key={label} className="flex flex-col items-center">
                  <div
                    className="w-12 h-10 flex items-center justify-center rounded-lg"
                    style={{ background: "rgba(255,255,255,0.08)", color: "#fff", fontSize: "18px", fontWeight: 700, fontVariantNumeric: "tabular-nums" }}
                  >
                    {String(val).padStart(2, "0")}
                  </div>
                  <div style={{ fontSize: "10px", color: "#6e6e73", marginTop: "3px" }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {dealProducts.map((deal, i) => {
            const savings = Math.round(((deal.originalPrice - deal.price) / deal.originalPrice) * 100);
            const isAdded = added[deal.id];
            return (
              <motion.div
                key={deal.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-2xl overflow-hidden cursor-pointer group"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", transition: "background 0.2s ease" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.1)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)")}
                onClick={() => navigate(`/product/${deal.id}`)}
              >
                <div className="overflow-hidden" style={{ aspectRatio: "16/10" }}>
                  <img src={deal.images[0]} alt={deal.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-5">
                  <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", marginBottom: "2px" }}>
                    {deal.chip}{deal.ram ? ` · ${deal.ram}GB` : ""}{deal.storage ? ` · ${deal.storage}GB` : ""} · {deal.condition.replace("-", " ")}
                  </div>
                  <div style={{ fontSize: "17px", fontWeight: 600, color: "#fff", marginBottom: "10px" }}>{deal.name}</div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span style={{ fontSize: "22px", fontWeight: 700, color: "#fff", letterSpacing: "-0.02em" }}>
                        ${deal.price.toLocaleString()}
                      </span>
                      <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.4)", marginLeft: "8px", textDecoration: "line-through" }}>
                        ${deal.originalPrice.toLocaleString()}
                      </span>
                    </div>
                    <span className="px-2.5 py-1 rounded-full" style={{ background: "rgba(255,59,48,0.2)", color: "#ff6b6b", fontSize: "12px", fontWeight: 600 }}>
                      -{savings}%
                    </span>
                  </div>
                  <button
                    className="mt-4 w-full py-2.5 rounded-full flex items-center justify-center gap-2 transition-all duration-200"
                    style={{ background: isAdded ? "#1a7f37" : "#0071e3", color: "#fff", fontSize: "15px", fontWeight: 500 }}
                    onClick={(e) => { e.stopPropagation(); handleAddToCart(deal); }}
                    onMouseEnter={(e) => { if (!isAdded) (e.currentTarget as HTMLElement).style.background = "#0077ed"; }}
                    onMouseLeave={(e) => { if (!isAdded) (e.currentTarget as HTMLElement).style.background = "#0071e3"; }}
                  >
                    {isAdded ? "Added!" : (<>Add to Cart <ArrowRight size={14} /></>)}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
