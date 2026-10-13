# Knoppen: interactieve vergelijking

Preview: button-concepten.html. Styles: css/button-concepten.css. Demo pin/unpin: js/button-concepten.js.

Eigen code, geïnspireerd door bekeken Uiverse-patronen:
- https://uiverse.io/ui/button-hover-effects
- https://uiverse.io/adamgiebl/rude-bear-14 (vulling)
- https://uiverse.io/cssbuttons-io/brown-otter-21 (kader)
- https://uiverse.io/satyamchaudharydev/dry-sloth-51 (onderstreping)

01: blauwe vulling, aanbevolen primaire CTA.
02: open hoeken sluiten tot kader, alternatief dat de stroomlijn echoot.
03: groeiende onderstreping, aanbevolen tekstlinks.

Zelf geschreven CSS met huidige Manrope, #006baf, #050d19, #65daf6. Geen pijlen, gradients, zware schaduwen of libraries. Bestaande websiteknoppen niet gewijzigd.

Getest 1280 en 390 CSS px: zes knoppen, min. 54px hoog; geen overflow. Klik en herhaalde klik zetten aria-pressed aan/uit. Space en Enter getest. Focus zichtbaar; alle hoverstanden via toetsenbord bereikbaar. Op touch geen hover nodig, alleen ingedrukte stand. Reduced motion: gemeten overgangsduur 0s. Console: geen fouten/waarschuwingen. Desktop screenshot: button-concepten-desktop.jpg.
