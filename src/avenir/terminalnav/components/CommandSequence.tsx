import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { base, sentinel, pulse, status, mono, tracking } from '../../tokens';
import { GLASS, ease, alpha, cursorVisible, CHAR_FRAMES } from '../constants';

export type CommandSequenceProps = {
  /** Micro-label shown at the top of the panel (NAVIGATION / FILTERING / …). */
  microLabel: string;
  /** The command string that types in. */
  command: string;
  feedbackText: string;
  feedbackType: 'success' | 'info';
  /** Local (scene-relative) frame at which this sequence appears. */
  startFrame: number;
  /** Local frame at which this sequence is fully gone. */
  endFrame: number;
  width?: number;
};

/**
 * The center-stage terminal panel for SCENE 4. Types a command in (~1.2 f/char),
 * flashes its border green on completion, then reveals a feedback line. Fully
 * self-contained: fades itself in at startFrame and out before endFrame.
 */
const CommandSequence: React.FC<CommandSequenceProps> = ({
  microLabel,
  command,
  feedbackText,
  feedbackType,
  startFrame,
  endFrame,
  width = 700,
}) => {
  const frame = useCurrentFrame();
  const local = frame - startFrame;

  // window fade in/out
  const fade = interpolate(
    frame,
    [startFrame, startFrame + 8, endFrame - 10, endFrame],
    [0, 1, 1, 0],
    { easing: ease, extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
  );
  if (fade <= 0) return null;

  const typeStart = 10;
  const charsShown = Math.max(0, Math.floor((local - typeStart) / CHAR_FRAMES));
  const visible = command.slice(0, Math.min(command.length, charsShown));
  const doneFrame = typeStart + command.length * CHAR_FRAMES;
  const done = local >= doneFrame;

  // green border flash for 8 frames at completion
  const flash = done
    ? interpolate(local, [doneFrame, doneFrame + 4, doneFrame + 12], [0, 1, 0], {
        easing: ease,
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      })
    : 0;
  const borderColor = flash > 0 ? status.success : GLASS.border;
  const fbColor = feedbackType === 'success' ? status.success : base.textSecondary;
  const fbIcon = feedbackType === 'success' ? '✓' : '→';
  const showFeedback = local >= doneFrame + 4;

  return (
    <div
      style={{
        width,
        opacity: fade,
        background: GLASS.bg,
        border: `1px solid ${borderColor}`,
        borderRadius: 16,
        backdropFilter: 'blur(14px)',
        padding: 40,
        boxShadow: flash > 0 ? `0 0 40px ${alpha(status.success, 0.35 * flash)}` : 'none',
      }}
    >
      <div
        style={{
          fontFamily: mono,
          fontSize: 10,
          fontWeight: 500,
          letterSpacing: tracking.microLabel,
          textTransform: 'uppercase',
          color: sentinel.accent,
          opacity: 0.5,
          marginBottom: 28,
        }}
      >
        {microLabel}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, height: 30 }}>
        <span style={{ fontFamily: mono, fontSize: 22, fontWeight: 700, color: sentinel.accent }}>
          {'>>>'}
        </span>
        <span style={{ fontFamily: mono, fontSize: 22, color: base.textPrimary, whiteSpace: 'pre' }}>
          {visible}
        </span>
        <span
          style={{
            display: 'inline-block',
            width: 3,
            height: 22,
            background: pulse.accent,
            boxShadow: `0 0 10px ${alpha(pulse.accent, 0.8)}`,
            opacity: cursorVisible(frame) ? 1 : 0,
          }}
        />
      </div>

      <div style={{ height: 20, marginTop: 22 }}>
        {showFeedback && (
          <span style={{ fontFamily: mono, fontSize: 13, color: fbColor }}>
            {fbIcon}&nbsp;&nbsp;{feedbackText}
          </span>
        )}
      </div>
    </div>
  );
};

export default CommandSequence;
