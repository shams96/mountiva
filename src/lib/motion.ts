import type { Transition } from 'framer-motion';

/**
 * Spring presets, phrased in Apple's damping/response terms and mapped to
 * Framer Motion's bounce/duration API.
 *
 * Everything here is critically damped (bounce 0): these surfaces appear from a
 * discrete tap, not from a flick or drag, so overshoot would read as wrong.
 * Reserve bounce for genuinely momentum-driven motion.
 */

/** Move / reposition — Apple: damping 1.0, response ~0.4. */
export const springMove: Transition = { type: 'spring', bounce: 0, duration: 0.4 };

/** Menu / sheet arriving from a tap — snappier, still no overshoot. */
export const springSheet: Transition = { type: 'spring', bounce: 0, duration: 0.32 };

/** Segmented-control indicator sliding between options. */
export const springPill: Transition = { type: 'spring', bounce: 0, duration: 0.34 };

/** Reduced-motion equivalent: a short cross-fade, no transform. */
export const crossFade: Transition = { duration: 0.16, ease: 'easeOut' };
