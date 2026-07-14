import { ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { useNavigate } from "../router";

const categories = [
  {
    name: "MacBooks",
    desc: "Pro & Air, all generations",
    count: "86 devices",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=400&fit=crop&auto=format",
    alt: "MacBook Pro",
    to: "/category/macbook",
  },
  {
    name: "iPads",
    desc: "iPad Pro, Air & standard",
    count: "34 devices",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&h=400&fit=crop&auto=format",
    alt: "iPad Pro",
    to: "/category/ipad",
  },
  {
    name: "iMacs",
    desc: "M-series all-in-ones",
    count: "18 devices",
    image: "https://images.unsplash.com/photo-1560195307-95127677e806?w=600&h=400&fit=crop&auto=format",
    alt: "iMac",
    to: "/category/imac",
  },
  {
    name: "Accessories",
    desc: "Magic Keyboard, Mouse & more",
    count: "52 items",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&h=400&fit=crop&auto=format",
    alt: "Apple Accessories",
    to: "/category/accessory",
  },
  {
    name: "iPhones",
    desc: "Limited availability",
    count: "12 devices",
    image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=600&h=400&fit=crop&auto=format",
    alt: "iPhone",
    to: "/category/iphone",
  },
];

export function Categories() {
  const navigate = useNavigate();

  return (
    <section id="categories" style={{ background: "#f5f5f7", padding: "96px 0" }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div
            className="inline-block px-3 py-1 rounded-full mb-3"
            style={{ background: "rgba(255,255,255,0.8)", color: "#6e6e73", fontSize: "13px", fontWeight: 500 }}
          >
            Browse
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
            Shop by Category
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {/* MacBooks — large */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3 relative rounded-2xl overflow-hidden group cursor-pointer"
            style={{ aspectRatio: "3/2" }}
            onClick={() => navigate(categories[0].to)}
          >
            <img
              src={categories[0].image}
              alt={categories[0].alt}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)" }}
            />
            <div className="absolute bottom-0 left-0 p-6">
              <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", marginBottom: "4px" }}>{categories[0].count}</div>
              <div style={{ fontSize: "28px", fontWeight: 700, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
                {categories[0].name}
              </div>
              <div style={{ fontSize: "15px", color: "rgba(255,255,255,0.75)", marginTop: "4px" }}>{categories[0].desc}</div>
              <div
                className="inline-flex items-center gap-1 mt-4 px-4 py-2 rounded-full transition-all duration-200"
                style={{ background: "rgba(255,255,255,0.2)", color: "#fff", fontSize: "14px", backdropFilter: "blur(8px)" }}
              >
                Shop now <ChevronRight size={14} />
              </div>
            </div>
          </motion.div>

          {/* Right side 2×2 */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-4">
            {categories.slice(1).map((cat, i) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i + 1) * 0.07 }}
                className="relative rounded-2xl overflow-hidden group cursor-pointer"
                style={{ aspectRatio: "1/1" }}
                onClick={() => navigate(cat.to)}
              >
                <img
                  src={cat.image}
                  alt={cat.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)" }}
                />
                <div className="absolute bottom-0 left-0 p-3">
                  <div style={{ fontSize: "15px", fontWeight: 700, color: "#fff", letterSpacing: "-0.01em" }}>{cat.name}</div>
                  <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.7)" }}>{cat.count}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
