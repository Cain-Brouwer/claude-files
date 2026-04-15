function show_talking(person, value) {
    const talkEl = document.querySelector('span#'+person+'-talks');

    if (value.length > 0) {
        talkEl.classList.add('visible');}

    else {
        talkEl.classList.remove('visible');
    }
}

function show_message(person, value) {
    const conversationEl = document.querySelector('div#conversation');
    const messageEl = document.createElement('div');
    messageEl.classList.add(person);
    messageEl.classList.add('message');
    messageEl.textContent = value;

    conversationEl.appendChild(messageEl);
}

const textInputs = document.querySelectorAll('input');

textInputs.forEach(input => {
    const person = input.getAttribute('person');

    input.addEventListener('input', () => {
        show_talking(person, input.value);
    });

    input.addEventListener('change', () => {
        show_message(person, input.value);
        show_talking(person, '');
        input.value = '';
    });
});