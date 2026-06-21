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

import { Link, useNavigate, useLocation, useParams } from 'react-router';
import { Page } from '../types';
import { useContent } from '../contexts/ContentContext';
import { Reveal, useReveal } from '../hooks/useScrollReveal';


export function JournalPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = ["All", "Atelier", "Philosophy", "Craft", "Portrait"];
  const { journalEntries, loading } = useContent();

  const filtered =
    activeCategory === "All"
      ? journalEntries
      : journalEntries.filter((e) => e.category === activeCategory);

  if (loading) {
    return (
      <div className="pt-32 md:pt-40 pb-32 min-h-screen flex items-center justify-center">
        <p style={{ fontFamily: "Raleway, sans-serif", fontWeight: 300, color: "#7A7468", letterSpacing: "0.2em", textTransform: "uppercase", fontSize: "0.75rem" }}>
          Loading Journal...
        </p>
      </div>
    );
  }

  const featured = filtered[0];
  const rest = filtered.slice(1);

  if (!featured) {
    return (
      <div className="pt-32 md:pt-40 pb-32 min-h-screen flex items-center justify-center">
        <p style={{ fontFamily: "Raleway, sans-serif", fontWeight: 300, color: "#7A7468", letterSpacing: "0.2em", textTransform: "uppercase", fontSize: "0.75rem" }}>
          No entries found for this category.
        </p>
      </div>
    );
  }

  return (
    <div className="pt-32 md:pt-40 pb-32">
      <div className="max-w-screen-xl mx-auto px-8 md:px-16">
        <Reveal>
          <div className="mb-20">
            <p
              className="text-xs tracking-[0.35em] uppercase mb-5"
              style={{
                fontFamily: "Raleway, sans-serif",
                fontWeight: 300,
                color: "#B8955A",
              }}
            >
              Stories & Craft
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
              Journal
            </h1>
          </div>
        </Reveal>

        {/* Featured */}
        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-28 pb-28" style={{ borderBottom: "1px solid rgba(12,11,9,0.1)" }}>
            <div className="bg-[#E8E4D9] overflow-hidden" style={{ aspectRatio: "4/3" }}>
              <img
                src={featured.image}
                alt={featured.title}
                className="w-full h-full object-cover transition-transform duration-[1200ms] hover:scale-105"
              />
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-4 mb-6">
                <span
                  className="text-xs tracking-[0.22em] uppercase"
                  style={{
                    fontFamily: "Raleway, sans-serif",
                    fontWeight: 400,
                    color: "#B8955A",
                  }}
                >
                  {featured.category}
                </span>
                <span style={{ color: "rgba(12,11,9,0.2)", fontSize: "0.7rem" }}>·</span>
                <span
                  style={{
                    fontFamily: "Raleway, sans-serif",
                    fontWeight: 300,
                    fontSize: "0.75rem",
                    color: "#7A7468",
                  }}
                >
                  {featured.date}
                </span>
              </div>
              <h2
                style={{
                  fontFamily: "'Bodoni Moda', serif",
                  fontWeight: 300,
                  fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
                  lineHeight: 1.15,
                  color: "#0C0B09",
                }}
              >
                {featured.title}
              </h2>
              <p
                className="mt-6 leading-relaxed"
                style={{
                  fontFamily: "Raleway, sans-serif",
                  fontWeight: 300,
                  fontSize: "0.87rem",
                  color: "#7A7468",
                  lineHeight: 1.95,
                }}
              >
                {featured.excerpt}
              </p>
              <p
                className="mt-6 text-xs tracking-[0.15em]"
                style={{
                  fontFamily: "Raleway, sans-serif",
                  fontWeight: 300,
                  color: "#7A7468",
                }}
              >
                {featured.readTime} min read
              </p>
            </div>
          </div>
        </Reveal>

        {/* Rest */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-14">
          {rest.map((entry, i) => (
            <Reveal key={entry.id} delay={i * 80}>
              <div className="group cursor-pointer">
                <div
                  className="bg-[#E8E4D9] overflow-hidden mb-6"
                  style={{ aspectRatio: "4/3" }}
                >
                  <img
                    src={entry.image}
                    alt={entry.title}
                    className="w-full h-full object-cover transition-transform duration-[1000ms] group-hover:scale-105"
                  />
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <span
                    className="text-xs tracking-[0.2em] uppercase"
                    style={{
                      fontFamily: "Raleway, sans-serif",
                      fontWeight: 400,
                      color: "#B8955A",
                    }}
                  >
                    {entry.category}
                  </span>
                  <span style={{ color: "rgba(12,11,9,0.2)" }}>·</span>
                  <span
                    style={{
                      fontFamily: "Raleway, sans-serif",
                      fontWeight: 300,
                      fontSize: "0.72rem",
                      color: "#7A7468",
                    }}
                  >
                    {entry.date}
                  </span>
                </div>
                <h3
                  style={{
                    fontFamily: "'Bodoni Moda', serif",
                    fontWeight: 300,
                    fontSize: "1.25rem",
                    lineHeight: 1.25,
                    color: "#0C0B09",
                  }}
                >
                  {entry.title}
                </h3>
                <p
                  className="mt-4 leading-relaxed"
                  style={{
                    fontFamily: "Raleway, sans-serif",
                    fontWeight: 300,
                    fontSize: "0.82rem",
                    color: "#7A7468",
                    lineHeight: 1.9,
                  }}
                >
                  {entry.excerpt}
                </p>
                <p
                  className="mt-4 text-xs tracking-[0.15em]"
                  style={{
                    fontFamily: "Raleway, sans-serif",
                    fontWeight: 300,
                    color: "#7A7468",
                  }}
                >
                  {entry.readTime} min read
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
