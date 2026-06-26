import React from 'react';
import { interpolate } from 'remotion';
import { C, ease, FONT_FAMILY } from '../ares-tokens';
import { Icon, IconName } from '../icons';

/**
 * GlassPanelUI — a holographic glass panel: title, three cyan placeholder data
 * rows, border glow. Entry = opacity + translateY(16→0) over 20f from entryFrame.
 * Laid out by the parent (flex row); not self-positioned. title is optional so
 * the icon-only S4 panels don't have to invent labels.
 */
const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

const GlassPanelUI: React.FC<{
  title?: string;
  width: number;
  height: number;
  frame: number;
  entryFrame: number;
  showDataRows?: boolean;
  iconName?: IconName;
}> = ({ title, width, height, frame, entryFrame, showDataRows = true, iconName }) => {
  const p = interpolate(frame, [entryFrame, entryFrame + 20], [0, 1], { easing: ease, ...clamp });
  const ty = (1 - p) * 16;
  return (
    <div
      style={{
        width,
        height,
        opacity: p,
        transform: `translateY(${ty}px)`,
        background: 'rgba(10,26,63,0.6)',
        border: '1px solid rgba(0,229,255,0.22)',
        borderRadius: 12,
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        boxShadow: '0 0 24px rgba(0,229,255,0.08), inset 0 1px 0 rgba(0,229,255,0.1)',
        padding: 24,
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', minHeight: 24 }}>
        {title && (
          <div
            style={{
              fontFamily: FONT_FAMILY,
              fontWeight: 500,
              fontSize: 13,
              color: C.starlight,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}
          >
            {title}
          </div>
        )}
        {iconName && <Icon name={iconName} size={24} color={C.starlight} glow="drop-shadow(0 0 6px rgba(0,229,255,0.4))" />}
      </div>
      {showDataRows && (
        <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ height: 12, borderRadius: 4, background: 'rgba(0,229,255,0.12)' }} />
          ))}
        </div>
      )}
    </div>
  );
};

export default GlassPanelUI;
