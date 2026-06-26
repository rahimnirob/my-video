# BILLBOARD — Live State Reference

> Cinematic seasonal video broadcast. The paid monetization layer of Avenir.
> URL: `avenirreym.com/billboard`

---

## What Billboard Is

Billboard is a 30-day cinematic broadcast season. A curated rotation of product videos plays back-to-back in a full-bleed cinematic player — vignette, film grain, scanlines, ON AIR pulse — with a JetBrains Mono telemetry strip overhead and a slow ticker at the bottom.

When you "go live on Billboard," your product enters the rotation for the season. Other founders watching Billboard see your trailer + feature video. The season ends. Your slot is archived to that season's permanent grid. Every season ever broadcast stays browsable, forever.

It is not an ad slot. It is a 30-day curated broadcast, archived permanently as part of Avenir's editorial record.

### The "Avenir Launch Kit" framing

Billboard is positioned to founders as **the modern launch alternative** — Avenir's answer to "I just launched my product, where does it go?" Compared to a 24-hour Product Hunt cycle:

- **Real production** (video we make, not a screenshot grid).
- **Real season window** (30 days of rotation, not 24 hours of voting).
- **Real archive** (permanently browsable, not buried in a graveyard).
- **Real story** (cinematic format with trailer + feature video, not a card).

When the marketing copy invokes "your launch," that's Billboard. When it says "your slot," that's Billboard. The slot is the unit of sale.

---

## Current Tiers & Pricing (LIVE — not deprecated)

The system was originally 3-tier (Standard / Featured / Prime). It is now **2-tier** as of Migration 015 / Season 01 Enhanced. The old tiers are gone. Anything you read about "Featured" or "Prime" or "$500 tier" is outdated.

### Standard — $200 / season
- Broadcast rotation at 1× weight
- Permanent archive slot
- Analytics dashboard
- Billboard badge on the founder's Pulse product card

### Priority — $350 / season  *(recommended)*
- Everything in Standard
- **2× rotation weight** — appears twice as often as Standard slots in the broadcast
- Priority placement in the season grid (priority-first sort)
- **Flagged for X / social amplification** — the admin Social Queue picks Priority slots up for Avenir's X account to amplify

Both tiers run for the full 30-day season. Both end up in the permanent archive. Priority is a rotation-frequency + social-distribution upgrade, not a "better archive."

---

## The Template Production Service

For founders without a video, Billboard offers Template Production — **we produce the trailer and feature video from scratch.**

### What's included
- A 5-minute creative brief filled by the founder after approval.
- Avenir's team produces both videos from the brief.
- Four production styles to choose from:
  - **SIGNAL** — typography-forward, motion graphics, product UI in context, no talking head. Built from data and design.
  - **CLARITY** — story-first. Founder narration over a clean product demo.
  - **EDGE** — cinematic. High contrast, dramatic pacing, film grain. Made to stop the scroll.
  - **SEQUENCE** — demo-centric. Screen recordings + UI overlays + annotations. Perfect for dev tools.

### What it costs **this season**
**Included in the slot price.** $0 extra. No camera, no editing, no upcharge. Founders pick a style during the application, brief us after approval, and the team produces it.

This is the "no video? we handle it" pitch — and it is real, in-house, this-season-only-or-until-otherwise-stated value. If your audience hears "I don't have a video," the answer is: Avenir makes it.

### Alternative: self-submit
If you have your own video, you submit two YouTube links during the application — a trailer URL and a feature URL. Same approval flow. Same slot.

---

## Application → Broadcast Flow (as built)

1. **Apply** — `/billboard/apply/form?tier=standard` or `?tier=priority`
   - 2-step form: product info → review & pay-once-approved.
   - Pick tier, fill the 3-minute form, choose Template Production *or* self-submit two YouTube links.
   - **No payment at this stage.**
   - Status: `pending`.

2. **We review · 48h target** — Avenir admin queue
   - Quality checklist runs in the admin Billboard Review Modal.
   - Outcomes: `approved`, `rejected`, `revision_requested` (with revision note back to founder).

3. **Pay to lock the slot** — invoice sent by email after approval
   - LemonSqueezy checkout for the chosen tier ($200 or $350).
   - Status moves from `approved` → `pending_payment` → on webhook confirmation → `scheduled`.
   - **Full refund if anything falls through** post-payment.

4. **Go live** — broadcast day
   - Status moves to `live` when the season's rotation includes the slot.
   - Priority slots get 2× rotation weight; Standard get 1×.
   - Priority slots auto-flag for the X amplification queue (`flagged_for_x = true`).

5. **Archive** — end of season
   - Status moves to `archived`.
   - Slot remains in the season grid at `/billboard/season/[seasonId]` — permanently.

### Policies in plain language
- No payment until approved.
- Full refund if rejected after payment.
- One application per product per season.
- Quality bar on video (resolution, audio, clarity) — enforced at review.
- Priority = 2× rotation weight, **not** guaranteed first slot.
- Template Production brief must arrive within 7 days of approval.

---

## DB / Token Flow (brief — context only)

For the marketing instance, just enough to be accurate when describing the mechanics:

**Core tables (live):**
- `billboard_seasons` — one row per season. Columns: `season` (YYYY-MM), `status` (`upcoming` / `accepting` / `active` / `archived`), `standard_slots`, `standard_filled`, `priority_slots`, `priority_filled`, `starts_at`, `ends_at`.
- `billboard_applications` — one row per founder application. Columns include `tier` (`standard` / `priority`), `status` (`pending_payment` / `pending` / `approved` / `rejected` / `revision_requested` / `scheduled` / `live` / `archived`), `founder_x_handle`, `flagged_for_x`, `thumbnail_url`, `trailer_url`, `feature_url`, `revision_note`, `reviewed_by`.
- `billboard_videos` — the broadcast rotation table. Columns include `rotation_weight` (1 for Standard, 2 for Priority), `is_house_content` (for Avenir's own promo slots that play between paid slots), `season`, `tier`, `status`.

**Status transitions (canonical):**
```
pending → approved → pending_payment → scheduled → live → archived
            ↓
        rejected
            ↓
       revision_requested → (back to pending after founder updates)
```

**Tier enum:** `('standard', 'priority')` — the old `('featured', 'prime')` values have been migrated to `priority` and removed from the enum.

---

## Season 01 — Actual Outcome

**Season:** `2026-05` (May 2026)
**Status:** Archived
**Allotted:** 50 slots — 30 Standard + 20 Priority
**Filled:** **17 broadcasts** — **14 Standard + 3 Priority**

This was the inaugural season. We ran it as a soft fill — not pushing for the full 50 — to establish the broadcast format, the production pipeline, and the archive UX. Every one of those 17 slots is now permanently visible in the Season 01 archive grid at `/billboard/season/2026-05`.

When marketing Billboard, treat Season 01 as the *proof season*: the format works, the archive is real, the broadcast has aired. The honest number to use is **17 products broadcast and permanently archived**.

---

## Season 02 — Current State

**Season:** `2026-06` (June 2026)
**Status:** Active — currently broadcasting
**Allotted:** 50 slots — 30 Standard + 20 Priority
**Filled:** 0 (as of 2026-06-04 — just opened)

Season 02 is the active marketing target right now. Founders can apply at `/billboard/apply` and slots are wide open. The recommended push:

- **"Apply now to broadcast in Season 02."**
- "50 slots. Standard $200 / Priority $350. Template Production included."
- "Season 01 archived 17 product launches. Season 02 is live and open."

### Looking ahead — Season 03
`2026-07` (July 2026): upcoming, 50 slots seeded (35 Standard + 15 Priority). Use as the "next season" reference when Season 02 fills.

---

## The Core Value: Pay Once, Stay Visible Forever

The single most important Billboard message — and the one that separates it from a Product Hunt launch, an ad spot, or a Twitter promotion:

> **Your slot doesn't expire. Ever.**

When you pay for a Billboard slot:

1. You get 30 days in active broadcast rotation. Other founders watching `/billboard` see your trailer + feature video.
2. At the end of the season, your slot moves from "rotation" to "archive" — but **stays in the season grid**, visible to anyone who lands on that season's URL.
3. Every future visitor who scrolls back through Avenir's archived seasons sees your slot, exactly as it aired. It is a permanent record that your product launched on Avenir Billboard.
4. There is no "delete after a year." There is no "premium tier required to keep it visible." There is no decay.

Compare to the alternatives a founder has:
- **Product Hunt launch:** 24 hours of visibility, then algorithmic decay. Page still exists, but nobody finds it.
- **Twitter/X ad spend:** spend $200, get impressions for a week, then the impressions stop the moment the budget stops.
- **Self-hosted video:** lives on your channel — undiscovered unless your audience already knows you.
- **Billboard:** $200 once, 30 days of curated broadcast, **permanent archive on a real publication**.

That's the pitch. Pay once. Stay visible forever. The slot is yours.
