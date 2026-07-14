import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { motion } from "motion/react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section style={{ background: "#f5f5f7", padding: "80px 0" }}>
      <div className="max-w-[700px] mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div
            className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-6 mx-auto"
            style={{ background: "#0071e3" }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
          </div>
          <h2
            style={{
              fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
              fontWeight: 700,
              color: "#1d1d1f",
              letterSpacing: "-0.025em",
              lineHeight: 1.15,
              marginBottom: "12px",
            }}
          >
            Be first to know
          </h2>
          <p style={{ fontSize: "17px", color: "#6e6e73", lineHeight: 1.6, marginBottom: "32px" }}>
            New MacBook arrivals sell fast. Get instant alerts when we list a new
            device matching your wishlist — plus exclusive subscriber-only discounts.
          </p>

          {submitted ? (
            <div
              className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl"
              style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.08)" }}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: "#0071e3" }}
              >
                <Check size={16} style={{ color: "#fff" }} />
              </div>
              <span style={{ fontSize: "17px", fontWeight: 500, color: "#1d1d1f" }}>
                You're on the list! We'll be in touch.
              </span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 px-5 py-3.5 rounded-full outline-none transition-all"
                style={{
                  background: "#fff",
                  border: "1.5px solid rgba(0,0,0,0.1)",
                  fontSize: "16px",
                  color: "#1d1d1f",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#0071e3")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(0,0,0,0.1)")}
              />
              <button
                type="submit"
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full transition-all duration-200"
                style={{
                  background: "#0071e3",
                  color: "#fff",
                  fontSize: "16px",
                  fontWeight: 500,
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#0077ed")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#0071e3")}
              >
                Subscribe <ArrowRight size={15} />
              </button>
            </form>
          )}

          <p style={{ fontSize: "13px", color: "#6e6e73", marginTop: "16px" }}>
            No spam, ever. Unsubscribe anytime.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
