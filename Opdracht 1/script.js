const photoEl = document.querySelector('div.profiel-foto img');
photoEl.src = 'Kermit.webp';

const textEl = document.querySelector('div.veld-1 h1');
textEl.textContent = 'Cain Brouwer';

const birthdayEl = document.querySelector('.Geboortedatum p');
birthdayEl.textContent = '28-11-2008';

const emailEl = document.querySelector('.E-mail p');
emailEl.textContent = '344385@student.mboutrecht.nl';

const profielEl = document.querySelector('.veld-2 p');
profielEl.textContent = 'Ik ben Cain, een Software Development student met een passie voor technologie en het bouwen van dingen — zowel digitaal als in het echte leven. Naast het programmeren vind ik het heerlijk om achter het drumstel te kruipen, de tennisbaan op te gaan of de pistes af te scheuren op de snowboard. Als ik niet buiten bezig ben, game ik graag of duik ik in een nieuw project. Die mix van creativiteit, precisie en energie breng ik ook mee in mijn werk als developer.';

const educationArr = [
    {
        title: 'MBO Utrecht Software Developer',
        duration: 'sep. 2025 - juli. 2028',
        school: 'MBO Utrecht',
        description: 'MBO Utrecht is een regionaal opleidingscentrum in Utrecht dat een breed scala aan mbo-opleidingen aanbiedt. De school richt zich op praktijkgericht onderwijs waarbij studenten worden voorbereid op de arbeidsmarkt of een vervolgopleiding. Met verschillende niveaus en sectoren zoals ICT, zorg, economie en techniek biedt MBO Utrecht voor veel studenten een passende opleiding.'
    },
    {
        title: 'HBO ICT',
        duration: 'sept. 2030 - juli. 2034',
        school: 'De Haagse Hogeschool',
        description: 'De Haagse Hogeschool is een grote hogeschool in Den Haag met ruim 27.000 studenten. De school biedt een breed aanbod aan hbo-opleidingen in sectoren zoals techniek, economie, recht, gezondheidszorg en IT. Met een sterke focus op internationalisering en praktijkgericht onderwijs bereidt De Haagse Hogeschool studenten voor op een carrière in een globaliserende arbeidsmarkt.'
    }
];

const educationEl = document.querySelector('.lijst');
educationEl.innerHTML = '';

educationArr.forEach(education => {
    let newItem = document.createElement('li');
    newItem.innerHTML =
        '<strong>' + education.title + '</strong>' +
        '<span class="periode">' + education.duration + '</span>' +
        '<span class="school">' + education.school + '</span>' +
        '<p class="beschrijving">' + education.description + '</p>';
    educationEl.appendChild(newItem);
});

const jobsArr = [
    {
        title: 'Medewerker wijn/groente',
        duration: ' ',
        business: 'Lekker Flesje Wijn',
        description: 'Als medewerker bij Lekker Flesje Wijn help ik klanten met het uitzoeken van de juiste wijn en verzorg ik de dagelijkse werkzaamheden in de winkel.'
    },
    {
        title: 'Vakkenvuller/Kassa Teamleider',
        duration: ' ',
        business: 'Jumbo',
        description: 'Bij de Jumbo ben ik verantwoordelijk voor het vullen van de vakken en het aansturen van het kassateam.'
    }
];

const jobsEl = document.querySelector('.jobs');
jobsEl.innerHTML = '';

jobsArr.forEach(job => {
    let newItem = document.createElement('li');
    newItem.innerHTML =
        '<strong>' + job.title + '</strong>' +
        '<span class="periode-job">' + job.duration + '</span>' +
        '<span class="school">' + job.business + '</span>' +
        '<p class="beschrijving">' + job.description + '</p>';
    jobsEl.appendChild(newItem);
});