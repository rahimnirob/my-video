import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { mono } from '../../tokens';
import { C, GLASS, ramp, alpha, cursorVisible } from '../constants';

export type TBFeedback = { type: 'success' | 'info'; text: string } | null;

export type TerminalBarProps = {
  path: string;
  inputText?: string;
  feedback?: TBFeedback;
  /** 0→1 execute flash (border→green, diamond pulse). */
  flash?: number;
  /** Opacity multiplier (1 normal, 0.4 de-emphasised in the D-Pad scene). */
  dim?: number;
  /** Absolute frame the slide-up entrance begins. */
  startFrame?: number;
  width?: number;
};

const FB_ICON = { success: '✓', info: '→' } as const;

/**
 * The persistent bottom terminal bar (scenes 3–7). Presentational: a controller
 * at the composition level computes path / typed input / feedback / flash by
 * absolute frame and passes them here, so there is ONE continuous bar all film.
 */
const TerminalBar: React.FC<TerminalBarProps> = ({
  path,
  inputText = '',
  feedback = null,
  flash = 0,
  dim = 1,
  startFrame = 240,
  width = 680,
}) => {
  const frame = useCurrentFrame();
  if (frame < startFrame) return null;

  const enter = ramp(frame, startFrame, startFrame + 20);
  const y = interpolate(enter, [0, 1], [24, 0]);
  const flashing = flash > 0.02;
  const borderColor = flashing ? C.success : GLASS.border;
  const fbColor = feedback?.type === 'info' ? C.violetHover : C.success;

  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        bottom: 48,
        transform: `translate(-50%, ${y}px)`,
        width,
        height: 72,
        opacity: enter * dim,
        zIndex: 200,
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          background: GLASS.bg,
          border: `1px solid ${borderColor}`,
          borderRadius: GLASS.radius,
          backdropFilter: 'blur(14px)',
          boxShadow: flashing ? `0 0 24px ${alpha(C.success, 0.5 * flash)}` : 'none',
          padding: '11px 18px',
          display: 'flex',
          alignItems: 'center',
          gap: 16,
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.12em', color: C.textMuted, marginBottom: 5 }}>
            {path}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, height: 16 }}>
            <span style={{ fontFamily: mono, fontSize: 13, fontWeight: 700, color: C.silver }}>{'>>>'}</span>
            <span style={{ fontFamily: mono, fontSize: 12, color: C.textPrimary, whiteSpace: 'pre' }}>{inputText}</span>
            <span
              style={{
                display: 'inline-block',
                width: 2,
                height: 13,
                background: C.violet,
                boxShadow: `0 0 8px ${alpha(C.violet, 0.8)}`,
                opacity: cursorVisible(frame) ? 1 : 0,
              }}
            />
          </div>
          <div style={{ height: 12, marginTop: 4 }}>
            {feedback && (
              <span style={{ fontFamily: mono, fontSize: 10, color: fbColor }}>
                {FB_ICON[feedback.type]}&nbsp;&nbsp;{feedback.text}
              </span>
            )}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontFamily: mono, fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', color: C.textMuted }}>
            RUN
          </span>
          <span
            style={{
              width: 8,
              height: 8,
              background: flashing ? C.success : C.textMuted,
              transform: `rotate(45deg) scale(${1 + 0.4 * flash})`,
              boxShadow: flashing ? `0 0 12px ${alpha(C.success, 0.6)}` : 'none',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default TerminalBar;
