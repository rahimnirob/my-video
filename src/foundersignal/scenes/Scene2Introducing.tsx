import React from 'react';
import { AbsoluteFill, interpolate } from 'remotion';
import { fsFill, ease, FONT_FAMILY, FS } from '../foundersignal-tokens';

/**
 * Scene 2 — INTRODUCING (f198–336), on the deep black field. "Introducing" slides in,
 * then the FounderSignal mark + "FounderSignal" wordmark build in BESIDE it on ONE line,
 * with a small "Find ideas people actually want" positioning sub. Holds, then blurs out.
 * Blinking cursor after the name settles.
 */
const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

const Scene2Introducing: React.FC<{ frame: number }> = ({ frame: f }) => {
  if (f < 192 || f > 336) return null;
  const introP = interpolate(f, [198, 214], [0, 1], { easing: ease, ...clamp });
  
  // Logo entrance (placeholder - will need actual logo asset)
  const logoP = interpolate(f, [210, 226], [0, 1], { easing: ease, ...clamp });
  const logoRot = interpolate(f, [210, 226], [-35, 0], { easing: ease, ...clamp });
  
  // Subtitle + out-animation
  const subP = interpolate(f, [252, 268], [0, 1], { easing: ease, ...clamp });
  const outP = interpolate(f, [310, 318], [0, 1], { easing: ease, ...clamp });
  const op = 1 - outP;

  // blinking cursor — appears after all letters settle (f >= 248), blinks on 24-frame cycle
  const cursorOn = f >= 248 && f % 24 < 12;

  const letters = ['F', 'o', 'u', 'n', 'd', 'e', 'r', 'S', 'i', 'g', 'n', 'a', 'l'];

  return (
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ opacity: op, filter: `blur(${outP * 8}px)`, transform: `translateY(${-outP * 12}px)`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 26 }}>
          {/* "Introducing" */}
          <span
            style={{
              opacity: introP,
              filter: `blur(${(1 - introP) * 10}px)`,
              transform: `translateX(${(1 - introP) * -20}px)`,
              fontFamily: FONT_FAMILY,
              fontWeight: 600,
              fontSize: 96,
              color: FS.ink,
              letterSpacing: '-0.02em',
            }}
          >
            Introducing
          </span>
          
          {/* Logo Mark - placeholder circle with FS */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              opacity: logoP,
              transform: `scale(${0.6 + 0.4 * logoP}) rotate(${logoRot}deg)`,
            }}
          >
            <div style={{ 
              width: 110, 
              height: 110, 
              borderRadius: 20, 
              background: `linear-gradient(135deg, ${FS.bloom}, ${FS.bloomDeep})`,
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              boxShadow: `0 8px 24px ${FS.bloom}40`
            }}>
              <span style={{ 
                fontFamily: FONT_FAMILY, 
                fontWeight: 800, 
                fontSize: 36, 
                color: '#fff',
                letterSpacing: '-0.02em'
              }}>
                FS
              </span>
            </div>
          </div>

          {/* Staggered "FounderSignal" letters */}
          <span style={{ display: 'flex', gap: 2 }}>
            {letters.map((char, index) => {
              const letterStart = 218 + index * 4;
              const letterP = interpolate(f, [letterStart, letterStart + 16], [0, 1], { easing: ease, ...clamp });
              return (
                <span
                  key={index}
                  style={{
                    display: 'inline-block',
                    fontFamily: FONT_FAMILY,
                    fontWeight: 700,
                    fontSize: 124,
                    color: FS.ink,
                    letterSpacing: '-0.02em',
                    opacity: letterP,
                    filter: `blur(${(1 - letterP) * 8}px)`,
                    transform: `translateY(${(1 - letterP) * 20}px) scale(${0.7 + 0.3 * letterP})`,
                    transformOrigin: 'bottom center',
                  }}
                >
                  {char}
                </span>
              );
            })}
          </span>
          
          {/* blinking cursor */}
          <span
            style={{
              display: 'inline-block',
              width: 5,
              height: 106,
              background: FS.ink,
              opacity: cursorOn ? 1 : 0.08,
              marginLeft: 2,
              alignSelf: 'center',
            }}
          />
        </div>
        <div style={{ opacity: subP, fontFamily: FONT_FAMILY, fontWeight: 500, fontSize: 30, color: FS.gray, letterSpacing: '0.04em' }}>
          Find ideas people <span style={{ ...fsFill(f, false), fontStyle: 'italic' }}>actually want</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

export default Scene2Introducing;
