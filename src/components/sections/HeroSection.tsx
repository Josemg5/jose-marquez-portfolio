import React from 'react';
import { FadeIn } from '../ui/FadeIn';
import { Magnet } from '../ui/Magnet';
import { ContactButton } from '../ui/ContactButton';
import { HERO_PORTRAIT_FALLBACK, NAV_LINKS } from '../../data/portfolioData';

export const HeroSection: React.FC = () => {
  return (
    <header
      className="relative h-screen min-h-[640px] flex flex-col justify-between bg-[#0C0C0C]"
      style={{ overflowX: 'clip' }}
    >
      {/* Top Group: Navbar + Massive Hero Heading */}
      <div className="relative z-20 w-full">
        <FadeIn
          as="nav"
          delay={0}
          y={-20}
          className="w-full flex items-center justify-between px-6 md:px-10 pt-6 md:pt-8"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link-hover text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] transition-opacity duration-200"
            >
              {link.label}
            </a>
          ))}
        </FadeIn>

        <div className="overflow-hidden w-full px-3 sm:px-6 md:px-10">
          <FadeIn delay={0.15} y={40}>
            <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-center text-[13vw] sm:text-[14vw] md:text-[15vw] lg:text-[16.5vw] mt-6 sm:mt-4 md:-mt-5 select-none">
              Hi, i&rsquo;m josé
            </h1>
          </FadeIn>
        </div>
      </div>

      {/* Centered Magnetic Portrait */}
      <div className="absolute left-1/2 -translate-x-1/2 z-10 top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0 w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px] pointer-events-auto">
        <FadeIn delay={0.6} y={30} className="w-full">
          <Magnet
            padding={150}
            strength={3}
            activeTransition="transform 0.3s ease-out"
            inactiveTransition="transform 0.6s ease-in-out"
            className="w-full block"
          >
            <img
              src={HERO_PORTRAIT_FALLBACK}
              alt="José Márquez — Técnico DAM y Ciberseguridad"
              {...({ fetchpriority: 'high' } as React.ImgHTMLAttributes<HTMLImageElement>)}
              width={520}
              height={640}
              className="w-full h-auto object-contain select-none pointer-events-none block"
            />
          </Magnet>
        </FadeIn>
      </div>

      {/* Bottom Bar: Left Description & Right Contact CTA */}
      <div className="relative z-20 w-full flex justify-between items-end px-6 md:px-10 pb-7 sm:pb-8 md:pb-10 gap-4">
        <FadeIn delay={0.35} y={20}>
          <p
            className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-[180px] sm:max-w-[240px] md:max-w-[300px]"
            style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
          >
            técnico dam y estudiante de ciberseguridad creando soluciones de
            software y sistemas seguros
          </p>
        </FadeIn>

        <FadeIn delay={0.5} y={20}>
          <ContactButton href="mailto:marquezgonzalezjose620@gmail.com" />
        </FadeIn>
      </div>
    </header>
  );
};
