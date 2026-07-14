import { ShieldCheck, Zap, BatteryCharging, Truck, Lock } from "lucide-react";

const trustItems = [
  {
    icon: ShieldCheck,
    title: "12-Month Warranty",
    desc: "Every device fully covered",
  },
  {
    icon: Zap,
    title: "Fully Tested",
    desc: "60-point quality inspection",
  },
  {
    icon: BatteryCharging,
    title: "Battery Certified",
    desc: "Health verified & guaranteed",
  },
  {
    icon: Truck,
    title: "Fast Shipping",
    desc: "2–3 business days",
  },
  {
    icon: Lock,
    title: "Secure Payments",
    desc: "SSL encrypted checkout",
  },
];

export function TrustBar() {
  return (
    <section style={{ background: "#fff", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
      <div className="max-w-[1200px] mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {trustItems.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="flex flex-col items-center text-center gap-3">
                <div
                  className="w-11 h-11 rounded-2xl flex items-center justify-center"
                  style={{ background: "#f0f7ff" }}
                >
                  <Icon size={20} style={{ color: "#0071e3" }} />
                </div>
                <div>
                  <div style={{ fontSize: "14px", fontWeight: 600, color: "#1d1d1f" }}>{item.title}</div>
                  <div style={{ fontSize: "13px", color: "#6e6e73", marginTop: "2px" }}>{item.desc}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
