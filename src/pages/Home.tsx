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
import { Reveal, useReveal } from '../hooks/useScrollReveal';
import { useContent } from '../contexts/ContentContext';
import { EditableText } from '../components/EditableText';
import { EditableImage } from '../components/EditableImage';


export function HomePage({
  onNavigate,
  onAddToCart,
}: {
  onNavigate: (page: Page | string, extra?: string) => void;
  onAddToCart: (product: Product, quantity: number, size: string) => void;
}) {
  const { collections, products, loading, data: homeData } = useContent('home');

  if (loading || collections.length === 0 || products.length === 0) {
    return (
      <div className="pt-32 md:pt-40 pb-32 min-h-screen flex items-center justify-center">
        <p style={{ fontFamily: "Raleway, sans-serif", fontWeight: 300, color: "#7A7468", letterSpacing: "0.2em", textTransform: "uppercase", fontSize: "0.75rem" }}>
          Loading Home...
        </p>
      </div>
    );
  }

  const featuredCollection = collections[0];
  const featuredProduct = products.length > 3 ? products[3] : products[0];

  return (
    <div>
      {/* Hero */}
      <section className="relative h-screen flex items-end overflow-hidden bg-[#1a1612]">
        <EditableImage
          src={homeData?.heroImage || "https://images.unsplash.com/photo-1773574488220-569921a63d39?w=1920&h=1080&fit=crop&auto=format&q=90"}
          alt="Rian Fernandez couture — woman in sculptural gown with candelabras"
          collection="siteContent"
          documentId="home"
          field="heroImage"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ transform: "scale(1.04)", transition: "transform 8s ease" }}
          wrapperClassName="absolute inset-0 w-full h-full group z-0"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(12,11,9,0.75) 0%, rgba(12,11,9,0.15) 55%, transparent 100%)",
          }}
        />
        <div className="relative z-10 px-8 md:px-16 pb-20 md:pb-28 max-w-screen-xl mx-auto w-full pointer-events-none">
          <EditableText
            as="p"
            collection="siteContent"
            documentId="home"
            field="heroSubtitle"
            value={homeData?.heroSubtitle || "Spring / Summer 2025 Couture"}
            wrapperClassName="relative group inline-block mb-5 pointer-events-auto"
            className="text-xs tracking-[0.35em] uppercase"
            style={{
              fontFamily: "Raleway, sans-serif",
              fontWeight: 300,
              color: "rgba(247,244,238,0.55)",
            }}
          />
          <EditableText
            as="h1"
            collection="siteContent"
            documentId="home"
            field="heroTitle"
            value={homeData?.heroTitle || "Silénio"}
            wrapperClassName="relative group block pointer-events-auto"
            style={{
              fontFamily: "'Bodoni Moda', serif",
              fontWeight: 300,
              fontSize: "clamp(3.5rem, 8vw, 7.5rem)",
              lineHeight: 0.95,
              color: "#F7F4EE",
              letterSpacing: "-0.01em",
            }}
          />
          <EditableText
            as="p"
            collection="siteContent"
            documentId="home"
            field="heroTagline"
            value={homeData?.heroTagline || "In silence, beauty speaks."}
            wrapperClassName="relative group block mt-6 max-w-sm pointer-events-auto"
            style={{
              fontFamily: "'Bodoni Moda', serif",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "1.1rem",
              color: "rgba(247,244,238,0.7)",
              letterSpacing: "0.02em",
            }}
          />
          <div className="mt-10 flex items-center gap-10 pointer-events-auto">
            <button
              onClick={() =>
                onNavigate("collections", "silencio")
              }
              className="group flex items-center gap-3 transition-all duration-300"
              style={{
                fontFamily: "Raleway, sans-serif",
                fontWeight: 400,
                fontSize: "0.75rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "#F7F4EE",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              View Collection
              <ArrowRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-2"
              />
            </button>
            <div
              className="h-px flex-1 max-w-16"
              style={{ backgroundColor: "rgba(247,244,238,0.3)" }}
            />
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-10 right-12 flex flex-col items-center gap-3 z-10">
          <span
            style={{
              fontFamily: "Raleway, sans-serif",
              fontWeight: 300,
              fontSize: "0.65rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "rgba(247,244,238,0.4)",
              writingMode: "vertical-rl",
            }}
          >
            Scroll
          </span>
          <div
            className="w-px h-16"
            style={{
              background:
                "linear-gradient(to bottom, rgba(247,244,238,0.4), transparent)",
            }}
          />
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-32 md:py-48 px-8 md:px-16 max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
          <Reveal>
            <div
              className="overflow-hidden bg-[#E8E4D9]"
              style={{ aspectRatio: "3/4" }}
            >
              <EditableImage
                src={featuredCollection.image}
                alt={`${featuredCollection.name} collection`}
                collection="collections"
                documentId={featuredCollection.id}
                field="image"
                className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out hover:scale-105"
              />
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="md:pl-8">
              <p
                className="text-xs tracking-[0.3em] uppercase mb-6"
                style={{
                  fontFamily: "Raleway, sans-serif",
                  fontWeight: 300,
                  color: "#B8955A",
                }}
              >
                <EditableText collection="collections" documentId={featuredCollection.id} field="season" value={featuredCollection.season} />{' '}
                <EditableText collection="collections" documentId={featuredCollection.id} field="year" value={featuredCollection.year} />
              </p>
              <EditableText
                as="h2"
                collection="collections"
                documentId={featuredCollection.id}
                field="name"
                value={featuredCollection.name}
                wrapperClassName="relative group block"
                style={{
                  fontFamily: "'Bodoni Moda', serif",
                  fontWeight: 300,
                  fontSize: "clamp(3rem, 5vw, 5rem)",
                  lineHeight: 1,
                  letterSpacing: "-0.01em",
                  color: "#0C0B09",
                  display: "block",
                }}
              />
              <EditableText
                as="p"
                collection="collections"
                documentId={featuredCollection.id}
                field="tagline"
                value={featuredCollection.tagline}
                className="mt-8 leading-relaxed"
                wrapperClassName="relative group block"
                style={{
                  fontFamily: "'Bodoni Moda', serif",
                  fontStyle: "italic",
                  fontWeight: 300,
                  fontSize: "1.05rem",
                  color: "#7A7468",
                  lineHeight: 1.9,
                  display: "block",
                }}
              />
              <EditableText
                as="p"
                collection="collections"
                documentId={featuredCollection.id}
                field="description"
                value={featuredCollection.description}
                className="mt-5 leading-relaxed max-w-md"
                wrapperClassName="relative group block"
                style={{
                  fontFamily: "Raleway, sans-serif",
                  fontWeight: 300,
                  fontSize: "0.87rem",
                  color: "#7A7468",
                  lineHeight: 1.95,
                  display: "block",
                }}
              />
              <button
                onClick={() =>
                  onNavigate("collections", featuredCollection.id)
                }
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
                View Collection
                <span
                  className="h-px transition-all duration-500 group-hover:w-16"
                  style={{
                    display: "inline-block",
                    width: "2rem",
                    backgroundColor: "#B8955A",
                  }}
                />
                <ArrowRight
                  size={13}
                  strokeWidth={1.5}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                  style={{ color: "#B8955A" }}
                />
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Designer Intro */}
      <section
        className="py-32 md:py-48"
        style={{ backgroundColor: "#0C0B09" }}
      >
        <div className="max-w-screen-xl mx-auto px-8 md:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
            <Reveal>
              <div className="order-2 md:order-1 md:pr-8">
                <EditableText
                  as="p"
                  collection="siteContent"
                  documentId="home"
                  field="designerSubtitle"
                  value={homeData?.designerSubtitle || "The Designer"}
                  wrapperClassName="relative group block mb-8"
                  className="text-xs tracking-[0.3em] uppercase"
                  style={{
                    fontFamily: "Raleway, sans-serif",
                    fontWeight: 300,
                    color: "#B8955A",
                  }}
                />
                <h2
                  style={{
                    fontFamily: "'Bodoni Moda', serif",
                    fontWeight: 300,
                    fontSize: "clamp(2.5rem, 4vw, 4rem)",
                    lineHeight: 1.05,
                    letterSpacing: "-0.01em",
                    color: "#F7F4EE",
                  }}
                >
                  <EditableText
                    as="span"
                    collection="siteContent"
                    documentId="home"
                    field="designerHeading1"
                    value={homeData?.designerHeading1 || "Craft Inherited."}
                    wrapperClassName="relative group inline-block"
                  />
                  <br />
                  <EditableText
                    as="em"
                    collection="siteContent"
                    documentId="home"
                    field="designerHeading2"
                    value={homeData?.designerHeading2 || "Vision Singular."}
                    wrapperClassName="relative group inline-block"
                    style={{ fontStyle: "italic" }}
                  />
                </h2>
                <EditableText
                  as="p"
                  collection="siteContent"
                  documentId="home"
                  field="designerText"
                  value={homeData?.designerText || "Rian Fernandez grew up watching his mother sew. Today, his designs are worn at state dinners, film premieres, and quiet moments that no camera ever captures. He believes that the most beautiful garment is the one you wear when no one is watching."}
                  wrapperClassName="relative group block mt-8 max-w-md"
                  className="leading-relaxed"
                  style={{
                    fontFamily: "Raleway, sans-serif",
                    fontWeight: 300,
                    fontSize: "0.88rem",
                    color: "rgba(247,244,238,0.55)",
                    lineHeight: 1.95,
                  }}
                />
                <button
                  onClick={() => onNavigate("designer")}
                  className="group mt-12 flex items-center gap-4"
                  style={{
                    fontFamily: "Raleway, sans-serif",
                    fontWeight: 400,
                    fontSize: "0.72rem",
                    letterSpacing: "0.28em",
                    textTransform: "uppercase",
                    color: "rgba(247,244,238,0.7)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                  }}
                >
                  Read More
                  <ArrowRight
                    size={13}
                    strokeWidth={1.5}
                    className="transition-transform duration-300 group-hover:translate-x-2"
                    style={{ color: "#B8955A" }}
                  />
                </button>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <EditableImage
                src={homeData?.designerImage || "https://images.unsplash.com/photo-1758749646094-606f23edaef6?w=800&h=1100&fit=crop&auto=format&q=80"}
                alt="Rian Fernandez, Filipino couture designer"
                collection="siteContent"
                documentId="home"
                field="designerImage"
                wrapperClassName="order-1 md:order-2 overflow-hidden bg-[#1a1612] relative group block w-full"
                wrapperStyle={{ aspectRatio: "3/4" }}
                className="w-full h-full object-cover opacity-90 transition-transform duration-[1200ms] hover:scale-105"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Featured Masterpiece */}
      <section className="relative overflow-hidden bg-[#1a1612]" style={{ minHeight: "100vh" }}>
        {featuredProduct ? (
          <>
            <EditableImage
              src={featuredProduct.image}
              alt={featuredProduct.name}
              collection="products"
              documentId={featuredProduct.id}
              field="image"
              wrapperClassName="absolute inset-0 w-full h-full group z-0"
              className="absolute inset-0 w-full h-full object-cover opacity-80"
              style={{ objectPosition: "60% center" }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to right, rgba(26,22,18,0.95) 0%, rgba(26,22,18,0.7) 45%, transparent 100%)",
                pointerEvents: "none",
              }}
            />
    
            <div className="relative z-10 flex items-center h-full min-h-[100vh] px-8 md:px-20 py-32 pointer-events-none">
              <div className="max-w-xl pointer-events-auto">
                <Reveal>
                  <EditableText
                    as="p"
                    collection="products"
                    documentId={featuredProduct.id}
                    field="category"
                    value={featuredProduct.category}
                    wrapperClassName="relative group block mb-6"
                    className="text-[0.65rem] tracking-[0.25em] uppercase"
                    style={{
                      fontFamily: "Raleway, sans-serif",
                      fontWeight: 400,
                      color: "#A88D56",
                    }}
                  />
                  <EditableText
                    as="h2"
                    collection="products"
                    documentId={featuredProduct.id}
                    field="name"
                    value={featuredProduct.name}
                    wrapperClassName="relative group block mb-6"
                    style={{
                      fontFamily: "'Bodoni Moda', serif",
                      fontWeight: 400,
                      fontSize: "clamp(3rem, 6vw, 4.8rem)",
                      lineHeight: 1.1,
                      letterSpacing: "0.02em",
                      color: "#F7F4EE",
                    }}
                  />
                  <EditableText
                    as="p"
                    collection="products"
                    documentId={featuredProduct.id}
                    field="description"
                    value={featuredProduct.description}
                    wrapperClassName="relative group block mb-12"
                    className="leading-relaxed opacity-80 max-w-lg"
                    style={{
                      fontFamily: "Raleway, sans-serif",
                      fontWeight: 300,
                      fontSize: "0.85rem",
                      color: "#F7F4EE",
                      lineHeight: 1.8,
                    }}
                  />
                  <button
                    onClick={() => onNavigate("boutique", featuredProduct.id)}
                    className="group text-[0.7rem] tracking-[0.2em] uppercase px-8 py-3.5 transition-all duration-300 hover:bg-[#E8E4D9]"
                    style={{
                      fontFamily: "Raleway, sans-serif",
                      fontWeight: 500,
                      backgroundColor: "#F7F4EE",
                      color: "#0C0B09",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Discover the Craft
                  </button>
                </Reveal>
              </div>
            </div>
          </>
        ) : null}
      </section>

      {/* Book Consultation */}
      <section className="py-40 md:py-56 px-8 text-center" style={{ backgroundColor: "#F7F4EE" }}>
        <Reveal>
          <p
            className="text-xs tracking-[0.3em] uppercase mb-8"
            style={{
              fontFamily: "Raleway, sans-serif",
              fontWeight: 300,
              color: "#B8955A",
            }}
          >
            <EditableText
              as="span"
              collection="siteContent"
              documentId="home"
              field="ctaSubtitle"
              value={homeData?.ctaSubtitle || "Begin Your Couture Journey"}
            />
          </p>
          <h2
            style={{
              fontFamily: "'Bodoni Moda', serif",
              fontWeight: 300,
              fontSize: "clamp(2.5rem, 5vw, 5rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.01em",
              color: "#0C0B09",
            }}
          >
            <EditableText
              as="span"
              collection="siteContent"
              documentId="home"
              field="ctaTitle1"
              value={homeData?.ctaTitle1 || "Every Gown Begins"}
            />
            <br />
            <em style={{ fontStyle: "italic" }}>
              <EditableText
                as="span"
                collection="siteContent"
                documentId="home"
                field="ctaTitle2"
                value={homeData?.ctaTitle2 || "With a Conversation."}
              />
            </em>
          </h2>
          <p
            className="mt-8 mx-auto max-w-md"
            style={{
              fontFamily: "Raleway, sans-serif",
              fontWeight: 300,
              fontSize: "0.88rem",
              color: "#7A7468",
              lineHeight: 1.95,
            }}
          >
            <EditableText
              as="span"
              collection="siteContent"
              documentId="home"
              field="ctaDescription"
              value={homeData?.ctaDescription || "Schedule a private appointment at the Makati atelier. Rian and his team will guide you through fabrics, silhouettes, and the extraordinary process of commissioning a piece made only for you."}
            />
          </p>
          <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigate("appointments")}
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
              Book a Consultation
            </button>
            <button
              onClick={() => onNavigate("atelier")}
              className="group flex items-center gap-3"
              style={{
                fontFamily: "Raleway, sans-serif",
                fontWeight: 300,
                fontSize: "0.75rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#7A7468",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              See the Atelier
              <ArrowRight
                size={13}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
