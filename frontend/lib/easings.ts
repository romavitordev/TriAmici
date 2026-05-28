export const easings = {
  enter: [0.16, 1, 0.3, 1],
  exit: [0.7, 0, 0.84, 0],
  hover: [0.34, 1.56, 0.64, 1],
  scroll: [0.25, 0.46, 0.45, 0.94],
  spring: { type: 'spring', stiffness: 300, damping: 20 },
  springHeavy: { type: 'spring', stiffness: 180, damping: 18 }
} as const
