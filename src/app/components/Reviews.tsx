import { motion } from "motion/react";

const reviews = [
  {
    name: "James Whitfield",
    location: "London, UK",
    rating: 5,
    date: "March 2025",
    product: "MacBook Pro 14\" M3 Pro",
    text: "Absolutely blown away by the quality. Bought an 'Excellent' graded MacBook Pro and it genuinely looks brand new. The battery health was 93% as stated. Fast shipping, great packaging. Will definitely buy again.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&auto=format",
  },
  {
    name: "Marta Kowalski",
    location: "Warsaw, Poland",
    rating: 5,
    date: "April 2025",
    product: "MacBook Air M2",
    text: "Got an Open Box MacBook Air. Literally couldn't tell it had been opened — pristine condition, charger still had the cable tie on it. MacOutlet exceeded my expectations completely.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&auto=format",
  },
  {
    name: "Daniel Mercer",
    location: "Amsterdam, NL",
    rating: 5,
    date: "February 2025",
    product: "iPad Pro M4 11\"",
    text: "Saved €300 vs Apple Store. Device is in perfect shape, warranty included. Customer support was also helpful when I had a question about the condition report. Highly recommended.",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=80&h=80&fit=crop&auto=format",
  },
  {
    name: "Sophie Lefevre",
    location: "Paris, France",
    rating: 5,
    date: "May 2025",
    product: "MacBook Pro 16\" M3 Max",
    text: "The condition report they provide is incredibly detailed — photos, battery cycle count, everything. Trust level is off the charts. This is how refurbished should be done.",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&auto=format",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill={i < count ? "#0071e3" : "#e5e5e5"}>
          <path d="M7 1l1.6 3.3 3.6.5-2.6 2.5.6 3.6L7 9.2 3.8 11l.6-3.6L2 4.8l3.6-.5z" />
        </svg>
      ))}
    </div>
  );
}

export function Reviews() {
  return (
    <section style={{ background: "#f5f5f7", padding: "96px 0" }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div
            className="inline-block px-3 py-1 rounded-full mb-3"
            style={{ background: "rgba(255,255,255,0.8)", color: "#6e6e73", fontSize: "13px", fontWeight: 500 }}
          >
            Reviews
          </div>
          <h2
            style={{
              fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
              fontWeight: 700,
              color: "#1d1d1f",
              letterSpacing: "-0.025em",
              lineHeight: 1.1,
            }}
          >
            Trusted by thousands
          </h2>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} width="18" height="18" viewBox="0 0 14 14" fill="#0071e3">
                  <path d="M7 1l1.6 3.3 3.6.5-2.6 2.5.6 3.6L7 9.2 3.8 11l.6-3.6L2 4.8l3.6-.5z" />
                </svg>
              ))}
            </div>
            <span style={{ fontSize: "17px", fontWeight: 600, color: "#1d1d1f" }}>4.9 out of 5</span>
            <span style={{ fontSize: "15px", color: "#6e6e73" }}>· 847 verified reviews</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {reviews.map((review, i) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="p-6 rounded-2xl"
              style={{
                background: "#fff",
                border: "1px solid rgba(0,0,0,0.06)",
                boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <div style={{ fontSize: "15px", fontWeight: 600, color: "#1d1d1f" }}>{review.name}</div>
                    <div style={{ fontSize: "12px", color: "#6e6e73" }}>{review.location}</div>
                  </div>
                </div>
                <div style={{ fontSize: "12px", color: "#6e6e73" }}>{review.date}</div>
              </div>

              <Stars count={review.rating} />

              <p style={{ fontSize: "15px", color: "#1d1d1f", lineHeight: 1.65, margin: "12px 0" }}>
                "{review.text}"
              </p>

              <div
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full"
                style={{ background: "#f5f5f7", fontSize: "12px", color: "#6e6e73" }}
              >
                <svg width="12" height="12" viewBox="0 0 22 22" fill="#6e6e73">
                  <path d="M18.1 14.9c-.4.9-.6 1.3-1.1 2.1-.7 1.1-1.7 2.5-3 2.5-1.1.1-1.4-.7-2.9-.7s-1.9.7-3 .7c-1.2 0-2.2-1.3-2.9-2.4C3.1 14.7 2.6 11 3.9 9.1c.9-1.3 2.3-2.1 3.7-2.1 1.4 0 2.2.7 3.4.7 1.1 0 1.8-.7 3.4-.7 1.2 0 2.5.7 3.4 1.8-3 1.7-2.5 5.9.3 6.1zM13.5 5.2c.6-.8 1-1.9.8-3-.9.1-2 .6-2.6 1.5-.6.7-.9 1.8-.8 2.8 1-.1 2-.6 2.6-1.3z" />
                </svg>
                {review.product}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
