import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const faqs = [
  {
    q: "What does the warranty cover?",
    a: "All MacOutlet devices come with a 12-month hardware warranty covering manufacturing defects and hardware failures. If your device has a covered issue within 12 months of purchase, we'll repair or replace it at no cost.",
  },
  {
    q: "What's the difference between Open Box, Like New, and Excellent?",
    a: "Open Box devices were purchased and returned unopened, or briefly tested — essentially new. Like New devices show no cosmetic wear and have been lightly used. Excellent devices may have minor, barely visible cosmetic marks but are in perfect functional condition.",
  },
  {
    q: "How long does shipping take?",
    a: "Orders are typically dispatched within 1 business day. Standard delivery takes 2–3 business days. Express 1-day shipping is available at checkout.",
  },
  {
    q: "Can I return a device?",
    a: "Yes. You have 14 days from delivery to return any device for a full refund, no questions asked. Simply contact our support team and we'll arrange a free return label.",
  },
  {
    q: "How is battery health measured?",
    a: "We test every battery using Apple's native diagnostics and report the exact health percentage. We only sell devices where battery health meets or exceeds the stated percentage.",
  },
  {
    q: "Do devices come with accessories and chargers?",
    a: "Open Box devices include all original accessories. Like New and Excellent devices include a compatible charger. We always specify what's included in the product listing.",
  },
  {
    q: "Are devices iCloud unlocked?",
    a: "Yes. Every device is fully activation-locked-free and iCloud unlocked. You'll be able to set it up with your own Apple ID immediately.",
  },
  {
    q: "Do you offer financing?",
    a: "Yes. We offer 0% financing over 12 months through our partner payment providers at checkout. Subject to approval.",
  },
];

function FAQItem({ faq, isOpen, onToggle }: { faq: typeof faqs[0]; isOpen: boolean; onToggle: () => void }) {
  return (
    <div
      className="rounded-2xl overflow-hidden cursor-pointer"
      style={{ background: isOpen ? "#fff" : "#fff", border: "1px solid rgba(0,0,0,0.07)", marginBottom: "8px" }}
    >
      <button
        className="w-full flex items-center justify-between px-6 py-5 text-left"
        onClick={onToggle}
      >
        <span style={{ fontSize: "16px", fontWeight: 500, color: "#1d1d1f", letterSpacing: "-0.01em" }}>
          {faq.q}
        </span>
        <span
          className="flex-shrink-0 ml-4 w-7 h-7 rounded-full flex items-center justify-center transition-colors"
          style={{ background: isOpen ? "#0071e3" : "#f5f5f7" }}
        >
          {isOpen ? (
            <Minus size={14} style={{ color: "#fff" }} />
          ) : (
            <Plus size={14} style={{ color: "#6e6e73" }} />
          )}
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <div
              className="px-6 pb-5"
              style={{ fontSize: "15px", color: "#6e6e73", lineHeight: 1.7, borderTop: "1px solid rgba(0,0,0,0.06)", paddingTop: "16px" }}
            >
              {faq.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section style={{ background: "#fff", padding: "96px 0" }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div
              className="inline-block px-3 py-1 rounded-full mb-3"
              style={{ background: "#f5f5f7", color: "#6e6e73", fontSize: "13px", fontWeight: 500 }}
            >
              FAQ
            </div>
            <h2
              style={{
                fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)",
                fontWeight: 700,
                color: "#1d1d1f",
                letterSpacing: "-0.025em",
                lineHeight: 1.15,
                marginBottom: "16px",
              }}
            >
              Questions &
              <br />
              Answers
            </h2>
            <p style={{ fontSize: "16px", color: "#6e6e73", lineHeight: 1.6 }}>
              Everything you need to know before buying a certified pre-owned Apple device from MacOutlet.
            </p>
            <a
              href="#"
              className="inline-block mt-6"
              style={{ fontSize: "15px", color: "#0071e3", fontWeight: 500 }}
            >
              Contact support →
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2"
          >
            {faqs.map((faq, i) => (
              <FAQItem
                key={i}
                faq={faq}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
