import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { base, sentinel, pulse, status, mono } from '../../tokens';
import { GLASS, ease, alpha, cursorVisible } from '../constants';

export type TerminalFeedback = {
  type: 'success' | 'info' | 'error';
  text: string;
};

export type TerminalBarProps = {
  path: string;
  /** Absolute frame at which the slide-up entrance begins. */
  startFrame?: number;
  inputText?: string;
  showCursor?: boolean;
  feedback?: TerminalFeedback | null;
  /** Slightly dim the whole bar (used in scenes 3–5; crisp in scene 6). */
  dim?: boolean;
  width?: number;
};

const FB_ICON: Record<TerminalFeedback['type'], string> = {
  success: '✓',
  error: '✗',
  info: '→',
};
const FB_COLOR: Record<TerminalFeedback['type'], string> = {
  success: status.success,
  error: status.error,
  info: base.textSecondary,
};

/**
 * The persistent bottom terminal bar. Lives at the TerminalNav composition level
 * (not inside a per-scene Sequence) so it can span scenes 2–6; it therefore reads
 * the ABSOLUTE frame. Entrance: slides up y:30→0, opacity 0→1 over 20 frames.
 */
const TerminalBar: React.FC<TerminalBarProps> = ({
  path,
  startFrame = 0,
  inputText = '',
  showCursor = true,
  feedback = null,
  dim = false,
  width = 680,
}) => {
  const frame = useCurrentFrame();
  const local = frame - startFrame;
  if (local < 0) return null;

  const enter = interpolate(local, [0, 20], [0, 1], {
    easing: ease,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const y = interpolate(enter, [0, 1], [30, 0]);
  // "T E R M I N A L" label fades in a touch after the bar (F215–240 in CUT).
  const labelIn = interpolate(local, [20, 45], [0, 1], {
    easing: ease,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const barOpacity = enter * (dim ? 0.88 : 1);

  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        bottom: 56,
        transform: `translate(-50%, ${y}px)`,
        width,
        opacity: barOpacity,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
        zIndex: 200,
      }}
    >
      {/* T E R M I N A L label */}
      <span
        style={{
          fontFamily: mono,
          fontSize: 8,
          fontWeight: 600,
          letterSpacing: '0.35em',
          textTransform: 'uppercase',
          color: sentinel.accent,
          opacity: labelIn * 0.2,
        }}
      >
        T E R M I N A L
      </span>

      {/* glass panel */}
      <div
        style={{
          width: '100%',
          background: GLASS.bg,
          border: `1px solid ${GLASS.border}`,
          borderRadius: GLASS.radius,
          backdropFilter: 'blur(14px)',
          padding: '14px 18px',
          display: 'flex',
          alignItems: 'center',
          gap: 16,
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* top row: breadcrumb */}
          <div
            style={{
              fontFamily: mono,
              fontSize: 9,
              letterSpacing: '0.12em',
              color: base.textMuted,
              marginBottom: 8,
            }}
          >
            {path}
          </div>

          {/* prompt + input + cursor */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, height: 16 }}>
            <span
              style={{
                fontFamily: mono,
                fontSize: 13,
                fontWeight: 700,
                color: sentinel.accent,
              }}
            >
              {'>>>'}
            </span>
            <span style={{ fontFamily: mono, fontSize: 12, color: base.textPrimary, whiteSpace: 'pre' }}>
              {inputText}
            </span>
            {showCursor && (
              <span
                style={{
                  display: 'inline-block',
                  width: 2,
                  height: 13,
                  background: pulse.accent,
                  boxShadow: `0 0 8px ${alpha(pulse.accent, 0.8)}`,
                  opacity: cursorVisible(frame) ? 1 : 0,
                }}
              />
            )}
            {!inputText && (
              <span style={{ fontFamily: mono, fontSize: 11, color: base.textMuted, opacity: 0.6 }}>
                type a command or press /
              </span>
            )}
          </div>

          {/* feedback row — reserves height so the bar never jumps */}
          <div style={{ height: 14, marginTop: 6 }}>
            {feedback && (
              <span style={{ fontFamily: mono, fontSize: 11, color: FB_COLOR[feedback.type] }}>
                {FB_ICON[feedback.type]}&nbsp;&nbsp;{feedback.text}
              </span>
            )}
          </div>
        </div>

        {/* RUN + status diamond */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span
            style={{
              fontFamily: mono,
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.1em',
              color: base.textMuted,
            }}
          >
            RUN
          </span>
          <span
            style={{
              width: 8,
              height: 8,
              background: feedback ? FB_COLOR[feedback.type] : base.textMuted,
              transform: 'rotate(45deg)',
            }}
          />
        </div>
      </div>

      {/* bottom hint line */}
      <span
        style={{
          fontFamily: mono,
          fontSize: 7,
          letterSpacing: '0.1em',
          color: base.textMuted,
          opacity: 0.4,
        }}
      >
        ENTER execute · ESC clear · ↑↓ history · / focus
      </span>
    </div>
  );
};

export default TerminalBar;
