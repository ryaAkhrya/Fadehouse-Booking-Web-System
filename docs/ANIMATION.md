# Animation & Interaction Specification

## Motion Philosophy

Fadehouse is animation-heavy, but motion must be:
- intentional,
- controlled,
- smooth,
- premium,
- performance-conscious,
- responsive to context.

"More motion" does not mean every element moves.

Important sections may be expressive.
Functional sections must remain clear and fast.

## Preferred Motion Techniques

Prefer:
- `transform`
- `opacity`
- masked text reveal
- clip-path reveal where performant
- subtle scale
- controlled parallax
- stagger
- layout transitions when needed

Avoid excessive:
- blur animation
- filter animation
- animated box-shadow
- layout-thrashing properties
- huge background movement
- scroll listeners firing on every pixel
- canvas/particle effects without clear value

## Page Load

Suggested sequence:
1. brand/logo
2. hero media
3. headline
4. supporting copy
5. CTA/navigation detail

Stagger should be subtle.
No long splash loader.

## Hero

Possible behaviors:
- line-by-line masked headline reveal
- hero video slowly scales or translates
- subtle parallax between media and text
- minimal cursor-depth response on desktop only
- content remains fully usable without animation

No:
- giant mouse-following spotlight
- neon glow
- fake loading intro
- unnecessary particle effects

## Scroll Behavior

Not every section uses the same fade-in.

Vary motion based on content:
- treatment rows: horizontal/line reveal
- imagery: clip reveal
- headings: line-mask reveal
- numeric/duration values: subtle vertical roll when contextually useful
- large media: controlled parallax
- CTA: scale/position microinteraction

Generic `opacity: 0 → 1` may be used as support, but not as the only motion language.

## Treatment Interaction

Desktop hover can:
- shift text 8–12px,
- move arrow,
- alter border/surface,
- increase image visibility,
- reveal secondary detail,
- slightly scale contextual imagery.

Mobile:
- no hover dependency,
- use tap/focus/selected state,
- keep experience equally understandable.

## Buttons

Primary booking CTA may use subtle magnetic interaction on desktop.

Maximum movement should stay restrained, approximately a few pixels.

Do not make the button chase or escape the cursor.

Hover should be more than opacity:
- text shift,
- arrow movement,
- background fill,
- border response,
- micro-scale,
- magnetic offset.

## Mobile Menu

Required:
- smooth open/close transition,
- clear focus state,
- body scroll management,
- no giant blur layer if unnecessary,
- should feel like part of brand, not generic sheet component.

## Booking Step Transitions

Booking is a multi-step flow.

Steps:
1. Treatment
2. Date
3. Time
4. Details
5. Review

Recommended:
- outgoing content moves/fades subtly,
- incoming content reveals with direction tied to navigation,
- summary updates smoothly,
- no full page reload,
- preserve state while navigating back.

Animation must never hide validation errors or delay input availability.

## Calendar

When selecting date:
- selected state transitions cleanly,
- unavailable days remain visually distinct,
- fetching slots shows real loading state,
- time slot content enters after response.

## Time Slots

States:
- available
- selected
- unavailable

Transitions should be quick and precise.
Avoid bubbly pill UI unless design explicitly needs it.

## Form Inputs

Focus:
- border/underline transition
- label clarity
- no unnecessary glow

Errors:
- appear close to the field,
- optionally use slight positional motion,
- do not shake aggressively.

## Confirmation Modal

Used before cancellation.

Required:
- backdrop dim,
- modal transition,
- focus trap,
- keyboard support,
- ESC close,
- clear destructive and safe actions.

No glassmorphism-heavy modal.

## Success State

Avoid:
- giant green glowing checkmark,
- confetti,
- emoji celebration.

Preferred:
- restrained confirmation icon/mark,
- typography reveal,
- Booking ID emphasis,
- subtle background/media movement.

## Loading States

Only show loading when something is actually loading.

Examples:
- fetching time slots
- submitting booking
- retrieving Manage Booking data
- cancelling booking

Do not use artificial 3-second loading screens.

## Error States

Errors should help customer recover.

Example:
> 15:30 is no longer available. Choose another available time.

Whenever possible:
- preserve previous selections,
- offer valid alternatives,
- avoid generic "Something went wrong" as the only message.

## Reduced Motion

Respect `prefers-reduced-motion`.

When enabled:
- disable parallax,
- disable magnetic movement,
- remove large mask/clip movement,
- use quick opacity transitions or instant state changes,
- keep all functionality intact.

## Performance Rules

- prefer GPU-friendly transform/opacity
- avoid dozens of global listeners
- no unnecessary client components
- pause/avoid expensive visual behavior offscreen
- optimize video bitrate/resolution
- use poster images
- use lighter media on mobile when possible
- no autoplay audio
- video must use `muted`, `playsInline`, `loop` where appropriate
