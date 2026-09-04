import React from 'react';
import { motion } from 'motion/react';

interface RevealProps {
  children: React.ReactNode;
  /** Direction the element travels in from as it reveals. Default 'up'. */
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  /** Delay in seconds, useful for staggering siblings. */
  delay?: number;
  /** Distance in px the element travels. */
  distance?: number;
  /** Extra className passed to the wrapping motion.div. */
  className?: string;
  /** Fraction of the element that must be visible before it reveals (0-1). */
  amount?: number;
  /** Slight scale-in for a softer "pop" feel. Default true. */
  scale?: boolean;
  as?: 'div' | 'section';
}

/**
 * Scroll-driven reveal wrapper: fades + slides children in once they enter the
 * viewport. Respects prefers-reduced-motion automatically via `motion`'s
 * built-in handling, and only ever animates once (no jarring re-triggers on
 * scroll-up) so it stays calm on a transactional, content-dense page.
 */
export const Reveal: React.FC<RevealProps> = ({
  children,
  direction = 'up',
  delay = 0,
  distance,
  className,
  amount = 0.2,
  scale = true,
  as = 'div'
}) => {
  const d = distance ?? 28;
  const offset: { x?: number; y?: number } =
    direction === 'up' ? { y: d } :
    direction === 'down' ? { y: -d } :
    direction === 'left' ? { x: d } :
    direction === 'right' ? { x: -d } :
    {};

  const MotionTag = as === 'section' ? motion.section : motion.div;

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, ...offset, scale: scale ? 0.98 : 1 }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
};

interface RevealGroupProps {
  children: React.ReactNode[];
  /** Seconds between each child's reveal. Default 0.08. */
  stagger?: number;
  direction?: RevealProps['direction'];
  className?: string;
  itemClassName?: string;
  amount?: number;
}

/**
 * Convenience helper for staggering a list of siblings (e.g. a grid of
 * cards) without hand-writing a delay per item.
 */
export const RevealGroup: React.FC<RevealGroupProps> = ({
  children,
  stagger = 0.08,
  direction = 'up',
  className,
  itemClassName,
  amount = 0.2
}) => {
  return (
    <div className={className}>
      {React.Children.map(children, (child, i) => (
        <Reveal direction={direction} delay={i * stagger} className={itemClassName} amount={amount}>
          {child}
        </Reveal>
      ))}
    </div>
  );
};
