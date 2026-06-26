import React from 'react';
import { AbsoluteFill } from 'remotion';

/**
 * Atmosphere — grain + vignette + subtle top fade. Always on (§4).
 * Ported from the frame demos' `.vig` + `.grain` layers (inline fractal-noise
 * SVG so no external asset is needed). Sits above all content.
 */

const GRAIN_TILE = 160; // px, matches the demo's 160×160 noise tile

const NOISE_URI =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export type AtmosphereProps = {
  /** Vignette strength at the edge (demo: 0.6). */
  vignette?: number;
  /** Grain opacity (§4: ~0.05; demo: 0.045). */
  grain?: number;
  /** Subtle top darken fade (§4 "subtle top fade"). */
  topFade?: boolean;
};

const Atmosphere: React.FC<AtmosphereProps> = ({
  vignette = 0.6,
  grain = 0.045,
  topFade = true,
}) => {
  return (
    <>
      {topFade && (
        <AbsoluteFill
          style={{
            background:
              'linear-gradient(180deg, rgba(0,0,0,0.4) 0%, transparent 13%)',
            zIndex: 39,
            pointerEvents: 'none',
          }}
        />
      )}
      {/* Vignette */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse 75% 65% at 50% 48%, transparent 30%, rgba(0,0,0,${vignette}) 100%)`,
          zIndex: 40,
          pointerEvents: 'none',
        }}
      />
      {/* Film grain */}
      <AbsoluteFill
        style={{
          backgroundImage: NOISE_URI,
          backgroundRepeat: 'repeat',
          backgroundSize: `${GRAIN_TILE}px ${GRAIN_TILE}px`,
          opacity: grain,
          mixBlendMode: 'overlay',
          zIndex: 41,
          pointerEvents: 'none',
        }}
      />
    </>
  );
};

export default Atmosphere;
