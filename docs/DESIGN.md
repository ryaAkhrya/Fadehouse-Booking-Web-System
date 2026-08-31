# Design Specification

## Direction

**Modern Cinematic Luxury**
with
**Motion-Driven Premium Interaction**

Keywords:
- dark
- high-class
- contemporary
- cinematic
- controlled
- precise
- responsive
- premium
- immersive
- modern
- non-editorial
- non-SaaS

Do not default to "old luxury editorial" styling.

## Color Direction

Use warm dark neutrals rather than pure black.

Suggested base range:

```txt
Background:      #0B0B0A
Alt background:  #10100F
Surface:         #171715
Primary text:    #F2F0E9
Muted text:      #A09D95
Accent:          #C6B68A
```

Accent should be used sparingly.
Do not turn the entire interface gold.

High contrast is required.
Dark mode must not become low-contrast gray-on-gray.

Fadehouse is dark-first / dark-only for this MVP.
No light/dark toggle is required.

## Typography

Prefer a distinct modern grotesk/sans identity for the main interface.

Do not use:
- Inter as the untouched main identity font,
- generic Space Grotesk + Instrument Serif combo,
- random luxury serif italics simply to look expensive.

A serif may be used selectively if it strengthens the brand, but it must not create a vintage/editorial feeling.

Headline typography may be oversized and expressive.

## Layout

Prefer:
- strong composition,
- asymmetry when useful,
- large negative space,
- full-width or full-viewport moments,
- intentional image crops,
- layered media,
- sticky elements only when useful,
- precise grids,
- strong hierarchy.

Avoid:
- endless stacks of cards,
- generic centered hero + three cards,
- random bento layouts,
- identical section formulas.

Do not structure every section as:
`eyebrow → heading → paragraph → three cards`.

## Hero

Preferred:
- short cinematic barber video or interior/process footage,
- strong headline,
- clean CTA,
- subtle depth,
- clear Fadehouse branding.

Ideal media:
- clipper close-up,
- barber hands,
- cutting process,
- cape movement,
- hair styling,
- scissors,
- mirror reflection,
- barber chair,
- dark barbershop interior,
- grooming product detail.

Human faces are not required.

Do not rely on AI-generated people as final production imagery.

## Treatments UI

Treatment list should feel modern and interactive.

Do not default to rounded cards for each service.

Treatment item can include:
- index/number,
- treatment name,
- short description,
- duration,
- price,
- interaction state,
- contextual image preview.

Hover may:
- shift text slightly,
- reveal additional information,
- change border/surface,
- animate an arrow,
- reveal or move an image.

Mobile must have an equivalent tap/focus behavior.

## Booking UI

Booking must feel like a premium product, not a SaaS admin panel.

Recommended:
- clean step navigation,
- large readable controls,
- custom date selection,
- geometric time slots,
- limited border radius,
- clear selected/unavailable states,
- strong spacing,
- minimal clutter.

## Navbar

Required:
- sticky header,
- Fadehouse brand/logo,
- Treatments
- Experience or Location where appropriate
- Manage Booking
- Book Appointment CTA
- animated mobile menu

Do not use:
- floating glass capsule navbar,
- oversized rounded pill navbar,
- unnecessary blur-heavy navigation.

## Accessibility

Required:
- visible focus states,
- keyboard navigable controls,
- skip-to-content link,
- sufficient contrast,
- semantic structure,
- form labels,
- modal focus trapping,
- ESC close where appropriate,
- `prefers-reduced-motion` support.

## Anti AI-Slop Rules

Strictly avoid the following unless explicitly justified:

1. Purple-to-blue gradients.
2. Gradient hero text.
3. Emoji in headings.
4. Inter used untouched as the entire visual identity.
5. Colored-border cards used as decoration.
6. Glassmorphism cards.
7. Low-contrast dark mode.
8. Generic three-icon feature rows.
9. Small decorative hero badges such as "Premium Experience".
10. Lucide icons everywhere.
11. Untouched shadcn UI appearance.
12. Generic fade-in for every section.
13. Cursor-following spotlight/beam.
14. Hover behavior that only changes opacity.
15. Inconsistent arbitrary spacing.
16. Excessive em dashes in copy.
17. Generic luxury buzzword copy.
18. Random serif italic accent words.
19. Overused AI-template font pairings.
20. Grain texture placed over gradients just to look cinematic.
21. Rounded cards everywhere.
22. `rounded-3xl` everywhere.
23. Generic bento grids.
24. Giant floating dashboard mockups.
25. Fake statistics.
26. Fake testimonials.
27. Glowing gold buttons.
28. Excessive box shadows.
29. Animated gradient backgrounds.
30. Random floating blobs.
31. Random decorative circles/lines with no design purpose.
32. Pointless marquees.
33. Excessive pills/chips.
34. SaaS dashboard visual language.
35. Generic AI-startup visual language.

## UI Polish Features Included

Required:
- mobile menu
- meaningful hover states
- real loading states
- sticky header
- skip-to-content
- form success state
- form error state
- Copy Booking ID
- cancellation confirmation modal

Not required:
- cookie banner unless cookies/analytics require it
- site search
- back-to-top unless page length justifies it
- scroll progress bar
- print stylesheet
- password visibility
- floating WhatsApp
- dark-mode toggle
- "last updated" label
- FAQ unless real content requires it
- UTM tracking for MVP

## Performance Principle

Visual richness must come from composition and controlled motion, not heavy effects.

Prefer:
- transforms
- opacity
- clipping
- efficient media
- responsive images/video
- lazy loading where appropriate

Avoid:
- heavy continuous blur
- animated huge box shadows
- full-page filters
- constant mouse listeners
- particle systems
- unnecessary canvas effects
- giant autoplay videos on mobile
