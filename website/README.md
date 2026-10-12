# Kreemers Elektro

Nieuwe lokale homepage met witte, gecentreerde header en videohero.

Start vanuit de projectmap:

    python3 -m http.server 8766 --bind 127.0.0.1 --directory website

Preview: http://127.0.0.1:8766/index.html

De video is de ongewijzigde aangeleverde Gemini MP4. Het posterbeeld is een frame uit dezelfde video. Het beeld dient als abstracte animatie, zonder claims over uitgevoerde projecten.

De titel verschijnt eenmaal met een horizontale lichtpuls. De video speelt zonder geluid in een lus en kan met de pauzeknop worden gestopt. Bij reduced motion staat de video stil en verschijnt de tekst zonder animatie. Zonder JavaScript blijft de tekst zichtbaar.

Navigatie en acties verwijzen voorlopig naar de bestaande gepubliceerde pagina’s. Er zijn nog geen nieuwe vervolgpagina’s gemaakt.

## Gecontroleerd

- Desktop 1128 px en mobiel 390 px: geen horizontale overflow.
- Op mobiel staat de primaire actie op 441 px, vóór de video.
- Video geladen (readyState 4), muted autoplay werkt.
- Pauzeren en hervatten met Enter werkt.
- Reduced motion: video gepauzeerd, titelanimatie uitgeschakeld.
- Geen consolefouten.
- Screenshots: qa/hero-desktop.jpg en qa/hero-mobile.jpg.

## Uitbreiding 12 oktober 2026

Realisaties en Over Max zijn nu aparte lokale HTML-pagina’s, gekoppeld vanuit de header en hero. Contact verwijst nog naar de bestaande contactpagina.

De hero gebruikt nu hero-video-light.mp4: H.264, 960×540, 20 fps, 10 seconden, 257.856 bytes (circa 86% kleiner). De audiospoor is verwijderd. Het oorspronkelijke bestand blijft als bron bewaard, maar wordt niet geladen. Reduced motion en databesparing laten de poster staan zonder een videobron te laden, totdat de bezoeker afspelen kiest. De video pauzeert buiten beeld en bij een verborgen tab.

Het aangeleverde portret is als transparante WebP geoptimaliseerd. Projectfoto’s komen van de originele Kreemers-website; de galerij gebruikt geoptimaliseerde WebP en lazy loading. Fotovergroting laadt de originele JPEG op aanvraag.

Gecontroleerd: desktop (1280 px), mobiel (390 px), lokale links/mediapaden, beelddecodering, navigatie, filter Installaties (4 resultaten), fotovergroting met pijltjestoetsen en Escape, video afspelen/pauzeren met Enter, reduced motion zonder videobron, geen consolefouten. Screenshots staan in qa/.

## Hero-aanpassing

Op verzoek is de zichtbare animatieknop verwijderd. Nieuwe titel: “Jouw plannen. Ik zet ze aan.” De beschrijving is persoonlijk vanuit Max geschreven. De lichte video blijft automatisch spelen; reduced motion, databesparing en pauzeren buiten beeld blijven actief. Bij reduced motion/databesparing wordt geen video geladen. Mobiel gecontroleerd op 390 px: geen horizontale overflow en geen heroknoppen voor videobediening. Screenshot: qa/hero-revised.jpg.

## Diensten

Diensten staat direct onder de ongewijzigde hero. De sectie heeft eigen, afgeschermde CSS (services.css), drie kolommen op desktop en één op mobiel. De blauwe lijn animeert bij hover en toetsenbordfocus; reduced motion schakelt de overgang uit. Alle drie “Ontdek meer”-links verwijzen naar de bestaande contactpagina, omdat er nog geen afzonderlijke dienstpagina’s zijn.

Visueel gecontroleerd op 1280 en 390 px, zonder horizontale overflow. Reduced motion geeft transition-duration 0s. Screenshots: qa/services-desktop.jpg en qa/services-mobile.jpg.

## Werk dat voor zich spreekt

Nieuwe sectie direct na Diensten, met het originele Odette Lunettes-neonbord als uitgelicht beeld. Bijschrift: “Voor Odette Lunettes bracht Max het neonbord onder stroom.” De andere beelden zijn bestaande Kreemers-foto’s van railverlichting en bedrading in een verdeelbord. Er zijn geen nieuwe projectnamen of resultaten toegevoegd.

Desktop: asymmetrisch grid met groot hoofdbeeld en twee kleinere beelden. Mobiel: één kolom. Alle beelden laden lazy als bestaande WebP. Hover en toetsenbordfocus geven een kleine zoom; reduced motion schakelt beweging uit. Foto’s en de duidelijke tekstlink verwijzen naar de bestaande lokale realisatiepagina.

Gecontroleerd: alle drie beelden geladen, geen overflow bij 1280 en 390 px, één mobiele kolom, reduced-motion transition 0s, werkende navigatie via “Bekijk alle realisaties”. Screenshots: qa/showcase-desktop.jpg en qa/showcase-mobile.jpg.

## Hero als achtergrond

De video beslaat nu de volledige hero, met 20% zichtbaarheid op desktop en 16% op mobiel. De losse videokolom en mobiele beeldstrook zijn vervallen. De bestaande lichte videobron, tekst en automatische pauzelogica blijven behouden. Gecontroleerd op 1280 en 390 px: video speelt, achtergrond beslaat de volledige breedte, geen horizontale overflow. Screenshot: qa/hero-background-desktop.jpg.

## Copywriting

Op verzoek is de tekst op Home, Realisaties en Over Max concreter herschreven. Toon: Max spreekt zelf, korte zinnen en herkenbare vragen over elektriciteit. Beschrijf werkzaamheden en keuzes (stopcontacten, verlichting, bedrading, bediening); vermijd algemene slogans over passie, kwaliteit, slimme upgrades en toekomstbestendigheid. Geen niet-bevestigde projectresultaten, cijfers of garanties toevoegen.

Hero: “Bouwen of verbouwen. Ik regel de stroom.” De diensten beschrijven praktische situaties. Realisaties beschrijft wat er op de foto’s staat. Over Max vertelt zijn bestaande achtergrond en legt de werkwijze uit. Contactacties vertellen wat de bezoeker kan bespreken.

Homepage gecontroleerd op desktop en mobiel: geen overflow, primaire actie op mobiel binnen de eerste 490 px. Screenshots: qa/copy-desktop.jpg en qa/copy-mobile.jpg.

## Typografie, beweging en Contact

Alle vier pagina’s gebruiken lokaal Manrope (400–700), met OFL-licentie in assets/fonts. De hero-video heeft playbackRate 0.65; de bestaande videobron van circa 252 KB blijft dezelfde.

Nieuwe contact.html met de echte telefoon- en mailgegevens van Max, projectkeuze en native details/summary-vragen. De mailactie opent het eigen mailprogramma; er is geen serverformulier. Alle contactlinks wijzen nu naar deze lokale pagina.

Beweging: lichte parallax op projectbeelden, bewegend portret bij scrollen, geleidelijke sectie-entrees, blauwe leesvoortgang en kleine knopbeweging. Scrollberekeningen gebruiken requestAnimationFrame en passive listeners. Reduced motion stopt deze effecten en houdt alle inhoud zichtbaar.

Gecontroleerd: font geladen, snelheid 0.65, bestaande lokale links/assets, projectkeuze wijzigt mailonderwerp, FAQ opent, parallax-offset verandert bij scrollen. Geen horizontale overflow op mobiel voor alle pagina’s en desktop voor Contact. Reduced motion: transform none en geen verborgen entrees. Screenshots: qa/contact-desktop.jpg en qa/contact-mobile.jpg.
