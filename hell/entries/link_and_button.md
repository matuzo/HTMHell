---
title: "#4 link-also-button"
date: 2019-10-22T02:00:00
author: hidde
permalink: /{{ title | slug }}/index.html
badcode: '<a href="https://example.com"><button>Example</button></a>'
goodcode: '<a href="https://example.com" class="button">Example</a>'

goodcodeCSS: '.button {
/* use CSS to apply button-like styles to the link */

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

1. By nesting a button inside of a link, you're sending two messages: this is a button, but also this is a link.
If you're not sure when to use `<a>` or `<button>`, watch [The Links vs. Buttons Showdown](https://www.youtube.com/watch?v=8XjwDq9zG4I) by [Marcy Sutton](https://twitter.com/marcysutton).
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


