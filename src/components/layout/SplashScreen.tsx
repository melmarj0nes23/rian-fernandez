import { useEffect, useState } from 'react';

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Start fading out after 2 seconds
    const fadeTimer = setTimeout(() => {
      setFading(true);
    }, 2000);

    // Complete after fade transition (1 second)
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div 
      className="fixed top-0 left-0 w-screen h-screen z-[9999] flex flex-col items-center justify-center"
      style={{
        backgroundColor: '#F7F4EE',
        transition: 'opacity 1s ease-in-out',
        opacity: fading ? 0 : 1,
      }}
    >
      <div className="flex flex-col items-center justify-center animate-pulse">
        {/* Logo */}
        <img 
          src="/rf-logo.png" 
          alt="Rian Fernandez Logo" 
          className="h-16 mb-8 object-contain" 
        />
        
        {/* Name */}
        <h1 
          style={{
            fontFamily: "'Bodoni Moda', serif",
            fontWeight: 400,
            fontSize: "clamp(1.5rem, 3vw, 2rem)",
            letterSpacing: "0.25em",
            color: "#0C0B09",
            marginBottom: "1rem"
          }}
        >
          RIAN FERNANDEZ
        </h1>

        {/* Separator Line */}
        <div 
          style={{
            width: "40px",
            height: "1px",
            backgroundColor: "rgba(12,11,9,0.3)",
            marginBottom: "1rem"
          }}
        />

        {/* Subtitle */}
        <p 
          style={{
            fontFamily: "Raleway, sans-serif",
            fontWeight: 300,
            fontSize: "0.6rem",
            letterSpacing: "0.5em",
            color: "#7A7468",
            textTransform: "uppercase",
            paddingLeft: "0.5em" // Offset for letter-spacing to center it
          }}
        >
          COUTURE ATELIER
        </p>
      </div>
    </div>
  );
}
