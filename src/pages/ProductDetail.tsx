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
import { Page, Product } from '../types';
import { formatPrice } from '../data';
import { useContent } from '../contexts/ContentContext';
import { Reveal, useReveal } from '../hooks/useScrollReveal';


export function ProductDetailPage({
  onNavigate,
  onAddToCart,
}: {
  onNavigate: (page: Page | string, extra?: string) => void;
  onAddToCart: (product: Product, quantity: number, size: string) => void;
}) {
  const { id } = useParams();
  const { collections, products, loading } = useContent();

  if (loading) {
    return (
      <div className="pt-32 md:pt-40 pb-32 min-h-screen flex items-center justify-center">
        <p style={{ fontFamily: "Raleway, sans-serif", fontWeight: 300, color: "#7A7468", letterSpacing: "0.2em", textTransform: "uppercase", fontSize: "0.75rem" }}>
          Loading Product...
        </p>
      </div>
    );
  }

  const product = products.find((p) => p.id === id);
  const collection = collections.find((c) => c.id === product?.collectionId);
  const [selectedSize, setSelectedSize] = useState("34");
  const [activeImage, setActiveImage] = useState(0);
  const [openDetails, setOpenDetails] = useState(false);
  const [added, setAdded] = useState(false);
  const sizes = ["32", "34", "36", "38", "40", "42"];

  if (!product) return null;

  const currentIndex = products.findIndex((p) => p.id === id);
  const prevProduct = currentIndex > 0 ? products[currentIndex - 1] : products[products.length - 1];
  const nextProduct = currentIndex < products.length - 1 ? products[currentIndex + 1] : products[0];

  const handleAdd = () => {
    onAddToCart(product, 1, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  return (
    <div className="pt-36 md:pt-40 pb-32">
      <div className="max-w-screen-xl mx-auto px-8 md:px-16">
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center justify-between mb-14">
          <div className="flex items-center gap-3">
            {[
            { label: "The Boutique", page: "boutique" as Page },
            { label: collection?.name || "", page: "collections" as Page, extra: collection?.id },
            { label: product.name, page: null },
          ].map((item, i) => (
            <span key={i} className="flex items-center gap-3">
              {i > 0 && (
                <span style={{ color: "rgba(12,11,9,0.2)", fontSize: "0.7rem" }}>
                  /
                </span>
              )}
              {item.page ? (
                <button
                  onClick={() => onNavigate(item.page!, item.extra)}
                  style={{
                    fontFamily: "Raleway, sans-serif",
                    fontWeight: 300,
                    fontSize: "0.72rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "#7A7468",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  {item.label}
                </button>
              ) : (
                <span
                  style={{
                    fontFamily: "Raleway, sans-serif",
                    fontWeight: 400,
                    fontSize: "0.72rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "#0C0B09",
                  }}
                >
                  {item.label}
                </span>
              )}
            </span>
          ))}
          </div>

          {/* Prev / Next Arrows */}
          <div className="flex items-center gap-4 hidden md:flex">
            <button
              onClick={() => onNavigate('boutique', prevProduct.id)}
              className="flex items-center gap-2 text-[#7A7468] hover:text-[#0C0B09] transition-colors"
              style={{ fontFamily: "Raleway, sans-serif", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase" }}
            >
              <ArrowRight size={14} strokeWidth={1} className="rotate-180" />
              Prev
            </button>
            <span style={{ color: "rgba(12,11,9,0.2)" }}>|</span>
            <button
              onClick={() => onNavigate('boutique', nextProduct.id)}
              className="flex items-center gap-2 text-[#7A7468] hover:text-[#0C0B09] transition-colors"
              style={{ fontFamily: "Raleway, sans-serif", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase" }}
            >
              Next
              <ArrowRight size={14} strokeWidth={1} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 lg:gap-32">
          {/* Images */}
          <div>
            <div
              className="overflow-hidden bg-[#E8E4D9]"
              style={{ aspectRatio: "3/4" }}
            >
              <img
                src={product.images[activeImage]}
                alt={product.name}
                className="w-full h-full object-cover transition-opacity duration-500"
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-3 mt-4">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className="overflow-hidden bg-[#E8E4D9] transition-opacity duration-200"
                    style={{
                      width: "72px",
                      aspectRatio: "3/4",
                      opacity: activeImage === i ? 1 : 0.45,
                      border: activeImage === i ? "1px solid #0C0B09" : "1px solid transparent",
                      cursor: "pointer",
                    }}
                  >
                    <img
                      src={img}
                      alt={`${product.name} view ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="py-4">
            <p
              className="text-xs tracking-[0.25em] uppercase mb-3"
              style={{
                fontFamily: "Raleway, sans-serif",
                fontWeight: 300,
                color: "#B8955A",
              }}
            >
              {product.category} · {collection?.name} {collection?.year}
            </p>
            <h1
              style={{
                fontFamily: "'Bodoni Moda', serif",
                fontWeight: 300,
                fontSize: "clamp(2rem, 3.5vw, 3.2rem)",
                lineHeight: 1.1,
                color: "#0C0B09",
              }}
            >
              {product.name}
            </h1>
            <p
              className="mt-4"
              style={{
                fontFamily: "Raleway, sans-serif",
                fontWeight: 300,
                fontSize: "1rem",
                color: "#7A7468",
              }}
            >
              {formatPrice(product.price)}
            </p>

            <div
              className="my-8 h-px"
              style={{ backgroundColor: "rgba(12,11,9,0.1)" }}
            />

            <p
              className="leading-relaxed"
              style={{
                fontFamily: "Raleway, sans-serif",
                fontWeight: 300,
                fontSize: "0.87rem",
                color: "#7A7468",
                lineHeight: 1.95,
              }}
            >
              {product.description}
            </p>

            {/* Size */}
            <div className="mt-10">
              <p
                className="text-xs tracking-[0.2em] uppercase mb-4"
                style={{
                  fontFamily: "Raleway, sans-serif",
                  fontWeight: 400,
                  color: "#0C0B09",
                }}
              >
                Size — FR {selectedSize}
              </p>
              <div className="flex gap-2 flex-wrap">
                {sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className="transition-all duration-200"
                    style={{
                      fontFamily: "Raleway, sans-serif",
                      fontWeight: 300,
                      fontSize: "0.78rem",
                      width: "44px",
                      height: "44px",
                      border:
                        selectedSize === s
                          ? "1px solid #0C0B09"
                          : "1px solid rgba(12,11,9,0.2)",
                      color: selectedSize === s ? "#0C0B09" : "#7A7468",
                      backgroundColor:
                        selectedSize === s
                          ? "rgba(12,11,9,0.05)"
                          : "transparent",
                      cursor: "pointer",
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to cart */}
            <button
              onClick={handleAdd}
              className="mt-8 w-full py-4 text-xs tracking-[0.28em] uppercase transition-all duration-400"
              style={{
                fontFamily: "Raleway, sans-serif",
                fontWeight: 400,
                backgroundColor: added ? "#B8955A" : "#0C0B09",
                color: "#F7F4EE",
                border: "none",
                cursor: "pointer",
                letterSpacing: "0.28em",
              }}
            >
              {added ? "Added to Dossier" : "Add to Dossier"}
            </button>

            <button
              onClick={() => onNavigate("appointments")}
              className="mt-3 w-full py-4 text-xs tracking-[0.22em] uppercase transition-all duration-300 hover:bg-[#0C0B09] hover:text-[#F7F4EE]"
              style={{
                fontFamily: "Raleway, sans-serif",
                fontWeight: 300,
                border: "1px solid rgba(12,11,9,0.25)",
                color: "#7A7468",
                backgroundColor: "transparent",
                cursor: "pointer",
              }}
            >
              Book a Private Fitting
            </button>

            {/* Details accordion */}
            <div
              className="mt-10 border-t"
              style={{ borderColor: "rgba(12,11,9,0.1)" }}
            >
              <button
                onClick={() => setOpenDetails(!openDetails)}
                className="w-full flex justify-between items-center py-5"
                style={{
                  fontFamily: "Raleway, sans-serif",
                  fontWeight: 400,
                  fontSize: "0.72rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "#0C0B09",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Craftsmanship Details
                <ChevronDown
                  size={14}
                  style={{
                    transition: "transform 0.3s",
                    transform: openDetails ? "rotate(180deg)" : "rotate(0deg)",
                    color: "#7A7468",
                  }}
                />
              </button>
              <div
                style={{
                  maxHeight: openDetails ? "400px" : "0",
                  overflow: "hidden",
                  transition: "max-height 0.4s ease",
                }}
              >
                <div className="pb-6">
                  {product.details.map((d) => (
                    <div
                      key={d}
                      className="flex gap-4 py-2.5"
                      style={{ borderBottom: "1px solid rgba(12,11,9,0.06)" }}
                    >
                      <span
                        style={{
                          fontFamily: "Raleway, sans-serif",
                          fontWeight: 300,
                          fontSize: "0.82rem",
                          color: "#7A7468",
                        }}
                      >
                        {d}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
