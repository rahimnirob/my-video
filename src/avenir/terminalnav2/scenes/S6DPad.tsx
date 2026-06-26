import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { sora, mono } from '../../tokens';
import { C, ramp, alpha } from '../constants';
import { DPadKey, CenterDiamond } from '../components';

/**
 * SCENE 6 — DPAD (F720–F900). The screenshot has been pushed/zoomed into the
 * D-Pad region (composition-level camera). Here we overlay the animated D-Pad
 * aligned to that region: keys stagger in, three presses fire (right→up→left),
 * the centre crystal pulses throughout, "Precision control." lands on the UP press.
 */
const S6DPad: React.FC = () => {
  const frame = useCurrentFrame();
  const vis = 1 - ramp(frame, 900, 918);
  if (frame < 778 || vis <= 0) return null;

  const headIn = ramp(frame, 790, 804);
  const diamondIn = ramp(frame, 796, 810);
  const captionIn = ramp(frame, 882, 896);

  // TODO(align): D-Pad centre (x1340,y540) is the brief's estimate for where the
  // sidebar D-Pad lands after the zoom. Verify against the rendered still and nudge.
  return (
    <AbsoluteFill style={{ opacity: vis }}>
      {/* persistent label above the D-Pad */}
      <div
        style={{
          position: 'absolute',
          left: 1340,
          top: 396,
          transform: 'translate(-50%, -50%)',
          fontFamily: mono,
          fontSize: 9,
          fontWeight: 500,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: alpha(C.silver, 0.45),
          opacity: headIn,
          whiteSpace: 'nowrap',
        }}
      >
        CAROUSEL CONTROL
      </div>

      {/* the D-Pad cross */}
      <div
        style={{
          position: 'absolute',
          left: 1340,
          top: 540,
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <DPadKey direction="up" arrow="↑" label="VIEW DETAILS" entranceStart={780} pressFrame={880} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <DPadKey direction="left" arrow="←" label="PREV" entranceStart={804} pressFrame={910} />
          <div style={{ opacity: diamondIn, transform: `scale(${0.85 + 0.15 * diamondIn})` }}>
            <CenterDiamond />
          </div>
          <DPadKey direction="right" arrow="→" label="NEXT" entranceStart={788} pressFrame={840} />
        </div>
        <DPadKey direction="down" arrow="↓" label="CLOSE" entranceStart={812} pressFrame={null} />
      </div>

      {/* caption on the UP press */}
      <div
        style={{
          position: 'absolute',
          left: 1540,
          top: 540,
          transform: `translate(0, -50%) translateY(${(1 - captionIn) * 10}px)`,
          fontFamily: sora,
          fontSize: 28,
          fontWeight: 700,
          color: C.textPrimary,
          letterSpacing: '-0.02em',
          opacity: captionIn,
          whiteSpace: 'nowrap',
        }}
      >
        Precision control.
      </div>
    </AbsoluteFill>
  );
};

export default S6DPad;
