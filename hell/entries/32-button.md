---
title: "#32 almost a proper close button"
date: 2022-07-18
permalink: /{{ title | slug }}/index.html
layout: layouts/entry.njk
author: mmatuzo
badcode: '<button display="flex" role="button">
  <svg role="img" viewBox="0 0 13 13" aria-hidden="false" xmlns="http://www.w3.org/2000/svg" height="15px" width="15px" fill="#000" name="close">
    <title>Close dialog</title>
    <path d="…">
    </path>
  </svg>
</button>'
goodcode: '<button type="button" data-display="flex">
  <svg role="img" viewBox="0 0 13 13" xmlns="http://www.w3.org/2000/svg" height="15" width="15" fill="#000" aria-labelledby="title">
    <title id="title">Close</title>
    <path d="…">
    </path>
  </svg>
</button>'
---

<div class="section bad">

## Bad code

```html
{{ badcode | pretty }}
```
</div>

<div class="section" id="issues">

## Issues and how to fix them

1. Either turn the `<svg>` into a semantic element (`role="img"`) or exclude it from the accessibility tree (`aria-hidden="true"`). Doing both makes no sense.
1. The button has no accessible name (a text alternative). The `title` element in the `svg` would serve as the accessible name, but `aria-hidden="true"` makes the whole SVG inaccessible to assistive technology. 
1. Even without `aria-hidden="true"`, some screen reader/browser combinations might not recognise the `<title>` element. Label the `<svg>` using `aria-labelledby` or `aria-label`.
1. The `role=button` attribute and value for the button is redundant. Its implicit default role is “button”.
1. There's no `display` attribute. If you need custom attributes, use the `data-`  prefix.
1. The `name` attribute is not allowed on `<svg>`
1. The value of the `width` and `height` attributes should be a valid non-negative integer.
1. Add a `type="button"` attribute and value to prevent the button from submitting a form, if there is one.

</div>

<div class="section">

## Good code

```html
{{ goodcode | pretty }}
```
</div>

<div class="section">

## Demo of Voice Over on macOS

Voice Over doesn't recognize the title element nested in a svg nested in a button.


<video src="/images/svgbutton.mov" controls width="200">
  <p>Something went wrong, please visit <a href="https://htmhell.dev/32-almost-a-proper-close-button/">htmhell.dev/32-almost-a-proper-close-button/</a> to view this video.
</video>

Code on [CodePen](https://codepen.io/matuzo/pen/LYdWpwP?editors=1000).

</div>