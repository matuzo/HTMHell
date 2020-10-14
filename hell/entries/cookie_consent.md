---
title: "#9 Cookie Consent from Hell"
date: 2019-11-08T01:00:00
permalink: /{{ title | slug }}/index.html
layout: layouts/entry.njk
author: mmatuzo
badcode: '<body>
  <header>…</header>
  <main>…</main>
  <footer>…</footer>


  <div class="cookie_consent modal">
      <p>We use cookies…</p>
      <div class="cookie_consent__close"><i class="fa fa-times"></i></div>
      <div class="cookie_consent__ok">OK</div>
  </div>
</body>'
goodcode: '<body>
  <div class="cookie_consent modal">
      <h2 class="sr-only">Cookie notice</h2>
      <p>We use cookies…</p>
      <button class="cookie_consent__ok">OK</button>
      <button class="cookie_consent__close">
        <span class="sr-only">Close notification</span>
        <i class="fa fa-times" aria-hidden="true"></i>
      </button>
  </div>


  <header>…</header>
  <main>…</main>
  <footer>…</footer>
</body>'

goodcodeCSS: '.sr-only {
position: absolute;
white-space: nowrap;
width: 1px;
height: 1px;
overflow: hidden;
border: 0;
padding: 0;
clip: rect(0 0 0 0);
clip-path: inset(50%);
margin: -1px;
}'
---


<div class="section bad">

## Bad code

```html
{{ badcode | pretty }}
```
</div>

<div class="section" id="issues">

## Issues and how to fix them

1. The modal is not the first item on the page and focus is not on the modal when the page loads. Keyboard users have to tab through all items on the page to access the cookie consent window.
1. {{ snippets.div_focus }}
1. Content inside these `div`s is semantically just text. Assistive technology doesn’t know that these fake buttons are actually buttons.
1. {{ snippets.div_click }} {{ snippets.button_click }}
1. There’s no text alternative for the icon.
1. {{ snippets.fa_icons }}
1. {{ snippets.fa_times }}
1. Bonus: it should be possible to close modals by pressing <kbd>Esc</kbd>.
</div>

<div class="section">

## Good code

```html
{{ goodcode | pretty }}
```

{{ snippets.sr_only }}

```css
{{ goodcodeCSS | prettyCSS }}
```
</div>

<div class="section">

  <h2 id="resources">Resources</h2>

  1. [Screen readers and cookie consents](https://www.youtube.com/watch?v=Uaqo4FOI_DY)
</div>
