import React from 'react';
import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import {
  EASE_SMOOTH,
  REGISTER,
  billboard,
  billboardStage,
  frames,
  motion,
  sora,
} from '../../tokens';

export const register = REGISTER.CINEMATIC;

export type BillboardStageProps = {
  /** Override the ambient image path. */
  imageSrc?: string;
  /** Optional watermark override. */
  watermarkText?: string;
};

const BillboardStage: React.FC<BillboardStageProps> = ({
  imageSrc = staticFile(billboardStage.ambientImage.src.replace(/^\//, '')),
  watermarkText = billboardStage.watermark.text,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const ease = Easing.bezier(...EASE_SMOOTH);

  const imageOpacity = interpolate(
    frame,
    [0, frames(motion.imageFadeIn, fps)],
    [0, billboardStage.ambientImage.opacity],
    { easing: ease, extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
  );

  const watermarkDelay = frames(motion.watermarkDelay, fps);
  const watermarkIn = frames(motion.watermarkIn, fps);
  const watermarkOpacity = interpolate(
    frame - watermarkDelay,
    [0, watermarkIn],
    [0, 1],
    { easing: ease, extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
  );

  return (
    <AbsoluteFill style={{ background: billboard.void }}>
      <AbsoluteFill style={{ opacity: imageOpacity }}>
        <Img
          src={imageSrc}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: billboardStage.ambientImage.objectPosition,
            filter: billboardStage.ambientImage.filter,
          }}
        />
      </AbsoluteFill>

      <AbsoluteFill style={{ background: billboardStage.sculptVertical, pointerEvents: 'none' }} />
      <AbsoluteFill style={{ background: billboardStage.sculptHorizontal, pointerEvents: 'none' }} />

      <AbsoluteFill
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
          opacity: watermarkOpacity,
        }}
      >
        <span
          style={{
            fontFamily: sora,
            fontSize: 240,
            fontWeight: billboardStage.watermark.weight,
            letterSpacing: billboardStage.watermark.letterSpacing,
            lineHeight: billboardStage.watermark.lineHeight,
            transform: billboardStage.watermark.transform,
            backgroundImage: billboardStage.watermark.fill,
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            WebkitTextStroke: billboardStage.watermark.stroke,
            textShadow: billboardStage.watermark.textShadow,
            textTransform: 'capitalize',
          }}
        >
          {watermarkText}
        </span>
      </AbsoluteFill>

      <div
        style={{
          position: 'absolute',
          inset: 0,
          height: '14%',
          background: billboardStage.topFade,
          pointerEvents: 'none',
        }}
      />
    </AbsoluteFill>
  );
};

export default BillboardStage;
