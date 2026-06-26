import React, { useMemo } from 'react';
import { AbsoluteFill } from 'remotion';
import { C } from '../ares-tokens';

/** Deterministic PRNG so the starfield layout is identical every render. */
const mulberry32 = (a: number) => () => {
  a |= 0;
  a = (a + 0x6d2b79f5) | 0;
  let t = Math.imul(a ^ (a >>> 15), 1 | a);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

/** Static cosmic backdrop — `count` starlight dots at seeded positions. */
const StarField: React.FC<{ count?: number; seed?: number }> = ({ count = 150, seed = 42 }) => {
  const stars = useMemo(() => {
    const rand = mulberry32(seed);
    return Array.from({ length: count }, () => ({
      x: rand() * 1920,
      y: rand() * 1080,
      r: 2 + rand() * 2,
      o: 0.3 + rand() * 0.5,
    }));
  }, [count, seed]);
  return (
    <AbsoluteFill>
      <svg width="100%" height="100%" viewBox="0 0 1920 1080" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0 }}>
        {stars.map((s, i) => (
          <circle key={i} cx={s.x} cy={s.y} r={s.r} fill={C.starlight} opacity={s.o} />
        ))}
      </svg>
    </AbsoluteFill>
  );
};

export default StarField;
