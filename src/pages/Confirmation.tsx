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
import { COLLECTIONS, PRODUCTS, JOURNAL_ENTRIES } from '../data';
import { Reveal, useReveal } from '../hooks/useScrollReveal';


export function ConfirmationPage({ onNavigate }: { onNavigate: (page: Page) => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center text-center px-8 pt-20">
      <div>
        <div
          className="w-16 h-px mx-auto mb-12"
          style={{ backgroundColor: "#B8955A" }}
        />
        <p
          className="text-xs tracking-[0.35em] uppercase mb-8"
          style={{ fontFamily: "Raleway, sans-serif", fontWeight: 300, color: "#B8955A" }}
        >
          Order Confirmed
        </p>
        <h1
          style={{
            fontFamily: "'Bodoni Moda', serif",
            fontWeight: 300,
            fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
            color: "#0C0B09",
            lineHeight: 1.05,
          }}
        >
          Thank you
          <br />
          <em style={{ fontStyle: "italic" }}>for your trust.</em>
        </h1>
        <p
          className="mt-8 mx-auto max-w-md"
          style={{
            fontFamily: "Raleway, sans-serif",
            fontWeight: 300,
            fontSize: "0.87rem",
            color: "#7A7468",
            lineHeight: 1.95,
          }}
        >
          Your order has been received. A member of the atelier team will
          contact you within 24 hours to begin the commission process and
          schedule your first fitting. This is where the extraordinary begins.
        </p>
        <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-5">
          <button
            onClick={() => onNavigate("home")}
            className="text-xs tracking-[0.25em] uppercase px-10 py-4 transition-all duration-300 hover:bg-[#0C0B09] hover:text-[#F7F4EE]"
            style={{
              fontFamily: "Raleway, sans-serif",
              fontWeight: 400,
              border: "1px solid #0C0B09",
              color: "#0C0B09",
              background: "transparent",
              cursor: "pointer",
            }}
          >
            Return Home
          </button>
          <button
            onClick={() => onNavigate("collections")}
            className="group flex items-center gap-3 text-xs tracking-[0.2em] uppercase"
            style={{
              fontFamily: "Raleway, sans-serif",
              fontWeight: 300,
              color: "#7A7468",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            Continue Exploring
            <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
}
