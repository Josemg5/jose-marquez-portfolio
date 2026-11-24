export interface NavItem {
  label: string;
  href: string;
}

export interface ServiceItem {
  number: string;
  title: string;
  description: string;
}

export interface ProjectCardData {
  id: string;
  number: string;
  categoryDate: string;
  title: string;
  company: string;
  role: string;
  location: string;
  subtitle: string;
  highlights: string[];
  stack: string[];
  images: {
    col1Top: string;
    col1Bottom: string;
    col2Tall: string;
  };
}

export interface PersonalProjectData {
  id: string;
  number: string;
  name: string;
  type: string;
  category: string;
  status: string;
  url: string;
  urlLabel: string;
  image: string;
  subtitle: string;
  highlights: string[];
  stack: string[];
  metrics: {
    label: string;
    value: string;
  }[];
}

export const NAV_LINKS: NavItem[] = [
  { label: 'Sobre mí', href: '#about' },
  { label: 'Experiencia', href: '#projects' },
  { label: 'Especialidades', href: '#services' },
  { label: 'Proyectos', href: '#personal' },
  { label: 'Contacto', href: '#contact' },
];

export const HERO_PORTRAIT_FALLBACK = '/tu-foto.png';

export const MARQUEE_GIFS: string[] = [];

export const ABOUT_PARAGRAPH =
  'Técnico en Desarrollo de Aplicaciones Multiplataforma (DAM) y en Sistemas Microinformáticos y Redes (SMR), actualmente especializándome en Ciberseguridad en Entornos TI en el IES Fuente Grande. Combino el desarrollo de software a medida con experiencia real en administración de redes, soporte técnico internacional en Bélgica y seguridad ofensiva/defensiva.';

export const ABOUT_BADGES: string[] = [
  'Especialización Ciberseguridad TI (IES Fuente Grande)',
  'Grado Superior DAM (2023-2026)',
  'Grado Medio SMR (2021-2023)',
  'Inglés B1/B2 (Swan Training Institute)',
  'Ronda, Málaga',
];

export const SERVICES_LIST: ServiceItem[] = [
  {
    number: '01',
    title: 'Desarrollo Multiplataforma',
    description:
      'Creación de aplicaciones de escritorio y sistemas internos a medida con Java, JavaFX, C#, C++ y Python, aplicando control de versiones con Git e integración de IA.',
  },
  {
    number: '02',
    title: 'Ciberseguridad & Auditoría TI',
    description:
      'Prácticas y especialización con Kali Linux, Nmap, Wireshark, Burp Suite, SIEM, firewalls, Linux y Active Directory para análisis de vulnerabilidades y defensa de infraestructuras.',
  },
  {
    number: '03',
    title: 'Redes & Soporte Internacional',
    description:
      'Resolución de incidencias IT a usuarios y departamentos, diagnóstico de problemas de red y mantenimiento de infraestructuras tras experiencia internacional en Bélgica.',
  },
  {
    number: '04',
    title: 'Bases de Datos Relacionales',
    description:
      'Diseño, modelado y optimización de consultas en SQL, MySQL y SQLite para garantizar la trazabilidad e integridad de datos en entornos operativos.',
  },
  {
    number: '05',
    title: 'Hardware & Optimización PC',
    description:
      'Diagnóstico, montaje, limpieza técnica y mejora de rendimiento en equipos microinformáticos, unido a un trato cercano y resolutivo orientado al usuario final.',
  },
];

export const PROJECTS_LIST: ProjectCardData[] = [
  {
    id: 'circuito-ascari',
    number: '01',
    categoryDate: 'Marzo a Mayo 2026 | Ronda',
    title: 'Circuito Ascari: Programador Informático',
    company: 'Circuito Ascari',
    role: 'Programador Informático',
    location: 'Ronda, Málaga',
    subtitle:
      'Creación de una aplicación con Microsoft Power Apps y las aplicaciones de Microsoft 365 para la gestión de incidencias en pista: registro de personal presente, tiempos de respuesta, materiales empleados y trazabilidad ante accidentes.',
    highlights: [
      'Diseño y desarrollo de una aplicación interna con Microsoft Power Apps integrada con el ecosistema de aplicaciones de Microsoft para la gestión de incidencias en pista.',
      'Registro detallado del personal presente cada jornada, descripción de sucesos, tiempos de respuesta y materiales utilizados.',
      'Sistema preparado y conectado con las herramientas de Microsoft para documentar y auditar cada incidencia en caso de accidente en el circuito.',
    ],
    stack: [
      'Microsoft Power Apps',
      'Microsoft 365',
      'Power Platform',
      'SQL / MySQL',
      'Gestión de Incidencias',
      'Trazabilidad',
    ],
    images: {
      col1Top: '/exp/ascari-1.png',
      col1Bottom: '/exp/ascari-2.jpg',
      col2Tall: '/exp/ascari-3.jpg',
    },
  },
  {
    id: 'sapphire-house-antwerp',
    number: '02',
    categoryDate: 'Abril a Junio 2023 | Amberes, Bélgica',
    title: 'Sapphire House Antwerp: Técnico Soporte IT',
    company: 'Sapphire House Antwerp',
    role: 'Técnico Soporte IT (Prácticas Internacionales)',
    location: 'Amberes, Bélgica',
    subtitle:
      'Proyecto internacional de prácticas en el extranjero para perfeccionar el idioma y aplicar lo aprendido en soporte a equipos de usuarios y redes en habitaciones.',
    highlights: [
      'Soporte técnico directo a equipos de usuarios e incidencias informáticas de los distintos departamentos del hotel.',
      'Diagnóstico y resolución de problemas de conectividad y red en las habitaciones.',
      'Inmersión profesional internacional en Bélgica orientada a la práctica del inglés y estándares IT reales.',
    ],
    stack: ['Soporte IT', 'Redes y Wi-Fi', 'Incidencias Usuarios', 'Inglés B1/B2', 'Entorno Internacional'],
    images: {
      col1Top: '/exp/antwerp-1.jpg',
      col1Bottom: '/exp/antwerp-2.png',
      col2Tall: '/exp/antwerp-3.jpg',
    },
  },
  {
    id: 'clinica-pc-decathlon',
    number: '03',
    categoryDate: '2023 a 2026 | Ronda, Málaga',
    title: 'Clínica PC & Decathlon: Hardware y Atención al Cliente',
    company: 'Clínica PC & Decathlon',
    role: 'Técnico Hardware & Atención al Cliente',
    location: 'Ronda, Málaga',
    subtitle:
      'Reparación de hardware, limpieza, montaje y mejora de equipos en Clínica PC, complementado con atención directa y trato al cliente en Decathlon.',
    highlights: [
      'Reparación de hardware, limpieza técnica, montaje completo y optimización/mejora de equipos en Clínica PC.',
      'Diagnóstico de componentes y puesta a punto de ordenadores para máximo rendimiento y fiabilidad.',
      'Atención al cliente y trato cercano en Decathlon, reforzando la comunicación clara y resolución ágil de necesidades.',
    ],
    stack: ['Reparación Hardware', 'Montaje PC', 'Optimización', 'Atención al Cliente', 'Comunicación'],
    images: {
      col1Top: '/exp/clinica-1.jpg',
      col1Bottom: '/exp/clinica-2.jpg',
      col2Tall: '/exp/clinica-3.jpg',
    },
  },
];

export const PERSONAL_PROJECTS: PersonalProjectData[] = [
  {
    id: 'citame-saas',
    number: '01',
    name: 'Reserly',
    type: 'SaaS Multi-Tenant · Gestión de Citas para Peluquerías y Barberías',
    category: 'SAAS MULTI-TENANT',
    status: 'GITHUB // SAAS',
    url: 'https://github.com/Josemg5/reserly',
    urlLabel: 'Ver en GitHub',
    image: '/projects/reserly.png',
    subtitle:
      'Plataforma SaaS multi-inquilino para peluquerías y barberías con portal público de reservas por negocio, panel de administración, horarios por empleado y dashboard analítico de ingresos.',
    highlights: [
      'Arquitectura Multi-Tenant en Next.js 16 y Supabase con aislamiento de datos por negocio mediante Row Level Security y validación en Server Actions con Zod.',
      'Sincronización bidireccional de citas con Google Calendar API y envío automático de confirmaciones y recordatorios por correo con Resend.',
      'Panel de control con métricas de facturación mensual, empleado estrella, servicios más demandados con Recharts y gestión de turnos personalizados.',
    ],
    stack: [
      'Next.js 16',
      'React 19',
      'TypeScript 5',
      'Supabase PostgreSQL',
      'Tailwind CSS v4',
      'Google Calendar API',
      'Resend',
      'Zod & React Hook Form',
      'Recharts',
    ],
    metrics: [
      { label: 'ARQUITECTURA', value: 'Next.js 16 + Supabase' },
      { label: 'SINCRONIZACIÓN', value: 'Google Calendar & Resend' },
      { label: 'SEGURIDAD', value: 'Multi-Tenant RLS' },
    ],
  },
  {
    id: 'restaurante-chino',
    number: '02',
    name: 'Restaurante Chino HOLA · 您好酒楼',
    type: 'Carta Digital Interactiva Oficial · C/ Infantes 6, Ronda',
    category: 'SPA GASTRONÓMICA',
    status: 'ONLINE // NETLIFY',
    url: 'https://restaurantechinohola.netlify.app/',
    urlLabel: 'Ver web en vivo',
    image: '/projects/chino-hola.png',
    subtitle:
      'Carta digital interactiva oficial para el Restaurante Chino HOLA en Ronda, con las 12 categorías gastronómicas reales en acordeón, buscador instantáneo y filtrado de los 14 alérgenos.',
    highlights: [
      ' Buscador en tiempo real y sistema interactivo de filtrado por los 14 alérgenos oficiales con iconografía SVG propia, modal de detalle por plato y visor lightbox.',
      'Escenario Parallax multicapa acelerado por GPU con caligrafía tradicional (Ma Shan Zheng), motor propio de físicas y animaciones con GSAP 3 + ScrollTrigger.',
      'Capa de datos asíncrona (menu.json + fallback local) y cabeceras defensivas de ciberseguridad Content-Security-Policy (CSP) e integridad de subrecursos (SRI).',
    ],
    stack: [
      'JavaScript ES6+ Modular',
      'HTML5 & CSS3 Tokens',
      'GSAP 3 + ScrollTrigger',
      'Filtro 14 Alérgenos',
      'Motor Parallax GPU',
      'CSP & SRI Security',
      'Netlify',
    ],
    metrics: [
      { label: 'CARTA OFICIAL', value: '12 Categorías Reales' },
      { label: 'FILTRADO VIVO', value: '14 Alérgenos + Buscador' },
      { label: 'SEGURIDAD WEB', value: 'CSP + SRI Activo' },
    ],
  },
  {
    id: 'academia-flamenco',
    number: '03',
    name: 'Academia FlamenKos (Miguel Lorca)',
    type: 'Web Cinemática 3D & Danza Flamenca de Autor · C/ Molino 6, Ronda',
    category: 'WEB 3D & ESCUELA',
    status: 'GITHUB // ACADEMIA',
    url: 'https://github.com/Josemg5/academia-flamenkos',
    urlLabel: 'Ver en GitHub',
    image: '/projects/flamenkos.png?v=2',
    subtitle:
      'Experiencia web inmersiva para la Academia de Danza FlamenKos de Miguel Lorca en Ronda, con estética teatral en negro abisal y carmín, motor 3D WebGL, cartelera interactiva y contacto directo por WhatsApp.',
    highlights: [
      'Escena 3D en Three.js y React Three Fiber con 1.800 partículas de brasas en tiempo real y shader líquido GLSL personalizado con distorsión reactiva al cursor.',
      'Narrativa scrollytelling con GSAP 3, ScrollTrigger y Lenis: preloader teatral con apertura de telón, hero monumental con parallax y manifiesto animado palabra por palabra.',
      'Cartelera interactiva con filtros y visor de eventos en Ronda, acordeón de 6 disciplinas conectado al shader WebGL y modal de consultas conectado a WhatsApp.',
    ],
    stack: [
      'React 18',
      'TypeScript 5',
      'Three.js & R3F',
      'GLSL Shaders',
      'GSAP 3 + ScrollTrigger',
      'Framer Motion',
      'Lenis Smooth Scroll',
      'Tailwind CSS',
      'Vite',
    ],
    metrics: [
      { label: 'MOTOR 3D', value: 'Three.js + GLSL Shader' },
      { label: 'SCROLLYTELLING', value: 'GSAP 3 + Lenis' },
      { label: 'SEDE RONDA', value: 'C/ Molino 6 · Miguel Lorca' },
    ],
  },
];

export const CONTACT_INFO = {
  name: 'José Márquez González',
  role: 'DAM Developer & Cybersecurity TI',
  email: 'marquezgonzalezjose620@gmail.com',
  emailComposeUrl:
    'https://mail.google.com/mail/?view=cm&fs=1&to=marquezgonzalezjose620@gmail.com&su=Contacto%20desde%20tu%20Portfolio&body=Hola%20Jos%C3%A9%2C%20he%20visto%20tu%20portfolio%20y%20me%20gustar%C3%ADa%20hablar%20contigo.',
  phone: '+34 666 74 04 37',
  phoneHref:
    'https://wa.me/34666740437?text=Hola%20Jos%C3%A9%2C%20he%20visto%20tu%20portfolio%20y%20me%20gustar%C3%ADa%20hablar%20contigo.',
  location: 'Ronda, Málaga (España)',
  linkedinUrl: 'https://www.linkedin.com/in/jose-marquez-gonzalez',
  linkedinLabel: 'LinkedIn / José Márquez González',
  githubUrl: 'https://github.com/Josemg5',
  githubLabel: 'github.com/Josemg5',
  cvUrl: '/CV_Jose_Marquez_Gonzalez.pdf',
  cvFilename: 'CV_Jose_Marquez_Gonzalez.pdf',
};
