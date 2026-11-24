import React, { useEffect, useRef, useState } from 'react';
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Clock,
  Utensils,
  Music,
  Check,
  Maximize2,
  X,
} from 'lucide-react';
import { PERSONAL_PROJECTS } from '../../data/portfolioData';

interface PersonalProjectsSectionProps {
  activePersonalIndex?: number;
  onSelectPersonal?: (index: number) => void;
}

export const PersonalProjectsSection: React.FC<PersonalProjectsSectionProps> = ({
  activePersonalIndex = 0,
  onSelectPersonal,
}) => {
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const lastTriggerRef = useRef<HTMLElement | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string>('17:30');
  const [selectedMenuCategory, setSelectedMenuCategory] = useState<
    'entradas' | 'ternera' | 'cerdo'
  >('entradas');
  const [selectedFlamencoTab, setSelectedFlamencoTab] = useState<
    'horarios' | 'compas'
  >('horarios');

  const openLightbox = (imgUrl: string, triggerEl?: HTMLElement | null) => {
    lastTriggerRef.current =
      triggerEl || (document.activeElement as HTMLElement | null);
    setLightboxImg(imgUrl);
  };

  const closeLightbox = () => {
    setLightboxImg(null);
    requestAnimationFrame(() => {
      lastTriggerRef.current?.focus();
    });
  };

  useEffect(() => {
    if (!lightboxImg) return;
    closeBtnRef.current?.focus();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        closeLightbox();
      } else if (e.key === 'Tab') {
        e.preventDefault();
        closeBtnRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown, true);
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, [lightboxImg]);

  const currentProject =
    PERSONAL_PROJECTS[activePersonalIndex] || PERSONAL_PROJECTS[0];

  const handleStep = (delta: number) => {
    if (!onSelectPersonal) return;
    const next =
      (activePersonalIndex + delta + PERSONAL_PROJECTS.length) %
      PERSONAL_PROJECTS.length;
    onSelectPersonal(next);
  };

  return (
    <section
      id="personal"
      className="relative w-full min-h-[558px] bg-[#061811] text-[#e6f9ef] p-4 pb-8 md:pb-4 flex flex-col justify-between gap-3 select-none font-sans"
    >
      {/* Clean Single-Line Personal Project Selector */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-[#4af699]/15 pb-2.5 shrink-0">
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Selector de proyectos destacados">
          {PERSONAL_PROJECTS.map((proj, idx) => {
            const isActive = idx === activePersonalIndex;
            return (
              <button
                key={proj.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => onSelectPersonal?.(idx)}
                className={`inline-flex min-h-[32px] items-center gap-2 px-3 py-1.5 rounded-[5px] text-xs font-semibold transition-all cursor-pointer border active:scale-[0.98] ${
                  isActive
                    ? 'bg-[#4af699] text-[#05130e] border-[#4af699]'
                    : 'bg-[#092319] text-[#c6f3dc] border-[#4af699]/55 hover:bg-[#0f3828] hover:border-[#4af699] hover:text-white'
                }`}
              >
                <span
                  className={`font-mono text-[11px] font-bold ${
                    isActive ? 'text-[#05130e]/80' : 'text-[#4af699]'
                  }`}
                >
                  {proj.number}
                </span>
                <span>{proj.name}</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={() => handleStep(-1)}
            aria-label="Proyecto anterior"
            className="inline-flex items-center justify-center min-w-[32px] min-h-[32px] p-1.5 rounded-[5px] border border-[#4af699]/55 bg-[#092319] text-[#4af699] hover:bg-[#4af699] hover:text-[#05130e] active:scale-[0.97] transition-all cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" aria-hidden="true" />
          </button>
          <span className="font-mono text-[11px] text-[#9de8c2] px-1">
            {activePersonalIndex + 1}/{PERSONAL_PROJECTS.length}
          </span>
          <button
            type="button"
            onClick={() => handleStep(1)}
            aria-label="Siguiente proyecto"
            className="inline-flex items-center justify-center min-w-[32px] min-h-[32px] p-1.5 rounded-[5px] border border-[#4af699]/55 bg-[#092319] text-[#4af699] hover:bg-[#4af699] hover:text-[#05130e] active:scale-[0.97] transition-all cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Main 2-Column Clean Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 flex-1 min-h-0 items-stretch">
        {/* LEFT COLUMN (7 cols): Real Project Info, Action Bar, Highlights & Tech Stack */}
        <div className="md:col-span-7 flex flex-col justify-between gap-2.5 pr-1 min-h-0">
          <div className="space-y-2.5">
            {/* Project Category + Status Badge */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] font-bold uppercase tracking-wide text-[#4af699]">
                  {currentProject.category}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-[3px] border border-[#4af699]/55 bg-[#082218] px-2 py-0.5 font-mono text-[10px] font-bold text-[#c6f3dc]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4af699]" aria-hidden="true" />
                  {currentProject.status}
                </span>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-extrabold tracking-tight text-white leading-tight">
                {currentProject.name}
              </h2>
              <p className="text-[13px] font-semibold text-[#4af699] mt-0.5">
                {currentProject.type}
              </p>
            </div>

            <p className="text-[12.5px] text-[#d9f4e6] leading-snug">
              {currentProject.subtitle}
            </p>

            <ul className="space-y-2 pt-0.5">
              {currentProject.highlights.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 text-[12px] text-[#e6f9ef] leading-snug"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 shrink-0 text-[#4af699]" aria-hidden="true" />
                  <span>{item.trim()}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap gap-1.5 pt-2.5 border-t border-[#4af699]/15">
            {currentProject.stack.map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 rounded-[4px] bg-[#0a291d] border border-[#4af699]/35 text-[10.5px] font-medium text-[#b8f0d3]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN (5 cols): Real App Screenshot + Interactive Preview */}
        <div className="md:col-span-5 flex flex-col gap-2.5 min-h-0">
          {/* App Screenshot Card (Click to enlarge) */}
          <button
            type="button"
            aria-label={`Ampliar captura de la aplicación ${currentProject.name}`}
            onClick={(e) => openLightbox(currentProject.image, e.currentTarget)}
            className="relative h-[175px] w-full group overflow-hidden rounded-[6px] border border-[#4af699]/55 hover:border-[#4af699] bg-[#04100b] cursor-pointer text-left shrink-0 transition-colors"
          >
            <img
              src={currentProject.image}
              alt={`Vista de ${currentProject.name}`}
              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#04100b]/95 via-[#04100b]/50 to-transparent px-3 py-2 flex items-center justify-between">
              <span className="font-mono text-[10px] font-bold text-white">
                CAPTURA DE LA APP · CLIC PARA AMPLIAR
              </span>
              <span className="p-1 rounded bg-[#05130e]/90 text-[#4af699] border border-[#4af699]/55">
                <Maximize2 className="w-3.5 h-3.5" aria-hidden="true" />
              </span>
            </div>
          </button>

          {/* Compact Interactive Data Card Below Screenshot */}
          <div className="flex-1 flex flex-col justify-between rounded-[6px] border border-[#4af699]/30 bg-[#04120c] p-3 gap-2.5 min-h-0">
            <div className="flex items-center justify-between border-b border-[#4af699]/15 pb-1.5">
              <span className="font-mono text-[10.5px] font-bold text-[#4af699] inline-flex items-center gap-1.5">
                {activePersonalIndex === 0 && (
                  <>
                    <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                    RESERLY · FLUJO DE RESERVAS
                  </>
                )}
                {activePersonalIndex === 1 && (
                  <>
                    <Utensils className="w-3.5 h-3.5" aria-hidden="true" />
                    PLATOS REALES · CHINO HOLA
                  </>
                )}
                {activePersonalIndex === 2 && (
                  <>
                    <Music className="w-3.5 h-3.5" aria-hidden="true" />
                    DISCIPLINAS &amp; CARTELERA · RONDA
                  </>
                )}
              </span>
            </div>

            {/* PREVIEW 01: RESERLY */}
            {activePersonalIndex === 0 && (
              <div className="flex-1 flex flex-col justify-between gap-2">
                <div className="grid grid-cols-4 gap-1.5 font-mono text-[10.5px]" role="group" aria-label="Horarios de cita disponibles">
                  {['09:30', '11:00', '17:30', '19:00'].map((slot) => {
                    const active = selectedSlot === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        aria-pressed={active}
                        onClick={() => setSelectedSlot(slot)}
                        className={`min-h-[30px] py-1.5 rounded-[4px] font-bold border transition-all cursor-pointer flex items-center justify-center gap-1 active:scale-[0.97] ${
                          active
                            ? 'bg-[#4af699] text-[#05130e] border-[#4af699]'
                            : 'bg-[#082218] text-[#c6f3dc] border-[#4af699]/55 hover:bg-[#0f3828] hover:border-[#4af699]'
                        }`}
                      >
                        <Clock className="w-2.5 h-2.5" aria-hidden="true" />
                        {slot}
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between bg-[#082218] px-3 py-2 rounded-[5px] border border-[#4af699]/40">
                  <div>
                    <div className="text-xs font-bold text-[#4af699]">
                      Cita reservada a las {selectedSlot}
                    </div>
                    <div className="text-[10.5px] text-[#c6f3dc]">
                      Supabase RLS + Google Calendar API + Resend
                    </div>
                  </div>
                  <span className="font-mono text-[9.5px] font-bold px-2 py-0.5 rounded bg-[#4af699] text-[#05130e] inline-flex items-center gap-1">
                    <Check className="w-3 h-3" aria-hidden="true" /> SYNC
                  </span>
                </div>
              </div>
            )}

            {/* PREVIEW 02: RESTAURANTE CHINO HOLA */}
            {activePersonalIndex === 1 && (
              <div className="flex-1 flex flex-col justify-between gap-2.5">
                <div className="grid grid-cols-3 gap-1.5 text-[11px] font-semibold" role="group" aria-label="Categorías del menú">
                  {(
                    [
                      { id: 'entradas', label: 'Entradas' },
                      { id: 'ternera', label: 'Ternera' },
                      { id: 'cerdo', label: 'Cerdo' },
                    ] as const
                  ).map((cat) => {
                    const active = selectedMenuCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        aria-pressed={active}
                        onClick={() => setSelectedMenuCategory(cat.id)}
                        className={`min-h-[30px] py-1.5 px-2 rounded-[4px] border transition-all cursor-pointer active:scale-[0.97] ${
                          active
                            ? 'bg-[#4af699] text-[#05130e] border-[#4af699]'
                            : 'bg-[#082218] text-[#c6f3dc] border-[#4af699]/55 hover:bg-[#0f3828] hover:border-[#4af699]'
                        }`}
                      >
                        {cat.label}
                      </button>
                    );
                  })}
                </div>

                {selectedMenuCategory === 'entradas' && (
                  <div className="flex items-center justify-between bg-[#082218] px-3 py-2 rounded-[5px] border border-[#4af699]/25">
                    <div>
                      <div className="text-xs font-bold text-white">
                        #12a Especial Rollito Vietnamita (Nam 4 pzs)
                      </div>
                      <div className="text-[10.5px] text-[#9de8c2]">
                        Alérgenos oficiales: Gluten (1) · C/ Infantes 6, Ronda
                      </div>
                    </div>
                    <span className="font-mono text-xs font-bold text-[#4af699]">
                      5,35 €
                    </span>
                  </div>
                )}

                {selectedMenuCategory === 'ternera' && (
                  <div className="flex items-center justify-between bg-[#082218] px-3 py-2 rounded-[5px] border border-[#4af699]/25">
                    <div>
                      <div className="text-xs font-bold text-white">
                        #31 Ternera con Setas Chinas y Bambú
                      </div>
                      <div className="text-[10.5px] text-[#9de8c2]">
                        Alérgenos oficiales: Soja (6) · C/ Infantes 6, Ronda
                      </div>
                    </div>
                    <span className="font-mono text-xs font-bold text-[#4af699]">
                      8,70 €
                    </span>
                  </div>
                )}

                {selectedMenuCategory === 'cerdo' && (
                  <div className="flex items-center justify-between bg-[#082218] px-3 py-2 rounded-[5px] border border-[#4af699]/25">
                    <div>
                      <div className="text-xs font-bold text-white">
                        #44 Costilla Asada / #45 Salsa Agridulce
                      </div>
                      <div className="text-[10.5px] text-[#9de8c2]">
                        Alérgenos: Gluten (1), Soja (6) · Pedido mín. 11 €
                      </div>
                    </div>
                    <span className="font-mono text-xs font-bold text-[#4af699]">
                      9,20 €
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* PREVIEW 03: ACADEMIA FLAMENKOS */}
            {activePersonalIndex === 2 && (
              <div className="flex-1 flex flex-col justify-between gap-2.5">
                <div className="grid grid-cols-2 gap-1.5 text-[11px] font-semibold" role="group" aria-label="Vista previa Academia FlamenKos">
                  <button
                    type="button"
                    aria-pressed={selectedFlamencoTab === 'horarios'}
                    onClick={() => setSelectedFlamencoTab('horarios')}
                    className={`min-h-[30px] py-1.5 px-2 rounded-[4px] border transition-all cursor-pointer active:scale-[0.97] ${
                      selectedFlamencoTab === 'horarios'
                        ? 'bg-[#4af699] text-[#05130e] border-[#4af699]'
                        : 'bg-[#082218] text-[#c6f3dc] border-[#4af699]/55 hover:bg-[#0f3828] hover:border-[#4af699]'
                    }`}
                  >
                    6 Disciplinas WebGL
                  </button>
                  <button
                    type="button"
                    aria-pressed={selectedFlamencoTab === 'compas'}
                    onClick={() => setSelectedFlamencoTab('compas')}
                    className={`min-h-[30px] py-1.5 px-2 rounded-[4px] border transition-all cursor-pointer active:scale-[0.97] ${
                      selectedFlamencoTab === 'compas'
                        ? 'bg-[#4af699] text-[#05130e] border-[#4af699]'
                        : 'bg-[#082218] text-[#c6f3dc] border-[#4af699]/55 hover:bg-[#0f3828] hover:border-[#4af699]'
                    }`}
                  >
                    Cartelera &amp; Eventos
                  </button>
                </div>

                {selectedFlamencoTab === 'horarios' ? (
                  <div className="flex items-center justify-between bg-[#082218] px-3 py-2 rounded-[5px] border border-[#4af699]/25">
                    <div>
                      <div className="text-xs font-bold text-white">
                        Taconeo · Bata de Cola · Cantera 3+ · Castañuelas
                      </div>
                      <div className="text-[10.5px] text-[#9de8c2]">
                        Salas Principal &amp; Triana · C/ Molino 6, Ronda
                      </div>
                    </div>
                    <span className="font-mono text-[10px] font-bold text-[#4af699]">
                      GLSL 3D
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center justify-between bg-[#082218] px-3 py-2 rounded-[5px] border border-[#4af699]/25">
                    <div>
                      <div className="text-xs font-bold text-white">
                        Feria Pedro Romero · Gala Unicaja · Teatro Espinel
                      </div>
                      <div className="text-[10.5px] text-[#9de8c2]">
                        @academia_flamenkos · Admisión vía WhatsApp
                      </div>
                    </div>
                    <span className="font-mono text-[10px] font-bold text-[#4af699]">
                      RONDA
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Clean 3-Metric Footer Row */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#4af699]/15 text-[11px]">
              {currentProject.metrics.map((m, i) => (
                <div key={i}>
                  <span className="text-[9.5px] text-[#9de8c2] block">
                    {m.label}
                  </span>
                  <strong className="text-[#4af699] font-semibold">
                    {m.value}
                  </strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* LIGHTBOX FOR PROJECT SCREENSHOT */}
      {lightboxImg && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Captura ampliada del proyecto ${currentProject.name}`}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#030d09]/90 backdrop-blur-md"
          onClick={closeLightbox}
        >
          <div
            className="relative max-w-3xl max-h-[85%] rounded-[6px] border border-[#4af699] bg-[#05140e] p-2 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              ref={closeBtnRef}
              type="button"
              onClick={closeLightbox}
              className="absolute top-3 right-3 min-h-[32px] px-3 py-1 rounded-[4px] border border-[#4af699] bg-[#05140e]/95 text-[#4af699] hover:bg-[#4af699] hover:text-[#05130e] font-mono text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" aria-hidden="true" />
              <span>CERRAR</span>
            </button>
            <img
              src={lightboxImg}
              alt={`Captura completa de ${currentProject.name}`}
              className="max-h-[440px] w-auto object-contain rounded-[4px]"
            />
          </div>
        </div>
      )}
    </section>
  );
};
