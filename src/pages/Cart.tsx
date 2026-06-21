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
import { Page, Collection, Product, CartItem, JournalEntry } from '../types';
import { COLLECTIONS, formatPrice, PRODUCTS, JOURNAL_ENTRIES } from '../data';
import { Reveal, useReveal } from '../hooks/useScrollReveal';
import { useAuth } from '../contexts/AuthContext';


export function CartPage({
  cart,
  onUpdateQty,
  onRemove,
  onNavigate,
}: {
  cart: CartItem[];
  onUpdateQty: (productId: string, size: string, qty: number) => void;
  onRemove: (productId: string, size: string) => void;
  onNavigate: (page: Page) => void;
}) {
  const { user } = useAuth();
  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center px-8 pt-20">
        <div>
          <ShoppingBag size={36} strokeWidth={1} style={{ color: "#7A7468", margin: "0 auto 24px" }} />
          <h2
            style={{
              fontFamily: "'Bodoni Moda', serif",
              fontWeight: 300,
              fontSize: "2.5rem",
              color: "#0C0B09",
            }}
          >
            Your dossier is empty.
          </h2>
          <p
            className="mt-4"
            style={{
              fontFamily: "Raleway, sans-serif",
              fontWeight: 300,
              fontSize: "0.87rem",
              color: "#7A7468",
            }}
          >
            Discover our couture pieces and begin your journey.
          </p>
          <button
            onClick={() => onNavigate("boutique")}
            className="mt-10 text-xs tracking-[0.25em] uppercase px-10 py-4 transition-all duration-300 hover:bg-[#0C0B09] hover:text-[#F7F4EE]"
            style={{
              fontFamily: "Raleway, sans-serif",
              fontWeight: 400,
              border: "1px solid #0C0B09",
              color: "#0C0B09",
              background: "transparent",
              cursor: "pointer",
            }}
          >
            Explore the Boutique
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-36 pb-32">
      <div className="max-w-screen-xl mx-auto px-8 md:px-16">
        <Reveal>
          <h1
            className="mb-16"
            style={{
              fontFamily: "'Bodoni Moda', serif",
              fontWeight: 300,
              fontSize: "clamp(3rem, 6vw, 5.5rem)",
              color: "#0C0B09",
              lineHeight: 0.95,
            }}
          >
            Your Dossier
          </h1>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
          {/* Items */}
          <div className="lg:col-span-2">
            {cart.map((item, i) => (
              <div
                key={`${item.product.id}-${item.size}`}
                className="grid grid-cols-3 gap-8 py-10"
                style={{ borderTop: i === 0 ? "1px solid rgba(12,11,9,0.12)" : "none", borderBottom: "1px solid rgba(12,11,9,0.12)" }}
              >
                <div
                  className="overflow-hidden bg-[#E8E4D9]"
                  style={{ aspectRatio: "3/4" }}
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="col-span-2 flex flex-col justify-between">
                  <div>
                    <p
                      className="text-xs tracking-[0.18em] uppercase mb-1"
                      style={{ fontFamily: "Raleway, sans-serif", fontWeight: 300, color: "#7A7468" }}
                    >
                      {item.product.category}
                    </p>
                    <h3
                      style={{
                        fontFamily: "'Bodoni Moda', serif",
                        fontWeight: 300,
                        fontSize: "1.35rem",
                        color: "#0C0B09",
                      }}
                    >
                      {item.product.name}
                    </h3>
                    <p
                      className="mt-1"
                      style={{ fontFamily: "Raleway, sans-serif", fontWeight: 300, fontSize: "0.82rem", color: "#7A7468" }}
                    >
                      Size FR {item.size}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => onUpdateQty(item.product.id, item.size, item.quantity - 1)}
                        style={{ background: "none", border: "none", cursor: "pointer", color: "#7A7468" }}
                      >
                        <Minus size={14} strokeWidth={1.5} />
                      </button>
                      <span
                        style={{
                          fontFamily: "Raleway, sans-serif",
                          fontWeight: 300,
                          fontSize: "0.87rem",
                          color: "#0C0B09",
                          minWidth: "20px",
                          textAlign: "center",
                        }}
                      >
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQty(item.product.id, item.size, item.quantity + 1)}
                        style={{ background: "none", border: "none", cursor: "pointer", color: "#7A7468" }}
                      >
                        <Plus size={14} strokeWidth={1.5} />
                      </button>
                    </div>
                    <div className="flex items-center gap-6">
                      <p
                        style={{ fontFamily: "Raleway, sans-serif", fontWeight: 300, fontSize: "0.87rem", color: "#0C0B09" }}
                      >
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                      <button
                        onClick={() => onRemove(item.product.id, item.size)}
                        style={{ background: "none", border: "none", cursor: "pointer", color: "#7A7468" }}
                      >
                        <X size={14} strokeWidth={1.5} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div>
            <div
              className="p-8"
              style={{ backgroundColor: "#E8E4D9" }}
            >
              <h3
                className="mb-8"
                style={{ fontFamily: "'Bodoni Moda', serif", fontWeight: 300, fontSize: "1.5rem", color: "#0C0B09" }}
              >
                Order Summary
              </h3>
              <div className="space-y-4 mb-8">
                {[
                  { label: "Subtotal", value: formatPrice(subtotal) },
                  { label: "Shipping", value: "By arrangement" },
                  { label: "Duties & Taxes", value: "Calculated at checkout" },
                ].map((row) => (
                  <div key={row.label} className="flex justify-between">
                    <span style={{ fontFamily: "Raleway, sans-serif", fontWeight: 300, fontSize: "0.82rem", color: "#7A7468" }}>
                      {row.label}
                    </span>
                    <span style={{ fontFamily: "Raleway, sans-serif", fontWeight: 300, fontSize: "0.82rem", color: "#0C0B09" }}>
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
              <div
                className="flex justify-between pt-6 mb-8"
                style={{ borderTop: "1px solid rgba(12,11,9,0.15)" }}
              >
                <span style={{ fontFamily: "Raleway, sans-serif", fontWeight: 400, fontSize: "0.82rem", color: "#0C0B09", textTransform: "uppercase", letterSpacing: "0.12em" }}>
                  Estimated Total
                </span>
                <span style={{ fontFamily: "'Bodoni Moda', serif", fontWeight: 400, fontSize: "1.1rem", color: "#0C0B09" }}>
                  {formatPrice(subtotal)}
                </span>
              </div>
              <button
                onClick={() => onNavigate(user ? "checkout" : "login")}
                className="w-full py-4 text-xs tracking-[0.25em] uppercase transition-all duration-300"
                style={{
                  fontFamily: "Raleway, sans-serif",
                  fontWeight: 400,
                  backgroundColor: "#0C0B09",
                  color: "#F7F4EE",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {user ? "Proceed to Checkout" : "Sign in to Checkout"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
