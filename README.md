# Kreemers Elektro

Statische website in gewone HTML, CSS en JavaScript. De websitebestanden staan rechtstreeks in de hoofdmap van deze repository; er is geen aparte `website`-map. Vier pagina’s delen de navigatie, typografie, footer en scrollanimaties:

- `index.html`: hero, diensten en uitgelichte realisaties.
- `realisaties.html`: projectfoto’s, filters en een fotovergroting.
- `over-max.html`: portret, achtergrond en werkwijze van Max.
- `contact.html`: bel- en maillinks, projectkeuze en uitklapbare vragen.

## Lokaal starten

Voer vanuit de hoofdmap van de repository uit:

```sh
python3 -m http.server 8766 --bind 127.0.0.1
```

Open http://127.0.0.1:8766/index.html. Er is geen buildstap of pakketinstallatie nodig.

## Gedeelde onderdelen

`css/header.css` verzorgt de witte header en het lokaal opgeslagen Manrope-lettertype. De fontbestanden en hun OFL-licentie staan in `assets/fonts/`.

`js/header.js` opent en sluit het mobiele menu, houdt `aria-expanded` bij en sluit het menu met Escape of bij overschakelen naar desktop. Elke pagina heeft één actieve navigatielink met `aria-current="page"`.

Alle pagina’s gebruiken dezelfde footer met de bestaande bedrijfsnaam, diensten, regio, e-mail, telefoon en het btw-nummer. De bestaande footerregels zijn samengebracht in `css/footer.css`: vier kolommen op desktop, twee tot 1000 px en één tot 700 px.

De overige stylesheets zijn verdeeld over de hero, diensten, uitgelichte projecten, vervolgpagina’s, contact en beweging. CSS en JavaScript worden zonder framework geladen. Versieparameters in enkele paden voorkomen verouderde browsercaches.

## Beelden en beweging

De hero heeft een vaste donkerblauwe achtergrond. De lichtknop en videoachtergrond zijn op 13 oktober verwijderd. De oorspronkelijke video- en posterbestanden blijven als bronmateriaal bewaard, maar worden niet geladen door de homepage.

Bij openen onthult een blauwe lichtstreep de twee titelregels, met 0,2 seconde verschil. De lichtstreep en tekstmaskering delen dezelfde lineaire timing van 1,15 seconde. `js/hero.js` wacht op het lokale lettertype en verwijdert de animatieklasse na afloop. Zonder JavaScript, bij reduced motion of wanneer de tab verborgen is, blijft de tekst meteen zichtbaar.

Het portret is aangeleverd door de gebruiker. De projectfoto’s zijn afkomstig van de oorspronkelijke Kreemers-website, met aangeleverde vervangingen voor LaNess Studio, railverlichting, keukenverlichting, inbouwverlichting, wachtbuizen en badkamerverlichting. Geoptimaliseerde WebP-versies worden op de pagina’s gebruikt; fotovergroting laadt een JPEG op aanvraag. De oude bronbeelden blijven bewaard.

`js/motion.js` en `css/motion.css` verzorgen de bestaande parallax, sectie-entrees, knopbeweging en leesvoortgang. Scrollberekeningen gebruiken `requestAnimationFrame` en passieve listeners. Reduced motion schakelt de beweging uit en houdt de inhoud zichtbaar.

## Interactie en links

Alle interne paginalinks verwijzen naar de vier lokale HTML-pagina’s. Afzonderlijke dienstpagina’s bestaan niet; de dienstlinks openen de contactpagina.

Op Realisaties kun je filteren op verlichting of installaties. De fotovergroting heeft knoppen voor Vorige, Volgende en Sluiten, ondersteunt de pijltjestoetsen en sluit met Escape.

Contact heeft geen serverformulier. De projectkeuze past de uitleg en het onderwerp van de mail aan. De mailactie opent het eigen mailprogramma; de telefoonlink opent de belapp. De vragen gebruiken native `details` en `summary`.

## Controle op 12 oktober 2026

Alle vier pagina’s zijn getest op 390 × 844 en 1280 × 900 px:

- Eén identieke footer per pagina, met correcte responsive kolommen.
- De juiste actieve navigatie op iedere pagina.
- Mobiel menu: openen, sluiten via knop en Escape, zichtbare/verborgen links en correcte `aria-expanded`; ook gecontroleerd bij wisselen naar desktop.
- Volledige pagina’s doorgescrold en visueel nagekeken; geen horizontale overflow of duidelijke tekst- en layoutfouten vastgesteld.
- Alle projectbeelden laden; geen achtergebleven verborgen secties na scrollen.
- 48 lokale pagina- en assetpaden via HTTP gecontroleerd, inclusief CSS-fonts; geen kapotte bestanden of HTML-ankers gevonden.
- Geen consolefouten of waarschuwingen tijdens de browsercontrole.

Resultaten staan in `qa/layout-checks.json`. De screenshots met prefix `check-390-` en `check-1280-` tonen de huidige controle. Oudere screenshots in `qa/` zijn historische ontwerpbeelden en kunnen eerdere versies van teksten, foto’s of indeling tonen.

## Stroomlijn op de homepage

Een decoratieve SVG verbindt de onderkant van de hero, Diensten, Realisaties en de bovenkant van de footer. `css/current-line.css` gebruikt een lichtblauwe kern met een zachte blauwe halo; `js/current-line.js` vult het pad op basis van scrollpositie met een zachte vertraging (150 ms tijdconstante). De lijn ligt achter de hero en footer. Ze sluit links aan op het circuit van Diensten en loopt daarna via de rechterrand verder langs Realisaties. Op mobiel sluit ze aan op de verticale dienstenlijn en kruist ze uitsluitend de lege ondermarge naar rechts. Twee kleine aansluitpunten worden actief zodra de zichtbare vulling ze bereikt. De animation frames stoppen zodra de lijn haar doel bereikt; reduced motion toont het volledige pad statisch. Bij de voorrand verschijnt tijdens scrollen een gekarteld elektrisch spoor van maximaal 90 px met twee korte vertakkingen en een klein lichtpunt. De vonkjes doven binnen 180 ms uit nadat de lijn haar scrollpositie heeft bereikt. De renderloop stopt vervolgens. De geometrie gebruikt gecachte punten; er zijn geen SVG-metingen per animatieframe. Bij reduced motion blijven de lijn en aansluitpunten statisch zichtbaar zonder halo of vonkjes.

De lijn ligt absoluut in de vrije linkermarge en verandert de layout niet. Desktop gebruikt rechte stukken met afgeronde bochten; mobiel heeft een recht zijpad. Onder 360 px of bij minder dan 22 px marge wordt de lijn verborgen. De SVG is `aria-hidden`, niet focusbaar en gebruikt `pointer-events: none`. Bij reduced motion zijn de volledige lijn en beide aansluitpunten statisch zichtbaar.

Scrollupdates gebruiken `requestAnimationFrame` en een passieve listener. Padmetingen en geometriesamples worden alleen vernieuwd bij wijzigingen in afmetingen, het laden van de pagina en het gereedkomen van fonts.

Gecontroleerd op 390 en 1280 px: sectieposities en documenthoogte zijn exact gelijk aan de metingen vóór de toevoeging; geen overlap of horizontale overflow. Vulling en aansluitpunten reageren ook op terugscrollen. Reduced motion en verbergen bij 320 px zijn getest; geen consolefouten of waarschuwingen. Resultaten: `qa/current-line-checks.json`; beelden: `qa/current-line-desktop.jpg` en `qa/current-line-mobile.jpg`.

## Hero-interactie

De primaire knoppen gebruiken het gekozen concept “Het circuit sluit” uit `css/button-circuit.css`: open hoeken sluiten bij hover of toetsenbordfocus. De linkdoelen blijven de bestaande contact- en realisatiepagina’s.

Eén transparant canvas volgt de muisroute over de volledige homepage, inclusief header, diensten, realisaties en footer. Het canvas heeft een vaste positie en is alleen zo groot als het viewport; scrollen wist oude spoorpunten om sprongen te voorkomen. Boven teksten en links is de helderheid lager. `js/hero-electric-cursor.js` biedt de twee bestaande varianten via `index.html?cursor=1` en `index.html?cursor=2`. Ze staan naast elkaar op `cursor-concepten.html`; de keuze is nog aan de gebruiker. Reduced motion en apparaten zonder fijne hover-pointer schakelen het effect uit. De cursor en links blijven bruikbaar.

Controle op 13 oktober: desktop 1280 × 900 en mobiel 390 × 844, zonder horizontale overflow. Lichtknop en videomarkup zijn afwezig. Het tekstmasker en de lichtstreep staan halverwege op dezelfde positie. Reduced motion toont de titel zonder reveal. Screenshots: `qa/hero-light-sweep-desktop.png` en `qa/hero-static-mobile.png`. Oudere screenshots met de lichtknop tonen historische versies.

## Realisaties: één project in de spotlight

De homepage toont één grote projectfoto met de toelichting links op donkerblauw. Native knoppen laten handmatig bladeren of een van vier voorbeeldfoto’s kiezen: Odette Lunettes, railverlichting, Laness Studio en de behouden bedrading. Geen autoplay. `js/spotlight.js` beheert de actieve foto, `aria-pressed`, een live aankondiging en pijltjestoetsen. Op mobiel staan tekst, foto en voorbeeldfoto’s onder elkaar. Klikken op de grote foto opent de bestaande native dialog-galerij met alle vier foto’s, pijltjes en Escape/sluitknop. De link naar `realisaties.html` blijft zichtbaar.

`css/spotlight.css` behoudt de huidige typografie en kleuren. Foto’s worden met `object-fit: contain` volledig getoond en gebruiken de bestaande originele bestanden. Zonder JavaScript staan alle vier projecten onder elkaar en openen de fotolinks rechtstreeks het JPG-bestand; niet-werkende bladerknoppen blijven verborgen.

De informatiepunten bij railverlichting en bedrading blijven behouden. `js/showcase-hotspots.js` rekent de bestaande bronpixels om volgens zowel contain als cover. De spotlight-foto’s gebruiken geen parallax of vergroting, zodat punten nauwkeurig blijven staan. Bij wisselen sluiten de informatiekaartjes. Op mobiel verschijnen ze onder de foto. Fotolinks en informatieknoppen blijven aparte elementen.

Getest op 390 en 1280 px: thumbnails, vorige/volgende, pijltjestoetsen, Enter, railkaartje, sluiten bij wisselen, vergroting en navigatie door vier foto’s, Escape, volledige foto’s zonder overflow. Zonder JavaScript vier bruikbare fotolinks; geen consolefouten of kapotte lokale bestanden. Screenshots: `qa/spotlight-desktop.jpg` en `qa/spotlight-mobile.jpg`. Designcontrole: `design-qa.md`.

## Dienstenconcept 3

De dienstensectie heeft een donkerblauwe achtergrond met drie verspringende tekstblokken, verbonden door een dun decoratief SVG-circuit. De bestaande teksten, typografie en contactlinks blijven behouden. Op mobiel staan de diensten onder elkaar langs een eenvoudige verticale lijn. Links hebben hover- en focusstijlen; reduced motion schakelt de hoverovergang uit. Geen extra libraries of beeldbestanden. Gecontroleerd op 390 en 1280 px: geen overflow, leesbare tekst, contactlink werkt en geen consolemeldingen. Screenshots: `qa/services-circuit-desktop.jpg` en `qa/services-circuit-mobile.jpg`.

De vaste dienstenlijn wordt vervangen zodra het scrollpad is geïnitialiseerd. Ook de ongevulde basislijn is binnen het dienstencircuit verborgen: alleen de scrollvulling tekent dit deel. Zonder JavaScript of onder 360 px blijft de eenvoudige vaste terugvalweergave beschikbaar. Reduced motion toont het volledige pad statisch. Controle op 390/1280 px: scrolloffset verandert, vaste SVG-lijn verborgen, mobiele dubbele rand transparant, geen overflow of consolefouten.
