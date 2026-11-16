import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

export interface MagnetProps {
  children: React.ReactNode;
  padding?: number;
  strength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  disabled?: boolean;
  className?: string;
}

export const Magnet: React.FC<MagnetProps> = ({
  children,
  padding = 150,
  strength = 3,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.6s ease-in-out',
  disabled = false,
  className = '',
}) => {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const isActiveRef = useRef(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (disabled || shouldReduceMotion) {
      if (innerRef.current) {
        innerRef.current.style.transform = 'translate3d(0px, 0px, 0px)';
      }
      return;
    }

    // Gate magnetic tracking to fine pointer devices (mouse/trackpad)
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!mediaQuery.matches) return;

    let rafId: number | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      if (rafId !== null) cancelAnimationFrame(rafId);

      rafId = requestAnimationFrame(() => {
        const outer = outerRef.current;
        const inner = innerRef.current;
        if (!outer || !inner) return;

        const rect = outer.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distX = Math.abs(centerX - e.clientX);
        const distY = Math.abs(centerY - e.clientY);

        if (
          distX < rect.width / 2 + padding &&
          distY < rect.height / 2 + padding
        ) {
          const offsetX = (e.clientX - centerX) / strength;
          const offsetY = (e.clientY - centerY) / strength;

          if (!isActiveRef.current) {
            isActiveRef.current = true;
            inner.style.transition = activeTransition;
          }
          inner.style.transform = `translate3d(${offsetX.toFixed(2)}px, ${offsetY.toFixed(2)}px, 0px)`;
        } else if (isActiveRef.current) {
          isActiveRef.current = false;
          inner.style.transition = inactiveTransition;
          inner.style.transform = 'translate3d(0px, 0px, 0px)';
        }
      });
    };

    const handleMouseLeaveWindow = () => {
      const inner = innerRef.current;
      if (!inner || !isActiveRef.current) return;
      isActiveRef.current = false;
      inner.style.transition = inactiveTransition;
      inner.style.transform = 'translate3d(0px, 0px, 0px)';
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeaveWindow);

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);
    };
  }, [padding, strength, activeTransition, inactiveTransition, disabled, shouldReduceMotion]);

  return (
    <div ref={outerRef} className={`relative inline-block ${className}`}>
      <div
        ref={innerRef}
        style={{
          transform: 'translate3d(0px, 0px, 0px)',
          transition: inactiveTransition,
          willChange: 'transform',
        }}
      >
        {children}
      </div>
    </div>
  );
};
