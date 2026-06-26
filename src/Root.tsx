import './index.css';
import { Composition } from 'remotion';
import { V2_RawTest, V1_BillboardCinematic } from './avenir';
import { OnAirExplainer } from './avenir/onair';
import { BEATS } from './avenir/onair/beats';
import { TerminalNav } from './avenir/terminalnav';
import { TerminalNavV2 } from './avenir/terminalnav2';
import { PHComparison } from './avenir/phcomparison';
import { Archived17, TOTAL_FRAMES as ARCHIVED_FRAMES } from './avenir/archived';
import { WhatWeBroadcast } from './avenir/broadcast/WhatWeBroadcast';
import { TOTAL_FRAMES as BROADCAST_FRAMES } from './avenir/broadcast/constants';
import { EllaIntro, TOTAL_FRAMES as ELLA_FRAMES } from './avenir/ella';
import { AresIntro, TOTAL_FRAMES as ARES_FRAMES } from './ares';
import { FounderSignalIntro } from './foundersignal/FounderSignalIntro';
import { TOTAL_FRAMES as FSIGNAL_FRAMES } from './foundersignal/foundersignal-tokens';
import { BillboardPromo, TOTAL_FRAMES as PROMO_FRAMES } from './avenir/broadcast/BillboardPromo';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* AresIntro — 20s cinematic product intro: "One Place." (AI OS for Builders) */}
      <Composition
        id="AresIntro"
        component={AresIntro}
        durationInFrames={ARES_FRAMES}
        fps={30}
        width={1920}
        height={1080}
      />
      {/* EllaIntro — 29s mute-first SaaS explainer: "Build what people actually want." */}
      <Composition
        id="EllaIntro"
        component={EllaIntro}
        durationInFrames={ELLA_FRAMES}
        fps={30}
        width={1920}
        height={1080}
      />
      {/* FounderSignalIntro — 28s SaaS explainer: "Stop guessing. Start validating." */}
      <Composition
        id="FounderSignalIntro"
        component={FounderSignalIntro}
        durationInFrames={FSIGNAL_FRAMES}
        fps={30}
        width={1920}
        height={1080}
      />
      {/* BillboardPromo — 35.7s premium product explainer: "Launch once. Stay visible forever." */}
      <Composition
        id="BillboardPromo"
        component={BillboardPromo}
        durationInFrames={PROMO_FRAMES}
        fps={30}
        width={1920}
        height={1080}
      />
      {/* WhatWeBroadcast — 20s 16:9 Billboard converter (LumeX): "We build it for you." */}
      <Composition
        id="WhatWeBroadcast"
        component={WhatWeBroadcast}
        durationInFrames={BROADCAST_FRAMES}
        fps={30}
        width={1920}
        height={1080}
      />
      {/* Archived17 — 38s mute-first kinetic typography on the crimson stage: "We archived 17 products today." */}
      <Composition
        id="Archived17"
        component={Archived17}
        durationInFrames={ARCHIVED_FRAMES}
        fps={30}
        width={1920}
        height={1080}
      />
      {/* PHComparison — 30s mute-first kinetic typography: PH's 24h vs Avenir's permanent archive. */}
      <Composition
        id="PHComparison"
        component={PHComparison}
        durationInFrames={900}
        fps={30}
        width={1920}
        height={1080}
      />
      {/* TerminalNavV2 — 36s Anthropic-style kinetic-typography cut (the upgrade). */}
      <Composition
        id="TerminalNavV2"
        component={TerminalNavV2}
        durationInFrames={1080}
        fps={30}
        width={1920}
        height={1080}
      />
      {/* TerminalNav — 40s RAW marketing video: "Avenir runs on commands, not menus." */}
      <Composition
        id="TerminalNav"
        component={TerminalNav}
        durationInFrames={1200}
        fps={30}
        width={1920}
        height={1080}
      />
      {/* On-Air explainer — built one beat at a time; duration = beats wired so far. */}
      <Composition
        id="OnAirExplainer"
        component={OnAirExplainer}
        durationInFrames={BEATS.offer.from + BEATS.offer.durationInFrames}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="V2-RawTest"
        component={V2_RawTest}
        durationInFrames={900}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="V1-BillboardCinematic"
        component={V1_BillboardCinematic}
        durationInFrames={1800}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
