const modalElement = document.querySelector('div#modal');

const openButton = document.getElementsByTagName('button#open-modal');

openButton.addEventListener('click', () => {
  modalElement.style.display = 'flex';
  setTimeout(() => { modalElement.classList.add('visible') }, 5);
});

// @TODO: create variable closeButton and select div with id close-modal

// @TODO: add an EventListener to closeButton variable.
// @TODO: first class visible has to be removed.
// @TODO: after 1200 miliseconds style.display should be none.
