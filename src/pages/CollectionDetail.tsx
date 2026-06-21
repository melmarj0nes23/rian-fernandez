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
import { formatPrice } from '../data';
import { Reveal, useReveal } from '../hooks/useScrollReveal';
import { useContent } from '../contexts/ContentContext';



export function CollectionDetailPage({
  onNavigate,
}: {
  onNavigate: (page: Page | string, extra?: string) => void;
}) {
  const { id } = useParams();
  const { collections, products, loading } = useContent();

  if (loading) {
    return (
      <div className="pt-32 md:pt-40 pb-32 min-h-screen flex items-center justify-center">
        <p style={{ fontFamily: "Raleway, sans-serif", fontWeight: 300, color: "#7A7468", letterSpacing: "0.2em", textTransform: "uppercase", fontSize: "0.75rem" }}>
          Loading Collection...
        </p>
      </div>
    );
  }

  const collection = collections.find((c) => c.id === id);
  const collectionProducts = products.filter((p) =>
    collection?.productIds.includes(p.id)
  );

  if (!collection) return null;

  return (
    <div>
      {/* Hero */}
      <div
        className="relative flex items-end overflow-hidden bg-[#1a1612]"
        style={{ height: "85vh" }}
      >
        <img
          src={collection.coverImage}
          alt={`${collection.name} editorial`}
          className="absolute inset-0 w-full h-full object-cover opacity-75"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(12,11,9,0.8) 0%, transparent 60%)",
          }}
        />
        <div className="relative z-10 px-8 md:px-16 pb-20 max-w-screen-xl mx-auto w-full">
          <p
            className="text-xs tracking-[0.3em] uppercase mb-4"
            style={{
              fontFamily: "Raleway, sans-serif",
              fontWeight: 300,
              color: "#B8955A",
            }}
          >
            {collection.season} {collection.year} · {collection.pieces} Pieces
          </p>
          <h1
            style={{
              fontFamily: "'Bodoni Moda', serif",
              fontWeight: 300,
              fontSize: "clamp(4rem, 8vw, 8rem)",
              lineHeight: 0.9,
              color: "#F7F4EE",
            }}
          >
            {collection.name}
          </h1>
          <p
            className="mt-5"
            style={{
              fontFamily: "'Bodoni Moda', serif",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "1.15rem",
              color: "rgba(247,244,238,0.65)",
            }}
          >
            {collection.tagline}
          </p>
        </div>
      </div>

      {/* Description */}
      <div className="max-w-screen-xl mx-auto px-8 md:px-16 py-24 md:py-36">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <p
              style={{
                fontFamily: "Raleway, sans-serif",
                fontWeight: 300,
                fontSize: "0.95rem",
                color: "#7A7468",
                lineHeight: 2,
              }}
            >
              {collection.description}
            </p>
            <div className="flex flex-col gap-6">
              {[
                { label: "Season", value: `${collection.season} ${collection.year}` },
                { label: "Pieces", value: `${collection.pieces} designs` },
                { label: "Presentation", value: "Manila, Philippines" },
                { label: "Available", value: "Made-to-order" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex justify-between py-4"
                  style={{
                    borderBottom: "1px solid rgba(12,11,9,0.1)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "Raleway, sans-serif",
                      fontWeight: 300,
                      fontSize: "0.75rem",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "#7A7468",
                    }}
                  >
                    {item.label}
                  </span>
                  <span
                    style={{
                      fontFamily: "Raleway, sans-serif",
                      fontWeight: 400,
                      fontSize: "0.82rem",
                      color: "#0C0B09",
                    }}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
        </div>

        {/* Pieces */}
        {collectionProducts.length > 0 && (
          <div className="mt-32">
              <p
                className="text-xs tracking-[0.3em] uppercase mb-16"
                style={{
                  fontFamily: "Raleway, sans-serif",
                  fontWeight: 300,
                  color: "#B8955A",
                }}
              >
                Selected Pieces
              </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {collectionProducts.map((p, i) => (
                  <div
                    className="group cursor-pointer"
                    onClick={() => onNavigate("boutique", p.id)}
                  >
                    <div
                      className="overflow-hidden bg-[#E8E4D9]"
                      style={{ aspectRatio: "3/4" }}
                    >
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-full object-cover transition-transform duration-[1000ms] group-hover:scale-105"
                      />
                    </div>
                    <div className="mt-5">
                      <p
                        className="text-xs tracking-[0.18em] uppercase mb-1"
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
                          fontSize: "1.2rem",
                          color: "#0C0B09",
                        }}
                      >
                        {p.name}
                      </h3>
                      <p
                        className="mt-1"
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
                  </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
