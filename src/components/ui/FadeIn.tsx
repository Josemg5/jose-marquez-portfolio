import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useScrollContainer } from '../../context/ScrollContainerContext';

type AllowedTag =
  | 'div'
  | 'nav'
  | 'header'
  | 'section'
  | 'article'
  | 'footer'
  | 'p'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'span';

// Cache motion.create() instances so component references remain stable across renders
const motionComponentCache = new Map<AllowedTag, React.ComponentType<any>>();

function getMotionComponent(tag: AllowedTag) {
  let cached = motionComponentCache.get(tag);
  if (!cached) {
    cached = motion.create(tag);
    motionComponentCache.set(tag, cached);
  }
  return cached;
}

export interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  className?: string;
  style?: React.CSSProperties;
  as?: AllowedTag;
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  className,
  style,
  as = 'div',
}) => {
  const shouldReduceMotion = useReducedMotion();
  const scrollContainerRef = useScrollContainer();
  const MotionTag = getMotionComponent(as);

  const initialX = shouldReduceMotion ? 0 : x;
  const initialY = shouldReduceMotion ? 0 : y;

  return (
    <MotionTag
      initial={{ opacity: 0, x: initialX, y: initialY }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{
        root: scrollContainerRef ?? undefined,
        once: true,
        margin: '50px',
        amount: 0,
      }}
      transition={{
        duration: shouldReduceMotion ? 0.25 : duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
      style={style}
    >
      {children}
    </MotionTag>
  );
};
