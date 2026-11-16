import React from 'react';

export interface LiveProjectButtonProps {
  label?: string;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export const LiveProjectButton: React.FC<LiveProjectButtonProps> = ({
  label = 'Ver Detalles',
  href,
  onClick,
  className = '',
}) => {
  const sharedClasses = `pressable ghost-btn-hover inline-flex items-center justify-center rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base select-none whitespace-nowrap cursor-pointer ${className}`;

  if (href && !onClick) {
    return (
      <a href={href} className={sharedClasses}>
        {label}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={sharedClasses}>
      {label}
    </button>
  );
};
