import React from 'react';
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { EASE_SMOOTH, frames, mono, sora } from '../../tokens';
import { s } from '../layout';
import { captionSubject, CAPTION_WHITE, type CaptionSubject } from '../palette';

/**
 * Caption — the ONE caption system for the whole film (the avenir transmission).
 * Centered glass box · ">>>" mono prefix · ALL-CAPS Sora, BIG · word-by-word
 * typed entrance + blinking cursor · light focus-pull (bg stays visible) ·
 * DRAINS (grayscale+blur+fade) on death beats. The gradient follows the SUBJECT
 * (lumen violet→blue 01–03, billboard peach→orange 04–07); a run can override
 * its gradient + drain independently (the hook's PRODUCT HUNT, which dies).
 *
 * Read top-to-bottom across the 7 beats it is one continuous transmission.
 */

export type CaptionSeg = {
  t: string;
  /** Gradient for this run; omit to use the subject gradient. */
  grad?: string;
  /** Render this run as cold caption white (no gradient). */
  white?: boolean;
  /** This run bleeds to grey at segDrainAt (e.g. PRODUCT HUNT). */
  drain?: boolean;
};

export type CaptionProps = {
  /** Simple line (whole line = subject gradient). */
  text?: string;
  /** Rich line (per-run treatment). Overrides `text`. */
  segments?: CaptionSeg[];
  subject?: CaptionSubject;
  /** Scene-local frame when the caption begins. */
  enterAt?: number;
  top?: string;
  size?: number;
  staggerMs?: number;
  maxWidthPct?: number;
  /** Scene frame where the WHOLE caption drains (death beats). */
  drainAt?: number;
  /** Scene frame where drain:true runs bleed to grey. */
  segDrainAt?: number;
  exitAt?: number;
  zIndex?: number;
};

type W = { text: string; white?: boolean; grad?: string; drain?: boolean };

const Caption: React.FC<CaptionProps> = ({
  text,
  segments,
  subject = 'lumen',
  enterAt = 0,
  top = '82%',
  size = 32,
  staggerMs = 64,
  maxWidthPct = 84,
  drainAt,
  segDrainAt,
  exitAt,
  zIndex = 40,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const ease = Easing.bezier(...EASE_SMOOTH);
  const subj = captionSubject[subject];
  const r = (a: number, b: number) =>
    interpolate(frame, [a, b], [0, 1], { easing: ease, extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const segs: CaptionSeg[] = segments ?? [{ t: text ?? '' }];
  const words: W[] = [];
  segs.forEach((seg) => {
    seg.t
      .toUpperCase()
      .split(' ')
      .filter((p) => p.length > 0)
      .forEach((p) => words.push({ text: p, white: seg.white, grad: seg.grad, drain: seg.drain }));
  });

  const boxIn = r(enterAt, enterAt + frames(240, fps));
  const wordStart = enterAt + frames(150, fps);
  const lastIn = r(
    wordStart + (words.length - 1) * frames(staggerMs, fps),
    wordStart + (words.length - 1) * frames(staggerMs, fps) + frames(220, fps),
  );
  const drain = drainAt != null ? r(drainAt, drainAt + frames(820, fps)) : 0;
  const exit = exitAt != null ? 1 - r(exitAt, exitAt + frames(360, fps)) : 1;
  const cursorOn = Math.floor(frame / 8) % 2 === 0 ? 1 : 0.12;

  // light focus-pull — keep the background VISIBLE (founder note); transient.
  const fp = interpolate(
    frame,
    [enterAt, enterAt + frames(190, fps), enterAt + frames(680, fps)],
    [0, s(3.5), 0],
    { easing: ease, extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
  );

  return (
    <AbsoluteFill style={{ zIndex, pointerEvents: 'none' }}>
      <AbsoluteFill
        style={{
          backdropFilter: `blur(${fp}px)`,
          WebkitBackdropFilter: `blur(${fp}px)`,
          background: `rgba(3,2,7,${0.2 * boxIn * exit})`,
          opacity: exit,
        }}
      />
      {/* full-width centering rail (so the box shrink-to-fits correctly) */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top,
          transform: 'translateY(-50%)',
          display: 'flex',
          justifyContent: 'center',
          padding: `0 ${100 - maxWidthPct}%`,
        }}
      >
        <div
          style={{
            transform: `scale(${0.978 + 0.022 * boxIn})`,
            opacity: boxIn * exit,
            padding: `${s(14)}px ${s(28)}px`,
            borderRadius: s(11),
            border: `1px solid ${subj.pre}2b`,
            background: 'rgba(9,10,16,0.30)',
            backdropFilter: `blur(${s(10)}px)`,
            WebkitBackdropFilter: `blur(${s(10)}px)`,
            boxShadow: `0 ${s(16)}px ${s(48)}px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)`,
            filter: `grayscale(${drain}) brightness(${1 - 0.42 * drain}) blur(${drain * s(2)}px)`,
            textAlign: 'center',
            fontFamily: sora,
            fontWeight: 700,
            fontSize: s(size),
            letterSpacing: '-0.01em',
            lineHeight: 1.16,
          }}
        >
          <span
            style={{
              fontFamily: mono,
              fontWeight: 700,
              fontSize: s(size * 0.54),
              color: subj.pre,
              letterSpacing: '0.04em',
              marginRight: s(14),
              opacity: 0.9,
              textShadow: `0 0 ${s(14)}px ${subj.glow}`,
              verticalAlign: '0.06em',
            }}
          >
            {'>>>'}
          </span>
          {words.map((w, i) => {
            const ws = wordStart + i * frames(staggerMs, fps);
            const rev = r(ws, ws + frames(220, fps));
            const segDrain = w.drain && segDrainAt != null ? r(segDrainAt, segDrainAt + frames(720, fps)) : 0;
            const base: React.CSSProperties = w.white
              ? { color: CAPTION_WHITE }
              : {
                  backgroundImage: w.grad ?? subj.gradient,
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                  textShadow: `0 0 ${s(26)}px ${subj.glow}`,
                };
            return (
              <span
                key={i}
                style={{
                  display: 'inline-block',
                  marginRight: s(10),
                  opacity: rev,
                  transform: `translateY(${(1 - rev) * s(9)}px)`,
                  filter: segDrain ? `grayscale(${segDrain}) brightness(${1 - 0.45 * segDrain})` : undefined,
                  ...base,
                }}
              >
                {w.text}
              </span>
            );
          })}
          <span
            style={{
              display: 'inline-block',
              width: s(size * 0.44),
              height: s(size * 0.82),
              background: subj.cursor,
              boxShadow: `0 0 ${s(9)}px ${subj.pre}`,
              opacity: lastIn * cursorOn * 0.9,
              verticalAlign: '-0.1em',
            }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};

export default Caption;
