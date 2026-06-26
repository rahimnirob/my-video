import React from 'react';
import { AbsoluteFill } from 'remotion';

/** Static vignette — darkens the frame edges per the global design contract. */
const Vignette: React.FC = () => (
  <AbsoluteFill
    style={{
      background:
        'radial-gradient(ellipse 75% 65% at 50% 50%, transparent 25%, rgba(7,9,13,0.65) 100%)',
      pointerEvents: 'none',
      zIndex: 998,
    }}
  />
);

export default Vignette;
