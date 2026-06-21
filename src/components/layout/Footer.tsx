import { useState } from "react";
import { Mail, Phone, MapPin, Facebook, Instagram, MessageCircle, ArrowRight, Check } from 'lucide-react';
import { Page } from '../../types';

export function Footer({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const [newsEmail, setNewsEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsEmail) {
      setSubscribed(true);
      setNewsEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const footerLinks: { label: string; page: Page }[] = [
    { label: 'The Atelier', page: 'atelier' },
    { label: 'The Designer', page: 'designer' },
    { label: 'Collections', page: 'collections' },
    { label: 'The Boutique', page: 'boutique' },
    { label: 'Journal', page: 'journal' },
    { label: 'Appointments', page: 'appointments' }
  ];

  return (
    <footer className="bg-[#0C0B09] text-[#F7F4EE] pt-20 pb-12 px-6 md:px-12 border-t border-[#292622]">
      <div className="max-w-screen-xl mx-auto space-y-16">
        
        {/* Top Split Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-start">
          
          {/* Column 1: Core Atelier Branding */}
          <div className="md:col-span-4 space-y-6">
            <div className="space-y-1.5">
              <span className="text-xl sm:text-2xl tracking-[0.25em] block uppercase font-light text-[#E8E4D9]" style={{ fontFamily: "'Bodoni Moda', serif" }}>
                RIAN FERNANDEZ
              </span>
              <span className="text-[11px] tracking-[0.5em] block text-[#bbb1a2] uppercase font-light" style={{ fontFamily: "Raleway, sans-serif" }}>
                A T E L I E R
              </span>
            </div>
            
            <p className="text-xs text-[#bbb1a2]/70 leading-relaxed font-light max-w-sm" style={{ fontFamily: "Raleway, sans-serif" }}>
              Sovereign international couture brand specializing in bespoke bridal gown construction, international beauty pageant masterpieces, and artisanal heritage embroidery.
            </p>

            {/* Official Coordinates Row */}
            <div className="space-y-3.5 pt-2 select-text">
              <div className="flex items-center gap-3 text-[#bbb1a2]">
                <MapPin size={14} className="text-[#B8955A] shrink-0" />
                <span className="text-xs font-light" style={{ fontFamily: "Raleway, sans-serif" }}>20 Namtan Bldg., National Road, Alcala, 2425 Pangasinan, Philippines</span>
              </div>
              <div className="flex items-center gap-3 text-[#bbb1a2]">
                <Mail size={14} className="text-[#B8955A] shrink-0" />
                <a href="mailto:rianfernandez888@gmail.com" className="text-xs font-light hover:text-[#D4AF37] transition-colors" style={{ fontFamily: "Raleway, sans-serif" }}>
                  rianfernandez888@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3 text-[#bbb1a2]">
                <Phone size={14} className="text-[#B8955A] shrink-0" />
                <a href="https://wa.me/639275642888" target="_blank" rel="noopener noreferrer" className="text-xs font-light hover:text-[#D4AF37] transition-colors" style={{ fontFamily: "Raleway, sans-serif" }}>
                  +63 927 564 2888
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Index Links */}
          <div className="md:col-span-3 space-y-6">
            <span className="text-sm tracking-widest block uppercase text-[#B8955A] font-medium" style={{ fontFamily: "'Bodoni Moda', serif" }}>
              Navigation Index
            </span>
            <ul className="grid grid-cols-1 gap-2.5">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <button
                    id={`footer-tab-link-${link.label.replace(/\s+/g, '-').toLowerCase()}`}
                    onClick={() => onNavigate(link.page)}
                    className="text-xs text-[#bbb1a2]/60 hover:text-[#B8955A] transition-colors duration-300 py-0.5 text-left uppercase tracking-wider font-light cursor-pointer"
                    style={{ fontFamily: "Raleway, sans-serif" }}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Gazette signup (Magazine newsletter) */}
          <div className="md:col-span-5 space-y-6">
            <span className="text-sm tracking-widest block uppercase text-[#B8955A] font-medium" style={{ fontFamily: "'Bodoni Moda', serif" }}>
              The Atelier Gazette
            </span>
            <p className="text-xs text-[#bbb1a2]/70 leading-relaxed font-light" style={{ fontFamily: "Raleway, sans-serif" }}>
              Receive private invitations to seasonal haute couture showrooms, runway collections previews, and premium fabric arrivals.
            </p>

            <form onSubmit={handleNewsSubmit} className="relative max-w-sm">
              <input
                id="footer-news-email"
                type="email"
                required
                placeholder="Enter your email address"
                value={newsEmail}
                onChange={(e) => setNewsEmail(e.target.value)}
                className="w-full bg-[#1e1c1a]/85 border border-[#3e3935] text-white placeholder-[#8e8574] text-base md:text-xs p-3.5 pr-12 focus:border-[#B8955A] focus:outline-none transition-colors duration-300 font-light"
                style={{ fontFamily: "Raleway, sans-serif" }}
              />
              <button
                id="footer-news-submit"
                type="submit"
                className="absolute right-1 top-1 bottom-1 bg-[#2e2b27] hover:bg-[#B8955A] text-[#F7F4EE] hover:text-[#0C0B09] px-3.5 transition-colors duration-300 flex items-center justify-center cursor-pointer"
                aria-label="Subscribe"
              >
                {subscribed ? <Check size={14} className="text-emerald-500" /> : <ArrowRight size={14} />}
              </button>
            </form>
            {subscribed && (
              <p className="font-mono text-xs text-[#B8955A]">
                Your name has been registered on the Gazette Ledger.
              </p>
            )}
          </div>

        </div>

      </div>

      {/* Mega Typographic Logo - Edge to Edge Auto Scaling */}
      <div className="w-full pt-24 pb-12 flex flex-col items-center justify-center select-none overflow-hidden px-4 hover:opacity-100 transition-opacity duration-1000 opacity-20">
        <span className="text-[8.8vw] leading-none tracking-[0.15em] text-[#F7F4EE] uppercase font-light whitespace-nowrap" style={{ fontFamily: "'Bodoni Moda', serif" }}>
          Rian Fernandez
        </span>
        <span className="text-[3.2vw] tracking-[0.6em] text-[#bbb1a2] uppercase font-light mt-3 sm:mt-5 md:mt-8 whitespace-nowrap pl-[0.6em]" style={{ fontFamily: "Raleway, sans-serif" }}>
          A T E L I E R
        </span>
      </div>

      <div className="max-w-screen-xl mx-auto">
        {/* Bottom Social Media Bar */}
        <div className="pt-8 border-t border-[#292622] flex flex-col sm:flex-row items-center justify-between gap-6">
          
          {/* Absolute Copyright */}
          <div className="text-xs tracking-wider text-[#9e968a]/40 uppercase font-light text-center sm:text-left" style={{ fontFamily: "Raleway, sans-serif" }}>
            © 2026 Rian Fernandez Atelier. All Sovereign Rights Reserved.
          </div>

          {/* Integrated Social Channels (Directly matches designer coordinates) */}
          <div className="flex items-center gap-6 text-[#bbb1a2]">
            <a
              id="footer-fb-icon"
              href="https://web.facebook.com/rian.fernandez"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#B8955A] transition-colors duration-300 flex items-center gap-1.5 text-xs font-light"
              aria-label="Facebook"
            >
              <Facebook size={15} />
              <span className="tracking-widest uppercase text-xs hidden sm:inline" style={{ fontFamily: "Raleway, sans-serif" }}>Facebook</span>
            </a>
            
            <a
              id="footer-insta-icon"
              href="https://www.instagram.com/rianfernandez888"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#B8955A] transition-colors duration-300 flex items-center gap-1.5 text-xs font-light"
              aria-label="Instagram"
            >
              <Instagram size={15} />
              <span className="tracking-widest uppercase text-xs hidden sm:inline" style={{ fontFamily: "Raleway, sans-serif" }}>Instagram</span>
            </a>

            <a
              id="footer-whatsapp-icon"
              href="https://wa.me/639275642888"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#B8955A] transition-colors duration-300 flex items-center gap-1.5 text-xs font-light"
              aria-label="WhatsApp liaison"
            >
              <MessageCircle size={15} />
              <span className="tracking-widest uppercase text-xs hidden sm:inline" style={{ fontFamily: "Raleway, sans-serif" }}>WhatsApp</span>
            </a>
          </div>

        </div>

      </div>
    </footer>
  );
}
