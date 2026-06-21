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
import { useContent } from '../contexts/ContentContext';
import { EditableText } from '../components/EditableText';
import { EditableImage } from '../components/EditableImage';


export function DesignerPage({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const { data: designerData } = useContent('designer');
  return (
    <div>
      {/* Hero */}
      <div
        className="relative flex items-end overflow-hidden bg-[#1a1612]"
        style={{ height: "90vh" }}
      >
        <EditableImage
          src={designerData?.heroImage || "https://images.unsplash.com/photo-1773574488217-eb936b733cae?w=1920&h=1080&fit=crop&auto=format&q=85"}
          alt="Rian Fernandez"
          collection="siteContent"
          documentId="designer"
          field="heroImage"
          wrapperClassName="absolute inset-0 w-full h-full group z-0"
          className="absolute inset-0 w-full h-full object-cover opacity-65"
          style={{ objectPosition: "center 30%" }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(12,11,9,0.85) 0%, rgba(12,11,9,0.1) 55%, transparent 100%)",
          }}
        />
        <div className="relative z-10 px-8 md:px-16 pb-24 max-w-screen-xl mx-auto w-full pointer-events-none">
          <EditableText
            as="p"
            collection="siteContent"
            documentId="designer"
            field="heroSubtitle"
            value={designerData?.heroSubtitle || "The Designer"}
            wrapperClassName="relative group block mb-5 pointer-events-auto"
            className="text-xs tracking-[0.35em] uppercase"
            style={{
              fontFamily: "Raleway, sans-serif",
              fontWeight: 300,
              color: "#B8955A",
            }}
          />
          <EditableText
            as="h1"
            collection="siteContent"
            documentId="designer"
            field="heroTitle"
            value={designerData?.heroTitle || "Rian\nFernandez"}
            wrapperClassName="relative group block pointer-events-auto"
            className="whitespace-pre-line"
            style={{
              fontFamily: "'Bodoni Moda', serif",
              fontWeight: 300,
              fontSize: "clamp(3rem, 7vw, 7.5rem)",
              lineHeight: 0.95,
              color: "#F7F4EE",
            }}
          />
        </div>
      </div>

      {/* Bio */}
      <div className="max-w-screen-xl mx-auto px-8 md:px-16 py-28 md:py-40">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
          <div className="md:col-span-7">
            <Reveal>
              <EditableText
                as="p"
                collection="siteContent"
                documentId="designer"
                field="bioQuote"
                value={designerData?.bioQuote || "\"I grew up watching my mother sew. Every stitch was a decision. Every seam was an argument she had already won.\""}
                wrapperClassName="relative group block mb-8"
                className="leading-relaxed"
                style={{
                  fontFamily: "'Bodoni Moda', serif",
                  fontStyle: "italic",
                  fontWeight: 300,
                  fontSize: "1.35rem",
                  color: "#0C0B09",
                  lineHeight: 1.7,
                }}
              />
            </Reveal>
            <Reveal delay={80}>
              <EditableText
                as="p"
                collection="siteContent"
                documentId="designer"
                field="bioText1"
                value={designerData?.bioText1 || "Born and raised in Tondo, Manila, Rian Fernandez learned dressmaking from his grandmother before studying at the Parsons School of Design in New York and later at the Institut Français de la Mode in Paris. He returned to the Philippines in 2018 with a singular conviction: that Manila could be a couture capital on its own terms — not as a reflection of the West, but as something entirely, defiantly itself."}
                wrapperClassName="relative group block mb-6"
                className="leading-relaxed"
                style={{
                  fontFamily: "Raleway, sans-serif",
                  fontWeight: 300,
                  fontSize: "0.9rem",
                  color: "#7A7468",
                  lineHeight: 2,
                }}
              />
            </Reveal>
            <Reveal delay={120}>
              <EditableText
                as="p"
                collection="siteContent"
                documentId="designer"
                field="bioText2"
                value={designerData?.bioText2 || "His debut collection, Liwanag, won the ASEAN Fashion Award for Best Emerging Designer in 2019. Since then, his work has been featured in Vogue Philippines, Harper's Bazaar Singapore, and exhibited at the Design Museum in London. He dresses heads of state, celebrated artists, and women who simply refuse to be ordinary."}
                wrapperClassName="relative group block mb-6"
                className="leading-relaxed"
                style={{
                  fontFamily: "Raleway, sans-serif",
                  fontWeight: 300,
                  fontSize: "0.9rem",
                  color: "#7A7468",
                  lineHeight: 2,
                }}
              />
            </Reveal>
            <Reveal delay={160}>
              <EditableText
                as="p"
                collection="siteContent"
                documentId="designer"
                field="bioText3"
                value={designerData?.bioText3 || "Every piece that leaves the atelier is built on the same foundation: exceptional craft, deliberate restraint, and the quiet conviction that true luxury is not about being seen — it is about feeling completely, irreducibly yourself."}
                wrapperClassName="relative group block"
                className="leading-relaxed"
                style={{
                  fontFamily: "Raleway, sans-serif",
                  fontWeight: 300,
                  fontSize: "0.9rem",
                  color: "#7A7468",
                  lineHeight: 2,
                }}
              />
            </Reveal>
          </div>

          <div className="md:col-span-5 flex flex-col gap-10">
            <Reveal>
              <div
                className="overflow-hidden bg-[#E8E4D9]"
                style={{ aspectRatio: "3/4" }}
              >
                <EditableImage
                  src={designerData?.bioImage || "https://images.unsplash.com/photo-1596939097613-733faff08908?w=700&h=950&fit=crop&auto=format&q=80"}
                  alt="Rian Fernandez at work in the atelier"
                  collection="siteContent"
                  documentId="designer"
                  field="bioImage"
                  wrapperClassName="relative group block w-full h-full"
                  className="w-full h-full object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal delay={100}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20">
            {[
              { number: designerData?.stat1Number || "2018", label: designerData?.stat1Label || "Maison Founded", numKey: "stat1Number", labelKey: "stat1Label" },
              { number: designerData?.stat2Number || "42+", label: designerData?.stat2Label || "Awards", numKey: "stat2Number", labelKey: "stat2Label" },
              { number: designerData?.stat3Number || "3", label: designerData?.stat3Label || "Collections/Year", numKey: "stat3Number", labelKey: "stat3Label" },
              { number: designerData?.stat4Number || "100%", label: designerData?.stat4Label || "Made in Manila", numKey: "stat4Number", labelKey: "stat4Label" },
            ].map((stat) => (
              <div
                key={stat.labelKey}
                className="py-10 px-8"
                style={{ backgroundColor: "#E8E4D9" }}
              >
                <EditableText
                  as="p"
                  collection="siteContent"
                  documentId="designer"
                  field={stat.numKey}
                  value={stat.number}
                  wrapperClassName="relative group block"
                  style={{
                    fontFamily: "'Bodoni Moda', serif",
                    fontWeight: 300,
                    fontSize: "clamp(2.5rem, 4vw, 3.5rem)",
                    color: "#0C0B09",
                    lineHeight: 1,
                  }}
                />
                <EditableText
                  as="p"
                  collection="siteContent"
                  documentId="designer"
                  field={stat.labelKey}
                  value={stat.label}
                  wrapperClassName="relative group block mt-6"
                  className="uppercase"
                  style={{
                    fontFamily: "Raleway, sans-serif",
                    fontWeight: 400,
                    fontSize: "0.75rem",
                    letterSpacing: "0.2em",
                    color: "#7A7468",
                  }}
                />
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* CTA */}
      <section
        className="py-32 text-center px-8"
        style={{ backgroundColor: "#E8E4D9" }}
      >
        <Reveal>
          <EditableText
            as="h2"
            collection="siteContent"
            documentId="designer"
            field="ctaTitle"
            value={designerData?.ctaTitle || "Meet Rian in the Atelier"}
            wrapperClassName="relative group block"
            style={{
              fontFamily: "'Bodoni Moda', serif",
              fontWeight: 300,
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              color: "#0C0B09",
              lineHeight: 1.1,
            }}
          />
          <EditableText
            as="p"
            collection="siteContent"
            documentId="designer"
            field="ctaText"
            value={designerData?.ctaText || "Private consultations are available by appointment. Discover the craft, the process, and the extraordinary detail behind each piece."}
            wrapperClassName="relative group block mt-6 mx-auto max-w-sm"
            style={{
              fontFamily: "Raleway, sans-serif",
              fontWeight: 300,
              fontSize: "0.87rem",
              color: "#7A7468",
              lineHeight: 1.95,
            }}
          />
          <div className="mt-10">
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
              <EditableText
                as="span"
                collection="siteContent"
                documentId="designer"
                field="ctaButton"
                value={designerData?.ctaButton || "Book a Consultation"}
                wrapperClassName="relative group inline-block"
              />
            </button>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
