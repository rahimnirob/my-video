import React from 'react';
import { Easing, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import {
  EASE_SMOOTH,
  REGISTER,
  base,
  frames,
  sentinel,
  type,
  mono,
} from '../../tokens';

export const register = REGISTER.RAW;

export type TerminalLineProps = {
  /** The line being typed in (without prefix). */
  text: string;
  /** Sentinel-style prefix. Defaults to `>>>`. */
  prefix?: string;
  /** Accent color for the cursor + prefix. */
  accent?: string;
  /** When the line starts (relative to its composition). */
  delayFrames?: number;
  /** Per-character reveal duration (ms). Spec: 40–60ms. */
  charMs?: number;
  /** Font size in px. */
  size?: number;
};

const TerminalLine: React.FC<TerminalLineProps> = ({
  text,
  prefix = '>>>',
  accent = sentinel.accent,
  delayFrames = 0,
  charMs = 50,
  size = 28,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const ease = Easing.bezier(...EASE_SMOOTH);

  const local = frame - delayFrames;
  const charF = frames(charMs, fps);
  const prefixIn = interpolate(local, [0, charF * 2], [0, 1], {
    easing: ease,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const charsShown = Math.max(
    0,
    Math.floor((local - charF * 2) / Math.max(charF, 1)),
  );
  const visible = text.slice(0, Math.min(text.length, charsShown));

  const blink = Math.floor((frame / fps) * 2) % 2 === 0;

  const baseStyle: React.CSSProperties = {
    fontFamily: mono,
    fontSize: size,
    fontWeight: 500,
    color: base.textPrimary,
    letterSpacing: type.body.lineHeight ? '0em' : undefined,
    display: 'inline-flex',
    alignItems: 'center',
    gap: size * 0.4,
    lineHeight: 1.4,
  };

  return (
    <div style={baseStyle}>
      <span
        style={{
          color: accent,
          clipPath: `inset(0 ${(1 - prefixIn) * 100}% 0 0)`,
          display: 'inline-block',
        }}
      >
        {prefix}
      </span>
      <span style={{ display: 'inline-block', whiteSpace: 'pre' }}>
        {visible}
        <span
          style={{
            display: 'inline-block',
            width: size * 0.55,
            height: size * 0.9,
            verticalAlign: '-0.1em',
            marginLeft: size * 0.12,
            background: accent,
            opacity: blink ? 1 : 0,
          }}
        />
      </span>
    </div>
  );
};

export default TerminalLine;
