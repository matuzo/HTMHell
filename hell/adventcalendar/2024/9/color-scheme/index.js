const colorScheme = document.querySelector('meta[name=color-scheme]');
const switchButtons = document.querySelectorAll('.scheme-switcher__button');

switchButtons.forEach(button => {
  button.addEventListener('click', () => {
    const currentButton = button;

    switchButtons.forEach(
      button => button.setAttribute(
        'aria-pressed',
        button === currentButton
      )
    );

    colorScheme.content = button.value;
  });
});
