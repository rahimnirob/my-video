import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { SCENES, ramp } from './constants';
import { KineticText } from '../archived/components';
import { anton } from '../archived/fonts';
import { mono } from '../tokens';
import { lumexFill, LUMEX_SHADOW, LUMEX_LIVE, lumex } from '../lumex';
import BroadcastBg from './components/BroadcastBg';
import LumexPlayer from './components/LumexPlayer';

/**
 * WhatWeBroadcast — 20s (600f) Billboard converter, 1920×1080, LumeX palette.
 * Kills "I don't have a video" by SHOWING the player with a product slot live
 * inside it (INTRO 0:20 → cut → FEATURE 1:30), not abstract bars. Soft crimson
 * typography on two bleeded orbs over black.
 */

/* Shared LumeX type props for KineticText. */
const TYPE = { fillFn: lumexFill, glow: LUMEX_SHADOW } as const;

/* Scene 02 — the live player (two slots). */
const PlayerScene: React.FC = () => {
  const frame = useCurrentFrame();
  if (frame < SCENES.bars.from - 2 || frame > SCENES.bars.to + 2) return null;
  const appear = ramp(frame, 120, 142);
  const exit = 1 - ramp(frame, 450, 465);
  // INTRO slot, then a cut to the FEATURE slot in the same player.
  const isFeature = frame >= 288;
  const durationLabel = isFeature ? '1:30' : '0:20';
  const sectionLabel = isFeature ? 'FEATURE EXPLAINER' : 'INTRO';
  const progress = isFeature ? ramp(frame, 300, 440) : ramp(frame, 150, 280);
  // A 3-frame dip at the cut so the slot change reads as a cut, not a glitch.
  const cutDip = 1 - interpolate(frame, [285, 288, 291], [0, 0.55, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const caption = isFeature ? 'THE 90-SECOND FEATURE EXPLAINER' : 'THE 20-SECOND INTRO';

  return (
    <AbsoluteFill style={{ opacity: exit * cutDip }}>
      {/* upper caption — what's playing in the slot */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: '13.5%',
          textAlign: 'center',
          fontFamily: mono,
          fontSize: 26,
          letterSpacing: '0.3em',
          color: lumex.brightGray,
          opacity: 0.7 * appear,
        }}
      >
        {caption}
      </div>
      {/* the player, centred */}
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
        <LumexPlayer
          width={1160}
          productName="LumiX"
          screen={isFeature ? 'feature' : 'intro'}
          durationLabel={durationLabel}
          sectionLabel={sectionLabel}
          progress={progress}
          appear={appear}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/* Scene 04 — CLOSE: line, then wordmark + on-air dot. */
const CloseScene: React.FC = () => {
  const frame = useCurrentFrame();
  if (frame < SCENES.close.from - 2) return null;
  const wmStart = 566;
  const wm = ramp(frame, wmStart, wmStart + 18);
  const halo = ramp(frame, wmStart, wmStart + 30);
  const dot = interpolate(frame, [wmStart, wmStart + 7, wmStart + 15, wmStart + 23, wmStart + 31], [0.3, 1, 0.35, 1, 0.65], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return (
    <>
      <KineticText
        text={'30 days live. Forever archived.'}
        startFrame={544}
        mode="flow"
        reveal="focus"
        fontSize={74}
        top="38%"
        maxWidth={1400}
        perWordF={4}
        enterF={12}
        {...TYPE}
      />
      <div style={{ position: 'absolute', left: 0, right: 0, top: '60%', display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: wm }}>
        <div
          style={{
            position: 'absolute',
            width: 1000,
            height: 360,
            top: '-32%',
            borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(224,82,111,0.2) 0%, transparent 70%)',
            opacity: halo,
            filter: 'blur(22px)',
          }}
        />
        <div
          style={{
            width: 15,
            height: 15,
            borderRadius: '50%',
            background: LUMEX_LIVE,
            marginBottom: 26,
            boxShadow: `0 0 ${10 + dot * 20}px rgba(255,0,80,${0.4 + dot * 0.55})`,
          }}
        />
        <div style={{ fontFamily: anton, fontSize: 110, letterSpacing: '0.06em', whiteSpace: 'nowrap', filter: LUMEX_SHADOW, ...lumexFill(frame, 46) }}>
          AVENIR BILLBOARD
        </div>
      </div>
    </>
  );
};

export const WhatWeBroadcast: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: lumex.void }}>
      <BroadcastBg />

      {/* 01 — HOOK */}
      <KineticText
        text={"You don't need a video to apply."}
        startFrame={6}
        mode="flow"
        reveal="focus"
        fontSize={84}
        top="40%"
        maxWidth={1500}
        perWordF={5}
        enterF={14}
        exitAt={96}
        exitF={18}
        exitStyle="blackout"
        {...TYPE}
      />
      <KineticText
        text={'We build it for you.'}
        startFrame={58}
        mode="flow"
        reveal="focus"
        fontSize={132}
        top="56%"
        maxWidth={1500}
        perWordF={6}
        enterF={16}
        exitAt={102}
        exitF={18}
        exitStyle="blackout"
        {...TYPE}
      />

      {/* 02 — THE PLAYER (what they buy) */}
      <PlayerScene />

      {/* 03 — PRODUCTION FACT */}
      <KineticText
        text={'Both produced by Avenir.\nIncluded in your slot.'}
        startFrame={471}
        mode="flow"
        reveal="focus"
        fontSize={80}
        top="50%"
        maxWidth={1500}
        perWordF={5}
        enterF={14}
        lineHeight={1.24}
        exitAt={524}
        exitF={18}
        exitStyle="blackout"
        {...TYPE}
      />

      {/* 04 — CLOSE */}
      <CloseScene />
    </AbsoluteFill>
  );
};

export default WhatWeBroadcast;
