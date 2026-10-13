# Realisaties — gekozen fotoconcept 2

Source visual truth: /Users/liosmeers/.codex/generated_images/01a13009-bf68-7f62-a512-31fa12fcdd23/exec-524aed6e-8eda-4187-86f3-78f4a547ade3.png
Implementation screenshot: qa/spotlight-desktop.jpg; qa/spotlight-mobile.jpg.
Viewport: 1280 × 900 and 390 × 844. Source 1536 × 1024, desktop screenshot 1280 × 900, CSS-to-image density 1:1. Compared proportionally to the existing section width; no stretched source assets. State: Odette selected, initial slide, default controls.

## Visual comparison

Source and final screenshot opened together. The full composition matches: navy surface, project title and short description at left, dominant uncropped photo at right, manual chevrons, thumbnails and permanent gallery link below. Focused photo/title comparison did not require a separate crop because all details are readable in the full view.

Typography: existing Manrope, established weight and hierarchy, large two-line project title, muted body text. Existing cyan accent retained rather than substituting a new saturated mock color. Spacing: 30/70 desktop split, generous gaps, responsive stacked mobile presentation. Colors: #050d19, #006baf, #65daf6 and #b7c2ce, no gradients or shadows. Assets: existing real photos, complete main-image subjects via contain, thumbnail cover crops only. No generated photos or invented work. Content: existing descriptions, plus existing factual Laness caption.

Intentional differences: four thumbnails rather than three preserve the previously requested verdeelbord image and information point. The source's decorative link arrow is omitted according to the user's earlier removal request; arrows remain for photo navigation only. Existing native SVG arrow system reused under the user's HTML/CSS/JavaScript requirement. These are product constraints, not unresolved defects.

## Iterations

- P1: screen-reader heading/status initially appeared visibly because the homepage had no sr-only utility. Added scoped accessible hiding; recaptured, now only project title and small counter visible.
- P1: cached gallery script initially included only the visible slide. Updated collection to include all spotlight slides and refreshed script URL. Verified 1 / 4 and next image Railverlichting.
- P2: mobile navigation positioned relative to dynamic copy. Measured stage midpoint, used ResizeObserver and consistent copy minimum height; verified navigation lies centered on the photo.
- Final source/implementation comparison: no actionable P0/P1/P2 findings.

## Browser and interaction checks

Desktop/mobile: no horizontal overflow; all original images load; 44px navigation controls; thumbnail aria-pressed states; next/previous and ArrowRight wrap correctly; Enter works; rail information card opens and closes on slide change; mobile card is below image; photo dialog opens and cycles all four; Escape closes. Console errors/warnings: none. All four HTML pages' local href/src paths resolve. No JavaScript: four project figures visible, four real JPG links usable, navigation/thumbnails hidden. Motion is opt-in to CSS hover only and disabled for reduced motion; gallery has no timer or autoplay.

Optional P3: fine generated typography differs slightly from the retained local site font and scale. No blocker.

final result: passed

## Heroverzoeken hervat op 13 oktober 2026

- Lichtknop en videoachtergrond verwijderd uit de homepage; ongebruikte switch-stylesheet verwijderd.
- Blauwe light sweep onthult de twee titelregels in 1,15 s met 0,2 s verschil. Het tekstmasker en de lichtstreep hebben dezelfde lineaire timing; geen verticale tekstbeweging.
- Desktop 1280 × 900 en mobiel 390 × 844: geen horizontale overflow. Primaire projectlink opent contact.html. Geen consolefouten of waarschuwingen vastgesteld.
- Reduced motion: revealklasse afwezig, titel volledig zichtbaar, elektrische cursor verborgen. Zonder JavaScript: beide titelregels zichtbaar, geen lichtknop of video.
- Screenshot van de animatie bewust gepauzeerd op 575 ms om de voorrand te controleren; browser daarna herladen en testinstellingen hersteld. Beelden: qa/hero-light-sweep-desktop.png en qa/hero-static-mobile.png.
- Alle lokale href/src-bestanden in de HTML-pagina’s bestaan. node --check js/hero.js en git diff --check geslaagd.

## Elektrische cursor over de volledige homepage

Het cursorcanvas staat nu rechtstreeks onder body en gebruikt vaste viewportcoördinaten. Header, hero, diensten, realisaties en footer gebruiken hetzelfde spoor; de IntersectionObserver op de hero is verwijderd. De buffer blijft begrensd op 40 punten en vier takjes; de canvasresolutie blijft beperkt tot DPR 2. Scrollen wist verouderde spoorpunten, zodat geen sprongen tussen secties ontstaan.

Browsercontrole: in alle vijf delen actieve canvaspixels gemeten, ook na scrollen voorbij de hero. Het spoor verdwijnt bij stilstand. Reduced motion en touch verbergen het canvas. De primaire projectlink bleef klikbaar en opende contact.html. Geen horizontale overflow op 1280 × 900 of 390 × 844 en geen consolefouten/waarschuwingen. Metingen: qa/homepage-cursor-checks.json. Screenshot: qa/homepage-cursor-services.png; JavaScript kort gepauzeerd voor het vastleggen van het vluchtige spoor en daarna hersteld en de pagina herladen.

## Elektrische scrolllijn — 13 oktober

De scrolllijn behoudt haar route door Diensten en langs Realisaties. Toegevoegd: lichtblauwe kern, smalle zachte halo en een 90 px gekartelde voorrand met twee korte takjes tijdens scrollen. De voorrand volgt gecachte padpunten; vonkjes doven na het bereiken van de scrollpositie in 180 ms uit. Stilstaand blijft alleen de kern, halo en het subtiele uiteinde zichtbaar. De renderloop stopt na het uitdoven en bij een verborgen tab.

Browsercontrole 1280 × 900 / 390 × 844: geen overflow of consolemeldingen, decoratieve SVG heeft pointer-events:none. Terugscrollen activeert de voorrand opnieuw. Zonder screenshotpauze gecontroleerd: na stilvallen bolt-opacity 0, kern en halo hebben gelijke dashoffsets. Reduced motion: dashoffset 0, halo/vonkjes/uiteinde verborgen. Op 320 px: lijn verborgen en geen overflow. Screenshots tijdens beweging: qa/scroll-electricity-desktop.png en qa/scroll-electricity-mobile.png. JavaScript kort gepauzeerd voor vastlegging; browser daarna herladen en alle testinstellingen hersteld.
