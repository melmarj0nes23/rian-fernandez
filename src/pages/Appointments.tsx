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


export function AppointmentsPage() {
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
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-24 gap-y-16 md:gap-y-8">
          {/* Header */}
          <div className="order-1 md:col-start-1">
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
          </div>

          {/* Info */}
          <div className="order-3 md:col-start-1">
            <Reveal delay={100}>
              <div className="mt-8 md:mt-16 space-y-6">
                {[
                  { label: "Location", value: "20 Namtan Bldg., National Road, Alcala, 2425 Pangasinan, Philippines" },
                  { label: "Hours", value: "Monday–Saturday, 10am–6pm" },
                  { label: "Duration", value: "60–90 minutes per consultation" },
                  { label: "Contact", value: "rianfernandez888@gmail.com | +63 927 564 2888" },
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
          <Reveal delay={80} className="order-2 md:col-start-2 md:row-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-5">
                {[
                  { key: "firstName", label: "First Name", type: "text", pattern: "[A-Za-z\\s'-]+", maxLength: 50, title: "Only letters, spaces, hyphens, and apostrophes are allowed" },
                  { key: "lastName", label: "Last Name", type: "text", pattern: "[A-Za-z\\s'-]+", maxLength: 50, title: "Only letters, spaces, hyphens, and apostrophes are allowed" },
                ].map(({ key, label, type, pattern, maxLength, title }) => (
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
                      pattern={pattern}
                      maxLength={maxLength}
                      title={title}
                      value={form[key as keyof typeof form]}
                      onChange={(e) => {
                        let val = e.target.value;
                        if (key === 'firstName' || key === 'lastName') {
                          val = val.replace(/[^A-Za-z\s'-]/g, '');
                        }
                        e.target.value = val;
                        setForm({ ...form, [key]: val });
                      }}
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
                { key: "email", label: "Email Address", type: "email", maxLength: 254 },
                { key: "phone", label: "Phone Number", type: "tel", pattern: "[0-9+\\s\\-()]+", maxLength: 20, title: "Only numbers and standard phone formatting characters are allowed" },
                { key: "preferredDate", label: "Preferred Date", type: "date" },
              ].map(({ key, label, type, pattern, maxLength, title }) => (
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
                    pattern={pattern}
                    maxLength={maxLength}
                    title={title}
                    value={form[key as keyof typeof form]}
                    onChange={(e) => {
                      let val = e.target.value;
                      if (key === 'phone') {
                        val = val.replace(/[^0-9+\s-()]/g, '');
                      }
                      e.target.value = val;
                      setForm({ ...form, [key]: val });
                    }}
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
