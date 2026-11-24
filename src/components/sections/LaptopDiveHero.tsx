import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import {
  ArrowLeft,
  Briefcase,
  FolderGit2,
  Mail,
  Sparkles,
  User,
} from 'lucide-react';
import { ScrollContainerContext } from '../../context/ScrollContainerContext';

const JOSE_STUDIO_PLATE = '/studio-fondo.png?v=4';
const JOSE_STUDIO_CUT = '/tu-foto.png?v=5';
const JOSE_ID_PHOTO = '/tu-foto-carnet.jpg';
const CASE_PLATE_URL = '/laptop-case.webp';
const BADGE_URL = '/lanyard-badge.webp';
const FALLBACK_PLATE_URL = JOSE_STUDIO_PLATE;
const FALLBACK_CUT_URL = JOSE_STUDIO_CUT;

export type DiveStage = 'hero' | 'diving-in' | 'body' | 'diving-out';
export type PortfolioTabId =
  | 'projects'
  | 'personal'
  | 'about'
  | 'services'
  | 'contact';

const BROWSER_TABS: {
  id: PortfolioTabId;
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
}[] = [
  {
    id: 'about',
    label: 'Sobre mí',
    Icon: User,
  },
  {
    id: 'projects',
    label: 'Experiencia',
    Icon: Briefcase,
  },
  {
    id: 'services',
    label: 'Especialidades',
    Icon: Sparkles,
  },
  {
    id: 'personal',
    label: 'Proyectos',
    Icon: FolderGit2,
  },
  {
    id: 'contact',
    label: 'Contacto',
    Icon: Mail,
  },
];

interface CaseHudMeta {
  title: string;
  rows: string[];
  key: string;
  text: string;
  num: string;
  badge: string;
}

const EXPERIENCE_CASES: CaseHudMeta[] = [
  {
    title: 'CIRCUITO ASCARI',
    rows: ['PROGRAMADOR', 'POWER APPS · M365', 'MAR-MAY 2026'],
    key: '// 01 · circuito_ascari',
    text: 'Creación de una aplicación con Microsoft Power Apps y las apps de Microsoft para la gestión de incidencias en pista: personal, tiempos, materiales y trazabilidad.',
    num: 'EXP 01 / 03',
    badge: 'POWER APPS // MICROSOFT 365',
  },
  {
    title: 'SAPPHIRE HOUSE',
    rows: ['SOPORTE IT', 'AMBERES, BÉLGICA', 'ABR-JUN 2023'],
    key: '// 02 · sapphire_antwerp',
    text: 'Prácticas internacionales en Bélgica dando soporte técnico a equipos de departamentos del hotel y resolviendo incidencias de red en habitaciones.',
    num: 'EXP 02 / 03',
    badge: 'SOPORTE IT // ANTWERP',
  },
  {
    title: 'CLÍNICA PC',
    rows: ['HARDWARE & CLIENTE', 'DECATHLON · RONDA', '2023-2026'],
    key: '// 03 · clinica_pc_decathlon',
    text: 'Reparación de hardware, limpieza, montaje y mejora de equipos en Clínica PC, complementado con atención directa al cliente en Decathlon.',
    num: 'EXP 03 / 03',
    badge: 'HARDWARE // OPTIMIZADO',
  },
];

const PERSONAL_CASES: CaseHudMeta[] = [
  {
    title: 'RESERLY SAAS',
    rows: ['NEXT.JS 16 · SUPABASE', 'GOOGLE CALENDAR API', 'MULTI-TENANT RLS'],
    key: '// 01 · reserly_saas',
    text: 'Plataforma SaaS multi-tenant para peluquerías y barberías con portal público de reservas, horarios por empleado, métricas Recharts y sincronización con Google Calendar y Resend.',
    num: 'PROY 01 / 03',
    badge: 'NEXT.JS 16 // SUPABASE',
  },
  {
    title: 'CHINO HOLA',
    rows: ['CARTA DIGITAL RONDA', 'GSAP 3 · PARALLAX GPU', '14 ALÉRGENOS + CSP'],
    key: '// 02 · chino_hola_ronda',
    text: 'Carta digital interactiva oficial del Restaurante Chino HOLA (您好酒楼) en Ronda con 12 categorías, filtro en vivo de los 14 alérgenos y parallax en GPU.',
    num: 'PROY 02 / 03',
    badge: 'GSAP // 14 ALÉRGENOS',
  },
  {
    title: 'FLAMENKOS 3D',
    rows: ['THREE.JS · R3F · GLSL', 'GSAP 3 · LENIS SCROLL', 'MIGUEL LORCA · RONDA'],
    key: '// 03 · academia_flamenkos',
    text: 'Web cinemática 3D para la Academia FlamenKos de Miguel Lorca en Ronda con shaders GLSL líquidos, partículas WebGL, scrollytelling GSAP y cartelera interactiva.',
    num: 'PROY 03 / 03',
    badge: 'THREE.JS // GLSL SHADERS',
  },
];

const TAB_HUD_META: Record<
  Exclude<PortfolioTabId, 'projects' | 'personal'>,
  CaseHudMeta
> = {
  about: {
    title: 'JOSÉ MÁRQUEZ',
    rows: ['DAM & CIBERSEGURIDAD', 'IES FUENTE GRANDE', 'RONDA, MÁLAGA'],
    key: '// sobre_mí',
    text: 'Técnico en Desarrollo de Aplicaciones Multiplataforma (DAM) y SMR, especializándome en Ciberseguridad en Entornos TI.',
    num: 'PERFIL // CV',
    badge: 'PERFIL: VERIFICADO',
  },
  services: {
    title: 'ESPECIALIDADES',
    rows: ['JAVA · C# · C++ · PYTHON', 'SQL · MYSQL · JAVAFX', 'KALI · NMAP · SIEM'],
    key: '// áreas_y_stack',
    text: 'Desarrollo multiplataforma a medida, diseño de bases de datos relacionales, redes, hardware y auditoría de ciberseguridad.',
    num: 'ÁREAS // 05',
    badge: '5 ÁREAS // ACTIVAS',
  },
  contact: {
    title: 'CONTACTO',
    rows: ['+34 666 74 04 37', 'RONDA, MÁLAGA', 'DISPONIBLE'],
    key: '// contacto_directo',
    text: 'Canales directos para proyectos y oportunidades en desarrollo multiplataforma DAM, soporte IT y ciberseguridad.',
    num: 'CONTACTO // DIRECTO',
    badge: 'DISPONIBLE // ACTIVO',
  },
};

interface LaptopDiveHeroProps {
  stage: DiveStage;
  onStageChange: (nextStage: DiveStage) => void;
  activeTab: PortfolioTabId;
  onSelectTab: (tab: PortfolioTabId) => void;
  activeCaseIndex: number;
  onSelectCase: (index: number) => void;
  activePersonalIndex: number;
  onSelectPersonal: (index: number) => void;
  children?: React.ReactNode;
}

interface PoseResult {
  s: number;
  x: number;
  y: number;
  isMobile: boolean;
  u: number;
}

export const LaptopDiveHero: React.FC<LaptopDiveHeroProps> = ({
  stage,
  onStageChange,
  activeTab,
  onSelectTab,
  activeCaseIndex,
  onSelectCase,
  activePersonalIndex,
  onSelectPersonal,
  children,
}) => {
  const shouldReduceMotion = useReducedMotion();

  const stageElRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const plateRef = useRef<HTMLImageElement>(null);
  const cutRef = useRef<HTMLImageElement>(null);
  const wmRef = useRef<SVGSVGElement>(null);
  const scriptRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const casePlateRef = useRef<HTMLImageElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const screenScrollRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);

  const ticketRef = useRef<HTMLElement>(null);
  const descRef = useRef<HTMLElement>(null);

  const mobileWmRef = useRef<SVGSVGElement>(null);
  const mobileScriptRef = useRef<HTMLDivElement>(null);

  const tag1Ref = useRef<HTMLButtonElement>(null);
  const tag2Ref = useRef<HTMLButtonElement>(null);
  const tag3Ref = useRef<HTMLButtonElement>(null);
  const tag4Ref = useRef<HTMLButtonElement>(null);
  const hintRef = useRef<HTMLButtonElement>(null);

  const swayAnimRef = useRef<Animation | null>(null);
  const busyRef = useRef<boolean>(false);
  const hasEnteredRef = useRef<boolean>(false);
  const touchStartYRef = useRef<number | null>(null);

  const [plateSrc, setPlateSrc] = useState<string>(JOSE_STUDIO_PLATE);
  const [cutSrc, setCutSrc] = useState<string>(JOSE_STUDIO_CUT);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const CODE_LINE = 'Dam & Cybersecurity';
  const [typedLen, setTypedLen] = useState<number>(
    shouldReduceMotion ? CODE_LINE.length : 0
  );

  useEffect(() => {
    if (shouldReduceMotion) {
      setTypedLen(CODE_LINE.length);
      return;
    }
    if (stage !== 'hero') return;

    setTypedLen(0);
    let intervalId: number | undefined;
    const startDelay = window.setTimeout(() => {
      let i = 0;
      intervalId = window.setInterval(() => {
        i += 1;
        setTypedLen(i);
        if (i >= CODE_LINE.length && intervalId !== undefined) {
          window.clearInterval(intervalId);
        }
      }, 65);
    }, 900);

    return () => {
      window.clearTimeout(startDelay);
      if (intervalId !== undefined) window.clearInterval(intervalId);
    };
  }, [stage, shouldReduceMotion]);

  const currentHud: CaseHudMeta =
    activeTab === 'projects'
      ? EXPERIENCE_CASES[activeCaseIndex] || EXPERIENCE_CASES[0]
      : activeTab === 'personal'
      ? PERSONAL_CASES[activePersonalIndex] || PERSONAL_CASES[0]
      : TAB_HUD_META[activeTab];

  const triggerMonitorFlash = useCallback(() => {
    if (shouldReduceMotion || !flashRef.current) return;
    flashRef.current.animate([{ opacity: 0.75 }, { opacity: 0 }], {
      duration: 420,
      easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
    });
  }, [shouldReduceMotion]);

  const animateCaseHudIn = useCallback(() => {
    if (shouldReduceMotion) return;
    if (ticketRef.current) {
      ticketRef.current.animate(
        [
          {
            opacity: 0,
            transform: 'translateY(-24px) rotate(5deg) scale(0.95)',
          },
          {
            opacity: 1,
            transform: 'translateY(0) rotate(-1.2deg) scale(1)',
            offset: 0.7,
          },
          { opacity: 1, transform: 'translateY(0) rotate(0deg) scale(1)' },
        ],
        {
          duration: 540,
          easing: 'cubic-bezier(0.2, 0.9, 0.2, 1)',
        }
      );
    }
    if (descRef.current) {
      descRef.current.animate(
        [
          { opacity: 0, transform: 'translateY(14px)' },
          { opacity: 1, transform: 'translateY(0)' },
        ],
        {
          duration: 420,
          easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
        }
      );
    }
  }, [shouldReduceMotion]);

  // Compute frame pose for 'hero', 'case', or 'zoom-through'
  const computePose = useCallback(
    (mode: 'hero' | 'case' | 'zoom-through'): PoseResult => {
      const W = window.innerWidth;
      const H = window.innerHeight;
      const isMobile = W <= 820;
      const u = isMobile ? W / 430 : Math.min(W / 1440, H / 900);

      if (mode === 'zoom-through') {
        const screenW = 894.4;
        const screenH = 604.7;
        const s = Math.max(W / screenW, H / screenH) * 1.06;
        const screenCenterX = 272.8 + screenW / 2;
        const screenCenterY = 102.7 + screenH / 2;
        const x = W / 2 - screenCenterX * s;
        const y = H / 2 - screenCenterY * s;
        return { s, x, y, isMobile, u };
      }

      if (!isMobile) {
        const cover = Math.max(W / 1440, H / 810);
        if (mode === 'hero') {
          const s = cover;
          const x = (W - 1440 * s) / 2;
          const y = Math.min(0, (H - 810 * s) * 0.25);
          return { s, x, y, isMobile, u };
        } else {
          // Auto-scale laptop to fill the available screen height and width without covering top tags or side HUD
          const topSafe = 48 * u;
          const bottomSafe = 10 * u;
          const availH = Math.max(320, H - topSafe - bottomSafe);
          const sideReserve = W < 1200 ? 310 * u : 390 * u;
          const availW = Math.max(520, W - sideReserve);
          const fitW = availW / 935;
          const fitH = availH / 672;
          const s = Math.min(fitW, fitH);
          const x = (W - 1440 * s) / 2 - 14 * u;
          const targetCenterY = topSafe + availH / 2;
          const y = targetCenterY - 409 * s;
          return { s, x, y, isMobile, u };
        }
      } else {
        if (mode === 'hero') {
          const s = Math.min(W / 465, (0.79 * H) / 810);
          const x = W / 2 - 718 * s;
          const y = H - 785 * s;
          return { s, x, y, isMobile, u };
        } else {
          const s = (W * 0.92) / 894.4;
          const x = (W - 1440 * s) / 2;
          const y = H * 0.46 - 405 * s;
          return { s, x, y, isMobile, u };
        }
      }
    },
    []
  );

  // Fit desktop hero elements (wordmark, badge, script) within visible viewport slice
  const fitHeroElements = useCallback((p: PoseResult) => {
    const W = window.innerWidth;
    const H = window.innerHeight;
    document.documentElement.style.setProperty('--n', `${p.u}px`);

    if (p.isMobile) {
      return;
    }

    const { s, x, y } = p;
    const vl = Math.max(0, -x / s);
    const vr = Math.min(1440, (W - x) / s);
    const pad = 18 / s;

    if (wmRef.current) {
      wmRef.current.style.left = `${vl + 0.6 * pad}px`;
      wmRef.current.style.width = `${Math.max(300, vr - vl - 1.2 * pad)}px`;
    }

    if (badgeRef.current) {
      const badgeLeft = Math.min(986, vr - pad - 417);
      const vb = Math.min(810, (H - y) / s);
      const badgeTop = Math.min(-165, vb - 56 / s - 935);
      badgeRef.current.style.left = `${badgeLeft}px`;
      badgeRef.current.style.top = `${badgeTop}px`;
    }

    if (scriptRef.current) {
      scriptRef.current.style.left = `${vl + pad + 70}px`;
    }
  }, []);

  const placeFrame = useCallback(
    (mode: 'hero' | 'case' | 'zoom-through') => {
      const frame = frameRef.current;
      const stageEl = stageElRef.current;
      if (!frame || !stageEl) return;

      const p = computePose(mode);
      document.documentElement.style.setProperty('--n', `${p.u}px`);
      if (p.isMobile && mode !== 'hero') {
        frame.style.transform = 'none';
      } else {
        frame.style.transform = `translate(${p.x.toFixed(2)}px, ${p.y.toFixed(
          2
        )}px) scale(${p.s.toFixed(4)})`;
      }

      frame.classList.toggle('d-fade', !p.isMobile);
      frame.classList.toggle('m-fade', p.isMobile);

      const isCaseLike = mode !== 'hero';
      frame.classList.toggle('m-case', isCaseLike);
      stageEl.classList.toggle('m-case', isCaseLike);

      if (mode === 'hero') {
        fitHeroElements(p);
      }
    },
    [computePose, fitHeroElements]
  );

  // Start continuous idle sway on lanyard badge
  const startBadgeSway = useCallback(() => {
    if (shouldReduceMotion) return;

    swayAnimRef.current?.cancel();

    if (badgeRef.current) {
      swayAnimRef.current = badgeRef.current.animate(
        [{ transform: 'rotate(-1.1deg)' }, { transform: 'rotate(1.1deg)' }],
        {
          duration: 3200,
          iterations: Infinity,
          direction: 'alternate',
          easing: 'ease-in-out',
        }
      );
    }
  }, [shouldReduceMotion]);

  // Hover swing on badge card
  const handleBadgeHover = useCallback(() => {
    if (shouldReduceMotion || stage !== 'hero') return;
    if (badgeRef.current) {
      badgeRef.current.animate(
        [
          { transform: 'rotate(0deg)' },
          { transform: 'rotate(-6deg)' },
          { transform: 'rotate(4deg)' },
          { transform: 'rotate(-2deg)' },
          { transform: 'rotate(0deg)' },
        ],
        {
          duration: 1400,
          easing: 'ease-out',
          composite: 'add',
        }
      );
    }
  }, [shouldReduceMotion, stage]);

  useEffect(() => {
    if (stage === 'hero') {
      placeFrame('hero');
    } else if (stage === 'body') {
      placeFrame('case');
    }

    const handleResize = () => {
      if (!frameRef.current) return;
      frameRef.current.classList.remove('glide');
      if (stage === 'hero') {
        placeFrame('hero');
      } else if (stage === 'body') {
        placeFrame('case');
      }
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, [placeFrame, stage]);

  const selectAndResetTab = useCallback(
    (tabId?: PortfolioTabId) => {
      if (tabId) {
        onSelectTab(tabId);
        if (window.location.hash !== `#${tabId}`) {
          window.history.replaceState(
            { stage: 'body', tab: tabId },
            '',
            `#${tabId}`
          );
        }
      }
      triggerMonitorFlash();
      animateCaseHudIn();
      if (screenScrollRef.current) {
        screenScrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    [animateCaseHudIn, onSelectTab, triggerMonitorFlash]
  );

  const handleSelectCase = useCallback(
    (delta: number) => {
      if (activeTab === 'personal') {
        const wrappedPersonal =
          (activePersonalIndex + delta + PERSONAL_CASES.length) %
          PERSONAL_CASES.length;
        onSelectPersonal(wrappedPersonal);
      } else {
        if (activeTab !== 'projects') {
          onSelectTab('projects');
        }
        const wrappedExp =
          (activeCaseIndex + delta + EXPERIENCE_CASES.length) %
          EXPERIENCE_CASES.length;
        onSelectCase(wrappedExp);
      }
      triggerMonitorFlash();
      animateCaseHudIn();
    },
    [
      activeCaseIndex,
      activePersonalIndex,
      activeTab,
      animateCaseHudIn,
      onSelectCase,
      onSelectPersonal,
      onSelectTab,
      triggerMonitorFlash,
    ]
  );

  // Reset scroll position to top whenever activeTab changes
  useEffect(() => {
    if (screenScrollRef.current) {
      screenScrollRef.current.scrollTop = 0;
    }
  }, [activeTab, activeCaseIndex, activePersonalIndex]);

  useEffect(() => {
    if (hasEnteredRef.current) return;
    hasEnteredRef.current = true;

    const defaultEase = 'cubic-bezier(0.2, 0.8, 0.2, 1)';
    const tags = [
      tag1Ref.current,
      tag2Ref.current,
      tag3Ref.current,
      tag4Ref.current,
    ];

    if (shouldReduceMotion) {
      return;
    }

    const runEntrance = () => {
      tags.forEach((tag, i) => {
        if (!tag) return;
        tag.animate(
          [
            { opacity: 0, transform: 'translateY(-40px) rotate(-4deg)' },
            { opacity: 1, transform: 'translateY(0px) rotate(0deg)' },
          ],
          {
            duration: 700,
            delay: 120 + i * 80,
            easing: 'cubic-bezier(0.3, 1.5, 0.5, 1)',
            fill: 'both',
          }
        );
      });

      [wmRef.current, mobileWmRef.current].forEach((wm) => {
        if (!wm) return;
        wm.animate(
          [
            {
              opacity: 0,
              transform: 'translateY(60px)',
              clipPath: 'inset(100% 0 0 0)',
            },
            {
              opacity: 1,
              transform: 'translateY(0px)',
              clipPath: 'inset(0% 0 0 0)',
            },
          ],
          {
            duration: 1100,
            delay: 260,
            easing: defaultEase,
            fill: 'both',
          }
        );
      });

      [scriptRef.current, mobileScriptRef.current].forEach((sc) => {
        if (!sc) return;
        const rot = 'rotate(-4deg)';
        sc.animate(
          [
            { opacity: 0, transform: rot },
            { opacity: 1, transform: rot },
          ],
          {
            duration: 300,
            delay: 800,
            easing: 'ease-out',
            fill: 'both',
          }
        );
      });

      if (badgeRef.current) {
        const badgeAnim = badgeRef.current.animate(
          [
            { opacity: 0, transform: 'translateY(-120%) rotate(8deg)' },
            {
              opacity: 1,
              transform: 'translateY(0%) rotate(-3deg)',
              offset: 0.6,
            },
            {
              opacity: 1,
              transform: 'translateY(0%) rotate(1.6deg)',
              offset: 0.8,
            },
            { opacity: 1, transform: 'translateY(0%) rotate(0deg)' },
          ],
          {
            duration: 1500,
            delay: 700,
            easing: defaultEase,
            fill: 'both',
          }
        );
        badgeAnim.onfinish = () => startBadgeSway();
      }

      if (hintRef.current) {
        hintRef.current.animate([{ opacity: 0 }, { opacity: 0.85 }], {
          duration: 600,
          delay: 1600,
          easing: defaultEase,
          fill: 'both',
        });
      }
    };

    requestAnimationFrame(runEntrance);
  }, [shouldReduceMotion, startBadgeSway]);

  // Trigger Dive into Laptop -> Stop at straight-on open Laptop ('case' pose) and enable interactive screen
  const triggerDiveIntoLaptop = useCallback(
    (targetTabId: PortfolioTabId = 'about') => {
      if (busyRef.current) return;
      if (stage === 'body') {
        selectAndResetTab(targetTabId);
        return;
      }
      if (stage !== 'hero') return;

      onSelectTab(targetTabId);
      if (window.location.hash !== `#${targetTabId}`) {
        window.history.pushState(
          { stage: 'body', tab: targetTabId },
          '',
          `#${targetTabId}`
        );
      }

      busyRef.current = true;
      onStageChange('diving-in');

      if (shouldReduceMotion) {
        placeFrame('case');
        if (casePlateRef.current) casePlateRef.current.style.opacity = '1';
        if (screenRef.current) screenRef.current.style.opacity = '1';
        if (cutRef.current) cutRef.current.style.opacity = '0';
        if (plateRef.current) plateRef.current.style.opacity = '0';
        onStageChange('body');
        busyRef.current = false;
        return;
      }

      const outEase = 'cubic-bezier(0.5, 0, 0.75, 0)';

      [wmRef.current, mobileWmRef.current].forEach((wm) => {
        wm?.animate(
          [
            { opacity: 1, transform: 'translateY(0px)' },
            { opacity: 0, transform: 'translateY(-40px)' },
          ],
          { duration: 380, easing: outEase, fill: 'forwards' }
        );
      });

      [scriptRef.current, mobileScriptRef.current].forEach((sc) => {
        const rot = 'rotate(-4deg)';
        sc?.animate(
          [
            { opacity: 1, transform: rot },
            { opacity: 0, transform: rot },
          ],
          { duration: 320, easing: outEase, fill: 'forwards' }
        );
      });

      swayAnimRef.current?.cancel();

      if (badgeRef.current) {
        badgeRef.current.animate(
          [
            { opacity: 1, transform: 'translateY(0%) rotate(0deg)' },
            { opacity: 0, transform: 'translateY(-110%) rotate(-6deg)' },
          ],
          { duration: 380, easing: outEase, fill: 'forwards' }
        );
      }

      setTimeout(() => {
        const frame = frameRef.current;
        const cut = cutRef.current;
        const plate = plateRef.current;
        const casePlate = casePlateRef.current;
        const screen = screenRef.current;
        const flash = flashRef.current;

        if (!frame || !casePlate || !screen) return;

        document.documentElement.style.setProperty('--glide', '0.92s');
        frame.classList.add('glide');
        placeFrame('case');

        [cut, plate, casePlate, screen].forEach((el) => {
          el?.getAnimations().forEach((anim) => anim.cancel());
        });

        cut?.animate([{ opacity: 1 }, { opacity: 0 }], {
          duration: 420,
          easing: 'ease-out',
          fill: 'forwards',
        });
        plate?.animate(
          [
            {
              opacity: 1,
              filter: 'brightness(0.93) contrast(1.02) blur(0px)',
            },
            {
              opacity: 0,
              filter: 'brightness(0.93) contrast(1.02) blur(8px)',
            },
          ],
          { duration: 520, easing: 'ease-out', fill: 'forwards' }
        );
        casePlate.animate(
          [
            { opacity: 0, transform: 'scale(0.92)', filter: 'blur(0px)' },
            { opacity: 1, transform: 'scale(1)', filter: 'blur(0px)' },
          ],
          {
            duration: 620,
            easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
            fill: 'forwards',
          }
        );

        setTimeout(() => {
          screen.animate([{ opacity: 0 }, { opacity: 1 }], {
            duration: 340,
            easing: 'ease-out',
            fill: 'forwards',
          });
          screen.style.opacity = '1';
          flash?.animate(
            [{ opacity: 0 }, { opacity: 0.75, offset: 0.3 }, { opacity: 0 }],
            { duration: 460, easing: 'ease-out' }
          );
        }, 280);

        setTimeout(() => {
          frame.classList.remove('glide');
          onStageChange('body');
          busyRef.current = false;
          animateCaseHudIn();
          if (screenScrollRef.current) {
            screenScrollRef.current.scrollTop = 0;
          }
        }, 920);
      }, 240);
    },
    [
      animateCaseHudIn,
      onSelectTab,
      onStageChange,
      placeFrame,
      selectAndResetTab,
      shouldReduceMotion,
      stage,
    ]
  );

  // Reverse Dive: From Open Laptop ('case' pose) back out to Studio Hero ('hero' pose)
  const triggerReturnToHero = useCallback(() => {
    if (busyRef.current) return;
    busyRef.current = true;

    const frame = frameRef.current;
    const stageEl = stageElRef.current;
    const cut = cutRef.current;
    const plate = plateRef.current;
    const casePlate = casePlateRef.current;
    const screen = screenRef.current;

    if (shouldReduceMotion || !frame || !stageEl || !casePlate || !screen) {
      placeFrame('hero');
      onStageChange('hero');
      busyRef.current = false;
      return;
    }

    frame.classList.remove('glide');
    placeFrame('case');
    stageEl.style.opacity = '1';
    screen.style.opacity = '1';

    requestAnimationFrame(() => {
      document.documentElement.style.setProperty('--glide', '0.85s');
      frame.classList.add('glide');
      placeFrame('hero');

      [cut, plate, casePlate, screen].forEach((el) => {
        el?.getAnimations().forEach((anim) => anim.cancel());
      });

      screen.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 300,
        easing: 'ease-out',
        fill: 'forwards',
      });

      casePlate.animate(
        [
          { opacity: 1, transform: 'scale(1)', filter: 'blur(0px)' },
          { opacity: 0, transform: 'scale(0.92)', filter: 'blur(10px)' },
        ],
        {
          duration: 680,
          easing: 'cubic-bezier(0.65, 0, 0.35, 1)',
          fill: 'forwards',
        }
      );

      plate?.animate(
        [
          {
            opacity: 0,
            transform: 'scale(1.12)',
            filter: 'brightness(0.93) contrast(1.02) blur(8px)',
          },
          {
            opacity: 1,
            transform: 'scale(1)',
            filter: 'brightness(0.93) contrast(1.02) blur(0px)',
          },
        ],
        {
          duration: 850,
          easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
          fill: 'forwards',
        }
      );

      cut?.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 680,
        delay: 140,
        easing: 'ease-out',
        fill: 'forwards',
      });

      setTimeout(() => {
        const defaultEase = 'cubic-bezier(0.2, 0.8, 0.2, 1)';

        [wmRef.current, mobileWmRef.current].forEach((wm) => {
          wm?.animate(
            [
              { opacity: 0, transform: 'translateY(40px)' },
              { opacity: 1, transform: 'translateY(0px)' },
            ],
            { duration: 700, easing: defaultEase, fill: 'forwards' }
          );
        });

        [scriptRef.current, mobileScriptRef.current].forEach((sc) => {
          const rot = 'rotate(-4deg)';
          sc?.animate(
            [
              { opacity: 0, transform: rot },
              { opacity: 1, transform: rot },
            ],
            {
              duration: 400,
              delay: 200,
              easing: defaultEase,
              fill: 'forwards',
            }
          );
        });

        if (badgeRef.current) {
          const anim = badgeRef.current.animate(
            [
              { opacity: 0, transform: 'translateY(-110%) rotate(6deg)' },
              {
                opacity: 1,
                transform: 'translateY(0%) rotate(-2deg)',
                offset: 0.7,
              },
              { opacity: 1, transform: 'translateY(0%) rotate(0deg)' },
            ],
            { duration: 1050, easing: defaultEase, fill: 'forwards' }
          );
          anim.onfinish = () => startBadgeSway();
        }
      }, 240);

      setTimeout(() => {
        frame.classList.remove('glide');
        screen.style.opacity = '0';
        onStageChange('hero');
        busyRef.current = false;
      }, 950);
    });
  }, [onStageChange, placeFrame, shouldReduceMotion, startBadgeSway]);

  useEffect(() => {
    if (stage === 'diving-out') {
      if (window.location.hash) {
        window.history.replaceState(
          { stage: 'hero' },
          '',
          window.location.pathname + window.location.search
        );
      }
      triggerReturnToHero();
    }
  }, [stage, triggerReturnToHero]);

  // Sync browser Back/Forward buttons (popstate) and initial URL hash, plus Escape key in laptop mode
  useEffect(() => {
    const parseHashTab = (hash: string): PortfolioTabId | null => {
      const clean = hash.replace(/^#/, '');
      if (
        clean === 'about' ||
        clean === 'projects' ||
        clean === 'services' ||
        clean === 'personal' ||
        clean === 'contact'
      ) {
        return clean;
      }
      return null;
    };

    const initialTab = parseHashTab(window.location.hash);
    if (initialTab && stage === 'hero' && !busyRef.current) {
      triggerDiveIntoLaptop(initialTab);
    }

    const handlePopState = () => {
      const targetTab = parseHashTab(window.location.hash);
      if (!targetTab) {
        if (stage === 'body' && !busyRef.current) {
          onStageChange('diving-out');
        }
      } else {
        if (stage === 'hero' && !busyRef.current) {
          triggerDiveIntoLaptop(targetTab);
        } else if (stage === 'body') {
          selectAndResetTab(targetTab);
        }
      }
    };

    const handleBodyEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && stage === 'body' && !busyRef.current) {
        if (document.querySelector('[role="dialog"]')) return;
        e.preventDefault();
        onStageChange('diving-out');
      }
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('keydown', handleBodyEscape);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('keydown', handleBodyEscape);
    };
  }, [onStageChange, selectAndResetTab, stage, triggerDiveIntoLaptop]);

  useEffect(() => {
    if (stage !== 'hero') return;

    const handleWheel = (e: WheelEvent) => {
      if (busyRef.current) {
        e.preventDefault();
        return;
      }
      if (e.deltaY >= 18) {
        e.preventDefault();
        triggerDiveIntoLaptop();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (busyRef.current) return;
      if (
        e.key === 'ArrowDown' ||
        e.key === 'PageDown' ||
        e.key === ' '
      ) {
        e.preventDefault();
        triggerDiveIntoLaptop();
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        touchStartYRef.current = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (touchStartYRef.current === null || busyRef.current) return;
      const deltaY = touchStartYRef.current - e.touches[0].clientY;
      if (deltaY >= 40) {
        touchStartYRef.current = null;
        triggerDiveIntoLaptop();
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [stage, triggerDiveIntoLaptop]);

  const handleScreenWheel = useCallback(
    (e: React.WheelEvent<HTMLDivElement>) => {
      if (stage !== 'body' || busyRef.current) return;
      const scrollEl = screenScrollRef.current;
      if (!scrollEl) return;
      if (scrollEl.scrollTop <= 2 && e.deltaY < -35) {
        onStageChange('diving-out');
      }
    },
    [onStageChange, stage]
  );

  const handleScreenClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;
      const hash = anchor.getAttribute('href');
      if (!hash || hash.length <= 1) return;
      const rawId = hash.slice(1);
      if (
        rawId === 'about' ||
        rawId === 'services' ||
        rawId === 'projects' ||
        rawId === 'personal' ||
        rawId === 'contact'
      ) {
        e.preventDefault();
        selectAndResetTab(rawId);
      }
    },
    [selectAndResetTab]
  );

  const handleTabKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
      let nextIndex: number | null = null;
      if (e.key === 'ArrowRight') {
        nextIndex = (currentIndex + 1) % BROWSER_TABS.length;
      } else if (e.key === 'ArrowLeft') {
        nextIndex =
          (currentIndex - 1 + BROWSER_TABS.length) % BROWSER_TABS.length;
      } else if (e.key === 'Home') {
        nextIndex = 0;
      } else if (e.key === 'End') {
        nextIndex = BROWSER_TABS.length - 1;
      }
      if (nextIndex !== null) {
        e.preventDefault();
        const nextTab = BROWSER_TABS[nextIndex];
        selectAndResetTab(nextTab.id);
        tabRefs.current[nextTab.id]?.focus();
      }
    },
    [selectAndResetTab]
  );

  const renderBadgeCardContent = (isMobileCopy = false) => (
    <>
      <img
        src={BADGE_URL}
        alt="Lanyard ID Badge"
        className="hd-badge-img"
        draggable={false}
      />
      <div className="hd-card">
        <h4>
          DEVELOPER
          <br />
          CARD
        </h4>
        <span className="yr">2026</span>
        <div className="role">DAM DEVELOPER // CYBERSECURITY</div>
        <div
          className="ph"
          style={{
            backgroundImage: `url('${JOSE_ID_PHOTO}')`,
            backgroundSize: '210%',
            backgroundPosition: '50% 32%',
          }}
        />
        <div className="row">
          <span>NAME</span>
          <b>JOSÉ MÁRQUEZ</b>
        </div>
        <div className="row">
          <span>FOCUS</span>
          <b>DAM &amp; CYBERSEC</b>
        </div>
        <div className="row">
          <span>LOC</span>
          <b>RONDA, MÁLAGA</b>
        </div>
        <div className="row">
          <span>EMAIL</span>
          <b style={{ fontSize: '8.5px', letterSpacing: '-0.03em' }}>
            marquezgonzalezjose620@gmail.com
          </b>
        </div>
      </div>
      <button
        type="button"
        tabIndex={isMobileCopy || stage !== 'hero' ? -1 : 0}
        aria-label="Abrir perfil Sobre mí de José Márquez"
        className="hd-badge-hit"
        onPointerEnter={handleBadgeHover}
        onClick={() => triggerDiveIntoLaptop('about')}
        title="Haz clic para ver Sobre mí"
      />
    </>
  );

  return (
    <>
      {/* Fixed Studio Stage (Hero & Open Laptop Interactive View) */}
      <div ref={stageElRef} className="hd-stage">
        {/* 1440x810 Photographic Scene Frame */}
        <div ref={frameRef} className="hd-frame d-fade">
          {/* Layer 1: Studio Background Plate */}
          <img
            ref={plateRef}
            src={plateSrc}
            onError={() => {
              if (plateSrc !== FALLBACK_PLATE_URL) {
                setPlateSrc(FALLBACK_PLATE_URL);
              }
            }}
            alt="José Márquez en el estudio"
            {...({ fetchpriority: 'high' } as React.ImgHTMLAttributes<HTMLImageElement>)}
            className="hd-plate hd-masked"
            draggable={false}
          />

          {/* Layer 2 (z=3): Giant Wordmark "MÁRQUEZ" behind head */}
          <svg
            ref={wmRef}
            className="hd-wm"
            viewBox="0 0 1440 260"
            preserveAspectRatio="none"
            aria-label="MÁRQUEZ"
          >
            <defs>
              <linearGradient id="hdWmGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="50%" stopColor="#f1f5f3" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#d7e6de" stopOpacity="0.28" />
              </linearGradient>
            </defs>
            <text
              x="14"
              y="214"
              textLength="1412"
              lengthAdjust="spacingAndGlyphs"
              fill="url(#hdWmGrad)"
              fontFamily="'Inter Tight', sans-serif"
              fontWeight="900"
              fontSize="258"
              letterSpacing="-6"
            >
              MÁRQUEZ
            </text>
          </svg>

          {/* Layer 3 (z=4): Foreground Cutout of José overlapping the wordmark */}
          <img
            ref={cutRef}
            src={cutSrc}
            onError={() => {
              if (cutSrc !== FALLBACK_CUT_URL) {
                setCutSrc(FALLBACK_CUT_URL);
              }
            }}
            alt=""
            aria-hidden="true"
            className="hd-cut"
            draggable={false}
          />

          {/* Clickable Laptop Hotspot in Hero Mode */}
          {stage === 'hero' && (
            <button
              type="button"
              onClick={() => triggerDiveIntoLaptop('about')}
              aria-label="Entrar al portátil"
              title="Haz clic para abrir el portátil"
              className="hd-laptop-hit"
            />
          )}

          {/* Layer 4 (z=5): Hanging Lanyard ID Badge */}
          <div ref={badgeRef} className="hd-badge">
            {renderBadgeCardContent()}
          </div>

          {/* Layer 5 (z=6): Typewriter Code Tagline */}
          <div ref={scriptRef} className="hd-script">
            <span className="hd-code-prompt">&gt; </span>
            {CODE_LINE.slice(0, typedLen)}
            <span className="hd-code-cursor" aria-hidden="true">
              _
            </span>
          </div>

          {/* Layer 6 (z=7): Straight-on Laptop Case Plate */}
          <img
            ref={casePlateRef}
            src={CASE_PLATE_URL}
            alt=""
            aria-hidden="true"
            className="hd-caseplate hd-masked"
            draggable={false}
          />

          {/* Layer 7 (z=8): Laptop Display Screen hosting the Cyber-Terminal IDE & Tabs */}
          <div
            ref={screenRef}
            className={`hd-screen ${stage === 'body' ? 'hd-screen-active' : ''}`}
          >
            <div ref={flashRef} className="hd-flash" />

            {/* Unified Cyber-Browser Topbar + Clear Section Tabs */}
            <div className="hd-browser-chrome select-none">
              <div className="hd-browser-tabbar">
                <button
                  type="button"
                  onClick={() => onStageChange('diving-out')}
                  aria-label="Volver a la portada de José Márquez"
                  className="hd-mobile-back"
                >
                  <ArrowLeft className="w-3.5 h-3.5 text-[#4af699]" aria-hidden="true" />
                  <span>José Márquez</span>
                </button>

                <div
                  className="hd-traffic-lights"
                  role="group"
                  aria-label="Controles de ventana"
                >
                  <button
                    type="button"
                    onClick={() => onStageChange('diving-out')}
                    aria-label="Cerrar ventana y volver al estudio"
                    title="Volver a la vista del estudio"
                    className="hd-tl hd-tl-red"
                  >
                    <span>×</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onStageChange('diving-out')}
                    aria-label="Minimizar ventana al estudio"
                    title="Minimizar ventana al estudio"
                    className="hd-tl hd-tl-yellow"
                  >
                    <span>−</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => selectAndResetTab(activeTab)}
                    aria-label="Recargar sección"
                    title="Recargar sección"
                    className="hd-tl hd-tl-green"
                  >
                    <span>+</span>
                  </button>
                </div>

                {/* Clear Section Navigation Tabs (WAI-ARIA Tablist) */}
                <div
                  className="hd-tabs-list"
                  role="tablist"
                  aria-label="Secciones del portafolio"
                >
                  {BROWSER_TABS.map(({ id, label, Icon }, idx) => {
                    const isActive = activeTab === id;
                    return (
                      <button
                        key={id}
                        ref={(el) => {
                          tabRefs.current[id] = el;
                        }}
                        id={`tab-${id}`}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        aria-controls={`panel-${id}`}
                        tabIndex={isActive ? 0 : -1}
                        onClick={() => selectAndResetTab(id)}
                        onKeyDown={(e) => handleTabKeyDown(e, idx)}
                        className={`hd-browser-tab ${
                          isActive ? 'hd-browser-tab-active' : ''
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        <span>{label}</span>
                        <span className="hd-tab-dot" aria-hidden="true" />
                      </button>
                    );
                  })}
                </div>

                <div className="cp-badge-live">
                  {currentHud.badge}
                </div>
              </div>
            </div>

            <ScrollContainerContext.Provider value={screenScrollRef}>
              <div
                ref={screenScrollRef}
                className="hd-screen-scroll"
                onWheel={handleScreenWheel}
                onClick={handleScreenClick}
              >
                <div className="hd-screen-content">{children}</div>
              </div>
            </ScrollContainerContext.Provider>
          </div>
        </div>
      </div>

      {/* Viewport-Pinned UI (.hd-ui) */}
      <div className={`hd-ui ${stage !== 'hero' ? 'hd-ui-body' : ''}`}>
        {/* Back to Studio Circular Button (visible when inside the laptop view) */}
        {stage === 'body' && (
          <button
            type="button"
            onClick={() => onStageChange('diving-out')}
            aria-label="Volver al estudio"
            title="Volver a la vista del estudio"
            className="hd-back-btn"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}

        {/* 4 Top Navigation Tags */}
        <button
          ref={tag1Ref}
          type="button"
          className="hd-tag t1"
          onClick={() => triggerDiveIntoLaptop('about')}
        >
          sobre mí
        </button>
        <button
          ref={tag2Ref}
          type="button"
          className="hd-tag t2"
          onClick={() => triggerDiveIntoLaptop('projects')}
        >
          experiencia
        </button>
        <button
          ref={tag3Ref}
          type="button"
          className="hd-tag t3"
          onClick={() => triggerDiveIntoLaptop('personal')}
        >
          proyectos
        </button>
        <button
          ref={tag4Ref}
          type="button"
          className="hd-tag t4"
          onClick={() => triggerDiveIntoLaptop('contact')}
        >
          contactar
        </button>

        {/* Exterior Case HUD (Perforated Ticket, Left Desc, Prev/Next Experience Buttons) when in Laptop Mode */}
        {stage === 'body' && (
          <>
            {/* Perforated Ticket (Top Right) */}
            <aside
              ref={ticketRef}
              className="hd-ticket"
              aria-live="polite"
            >
              <span className="hole tl" />
              <span className="hole tr" />
              <span className="hole bl" />
              <span className="hole br" />
              <h2>{currentHud.title}</h2>
              <div className="rows">
                {currentHud.rows.map((r, i) => (
                  <div key={i}>{r}</div>
                ))}
              </div>
            </aside>

            {/* Left Summary Description */}
            <aside ref={descRef} className="hd-desc" aria-live="polite">
              <div className="k">{currentHud.key}</div>
              <p>{currentHud.text}</p>
              <div className="num">{currentHud.num}</div>
            </aside>

            {/* Prev / Next Experience or Personal Project Circular Buttons (only on Experiencia & Proyectos tabs) */}
            {(activeTab === 'projects' || activeTab === 'personal') && (
              <>
                <button
                  type="button"
                  onClick={() => handleSelectCase(-1)}
                  aria-label={
                    activeTab === 'personal'
                      ? 'Anterior proyecto'
                      : 'Anterior experiencia'
                  }
                  className={`hd-nav-case prev ${
                    (activeTab === 'projects' && activeCaseIndex === 0) ||
                    (activeTab === 'personal' && activePersonalIndex === 0)
                      ? 'dim'
                      : ''
                  }`}
                >
                  <span className="c">
                    <svg viewBox="0 0 24 24">
                      <path d="M19 12H5M11 6l-6 6 6 6" />
                    </svg>
                  </span>
                  <span className="lbl">
                    anterior <br />
                    {activeTab === 'personal' ? 'proyecto' : 'experiencia'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSelectCase(1)}
                  aria-label={
                    activeTab === 'personal'
                      ? 'Siguiente proyecto'
                      : 'Siguiente experiencia'
                  }
                  className="hd-nav-case next"
                >
                  <span className="c">
                    <svg viewBox="0 0 24 24">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                  <span className="lbl">
                    siguiente <br />
                    {activeTab === 'personal' ? 'proyecto' : 'experiencia'}
                  </span>
                </button>
              </>
            )}
          </>
        )}

        {/* Mobile-only Wordmark and Script copies (<= 820px) in Hero mode */}
        {(stage === 'hero' || stage === 'diving-out') && (
          <div className="hidden max-[820px]:block">
            <svg
              ref={mobileWmRef}
              viewBox="0 0 1440 240"
              preserveAspectRatio="none"
              className="fixed left-[3vw] w-[94vw] pointer-events-none"
              style={{ top: 'calc(10px + 54 * var(--n))', height: '18.5vw' }}
              aria-label="MÁRQUEZ"
            >
              <defs>
                <linearGradient id="hdWmGradMobile" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                  <stop offset="55%" stopColor="#f1f5f3" stopOpacity="0.92" />
                  <stop offset="100%" stopColor="#4af699" stopOpacity="0.38" />
                </linearGradient>
              </defs>
              <text
                x="10"
                y="210"
                textLength="1420"
                lengthAdjust="spacingAndGlyphs"
                fill="url(#hdWmGradMobile)"
                fontFamily="'Inter Tight', sans-serif"
                fontWeight="900"
                fontSize="250"
                letterSpacing="-6"
              >
                MÁRQUEZ
              </text>
            </svg>

            <div
              ref={mobileScriptRef}
              className="fixed right-[6vw] font-['JetBrains_Mono'] font-extrabold text-white pointer-events-none whitespace-nowrap"
              style={{
                top: 'calc(10px + 54 * var(--n) + 17vw)',
                fontSize: '5.2vw',
                transform: 'rotate(-4deg)',
                textShadow:
                  '0 3px 14px rgba(0,0,0,0.65), 0 0 18px rgba(74,246,153,0.3)',
              }}
            >
              <span className="text-[#4af699]">&gt; </span>
              {CODE_LINE.slice(0, typedLen)}
              <span className="hd-code-cursor" aria-hidden="true">
                _
              </span>
            </div>
          </div>
        )}

        {/* Bottom Scroll Hint */}
        {stage === 'hero' && (
          <button
            ref={hintRef}
            type="button"
            onClick={() => triggerDiveIntoLaptop('about')}
            className="hd-hint"
          >
            <span className="hd-hint-line">
              <span className="hd-hint-bead" />
            </span>
            <span>scroll para iniciar_sesión</span>
          </button>
        )}
      </div>
    </>
  );
};
