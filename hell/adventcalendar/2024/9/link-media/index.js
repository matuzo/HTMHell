const themeLight = document.querySelector('meta[name=theme-color][media*=prefers-color-scheme][media*=light]');
const themeDark = document.querySelector('meta[name=theme-color][media*=prefers-color-scheme][media*=dark]');
const styleLight = document.querySelector('link[rel=stylesheet][media*=prefers-color-scheme][media*=light]');
const styleDark = document.querySelector('link[rel=stylesheet][media*=prefers-color-scheme][media*=dark]');
const switchButtons = document.querySelectorAll('.scheme-switcher__button');

switchButtons.forEach(button => {
  button.addEventListener('click', () => {
    console.log('click');
    const currentButton = button;

    switchButtons.forEach(
      button => button.setAttribute(
        'aria-pressed',
        button === currentButton
      )
    );

    switchScheme(button.value);
  });
});

function switchScheme(scheme) {
  let lightMedia;
  let darkMedia;

  if (scheme === 'auto') {
    lightMedia = '(prefers-color-scheme: light)';
    darkMedia = '(prefers-color-scheme: dark)';
  } else {
    lightMedia = (scheme === 'light') ? 'all' : 'not all';
    darkMedia = (scheme === 'dark') ? 'all' : 'not all';
  }

  themeLight.media = lightMedia;
  themeDark.media = darkMedia;
  styleLight.media = lightMedia;
  styleDark.media = darkMedia;
}
