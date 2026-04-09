# FE-S2-P3-Opdracht4

**Ondertussen weten jullie nu wat EventListeners zijn. Hiermee kunnen we dus inhaken op evenementen die plaatsvinden in de browser of handelingen die de gebruiker uitvoert. 
Vorige opdracht zijn jullie aan de slag geweest met het evenement "click". In deze opdracht gaan we aan de slag met "input" en "change". Maar voordat we gaan inhaken op de evenementen gaan we eerst de functies schrijven.**

Onderwijs Online Link: https://mboutrecht.onderwijsonline.nl/elearning/lesson/YyRRGjyl

### In te leveren:
- script.js

> ## Disclaimer: 
> Deze opdracht is zo opgezet dat er geen uitleg nodig is om het te laten werken.
> Alles staat of in de opdracht omschrijving, screenshots of aangeleverde code. 
> 
> Het grootste deel van de opdracht is herhaling van de vorige 3 opdrachten.
> KIJK DUS OOK GOED NAAR OPDRACHT 1, 2 EN 3. 
>
> Jullie mogen overleggen met medestudenten.
> LET OP! Deze opdracht is wel onderdeel van de kennistoets. 
> Zorg dus dat je het wel begrijpt!

# Opdracht A: Organisatie
Als de onderstaande punten niet op te lossen zijn. Ga dan naar de uitleg in de bijlage van deze Onderwijs Online module (onder de opdrachten). 

- In de FE-S2-P3 folder, run het clone commando op de GitHub repository die is aangemaakt toen je op de link klikte. 
  Als de Clone methode niet werkt, maak een nieuwe map aan en gebruik de Init methode. 

# Opdracht B: Functies
In index.html staat al een complete HTML structuur. En het aangeleverde CSS bestand zorgt ervoor dat er al een mooie pagina beschikbaar is. In deze opdracht gaan we ervoor zorgen dat er berichten ingevuld kunnen worden in de tekstvelden en dat ze verschijnen "op de telefoon" 

1. Eerst gaan we ervoor zorgen dat er een klein "wolkje" verschijnt als iemand aan het typen is. 
  Daarom gaan we een functie opstellen om die functionaliteit toe te voegen. 
  **Type het onderstaande over, en vul het commentaar aan!**
  ![opdr4-1](https://user-images.githubusercontent.com/51715045/157084355-8a77266b-18a5-4a68-9f4c-1b0d73660d41.png)
  
    *De variabele "person" wordt later gevuld met de waarde "p1" of "p2". Dus bij talkEl kunnen 2 elementen geselecteerd worden. 
    Het span element met het ID p1-talks of p2-talks.*
 
2. Als alles goed is gegaan, dan kan je deze functie alvast even gaan testen! Ga naar de browser en open de console. 
  En in de console kan je dan typen: show_talking('p1', 'test')
  
    **Console**
    ![opdr4-2](https://user-images.githubusercontent.com/51715045/157084479-1b138728-473b-436e-94c0-7ac9b7b386e0.png)
  
    **Resultaat**
    ![opdr4-3](https://user-images.githubusercontent.com/51715045/157084528-64c08e6d-107e-41eb-b661-dda46ac32fc3.png)
 
3. Nu gaan we ervoor zorgen dat er daadwerkelijk berichten getoond kunnen worden. Dus we gaan de functie "show_message" aanmaken. 
  **Type het onderstaande over en vul het commentaar aan.**
  ![opdr4-4](https://user-images.githubusercontent.com/51715045/157084665-c1c99799-6ca0-4435-8b5e-a05a5d742065.png)
 
# Opdracht C: Event listeners
In opdracht B hebben we nu de basis functionaliteiten toegevoegd voor deze applicatie. Alleen doet het nog weinig zonder de console. Daarom gaan we nu de EventListeners toevoegen. We moeten 2 verschillende events benaderen voor beide textvelden. 

1. Onder de 2 functies uit opdracht B. Gaan we verder programmeren. 
  Maak hier een variabele aan genaamd: textInputs en selecteer ALLE input elementen. 
 
2. Nu gaan we door de input elementen heen loopen. 
  **Neem het onderstaande over en vul het commentaar aan.**
    ![opdr4-5](https://user-images.githubusercontent.com/51715045/157085136-53d9fa42-550d-4c07-ab05-22b84816da96.png)
 
3. Nu gaan we de "luisteren" naar het evenement "input". Dit wordt afgevuurd iedere keer als er iets wordt ingevuld in een input element. We sturen nu de variabelen "person" mee en de waarde van het input element. 
  **Neem het onderstaande over. **
    ![opdr4-6](https://user-images.githubusercontent.com/51715045/157085234-7e4e4283-cc06-4884-826a-6739d513feb9.png)

    *Als dit is gelukt dan zul je de 3 puntjes te zien krijgen als je begint te typen in een tekstveld. *
 
4. Om er ook voor te zorgen dat het bericht uiteindelijk te zien is. Gaan we ook "luisteren" naar het evenement "change". Dit wordt afgevuurd op het moment dat een waarde van een input element is verandert. 
  **Neem het onderstaande over en vul het commentaar aan. **
    ![opdr4-7](https://user-images.githubusercontent.com/51715045/157085319-11b6fc2a-1059-4c44-8e0d-4b8a402f0cf1.png)
    
    *Als dit is gelukt, dan zul je uiteindelijk ook berichten kunnen typen en "verzenden". Door op "enter" te drukken of het andere text veld te selecteren. *
 
5. Als alles is gelukt uit opdracht B en C dan zul je ongeveer het onderstaande resultaat krijgen: 
  Is dit niet het geval. Lees dan eerst de opdracht nog eens goed! Kijk ook naar voorgaande opdrachten. Heel veel is herhaling. 
  Vraag ook klasgenoten om hulp! En raadpleeg eventueel Google. 
    ![opdr4-8](https://user-images.githubusercontent.com/51715045/157085386-1315605a-df05-4c25-b205-dda30ef52e2e.png)

