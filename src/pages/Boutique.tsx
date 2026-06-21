import { useState, useEffect, useRef, useCallback, type ReactNode } from "react";
import {
  ShoppingBag,
  X,
  Menu,
  ArrowRight,
  Minus,
  Plus,
  ChevronDown,
} from "lucide-react";

import { Page } from '../types';
import { formatPrice } from '../data';
import { Reveal, useReveal } from '../hooks/useScrollReveal';
import { useContent } from '../contexts/ContentContext';


export function BoutiquePage({
  onNavigate,
}: {
  onNavigate: (page: Page, extra?: string) => void;
}) {
  const [activeFilter, setActiveFilter] = useState("All");
  const filters = ["All", "Evening Gown", "Evening Dress", "Haute Couture", "Couture Gown"];
  const { products, loading } = useContent();

  const filtered =
    activeFilter === "All"
      ? products
      : products.filter((p) => p.category === activeFilter);

  if (loading) {
    return (
      <div className="pt-32 md:pt-40 pb-32 min-h-screen flex items-center justify-center">
        <p style={{ fontFamily: "Raleway, sans-serif", fontWeight: 300, color: "#7A7468", letterSpacing: "0.2em", textTransform: "uppercase", fontSize: "0.75rem" }}>
          Loading Boutique...
        </p>
      </div>
    );
  }

  return (
    <div className="pt-32 md:pt-40 pb-32">
      <div className="max-w-screen-xl mx-auto px-8 md:px-16">
        <Reveal>
          <div className="mb-6">
            <p
              className="text-xs tracking-[0.35em] uppercase mb-5"
              style={{
                fontFamily: "Raleway, sans-serif",
                fontWeight: 300,
                color: "#B8955A",
              }}
            >
              Made-to-Order Couture
            </p>
            <h1
              style={{
                fontFamily: "'Bodoni Moda', serif",
                fontWeight: 300,
                fontSize: "clamp(3.5rem, 7vw, 7rem)",
                lineHeight: 0.95,
                color: "#0C0B09",
              }}
            >
              The Boutique
            </h1>
          </div>
        </Reveal>

        {/* Filters */}
        <Reveal delay={80}>
          <div
            className="flex gap-1 py-8 mb-16 overflow-x-auto"
            style={{ borderBottom: "1px solid rgba(12,11,9,0.1)" }}
          >
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className="whitespace-nowrap px-5 py-2 transition-all duration-200"
                style={{
                  fontFamily: "Raleway, sans-serif",
                  fontWeight: activeFilter === f ? 400 : 300,
                  fontSize: "0.72rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: activeFilter === f ? "#0C0B09" : "#7A7468",
                  backgroundColor:
                    activeFilter === f ? "rgba(12,11,9,0.06)" : "transparent",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20">
          {filtered.map((p, i) => (
            <Reveal key={p.id} delay={i * 60}>
              <div
                className="group cursor-pointer"
              >
                <div
                  className="overflow-hidden bg-[#E8E4D9]"
                  style={{ aspectRatio: "3/4" }}
                  onClick={() => onNavigate("boutique", p.id)}
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover transition-transform duration-[1000ms] group-hover:scale-105"
                  />
                </div>
                <div className="mt-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p
                        className="text-xs tracking-[0.18em] uppercase mb-1.5"
                        style={{
                          fontFamily: "Raleway, sans-serif",
                          fontWeight: 300,
                          color: "#7A7468",
                        }}
                      >
                        {p.category}
                      </p>
                      <h3
                        style={{
                          fontFamily: "'Bodoni Moda', serif",
                          fontWeight: 400,
                          fontSize: "1.15rem",
                          color: "#0C0B09",
                        }}
                      >
                        {p.name}
                      </h3>
                    </div>
                    <p
                      style={{
                        fontFamily: "Raleway, sans-serif",
                        fontWeight: 300,
                        fontSize: "0.82rem",
                        color: "#7A7468",
                      }}
                    >
                      {formatPrice(p.price)}
                    </p>
                  </div>
                  <p
                    className="mt-3"
                    style={{
                      fontFamily: "Raleway, sans-serif",
                      fontWeight: 300,
                      fontSize: "0.8rem",
                      color: "#7A7468",
                      lineHeight: 1.8,
                    }}
                  >
                    {p.description.length > 100 ? p.description.slice(0, 100) + '...' : p.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
