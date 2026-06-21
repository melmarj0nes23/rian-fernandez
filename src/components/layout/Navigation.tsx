import { useState, useEffect, useRef, useCallback, type ReactNode } from "react";
import {
  ShoppingBag,
  X,
  Menu,
  ArrowRight,
  Minus,
  Plus,
  ChevronDown,
  Facebook,
  Instagram,
  Phone,
  User,
} from "lucide-react";

import { Link, useNavigate, useLocation, useParams } from 'react-router';
import { Page, Collection, Product, CartItem, JournalEntry } from '../../types';
import { COLLECTIONS, PRODUCTS, JOURNAL_ENTRIES } from '../../data';
import { Reveal, useReveal } from '../../hooks/useScrollReveal';


export function Navigation({
  onNavigate,
  cartCount,
  currentPage,
}: {
  onNavigate: (page: Page, extra?: string) => void;
  cartCount: number;
  currentPage: Page;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isHome = currentPage === "home";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const navItems: { label: string; page: Page | "home" }[] = [
    { label: "The Atelier", page: "atelier" },
    { label: "The Designer", page: "designer" },
    { label: "Collections", page: "collections" },
    { label: "The Boutique", page: "boutique" },
    { label: "Journal", page: "journal" },
    { label: "Appointments", page: "appointments" },
  ];

  const isLight = isHome && !scrolled;

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          backdropFilter: scrolled ? "blur(12px)" : "none",
          backgroundColor: scrolled || !isHome
            ? "rgba(247,244,238,0.95)"
            : "transparent",
          borderBottom: isLight
            ? "1px solid transparent"
            : "1px solid rgba(12,11,9,0.08)",
          color: isLight ? "#F7F4EE" : "#0C0B09",
        }}
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex flex-col justify-center h-[120px]">
          {/* Top Tier */}
          <div className="flex items-center justify-between pb-4">
            
            {/* Left: Socials & Phone */}
            <div className="hidden lg:flex items-center gap-6 shrink-0" style={{ color: isLight ? "#F7F4EE" : "#0C0B09" }}>
              <a href="https://web.facebook.com/rian.fernandez" target="_blank" rel="noreferrer" className="hover:opacity-70 transition-opacity">
                <Facebook size={16} strokeWidth={1.5} />
              </a>
              <a href="https://www.instagram.com/rianfernandez888" target="_blank" rel="noreferrer" className="hover:opacity-70 transition-opacity">
                <Instagram size={16} strokeWidth={1.5} />
              </a>
              <div className="flex items-center gap-2">
                <Phone size={16} strokeWidth={1.5} />
                <span className="text-[0.75rem] tracking-widest">+63 927 564 2888</span>
              </div>
            </div>

            {/* Center: Logo */}
            <button
              onClick={() => onNavigate("home")}
              className="flex items-center justify-center leading-none group shrink-0 mx-auto"
            >
              <img 
                src="/rf-logo.png" 
                alt="Rian Fernandez Logo" 
                className="h-10 object-contain mr-4" 
                style={{
                  filter: isLight ? 'brightness(0) invert(1)' : 'none',
                  transition: 'filter 0.3s',
                }}
              />
              <div className="flex flex-col items-start justify-center">
                <span
                  style={{
                    fontFamily: "'Bodoni Moda', serif",
                    fontWeight: 400,
                    fontSize: "1.2rem",
                    letterSpacing: "0.15em",
                    whiteSpace: "nowrap",
                  }}
                >
                  RIAN FERNANDEZ
                </span>
                <span
                  style={{
                    fontFamily: "Raleway, sans-serif",
                    fontWeight: 300,
                    fontSize: "0.55rem",
                    letterSpacing: "0.45em",
                    marginTop: "4px",
                    paddingLeft: "2px",
                  }}
                >
                  ATELIER
                </span>
              </div>
            </button>

            {/* Right: User, Cart, Button */}
            <div className="flex items-center justify-end gap-6 shrink-0 min-w-[250px]">
              <div className="hidden lg:flex items-center gap-6">
                <button onClick={() => onNavigate("login")} className="hover:opacity-70 transition-opacity">
                  <User size={20} strokeWidth={1.5} />
                </button>
                
                <button
                  onClick={() => onNavigate("dossier")}
                  className="relative hover:opacity-70 transition-opacity"
                >
                  <ShoppingBag size={20} strokeWidth={1.5} />
                  {cartCount > 0 && (
                    <span
                      className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full flex items-center justify-center text-white"
                      style={{
                        fontSize: "0.6rem",
                        backgroundColor: "#B8955A",
                        fontFamily: "Raleway, sans-serif",
                      }}
                    >
                      {cartCount}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => onNavigate("appointments")}
                  className="text-[0.65rem] tracking-[0.15em] uppercase px-5 py-2 transition-all duration-300 border hover:bg-[#0C0B09] hover:text-[#F7F4EE]"
                  style={{
                    fontFamily: "Raleway, sans-serif",
                    fontWeight: 400,
                    borderColor: "#B8955A", // Gold outline from mockup
                    color: isLight ? "#F7F4EE" : "#0C0B09",
                    whiteSpace: "nowrap",
                  }}
                >
                  Book Consultation
                </button>
              </div>

              {/* Mobile Hamburger */}
              <button
                className="lg:hidden"
                onClick={() => setMenuOpen(true)}
              >
                <Menu size={22} strokeWidth={1.5} />
              </button>
            </div>
          </div>

          {/* Bottom Tier: Nav Links */}
          <div className="hidden lg:flex items-center justify-center gap-10">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => onNavigate(item.page as Page)}
                className="relative group py-1"
                style={{
                  fontFamily: "Raleway, sans-serif",
                  fontWeight: 400,
                  fontSize: "0.68rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: currentPage === item.page
                    ? "#B8955A" // Active link color gold
                    : (isLight ? "rgba(247,244,238,0.85)" : "#0C0B09"),
                  transition: "color 0.25s",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                {item.label}
                <span
                  className="absolute bottom-0 left-0 h-[1px] transition-all duration-300"
                  style={{
                    backgroundColor: "#B8955A",
                    width: currentPage === item.page ? "100%" : "0%",
                  }}
                />
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className="fixed inset-0 z-[100] flex flex-col transition-all duration-500"
        style={{
          backgroundColor: "#0C0B09",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "all" : "none",
        }}
      >
        <div className="flex items-center justify-between px-8 h-20">
          <span
            style={{
              fontFamily: "'Bodoni Moda', serif",
              fontWeight: 400,
              fontSize: "1.2rem",
              color: "#F7F4EE",
              letterSpacing: "0.08em",
            }}
          >
            Rian Fernandez
          </span>
          <button onClick={() => setMenuOpen(false)} style={{ color: "#F7F4EE" }}>
            <X size={22} strokeWidth={1.5} />
          </button>
        </div>

        <div className="flex flex-col justify-center flex-1 px-8 gap-8">
          {navItems.map((item, i) => (
            <button
              key={item.page}
              onClick={() => {
                setMenuOpen(false);
                onNavigate(item.page);
              }}
              className="text-left transition-opacity duration-300"
              style={{
                fontFamily: "'Bodoni Moda', serif",
                fontWeight: 300,
                fontSize: "2.2rem",
                color: "#F7F4EE",
                letterSpacing: "0.04em",
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "translateX(0)" : "translateX(-20px)",
                transition: `opacity 0.5s ease ${i * 60 + 200}ms, transform 0.5s ease ${i * 60 + 200}ms`,
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              {item.label}
            </button>
          ))}

          <button
            onClick={() => {
              setMenuOpen(false);
              onNavigate("appointments");
            }}
            className="mt-8 text-xs tracking-[0.22em] uppercase px-8 py-4 border text-left self-start"
            style={{
              fontFamily: "Raleway, sans-serif",
              fontWeight: 400,
              borderColor: "rgba(247,244,238,0.3)",
              color: "#F7F4EE",
              background: "none",
              cursor: "pointer",
            }}
          >
            Book Consultation
          </button>
        </div>
      </div>
    </>
  );
}
