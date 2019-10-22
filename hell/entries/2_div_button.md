---
title: "#2 div with button role"
date: 2019-10-17
author: schepp
permalink: /{{ title | slug }}/index.html
badcode: '<div tabindex="-1">
  <div role="button">
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="24">
      …
    </svg>
  </div>
</div>'

goodcode: '<button>
  <span class="sr-only">Send</span>
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="24" aria-hidden="true">
      …
    </svg>
</button>'

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

<div class="section">

## Bad code

```html
{{ badcode | pretty }}
```
</div>

<div class="section">

## What's bad about it

1. Setting button semantics explicitly isn't necessary, there's an element for that (`button`)
1. You don't need the `tabindex` attribute if you use a `button`. HTML buttons are focusable by default.
1. A click event on a `div` triggers only on click. A click event on a `button` triggers on click and if the users presses the <kbd>Enter</kbd> or <kbd>Space</kbd> key.
1. There's no text alternative for the icon.
</div>

<div class="section">

## Good code

```css
{{ goodcodeCSS | prettyCSS }}
```

```html
{{ goodcode | pretty }}
```
</div>


