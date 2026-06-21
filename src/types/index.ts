
export type Page =
  | "home"
  | "collections"
  | "boutique"
  | "product-detail"
  | "designer"
  | "atelier"
  | "journal"
  | "appointments"
  | "dossier"
  | "checkout"
  | "confirmation";

export interface Collection {
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

export interface Product {
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

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
}

export interface JournalEntry {
  id: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  image: string;
  readTime: number;
}
