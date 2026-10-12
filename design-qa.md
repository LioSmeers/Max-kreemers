# Diensten — concept 3

Source visual truth: /Users/liosmeers/.codex/generated_images/01a13009-bf68-7f62-a512-31fa12fcdd23/exec-458fbf86-384b-4ad9-9bd9-f38271f6645a.png
Implementation: website/qa/services-circuit-desktop.jpg; website/qa/services-circuit-mobile.jpg; full-view evidence website/qa/services-circuit-full.jpg.

Viewport: 1280 × 1000 desktop; 390 × 844 mobile. Source is 1536 × 1024, implementation section crop 1280 × 997 at 1 CSS pixel per image pixel. Compared proportionally, with existing site spacing and type sizes retained as required. State: default services, all three links available.

## Findings and comparison

- Typography: existing local Manrope and established heading/body sizes preserved. White headings, muted readable body text and cyan links follow the selected direction. Different wrapping from the generated reference is expected at the smaller viewport.
- Spacing/layout: three descending columns and rounded circuit bends match the reference. Mobile becomes a single column with a vertical circuit and ample text clearance. No horizontal overflow at either viewport.
- Colors: existing navy #050d19, brand blue #006baf and cyan #65daf6 retained. Brand blue is intentionally quieter than the mock's brighter path. No gradients or shadows added.
- Assets: no raster assets in this component. The circuit uses native SVG, consistent with the user's earlier explicit native SVG/CSS/JS requirement. It is decorative and inaccessible to pointer/focus input.
- Content: all previous headings, descriptions and contact destinations preserved.
- Focused comparison: title hierarchy and descending circuit checked alongside the reference; no separate detail crop necessary.

## Comparison history

Initial circuit extended beyond the Domotica node. Removed that extension to match the reference termination. Final full-page capture confirms all three service bodies and links fit without clipping. The narrow native screenshot was a capture crop; the full-width capture and DOM width check verify the actual layout.

## Interaction and browser checks

All three service links point to the existing contact.html. Clicked Nieuwbouw and verified navigation. Console errors/warnings: none. Mobile circuit hides desktop SVG and keeps the content in order. Hover uses a quiet underline change; focus remains visible; reduced-motion disables transitions. No new JavaScript or dependencies.

No actionable P0/P1/P2 findings. Optional P3: exact generated-image typography differs slightly from the deliberately retained site typography.

final result: passed
