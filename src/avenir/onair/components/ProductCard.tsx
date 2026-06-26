import React from 'react';
import { sora, manrope, mono } from '../../tokens';
import { s } from '../layout';
import type { Product } from '../products';

/**
 * ProductCard — the glassmorphic aurora protagonist card (§7).
 * `state` drives the signature bleed/flood: `alive` = full color, `grey` =
 * drained. Frames 02/03/04 will animate between these; Frame 01 uses `alive`.
 */

export type ProductCardState = 'alive' | 'draining' | 'grey' | 'igniting';

export type ProductCardProps = {
  product: Product;
  state?: ProductCardState;
  /** 0 = full color, 1 = fully drained to grey. Overrides `state` when set. */
  drain?: number;
  width?: number;
  /** Entrance shine sweep, 0→1 drives a light band across the card (>1/undef = off). */
  shine?: number;
  /** Built-in accent outer glow. Disable to drive the glow from the scene. */
  glow?: boolean;
};

/** Render a mono stat string with **bold** tokens highlighted white. */
const StatLine: React.FC<{ text: string }> = ({ text }) => {
  const parts = text.split('**');
  return (
    <span
      style={{
        fontFamily: mono,
        fontSize: s(10),
        color: 'rgba(255,255,255,0.7)',
        letterSpacing: '0.02em',
      }}
    >
      {parts.map((p, i) =>
        i % 2 === 1 ? (
          <b key={i} style={{ color: '#fff', fontWeight: 600 }}>
            {p}
          </b>
        ) : (
          <React.Fragment key={i}>{p}</React.Fragment>
        ),
      )}
    </span>
  );
};

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  state = 'alive',
  drain,
  width = 230,
  shine,
  glow = true,
}) => {
  const drainAmt =
    drain ?? (state === 'grey' ? 1 : state === 'draining' ? 0.6 : 0);
  const cardFilter =
    drainAmt > 0
      ? `grayscale(${drainAmt}) saturate(${1 - 0.7 * drainAmt}) brightness(${1 - 0.15 * drainAmt})`
      : 'none';
  const alive = 1 - drainAmt;

  const shineActive = shine != null && shine > 0 && shine < 1;
  const bandX = shineActive ? -160 + 420 * (shine as number) : 0;
  const bandOpacity = shineActive ? Math.sin((shine as number) * Math.PI) * 0.9 : 0;

  return (
    <div
      style={{
        position: 'relative',
        width: s(width),
        borderRadius: s(20),
        overflow: 'hidden',
        background: 'rgba(13,16,24,0.55)',
        border: '1px solid rgba(255,255,255,0.10)',
        backdropFilter: `blur(${s(14)}px)`,
        WebkitBackdropFilter: `blur(${s(14)}px)`,
        boxShadow: `0 ${s(20)}px ${s(50)}px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)${glow ? `, 0 0 ${s(52)}px ${product.accent}${alive > 0.5 ? '22' : '08'}` : ''}`,
        filter: cardFilter,
      }}
    >
      {/* aurora — blurs + desaturates as it dies (color bleeds out) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          filter: `blur(${s(2 + 8 * drainAmt)}px) saturate(${1 - drainAmt})`,
          transform: `translateY(${s(10) * drainAmt}px) scaleY(${1 + 0.15 * drainAmt})`,
          background: product.aurora,
        }}
      />
      {/* glass overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          background:
            'linear-gradient(160deg, rgba(10,12,18,0.18), rgba(10,12,18,0.55))',
        }}
      />
      {/* left accent spine (brand glass signature) */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: '12%',
          bottom: '12%',
          width: s(2.5),
          zIndex: 3,
          background: `linear-gradient(180deg, transparent, ${product.accent}, transparent)`,
          boxShadow: `0 0 ${s(10)}px ${product.accent}`,
          opacity: 0.75 * alive,
        }}
      />
      {/* shine sweep band */}
      {shineActive && (
        <div
          style={{
            position: 'absolute',
            top: '-20%',
            left: 0,
            width: '40%',
            height: '140%',
            zIndex: 4,
            pointerEvents: 'none',
            transform: `translateX(${bandX}%) skewX(-12deg)`,
            background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.05), ${product.accent}14, rgba(255,255,255,0.05), transparent)`,
            filter: `blur(${s(1)}px)`,
            opacity: bandOpacity,
          }}
        />
      )}
      {/* body */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          padding: `${s(18)}px ${s(18)}px ${s(16)}px`,
        }}
      >
        <div
          style={{
            fontFamily: sora,
            fontWeight: 700,
            fontSize: s(21),
            color: '#fff',
            letterSpacing: '-0.01em',
          }}
        >
          {product.name}
        </div>
        <div
          style={{
            fontFamily: manrope,
            fontSize: s(12),
            color: 'rgba(255,255,255,0.62)',
            marginTop: s(5),
          }}
        >
          {product.desc}
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: s(8),
            marginTop: s(16),
          }}
        >
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: s(6),
              padding: `${s(6)}px ${s(11)}px`,
              borderRadius: s(20),
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.14)',
              fontFamily: mono,
              fontSize: s(9),
              letterSpacing: '0.1em',
              color: '#fff',
              textTransform: 'uppercase',
            }}
          >
            <span
              style={{
                width: s(5),
                height: s(5),
                borderRadius: '50%',
                background: product.pillDot,
                boxShadow: `0 0 ${s(8)}px ${product.pillDot}`,
              }}
            />
            {product.pillLabel}
          </span>
          <StatLine text={product.stat} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
