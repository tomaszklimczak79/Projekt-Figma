import { ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "../router";
import { getProductsByCategory } from "../data/products";
import { ProductCard } from "./ProductCard";

export function FeaturedMacBooks() {
  const macbooks = getProductsByCategory("macbook").slice(0, 6);

  return (
    <section id="macbooks" style={{ background: "#fff", padding: "96px 0" }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-end justify-between mb-12 flex-wrap gap-4"
        >
          <div>
            <div
              className="inline-block px-3 py-1 rounded-full mb-3"
              style={{ background: "#f5f5f7", color: "#6e6e73", fontSize: "13px", fontWeight: 500 }}
            >
              MacBooks
            </div>
            <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 700, color: "#1d1d1f", letterSpacing: "-0.025em", lineHeight: 1.1 }}>
              Featured MacBooks
            </h2>
            <p style={{ fontSize: "17px", color: "#6e6e73", marginTop: "8px" }}>Handpicked, tested, and ready to use.</p>
          </div>
          <Link
            to="/category/macbook"
            className="inline-flex items-center gap-1"
            style={{ fontSize: "15px", color: "#0071e3", fontWeight: 500 }}
          >
            See all MacBooks <ChevronRight size={16} />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {macbooks.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
