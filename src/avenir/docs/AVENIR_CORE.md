# AVENIR — Core Reference

> Domain: **avenirreym.com**
> Status: Live · Season 02 currently broadcasting (June 2026)

---

## What Avenir Is

Avenir is a curated distribution layer for serious products. It is not a social network, not a marketplace, not a community feed. It is infrastructure: a calm, human-curated place where the products people actually build get permanent, structured visibility — through editorial features, founder-defined market categories, and a cinematic seasonal video broadcast.

One sentence: **the calm internet's home for serious products.**

---

## The Problem We Solve

Modern product distribution is a launch-day cliff.

- You ship → you "launch" on a feed-based platform → you get 24 hours of engagement bait → the algorithm buries you → your page is functionally invisible by day 3.
- Every founder runs the same 24-hour marathon. Every product gets the same lifecycle. Quality and effort don't matter; comment timing does.
- After launch day, finding a product that shipped two months ago means digging through a graveyard of timestamps.

Product discovery has decayed into a leaderboard sport. Avenir is the opposite of that.

**Our position:** if your product is good, it should still be findable, readable, and broadcastable a year after launch — at the same depth as launch day. Not a screenshot in a feed. A real page. A real archive. A real record.

---

## Who We Are Beating: Product Hunt

Product Hunt is the incumbent. We are not trying to be a better Product Hunt. We are deliberately the opposite of it on every axis that matters:

| | Product Hunt | Avenir |
|---|---|---|
| **Surface logic** | Algorithmic + upvote leaderboard | Manual editorial curation |
| **Lifecycle** | 24-hour launch day, then decay | Permanent visibility, archived forever |
| **Sorting** | Real-time engagement | Editor's intent; no public vote counts |
| **Tone** | Hunter comments, badges, streaks | No social metrics, no comments, no follows |
| **Monetization** | Ads + boosted placements muddled with rank | Separate (Billboard) — never affects curation |
| **Discovery** | Scroll feed | Carousel + editorial Picks + market categories + broadcast |
| **Format** | One product card | Product page + editorial deep-dive + season video + market context |
| **Aesthetic** | Bright, social, gamified | Cinematic, monospace, calm |

The case to a founder is simple: on PH you get one day. On Avenir you get a page, a record, a season, and a slot in a market category — and none of it expires.

---

## The Four Systems

Avenir runs as four interlocking systems. Together they form a flywheel — discovery, validation, context, broadcast — with the same product moving through each layer.

### 1. The Pulse — `/pulse`
The primary product discovery interface.

- Curated, searchable database of approved products.
- 3-card carousel UX: left / center spotlight / right. Click side cards to shift, arrow keys, or terminal commands (`>`, `<`, `>>>`).
- Every approved product has a permanent detail page.
- Submission is free. Every submission is manually reviewed.
- **Live state:** 26 approved products. Open for submissions.

### 2. The Picks — `/picks`
Editorial deep-dive features. The Avenir voice.

- Long-form, multi-section editorial pieces on a single product.
- Each Pick includes an assessment with section-by-section scores (1–5 bar visual).
- Sections: typically Vision, Execution, Design, Defensibility, Why-now (varies per pick).
- A "PICK" badge attaches to that product everywhere else on Avenir (Pulse cards, founder profile, market listing).
- Picks are written by the Avenir team, not user-submitted. You cannot "apply to be Picked."
- **Live state:** 4 published Picks.

### 3. Marketspace — `/markets`
Founder-defined market categories with editorial structure.

- Markets are not tags. They are formal categories with a steward (the founder who created it), a defined thesis, a curated list of products belonging to it, and a "join" application flow for other products who want in.
- Creating a market is paid (one-time fee via LemonSqueezy).
- Joining a market is paid (per-product, per-market — gated by steward approval).
- Each market has its own detail page, product list, and steward profile.
- **Live state:** 5 active markets — IAO, AI Tools, AI Systems, Data Systems, Infrastructure.

### 4. Billboard — `/billboard`
Cinematic seasonal video broadcast.

- A 30-day "season" runs a curated rotation of product videos in a full-bleed cinematic player.
- Two paid tiers: **Standard ($200/season)** and **Priority ($350/season, 2× rotation weight + social amplification flag)**.
- "Template Production" service: founders without a video brief us, and we produce it from scratch — **included in the slot price this season**.
- Every aired slot lands in the permanent season archive — every season grid stays browsable forever.
- **Live state:** Season 02 (June 2026) actively broadcasting. Season 01 archived. See `BILLBOARD_LIVE_STATE.md`.

### How the four systems connect (the flywheel)

```
   submit free →  THE PULSE  ←  permanent home base
                       ↓
   editorial selects → THE PICKS  →  badge attaches to product everywhere
                       ↓
   join a market   → MARKETSPACE  →  category context + steward distribution
                       ↓
   pay a slot     →  BILLBOARD    →  cinematic broadcast + permanent archive
```

A founder can enter at any layer. Most enter at Pulse (free) and graduate into Markets (paid join) and Billboard (paid broadcast). Picks are top-down; they reach down into the stack.

The unifying rule across all four: **once you are in, you stay in.** Nothing rotates off. Nothing expires. Nothing decays.

---

## Core Philosophy

These are not slogans. They are the operating constraints of every system we build:

1. **Curation over volume.** Submissions are manually reviewed. No automated approval. We would rather show 26 products well than 26,000 badly. Quality is a filter, not a leaderboard.

2. **Permanence over decay.** Nothing is a feed. Nothing rotates off. Everything is archived structurally — Pulse pages, Picks features, market listings, billboard slots. You can link to anything Avenir has ever published and it will still load, exactly as it aired.

3. **Merit over upvotes.** There are no upvotes. No likes. No comment threads. No follower counts. No vanity metrics visible to anyone. Visibility is decided by editors and curators, not by who shows up at the right minute of the day.

4. **Calm over noise.** The visual system is cinematic, monochrome, monospace where it counts. No autoplay everywhere, no notification badges screaming, no growth-hacky CTAs. The platform should feel like a quiet, premium publication — not a launch day.

5. **Separated monetization.** Money never buys editorial position. Billboard slots and Market fees are explicit, transparent, and live on separate surfaces from Pulse and Picks. No "boosted" Pulse cards. No "sponsored" Picks. Ever.

---

## Who Avenir Is For

- **Serious founders** shipping real product — devtools, infrastructure, AI systems, well-thought consumer tools.
- **Indie + small-team builders** who don't want their year of work reduced to a 24-hour Product Hunt thrash.
- **Designers, engineers, and operators** browsing for tools that will still matter in a quarter.
- **Founders who have already "launched" on PH** and want a permanent place for the product to live.
- **Anyone tired of feed-based product discovery.**

## Who Avenir Is NOT For

- **Growth-hackers** looking for upvote farms or viral metrics — we do not have them.
- **Hype merchants** — there is no leaderboard to game, no badge collection.
- **Demo-day pitches with no product** — we curate; vaporware doesn't pass review.
- **Mass-market consumer apps** seeking algorithmic reach to millions — wrong audience, wrong format.
- **Anyone who wants their product to "go viral by Tuesday"** — Avenir compounds over months and years.

---

## Current Platform State (as of 2026-06-04)

- **Live URL:** avenirreym.com
- **Approved products:** 26 (in Pulse)
- **Founders:** 40
- **Published Picks:** 4
- **Active Markets:** 5
- **Billboard broadcasts (all-time):** 17 archived slots

### Billboard season status
- **Season 01 (May 2026):** Archived. 17 products broadcast — 14 standard + 3 priority — out of 50 allotted slots. This was the launch season; we ran with a soft fill and now have a permanent archive of every product that aired.
- **Season 02 (June 2026):** Currently active. Open and accepting applications. Slots opening up — this is the season we are marketing into right now.
- **Season 03 (July 2026):** Upcoming. 35 standard + 15 priority slots seeded.

### What is wired up end-to-end
- Authentication, founder profiles, dashboard, admin panel.
- Pulse submission → admin review queue → approve / revise / reject → notification email.
- Picks publishing pipeline (admin-only).
- Markets creation, join requests, steward approval, payment via LemonSqueezy.
- Billboard application → admin quality review → approval → invoiced payment → slot lock → broadcast.
- Permanent season archive.
- Social-amplification queue on the admin side for Priority slots.
