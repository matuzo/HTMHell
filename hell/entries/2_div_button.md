---
title: "#2 div with button role"
date: 2019-10-17
author: schepp
permalink: /{{ title | slug }}/index.html
badcode: '<div tabindex="-1">
  <div role="button">
    <svg width="28" height="24">
      …
    </svg>
  </div>
</div>'

goodcode1: '<button>
  <span class="sr-only">Send</span>
    <svg width="28" height="24" aria-hidden="true">
      …
    </svg>
</button>'

goodcode1CSS: '.sr-only {
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

goodcode2: '<button aria-label="Send">
    <svg width="28" height="24" aria-hidden="true">
      …
    </svg>
</button>'
---

<div class="section">

## Bad code

```html
{{ badcode | pretty }}
```
</div>

<div class="section">

## Issues and how to fix them

1. Setting button semantics explicitly isn't necessary, there's an element for that (`button`)
1. You don't need the `tabindex` attribute if you use a `button`. HTML buttons are focusable by default.
1. A click event on a `div` triggers only on click. A click event on a `button` triggers on click and if the users presses the <kbd>Enter</kbd> or <kbd>Space</kbd> key.
1. There's no text alternative for the icon.
</div>

<div class="section">

## Good code

### Solution #1: Use button and place text for screenreaders inside

```css
{{ goodcode1CSS | prettyCSS }}
```

```html
{{ goodcode1 | pretty }}
```

### Solution #2: Use button and place text for screenreaders within `aria-label` attribute

For more information and example see [MDN | Using the aria-label attribute](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-label_attribute).

```html
{{ goodcode2 | pretty }}
```
</div>


