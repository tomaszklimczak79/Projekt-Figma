import { useState, useEffect } from "react";
import { ShoppingBag, Search, Menu, X } from "lucide-react";
import { Link, useNavigate } from "../router";
import { useApp } from "../store/AppContext";

const navLinks = [
  { label: "MacBooks", to: "/category/macbook" },
  { label: "iPads", to: "/category/ipad" },
  { label: "iMacs", to: "/category/imac" },
  { label: "Deals", to: "/shop?sort=savings" },
  { label: "About", to: "/#why" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { cartCount, setCartOpen } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.72)",
          backdropFilter: "saturate(180%) blur(20px)",
          WebkitBackdropFilter: "saturate(180%) blur(20px)",
          borderBottom: scrolled ? "1px solid rgba(0,0,0,0.08)" : "1px solid transparent",
        }}
      >
        <div className="max-w-[1200px] mx-auto px-6 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path
                d="M18.1 14.9c-.4.9-.6 1.3-1.1 2.1-.7 1.1-1.7 2.5-3 2.5-1.1.1-1.4-.7-2.9-.7s-1.9.7-3 .7c-1.2 0-2.2-1.3-2.9-2.4C3.1 14.7 2.6 11 3.9 9.1c.9-1.3 2.3-2.1 3.7-2.1 1.4 0 2.2.7 3.4.7 1.1 0 1.8-.7 3.4-.7 1.2 0 2.5.7 3.4 1.8-3 1.7-2.5 5.9.3 6.1zM13.5 5.2c.6-.8 1-1.9.8-3-.9.1-2 .6-2.6 1.5-.6.7-.9 1.8-.8 2.8 1-.1 2-.6 2.6-1.3z"
                fill="#1d1d1f"
              />
            </svg>
            <span style={{ fontWeight: 600, fontSize: "17px", color: "#1d1d1f", letterSpacing: "-0.01em" }}>
              MacOutlet
            </span>
          </Link>

          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  className="flex items-center gap-0.5 px-3 py-1.5 rounded-lg transition-colors"
                  style={{ fontSize: "15px", color: "#1d1d1f" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#f5f5f7")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1">
            <button
              className="hidden md:flex items-center justify-center w-9 h-9 rounded-full transition-colors"
              style={{ color: "#1d1d1f" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#f5f5f7")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              onClick={() => navigate("/shop")}
            >
              <Search size={18} />
            </button>
            <Link
              to="/account"
              className="hidden md:flex items-center justify-center w-9 h-9 rounded-full transition-colors"
              style={{ color: "#1d1d1f" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#f5f5f7")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </Link>
            <button
              className="relative flex items-center justify-center w-9 h-9 rounded-full transition-colors"
              style={{ color: "#1d1d1f" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#f5f5f7")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              onClick={() => setCartOpen(true)}
            >
              <ShoppingBag size={18} />
              {cartCount > 0 && (
                <span
                  className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center text-white"
                  style={{ fontSize: "10px", background: "#0071e3" }}
                >
                  {cartCount}
                </span>
              )}
            </button>
            <button
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-full transition-colors"
              style={{ color: "#1d1d1f" }}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden px-6 pb-6 pt-2" style={{ borderTop: "1px solid rgba(0,0,0,0.08)" }}>
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="block py-3 transition-colors"
                style={{ fontSize: "17px", color: "#1d1d1f", borderBottom: "1px solid rgba(0,0,0,0.06)" }}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/account"
              className="block py-3"
              style={{ fontSize: "17px", color: "#1d1d1f", borderBottom: "1px solid rgba(0,0,0,0.06)" }}
              onClick={() => setMobileOpen(false)}
            >
              My Account
            </Link>
            <button
              className="block py-3 w-full text-left"
              style={{ fontSize: "17px", color: "#1d1d1f" }}
              onClick={() => { setCartOpen(true); setMobileOpen(false); }}
            >
              Cart {cartCount > 0 && `(${cartCount})`}
            </button>
          </div>
        )}
      </nav>
    </>
  );
}
