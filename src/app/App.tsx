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

// ─── Types ───────────────────────────────────────────────────────────────────

type Page =
  | "home"
  | "collections"
  | "collection-detail"
  | "boutique"
  | "product-detail"
  | "designer"
  | "atelier"
  | "journal"
  | "appointments"
  | "cart"
  | "checkout"
  | "confirmation";

interface Collection {
  id: string;
  name: string;
  season: string;
  year: string;
  tagline: string;
  description: string;
  image: string;
  coverImage: string;
  heroImage: string;
  pieces: number;
  productIds: string[];
}

interface Product {
  id: string;
  name: string;
  collectionId: string;
  price: number;
  description: string;
  image: string;
  images: string[];
  details: string[];
  category: string;
}

interface CartItem {
  product: Product;
  quantity: number;
  size: string;
}

interface JournalEntry {
  id: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  image: string;
  readTime: number;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const COLLECTIONS: Collection[] = [
  {
    id: "silencio",
    name: "Silénio",
    season: "Spring / Summer",
    year: "2025",
    tagline: "In silence, beauty speaks.",
    description:
      "Inspired by the meditative stillness of pre-dawn — that quiet hour before the world stirs — Silénio is an ode to whispered luxury. Ivory organza, champagne silk, and hand-sewn pearl embroideries compose a collection that breathes with effortless grace. Each piece is an act of restraint made extraordinary.",
    image:
      "https://images.unsplash.com/photo-1773574488221-08b2883a1c80?w=900&h=1200&fit=crop&auto=format&q=80",
    coverImage:
      "https://images.unsplash.com/photo-1773574488220-569921a63d39?w=1920&h=1080&fit=crop&auto=format&q=80",
    heroImage:
      "https://images.unsplash.com/photo-1773574488221-08b2883a1c80?w=1920&h=2400&fit=crop&auto=format&q=80",
    pieces: 18,
    productIds: ["p1", "p5"],
  },
  {
    id: "dilim",
    name: "Dilim",
    season: "Autumn / Winter",
    year: "2024",
    tagline: "The night wears its finest.",
    description:
      "Dilim — the Filipino word for darkness — explores the dramatic tension between shadow and light. Black duchess satin, midnight velvet, and charcoal organza are sculpted into architectural silhouettes that command attention without demanding it. Darkness, here, is not absence. It is presence.",
    image:
      "https://images.unsplash.com/photo-1764998112680-2f617dc9be40?w=900&h=1200&fit=crop&auto=format&q=80",
    coverImage:
      "https://images.unsplash.com/photo-1779398970596-7414291c24fb?w=1920&h=1080&fit=crop&auto=format&q=80",
    heroImage:
      "https://images.unsplash.com/photo-1764998112680-2f617dc9be40?w=1920&h=2400&fit=crop&auto=format&q=80",
    pieces: 22,
    productIds: ["p2", "p4"],
  },
  {
    id: "ulan",
    name: "Ulan",
    season: "Resort",
    year: "2025",
    tagline: "As rain falls, petals rise.",
    description:
      "A celebration of the Philippine monsoon season — its rhythm, its romance, its renewal. Gossamer silks float like rainfall. Intricate piña cloth details honour centuries of indigenous Filipino craft. Ulan is both homecoming and horizon — a collection for the woman who knows where she has been and chooses, freely, where she goes.",
    image:
      "https://images.unsplash.com/photo-1761932975421-48f2cc7483dd?w=900&h=1200&fit=crop&auto=format&q=80",
    coverImage:
      "https://images.unsplash.com/photo-1758749646094-606f23edaef6?w=1920&h=1080&fit=crop&auto=format&q=80",
    heroImage:
      "https://images.unsplash.com/photo-1761932975421-48f2cc7483dd?w=1920&h=2400&fit=crop&auto=format&q=80",
    pieces: 14,
    productIds: ["p3"],
  },
];

const PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "The Camellias Gown",
    collectionId: "silencio",
    price: 24500,
    category: "Evening Gown",
    description:
      "A sculptural strapless gown in ivory duchess satin, hand-embroidered with 3,200 individual silk camellia petals. The structured corseted bodice flows into an asymmetric cathedral train. Each petal is individually shaped and secured by Rian's atelier over sixty hours of extraordinary craftsmanship.",
    image:
      "https://images.unsplash.com/photo-1773574488221-08b2883a1c80?w=800&h=1100&fit=crop&auto=format&q=80",
    images: [
      "https://images.unsplash.com/photo-1773574488221-08b2883a1c80?w=800&h=1100&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1773574488220-569921a63d39?w=800&h=1100&fit=crop&auto=format&q=80",
    ],
    details: [
      "Fabric: Italian duchess satin, silk organza",
      "Embellishment: 3,200 hand-shaped silk camellia petals",
      "Closure: Concealed busk corset with hand-stitched modesty panel",
      "Train: 220cm cathedral train",
      "Artisan hours: 60+",
      "Made-to-measure in Manila, Philippines",
    ],
  },
  {
    id: "p2",
    name: "The Nocturne Dress",
    collectionId: "dilim",
    price: 18900,
    category: "Evening Dress",
    description:
      "A floor-length column dress in black duchess satin with an architectural origami-pleated shoulder structure. The severe silhouette is softened by a hand-draped silk chiffon overskirt that cascades from the hip, creating the illusion of movement in stillness.",
    image:
      "https://images.unsplash.com/photo-1764998112680-2f617dc9be40?w=800&h=1100&fit=crop&auto=format&q=80",
    images: [
      "https://images.unsplash.com/photo-1764998112680-2f617dc9be40?w=800&h=1100&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1779398970596-7414291c24fb?w=800&h=1100&fit=crop&auto=format&q=80",
    ],
    details: [
      "Fabric: French duchess satin, silk chiffon",
      "Silhouette: Column with origami shoulder structure",
      "Overskirt: Hand-draped silk chiffon",
      "Closure: Concealed zip with silk hook and eye",
      "Artisan hours: 45+",
      "Made-to-measure in Manila, Philippines",
    ],
  },
  {
    id: "p3",
    name: "The Monsoon Gown",
    collectionId: "ulan",
    price: 31000,
    category: "Haute Couture",
    description:
      "The centerpiece of Ulan — a layered confection in five gradients of grey-green gossamer silk, hand-pleated to evoke the visual rhythm of rainfall. The bodice features hand-woven piña cloth panels, a signature nod to the Philippines' most storied textile tradition.",
    image:
      "https://images.unsplash.com/photo-1761932975421-48f2cc7483dd?w=800&h=1100&fit=crop&auto=format&q=80",
    images: [
      "https://images.unsplash.com/photo-1761932975421-48f2cc7483dd?w=800&h=1100&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1758749646094-606f23edaef6?w=800&h=1100&fit=crop&auto=format&q=80",
    ],
    details: [
      "Fabric: Five-layer gossamer silk, hand-woven piña cloth",
      "Detail: Hand-pleated silk in 5 graduating tones",
      "Bodice: Structured piña with boning",
      "Length: Floor-length with extended train",
      "Artisan hours: 80+",
      "Made-to-measure in Manila, Philippines",
    ],
  },
  {
    id: "p4",
    name: "The Medianoche Gown",
    collectionId: "dilim",
    price: 38000,
    category: "Haute Couture",
    description:
      "The Medianoche — midnight — is Rian Fernandez's most ambitious statement piece. A voluminous ballgown in midnight charcoal, the bodice hand-embroidered with over 12,000 jet-black Swarovski crystals arranged in celestial constellations visible only by candlelight.",
    image:
      "https://images.unsplash.com/photo-1779398970596-7414291c24fb?w=800&h=1100&fit=crop&auto=format&q=80",
    images: [
      "https://images.unsplash.com/photo-1779398970596-7414291c24fb?w=800&h=1100&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1764998112680-2f617dc9be40?w=800&h=1100&fit=crop&auto=format&q=80",
    ],
    details: [
      "Fabric: Charcoal duchess satin, Italian tulle",
      "Embellishment: 12,000+ Swarovski jet crystals",
      "Underskirt: Eight-layer tulle with petticoat",
      "Bodice: Structured with boning and busk closure",
      "Artisan hours: 120+",
      "Made-to-measure in Manila, Philippines",
    ],
  },
  {
    id: "p5",
    name: "The Lumière Cape Gown",
    collectionId: "silencio",
    price: 29000,
    category: "Couture Gown",
    description:
      "A champagne silk shantung gown paired with a floor-sweeping organza cape hand-stitched with 8,000 freshwater seed pearls arranged in a cascading floral motif. The cape transforms the silhouette from intimate to monumental with a single movement.",
    image:
      "https://images.unsplash.com/photo-1758749646094-606f23edaef6?w=800&h=1100&fit=crop&auto=format&q=80",
    images: [
      "https://images.unsplash.com/photo-1758749646094-606f23edaef6?w=800&h=1100&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1773574488221-08b2883a1c80?w=800&h=1100&fit=crop&auto=format&q=80",
    ],
    details: [
      "Fabric: Silk shantung, hand-dyed silk organza",
      "Embellishment: 8,000 freshwater seed pearls",
      "Cape: Floor-sweeping with structured shoulders",
      "Closure: Concealed hook and eye with pearl-tipped buttons",
      "Artisan hours: 70+",
      "Made-to-measure in Manila, Philippines",
    ],
  },
];

const JOURNAL_ENTRIES: JournalEntry[] = [
  {
    id: "j1",
    title: "The Art of Piña Weaving: A Living Tradition",
    category: "Craft",
    date: "June 12, 2025",
    excerpt:
      "Deep in the Aklan province of the Philippines, skilled hands weave extraordinary cloth from pineapple leaf fibres — a centuries-old tradition that Rian Fernandez has made central to modern couture.",
    image:
      "https://images.unsplash.com/photo-1457972657980-4c9fddebec8d?w=800&h=540&fit=crop&auto=format&q=80",
    readTime: 8,
  },
  {
    id: "j2",
    title: "Behind the Seams: Creating Silénio",
    category: "Atelier",
    date: "March 3, 2025",
    excerpt:
      "Sixty days, three seamstresses, and one singular vision. We document the making of the collection that changed how the world sees Filipino fashion.",
    image:
      "https://images.unsplash.com/photo-1626784579980-db39c1a13aa9?w=800&h=540&fit=crop&auto=format&q=80",
    readTime: 12,
  },
  {
    id: "j3",
    title: "On Silence as a Design Language",
    category: "Philosophy",
    date: "January 18, 2025",
    excerpt:
      "In an industry that demands volume, Rian Fernandez has chosen restraint. A conversation with the designer about what luxury truly means in the 21st century.",
    image:
      "https://images.unsplash.com/photo-1596939097613-733faff08908?w=800&h=540&fit=crop&auto=format&q=80",
    readTime: 6,
  },
  {
    id: "j4",
    title: "The Women Who Wear Rian Fernandez",
    category: "Portrait",
    date: "November 5, 2024",
    excerpt:
      "She is the woman who enters a room and changes its atmosphere. The Rian Fernandez client defies definition — and that, perhaps, is exactly the point.",
    image:
      "https://images.unsplash.com/photo-1773574488220-569921a63d39?w=800&h=540&fit=crop&auto=format&q=80",
    readTime: 10,
  },
];

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(price);
}

// ─── Scroll Reveal Hook ────────────────────────────────────────────────────

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return { ref, visible };
}

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Navigation ───────────────────────────────────────────────────────────────

function Navigation({
  onNavigate,
  cartCount,
  currentPage,
}: {
  onNavigate: (page: Page, extra?: string) => void;
  cartCount: number;
  currentPage: Page;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isHome = currentPage === "home";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const navItems: { label: string; page: Page }[] = [
    { label: "Collections", page: "collections" },
    { label: "The Atelier", page: "atelier" },
    { label: "The Boutique", page: "boutique" },
    { label: "Journal", page: "journal" },
    { label: "The Designer", page: "designer" },
    { label: "Appointments", page: "appointments" },
  ];

  const isLight = isHome && !scrolled;

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          backdropFilter: scrolled ? "blur(12px)" : "none",
          backgroundColor: scrolled
            ? "rgba(247,244,238,0.88)"
            : isHome
            ? "transparent"
            : "rgba(247,244,238,0.95)",
          borderBottom: scrolled
            ? "1px solid rgba(12,11,9,0.08)"
            : "1px solid transparent",
        }}
      >
        <div className="max-w-screen-xl mx-auto px-8 md:px-12 flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={() => onNavigate("home")}
            className="flex flex-col items-start leading-none group"
          >
            <span
              className="text-xs tracking-[0.3em] uppercase transition-colors duration-300"
              style={{
                fontFamily: "Raleway, sans-serif",
                fontWeight: 300,
                color: isLight ? "rgba(247,244,238,0.7)" : "#7A7468",
                letterSpacing: "0.3em",
              }}
            >
              Maison
            </span>
            <span
              style={{
                fontFamily: "'Bodoni Moda', serif",
                fontWeight: 400,
                fontSize: "1.35rem",
                letterSpacing: "0.08em",
                color: isLight ? "#F7F4EE" : "#0C0B09",
                transition: "color 0.3s",
              }}
            >
              Rian Fernandez
            </span>
          </button>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-10">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => onNavigate(item.page)}
                className="relative group"
                style={{
                  fontFamily: "Raleway, sans-serif",
                  fontWeight: 300,
                  fontSize: "0.78rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: isLight
                    ? "rgba(247,244,238,0.85)"
                    : currentPage === item.page
                    ? "#0C0B09"
                    : "#7A7468",
                  transition: "color 0.25s",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {item.label}
                <span
                  className="absolute -bottom-1 left-0 h-px transition-all duration-300"
                  style={{
                    backgroundColor: isLight ? "#F7F4EE" : "#B8955A",
                    width: currentPage === item.page ? "100%" : "0%",
                  }}
                />
              </button>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => onNavigate("appointments")}
              className="hidden lg:block text-xs tracking-[0.22em] uppercase px-6 py-2.5 transition-all duration-300"
              style={{
                fontFamily: "Raleway, sans-serif",
                fontWeight: 400,
                border: `1px solid ${isLight ? "rgba(247,244,238,0.6)" : "#0C0B09"}`,
                color: isLight ? "#F7F4EE" : "#0C0B09",
                letterSpacing: "0.22em",
                background: "transparent",
                cursor: "pointer",
              }}
            >
              Book Consultation
            </button>

            <button
              onClick={() => onNavigate("cart")}
              className="relative"
              style={{ color: isLight ? "#F7F4EE" : "#0C0B09" }}
            >
              <ShoppingBag size={20} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span
                  className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full flex items-center justify-center text-white"
                  style={{
                    fontSize: "0.6rem",
                    backgroundColor: "#B8955A",
                    fontFamily: "Raleway, sans-serif",
                  }}
                >
                  {cartCount}
                </span>
              )}
            </button>

            <button
              className="lg:hidden"
              style={{ color: isLight ? "#F7F4EE" : "#0C0B09" }}
              onClick={() => setMenuOpen(true)}
            >
              <Menu size={22} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className="fixed inset-0 z-[100] flex flex-col transition-all duration-500"
        style={{
          backgroundColor: "#0C0B09",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "all" : "none",
        }}
      >
        <div className="flex items-center justify-between px-8 h-20">
          <span
            style={{
              fontFamily: "'Bodoni Moda', serif",
              fontWeight: 400,
              fontSize: "1.2rem",
              color: "#F7F4EE",
              letterSpacing: "0.08em",
            }}
          >
            Rian Fernandez
          </span>
          <button onClick={() => setMenuOpen(false)} style={{ color: "#F7F4EE" }}>
            <X size={22} strokeWidth={1.5} />
          </button>
        </div>

        <div className="flex flex-col justify-center flex-1 px-8 gap-8">
          {navItems.map((item, i) => (
            <button
              key={item.page}
              onClick={() => {
                setMenuOpen(false);
                onNavigate(item.page);
              }}
              className="text-left transition-opacity duration-300"
              style={{
                fontFamily: "'Bodoni Moda', serif",
                fontWeight: 300,
                fontSize: "2.2rem",
                color: "#F7F4EE",
                letterSpacing: "0.04em",
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "translateX(0)" : "translateX(-20px)",
                transition: `opacity 0.5s ease ${i * 60 + 200}ms, transform 0.5s ease ${i * 60 + 200}ms`,
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              {item.label}
            </button>
          ))}

          <button
            onClick={() => {
              setMenuOpen(false);
              onNavigate("appointments");
            }}
            className="mt-8 text-xs tracking-[0.22em] uppercase px-8 py-4 border text-left self-start"
            style={{
              fontFamily: "Raleway, sans-serif",
              fontWeight: 400,
              borderColor: "rgba(247,244,238,0.3)",
              color: "#F7F4EE",
              background: "none",
              cursor: "pointer",
            }}
          >
            Book Consultation
          </button>
        </div>
      </div>
    </>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer({ onNavigate }: { onNavigate: (page: Page) => void }) {
  return (
    <footer
      className="bg-[#0C0B09] text-[#F7F4EE] pt-24 pb-12 px-8 md:px-16"
    >
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 pb-20 border-b border-white/10">
          {/* Brand */}
          <div className="md:col-span-2">
            <p
              className="text-xs tracking-[0.3em] uppercase mb-3"
              style={{
                fontFamily: "Raleway, sans-serif",
                fontWeight: 300,
                color: "rgba(247,244,238,0.4)",
              }}
            >
              Maison
            </p>
            <h3
              style={{
                fontFamily: "'Bodoni Moda', serif",
                fontWeight: 400,
                fontSize: "2rem",
                letterSpacing: "0.06em",
                color: "#F7F4EE",
              }}
            >
              Rian Fernandez
            </h3>
            <p
              className="mt-6 leading-relaxed max-w-xs"
              style={{
                fontFamily: "Raleway, sans-serif",
                fontWeight: 300,
                fontSize: "0.85rem",
                color: "rgba(247,244,238,0.5)",
                lineHeight: 1.9,
              }}
            >
              A Filipino couture house born from the belief that fashion is the
              most intimate form of architecture — the structure we choose to
              inhabit every day.
            </p>
          </div>

          {/* Nav links */}
          <div>
            <p
              className="text-xs tracking-[0.25em] uppercase mb-6"
              style={{
                fontFamily: "Raleway, sans-serif",
                fontWeight: 400,
                color: "rgba(247,244,238,0.35)",
              }}
            >
              Explore
            </p>
            {[
              { label: "Collections", page: "collections" as Page },
              { label: "The Boutique", page: "boutique" as Page },
              { label: "The Designer", page: "designer" as Page },
              { label: "The Atelier", page: "atelier" as Page },
              { label: "Journal", page: "journal" as Page },
            ].map((item) => (
              <button
                key={item.page}
                onClick={() => onNavigate(item.page)}
                className="block mb-3 text-left transition-colors duration-200"
                style={{
                  fontFamily: "Raleway, sans-serif",
                  fontWeight: 300,
                  fontSize: "0.85rem",
                  color: "rgba(247,244,238,0.55)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  letterSpacing: "0.04em",
                }}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Contact */}
          <div>
            <p
              className="text-xs tracking-[0.25em] uppercase mb-6"
              style={{
                fontFamily: "Raleway, sans-serif",
                fontWeight: 400,
                color: "rgba(247,244,238,0.35)",
              }}
            >
              Connect
            </p>
            <p
              className="mb-2"
              style={{
                fontFamily: "Raleway, sans-serif",
                fontWeight: 300,
                fontSize: "0.85rem",
                color: "rgba(247,244,238,0.55)",
              }}
            >
              atelier@rianfernandez.com
            </p>
            <p
              className="mb-8"
              style={{
                fontFamily: "Raleway, sans-serif",
                fontWeight: 300,
                fontSize: "0.85rem",
                color: "rgba(247,244,238,0.55)",
              }}
            >
              Makati City, Metro Manila
            </p>
            <button
              onClick={() => onNavigate("appointments")}
              className="text-xs tracking-[0.22em] uppercase px-6 py-3 transition-all duration-300 hover:bg-[#F7F4EE] hover:text-[#0C0B09]"
              style={{
                fontFamily: "Raleway, sans-serif",
                fontWeight: 400,
                border: "1px solid rgba(247,244,238,0.3)",
                color: "#F7F4EE",
                background: "transparent",
                cursor: "pointer",
              }}
            >
              Book Consultation
            </button>
          </div>
        </div>

        <div className="pt-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p
            style={{
              fontFamily: "Raleway, sans-serif",
              fontWeight: 300,
              fontSize: "0.75rem",
              color: "rgba(247,244,238,0.28)",
              letterSpacing: "0.06em",
            }}
          >
            © 2025 Maison Rian Fernandez. All rights reserved.
          </p>
          <div className="flex gap-8">
            {["Privacy Policy", "Terms of Service", "Shipping & Returns"].map(
              (t) => (
                <button
                  key={t}
                  style={{
                    fontFamily: "Raleway, sans-serif",
                    fontWeight: 300,
                    fontSize: "0.72rem",
                    color: "rgba(247,244,238,0.28)",
                    letterSpacing: "0.06em",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  {t}
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Home Page ────────────────────────────────────────────────────────────────

function HomePage({
  onNavigate,
  onAddToCart,
}: {
  onNavigate: (page: Page, extra?: string) => void;
  onAddToCart: (product: Product, size: string) => void;
}) {
  const featuredCollection = COLLECTIONS[0];
  const featuredProduct = PRODUCTS[3]; // Medianoche

  return (
    <div>
      {/* Hero */}
      <section className="relative h-screen flex items-end overflow-hidden bg-[#1a1612]">
        <img
          src="https://images.unsplash.com/photo-1773574488220-569921a63d39?w=1920&h=1080&fit=crop&auto=format&q=90"
          alt="Rian Fernandez couture — woman in sculptural gown with candelabras"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ transform: "scale(1.04)", transition: "transform 8s ease" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(12,11,9,0.75) 0%, rgba(12,11,9,0.15) 55%, transparent 100%)",
          }}
        />
        <div className="relative z-10 px-8 md:px-16 pb-20 md:pb-28 max-w-screen-xl mx-auto w-full">
          <p
            className="text-xs tracking-[0.35em] uppercase mb-5"
            style={{
              fontFamily: "Raleway, sans-serif",
              fontWeight: 300,
              color: "rgba(247,244,238,0.55)",
            }}
          >
            Spring / Summer 2025 Couture
          </p>
          <h1
            style={{
              fontFamily: "'Bodoni Moda', serif",
              fontWeight: 300,
              fontSize: "clamp(3.5rem, 8vw, 7.5rem)",
              lineHeight: 0.95,
              color: "#F7F4EE",
              letterSpacing: "-0.01em",
            }}
          >
            Silénio
          </h1>
          <p
            className="mt-6 max-w-sm"
            style={{
              fontFamily: "'Bodoni Moda', serif",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "1.1rem",
              color: "rgba(247,244,238,0.7)",
              letterSpacing: "0.02em",
            }}
          >
            In silence, beauty speaks.
          </p>
          <div className="mt-10 flex items-center gap-10">
            <button
              onClick={() =>
                onNavigate("collection-detail", "silencio")
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
              <img
                src={featuredCollection.image}
                alt={`${featuredCollection.name} collection`}
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
                {featuredCollection.season} {featuredCollection.year}
              </p>
              <h2
                style={{
                  fontFamily: "'Bodoni Moda', serif",
                  fontWeight: 300,
                  fontSize: "clamp(3rem, 5vw, 5rem)",
                  lineHeight: 1,
                  letterSpacing: "-0.01em",
                  color: "#0C0B09",
                }}
              >
                {featuredCollection.name}
              </h2>
              <p
                className="mt-8 leading-relaxed"
                style={{
                  fontFamily: "'Bodoni Moda', serif",
                  fontStyle: "italic",
                  fontWeight: 300,
                  fontSize: "1.05rem",
                  color: "#7A7468",
                  lineHeight: 1.9,
                }}
              >
                {featuredCollection.tagline}
              </p>
              <p
                className="mt-5 leading-relaxed max-w-md"
                style={{
                  fontFamily: "Raleway, sans-serif",
                  fontWeight: 300,
                  fontSize: "0.88rem",
                  color: "#7A7468",
                  lineHeight: 1.95,
                }}
              >
                {featuredCollection.description}
              </p>
              <button
                onClick={() =>
                  onNavigate("collection-detail", featuredCollection.id)
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
                <p
                  className="text-xs tracking-[0.3em] uppercase mb-8"
                  style={{
                    fontFamily: "Raleway, sans-serif",
                    fontWeight: 300,
                    color: "#B8955A",
                  }}
                >
                  The Designer
                </p>
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
                  Craft Inherited.
                  <br />
                  <em style={{ fontStyle: "italic" }}>Vision Singular.</em>
                </h2>
                <p
                  className="mt-8 leading-relaxed max-w-md"
                  style={{
                    fontFamily: "Raleway, sans-serif",
                    fontWeight: 300,
                    fontSize: "0.88rem",
                    color: "rgba(247,244,238,0.55)",
                    lineHeight: 1.95,
                  }}
                >
                  Rian Fernandez grew up watching his mother sew. Today, his
                  designs are worn at state dinners, film premieres, and quiet
                  moments that no camera ever captures. He believes that the most
                  beautiful garment is the one you wear when no one is watching.
                </p>
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
              <div
                className="order-1 md:order-2 overflow-hidden bg-[#1a1612]"
                style={{ aspectRatio: "3/4" }}
              >
                <img
                  src="https://images.unsplash.com/photo-1758749646094-606f23edaef6?w=800&h=1100&fit=crop&auto=format&q=80"
                  alt="Rian Fernandez, Filipino couture designer"
                  className="w-full h-full object-cover opacity-90 transition-transform duration-[1200ms] hover:scale-105"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Featured Masterpiece */}
      <section className="relative overflow-hidden bg-[#1a1612]" style={{ minHeight: "85vh" }}>
        <img
          src={featuredProduct.image}
          alt={featuredProduct.name}
          className="absolute inset-0 w-full h-full object-cover opacity-60"
          style={{ objectPosition: "center 20%" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, rgba(12,11,9,0.85) 0%, rgba(12,11,9,0.3) 60%, transparent 100%)",
          }}
        />

        <div className="relative z-10 flex items-center h-full min-h-[85vh] px-8 md:px-20 py-32">
          <div className="max-w-lg">
            <Reveal>
              <p
                className="text-xs tracking-[0.3em] uppercase mb-6"
                style={{
                  fontFamily: "Raleway, sans-serif",
                  fontWeight: 300,
                  color: "#B8955A",
                }}
              >
                Featured Masterpiece — {featuredProduct.category}
              </p>
              <h2
                style={{
                  fontFamily: "'Bodoni Moda', serif",
                  fontWeight: 300,
                  fontSize: "clamp(2.8rem, 5vw, 4.5rem)",
                  lineHeight: 1.05,
                  color: "#F7F4EE",
                }}
              >
                {featuredProduct.name}
              </h2>
              <p
                className="mt-7 leading-relaxed"
                style={{
                  fontFamily: "Raleway, sans-serif",
                  fontWeight: 300,
                  fontSize: "0.87rem",
                  color: "rgba(247,244,238,0.65)",
                  lineHeight: 1.95,
                }}
              >
                {featuredProduct.description}
              </p>
              <div className="mt-10 flex items-center gap-6">
                <button
                  onClick={() => onNavigate("product-detail", featuredProduct.id)}
                  className="group text-xs tracking-[0.25em] uppercase px-8 py-4 transition-all duration-300"
                  style={{
                    fontFamily: "Raleway, sans-serif",
                    fontWeight: 400,
                    backgroundColor: "#F7F4EE",
                    color: "#0C0B09",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Discover the Craft
                </button>
              </div>
            </Reveal>
          </div>
        </div>
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
            Begin Your Couture Journey
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
            Every Gown Begins
            <br />
            <em style={{ fontStyle: "italic" }}>With a Conversation.</em>
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
            Schedule a private appointment at the Makati atelier. Rian and his
            team will guide you through fabrics, silhouettes, and the
            extraordinary process of commissioning a piece made only for you.
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

// ─── Collections Page ─────────────────────────────────────────────────────────

function CollectionsPage({
  onNavigate,
}: {
  onNavigate: (page: Page, extra?: string) => void;
}) {
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

        <div className="space-y-40">
          {COLLECTIONS.map((col, i) => (
            <Reveal key={col.id} delay={i * 80}>
              <div
                className={`grid grid-cols-1 md:grid-cols-2 gap-16 items-center ${
                  i % 2 === 1 ? "md:[direction:rtl]" : ""
                }`}
              >
                <div
                  className="overflow-hidden bg-[#E8E4D9] cursor-pointer group"
                  style={{ aspectRatio: "3/4", direction: "ltr" }}
                  onClick={() => onNavigate("collection-detail", col.id)}
                >
                  <img
                    src={col.image}
                    alt={`${col.name} collection`}
                    className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                  />
                </div>

                <div style={{ direction: "ltr" }} className="py-8">
                  <p
                    className="text-xs tracking-[0.3em] uppercase mb-5"
                    style={{
                      fontFamily: "Raleway, sans-serif",
                      fontWeight: 300,
                      color: "#B8955A",
                    }}
                  >
                    {col.season} {col.year} · {col.pieces} Pieces
                  </p>
                  <h2
                    style={{
                      fontFamily: "'Bodoni Moda', serif",
                      fontWeight: 300,
                      fontSize: "clamp(3rem, 4.5vw, 4.5rem)",
                      lineHeight: 1,
                      color: "#0C0B09",
                    }}
                  >
                    {col.name}
                  </h2>
                  <p
                    className="mt-6"
                    style={{
                      fontFamily: "'Bodoni Moda', serif",
                      fontStyle: "italic",
                      fontWeight: 300,
                      fontSize: "1rem",
                      color: "#7A7468",
                    }}
                  >
                    {col.tagline}
                  </p>
                  <p
                    className="mt-5 leading-relaxed max-w-md"
                    style={{
                      fontFamily: "Raleway, sans-serif",
                      fontWeight: 300,
                      fontSize: "0.87rem",
                      color: "#7A7468",
                      lineHeight: 1.95,
                    }}
                  >
                    {col.description}
                  </p>
                  <button
                    onClick={() => onNavigate("collection-detail", col.id)}
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

// ─── Collection Detail Page ───────────────────────────────────────────────────

function CollectionDetailPage({
  collectionId,
  onNavigate,
}: {
  collectionId: string;
  onNavigate: (page: Page, extra?: string) => void;
}) {
  const collection = COLLECTIONS.find((c) => c.id === collectionId) || COLLECTIONS[0];
  const products = PRODUCTS.filter((p) =>
    collection.productIds.includes(p.id)
  );

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
              fontSize: "clamp(4rem, 9vw, 9rem)",
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
          <Reveal>
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
          </Reveal>
          <Reveal delay={100}>
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
          </Reveal>
        </div>

        {/* Pieces */}
        {products.length > 0 && (
          <div className="mt-32">
            <Reveal>
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
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {products.map((p, i) => (
                <Reveal key={p.id} delay={i * 100}>
                  <div
                    className="group cursor-pointer"
                    onClick={() => onNavigate("product-detail", p.id)}
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
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Boutique Page ────────────────────────────────────────────────────────────

function BoutiquePage({
  onNavigate,
}: {
  onNavigate: (page: Page, extra?: string) => void;
}) {
  const [activeFilter, setActiveFilter] = useState("All");
  const filters = ["All", "Evening Gown", "Evening Dress", "Haute Couture", "Couture Gown"];
  const filtered =
    activeFilter === "All"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeFilter);

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
                onClick={() => onNavigate("product-detail", p.id)}
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
                    {p.description.slice(0, 100)}…
                  </p>
                  <button
                    className="mt-5 group/btn flex items-center gap-2"
                    style={{
                      fontFamily: "Raleway, sans-serif",
                      fontWeight: 400,
                      fontSize: "0.68rem",
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: "#0C0B09",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                    }}
                  >
                    View Piece
                    <ArrowRight
                      size={11}
                      className="transition-transform duration-300 group-hover/btn:translate-x-1"
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

// ─── Product Detail Page ──────────────────────────────────────────────────────

function ProductDetailPage({
  productId,
  onNavigate,
  onAddToCart,
}: {
  productId: string;
  onNavigate: (page: Page, extra?: string) => void;
  onAddToCart: (product: Product, size: string) => void;
}) {
  const product = PRODUCTS.find((p) => p.id === productId) || PRODUCTS[0];
  const collection = COLLECTIONS.find((c) => c.id === product.collectionId);
  const [selectedSize, setSelectedSize] = useState("34");
  const [activeImage, setActiveImage] = useState(0);
  const [openDetails, setOpenDetails] = useState(false);
  const [added, setAdded] = useState(false);
  const sizes = ["32", "34", "36", "38", "40", "42"];

  const handleAdd = () => {
    onAddToCart(product, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  return (
    <div className="pt-24 md:pt-28 pb-32">
      <div className="max-w-screen-xl mx-auto px-8 md:px-16">
        {/* Breadcrumb */}
        <div className="flex items-center gap-3 mb-14">
          {[
            { label: "The Boutique", page: "boutique" as Page },
            { label: collection?.name || "", page: "collection-detail" as Page, extra: collection?.id },
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
              {added ? "Added to Bag" : "Add to Bag"}
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

// ─── Designer Page ────────────────────────────────────────────────────────────

function DesignerPage({ onNavigate }: { onNavigate: (page: Page) => void }) {
  return (
    <div>
      {/* Hero */}
      <div
        className="relative flex items-end overflow-hidden bg-[#1a1612]"
        style={{ height: "90vh" }}
      >
        <img
          src="https://images.unsplash.com/photo-1773574488217-eb936b733cae?w=1920&h=1080&fit=crop&auto=format&q=85"
          alt="Rian Fernandez"
          className="absolute inset-0 w-full h-full object-cover opacity-65"
          style={{ objectPosition: "center 30%" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(12,11,9,0.85) 0%, rgba(12,11,9,0.1) 55%, transparent 100%)",
          }}
        />
        <div className="relative z-10 px-8 md:px-16 pb-24 max-w-screen-xl mx-auto w-full">
          <p
            className="text-xs tracking-[0.35em] uppercase mb-5"
            style={{
              fontFamily: "Raleway, sans-serif",
              fontWeight: 300,
              color: "#B8955A",
            }}
          >
            The Designer
          </p>
          <h1
            style={{
              fontFamily: "'Bodoni Moda', serif",
              fontWeight: 300,
              fontSize: "clamp(3rem, 7vw, 7.5rem)",
              lineHeight: 0.95,
              color: "#F7F4EE",
            }}
          >
            Rian
            <br />
            Fernandez
          </h1>
        </div>
      </div>

      {/* Bio */}
      <div className="max-w-screen-xl mx-auto px-8 md:px-16 py-28 md:py-40">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
          <div className="md:col-span-7">
            <Reveal>
              <p
                className="mb-8 leading-relaxed"
                style={{
                  fontFamily: "'Bodoni Moda', serif",
                  fontStyle: "italic",
                  fontWeight: 300,
                  fontSize: "1.35rem",
                  color: "#0C0B09",
                  lineHeight: 1.7,
                }}
              >
                "I grew up watching my mother sew. Every stitch was a decision.
                Every seam was an argument she had already won."
              </p>
            </Reveal>
            <Reveal delay={80}>
              <p
                className="leading-relaxed mb-6"
                style={{
                  fontFamily: "Raleway, sans-serif",
                  fontWeight: 300,
                  fontSize: "0.9rem",
                  color: "#7A7468",
                  lineHeight: 2,
                }}
              >
                Born and raised in Tondo, Manila, Rian Fernandez learned
                dressmaking from his grandmother before studying at the Parsons
                School of Design in New York and later at the Institut Français
                de la Mode in Paris. He returned to the Philippines in 2018
                with a singular conviction: that Manila could be a couture
                capital on its own terms — not as a reflection of the West, but
                as something entirely, defiantly itself.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <p
                className="leading-relaxed mb-6"
                style={{
                  fontFamily: "Raleway, sans-serif",
                  fontWeight: 300,
                  fontSize: "0.9rem",
                  color: "#7A7468",
                  lineHeight: 2,
                }}
              >
                His debut collection, Liwanag, won the ASEAN Fashion Award for
                Best Emerging Designer in 2019. Since then, his work has been
                featured in Vogue Philippines, Harper's Bazaar Singapore, and
                exhibited at the Design Museum in London. He dresses heads of
                state, celebrated artists, and women who simply refuse to be
                ordinary.
              </p>
            </Reveal>
            <Reveal delay={160}>
              <p
                className="leading-relaxed"
                style={{
                  fontFamily: "Raleway, sans-serif",
                  fontWeight: 300,
                  fontSize: "0.9rem",
                  color: "#7A7468",
                  lineHeight: 2,
                }}
              >
                Every piece that leaves the atelier is built on the same
                foundation: exceptional craft, deliberate restraint, and the
                quiet conviction that true luxury is not about being seen —
                it is about feeling completely, irreducibly yourself.
              </p>
            </Reveal>
          </div>

          <div className="md:col-span-5 flex flex-col gap-10">
            <Reveal>
              <div
                className="overflow-hidden bg-[#E8E4D9]"
                style={{ aspectRatio: "3/4" }}
              >
                <img
                  src="https://images.unsplash.com/photo-1596939097613-733faff08908?w=700&h=950&fit=crop&auto=format&q=80"
                  alt="Rian Fernandez at work in the atelier"
                  className="w-full h-full object-cover"
                />
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { number: "2018", label: "Maison Founded" },
                  { number: "42+", label: "Awards" },
                  { number: "3", label: "Collections/Year" },
                  { number: "100%", label: "Made in Manila" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="py-6 px-5"
                    style={{ backgroundColor: "#E8E4D9" }}
                  >
                    <p
                      style={{
                        fontFamily: "'Bodoni Moda', serif",
                        fontWeight: 300,
                        fontSize: "2rem",
                        color: "#0C0B09",
                        lineHeight: 1,
                      }}
                    >
                      {stat.number}
                    </p>
                    <p
                      className="mt-2 text-xs tracking-[0.15em] uppercase"
                      style={{
                        fontFamily: "Raleway, sans-serif",
                        fontWeight: 300,
                        color: "#7A7468",
                      }}
                    >
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* CTA */}
      <section
        className="py-32 text-center px-8"
        style={{ backgroundColor: "#E8E4D9" }}
      >
        <Reveal>
          <h2
            style={{
              fontFamily: "'Bodoni Moda', serif",
              fontWeight: 300,
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              color: "#0C0B09",
              lineHeight: 1.1,
            }}
          >
            Meet Rian in the Atelier
          </h2>
          <p
            className="mt-6 mx-auto max-w-sm"
            style={{
              fontFamily: "Raleway, sans-serif",
              fontWeight: 300,
              fontSize: "0.87rem",
              color: "#7A7468",
              lineHeight: 1.95,
            }}
          >
            Private consultations are available by appointment. Discover the
            craft, the process, and the extraordinary detail behind each piece.
          </p>
          <button
            onClick={() => onNavigate("appointments")}
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
            Book a Consultation
          </button>
        </Reveal>
      </section>
    </div>
  );
}

// ─── Atelier Page ─────────────────────────────────────────────────────────────

function AtelierPage({ onNavigate }: { onNavigate: (page: Page) => void }) {
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
        <img
          src="https://images.unsplash.com/photo-1457972657980-4c9fddebec8d?w=1920&h=1080&fit=crop&auto=format&q=85"
          alt="Couture atelier — pinning fabric"
          className="absolute inset-0 w-full h-full object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-[#0C0B09]/40" />
        <div className="relative z-10 text-center px-8">
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
          <h1
            style={{
              fontFamily: "'Bodoni Moda', serif",
              fontWeight: 300,
              fontSize: "clamp(3.5rem, 8vw, 8rem)",
              lineHeight: 0.92,
              color: "#F7F4EE",
            }}
          >
            The Atelier
          </h1>
        </div>
      </div>

      {/* Intro */}
      <div className="max-w-screen-xl mx-auto px-8 md:px-16 py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
          <Reveal>
            <h2
              style={{
                fontFamily: "'Bodoni Moda', serif",
                fontWeight: 300,
                fontSize: "clamp(2.2rem, 4vw, 3.8rem)",
                lineHeight: 1.08,
                color: "#0C0B09",
              }}
            >
              Craft is not
              <br />
              <em style={{ fontStyle: "italic" }}>a detail.</em>
              <br />
              It is the entire point.
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p
              style={{
                fontFamily: "Raleway, sans-serif",
                fontWeight: 300,
                fontSize: "0.9rem",
                color: "#7A7468",
                lineHeight: 2,
              }}
            >
              The Rian Fernandez atelier in Makati City is a sanctuary of
              deliberate work. Eighteen artisans — among the most skilled
              dressmakers in the Philippines — collaborate on each commission.
              Some have been with the maison since the first collection. Every
              one of them is irreplaceable.
              <br />
              <br />
              We do not produce. We create. The distinction is everything.
            </p>
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
              <img
                src="https://images.unsplash.com/photo-1626784579980-db39c1a13aa9?w=800&h=600&fit=crop&auto=format&q=80"
                alt="Seamstress at work in the atelier"
                className="w-full h-full object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="bg-[#E8E4D9] overflow-hidden" style={{ aspectRatio: "4/3" }}>
              <img
                src="https://images.unsplash.com/photo-1596939097613-733faff08908?w=800&h=600&fit=crop&auto=format&q=80"
                alt="Detail of couture fabric work"
                className="w-full h-full object-cover"
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

// ─── Journal Page ─────────────────────────────────────────────────────────────

function JournalPage() {
  const featured = JOURNAL_ENTRIES[0];
  const rest = JOURNAL_ENTRIES.slice(1);

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

// ─── Appointments Page ────────────────────────────────────────────────────────

function AppointmentsPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    type: "Private Consultation",
    message: "",
    preferredDate: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const types = [
    "Private Consultation",
    "Couture Commission",
    "Bridal Fitting",
    "Atelier Tour",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-8 text-center">
        <div>
          <p
            className="text-xs tracking-[0.35em] uppercase mb-6"
            style={{ fontFamily: "Raleway, sans-serif", fontWeight: 300, color: "#B8955A" }}
          >
            Confirmation
          </p>
          <h1
            style={{
              fontFamily: "'Bodoni Moda', serif",
              fontWeight: 300,
              fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
              color: "#0C0B09",
              lineHeight: 1.1,
            }}
          >
            Your request
            <br />
            <em style={{ fontStyle: "italic" }}>has been received.</em>
          </h1>
          <p
            className="mt-8 mx-auto max-w-sm"
            style={{
              fontFamily: "Raleway, sans-serif",
              fontWeight: 300,
              fontSize: "0.87rem",
              color: "#7A7468",
              lineHeight: 1.95,
            }}
          >
            A member of the atelier team will contact you within 24 hours to
            confirm your appointment details. We look forward to welcoming you.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 md:pt-40 pb-32">
      <div className="max-w-screen-xl mx-auto px-8 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
          {/* Info */}
          <div>
            <Reveal>
              <p
                className="text-xs tracking-[0.35em] uppercase mb-6"
                style={{ fontFamily: "Raleway, sans-serif", fontWeight: 300, color: "#B8955A" }}
              >
                Private Appointment
              </p>
              <h1
                style={{
                  fontFamily: "'Bodoni Moda', serif",
                  fontWeight: 300,
                  fontSize: "clamp(3rem, 5vw, 5rem)",
                  lineHeight: 1,
                  color: "#0C0B09",
                }}
              >
                Book a
                <br />
                Consultation
              </h1>
              <p
                className="mt-8 max-w-sm leading-relaxed"
                style={{
                  fontFamily: "Raleway, sans-serif",
                  fontWeight: 300,
                  fontSize: "0.87rem",
                  color: "#7A7468",
                  lineHeight: 1.95,
                }}
              >
                Every couture journey begins with a conversation. Reserve your
                private appointment at the Makati atelier and allow Rian to
                understand the garment you have always imagined.
              </p>
            </Reveal>

            <Reveal delay={100}>
              <div className="mt-16 space-y-6">
                {[
                  { label: "Location", value: "Legazpi Village, Makati City, Metro Manila" },
                  { label: "Hours", value: "Monday–Saturday, 10am–6pm" },
                  { label: "Duration", value: "60–90 minutes per consultation" },
                  { label: "Contact", value: "atelier@rianfernandez.com" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="py-5"
                    style={{ borderBottom: "1px solid rgba(12,11,9,0.1)" }}
                  >
                    <p
                      className="text-xs tracking-[0.2em] uppercase mb-1"
                      style={{ fontFamily: "Raleway, sans-serif", fontWeight: 400, color: "#7A7468" }}
                    >
                      {item.label}
                    </p>
                    <p
                      style={{
                        fontFamily: "Raleway, sans-serif",
                        fontWeight: 300,
                        fontSize: "0.87rem",
                        color: "#0C0B09",
                      }}
                    >
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Form */}
          <Reveal delay={80}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-5">
                {[
                  { key: "firstName", label: "First Name", type: "text" },
                  { key: "lastName", label: "Last Name", type: "text" },
                ].map(({ key, label, type }) => (
                  <div key={key}>
                    <label
                      className="block text-xs tracking-[0.18em] uppercase mb-2"
                      style={{ fontFamily: "Raleway, sans-serif", fontWeight: 400, color: "#7A7468" }}
                    >
                      {label}
                    </label>
                    <input
                      type={type}
                      required
                      value={form[key as keyof typeof form]}
                      onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                      className="w-full px-0 py-3 bg-transparent outline-none border-0 border-b"
                      style={{
                        fontFamily: "Raleway, sans-serif",
                        fontWeight: 300,
                        fontSize: "0.87rem",
                        color: "#0C0B09",
                        borderBottomColor: "rgba(12,11,9,0.2)",
                        borderBottomWidth: "1px",
                        borderBottomStyle: "solid",
                      }}
                    />
                  </div>
                ))}
              </div>

              {[
                { key: "email", label: "Email Address", type: "email" },
                { key: "phone", label: "Phone Number", type: "tel" },
                { key: "preferredDate", label: "Preferred Date", type: "date" },
              ].map(({ key, label, type }) => (
                <div key={key}>
                  <label
                    className="block text-xs tracking-[0.18em] uppercase mb-2"
                    style={{ fontFamily: "Raleway, sans-serif", fontWeight: 400, color: "#7A7468" }}
                  >
                    {label}
                  </label>
                  <input
                    type={type}
                    required={key !== "preferredDate"}
                    value={form[key as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    className="w-full px-0 py-3 bg-transparent outline-none border-0 border-b"
                    style={{
                      fontFamily: "Raleway, sans-serif",
                      fontWeight: 300,
                      fontSize: "0.87rem",
                      color: "#0C0B09",
                      borderBottomColor: "rgba(12,11,9,0.2)",
                      borderBottomWidth: "1px",
                      borderBottomStyle: "solid",
                    }}
                  />
                </div>
              ))}

              <div>
                <label
                  className="block text-xs tracking-[0.18em] uppercase mb-3"
                  style={{ fontFamily: "Raleway, sans-serif", fontWeight: 400, color: "#7A7468" }}
                >
                  Appointment Type
                </label>
                <div className="flex gap-2 flex-wrap">
                  {types.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setForm({ ...form, type: t })}
                      className="px-4 py-2 text-xs tracking-[0.12em] uppercase transition-all duration-200"
                      style={{
                        fontFamily: "Raleway, sans-serif",
                        fontWeight: 300,
                        border: form.type === t ? "1px solid #0C0B09" : "1px solid rgba(12,11,9,0.2)",
                        color: form.type === t ? "#0C0B09" : "#7A7468",
                        backgroundColor: form.type === t ? "rgba(12,11,9,0.05)" : "transparent",
                        cursor: "pointer",
                      }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label
                  className="block text-xs tracking-[0.18em] uppercase mb-2"
                  style={{ fontFamily: "Raleway, sans-serif", fontWeight: 400, color: "#7A7468" }}
                >
                  Tell Us About the Occasion
                </label>
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-0 py-3 bg-transparent outline-none resize-none border-0 border-b"
                  style={{
                    fontFamily: "Raleway, sans-serif",
                    fontWeight: 300,
                    fontSize: "0.87rem",
                    color: "#0C0B09",
                    borderBottomColor: "rgba(12,11,9,0.2)",
                    borderBottomWidth: "1px",
                    borderBottomStyle: "solid",
                  }}
                />
              </div>

              <button
                type="submit"
                className="w-full py-5 text-xs tracking-[0.28em] uppercase transition-all duration-300 hover:bg-[#B8955A]"
                style={{
                  fontFamily: "Raleway, sans-serif",
                  fontWeight: 400,
                  backgroundColor: "#0C0B09",
                  color: "#F7F4EE",
                  border: "none",
                  cursor: "pointer",
                  marginTop: "2.5rem",
                }}
              >
                Request Appointment
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </div>
  );
}

// ─── Cart Page ────────────────────────────────────────────────────────────────

function CartPage({
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
            Your bag is empty.
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
            Your Bag
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
                onClick={() => onNavigate("checkout")}
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
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Checkout Page ────────────────────────────────────────────────────────────

function CheckoutPage({
  cart,
  onNavigate,
  onOrderComplete,
}: {
  cart: CartItem[];
  onNavigate: (page: Page) => void;
  onOrderComplete: () => void;
}) {
  const [step, setStep] = useState(1);
  const [shipping, setShipping] = useState({
    firstName: "", lastName: "", address: "", city: "", country: "Philippines", postal: "",
  });
  const [payment, setPayment] = useState({
    cardName: "", cardNumber: "", expiry: "", cvv: "",
  });

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      onOrderComplete();
      onNavigate("confirmation");
    }
  };

  const inputStyle = {
    fontFamily: "Raleway, sans-serif",
    fontWeight: 300,
    fontSize: "0.87rem",
    color: "#0C0B09",
    borderBottomColor: "rgba(12,11,9,0.2)",
    borderBottomWidth: "1px" as const,
    borderBottomStyle: "solid" as const,
  };

  const labelStyle = {
    fontFamily: "Raleway, sans-serif" as const,
    fontWeight: 400 as const,
    fontSize: "0.7rem" as const,
    letterSpacing: "0.18em" as const,
    textTransform: "uppercase" as const,
    color: "#7A7468",
  };

  return (
    <div className="pt-36 pb-32">
      <div className="max-w-screen-xl mx-auto px-8 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          {/* Form */}
          <div>
            {/* Steps */}
            <div className="flex items-center gap-6 mb-16">
              {["Shipping", "Payment"].map((s, i) => (
                <button
                  key={s}
                  onClick={() => i < step - 1 && setStep(i + 1)}
                  className="flex items-center gap-3"
                  style={{ background: "none", border: "none", cursor: i < step - 1 ? "pointer" : "default" }}
                >
                  <span
                    className="w-7 h-7 flex items-center justify-center text-xs"
                    style={{
                      fontFamily: "Raleway, sans-serif",
                      fontWeight: 400,
                      backgroundColor: step >= i + 1 ? "#0C0B09" : "transparent",
                      color: step >= i + 1 ? "#F7F4EE" : "#7A7468",
                      border: step >= i + 1 ? "none" : "1px solid rgba(12,11,9,0.2)",
                    }}
                  >
                    {i + 1}
                  </span>
                  <span
                    style={{
                      fontFamily: "Raleway, sans-serif",
                      fontWeight: step === i + 1 ? 400 : 300,
                      fontSize: "0.75rem",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: step >= i + 1 ? "#0C0B09" : "#7A7468",
                    }}
                  >
                    {s}
                  </span>
                  {i === 0 && (
                    <span style={{ color: "rgba(12,11,9,0.2)", margin: "0 4px" }}>—</span>
                  )}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit}>
              {step === 1 ? (
                <div className="space-y-8">
                  <h2
                    style={{ fontFamily: "'Bodoni Moda', serif", fontWeight: 300, fontSize: "2rem", color: "#0C0B09" }}
                  >
                    Shipping Details
                  </h2>
                  <div className="grid grid-cols-2 gap-6">
                    {[
                      { key: "firstName", label: "First Name" },
                      { key: "lastName", label: "Last Name" },
                    ].map(({ key, label }) => (
                      <div key={key}>
                        <label className="block mb-2" style={labelStyle}>{label}</label>
                        <input
                          required type="text"
                          value={shipping[key as keyof typeof shipping]}
                          onChange={(e) => setShipping({ ...shipping, [key]: e.target.value })}
                          className="w-full px-0 py-3 bg-transparent outline-none border-0 border-b"
                          style={inputStyle}
                        />
                      </div>
                    ))}
                  </div>
                  {[
                    { key: "address", label: "Address" },
                    { key: "city", label: "City" },
                    { key: "postal", label: "Postal Code" },
                  ].map(({ key, label }) => (
                    <div key={key}>
                      <label className="block mb-2" style={labelStyle}>{label}</label>
                      <input
                        required type="text"
                        value={shipping[key as keyof typeof shipping]}
                        onChange={(e) => setShipping({ ...shipping, [key]: e.target.value })}
                        className="w-full px-0 py-3 bg-transparent outline-none border-0 border-b"
                        style={inputStyle}
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block mb-2" style={labelStyle}>Country</label>
                    <select
                      value={shipping.country}
                      onChange={(e) => setShipping({ ...shipping, country: e.target.value })}
                      className="w-full px-0 py-3 bg-transparent outline-none border-0 border-b appearance-none"
                      style={inputStyle}
                    >
                      {["Philippines", "Singapore", "United States", "United Kingdom", "France", "Japan", "Australia"].map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-5 text-xs tracking-[0.28em] uppercase mt-6"
                    style={{
                      fontFamily: "Raleway, sans-serif",
                      fontWeight: 400,
                      backgroundColor: "#0C0B09",
                      color: "#F7F4EE",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Continue to Payment
                  </button>
                </div>
              ) : (
                <div className="space-y-8">
                  <h2
                    style={{ fontFamily: "'Bodoni Moda', serif", fontWeight: 300, fontSize: "2rem", color: "#0C0B09" }}
                  >
                    Payment
                  </h2>
                  {[
                    { key: "cardName", label: "Cardholder Name" },
                    { key: "cardNumber", label: "Card Number", placeholder: "•••• •••• •••• ••••" },
                  ].map(({ key, label, placeholder }) => (
                    <div key={key}>
                      <label className="block mb-2" style={labelStyle}>{label}</label>
                      <input
                        required type="text"
                        placeholder={placeholder}
                        value={payment[key as keyof typeof payment]}
                        onChange={(e) => setPayment({ ...payment, [key]: e.target.value })}
                        className="w-full px-0 py-3 bg-transparent outline-none border-0 border-b"
                        style={inputStyle}
                      />
                    </div>
                  ))}
                  <div className="grid grid-cols-2 gap-6">
                    {[
                      { key: "expiry", label: "Expiry", placeholder: "MM / YY" },
                      { key: "cvv", label: "Security Code", placeholder: "•••" },
                    ].map(({ key, label, placeholder }) => (
                      <div key={key}>
                        <label className="block mb-2" style={labelStyle}>{label}</label>
                        <input
                          required type="text"
                          placeholder={placeholder}
                          value={payment[key as keyof typeof payment]}
                          onChange={(e) => setPayment({ ...payment, [key]: e.target.value })}
                          className="w-full px-0 py-3 bg-transparent outline-none border-0 border-b"
                          style={inputStyle}
                        />
                      </div>
                    ))}
                  </div>
                  <button
                    type="submit"
                    className="w-full py-5 text-xs tracking-[0.28em] uppercase mt-6"
                    style={{
                      fontFamily: "Raleway, sans-serif",
                      fontWeight: 400,
                      backgroundColor: "#0C0B09",
                      color: "#F7F4EE",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Place Order — {formatPrice(subtotal)}
                  </button>
                </div>
              )}
            </form>
          </div>

          {/* Order summary */}
          <div>
            <div className="sticky top-28">
              <h3
                className="mb-8"
                style={{ fontFamily: "'Bodoni Moda', serif", fontWeight: 300, fontSize: "1.5rem", color: "#0C0B09" }}
              >
                Your Order
              </h3>
              <div className="space-y-6">
                {cart.map((item) => (
                  <div key={`${item.product.id}-${item.size}`} className="flex gap-5">
                    <div className="w-20 overflow-hidden bg-[#E8E4D9] flex-shrink-0" style={{ aspectRatio: "3/4" }}>
                      <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <p style={{ fontFamily: "'Bodoni Moda', serif", fontWeight: 300, fontSize: "1rem", color: "#0C0B09" }}>
                          {item.product.name}
                        </p>
                        <p style={{ fontFamily: "Raleway, sans-serif", fontWeight: 300, fontSize: "0.78rem", color: "#7A7468" }}>
                          Size FR {item.size} · Qty {item.quantity}
                        </p>
                      </div>
                      <p style={{ fontFamily: "Raleway, sans-serif", fontWeight: 300, fontSize: "0.85rem", color: "#0C0B09" }}>
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div
                className="mt-8 pt-8 flex justify-between"
                style={{ borderTop: "1px solid rgba(12,11,9,0.12)" }}
              >
                <span style={{ fontFamily: "Raleway, sans-serif", fontWeight: 400, fontSize: "0.78rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#0C0B09" }}>
                  Total
                </span>
                <span style={{ fontFamily: "'Bodoni Moda', serif", fontWeight: 400, fontSize: "1.25rem", color: "#0C0B09" }}>
                  {formatPrice(subtotal)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Confirmation Page ────────────────────────────────────────────────────────

function ConfirmationPage({ onNavigate }: { onNavigate: (page: Page) => void }) {
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

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [currentExtra, setCurrentExtra] = useState<string>("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const navigate = useCallback((page: Page, extra?: string) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage(page);
      setCurrentExtra(extra || "");
      setIsTransitioning(false);
    }, 280);
  }, []);

  const addToCart = useCallback((product: Product, size: string) => {
    setCart((prev) => {
      const existing = prev.find(
        (item) => item.product.id === product.id && item.size === size
      );
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1, size }];
    });
  }, []);

  const updateQty = useCallback(
    (productId: string, size: string, qty: number) => {
      if (qty <= 0) {
        setCart((prev) =>
          prev.filter(
            (item) => !(item.product.id === productId && item.size === size)
          )
        );
      } else {
        setCart((prev) =>
          prev.map((item) =>
            item.product.id === productId && item.size === size
              ? { ...item, quantity: qty }
              : item
          )
        );
      }
    },
    []
  );

  const removeFromCart = useCallback((productId: string, size: string) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.size === size)
      )
    );
  }, []);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage onNavigate={navigate} onAddToCart={addToCart} />;
      case "collections":
        return <CollectionsPage onNavigate={navigate} />;
      case "collection-detail":
        return (
          <CollectionDetailPage collectionId={currentExtra} onNavigate={navigate} />
        );
      case "boutique":
        return <BoutiquePage onNavigate={navigate} />;
      case "product-detail":
        return (
          <ProductDetailPage
            productId={currentExtra}
            onNavigate={navigate}
            onAddToCart={addToCart}
          />
        );
      case "designer":
        return <DesignerPage onNavigate={navigate} />;
      case "atelier":
        return <AtelierPage onNavigate={navigate} />;
      case "journal":
        return <JournalPage />;
      case "appointments":
        return <AppointmentsPage />;
      case "cart":
        return (
          <CartPage
            cart={cart}
            onUpdateQty={updateQty}
            onRemove={removeFromCart}
            onNavigate={navigate}
          />
        );
      case "checkout":
        return (
          <CheckoutPage
            cart={cart}
            onNavigate={navigate}
            onOrderComplete={() => setCart([])}
          />
        );
      case "confirmation":
        return <ConfirmationPage onNavigate={navigate} />;
      default:
        return <HomePage onNavigate={navigate} onAddToCart={addToCart} />;
    }
  };

  return (
    <div
      className="min-h-screen bg-background text-foreground"
      style={{ fontFamily: "Raleway, sans-serif" }}
    >
      <Navigation
        onNavigate={navigate}
        cartCount={cartCount}
        currentPage={currentPage}
      />

      <main
        style={{
          opacity: isTransitioning ? 0 : 1,
          transition: "opacity 0.28s ease",
        }}
      >
        {renderPage()}
      </main>

      <Footer onNavigate={navigate} />

      {/* Scrollbar hide */}
      <style>{`
        ::-webkit-scrollbar { width: 0px; }
        * { scrollbar-width: none; }
        html { scroll-behavior: smooth; }
      `}</style>
    </div>
  );
}
