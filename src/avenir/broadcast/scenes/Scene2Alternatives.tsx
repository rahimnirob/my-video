import React from 'react';
import { AbsoluteFill, interpolate, Easing } from 'remotion';
import { ease, BB, bbFill } from '../palette';
import { sora } from '../../tokens';

/**
 * S2 — ALTERNATIVES (f28–140)
 *
 * Flow:
 *  [f28–f60]   Phase 1 — "your next product" fit-to-fill build.
 *              "your" stamps in huge, shrinks as "next" and "product" join.
 *              Settles at ~130px. Holds for a beat.
 *
 *  [f60–f100]  Phase 2 — Drum fades in ON TOP of "product".
 *              Drum's first item IS "product" (index 0) so nothing looks
 *              removed. Then drum scrolls up: Product Hunt → Hacker News
 *              → Twitter → Reddit → LinkedIn → Billboard.
 *              "product" text crossfades out as drum crossfades in.
 *
 *  [f100–f125] Phase 3 — Billboard locked: letterSpacing stretches wide,
 *              decay gradient fires, cursor clicks.
 *
 *  [f125–f135] Exit — composition lifts + fades.
 */

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

const ri = (frame: number, a: number, b: number, x: number, y: number, ez = ease) =>
  interpolate(frame, [a, b], [x, y], { easing: ez, ...clamp });

// ~0.58 em per char for Sora 800
const CHAR_RATIO = 0.58;
const SPACE_RATIO = 0.28;

// Drum starts at "product" (index 0) so it looks like a seamless handoff
const PLATFORMS = [
  'product',       // 0 ← drum starts here (same word as left text)
  'Product Hunt',  // 1
  'Hacker News',   // 2
  'Twitter',       // 3
  'Reddit',        // 4
  'LinkedIn',      // 5
  'Billboard',     // 6 ← lands here
];

const SLOT_H = 150; // px — slot height = font-size

const Scene2Alternatives: React.FC<{ frame: number }> = ({ frame: f }) => {
  if (f < 28 || f > 140) return null;

  // ── Scene envelope ─────────────────────────────────────────────────────────
  const sceneIn  = ri(f, 28, 36, 0, 1);
  const sceneOut = ri(f, 125, 135, 0, 1);
  const sceneOp  = sceneIn * (1 - sceneOut);
  const exitY    = ri(f, 125, 135, 0, -70);
  const exitBlur = ri(f, 125, 135, 0, 12);

  // ── Phase 1: fit-to-fill for "your next product" ───────────────────────────
  const WORDS   = ['your', 'next', 'product'];
  const W_START = [30, 40, 50];
  const W_DUR   = 10;

  const progresses = WORDS.map((_, i) =>
    ri(f, W_START[i], W_START[i] + W_DUR, 0, 1)
  );

  // Accumulate visible em-width to drive fit-to-fill shrink
  let visEm = 0.001;
  progresses.forEach((p, i) => {
    if (p > 0.001) visEm += p * (WORDS[i].length * CHAR_RATIO + (i > 0 ? SPACE_RATIO : 0));
  });

  // Fit: starts ~700px for 1 word, shrinks to ~130px for all 3
  const fitSize = Math.max(130, Math.min(700, 1600 / visEm));

  // Once all 3 words are in (f60+), lock size to 130 so it doesn't jitter
  const allIn = progresses[2]; // "product" progress
  const leftSize = allIn < 1 ? fitSize : 130;

  // ── Phase 2: drum crossfade with "product" ─────────────────────────────────
  // Drum fades in starting at f60; "product" text fades out at same time
  const drumFade = ri(f, 60, 72, 0, 1);

  // "product" in the left text crossfades OUT as drum fades IN
  // (drum's item 0 is "product" so visually nothing disappears)
  const productTextOp = 1 - drumFade;

  // ── Drum scroll: "product"(0) → Billboard(6) over f60–f100 ───────────────
  const scrollIndex = (() => {
    if (f < 60)  return 0;
    if (f < 68)  return ri(f, 60, 68, 0, 1);
    if (f < 72)  return 1;
    if (f < 78)  return ri(f, 72, 78, 1, 2);
    if (f < 82)  return 2;
    if (f < 88)  return ri(f, 82, 88, 2, 3);
    if (f < 92)  return 3;
    if (f < 96)  return ri(f, 92, 96, 3, 4);
    if (f < 98)  return 4;
    if (f < 102) return ri(f, 98, 102, 4, 5);
    if (f < 104) return 5;
    if (f < 108) return ri(f, 104, 108, 5, 6);
    return 6;
  })();

  // ── Phase 3: Billboard selection ───────────────────────────────────────────
  const selectP   = ri(f, 108, 118, 0, 1);
  const billLS    = ri(f, 108, 118, -0.03, 0.10);  // letterSpacing stretch
  const billScale = interpolate(f, [108, 113, 118], [1, 1.05, 1.0], clamp);
  const othersOp  = ri(f, 108, 118, 1, 0);

  // ── Cursor ──────────────────────────────────────────────────────────────────
  const curIn    = ri(f, 94, 108, 0, 1);
  const curOut   = ri(f, 114, 122, 1, 0);
  const curOp    = curIn * curOut * (1 - sceneOut);
  const curX     = interpolate(curIn, [0, 1], [1500, 960], clamp);
  const curY     = interpolate(curIn, [0, 1], [800, 540], clamp);
  const curClick = interpolate(f, [108, 110, 114], [1, 0.78, 1], clamp);

  // ── Ripple ──────────────────────────────────────────────────────────────────
  const ripP  = ri(f, 108, 122, 0, 1, Easing.bezier(0.1, 0.8, 0.3, 1));
  const ripS  = interpolate(ripP, [0, 1], [0.3, 3.2], clamp);
  const ripOp = interpolate(ripP, [0, 0.12, 1], [0, 0.85, 0], clamp);

  return (
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: sceneOp }}>

      {/* ─── Main content row ───────────────────────────────────────────────── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          maxWidth: 1800,
          width: '100%',
          gap: drumFade > 0.01 ? 28 : 0,
          transform: `translate3d(0, ${exitY}px, 0)`,
          filter: exitBlur > 0 ? `blur(${exitBlur}px)` : undefined,
        }}
      >

        {/* LEFT: "your next product" — product crossfades to drum */}
        <div
          style={{
            fontFamily: sora,
            fontWeight: 800,
            fontSize: leftSize,
            letterSpacing: '-0.03em',
            lineHeight: 1,
            display: 'flex',
            gap: `${SPACE_RATIO * leftSize}px`,
            alignItems: 'baseline',
            whiteSpace: 'nowrap',
            color: BB.ink,
            flexShrink: 0,
          }}
        >
          {WORDS.map((w, i) => {
            const p = progresses[i];
            if (p <= 0.001) return null;

            // "product" fades out as drum takes over — crossfade
            const wordOp = w === 'product' ? p * productTextOp : p;
            if (wordOp <= 0.001) return null;

            return (
              <span
                key={w}
                style={{
                  display: 'inline-block',
                  opacity: wordOp,
                  // Stamp-in from below
                  transform: `translateY(${(1 - p) * 0.3 * leftSize}px)`,
                }}
              >
                {w}
              </span>
            );
          })}
        </div>

        {/* RIGHT: Platform drum — appears in place of "product" */}
        {drumFade > 0.001 && (
          <div
            style={{
              position: 'relative',
              height: SLOT_H * 3,
              overflow: 'hidden',
              opacity: drumFade,
              flexShrink: 0,
              // Soft mask: blur top/bottom, sharp center
              maskImage: 'linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%)',
            }}
          >
            <div
              style={{
                // Scroll so current index sits in the center slot
                transform: `translateY(${SLOT_H - scrollIndex * SLOT_H}px)`,
              }}
            >
              {PLATFORMS.map((platform, i) => {
                const isBillboard = platform === 'Billboard';
                const dist = Math.abs(i - scrollIndex);

                // Focus: center = sharp, further = dim + blur
                const wheelOp = dist < 0.3
                  ? 1
                  : dist < 1.5
                    ? interpolate(dist, [0.3, 1.5], [1, 0.18], clamp)
                    : 0;
                const wheelBlur = dist > 0.4 ? dist * 3.5 : 0;

                // After select: only Billboard stays
                const finalOp = isBillboard ? wheelOp : wheelOp * othersOp;

                return (
                  <div
                    key={platform}
                    style={{
                      height: SLOT_H,
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: sora,
                        fontWeight: 800,
                        fontSize: 150,
                        lineHeight: 1,
                        whiteSpace: 'nowrap',
                        // Billboard stretches wide like Scene1 "Launch." energy
                        letterSpacing: isBillboard ? `${billLS}em` : '-0.03em',
                        transform: isBillboard ? `scaleX(${billScale})` : 'none',
                        transformOrigin: 'left center',
                        opacity: finalOp,
                        filter: wheelBlur > 0 ? `blur(${wheelBlur}px)` : undefined,
                        // Orange→red gradient on Billboard once selected (reads on light FieldBg)
                        ...(isBillboard && selectP > 0.05
                          ? bbFill(f, false)
                          : { color: BB.ink }
                        ),
                      }}
                    >
                      {platform}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* ─── Click ripple ────────────────────────────────────────────────────── */}
      {ripOp > 0.001 && (
        <div
          style={{
            position: 'absolute',
            left: curX,
            top: curY,
            width: 64,
            height: 64,
            borderRadius: '50%',
            border: `3px solid ${BB.bloom}`,
            transform: `translate(-50%, -50%) scale(${ripS})`,
            opacity: ripOp,
            pointerEvents: 'none',
            boxShadow: `0 0 20px ${BB.bloom}`,
          }}
        />
      )}

      {/* ─── Hand cursor ─────────────────────────────────────────────────────── */}
      {curOp > 0.01 && (
        <div
          style={{
            position: 'absolute',
            left: curX,
            top: curY,
            transform: `translate(-50%, -50%) scale(${curClick * 1.6})`,
            opacity: curOp,
            pointerEvents: 'none',
            zIndex: 100,
          }}
        >
          <svg width={44} height={52} viewBox="0 0 22 26" fill="none">
            <path
              d="M4 2L4 17L8 13.5L11.5 20.5L14 19L10.5 12L16 11L4 2Z"
              fill="white"
              stroke={BB.ink}
              strokeWidth={1.4}
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}

    </AbsoluteFill>
  );
};

export default Scene2Alternatives;
