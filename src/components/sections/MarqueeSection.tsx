import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { MARQUEE_GIFS } from '../../data/portfolioData';
import { useScrollContainer } from '../../context/ScrollContainerContext';

const ROW_1_BASE = MARQUEE_GIFS.slice(0, 11);
const ROW_2_BASE = MARQUEE_GIFS.slice(11, 21);

const ROW_1_IMAGES = [...ROW_1_BASE, ...ROW_1_BASE, ...ROW_1_BASE];
const ROW_2_IMAGES = [...ROW_2_BASE, ...ROW_2_BASE, ...ROW_2_BASE];

export const MarqueeSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const scrollContainerRef = useScrollContainer();

  useEffect(() => {
    if (shouldReduceMotion) return;

    let rafId: number | null = null;
    const scrollEl = scrollContainerRef?.current ?? null;

    const updateMarqueePosition = () => {
      const sectionEl = sectionRef.current;
      const row1El = row1Ref.current;
      const row2El = row2Ref.current;
      if (!sectionEl || !row1El || !row2El) return;

      const scrollTop = scrollEl ? scrollEl.scrollTop : window.scrollY;
      const viewportHeight = scrollEl ? scrollEl.clientHeight : window.innerHeight;
      const sectionTop = sectionEl.offsetTop;
      const offset = (scrollTop - sectionTop + viewportHeight) * 0.35;

      row1El.style.transform = `translateX(${(offset - 220).toFixed(2)}px)`;
      row2El.style.transform = `translateX(${(-(offset - 220)).toFixed(2)}px)`;
    };

    const handleScroll = () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateMarqueePosition);
    };

    updateMarqueePosition();
    if (scrollEl) {
      scrollEl.addEventListener('scroll', handleScroll, { passive: true });
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      if (scrollEl) {
        scrollEl.removeEventListener('scroll', handleScroll);
      }
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [shouldReduceMotion, scrollContainerRef]);

  return (
    <section
      ref={sectionRef}
      aria-label="Galería visual de interfaces y proyectos"
      className="bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden"
    >
      <div className="flex flex-col gap-3">
        {/* Row 1: Moves RIGHT on scroll */}
        <div
          ref={row1Ref}
          className="flex gap-3 w-max"
          style={{
            transform: 'translateX(-200px)',
            willChange: 'transform',
          }}
        >
          {ROW_1_IMAGES.map((src, idx) => (
            <img
              key={`r1-${idx}`}
              src={src}
              alt={`Demostración interactiva ${(idx % ROW_1_BASE.length) + 1}`}
              width={420}
              height={270}
              loading="lazy"
              className="w-[420px] h-[270px] shrink-0 rounded-2xl object-cover select-none pointer-events-none bg-[#16181A]"
            />
          ))}
        </div>

        {/* Row 2: Moves LEFT on scroll */}
        <div
          ref={row2Ref}
          className="flex gap-3 w-max"
          style={{
            transform: 'translateX(200px)',
            willChange: 'transform',
          }}
        >
          {ROW_2_IMAGES.map((src, idx) => (
            <img
              key={`r2-${idx}`}
              src={src}
              alt={`Proyecto en movimiento ${(idx % ROW_2_BASE.length) + 1}`}
              width={420}
              height={270}
              loading="lazy"
              className="w-[420px] h-[270px] shrink-0 rounded-2xl object-cover select-none pointer-events-none bg-[#16181A]"
            />
          ))}
        </div>
      </div>
    </section>
  );
};
