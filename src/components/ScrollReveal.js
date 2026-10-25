'use client';
import { motion, useReducedMotion } from 'framer-motion';

export default function ScrollReveal({ children, delay = 0, direction = 'up', distance = 24, duration = 0.5, className = '', once = true }) {
  const reduce = useReducedMotion();
  const offset = {
    up: { y: distance, x: 0 }, down: { y: -distance, x: 0 },
    left: { x: distance, y: 0 }, right: { x: -distance, y: 0 }, none: { x: 0, y: 0 },
  }[direction];
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: '-60px' }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
