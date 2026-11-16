import React from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  ArrowUpRight,
  Download,
} from 'lucide-react';
import { CONTACT_INFO, NAV_LINKS } from '../../data/portfolioData';

export const FooterSection: React.FC = () => {
  return (
    <section
      id="contact"
      className="w-full min-h-[558px] bg-[#061811] text-[#e6f9ef] p-5 flex flex-col justify-between gap-5 font-sans"
    >
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#4af699]/15 pb-4">
        <div>
          <span className="font-mono text-[11px] uppercase tracking-wider text-[#4af699] font-bold">
            Disponible para incorporación
          </span>
          <h2 className="text-2xl font-extrabold tracking-tight text-white mt-0.5">
            Hablemos sobre tu proyecto o equipo
          </h2>
          <p className="text-[13.5px] text-[#c6f3dc] mt-1 max-w-xl">
            Perfil técnico polivalente en desarrollo multiplataforma DAM, bases
            de datos SQL, soporte IT internacional y ciberseguridad.
          </p>
        </div>

        <div className="shrink-0 flex flex-wrap items-center gap-2">
          <a
            href={CONTACT_INFO.cvUrl}
            download={CONTACT_INFO.cvFilename}
            className="inline-flex items-center gap-2 rounded-[5px] border border-[#4af699]/50 bg-[#0a291d] px-3.5 py-2.5 text-xs font-bold text-[#4af699] hover:bg-[#4af699] hover:text-[#05130e] transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Descargar CV</span>
          </a>

          <a
            href={CONTACT_INFO.emailComposeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-[5px] bg-[#4af699] px-4 py-2.5 text-xs font-bold text-[#05130e] hover:brightness-110 transition-all"
          >
            <Mail className="w-4 h-4" />
            <span>Enviar correo</span>
          </a>
        </div>
      </div>

      {/* Middle: Clean 2x3 Contact Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 my-auto">
        <a
          href={CONTACT_INFO.emailComposeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3.5 rounded-[6px] border border-[#4af699]/20 bg-[#04120c] hover:border-[#4af699]/60 transition-colors flex flex-col justify-between gap-1.5"
        >
          <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[#9de8c2]">
            <Mail className="w-3.5 h-3.5 text-[#4af699]" /> CORREO
          </span>
          <span className="text-xs font-bold text-white break-all inline-flex items-center justify-between gap-1">
            {CONTACT_INFO.email}
            <ArrowUpRight className="w-3.5 h-3.5 text-[#4af699] shrink-0" />
          </span>
        </a>

        <a
          href={CONTACT_INFO.phoneHref}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3.5 rounded-[6px] border border-[#4af699]/20 bg-[#04120c] hover:border-[#4af699]/60 transition-colors flex flex-col justify-between gap-1.5"
        >
          <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[#9de8c2]">
            <Phone className="w-3.5 h-3.5 text-[#4af699]" /> TELÉFONO · WHATSAPP
          </span>
          <span className="text-sm font-bold text-white inline-flex items-center justify-between gap-1">
            {CONTACT_INFO.phone}
            <ArrowUpRight className="w-3.5 h-3.5 text-[#4af699] shrink-0" />
          </span>
        </a>

        <div className="p-3.5 rounded-[6px] border border-[#4af699]/20 bg-[#04120c] flex flex-col justify-between gap-1.5">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[#9de8c2]">
            <MapPin className="w-3.5 h-3.5 text-[#4af699]" /> UBICACIÓN
          </span>
          <span className="text-sm font-bold text-white">
            {CONTACT_INFO.location}
          </span>
        </div>

        <a
          href={CONTACT_INFO.linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3.5 rounded-[6px] border border-[#4af699]/20 bg-[#04120c] hover:border-[#4af699]/60 transition-colors flex flex-col justify-between gap-1.5"
        >
          <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[#9de8c2]">
            <Linkedin className="w-3.5 h-3.5 text-[#4af699]" /> LINKEDIN
          </span>
          <span className="text-sm font-bold text-white inline-flex items-center justify-between gap-1">
            José Márquez González
            <ArrowUpRight className="w-3.5 h-3.5 text-[#4af699] shrink-0" />
          </span>
        </a>

        <a
          href={CONTACT_INFO.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3.5 rounded-[6px] border border-[#4af699]/20 bg-[#04120c] hover:border-[#4af699]/60 transition-colors flex flex-col justify-between gap-1.5"
        >
          <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[#9de8c2]">
            <Github className="w-3.5 h-3.5 text-[#4af699]" /> GITHUB
          </span>
          <span className="text-sm font-bold text-white inline-flex items-center justify-between gap-1">
            {CONTACT_INFO.githubLabel}
            <ArrowUpRight className="w-3.5 h-3.5 text-[#4af699] shrink-0" />
          </span>
        </a>

        <div className="p-3.5 rounded-[6px] border border-[#4af699]/20 bg-[#04120c] flex flex-col justify-between gap-1.5">
          <span className="text-[11px] font-mono text-[#9de8c2]">
            DISPONIBILIDAD
          </span>
          <span className="text-sm font-bold text-[#4af699]">
            Carnet B · Inmediata
          </span>
        </div>
      </div>

      {/* Bottom Footer Nav */}
      <div className="pt-3 border-t border-[#4af699]/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-[#9de8c2]">
        <div>
          &copy; {new Date().getFullYear()} {CONTACT_INFO.name} —{' '}
          {CONTACT_INFO.role}
        </div>
        <nav className="flex flex-wrap gap-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-[#4af699] transition-colors font-semibold"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </section>
  );
};
