import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAmv_qd7XRaHMU3hiiblsXFqjzKsCAjiKk",
  authDomain: "rian-fernandez.firebaseapp.com",
  projectId: "rian-fernandez",
  storageBucket: "rian-fernandez.firebasestorage.app",
  messagingSenderId: "191655404346",
  appId: "1:191655404346:web:b26d51e9d0fab5829fa603",
  measurementId: "G-EHG2PC8KQD"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const COLLECTIONS = [
  {
    id: "silencio",
    name: "Silénio",
    season: "Spring / Summer",
    year: "2025",
    tagline: "In silence, beauty speaks.",
    description: "Inspired by the meditative stillness of pre-dawn — that quiet hour before the world stirs — Silénio is an ode to whispered luxury. Ivory organza, champagne silk, and hand-sewn pearl embroideries compose a collection that breathes with effortless grace. Each piece is an act of restraint made extraordinary.",
    image: "https://images.unsplash.com/photo-1773574488221-08b2883a1c80?w=900&h=1200&fit=crop&auto=format&q=80",
    coverImage: "https://images.unsplash.com/photo-1773574488220-569921a63d39?w=1920&h=1080&fit=crop&auto=format&q=80",
    heroImage: "https://images.unsplash.com/photo-1773574488221-08b2883a1c80?w=1920&h=2400&fit=crop&auto=format&q=80",
    pieces: 18,
    productIds: ["p1", "p5"],
  },
  {
    id: "dilim",
    name: "Dilim",
    season: "Autumn / Winter",
    year: "2024",
    tagline: "The night wears its finest.",
    description: "Dilim — the Filipino word for darkness — explores the dramatic tension between shadow and light. Black duchess satin, midnight velvet, and charcoal organza are sculpted into architectural silhouettes that command attention without demanding it. Darkness, here, is not absence. It is presence.",
    image: "https://images.unsplash.com/photo-1764998112680-2f617dc9be40?w=900&h=1200&fit=crop&auto=format&q=80",
    coverImage: "https://images.unsplash.com/photo-1779398970596-7414291c24fb?w=1920&h=1080&fit=crop&auto=format&q=80",
    heroImage: "https://images.unsplash.com/photo-1764998112680-2f617dc9be40?w=1920&h=2400&fit=crop&auto=format&q=80",
    pieces: 22,
    productIds: ["p2", "p4"],
  },
  {
    id: "ulan",
    name: "Ulan",
    season: "Resort",
    year: "2025",
    tagline: "As rain falls, petals rise.",
    description: "A celebration of the Philippine monsoon season — its rhythm, its romance, its renewal. Gossamer silks float like rainfall. Intricate piña cloth details honour centuries of indigenous Filipino craft. Ulan is both homecoming and horizon — a collection for the woman who knows where she has been and chooses, freely, where she goes.",
    image: "https://images.unsplash.com/photo-1761932975421-48f2cc7483dd?w=900&h=1200&fit=crop&auto=format&q=80",
    coverImage: "https://images.unsplash.com/photo-1758749646094-606f23edaef6?w=1920&h=1080&fit=crop&auto=format&q=80",
    heroImage: "https://images.unsplash.com/photo-1761932975421-48f2cc7483dd?w=1920&h=2400&fit=crop&auto=format&q=80",
    pieces: 14,
    productIds: ["p3"],
  },
];

const PRODUCTS = [
  {
    id: "p1",
    name: "The Camellias Gown",
    collectionId: "silencio",
    price: 24500,
    category: "Evening Gown",
    description: "A sculptural strapless gown in ivory duchess satin, hand-embroidered with 3,200 individual silk camellia petals. The structured corseted bodice flows into an asymmetric cathedral train. Each petal is individually shaped and secured by Rian's atelier over sixty hours of extraordinary craftsmanship.",
    image: "https://images.unsplash.com/photo-1773574488221-08b2883a1c80?w=800&h=1100&fit=crop&auto=format&q=80",
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
    description: "A floor-length column dress in black duchess satin with an architectural origami-pleated shoulder structure. The severe silhouette is softened by a hand-draped silk chiffon overskirt that cascades from the hip, creating the illusion of movement in stillness.",
    image: "https://images.unsplash.com/photo-1764998112680-2f617dc9be40?w=800&h=1100&fit=crop&auto=format&q=80",
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
    description: "The centerpiece of Ulan — a layered confection in five gradients of grey-green gossamer silk, hand-pleated to evoke the visual rhythm of rainfall. The bodice features hand-woven piña cloth panels, a signature nod to the Philippines' most storied textile tradition.",
    image: "https://images.unsplash.com/photo-1761932975421-48f2cc7483dd?w=800&h=1100&fit=crop&auto=format&q=80",
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
    description: "The Medianoche — midnight — is Rian Fernandez's most ambitious statement piece. A voluminous ballgown in midnight charcoal, the bodice hand-embroidered with over 12,000 jet-black Swarovski crystals arranged in celestial constellations visible only by candlelight.",
    image: "https://images.unsplash.com/photo-1779398970596-7414291c24fb?w=800&h=1100&fit=crop&auto=format&q=80",
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
    description: "A champagne silk shantung gown paired with a floor-sweeping organza cape hand-stitched with 8,000 freshwater seed pearls arranged in a cascading floral motif. The cape transforms the silhouette from intimate to monumental with a single movement.",
    image: "https://images.unsplash.com/photo-1758749646094-606f23edaef6?w=800&h=1100&fit=crop&auto=format&q=80",
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

const JOURNAL_ENTRIES = [
  {
    id: "j1",
    title: "The Art of Piña Weaving: A Living Tradition",
    category: "Craft",
    date: "June 12, 2025",
    excerpt: "Deep in the Aklan province of the Philippines, skilled hands weave extraordinary cloth from pineapple leaf fibres — a centuries-old tradition that Rian Fernandez has made central to modern couture.",
    image: "https://images.unsplash.com/photo-1457972657980-4c9fddebec8d?w=800&h=540&fit=crop&auto=format&q=80",
    readTime: 8,
  },
  {
    id: "j2",
    title: "Behind the Seams: Creating Silénio",
    category: "Atelier",
    date: "March 3, 2025",
    excerpt: "Sixty days, three seamstresses, and one singular vision. We document the making of the collection that changed how the world sees Filipino fashion.",
    image: "https://images.unsplash.com/photo-1626784579980-db39c1a13aa9?w=800&h=540&fit=crop&auto=format&q=80",
    readTime: 12,
  },
  {
    id: "j3",
    title: "On Silence as a Design Language",
    category: "Philosophy",
    date: "January 18, 2025",
    excerpt: "In an industry that demands volume, Rian Fernandez has chosen restraint. A conversation with the designer about what luxury truly means in the 21st century.",
    image: "https://images.unsplash.com/photo-1596939097613-733faff08908?w=800&h=540&fit=crop&auto=format&q=80",
    readTime: 6,
  },
  {
    id: "j4",
    title: "The Women Who Wear Rian Fernandez",
    category: "Portrait",
    date: "November 5, 2024",
    excerpt: "She is the woman who enters a room and changes its atmosphere. The Rian Fernandez client defies definition — and that, perhaps, is exactly the point.",
    image: "https://images.unsplash.com/photo-1773574488220-569921a63d39?w=800&h=540&fit=crop&auto=format&q=80",
    readTime: 10,
  },
];

async function migrate() {
  try {
    for (const coll of COLLECTIONS) {
      await setDoc(doc(db, "collections", coll.id), coll);
      console.log(`Migrated collection: ${coll.id}`);
    }
    
    for (const prod of PRODUCTS) {
      await setDoc(doc(db, "products", prod.id), prod);
      console.log(`Migrated product: ${prod.id}`);
    }

    for (const entry of JOURNAL_ENTRIES) {
      await setDoc(doc(db, "journal", entry.id), entry);
      console.log(`Migrated journal entry: ${entry.id}`);
    }
    
    console.log("Migration complete!");
    process.exit(0);
  } catch (err) {
    console.error("Migration failed:", err);
    process.exit(1);
  }
}

migrate();
