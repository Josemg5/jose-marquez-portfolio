import React, { useRef } from 'react';
import { motion, MotionValue, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useScrollContainer } from '../../context/ScrollContainerContext';

interface CharacterProps {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
}

const AnimatedChar: React.FC<CharacterProps> = ({ char, progress, range }) => {
  const opacity = useTransform(progress, range, [0.2, 1]);

  return (
    <span className="relative inline-block">
      <span className="opacity-20 select-none" aria-hidden="true">
        {char}
      </span>
      <motion.span style={{ opacity }} className="absolute inset-0">
        {char}
      </motion.span>
    </span>
  );
};

export interface AnimatedTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className = '',
  style,
}) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const scrollContainerRef = useScrollContainer();

  const { scrollYProgress } = useScroll({
    container: scrollContainerRef ?? undefined,
    target: containerRef,
    offset: ['start 0.95', 'start 0.42'],
  });

  if (shouldReduceMotion) {
    return (
      <p ref={containerRef} className={className} style={style}>
        {text}
      </p>
    );
  }

  const words = text.split(' ');
  const totalChars = text.length;
  let charCursor = 0;

  return (
    <p
      ref={containerRef}
      aria-label={text}
      className={`flex flex-wrap justify-center ${className}`}
      style={style}
    >
      {words.map((word, wordIdx) => {
        const chars = Array.from(word);
        const wordElement = (
          <span key={wordIdx} className="inline-flex whitespace-nowrap mr-[0.28em]">
            {chars.map((char, charIdx) => {
              const start = charCursor / totalChars;
              const end = Math.min(1, (charCursor + 1) / totalChars);
              charCursor += 1;
              return (
                <AnimatedChar
                  key={charIdx}
                  char={char}
                  progress={scrollYProgress}
                  range={[start, end]}
                />
              );
            })}
          </span>
        );
        // Account for space character in cursor calculation
        charCursor += 1;
        return wordElement;
      })}
    </p>
  );
};
