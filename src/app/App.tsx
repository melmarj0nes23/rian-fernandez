import { useState, useCallback, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router";

import { Navigation } from "../components/layout/Navigation";
import { Footer } from "../components/layout/Footer";
import { Product, CartItem, Page } from "../types";

import { HomePage } from "../pages/Home";
import { CollectionsPage } from "../pages/Collections";
import { CollectionDetailPage } from "../pages/CollectionDetail";
import { BoutiquePage } from "../pages/Boutique";
import { ProductDetailPage } from "../pages/ProductDetail";
import { DesignerPage } from "../pages/Designer";
import { AtelierPage } from "../pages/Atelier";
import { JournalPage } from "../pages/Journal";
import { AppointmentsPage } from "../pages/Appointments";
import { CartPage } from "../pages/Cart";
import { CheckoutPage } from "../pages/Checkout";
import { ConfirmationPage } from "../pages/Confirmation";
import { LoginPage } from "../pages/Login";
import { AdminDashboardPage } from "../pages/AdminDashboard";
import { CustomerDashboardPage } from "../pages/CustomerDashboard";
import { SplashScreen } from "../components/layout/SplashScreen";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('rian_dossier');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('rian_dossier', JSON.stringify(cart));
  }, [cart]);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = useCallback((page: Page | string, extra?: string) => {
    if (extra) {
      navigate(`/${page}/${extra}`);
    } else {
      navigate(page === 'home' ? '/' : `/${page}`);
    }
  }, [navigate]);

  const addToCart = useCallback((product: Product, quantity: number, size: string) => {
    setCart((prev) => {
      const existing = prev.find(
        (item) => item.product.id === product.id && item.size === size
      );
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity, size }];
    });
  }, []);

  const updateQty = useCallback((productId: string, size: string, delta: number) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.product.id === productId && item.size === size) {
          const newQ = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQ };
        }
        return item;
      })
    );
  }, []);

  const removeFromCart = useCallback((productId: string, size: string) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.size === size)
      )
    );
  }, []);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const currentPage = location.pathname === "/" ? "home" : location.pathname.split("/")[1];

  return (
    <div
      className="min-h-screen bg-background text-foreground"
      style={{ fontFamily: "Raleway, sans-serif" }}
    >
      {showSplash && (
        <SplashScreen 
          onComplete={() => {
            setShowSplash(false);
            sessionStorage.setItem('rian_splash_shown', 'true');
          }} 
        />
      )}

      <Navigation
        onNavigate={handleNavigate}
        cartCount={cartCount}
        currentPage={currentPage as Page}
      />

      <main>
        <Routes>
          <Route path="/" element={<HomePage onNavigate={handleNavigate} onAddToCart={addToCart} />} />
          <Route path="/collections" element={<CollectionsPage onNavigate={handleNavigate} />} />
          <Route path="/collections/:id" element={<CollectionDetailPage onNavigate={handleNavigate} />} />
          <Route path="/boutique" element={<BoutiquePage onNavigate={handleNavigate} />} />
          <Route path="/boutique/:id" element={<ProductDetailPage onNavigate={handleNavigate} onAddToCart={addToCart} />} />
          <Route path="/designer" element={<DesignerPage onNavigate={handleNavigate} />} />
          <Route path="/atelier" element={<AtelierPage onNavigate={handleNavigate} />} />
          <Route path="/journal" element={<JournalPage />} />
          <Route path="/appointments" element={<AppointmentsPage />} />
          <Route path="/dossier" element={<CartPage cart={cart} onUpdateQty={updateQty} onRemove={removeFromCart} onNavigate={handleNavigate} />} />
          <Route path="/checkout" element={<CheckoutPage cart={cart} onNavigate={handleNavigate} onOrderComplete={() => setCart([])} />} />
          <Route path="/confirmation" element={<ConfirmationPage onNavigate={handleNavigate} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/dashboard" element={<CustomerDashboardPage />} />
        </Routes>
      </main>

      <Footer onNavigate={handleNavigate} />

      {/* Scrollbar hide */}
      <style>{`
        ::-webkit-scrollbar { width: 0px; }
        * { scrollbar-width: none; }
        html { scroll-behavior: smooth; }
      `}</style>
    </div>
  );
}
