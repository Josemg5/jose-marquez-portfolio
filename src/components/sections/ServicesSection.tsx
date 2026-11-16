import React from 'react';
import { Cpu, Code2 } from 'lucide-react';
import { SERVICES_LIST } from '../../data/portfolioData';

export const ServicesSection: React.FC = () => {
  return (
    <section
      id="services"
      className="w-full min-h-[558px] bg-[#061811] text-[#e6f9ef] p-5 grid grid-cols-1 md:grid-cols-12 gap-5 font-sans"
    >
      {/* Left Column (7 cols): 5 Core Specialties clean list */}
      <div className="md:col-span-7 flex flex-col justify-between">
        <div>
          <h3 className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#4af699] font-bold mb-3.5">
            <Cpu className="w-4 h-4" />
            Especialidades &amp; Áreas de Trabajo
          </h3>

          <div className="space-y-3">
            {SERVICES_LIST.map((service) => (
              <div
                key={service.number}
                className="pb-2.5 border-b border-[#4af699]/12 last:border-b-0"
              >
                <div className="text-[14.5px] font-bold text-white flex items-center gap-2">
                  <span className="font-mono text-xs text-[#4af699]">
                    {service.number}
                  </span>
                  <span>{service.title}</span>
                </div>
                <p className="text-[13px] text-[#c6f3dc] leading-snug mt-1">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column (5 cols): Clean Technical Stack Groups */}
      <div className="md:col-span-5 rounded-[6px] border border-[#4af699]/20 bg-[#04120c] p-4 flex flex-col justify-between gap-4">
        <div className="space-y-4">
          <h3 className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#4af699] font-bold">
            <Code2 className="w-4 h-4" />
            Stack Técnico
          </h3>

          <div>
            <div className="text-[11px] font-semibold text-[#9de8c2] mb-1.5">
              Lenguajes de Programación
            </div>
            <div className="flex flex-wrap gap-1.5">
              {['Java', 'C#', 'C++', 'Python', 'SQL', 'TypeScript'].map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 rounded-[4px] bg-[#0a291d] border border-[#4af699]/25 text-[11px] font-medium text-[#e6f9ef]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div>
            <div className="text-[11px] font-semibold text-[#9de8c2] mb-1.5">
              Bases de Datos &amp; Entornos
            </div>
            <div className="flex flex-wrap gap-1.5">
              {['MySQL', 'SQLite', 'JavaFX', '.NET', 'React', 'Git / GitHub'].map(
                (t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-[4px] bg-[#0a291d] border border-[#4af699]/25 text-[11px] font-medium text-[#e6f9ef]"
                  >
                    {t}
                  </span>
                )
              )}
            </div>
          </div>

          <div>
            <div className="text-[11px] font-semibold text-[#9de8c2] mb-1.5">
              Ciberseguridad &amp; Redes TI
            </div>
            <div className="flex flex-wrap gap-1.5">
              {[
                'Kali Linux',
                'Nmap',
                'Wireshark',
                'Burp Suite',
                'SIEM',
                'Firewalls',
                'Active Directory',
              ].map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 rounded-[4px] bg-[#0a291d] border border-[#4af699]/25 text-[11px] font-medium text-[#e6f9ef]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-[#4af699]/15 grid grid-cols-2 gap-2 text-xs">
          <div>
            <span className="text-[10px] text-[#9de8c2] block">DESARROLLO</span>
            <strong className="text-white">Desktop &amp; Web</strong>
          </div>
          <div>
            <span className="text-[10px] text-[#9de8c2] block">SEGURIDAD</span>
            <strong className="text-[#4af699]">Auditoría &amp; Defensa</strong>
          </div>
        </div>
      </div>
    </section>
  );
};
