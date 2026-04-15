# FE-S2-P3-Opdracht5

**We zijn nu al een tijdje bezig met JavaScript en jullie weten ondertussen hoe je elementen moet selecteren met de querySelector en querySelectorAll functies. En hoe je aan die elementen EventListeners koppelt om functionaliteiten toe te voegen.**

**In deze opdracht zul je eerst een aantal problemen moeten oplossen. Als dat is gelukt zal je de opdracht moeten uitbouwen en zal je niet alleen de vorige opdrachten moeten raadplegen, maar ook Google moeten gebruiken.**

Onderwijs Online Link: https://mboutrecht.onderwijsonline.nl/elearning/lesson/dyAjZEDx


> ## Disclaimer: 
> Deze opdracht is zo opgezet dat er geen uitleg nodig is om het te laten werken.
> Alles staat of in de opdracht omschrijving of aangeleverde code. 
> 
> De basis opdracht is erg makkelijk als je goed leest!
> ###Daarom wordt er wel verwacht dat er minimaal 1 extra opdracht wordt gemaakt.
> 
> Het grootste deel van de opdracht is herhaling van de vorige 3 opdrachten.
> KIJK DUS OOK GOED NAAR OPDRACHT 1, 2 EN 3. 
> Voor SCSS en CSS kan je ook opdrachten van vorige periodes raadplegen!
> 
> Jullie mogen overleggen met medestudenten.
> LET OP! Deze opdracht is wel onderdeel van de kennistoets. 
> Zorg dus dat je het wel begrijpt!


### In te leveren:
- script.js
- style.scss
- index.html

# Opdracht A: Organisatie
Als de onderstaande punten niet op te lossen zijn. Ga dan naar de uitleg in de bijlage van deze Onderwijs Online module (onder de opdrachten). 

- In de FE-S2-P3 folder, run het clone commando op de GitHub repository die is aangemaakt toen je op de link klikte. 
  Als de Clone methode niet werkt, maak een nieuwe map aan en gebruik de Init methode. 

# Opdracht B: Kapotte modal
Er is een pagina aangeleverd, hierop is een modal* te vinden. De modal werkt niet naar behoren. 
Een developer heeft er al naar gekeken en heeft al een aantal problemen geconstateerd. Lees de stappen goed door. 
Hier staan de problemen verder uitgelegd en hoe je deze kan oplossen. 

*\*Een modal is een soort pop-up, die op de website te vinden is. Het zal dus niet een nieuw browser venster openen.*

**De 3 stappen voor deze opdracht staan duidelijk beschreven op Onderwijs Online.**
https://mboutrecht.onderwijsonline.nl/elearning/lesson/dyAjZEDx

# Extra Opdracht: Meer knoppen! (easy)
Als de vorige opdracht is gelukt, dan zal de modal werken in de basis. 
Alleen zoals de code nu geschreven is, werkt deze met maar 1 enkele knop. 
Dit komt omdat er gebruik wordt gemaakt van een ID. 

1. Voeg meer buttons toe en zorg dat deze een logische klasse hebben die straks geselecteerd kan worden. (index.html)
    - *De klasses c-1, c-2, c-3, c-4, c-5 en outline kunnen gebruikt worden om de knoppen er anders uit te laten zien.*
2. Nu zal je "openButton" moeten veranderen in "openButtons" (meervoud) en moet je "querySelector" veranderen in "querySelectorAll". Dan zal je de selector moeten aanpassen zodat de klasse uit stap 1 wordt geselecteerd kan worden.
3. Als je alle knoppen hebt geselecteerd, dan zul je door deze elementen heen moeten loopen met een forEach loop. En per element een EventListener toe moeten voegen die de modal opent. 
    - *Je kan opdracht 3 en 4 als voorbeeld gebruiken. Hier worden meerdere elementen geselecteerd en doorheen geloopt met een forEach loop en een EventListener toegevoegd.*

# Extra Opdracht: Meer manieren om te sluiten! (medium)
Op dit moment kan je de modal alleen sluiten als je op het kruisje klikt. 
Bij veel websites is het mogelijk om een modal op verschillende manieren te sluiten. 
Hieronder vind je 2 extra manieren: 

1. **Door op het zwarte gedeelte naast de content te klikken.**
    - Hierbij moet je er OOK voor zorgen dat de modal NIET sluit als er op de content geklikt wordt. 
      Je zult hierbij moeten gaan checken op welk element er geklikt is en of het niet het ID modal-content heeft.
2. **Door de knop "ESC" in de drukken.**
    - Je zult een EventListener op het body element moeten plaatsen die afvuurt wanneer de "ESC" knop wordt ingedrukt. 
    - Hiervoor kan je het event "keydown" gebuiken.

*TIP: De bovenstaande methodes zijn veel gemakkelijker toe te passen als er een functie gemaakt wordt die de modal doet sluiten.*

# Extra Opdracht: Meer modals! (hard)
Voor deze opdracht heb je al meerdere knoppen nodig!
Op dit moment kan je dezelfde modal met meerdere knoppen openen. 
Vaak wordt een modal voor meerdere doeleindes gebruikt, bijvoorbeeld: extra product informatie, uitgebreid profiel van een werknemer, een video, een grotere versie van een plaatje, inschrijfformulier...etc.

1. Zorg dat iedere knop de content van de modal verandert en opent. 
    - Het innerHTML attribuut van het div element met het ID modal-content zal aangepast moeten worden. Voordat de modal wordt geopent. 
    - Optie: Je kan de content laten aanpassen via HTML attributen op de knoppen. 
    - Optie: Je kan onzichtbare elementen op de pagina toevoegen en de content daarvan met JS kopieren en aan de modal toevoegen. 
    - Optie: Je kan in JavaScript de verschillende opties toevoegen. 
