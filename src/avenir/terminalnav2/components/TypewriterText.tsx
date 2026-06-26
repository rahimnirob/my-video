import React from 'react';
import { useCurrentFrame } from 'remotion';
import { ramp, CHAR_FRAMES } from '../constants';

export type TypewriterTextProps = {
  /** May contain "\n" — lines type sequentially, one char at a time. */
  text: string;
  startFrame: number;
  fontSize: number;
  fontFamily: string;
  color: string;
  weight?: number;
  tracking?: string;
  lineHeight?: number;
  align?: 'left' | 'center';
};

/**
 * Character-by-character reveal (1.2 f/char, each char opacity 0→1 over 4f).
 * No per-char Y movement — clean, per the Anthropic brief. Multi-line text keeps
 * a single running char clock so line 2 starts only after line 1 finishes.
 */
const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  startFrame,
  fontSize,
  fontFamily,
  color,
  weight = 700,
  tracking = '-0.02em',
  lineHeight = 1.1,
  align = 'center',
}) => {
  const frame = useCurrentFrame();
  const lines = text.split('\n');
  // running char offset so line 2 starts only after line 1 finishes typing
  const offsets: number[] = [];
  lines.reduce((acc, line, i) => ((offsets[i] = acc), acc + line.length), 0);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: align === 'center' ? 'center' : 'flex-start',
        textAlign: align,
        fontFamily,
        fontWeight: weight,
        fontSize,
        color,
        letterSpacing: tracking,
        lineHeight,
      }}
    >
      {lines.map((line, li) => (
        <div key={li} style={{ whiteSpace: 'pre' }}>
          {line.split('').map((ch, ci) => {
            const at = startFrame + (offsets[li] + ci) * CHAR_FRAMES;
            const op = ramp(frame, at, at + 4);
            return (
              <span key={ci} style={{ opacity: op }}>
                {ch}
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default TypewriterText;
