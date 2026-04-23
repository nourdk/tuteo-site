# Tuteo Design System

**Version 1.0** · January 2026

---

## Brand Overview

### What is Tuteo?

Tuteo is a conversational language learning app designed for beginners and young adults who want to practice speaking and reach fluency. Unlike traditional language apps that rely on drills and gamification pressure, Tuteo creates a **safe, judgment-free space** — like chatting with a supportive friend who happens to be fluent.

### Brand Personality

| Trait | Expression |
|-------|------------|
| **Warm** | Approachable colors, soft edges, encouraging feedback |
| **Patient** | Never rushes the learner, celebrates small wins |
| **Friendly** | Conversational tone, casual UI, like texting a friend |
| **Supportive** | Gentle corrections, positive reinforcement |
| **Confident** | Clean design that builds trust without intimidation |

### Target Audience

- **Age:** 18–30 (young adults)
- **Level:** Beginners to intermediate learners
- **Mindset:** Want real conversation practice, not just vocabulary memorization
- **Pain points:** Fear of embarrassment, lack of native speakers to practice with, boring traditional methods

---

## Color System

### Theme: Sunset Warmth

Our palette evokes the warmth of golden hour — inviting, energizing, and optimistic. It creates an emotional environment where mistakes feel safe and progress feels rewarding.

### Background Gradient

The app uses a vertical gradient background throughout:

```
Top:    #E8D0D8  (Soft Rose)
Bottom: #F0D8A0  (Warm Gold)
```

This gradient flows from a gentle blush pink at the top to a warm, sunny gold at the bottom — creating a sense of warmth that rises up to greet the user.

### Primary Colors

| Name | Hex | Usage |
|------|-----|-------|
| **Primary** | `#C47850` | Buttons, active states, key actions, selected nav items |
| **Primary Light** | `#E8A888` | Borders, secondary buttons, accent elements, progress indicators |
| **Accent** | `#E89850` | Progress bars, highlights, success states, celebratory moments |

### Text Colors

| Name | Hex | Usage |
|------|-----|-------|
| **Text Primary** | `#4A3832` | Headlines, body text, important content |
| **Text Muted** | `#9A8078` | Secondary text, timestamps, labels, placeholders |

### Surface Colors

| Name | Value | Usage |
|------|-------|-------|
| **Card Background** | `rgba(255,252,248,0.9)` | Primary cards, stat cards, navigation bar |
| **Card Alt** | `rgba(255,245,235,0.9)` | Secondary cards, "needs practice" sections |
| **User Bubble** | `#FFFFFF` | User's chat messages |
| **AI Bubble** | `#FAE8DC` | Tuteo's chat messages — warm peach for clear differentiation |
| **Input Background** | `rgba(255,252,248,0.95)` | Text input fields |
| **Exercise Card** | `linear-gradient(180deg, #FFF8F4 0%, #FFF8E8 100%)` | Interactive exercise widgets |

### Color Accessibility

- All text meets WCAG AA contrast requirements against its background
- Primary actions use the full `#C47850` for sufficient contrast
- Never place Text Muted (`#9A8078`) on dark backgrounds

---

## Typography

### Font Family

**Primary:** System font stack for optimal performance and native feel

```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
```

### Type Scale

| Style | Size | Weight | Usage |
|-------|------|--------|-------|
| **Display** | 32px | Bold (700) | Hero stats (e.g., "2.5" hours) |
| **Title** | 24px | Semibold (600) | Screen titles ("Your Journey") |
| **Headline** | 18px | Semibold (600) | Section headers, card titles |
| **Body** | 16px | Regular (400) | Chat messages, primary content |
| **Body Small** | 14px | Regular (400) | Secondary content, descriptions |
| **Caption** | 12px | Regular (400) | Timestamps, labels, metadata |
| **Micro** | 10px | Medium (500) | Tags, badges, chart labels |

### Type Color Pairing

- Display & Title: `#4A3832` (Text Primary)
- Body in chat bubbles: `#4A3832` (Text Primary)
- Labels & captions: `#9A8078` (Text Muted)
- Links & actions: `#C47850` (Primary)

---

## Spacing System

Use a **4px base unit** for consistent spacing:

| Token | Value | Usage |
|-------|-------|-------|
| `space-1` | 4px | Tight spacing, inline elements |
| `space-2` | 8px | Related elements, icon margins |
| `space-3` | 12px | Default padding, small gaps |
| `space-4` | 16px | Card padding, section spacing |
| `space-5` | 20px | Screen padding (horizontal) |
| `space-6` | 24px | Section gaps |
| `space-8` | 32px | Major section breaks |

---

## Border Radius

Tuteo uses **generously rounded corners** to feel friendly and approachable:

| Token | Value | Usage |
|-------|-------|-------|
| `radius-sm` | 8px | Small buttons, tags |
| `radius-md` | 12px | Input fields, small cards |
| `radius-lg` | 16px | Cards, chat bubbles |
| `radius-xl` | 24px | Large cards, modals |
| `radius-full` | 9999px | Pills, avatars, circular buttons |

### Chat Bubble Corners

Chat bubbles use asymmetric radius to indicate direction:

- **AI messages:** Rounded on all corners except top-left (`border-radius: 16px 16px 16px 4px`)
- **User messages:** Rounded on all corners except top-right (`border-radius: 16px 16px 4px 16px`)

---

## Shadows & Elevation

Keep shadows **soft and minimal** — we're warm, not corporate:

| Level | Value | Usage |
|-------|-------|-------|
| **Subtle** | `0 1px 3px rgba(0,0,0,0.08)` | Chat bubbles, input fields |
| **Card** | `0 2px 8px rgba(0,0,0,0.06)` | Floating cards, exercise widgets |
| **Elevated** | `0 4px 16px rgba(0,0,0,0.1)` | Modals, dropdowns |

> **Note:** Because we use a gradient background, most cards rely on their semi-transparent white backgrounds rather than heavy shadows.

---

## Components

### Navigation Bar

- **Position:** Bottom of screen, fixed
- **Background:** Card Background (`rgba(255,252,248,0.9)`)
- **Border:** 1px top border in `rgba(0,0,0,0.06)`
- **Items:** 4 icons (Home, Chat, Journey, Settings)
- **Active state:** Primary color (`#C47850`) for icon and label
- **Inactive state:** Text Muted (`#9A8078`) at 40% opacity

### Cards

**Standard Card**
- Background: `rgba(255,252,248,0.9)`
- Border radius: 16px
- Padding: 16px
- No border, no shadow (the frosted glass effect is sufficient)

**Alt Card** (for secondary information)
- Background: `rgba(255,245,235,0.9)`
- Same radius and padding

### Chat Bubbles

**User Message**
- Background: `#FFFFFF`
- Text: `#4A3832`
- Shadow: Subtle
- Alignment: Right
- Max width: 80% of container

**AI Message (Tuteo)**
- Background: `#FAE8DC`
- Text: `#4A3832`
- Left border: 3px solid `#E8A888`
- Alignment: Left
- Max width: 85% of container

**Timestamp**
- Font: Caption (12px)
- Color: Text Muted
- Position: Below bubble, aligned to bubble edge
- Margin top: 4px

### Exercise Widgets

Interactive exercises appear inline within chat:

- Background: Exercise Card gradient
- Border radius: 16px
- Padding: 16px–24px
- Shadow: Card level
- **No border/outline** — keep it clean

**Exercise Buttons**
- Selected: Primary (`#C47850`), white text
- Unselected: White background, Primary Light border, Primary text

**Progress Dots**
- Active: Primary (`#C47850`)
- Inactive: Text Muted at 30% opacity
- Size: 6px diameter
- Gap: 6px

### Buttons

**Primary Button**
- Background: `#C47850`
- Text: `#FFFFFF`
- Border radius: 12px
- Padding: 12px 20px
- Font: Body, Semibold

**Secondary Button**
- Background: `#FFFFFF` or transparent
- Border: 2px solid `#E8A888`
- Text: `#C47850`
- Same radius and padding

**Ghost Button**
- Background: Transparent
- Text: `#C47850`
- No border
- Use for tertiary actions

### Input Fields

- Background: `rgba(255,252,248,0.95)`
- Border: None (or 1px `#E8A888` on focus)
- Border radius: Full (pill shape for chat input)
- Padding: 12px 16px
- Placeholder color: Text Muted

### Progress Bars

- Track: `rgba(0,0,0,0.1)`
- Fill: Accent (`#E89850`)
- Height: 8px
- Border radius: Full

---

## Iconography

### Style Guidelines

- **Size:** 24px default, 20px for compact UI, 16px for inline
- **Stroke:** 2px weight, rounded caps and joins
- **Active state:** Primary color (`#C47850`)
- **Inactive state:** Text Muted (`#9A8078`) at 60% opacity
- **Style:** Mix of filled (Home, Chat, Settings) and outlined (Journey, Mic, Info)

### Core Icons with SVG Paths

#### Home (Filled)
```svg
<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
  <polyline points="9 22 9 12 15 12 15 22" fill="white"/>
</svg>
```

#### Chat (Filled)
```svg
<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
</svg>
```

#### Journey (Outlined)
```svg
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
</svg>
```

#### Settings (Filled)
```svg
<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
  <circle cx="12" cy="12" r="3"/>
  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
</svg>
```

#### Microphone (Outlined)
```svg
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
  <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
  <line x1="12" y1="19" x2="12" y2="23"/>
  <line x1="8" y1="23" x2="16" y2="23"/>
</svg>
```

#### Back / Chevron Left (Outlined)
```svg
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <polyline points="15 18 9 12 15 6"/>
</svg>
```

#### Info (Outlined)
```svg
<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <circle cx="12" cy="12" r="10"/>
  <line x1="12" y1="16" x2="12" y2="12"/>
  <line x1="12" y1="8" x2="12.01" y2="8"/>
</svg>
```

---

## Motion & Animation

### Principles

1. **Quick but not jarring** — Tuteo is responsive, not frantic
2. **Purposeful** — Animation should guide attention, not distract
3. **Warm** — Ease-out curves feel more natural and friendly

### Timing

| Type | Duration | Curve |
|------|----------|-------|
| **Micro** | 150ms | ease-out |
| **Standard** | 250ms | ease-out |
| **Emphasis** | 400ms | ease-in-out |

### Common Animations

- **Button press:** Scale to 0.97 on press, bounce back
- **Screen transition:** Slide from right (forward), slide from left (back)
- **Chat bubble appear:** Fade in + slight rise (translateY: 8px → 0)
- **Card appear:** Fade in, 250ms
- **Progress bar fill:** 400ms ease-out

---

## Voice & Tone

### How Tuteo Speaks

Tuteo is a **supportive friend**, not a strict teacher. The app's copy should feel:

- **Encouraging:** "¡Muy bien!" not just "Correct"
- **Casual:** "Let's try another one" not "Proceed to next exercise"
- **Patient:** Never scold for mistakes, always frame as learning
- **Warm:** Use exclamation points genuinely, not excessively

### Example Copy

| Situation | ❌ Avoid | ✅ Use |
|-----------|---------|--------|
| Correct answer | "Correct." | "¡Perfecto! You got it." |
| Wrong answer | "Incorrect. The answer is X." | "Almost! It's actually X — here's why..." |
| Encouragement | "Keep practicing." | "You're making real progress!" |
| Exercise intro | "Complete the following." | "Let's practice together." |

### Feedback Hierarchy

1. **Celebrate success** — Make correct answers feel rewarding
2. **Normalize mistakes** — Errors are part of learning, not failures
3. **Explain gently** — Always provide context for corrections
4. **Encourage continuation** — End feedback with forward momentum

---

## Layout Guidelines

### Screen Structure

```
┌─────────────────────────────┐
│        Status Bar           │
├─────────────────────────────┤
│         Header/Nav          │
├─────────────────────────────┤
│                             │
│                             │
│      Main Content Area      │
│    (scrollable if needed)   │
│                             │
│                             │
├─────────────────────────────┤
│     Bottom Navigation       │
└─────────────────────────────┘
```

### Safe Areas

- **Horizontal padding:** 20px minimum
- **Bottom padding:** Account for home indicator (34px on modern iPhones)
- **Top padding:** Account for status bar + notch

### Content Width

- **Max content width:** 100% minus horizontal padding
- **Chat bubbles:** 80–85% max width
- **Cards:** Full width minus padding

---

## Dark Mode (Future)

*Dark mode is planned for a future release. When implemented:*

- Gradient will shift to deep warm tones (dark burgundy → deep amber)
- Cards will use dark surfaces with warm undertones
- Text will invert to light cream tones
- Accent colors remain consistent for recognition

---

## File Naming Conventions

### Assets

```
icon-[name]-[size].png
illustration-[name].png
avatar-tuteo.png
```

### Colors in Code

```
--color-primary: #C47850;
--color-primary-light: #E8A888;
--color-accent: #E89850;
--color-text: #4A3832;
--color-text-muted: #9A8078;
--color-bg-gradient-top: #E8D0D8;
--color-bg-gradient-bottom: #F0D8A0;
--color-surface-card: rgba(255,252,248,0.9);
--color-surface-card-alt: rgba(255,245,235,0.9);
--color-bubble-user: #FFFFFF;
--color-bubble-ai: #FAE8DC;
```

---

## Quick Reference Card

### Colors at a Glance

| Role | Color |
|------|-------|
| Primary Action | `#C47850` |
| Secondary/Border | `#E8A888` |
| Progress/Highlight | `#E89850` |
| Text | `#4A3832` |
| Text Secondary | `#9A8078` |
| User Chat | `#FFFFFF` |
| AI Chat | `#FAE8DC` |
| Background Top | `#E8D0D8` |
| Background Bottom | `#F0D8A0` |

### Do's and Don'ts

✅ **Do:**
- Use the gradient background consistently
- Keep corners rounded and friendly
- Celebrate user progress warmly
- Maintain clear contrast between user and AI messages
- Use soft shadows sparingly

❌ **Don't:**
- Use harsh borders or outlines on cards
- Make error states feel punishing
- Use cold or clinical colors
- Overcrowd the interface
- Use heavy drop shadows

---

*This is a living document. As Tuteo evolves, update this guide to reflect new patterns and decisions.*

**Questions?** Reach out to the design team.
