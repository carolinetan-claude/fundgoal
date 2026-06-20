# FundGoal Design System

## Visual Theme & Atmosphere

FundGoal fuses three design languages into one: Nike's sport authority, Spotify's dark card energy, and Binance's crypto urgency. The result is a platform that feels like a stadium scoreboard meets a crypto trading floor meets a Spotify playlist — dark, bold, alive.

**Mood:** High-energy, purposeful, emotionally warm
**Density:** Medium — breathing room between cards, data-dense within them
**Philosophy:** Dark surfaces let color carry meaning. Gold means money is moving. Green means a dream got funded.

---

## Color Palette & Roles

| Name | Hex | Role |
|---|---|---|
| Background | `#0a0a0a` | Page background — Nike black |
| Surface | `#141414` | Card backgrounds — Spotify dark |
| Surface Raised | `#1a1a1a` | Hover states, inner panels |
| Border | `#2a2a2a` | Subtle card edges |
| Gold | `#F0B90B` | Live pools, SOL amounts, money moving, CTAs — Binance yellow |
| Green | `#1DB954` | Funded, confirmed, success, giving complete — Spotify green |
| White | `#FFFFFF` | Headings, team names, primary text |
| Grey | `#888888` | Body text, secondary info |
| Dim | `#444444` | Labels, metadata, disabled states |
| Gold Dim | `#7a5c05` | Muted gold for backgrounds |
| Green Dim | `#0d5c26` | Muted green for backgrounds |

**The golden rule:**
- **Gold** = money is live and moving (pool open, SOL amounts, CTAs, Solscan links)
- **Green** = giving is complete (funded state, success messages, thank-you card)
- Never use both at the same time on the same element

---

## Typography Rules

| Role | Style | Example |
|---|---|---|
| Team names / Match titles | Bold, UPPERCASE, tight tracking (-0.02em) | "IVORY COAST VS GERMANY" |
| Page headings | Bold, UPPERCASE, tight tracking | "FUND A DREAM" |
| Project names | Semibold, sentence case | "Youth Academy, Abidjan" |
| Body / stories | Regular, relaxed (1.6 line-height) | Project descriptions |
| SOL amounts | Monospace or tabular figures, bold | "42.5 SOL" |
| Badges / labels | Small caps, wide tracking (0.1em), 0.7rem | "LIVE", "FUNDED", "GROUP J" |
| CTA buttons | Bold, UPPERCASE, tight tracking | "FUND THIS MATCH" |

**Font stack:** System sans-serif — `-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`
**Monospace:** `'SF Mono', 'Fira Code', 'Courier New', monospace`

---

## Component Stylings

### Match Card
- Background: `#141414`
- Border: `1px solid #2a2a2a`
- Border radius: `12px`
- Padding: `20px`
- Team names: BOLD UPPERCASE white
- Pool amount: Gold monospace
- Status badge: top-right corner
- Hover: border becomes `#F0B90B` at 40% opacity, slight lift (`translateY(-2px)`)
- CTA: full-width gold button at bottom

### Project Card (side-by-side on match page)
- Background: `#141414`
- Border: `1px solid #2a2a2a`
- Selected state: border `#F0B90B`, background `#1a1500`
- Flag emoji: 3rem
- Team name: BOLD UPPERCASE
- Project name: semibold white
- Story: grey body text
- "If [Team] wins →" label: dim small caps

### CTA Button (primary)
- Background: `#F0B90B`
- Text: `#0a0a0a`, bold, UPPERCASE
- Border radius: `8px`
- Padding: `14px 24px`
- Hover: brightness 110%, slight scale(1.02)
- Disabled: opacity 40%

### CTA Button (secondary)
- Background: transparent
- Border: `1px solid #2a2a2a`
- Text: white
- Hover: border `#F0B90B`, text `#F0B90B`

### Status Badge
- LIVE: gold background `#F0B90B`, black text, pulsing dot
- UPCOMING: `#1a1a1a` background, grey text
- FUNDED: green background `#1DB954`, black text

### Pool Counter
- Font: monospace, bold, large (1.5rem+)
- Color: `#F0B90B` while live
- Color: `#1DB954` after resolve
- Animate: count-up on load

### Charity Counter
- Always visible on every match card and match page
- Label: "♥ World Vision" in small caps grey
- Amount: gold while live, green after funded
- Sub-label: "thegivingblock.com/donate/world-vision"

### Thank-You Card
- Full dark background
- Large flag emoji (4rem)
- Team name BOLD UPPERCASE
- State-dependent accent: green for funded, gold for live
- Solscan link: gold underline
- Share button: Spotify green
- Border: `1px solid` green (funded) or gold (live)

---

## Layout Principles

- **Max width:** `1200px`, centered
- **Page padding:** `24px` mobile, `48px` desktop
- **Card grid:** 2-column on desktop, 1-column on mobile
- **Match detail:** 2-column project cards side-by-side, stacked on mobile
- **Spacing scale:** 4, 8, 12, 16, 24, 32, 48, 64px
- **Section gaps:** `48px` between major sections

---

## Depth & Elevation

- No box shadows on dark surfaces — use border color shifts instead
- Hover state: border brightens, slight translateY(-2px)
- Active/selected: filled border + tinted background
- Modal overlay: `rgba(0,0,0,0.8)` backdrop blur

---

## Do's and Don'ts

**Do:**
- Use UPPERCASE for all team names and headings — always
- Use gold for any number representing SOL or money
- Use green for any confirmed/funded state
- Show the World Vision badge on every page
- Keep cards dark — let content provide the color

**Don't:**
- Use white backgrounds anywhere
- Mix gold and green on the same element
- Use lowercase for team names
- Hide the charity counter — it's always visible
- Use rounded pill buttons — prefer `8px` radius, sport-sharp

---

## Responsive Behavior

- **Mobile (<768px):** Single column, full-width cards, stacked project cards
- **Tablet (768-1024px):** 2-column match grid
- **Desktop (>1024px):** 2-column match grid, side-by-side project cards
- **Touch targets:** Minimum 44px height on all interactive elements

---

## Agent Prompt Guide

Quick reference for building components:

```
Background: #0a0a0a
Card surface: #141414
Gold accent: #F0B90B (live/money)
Green accent: #1DB954 (funded/success)
White text: #FFFFFF
Grey text: #888888
Border: #2a2a2a

Team names: BOLD UPPERCASE white
SOL amounts: gold monospace bold
CTA: gold bg, black bold uppercase text
Status LIVE: gold badge with pulse
Status FUNDED: green badge
```

Build every page dark-first. Gold when money moves. Green when dreams get funded.
