import React from 'react';
import { Github, Mail, GraduationCap, Award, MapPin } from 'lucide-react';
import {
  ABOUT_BADGES,
  ABOUT_PARAGRAPH,
  CONTACT_INFO,
} from '../../data/portfolioData';

export const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      className="w-full h-[558px] overflow-hidden bg-[#061811] text-[#e6f9ef] p-4 flex flex-col justify-between gap-3.5 font-sans"
    >
      {/* Top Profile Header */}
      <div className="border-b border-[#4af699]/15 pb-3 space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="text-xl font-extrabold tracking-tight text-white leading-tight">
              José Márquez González
            </h2>
            <p className="text-[13px] font-semibold text-[#4af699]">
              Desarrollador Multiplataforma (DAM) &amp; Especialista en Ciberseguridad TI
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 text-xs text-[#9de8c2]">
            <MapPin className="w-3.5 h-3.5 text-[#4af699]" />
            Ronda, Málaga · Disponibilidad inmediata
          </span>
        </div>

        <p className="text-[13px] leading-snug text-[#d9f4e6]">
          {ABOUT_PARAGRAPH}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {ABOUT_BADGES.map((badge) => (
            <span
              key={badge}
              className="px-2 py-0.5 rounded-[4px] bg-[#0a291d] border border-[#4af699]/25 text-[11px] font-medium text-[#b8f0d3]"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>

      {/* Main 2 Columns: Formación & Idiomas/Certificaciones */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 flex-1 min-h-0">
        {/* Left Column: Academic Timeline */}
        <div className="md:col-span-7 flex flex-col justify-center">
          <h3 className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#4af699] font-bold mb-2.5">
            <GraduationCap className="w-4 h-4" />
            Formación Académica Oficial
          </h3>

          <div className="space-y-3 border-l-2 border-[#4af699]/30 pl-3.5">
            <div>
              <div className="text-[13px] font-bold text-white leading-snug">
                Curso de Especialización en Ciberseguridad en Entornos TI
              </div>
              <div className="text-[12px] text-[#c6f3dc]">
                IES Fuente Grande · Especialización Oficial (Máster FP)
              </div>
              <div className="font-mono text-[10.5px] text-[#4af699]">
                Cursando actualmente
              </div>
            </div>

            <div>
              <div className="text-[13px] font-bold text-white leading-snug">
                Técnico Superior en Desarrollo de Aplicaciones Multiplataforma (DAM)
              </div>
              <div className="text-[12px] text-[#c6f3dc]">
                IES Fuente Grande · Ciclo Formativo de Grado Superior
              </div>
              <div className="font-mono text-[10.5px] text-[#9de8c2]">
                2023 – 2026
              </div>
            </div>

            <div>
              <div className="text-[13px] font-bold text-white leading-snug">
                Técnico en Sistemas Microinformáticos y Redes (SMR)
              </div>
              <div className="text-[12px] text-[#c6f3dc]">
                IES Fuente Grande · Ciclo Formativo de Grado Medio
              </div>
              <div className="font-mono text-[10.5px] text-[#9de8c2]">
                2021 – 2023
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Languages, Complementaria & Actions */}
        <div className="md:col-span-5 flex flex-col justify-between gap-3 rounded-[6px] border border-[#4af699]/20 bg-[#04120c] p-3.5">
          <div>
            <h3 className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#4af699] font-bold mb-2.5">
              <Award className="w-4 h-4" />
              Idiomas &amp; Acreditaciones
            </h3>

            <div className="space-y-2.5">
              <div>
                <div className="text-xs font-bold text-white">Idiomas</div>
                <div className="text-[11.5px] text-[#c6f3dc] leading-snug">
                  Español nativo · Inglés B1/B2 (Swan Training Institute y prácticas en Bélgica)
                </div>
              </div>

              <div>
                <div className="text-xs font-bold text-white">
                  Desarrollo con Inteligencia Artificial
                </div>
                <div className="text-[11.5px] text-[#c6f3dc] leading-snug">
                  Integración de asistentes y flujos IA en desarrollo de software
                </div>
              </div>

              <div>
                <div className="text-xs font-bold text-white">
                  Permisos y Licencias
                </div>
                <div className="text-[11.5px] text-[#c6f3dc] leading-snug">
                  Permiso de conducir B · Licencia Oficial RFESS Socorrismo
                </div>
              </div>
            </div>
          </div>

          <div className="pt-2.5 border-t border-[#4af699]/15 flex flex-wrap items-center gap-2">
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 rounded-[5px] bg-[#4af699] px-3 py-1.5 text-xs font-bold text-[#05130e] hover:brightness-110 transition-all"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Contactar</span>
            </a>
            <a
              href={CONTACT_INFO.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-[5px] border border-[#4af699]/35 bg-[#082218] px-3 py-1.5 text-xs font-semibold text-[#4af699] hover:border-[#4af699] transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub (Josemg5)</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
