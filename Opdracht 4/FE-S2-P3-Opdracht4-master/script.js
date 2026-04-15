const modalElement = document.querySelector('div#modal');
const openButton = document.querySelector('#open-modal');
const closeButton = document.querySelector('#close-modal');

const closeModal = () => {
  modalElement.classList.remove('visible');
  setTimeout(() => {
    modalElement.style.display = 'none';
  }, 1200);
};

openButton.addEventListener('click', () => {
  modalElement.style.display = 'flex';
  setTimeout(() => {
    modalElement.classList.add('visible');
  }, 5);
});

closeButton.addEventListener('click', closeModal);

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeModal();
  }
});

modalElement.addEventListener('click', (event) => {
  if (event.target === modalElement) {
    closeModal();
  }
});