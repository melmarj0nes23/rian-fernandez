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
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
export function CheckoutPage({
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
  const [addresses, setAddresses] = useState<any[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const unsub = onSnapshot(doc(db, 'users', user.uid), (docSnap) => {
        if (docSnap.exists() && docSnap.data().addresses) {
          setAddresses(docSnap.data().addresses);
        }
      });
      return () => unsub();
    }
  }, [user]);

  const handleSelectAddress = (addr: any) => {
    const parts = addr.name.split(' ');
    setShipping({
      firstName: parts[0] || '',
      lastName: parts.slice(1).join(' ') || '',
      address: addr.street || '',
      city: addr.city || '',
      country: addr.country || 'Philippines',
      postal: addr.zip || '',
    });
  };

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

        <h2
          className="mb-8"
          style={{ fontFamily: "'Bodoni Moda', serif", fontWeight: 300, fontSize: "2rem", color: "#0C0B09" }}
        >
          {step === 1 ? "Shipping Details" : "Payment"}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          {/* Form */}
          <div>
            <form onSubmit={handleSubmit}>
              {step === 1 ? (
                <div className="space-y-8">
                  
                  {addresses.length > 0 && (
                    <div className="mb-8 p-6 border" style={{ borderColor: "rgba(12,11,9,0.1)", backgroundColor: "rgba(247, 244, 238, 0.5)" }}>
                      <p className="text-xs uppercase tracking-[0.18em] mb-4 text-[#7A7468]" style={{ fontFamily: "Raleway, sans-serif" }}>Select from Address Book</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {addresses.map((addr) => (
                          <button
                            type="button"
                            key={addr.id}
                            onClick={() => handleSelectAddress(addr)}
                            className="text-left p-4 border transition-colors hover:border-[#0C0B09]"
                            style={{ borderColor: "rgba(12,11,9,0.2)" }}
                          >
                            <p className="font-bold mb-1" style={{ fontFamily: "Raleway, sans-serif", fontSize: "0.8rem", color: "#0C0B09" }}>{addr.name}</p>
                            <p className="text-[#7A7468]" style={{ fontFamily: "Raleway, sans-serif", fontSize: "0.8rem" }}>{addr.street}, {addr.city}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

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
            <div className="sticky top-28 bg-[#F7F4EE] p-8 border" style={{ borderColor: "rgba(12,11,9,0.1)" }}>
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
              
              <div className="mt-10 pt-8 space-y-4" style={{ borderTop: "1px solid rgba(12,11,9,0.12)" }}>
                <div className="flex justify-between text-[#7A7468]" style={{ fontFamily: "Raleway, sans-serif", fontSize: "0.85rem" }}>
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-[#7A7468]" style={{ fontFamily: "Raleway, sans-serif", fontSize: "0.85rem" }}>
                  <span>Shipping</span>
                  <span>Complimentary</span>
                </div>
                <div className="flex justify-between text-[#7A7468]" style={{ fontFamily: "Raleway, sans-serif", fontSize: "0.85rem" }}>
                  <span>Duties & Taxes</span>
                  <span>Included</span>
                </div>
              </div>

              <div
                className="mt-6 pt-6 flex justify-between items-center"
                style={{ borderTop: "1px solid rgba(12,11,9,0.12)" }}
              >
                <span style={{ fontFamily: "Raleway, sans-serif", fontWeight: 400, fontSize: "0.78rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#0C0B09" }}>
                  Total
                </span>
                <span style={{ fontFamily: "'Bodoni Moda', serif", fontWeight: 400, fontSize: "1.25rem", color: "#0C0B09" }}>
                  {formatPrice(subtotal)}
                </span>
              </div>

              <div className="mt-12 pt-8" style={{ borderTop: "1px solid rgba(12,11,9,0.12)" }}>
                <p style={{ fontFamily: "Raleway, sans-serif", fontWeight: 400, fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#0C0B09" }} className="mb-3">
                  Atelier Concierge
                </p>
                <p style={{ fontFamily: "Raleway, sans-serif", fontWeight: 300, fontSize: "0.8rem", color: "#7A7468", lineHeight: 1.6 }}>
                  Every piece is meticulously wrapped in our signature bespoke packaging. If you require assistance with your order or sizing, our concierge is available at <a href="mailto:rianfernandez888@gmail.com" className="underline" style={{ textUnderlineOffset: "4px" }}>rianfernandez888@gmail.com</a> or via WhatsApp at <a href="https://wa.me/639275642888" className="underline" style={{ textUnderlineOffset: "4px" }}>+63 927 564 2888</a>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
