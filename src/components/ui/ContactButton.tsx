import React from 'react';

export interface ContactButtonProps {
  href?: string;
  label?: string;
  className?: string;
}

export const ContactButton: React.FC<ContactButtonProps> = ({
  href = 'mailto:marquezgonzalezjose620@gmail.com',
  label = 'Contactar',
  className = '',
}) => {
  return (
    <a
      href={href}
      className={`pressable contact-btn-hover inline-flex items-center justify-center rounded-full text-white font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 text-xs sm:text-sm select-none whitespace-nowrap ${className}`}
      style={{
        background:
          'linear-gradient(125deg, #06281C 6%, #0D6E4E 42%, #10B981 78%, #047857 100%)',
        boxShadow:
          '0px 4px 16px rgba(16, 185, 129, 0.28), 0px 0px 12px rgba(52, 211, 153, 0.35) inset',
        outline: '1.5px solid rgba(167, 243, 208, 0.85)',
        outlineOffset: '-3px',
      }}
    >
      {label}
    </a>
  );
};
