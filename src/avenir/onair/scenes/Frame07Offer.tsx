import React from 'react';
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { frames, mono, billboard, EASE_SMOOTH } from '../../tokens';
import { s } from '../layout';
import BillboardStageBg from '../components/BillboardStageBg';
import KineticHeadline from '../components/KineticHeadline';
import Sentinel from '../components/Sentinel';
import Atmosphere from '../components/Atmosphere';
import { Slate } from './Frame01Launch';

/**
 * Frame 07 — OFFER (the ask). A slow cinematic push-in. The red Sentinel stands
 * on the right and presents; the caption delivers on the LEFT (clear of the
 * character), then lifts; the screen un-blurs to reveal the live offer + CTA
 * centred. Built to convert: SEASON 02 IS LIVE, slots open, apply now.
 */

const HEADLINE = ['PAY', 'ONCE.', 'STAY', 'VISIBLE', 'FOR', 'GOOD.'];
const HEADLINE_ACCENTS = [0, 1];
const ORANGE_GRADIENT =
  'linear-gradient(100deg, #FFFFFF 0%, #FFD9C2 30%, #F0A868 55%, #E85D3A 76%, #FFFFFF 100%)';
const HEADLINE_AT_MS = 1500;

const Frame07Offer: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const tau = Math.PI * 2;
  const ease = Easing.bezier(...EASE_SMOOTH);
  const headlineAt = frames(HEADLINE_AT_MS, fps);
  const release = headlineAt + frames(2600, fps);
  const ramp = (a: number, b: number) =>
    interpolate(frame, [a, b], [0, 1], { easing: ease, extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const charAt = headlineAt - frames(540, fps);
  const charIn = ramp(charAt, charAt + frames(620, fps));
  const releaseRamp = ramp(release, release + frames(380, fps));
  const blur = ramp(charAt, charAt + frames(420, fps)) * (1 - releaseRamp);
  const offerIn = ramp(release + frames(150, fps), release + frames(850, fps));

  const ctaPulse = 0.5 + 0.5 * Math.sin((frame / (1.4 * fps)) * tau);
  const liveDot = 0.5 + 0.5 * Math.sin((frame / (0.9 * fps)) * tau);
  const charPulse = 0.16 + 0.1 * Math.sin((frame / (1.6 * fps)) * tau);
  const fadeOut = ramp(durationInFrames - 38, durationInFrames - 4);

  // Cinematic slow push-in + a parallax drift.
  const zoom = interpolate(frame, [0, durationInFrames], [1.0, 1.055], { easing: ease });
  const driftX = s(8) * Math.sin((frame / (12 * fps)) * tau);
  const charDx = interpolate(charIn, [0, 1], [s(46), s(-12)]);

  return (
    <AbsoluteFill style={{ background: '#020203' }}>
      <AbsoluteFill style={{ transform: `scale(${zoom})`, transformOrigin: '50% 46%' }}>
        <BillboardStageBg warmth={1} driftX={driftX} />

        <Slate label="07 · OFFER" accent={billboard.primary} />

        {/* focus pull that releases to reveal the offer */}
        <AbsoluteFill
          style={{
            backdropFilter: `blur(${blur * s(6)}px)`,
            WebkitBackdropFilter: `blur(${blur * s(6)}px)`,
            background: `rgba(8,3,2,${blur * 0.32})`,
            zIndex: 20,
          }}
        />
        {/* energy glow behind the guide */}
        <AbsoluteFill style={{ zIndex: 20, opacity: charIn, background: `radial-gradient(ellipse 32% 56% at 82% 62%, rgba(232,93,58,${charPulse}) 0%, transparent 60%)` }} />
        {/* the Sentinel presents — right, stays */}
        <Sentinel variant="billboard" pose={1} side="right" height={s(410)} opacity={charIn * 0.97} zIndex={22} dx={charDx} />

        {/* caption — LEFT, clears the character, then lifts */}
        <KineticHeadline
          words={HEADLINE}
          accentIndices={HEADLINE_ACCENTS}
          accentGradient={ORANGE_GRADIENT}
          startFrame={headlineAt}
          exitAt={release}
          fontSize={38}
          top="40%"
          left="6%"
          right="40%"
          translateYPct={-50}
          transformOrigin="center center"
          tiltX={2}
          tiltY={0}
          align="left"
          enterX={0}
          zIndex={32}
        />

        {/* the offer — revealed crisp, centred, built to convert */}
        <div
          style={{
            position: 'absolute',
            left: '41%',
            top: '52%',
            transform: `translate(-50%, calc(-50% + ${(1 - offerIn) * s(16)}px))`,
            opacity: offerIn,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: s(13),
            zIndex: 33,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: s(10), fontFamily: mono, fontSize: s(16), letterSpacing: '0.2em', fontWeight: 700, color: '#fff', whiteSpace: 'nowrap' }}>
            <span style={{ width: s(8), height: s(8), borderRadius: '50%', background: '#ef4444', boxShadow: `0 0 ${s(12)}px rgba(239,68,68,${0.5 + 0.5 * liveDot})` }} />
            SEASON <span style={{ color: billboard.primary }}>02</span> IS LIVE
          </div>
          <div style={{ fontFamily: mono, fontSize: s(12.5), letterSpacing: '0.1em', color: 'rgba(240,242,244,0.72)', display: 'flex', gap: s(10), alignItems: 'center', whiteSpace: 'nowrap' }}>
            <span><b style={{ color: billboard.primary }}>50 OF 50</b> SLOTS OPEN</span>
            <span style={{ color: `${billboard.primary}88` }}>◆</span>
            <span>PRODUCTION INCLUDED</span>
          </div>
          <div style={{ fontFamily: mono, fontSize: s(12.5), letterSpacing: '0.1em', color: 'rgba(240,242,244,0.72)', display: 'flex', gap: s(10), alignItems: 'center', whiteSpace: 'nowrap' }}>
            <span>STANDARD <b style={{ color: '#fff' }}>$200</b></span>
            <span style={{ color: `${billboard.primary}88` }}>◆</span>
            <span>PRIORITY <b style={{ color: '#fff' }}>$350</b></span>
            <span style={{ color: `${billboard.primary}88` }}>◆</span>
            <span>CURATED, NOT VOTED</span>
          </div>
          <div
            style={{
              marginTop: s(6),
              fontFamily: mono,
              fontSize: s(16),
              fontWeight: 700,
              letterSpacing: '0.1em',
              color: '#fff',
              padding: `${s(14)}px ${s(30)}px`,
              borderRadius: s(8),
              background: `linear-gradient(135deg, ${billboard.primary}, #C7472B)`,
              boxShadow: `0 0 ${s(22 + 20 * ctaPulse)}px rgba(232,93,58,${0.42 + 0.28 * ctaPulse})`,
            }}
          >
            APPLY FOR SEASON 02 →
          </div>
          <div style={{ fontFamily: mono, fontSize: s(12), letterSpacing: '0.16em', color: 'rgba(240,242,244,0.5)' }}>avenirreym.com/billboard</div>
        </div>

        <Atmosphere vignette={0.52} grain={0.05} topFade={false} />
      </AbsoluteFill>

      <AbsoluteFill style={{ background: '#000', opacity: fadeOut, zIndex: 60 }} />
    </AbsoluteFill>
  );
};

export default Frame07Offer;
