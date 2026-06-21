import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../firebase';
import { Collection, Product, JournalEntry } from '../types';

interface ContentContextType {
  collections: Collection[];
  products: Product[];
  journalEntries: JournalEntry[];
  siteContent: Record<string, any>;
  loading: boolean;
}

const ContentContext = createContext<ContentContextType>({
  collections: [],
  products: [],
  journalEntries: [],
  siteContent: {},
  loading: true,
});

export function ContentProvider({ children }: { children: ReactNode }) {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [siteContent, setSiteContent] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubCollections = onSnapshot(query(collection(db, 'collections')), (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Collection));
      setCollections(data);
    });

    const unsubProducts = onSnapshot(query(collection(db, 'products')), (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
      setProducts(data);
    });

    const unsubJournal = onSnapshot(query(collection(db, 'journal')), (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as JournalEntry));
      setJournalEntries(data);
    });

    const unsubSiteContent = onSnapshot(query(collection(db, 'siteContent')), (snapshot) => {
      const data: Record<string, any> = {};
      snapshot.docs.forEach(doc => {
        data[doc.id] = doc.data();
      });
      setSiteContent(data);
    });

    // Simple heuristic: wait a bit to consider loading complete
    // In a real app, you might wait for all 3 promises to resolve if not using real-time snapshots
    const timer = setTimeout(() => setLoading(false), 800);

    return () => {
      unsubCollections();
      unsubProducts();
      unsubJournal();
      unsubSiteContent();
      clearTimeout(timer);
    };
  }, []);

  return (
    <ContentContext.Provider value={{ collections, products, journalEntries, siteContent, loading }}>
      {children}
    </ContentContext.Provider>
  );
}

export const useContent = (docId?: string) => {
  const context = useContext(ContentContext);
  if (docId) {
    return { ...context, data: context.siteContent[docId] };
  }
  return context;
};
