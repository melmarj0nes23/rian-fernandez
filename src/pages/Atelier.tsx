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
import { EditableText } from '../components/EditableText';
import { EditableImage } from '../components/EditableImage';
import { Reveal, useReveal } from '../hooks/useScrollReveal';


export function AtelierPage({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const { data: atelierData } = useContent('atelier');
  const steps = [
    {
      number: "01",
      title: "The Consultation",
      description:
        "Every commission begins with a private meeting at the Makati atelier. Rian listens. He asks not about occasions but about feelings — how you want to move through a room, what you want a garment to say when words cannot.",
    },
    {
      number: "02",
      title: "The Vision",
      description:
        "Following the consultation, the atelier presents a bespoke design proposal: hand-rendered illustrations, fabric swatches, and silhouette studies. Every element is chosen for you and you alone.",
    },
    {
      number: "03",
      title: "The Fabric",
      description:
        "Textiles are sourced from partner mills in Lyon, Como, and Pampanga. All piña cloth is woven to specification by artisans in Aklan. The fabric is the foundation; it receives no compromise.",
    },
    {
      number: "04",
      title: "The Fittings",
      description:
        "Three to five private fittings over eight to twelve weeks. The toile is made, adjusted, re-made. The pattern is cut directly for your measurements and will never be used for any other client.",
    },
    {
      number: "05",
      title: "The Delivery",
      description:
        "The finished garment is delivered in a custom archival box with a certificate of provenance, care instructions handwritten by Rian, and a personal note. It is yours — entirely, permanently, irreversibly.",
    },
  ];

  return (
    <div>
      {/* Hero */}
      <div
        className="relative flex items-center justify-center overflow-hidden bg-[#1a1612]"
        style={{ height: "80vh" }}
      >
        <EditableImage
          src={atelierData?.heroImage || "https://images.unsplash.com/photo-1457972657980-4c9fddebec8d?w=1920&h=1080&fit=crop&auto=format&q=85"}
          alt="Couture atelier — pinning fabric"
          collection="siteContent"
          documentId="atelier"
          field="heroImage"
          wrapperClassName="absolute inset-0 w-full h-full group z-0"
          className="absolute inset-0 w-full h-full object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-[#0C0B09]/40 pointer-events-none" />
        <div className="relative z-10 text-center px-8 pointer-events-none">
          <p
            className="text-xs tracking-[0.35em] uppercase mb-6"
            style={{
              fontFamily: "Raleway, sans-serif",
              fontWeight: 300,
              color: "#B8955A",
            }}
          >
            Where Everything Begins
          </p>
          <EditableText
            as="h1"
            collection="siteContent"
            documentId="atelier"
            field="heroTitle"
            value={atelierData?.heroTitle || "The Atelier"}
            wrapperClassName="relative group block pointer-events-auto"
            style={{
              fontFamily: "'Bodoni Moda', serif",
              fontWeight: 300,
              fontSize: "clamp(3.5rem, 6vw, 6rem)",
              lineHeight: 1,
              letterSpacing: "-0.02em",
              color: "#F7F4EE",
              display: "block",
            }}
          />
          <EditableText
            as="p"
            collection="siteContent"
            documentId="atelier"
            field="heroSubtitle"
            value={atelierData?.heroSubtitle || "Where dreams are woven into reality"}
            wrapperClassName="relative group block mt-6 pointer-events-auto"
            style={{
              fontFamily: "'Bodoni Moda', serif",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "1.2rem",
              color: "rgba(247,244,238,0.7)",
              display: "block",
            }}
          />
        </div>
      </div>

      {/* Intro */}
      <div className="max-w-screen-xl mx-auto px-8 md:px-16 py-28">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <Reveal>
            <EditableText
              as="h2"
              collection="siteContent"
              documentId="atelier"
              field="section1Title"
              value={atelierData?.section1Title || "The Art of Haute Couture"}
              wrapperClassName="relative group block"
              style={{
                fontFamily: "'Bodoni Moda', serif",
                fontWeight: 300,
                fontSize: "clamp(2rem, 4vw, 3rem)",
                color: "#0C0B09",
                display: "block",
              }}
            />
          </Reveal>
          <Reveal delay={100}>
            <EditableText
              as="p"
              collection="siteContent"
              documentId="atelier"
              field="section1Content"
              value={atelierData?.section1Content || "The Rian Fernandez atelier in Makati City is a sanctuary of deliberate work. Eighteen artisans — among the most skilled dressmakers in the Philippines — collaborate on each commission. Some have been with the maison since the first collection. Every one of them is irreplaceable. We do not produce. We create. The distinction is everything."}
              wrapperClassName="relative group block"
              style={{
                fontFamily: "Raleway, sans-serif",
                fontWeight: 300,
                fontSize: "1rem",
                color: "#7A7468",
                lineHeight: 2,
                display: "block",
              }}
            />
          </Reveal>
        </div>
      </div>

      {/* Process */}
      <div
        className="py-28 md:py-40"
        style={{ backgroundColor: "#0C0B09" }}
      >
        <div className="max-w-screen-xl mx-auto px-8 md:px-16">
          <Reveal>
            <p
              className="text-xs tracking-[0.35em] uppercase mb-16 text-center"
              style={{
                fontFamily: "Raleway, sans-serif",
                fontWeight: 300,
                color: "#B8955A",
              }}
            >
              The Couture Process
            </p>
          </Reveal>
          <div className="space-y-0">
            {steps.map((step, i) => (
              <Reveal key={step.number} delay={i * 60}>
                <div
                  className="grid grid-cols-12 gap-8 py-12"
                  style={{ borderTop: "1px solid rgba(247,244,238,0.1)" }}
                >
                  <div className="col-span-2">
                    <span
                      style={{
                        fontFamily: "'Bodoni Moda', serif",
                        fontWeight: 300,
                        fontSize: "0.9rem",
                        color: "#B8955A",
                        letterSpacing: "0.1em",
                      }}
                    >
                      {step.number}
                    </span>
                  </div>
                  <div className="col-span-4">
                    <h3
                      style={{
                        fontFamily: "'Bodoni Moda', serif",
                        fontWeight: 300,
                        fontSize: "1.6rem",
                        color: "#F7F4EE",
                        lineHeight: 1.1,
                      }}
                    >
                      {step.title}
                    </h3>
                  </div>
                  <div className="col-span-6">
                    <p
                      style={{
                        fontFamily: "Raleway, sans-serif",
                        fontWeight: 300,
                        fontSize: "0.87rem",
                        color: "rgba(247,244,238,0.5)",
                        lineHeight: 1.95,
                      }}
                    >
                      {step.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* Second image section */}
      <div className="max-w-screen-xl mx-auto px-8 md:px-16 py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Reveal>
            <div className="bg-[#E8E4D9] overflow-hidden" style={{ aspectRatio: "4/3" }}>
              <EditableImage
                src={atelierData?.image1 || "https://images.unsplash.com/photo-1558724128-dbdf795b86ea?auto=format&fit=crop&q=80"}
                alt="Atelier detail 1"
                collection="siteContent"
                documentId="atelier"
                field="image1"
                wrapperClassName="relative group block w-full h-full"
                className="w-full h-full object-cover opacity-90 transition-transform duration-[2000ms] ease-out hover:scale-105"
              />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="bg-[#E8E4D9] overflow-hidden" style={{ aspectRatio: "4/3" }}>
              <EditableImage
                src={atelierData?.image2 || "https://images.unsplash.com/photo-1596939097613-733faff08908?w=800&h=600&fit=crop&auto=format&q=80"}
                alt="Detail of couture fabric work"
                collection="siteContent"
                documentId="atelier"
                field="image2"
                wrapperClassName="relative group block w-full h-full"
                className="w-full h-full object-cover opacity-90 transition-transform duration-[2000ms] ease-out hover:scale-105"
              />
            </div>
          </Reveal>
        </div>

        <Reveal delay={80}>
          <div className="text-center mt-24">
            <button
              onClick={() => onNavigate("appointments")}
              className="text-xs tracking-[0.25em] uppercase px-12 py-5 transition-all duration-300 hover:bg-[#0C0B09] hover:text-[#F7F4EE]"
              style={{
                fontFamily: "Raleway, sans-serif",
                fontWeight: 400,
                border: "1px solid #0C0B09",
                color: "#0C0B09",
                background: "transparent",
                cursor: "pointer",
              }}
            >
              Begin Your Commission
            </button>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
