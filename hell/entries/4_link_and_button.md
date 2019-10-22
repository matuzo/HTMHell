---
title: "#4 link-also-button"
date: 2019-10-22
author: hidde
permalink: /{{ title | slug }}/index.html
badcode: '<a href="https://example.com"><button>Example</button></a>'
goodcode: '<a href="https://example.com" class="button">Example</a>'

goodcodeCSS: '.button {
/* use CSS to apply button-like styles to the link */

}'
---

<div class="section">

## Bad code

```html
{{ badcode | pretty }}
```
</div>

<div class="section">

## Issues and how to fix them

1. By nesting a button inside of a link, you're sending two messages: this is a button, but also this is a link.
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


