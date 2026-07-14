import { ClipboardCheck, ScanSearch, Sparkles, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";

const steps = [
  {
    icon: ScanSearch,
    step: "01",
    title: "60-Point Inspection",
    desc: "Every device goes through a thorough 60-point technical inspection — display, keyboard, ports, speakers, cameras, and more.",
  },
  {
    icon: ClipboardCheck,
    step: "02",
    title: "Condition Grading",
    desc: "We grade each device honestly: Open Box (sealed/unused), Like New (barely used), or Excellent (light use, minor marks).",
  },
  {
    icon: Sparkles,
    step: "03",
    title: "Professional Cleaning",
    desc: "Cleaned, sanitized, and reconditioned to near-factory condition before it reaches you.",
  },
  {
    icon: ShieldCheck,
    step: "04",
    title: "12-Month Warranty",
    desc: "All devices ship with a full 12-month warranty and 14-day hassle-free returns. Zero risk.",
  },
];

export function WhyBuySection() {
  return (
    <section id="why" style={{ background: "#fff", padding: "96px 0" }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left text */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="inline-block px-3 py-1 rounded-full mb-3"
              style={{ background: "#f5f5f7", color: "#6e6e73", fontSize: "13px", fontWeight: 500 }}
            >
              Our Process
            </div>
            <h2
              style={{
                fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                fontWeight: 700,
                color: "#1d1d1f",
                letterSpacing: "-0.025em",
                lineHeight: 1.1,
                marginBottom: "16px",
              }}
            >
              Why buy from
              <br />
              MacOutlet?
            </h2>
            <p style={{ fontSize: "17px", color: "#6e6e73", lineHeight: 1.65, maxWidth: "440px" }}>
              We're not a marketplace. Every Apple device sold through MacOutlet
              is sourced, inspected, and certified by our in-house team.
              You get Apple quality at a fraction of the price.
            </p>

            <div className="mt-8 flex gap-8">
              {[
                { n: "2,400+", l: "Devices sold" },
                { n: "99.2%", l: "Satisfaction rate" },
                { n: "4.9 / 5", l: "Average review" },
              ].map((s) => (
                <div key={s.l}>
                  <div style={{ fontSize: "24px", fontWeight: 700, color: "#1d1d1f", letterSpacing: "-0.02em" }}>
                    {s.n}
                  </div>
                  <div style={{ fontSize: "13px", color: "#6e6e73", marginTop: "2px" }}>{s.l}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right steps */}
          <div className="flex flex-col gap-5">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex gap-5 p-5 rounded-2xl"
                  style={{ background: "#f5f5f7", border: "1px solid rgba(0,0,0,0.04)" }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}
                  >
                    <Icon size={20} style={{ color: "#0071e3" }} />
                  </div>
                  <div>
                    <div style={{ fontSize: "11px", color: "#6e6e73", fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "3px" }}>
                      Step {step.step}
                    </div>
                    <div style={{ fontSize: "16px", fontWeight: 600, color: "#1d1d1f", marginBottom: "5px" }}>
                      {step.title}
                    </div>
                    <div style={{ fontSize: "14px", color: "#6e6e73", lineHeight: 1.6 }}>{step.desc}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
