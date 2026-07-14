import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { useNavigate } from "../router";

export function HeroSection() {
  const navigate = useNavigate();

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "#f5f5f7", minHeight: "100svh", display: "flex", alignItems: "center" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 60% at 60% 40%, rgba(0,113,227,0.06) 0%, transparent 70%)" }}
      />

      <div className="max-w-[1200px] mx-auto px-6 w-full pt-24 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6"
            style={{ background: "rgba(0,113,227,0.1)", color: "#0071e3", fontSize: "13px", fontWeight: 500 }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#0071e3" }} />
            Certified Pre-Owned & Open-Box
          </div>

          <h1
            className="mb-5"
            style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", fontWeight: 700, color: "#1d1d1f", lineHeight: 1.08, letterSpacing: "-0.03em" }}
          >
            Premium Apple Devices
            <br />
            <span style={{ color: "#0071e3" }}>at Better Prices</span>
          </h1>

          <p className="mb-8 max-w-md" style={{ fontSize: "19px", color: "#6e6e73", lineHeight: 1.6, fontWeight: 400 }}>
            Every device certified, tested, and backed by a 12-month warranty.
            MacBooks, iPads, and iMacs — like new, priced differently.
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-200"
              style={{ background: "#0071e3", color: "#fff", fontSize: "17px", fontWeight: 500, letterSpacing: "-0.01em", border: "none", cursor: "pointer" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#0077ed")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#0071e3")}
              onClick={() => navigate("/category/macbook")}
            >
              Browse MacBooks
              <ArrowRight size={16} />
            </button>
            <button
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-200"
              style={{ background: "rgba(0,0,0,0.06)", color: "#1d1d1f", fontSize: "17px", fontWeight: 500, letterSpacing: "-0.01em", border: "none", cursor: "pointer" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0.1)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0.06)")}
              onClick={() => navigate("/shop")}
            >
              Current Deals
            </button>
          </div>

          <div className="mt-12 flex gap-8 flex-wrap">
            {[
              { value: "2,400+", label: "Devices sold" },
              { value: "4.9★", label: "Average rating" },
              { value: "12mo", label: "Warranty" },
            ].map((stat) => (
              <div key={stat.label}>
                <div style={{ fontSize: "22px", fontWeight: 600, color: "#1d1d1f", letterSpacing: "-0.02em" }}>{stat.value}</div>
                <div style={{ fontSize: "13px", color: "#6e6e73", marginTop: "2px" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative flex items-center justify-center"
        >
          <div className="relative w-full" style={{ maxWidth: "580px", margin: "0 auto" }}>
            <div
              className="absolute inset-0 rounded-3xl pointer-events-none"
              style={{ background: "radial-gradient(ellipse 70% 50% at 50% 55%, rgba(0,113,227,0.12) 0%, transparent 70%)", transform: "scale(1.2)" }}
            />
            <img
              src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=900&h=600&fit=crop&auto=format"
              alt="Apple MacBook Pro — premium certified pre-owned"
              className="w-full rounded-2xl"
              style={{ boxShadow: "0 32px 80px rgba(0,0,0,0.14), 0 8px 20px rgba(0,0,0,0.08)" }}
            />

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="absolute -bottom-4 -left-4 flex items-center gap-3 px-4 py-3 rounded-2xl"
              style={{ background: "#fff", boxShadow: "0 8px 32px rgba(0,0,0,0.12)", minWidth: "180px" }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "#f0f7ff" }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 2L12.4 7.3L18 8.1L14 12L15.1 17.5L10 14.8L4.9 17.5L6 12L2 8.1L7.6 7.3L10 2Z" fill="#0071e3"/>
                </svg>
              </div>
              <div>
                <div style={{ fontSize: "13px", fontWeight: 600, color: "#1d1d1f" }}>Save up to 40%</div>
                <div style={{ fontSize: "11px", color: "#6e6e73" }}>vs retail price</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.75 }}
              className="absolute -top-3 -right-4 flex items-center gap-2 px-3 py-2 rounded-2xl"
              style={{ background: "#1d1d1f", boxShadow: "0 8px 32px rgba(0,0,0,0.18)" }}
            >
              <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "#0071e3" }}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div style={{ fontSize: "12px", fontWeight: 500, color: "#fff" }}>Certified Outlet</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
