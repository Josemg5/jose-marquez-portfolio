import React, { useEffect, useState } from 'react';
import {
  Calendar,
  MapPin,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
} from 'lucide-react';
import { PROJECTS_LIST } from '../../data/portfolioData';

interface ProjectsSectionProps {
  activeCaseIndex?: number;
  onSelectCase?: (index: number) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  activeCaseIndex = 0,
  onSelectCase,
}) => {
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  useEffect(() => {
    if (!lightboxImg) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxImg(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxImg]);

  const currentProject =
    PROJECTS_LIST[activeCaseIndex] || PROJECTS_LIST[0];

  const handleStep = (delta: number) => {
    if (!onSelectCase) return;
    const next =
      (activeCaseIndex + delta + PROJECTS_LIST.length) % PROJECTS_LIST.length;
    onSelectCase(next);
  };

  return (
    <section
      id="projects"
      className="relative w-full min-h-[558px] bg-[#061811] text-[#e6f9ef] p-5 flex flex-col gap-4 select-none font-sans"
    >
      {/* Clean Single-Line Experience Selector */}
      <div className="flex items-center justify-between gap-3 border-b border-[#4af699]/15 pb-3">
        <div className="flex flex-wrap items-center gap-2">
          {PROJECTS_LIST.map((proj, idx) => {
            const isActive = idx === activeCaseIndex;
            return (
              <button
                key={proj.id}
                type="button"
                onClick={() => onSelectCase?.(idx)}
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-[5px] text-xs font-semibold transition-all cursor-pointer border ${
                  isActive
                    ? 'bg-[#4af699] text-[#05130e] border-[#4af699]'
                    : 'bg-[#092319] text-[#c6f3dc] border-[#4af699]/20 hover:border-[#4af699]/50 hover:text-white'
                }`}
              >
                <span
                  className={`font-mono text-[11px] font-bold ${
                    isActive ? 'text-[#05130e]/80' : 'text-[#4af699]'
                  }`}
                >
                  {proj.number}
                </span>
                <span>{proj.company}</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={() => handleStep(-1)}
            aria-label="Experiencia anterior"
            className="p-1.5 rounded-[5px] border border-[#4af699]/25 bg-[#092319] text-[#4af699] hover:bg-[#4af699] hover:text-[#05130e] transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="font-mono text-[11px] text-[#9de8c2] px-1">
            {activeCaseIndex + 1}/{PROJECTS_LIST.length}
          </span>
          <button
            type="button"
            onClick={() => handleStep(1)}
            aria-label="Siguiente experiencia"
            className="p-1.5 rounded-[5px] border border-[#4af699]/25 bg-[#092319] text-[#4af699] hover:bg-[#4af699] hover:text-[#05130e] transition-colors cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main 2-Column Clean Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 flex-1 items-stretch">
        {/* LEFT COLUMN (7 cols): Clear, readable hierarchy without nested boxes */}
        <div className="md:col-span-7 flex flex-col justify-between gap-4 pr-1">
          <div className="space-y-4">
            {/* Date & Location */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-[#9de8c2]">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#4af699]" />
                {currentProject.categoryDate.split('|')[0].trim()}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#4af699]" />
                {currentProject.location}
              </span>
            </div>

            {/* Title & Role */}
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight text-white leading-tight">
                {currentProject.company}
              </h2>
              <p className="text-sm font-semibold text-[#4af699] mt-1">
                {currentProject.role}
              </p>
            </div>

            {/* Direct Summary */}
            <p className="text-[13.5px] text-[#d9f4e6] leading-relaxed">
              {currentProject.subtitle}
            </p>

            {/* Clean Key Highlights List */}
            <ul className="space-y-2.5 pt-1">
              {currentProject.highlights.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 text-[13px] text-[#e6f9ef] leading-snug"
                >
                  <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-[#4af699]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Clean Stack Pills */}
          <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#4af699]/15">
            {currentProject.stack.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-[4px] bg-[#0a291d] border border-[#4af699]/25 text-[11px] font-medium text-[#b8f0d3]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN (5 cols): Clean Photo Gallery + Focused Visual Support */}
        <div className="md:col-span-5 flex flex-col gap-3">
          {/* Real Photos Grid */}
          <div className="grid grid-cols-12 gap-2">
            <button
              type="button"
              onClick={() => setLightboxImg(currentProject.images.col2Tall)}
              className="col-span-7 h-[190px] relative group overflow-hidden rounded-[6px] border border-[#4af699]/25 bg-[#04100b] cursor-pointer"
            >
              <img
                src={currentProject.images.col2Tall}
                alt={`${currentProject.company} principal`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute bottom-2 right-2 p-1 rounded bg-[#05130e]/80 text-[#4af699] opacity-80 group-hover:opacity-100">
                <Maximize2 className="w-3.5 h-3.5" />
              </span>
            </button>

            <div className="col-span-5 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => setLightboxImg(currentProject.images.col1Top)}
                className="h-[91px] relative group overflow-hidden rounded-[6px] border border-[#4af699]/25 bg-[#04100b] cursor-pointer"
              >
                <img
                  src={currentProject.images.col1Top}
                  alt={`${currentProject.company} 2`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </button>
              <button
                type="button"
                onClick={() => setLightboxImg(currentProject.images.col1Bottom)}
                className="h-[91px] relative group overflow-hidden rounded-[6px] border border-[#4af699]/25 bg-[#04100b] cursor-pointer"
              >
                <img
                  src={currentProject.images.col1Bottom}
                  alt={`${currentProject.company} 3`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </button>
            </div>
          </div>

          {/* Focused Visual Card Below Photos */}
          {activeCaseIndex === 0 && (
            <div className="flex-1 rounded-[6px] border border-[#4af699]/25 bg-[#04120c] p-3 flex flex-col justify-between">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-[#4af699] font-bold">
                  CIRCUITO ASCARI RESORT
                </span>
                <span className="text-[#9de8c2]">5.425 KM · 26 CURVAS</span>
              </div>
              <svg
                className="w-full h-[165px]"
                viewBox="0 0 330 158"
                aria-label="Trazado real Circuito Ascari"
              >
                <defs>
                  <filter id="glowAscariClean">
                    <feGaussianBlur stdDeviation="2" result="b" />
                    <feMerge>
                      <feMergeNode in="b" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <g transform="translate(-70, 0)">
                  <path
                    d="M 222.6,66.0 C 216.1,63.4 203.5,58.4 199.4,56.2 C 195.3,54.0 200.9,55.1 197.9,52.5 C 194.9,50.0 184.7,42.0 181.4,40.9 C 178.1,39.9 175.9,41.1 178.1,46.4 C 180.2,51.7 189.3,68.9 194.5,72.7 C 199.7,76.4 202.0,66.3 209.2,69.0 C 216.3,71.7 233.5,82.4 237.2,89.1 C 241.0,95.8 234.4,107.3 231.7,109.3 C 229.1,111.2 223.8,101.5 221.4,100.7 C 218.9,99.9 216.8,101.1 217.1,104.4 C 217.4,107.6 222.8,115.4 223.2,120.2 C 223.5,125.1 215.0,128.9 219.2,133.7 C 223.5,138.4 245.3,152.6 248.8,148.9 C 252.4,145.3 238.5,125.7 240.6,111.7 C 242.6,97.7 255.2,74.8 261.0,64.7 C 266.9,54.7 271.4,53.0 275.7,51.3 C 279.9,49.6 283.8,53.5 286.3,54.4 C 288.9,55.2 289.2,57.0 290.9,56.2 C 292.6,55.4 296.5,53.1 296.4,49.5 C 296.3,45.8 292.5,38.2 290.3,34.2 C 288.1,30.3 284.8,28.4 283.0,25.7 C 281.1,22.9 280.7,19.9 279.3,17.8 C 277.9,15.6 277.5,13.1 274.4,12.6 C 271.4,12.1 263.8,12.0 261.0,14.7 C 258.2,17.4 256.7,24.4 257.7,28.7 C 258.6,33.1 268.2,34.4 266.8,40.9 C 265.4,47.4 254.1,62.6 249.4,67.8 C 244.7,72.9 242.9,72.1 238.4,71.7 C 234.0,71.4 229.1,68.5 222.6,66.0 Z"
                    fill="none"
                    stroke="rgba(74,246,153,0.22)"
                    strokeWidth="6"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 222.6,66.0 C 216.1,63.4 203.5,58.4 199.4,56.2 C 195.3,54.0 200.9,55.1 197.9,52.5 C 194.9,50.0 184.7,42.0 181.4,40.9 C 178.1,39.9 175.9,41.1 178.1,46.4 C 180.2,51.7 189.3,68.9 194.5,72.7 C 199.7,76.4 202.0,66.3 209.2,69.0 C 216.3,71.7 233.5,82.4 237.2,89.1 C 241.0,95.8 234.4,107.3 231.7,109.3 C 229.1,111.2 223.8,101.5 221.4,100.7 C 218.9,99.9 216.8,101.1 217.1,104.4 C 217.4,107.6 222.8,115.4 223.2,120.2 C 223.5,125.1 215.0,128.9 219.2,133.7 C 223.5,138.4 245.3,152.6 248.8,148.9 C 252.4,145.3 238.5,125.7 240.6,111.7 C 242.6,97.7 255.2,74.8 261.0,64.7 C 266.9,54.7 271.4,53.0 275.7,51.3 C 279.9,49.6 283.8,53.5 286.3,54.4 C 288.9,55.2 289.2,57.0 290.9,56.2 C 292.6,55.4 296.5,53.1 296.4,49.5 C 296.3,45.8 292.5,38.2 290.3,34.2 C 288.1,30.3 284.8,28.4 283.0,25.7 C 281.1,22.9 280.7,19.9 279.3,17.8 C 277.9,15.6 277.5,13.1 274.4,12.6 C 271.4,12.1 263.8,12.0 261.0,14.7 C 258.2,17.4 256.7,24.4 257.7,28.7 C 258.6,33.1 268.2,34.4 266.8,40.9 C 265.4,47.4 254.1,62.6 249.4,67.8 C 244.7,72.9 242.9,72.1 238.4,71.7 C 234.0,71.4 229.1,68.5 222.6,66.0 Z"
                    fill="none"
                    stroke="#4af699"
                    strokeWidth="2.2"
                    filter="url(#glowAscariClean)"
                  />
                  <circle
                    r="4"
                    fill="#ffffff"
                    stroke="#4af699"
                    strokeWidth="2"
                    filter="url(#glowAscariClean)"
                  >
                    <animateMotion
                      dur="7s"
                      repeatCount="indefinite"
                      path="M 222.6,66.0 C 216.1,63.4 203.5,58.4 199.4,56.2 C 195.3,54.0 200.9,55.1 197.9,52.5 C 194.9,50.0 184.7,42.0 181.4,40.9 C 178.1,39.9 175.9,41.1 178.1,46.4 C 180.2,51.7 189.3,68.9 194.5,72.7 C 199.7,76.4 202.0,66.3 209.2,69.0 C 216.3,71.7 233.5,82.4 237.2,89.1 C 241.0,95.8 234.4,107.3 231.7,109.3 C 229.1,111.2 223.8,101.5 221.4,100.7 C 218.9,99.9 216.8,101.1 217.1,104.4 C 217.4,107.6 222.8,115.4 223.2,120.2 C 223.5,125.1 215.0,128.9 219.2,133.7 C 223.5,138.4 245.3,152.6 248.8,148.9 C 252.4,145.3 238.5,125.7 240.6,111.7 C 242.6,97.7 255.2,74.8 261.0,64.7 C 266.9,54.7 271.4,53.0 275.7,51.3 C 279.9,49.6 283.8,53.5 286.3,54.4 C 288.9,55.2 289.2,57.0 290.9,56.2 C 292.6,55.4 296.5,53.1 296.4,49.5 C 296.3,45.8 292.5,38.2 290.3,34.2 C 288.1,30.3 284.8,28.4 283.0,25.7 C 281.1,22.9 280.7,19.9 279.3,17.8 C 277.9,15.6 277.5,13.1 274.4,12.6 C 271.4,12.1 263.8,12.0 261.0,14.7 C 258.2,17.4 256.7,24.4 257.7,28.7 C 258.6,33.1 268.2,34.4 266.8,40.9 C 265.4,47.4 254.1,62.6 249.4,67.8 C 244.7,72.9 242.9,72.1 238.4,71.7 C 234.0,71.4 229.1,68.5 222.6,66.0 Z"
                    />
                  </circle>
                </g>
              </svg>
              <div className="text-[11px] text-[#9de8c2] text-center">
                App en Microsoft Power Apps &amp; Microsoft 365 para incidencias en pista
              </div>
            </div>
          )}

          {activeCaseIndex === 1 && (
            <div className="flex-1 rounded-[6px] border border-[#4af699]/25 bg-[#04120c] p-4 flex flex-col justify-between gap-3">
              <div>
                <div className="font-mono text-[11px] font-bold text-[#4af699] uppercase">
                  Prácticas Internacionales · Erasmus+
                </div>
                <div className="text-sm font-bold text-white mt-1">
                  Hotel 5★ Sapphire House Antwerp
                </div>
                <p className="text-xs text-[#c6f3dc] mt-1 leading-relaxed">
                  Soporte diario en inglés para departamentos internos y
                  resolución de conectividad Wi-Fi y red en habitaciones.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#4af699]/15 text-xs">
                <div>
                  <span className="text-[#9de8c2] block text-[10px]">
                    IDIOMA DE TRABAJO
                  </span>
                  <strong className="text-white">Inglés B1/B2</strong>
                </div>
                <div>
                  <span className="text-[#9de8c2] block text-[10px]">
                    ÁREA PRINCIPAL
                  </span>
                  <strong className="text-[#4af699]">Redes &amp; Soporte IT</strong>
                </div>
              </div>
            </div>
          )}

          {activeCaseIndex === 2 && (
            <div className="flex-1 rounded-[6px] border border-[#4af699]/25 bg-[#04120c] p-4 flex flex-col justify-between gap-3">
              <div>
                <div className="font-mono text-[11px] font-bold text-[#4af699] uppercase">
                  Experiencia Dual · Técnico y Cliente
                </div>
                <div className="text-sm font-bold text-white mt-1">
                  Clínica PC &amp; Decathlon Ronda
                </div>
                <p className="text-xs text-[#c6f3dc] mt-1 leading-relaxed">
                  Combinación de taller técnico (reparación, limpieza y montaje
                  de PCs) con atención directa y resolutiva cara al público.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#4af699]/15 text-xs">
                <div>
                  <span className="text-[#9de8c2] block text-[10px]">
                    TALLER HARDWARE
                  </span>
                  <strong className="text-white">Montaje &amp; Mejora</strong>
                </div>
                <div>
                  <span className="text-[#9de8c2] block text-[10px]">
                    COMUNICACIÓN
                  </span>
                  <strong className="text-[#4af699]">Trato Directo</strong>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* LIGHTBOX FOR REAL PHOTOS */}
      {lightboxImg && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#030d09]/90 backdrop-blur-md"
          onClick={() => setLightboxImg(null)}
        >
          <div
            className="relative max-w-3xl max-h-[85%] rounded-[6px] border border-[#4af699] bg-[#05140e] p-2 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setLightboxImg(null)}
              className="absolute top-3 right-3 px-2.5 py-1 rounded-[3px] border border-[#4af699] bg-[#05140e]/90 text-[#4af699] hover:bg-[#4af699] hover:text-[#05130e] font-mono text-xs font-bold inline-flex items-center gap-1 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              <span>CERRAR</span>
            </button>
            <img
              src={lightboxImg}
              alt={currentProject.company}
              className="max-h-[440px] w-auto object-contain rounded-[4px]"
            />
          </div>
        </div>
      )}
    </section>
  );
};
