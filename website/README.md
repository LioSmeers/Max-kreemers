# Kreemers Elektro

Statische website in gewone HTML, CSS en JavaScript. Vier pagina’s delen de navigatie, typografie, footer en scrollanimaties:

- `index.html`: hero, diensten en uitgelichte realisaties.
- `realisaties.html`: projectfoto’s, filters en een fotovergroting.
- `over-max.html`: portret, achtergrond en werkwijze van Max.
- `contact.html`: bel- en maillinks, projectkeuze en uitklapbare vragen.

## Lokaal starten

Voer vanuit de hoofdmap van de repository uit:

```sh
python3 -m http.server 8766 --bind 127.0.0.1 --directory website
```

Open http://127.0.0.1:8766/index.html. Er is geen buildstap of pakketinstallatie nodig.

## Gedeelde onderdelen

`css/header.css` verzorgt de witte header en het lokaal opgeslagen Manrope-lettertype. De fontbestanden en hun OFL-licentie staan in `assets/fonts/`.

`js/header.js` opent en sluit het mobiele menu, houdt `aria-expanded` bij en sluit het menu met Escape of bij overschakelen naar desktop. Elke pagina heeft één actieve navigatielink met `aria-current="page"`.

Alle pagina’s gebruiken dezelfde footer met de bestaande bedrijfsnaam, diensten, regio, e-mail, telefoon en het btw-nummer. De bestaande footerregels zijn samengebracht in `css/footer.css`: vier kolommen op desktop, twee tot 1000 px en één tot 700 px.

De overige stylesheets zijn verdeeld over de hero, diensten, uitgelichte projecten, vervolgpagina’s, contact en beweging. CSS en JavaScript worden zonder framework geladen. Versieparameters in enkele paden voorkomen verouderde browsercaches.

## Beelden en beweging

De hero gebruikt de aangeleverde abstracte video als subtiele achtergrond. `assets/hero-video-light.mp4` is H.264, 960 × 540, 20 fps en 257.856 bytes, zonder audiospoor. Het bestand duurt 10 seconden en speelt met `playbackRate = 0.65`. De originele video is als bron bewaard. Het posterbeeld komt uit dezelfde video; de animatie wordt niet als uitgevoerd project gepresenteerd.

De video pauzeert buiten beeld en bij een verborgen tab. Bij `prefers-reduced-motion` of databesparing wordt de videobron niet geladen. Er is geen afspeel- of pauzeknop. De optionele lichtschakelaar verbergt de achtergrond en pauzeert de video bij uitschakelen. De hero-tekst blijft ook zonder JavaScript zichtbaar.

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

Een decoratieve SVG verbindt de onderkant van de hero, Diensten, Realisaties en de bovenkant van de footer. `css/current-line.css` gebruikt het bestaande merkblauw; `js/current-line.js` vult het pad op basis van scrollpositie met een zachte vertraging (150 ms tijdconstante). De lijn ligt achter de hero, video en footer. Twee kleine aansluitpunten worden actief zodra de zichtbare vulling ze bereikt. De animation frames stoppen zodra de lijn haar doel bereikt; reduced motion toont het volledige pad statisch. Er zijn geen bewegende bolletjes of gloeifilters.

De lijn ligt absoluut in de vrije linkermarge en verandert de layout niet. Desktop gebruikt rechte stukken met afgeronde bochten; mobiel heeft een recht zijpad. Onder 360 px of bij minder dan 22 px marge wordt de lijn verborgen. De SVG is `aria-hidden`, niet focusbaar en gebruikt `pointer-events: none`. Bij reduced motion zijn de volledige lijn en beide aansluitpunten statisch zichtbaar.

Scrollupdates gebruiken `requestAnimationFrame` en een passieve listener. Padmetingen en geometriesamples worden alleen vernieuwd bij wijzigingen in afmetingen, het laden van de pagina en het gereedkomen van fonts.

Gecontroleerd op 390 en 1280 px: sectieposities en documenthoogte zijn exact gelijk aan de metingen vóór de toevoeging; geen overlap of horizontale overflow. Vulling en aansluitpunten reageren ook op terugscrollen. Reduced motion en verbergen bij 320 px zijn getest; geen consolefouten of waarschuwingen. Resultaten: `qa/current-line-checks.json`; beelden: `qa/current-line-desktop.jpg` en `qa/current-line-mobile.jpg`.

## Lichtknop in de hero

De optionele lichtknop is een subtiele tekstknop met `aria-pressed`, een zichtbaar actielabel en zichtbare toetsenbordfocus. De site start met het licht aan. Uitschakelen verbergt de achtergrond met een rustige fade en pauzeert de video; inschakelen herstelt de achtergrond met één korte blauwe puls. De keuze leeft uitsluitend in de geopende pagina en wordt niet opgeslagen.

Desktop plaatst de lichtknop naast “Bekijk realisaties”. Op mobiel lopen de acties door naar een volgende rij wanneer nodig. `css/hero-switch.css` beperkt alle kleurwissels tot de hero. `js/hero.js` behoudt playbackRate 0.65, databesparing, reduced motion en pauzeren buiten beeld. Bij reduced motion wisselt de achtergrond zonder overgang of lichtpuls en blijft de video ongeladen.

Zonder JavaScript blijft de lichtknop verborgen. Een gedeelde noscript-stylesheet laat op mobiel de navigatielinks zien in plaats van een niet-werkende menuknop.

Gecontroleerd op 390 en 1280 px: beide lichtstanden, labels, muis, Enter en spatie, focusstijl, plaatsing, geen horizontale overflow en geen overlap met de stroomlijn. De desktophero behoudt zijn hoogte; de mobiele schakelaar staat na de bestaande acties. Reduced motion en de mobiele homepage zonder JavaScript zijn in de browser getest. Geen consolefouten of waarschuwingen. Conservatieve contrastcontrole (zelfs bij een volledig wit videoframe op 20% opacity): wit 10,93:1; beschrijving/label 6,05:1; primaire knop 5,64:1. Resultaten: `qa/switch-checks.json`; screenshots: `qa/switch-desktop-on.jpg`, `qa/switch-desktop-off.jpg` en `qa/switch-mobile-on.jpg`.

## Informatiepunten in de homepage-showcase

Railverlichting en bedrading hebben elk één optioneel informatiepunt. De vaste bronposities zijn (530, 458) in de railfoto van 1086 × 1448 px en (680, 550) in de verdeelbordfoto van 900 × 1200 px. Deze punten zijn op de zichtbare middelste plafondspot en een blauwe draad geplaatst. De tekst beschrijft uitsluitend onderdelen die op de bestaande foto’s staan.

`js/showcase-hotspots.js` rekent de bronpixels om volgens `object-fit: cover` en `object-position`. Een aparte puntenlaag deelt de beeldtransformatie voor parallax en hover; `js/motion.js` geeft die twee foto’s daarom de scrolloffset via hun gedeelde frame. De overige beelden behouden hun bestaande gedrag. Fotolinks en informatieknoppen zijn aparte elementen: er staan geen buttons binnen links.

Elk punt is een native button met minstens 44 × 44 px klikvlak, toegankelijke naam, `aria-expanded`, `aria-controls` en focusstijl. Maximaal één kaartje is open. Sluiten werkt via hetzelfde punt, de sluitknop, klikken erbuiten en Escape. De sluitknop en Escape brengen de focus terug naar het punt. Desktop plaatst een kaartje op de foto als het veilig past; mobiel en krappe frames krijgen het onder de foto. Zonder JavaScript zijn hint, punten en kaartjes verborgen en blijven de fotolinks bruikbaar.

Getest op 390 en 1280 px: bronuitlijning binnen 0,02 px bij de gemeten parallax/hoverstanden, minimale klikvlakken, fotolinks niet geactiveerd door punten, één kaartje tegelijk, alle sluitmethoden, Enter/spatie, behouden fotoverhoudingen, geen overflow, reduced motion en werking zonder JavaScript. Geen consolefouten of waarschuwingen. Resultaten: `qa/hotspot-checks.json`; screenshots: `qa/hotspots-desktop.jpg` en `qa/hotspots-mobile.jpg`.

## Dienstenconcept 3

De dienstensectie heeft een donkerblauwe achtergrond met drie verspringende tekstblokken, verbonden door een dun decoratief SVG-circuit. De bestaande teksten, typografie en contactlinks blijven behouden. Op mobiel staan de diensten onder elkaar langs een eenvoudige verticale lijn. Links hebben hover- en focusstijlen; reduced motion schakelt de hoverovergang uit. Geen extra libraries of beeldbestanden. Gecontroleerd op 390 en 1280 px: geen overflow, leesbare tekst, contactlink werkt en geen consolemeldingen. Screenshots: `qa/services-circuit-desktop.jpg` en `qa/services-circuit-mobile.jpg`.
