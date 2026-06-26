import React from 'react';
import {
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import type { CSSProperties } from 'react';
import { EMBER_SHADOW, emberFill } from '../constants';
import { anton } from '../fonts';

/**
 * KineticText — the high-quality typography engine for the Archived film.
 *
 * Two delivery modes (founder note: "present one word at a time"):
 *   • 'replace' — ONE word at a time, large, in the dead centre. Each word
 *     focus-pulls in, holds, and hands off to the next. Impossible to miss;
 *     used for the cold open and the turn.
 *   • 'flow'    — words arrive one by one and BUILD the line, each a distinct,
 *     spring-settled event slow enough to read along. Used for sentences.
 *
 * Two reveal styles for variety / "different ways to animate":
 *   • 'focus' — scale + blur focus-pull with a small rise (no clipping; soft).
 *   • 'mask'  — a clip-mask wipe up (the word rises out from its own baseline).
 *
 * Motion uses spring() for a physical settle; the gold fill is the calm static
 * metallic foil with a slow glint (see goldFill).
 */

export type KineticTextProps = {
  text: string; // '\n' forces a hard line break (flow mode)
  startFrame: number;
  fontSize: number;
  mode?: 'flow' | 'replace';
  reveal?: 'focus' | 'mask';
  top?: string;
  maxWidth?: number;
  /** flow: frames between successive word entrances. */
  perWordF?: number;
  /** replace: frames each word owns the centre before the next arrives. */
  holdF?: number;
  /** spring entrance duration (frames). */
  enterF?: number;
  /** block exit (blur-up + fade). */
  exitAt?: number;
  exitF?: number;
  /** exit motion: 'fade' (default), 'wipeUp' (bottom-to-top clip + rise), or
   *  'blackout' (a black bar redacts the line L→R, then it clips away). */
  exitStyle?: 'fade' | 'wipeUp' | 'blackout';
  fontWeight?: number;
  letterSpacing?: string;
  lineHeight?: number;
  /** flow: period (frames) of the ONE continuous gradient flowing across the line. */
  gradientF?: number;
  /** Override the text fill (e.g. lumexFill). Defaults to the ember gradient. */
  fillFn?: (frame: number) => CSSProperties;
  /** Override the glow/shadow filter. Defaults to EMBER_SHADOW. */
  glow?: string;
  /** Display font. Defaults to anton (the Archived hero face). Pass `sora` etc. */
  fontFamily?: string;
  /** Per-char advance (em) used to estimate flow-gradient slices. Anton ≈ 0.48. */
  charAdvance?: number;
  zIndex?: number;
};

const SPRING = { damping: 18, stiffness: 95, mass: 1 } as const;

const KineticText: React.FC<KineticTextProps> = ({
  text,
  startFrame,
  fontSize,
  mode = 'flow',
  reveal = 'focus',
  top = '50%',
  maxWidth = 1500,
  perWordF = 12,
  holdF = 26,
  enterF = 22,
  exitAt,
  exitF = 16,
  exitStyle = 'fade',
  fontWeight = 400,
  letterSpacing = '0.01em',
  lineHeight = 1.06,
  gradientF = 46,
  fillFn,
  glow,
  fontFamily = anton,
  charAdvance = 0.48,
  zIndex = 10,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const ease = Easing.bezier(0.16, 1, 0.3, 1);

  // Exit progress is LINEAR so the wipe/blackout sweep reads across its full run.
  const exitProgress = exitAt != null ? interpolate(frame, [exitAt, exitAt + exitF], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) : 0;
  const wipeOut = exitStyle === 'wipeUp';
  const blackoutOut = exitStyle === 'blackout';
  // blackout: a black bar covers the line L→R (ember edge), then the block clips
  // away L→R. wipeUp: a bottom-to-top clip + rise. fade: the original blur-up.
  const coverR = blackoutOut ? Math.min(1, exitProgress / 0.55) * 100 : 0;
  const clipL = blackoutOut ? Math.max(0, (exitProgress - 0.45) / 0.55) * 100 : 0;
  const exitFade = wipeOut || blackoutOut ? 1 : 1 - exitProgress;
  const exitBlur = wipeOut || blackoutOut ? 0 : exitProgress * 6;
  const exitLift = wipeOut ? exitProgress * fontSize * 0.6 : blackoutOut ? 0 : exitProgress * 24;
  const exitClip = wipeOut
    ? exitProgress > 0.001 ? `inset(-30% 0 ${exitProgress * 120}% 0)` : undefined
    : blackoutOut
      ? clipL > 0.001 ? `inset(-30% 0 -30% ${clipL}%)` : undefined
      : undefined;

  const fill = { ...(fillFn ?? emberFill)(frame), filter: glow ?? EMBER_SHADOW };

  /**
   * Per-word focus/mask reveal. `innerFill` is this word's SLICE of the one
   * continuous line-wide gradient (so the sentence shares a single gradient, not
   * one per word). Word transforms are vertical only → the horizontal slice
   * stays aligned, keeping the gradient continuous.
   */
  const renderWord = (w: string, p: number, op: number, key: React.Key, innerFill: CSSProperties) => {
    if (reveal === 'mask') {
      const ty = (1 - p) * 105; // % of its own box — wipes up from baseline
      return (
        <span
          key={key}
          style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top', paddingBottom: fontSize * 0.04 }}
        >
          <span style={{ display: 'inline-block', transform: `translateY(${ty}%)`, opacity: op, ...innerFill }}>{w}</span>
        </span>
      );
    }
    // focus pull
    const scale = 0.86 + 0.14 * p;
    const ty = (1 - p) * fontSize * 0.22;
    const blur = (1 - op) * 7;
    return (
      <span
        key={key}
        style={{ display: 'inline-block', transform: `translateY(${ty}px) scale(${scale})`, opacity: op, filter: `blur(${blur}px)` }}
      >
        <span style={{ display: 'inline-block', ...innerFill }}>{w}</span>
      </span>
    );
  };

  /* ───────────────────────── REPLACE — one word, centre stage ───────────── */
  if (mode === 'replace') {
    const words = text.split('\n').join(' ').split(' ').filter(Boolean);
    return (
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top,
          transform: `translateY(calc(-50% - ${exitLift}px))`,
          height: fontSize * 1.4,
          opacity: exitFade,
          zIndex,
          pointerEvents: 'none',
          fontFamily,
          fontWeight,
          fontSize,
          letterSpacing,
          lineHeight,
          clipPath: exitClip,
        }}
      >
        {words.map((w, i) => {
          const inAt = startFrame + i * holdF;
          const outAt = inAt + holdF;
          const isLast = i === words.length - 1;
          const pIn = spring({ frame: frame - inAt, fps, config: SPRING, durationInFrames: enterF });
          const opIn = interpolate(frame, [inAt, inAt + Math.round(enterF * 0.6)], [0, 1], { easing: ease, extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
          const opOut = isLast ? 1 : 1 - interpolate(frame, [outAt, outAt + 9], [0, 1], { easing: ease, extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
          const op = opIn * opOut;
          if (op <= 0.001) return null;
          // gentle exit drift for the outgoing word (focus-out)
          const outP = isLast ? 0 : interpolate(frame, [outAt, outAt + 9], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
          const scale = (0.9 + 0.1 * pIn) * (1 - 0.05 * outP);
          const blur = (1 - opIn) * 8 + outP * 6;
          const ty = (1 - pIn) * fontSize * 0.18 - outP * fontSize * 0.06;
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                whiteSpace: 'nowrap',
                transform: `translate(-50%, -50%) translateY(${ty}px) scale(${scale})`,
                opacity: op,
                filter: `blur(${blur}px)`,
              }}
            >
              <span style={{ ...fill }}>{w}</span>
            </div>
          );
        })}
      </div>
    );
  }

  /* ─────────── FLOW — build the line; ONE gradient flows across it ───────── */
  const gradientImg = (fillFn ?? emberFill)(0).backgroundImage;
  const glowFilter = glow ?? EMBER_SHADOW;
  const CHARW = charAdvance; // em advance for estimating per-word gradient slices
  const gapPx = fontSize * 0.28;
  const lines = text.split('\n');
  let wordCounter = 0;
  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top,
        transform: `translateY(calc(-50% - ${exitLift}px))`,
        display: 'flex',
        justifyContent: 'center',
        opacity: exitFade,
        zIndex,
        pointerEvents: 'none',
        filter: exitBlur ? `blur(${exitBlur}px)` : undefined,
      }}
    >
      <div style={{ position: 'relative', maxWidth, fontFamily, fontWeight, fontSize, letterSpacing, lineHeight, textAlign: 'center', clipPath: exitClip }}>
        {lines.map((line, li) => {
          const wordsArr = line.split(' ').filter(Boolean);
          // Estimate each word's offset within the line so its gradient slice
          // lines up into ONE continuous gradient spanning the whole line.
          const widths = wordsArr.map((w) => w.length * CHARW * fontSize);
          const lineW = Math.max(1, widths.reduce((a, b) => a + b, 0) + gapPx * (wordsArr.length - 1));
          const offsets: number[] = [];
          let acc = 0;
          widths.forEach((wd, i) => { offsets[i] = acc; acc += wd + gapPx; });
          const flowShift = -((frame % gradientF) / gradientF) * lineW;
          return (
            <div key={li} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: `${fontSize * 0.04}px ${gapPx}px` }}>
              {wordsArr.map((w, wi) => {
                const idx = wordCounter++;
                const wStart = startFrame + idx * perWordF;
                const p = spring({ frame: frame - wStart, fps, config: SPRING, durationInFrames: enterF });
                const op = interpolate(frame, [wStart, wStart + Math.round(enterF * 0.55)], [0, 1], { easing: ease, extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
                const innerFill: CSSProperties = {
                  display: 'inline-block',
                  backgroundImage: gradientImg,
                  backgroundSize: `${lineW}px 100%`,
                  backgroundPosition: `${flowShift - offsets[wi]}px center`,
                  backgroundRepeat: 'repeat',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                  filter: glowFilter,
                };
                return renderWord(w, p, op, wi, innerFill);
              })}
            </div>
          );
        })}
        {blackoutOut && coverR > 0.5 && (
          <div
            style={{
              position: 'absolute',
              top: '-12%',
              bottom: '-12%',
              left: 0,
              width: `${coverR}%`,
              background: '#080204',
              borderRight: coverR < 99 ? '3px solid rgba(255,90,64,0.92)' : 'none',
              boxShadow: coverR < 99 ? '0 0 20px rgba(255,80,55,0.55)' : 'none',
            }}
          />
        )}
      </div>
    </div>
  );
};

export default KineticText;
