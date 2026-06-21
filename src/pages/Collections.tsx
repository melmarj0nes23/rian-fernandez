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
import { Reveal, useReveal } from '../hooks/useScrollReveal';
import { useContent } from '../contexts/ContentContext';


export function CollectionsPage({
  onNavigate,
}: {
  onNavigate: (page: Page, extra?: string) => void;
}) {
  const { collections, loading } = useContent();

  if (loading) {
    return (
      <div className="pt-32 md:pt-40 pb-32 min-h-screen flex items-center justify-center">
        <p style={{ fontFamily: "Raleway, sans-serif", fontWeight: 300, color: "#7A7468", letterSpacing: "0.2em", textTransform: "uppercase", fontSize: "0.75rem" }}>
          Loading Collections...
        </p>
      </div>
    );
  }

  return (
    <div className="pt-32 md:pt-40 pb-32">
      <div className="max-w-screen-xl mx-auto px-8 md:px-16">
        <Reveal>
          <div className="mb-24">
            <p
              className="text-xs tracking-[0.35em] uppercase mb-5"
              style={{
                fontFamily: "Raleway, sans-serif",
                fontWeight: 300,
                color: "#B8955A",
              }}
            >
              Maison Rian Fernandez
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
              Collections
            </h1>
          </div>
        </Reveal>

        <div className="space-y-32">
          {collections.map((col, i) => (
            <Reveal key={col.id} delay={i * 80}>
              <div
                className={`grid grid-cols-1 md:grid-cols-2 gap-16 items-center ${
                  i % 2 === 1 ? "md:[direction:rtl]" : ""
                }`}
              >
                <div
                  className={`overflow-hidden bg-[#E8E4D9] ${
                    i % 2 !== 0 ? "md:order-1" : ""
                  }`}
                  style={{ aspectRatio: "4/5" }}
                  onClick={() => onNavigate("collections", col.id)}
                >
                  <img
                    src={col.coverImage}
                    alt={`${col.name} collection`}
                    className="w-full h-full object-cover transition-transform duration-[1500ms] hover:scale-105"
                  />
                </div>

                {/* Text Content */}
                <div
                  className={`flex flex-col justify-center ${
                    i % 2 !== 0 ? "md:order-2 md:pl-12" : "md:pr-12"
                  }`}
                >
                  <p
                    className="text-xs tracking-[0.3em] uppercase mb-6"
                    style={{
                      fontFamily: "Raleway, sans-serif",
                      fontWeight: 300,
                      color: "#B8955A",
                    }}
                  >
                    {col.season} {col.year}
                  </p>
                  <h2
                    style={{
                      fontFamily: "'Bodoni Moda', serif",
                      fontWeight: 300,
                      fontSize: "clamp(2.5rem, 4vw, 4rem)",
                      lineHeight: 1.05,
                      letterSpacing: "-0.01em",
                      color: "#0C0B09",
                    }}
                  >
                    {col.name}
                  </h2>
                  <p
                    className="mt-6 leading-relaxed"
                    style={{
                      fontFamily: "'Bodoni Moda', serif",
                      fontStyle: "italic",
                      fontWeight: 300,
                      fontSize: "1.1rem",
                      color: "#7A7468",
                    }}
                  >
                    {col.tagline}
                  </p>
                  <p
                    className="mt-6 leading-relaxed"
                    style={{
                      fontFamily: "Raleway, sans-serif",
                      fontWeight: 300,
                      fontSize: "0.88rem",
                      color: "#7A7468",
                      lineHeight: 1.95,
                    }}
                  >
                    {col.description}
                  </p>
                  <button
                    onClick={() => onNavigate("collections", col.id)}
                    className="group mt-12 flex items-center gap-4"
                    style={{
                      fontFamily: "Raleway, sans-serif",
                      fontWeight: 400,
                      fontSize: "0.72rem",
                      letterSpacing: "0.28em",
                      textTransform: "uppercase",
                      color: "#0C0B09",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                    }}
                  >
                    Explore Collection
                    <ArrowRight
                      size={13}
                      strokeWidth={1.5}
                      className="transition-transform duration-300 group-hover:translate-x-2"
                    />
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
