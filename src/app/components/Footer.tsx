import { useNavigate } from "../router";

const footerLinks = {
  Shop: [
    { label: "MacBooks", to: "/category/macbook" },
    { label: "iPads", to: "/category/ipad" },
    { label: "iMacs", to: "/category/imac" },
    { label: "Apple Watch", to: "/category/applewatch" },
    { label: "iPhones", to: "/category/iphone" },
    { label: "Accessories", to: "/shop" },
  ],
  Support: [
    { label: "Warranty Info", to: "/faq?cat=warranty" },
    { label: "Returns Policy", to: "/faq?cat=returns" },
    { label: "Shipping Info", to: "/faq?cat=shipping" },
    { label: "Contact Us", to: "/contact" },
    { label: "FAQ", to: "/faq" },
  ],
  Company: [
    { label: "About MacOutlet", to: "/about" },
    { label: "Certification Process", to: "/certification" },
    { label: "Privacy Policy", to: "/privacy" },
    { label: "Shop All", to: "/shop" },
    { label: "My Account", to: "/account" },
    { label: "Cart", to: "/cart" },
  ],
};

const socials = [
  {
    name: "Instagram",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    ),
  },
  {
    name: "Twitter",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
      </svg>
    ),
  },
  {
    name: "Facebook",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    ),
  },
];

export function Footer() {
  const navigate = useNavigate();

  return (
    <footer style={{ background: "#1d1d1f", padding: "64px 0 0" }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-10" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <div>
            <button
              className="flex items-center gap-2 mb-4"
              style={{ background: "transparent", border: "none", cursor: "pointer", padding: 0 }}
              onClick={() => navigate("/")}
            >
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path
                  d="M18.1 14.9c-.4.9-.6 1.3-1.1 2.1-.7 1.1-1.7 2.5-3 2.5-1.1.1-1.4-.7-2.9-.7s-1.9.7-3 .7c-1.2 0-2.2-1.3-2.9-2.4C3.1 14.7 2.6 11 3.9 9.1c.9-1.3 2.3-2.1 3.7-2.1 1.4 0 2.2.7 3.4.7 1.1 0 1.8-.7 3.4-.7 1.2 0 2.5.7 3.4 1.8-3 1.7-2.5 5.9.3 6.1zM13.5 5.2c.6-.8 1-1.9.8-3-.9.1-2 .6-2.6 1.5-.6.7-.9 1.8-.8 2.8 1-.1 2-.6 2.6-1.3z"
                  fill="white"
                />
              </svg>
              <span style={{ fontWeight: 600, fontSize: "17px", color: "#fff" }}>MacOutlet</span>
            </button>
            <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.45)", lineHeight: 1.7, maxWidth: "200px" }}>
              Certified pre-owned and open-box Apple devices. Quality guaranteed.
            </p>
            <div className="flex gap-3 mt-5">
              {socials.map((s) => (
                <button
                  key={s.name}
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors"
                  style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.6)", border: "none", cursor: "pointer" }}
                  aria-label={s.name}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.12)";
                    (e.currentTarget as HTMLElement).style.color = "#fff";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.07)";
                    (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.6)";
                  }}
                >
                  {s.icon}
                </button>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <div style={{ fontSize: "13px", fontWeight: 600, color: "rgba(255,255,255,0.5)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "16px" }}>
                {heading}
              </div>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => navigate(link.to)}
                      style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)", transition: "color 0.15s", background: "transparent", border: "none", cursor: "pointer", padding: 0, textAlign: "left" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="flex flex-wrap items-center justify-between gap-4 py-6"
          style={{ fontSize: "13px", color: "rgba(255,255,255,0.3)" }}
        >
          <span>© 2026 MacOutlet. All rights reserved.</span>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((t) => (
              <button
                key={t}
                style={{ color: "rgba(255,255,255,0.3)", transition: "color 0.15s", background: "transparent", border: "none", cursor: "pointer", padding: 0 }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
