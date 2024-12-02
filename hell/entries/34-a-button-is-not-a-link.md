---
title: "#34 a button is not a link"
date: 2024-11-26
permalink: /{{ title | slug }}/index.html
layout: layouts/entry.njk
author: moritzglantz
badcode: "<button type=\"button\" onclick=\"window.open('https://example.com/other-page')\">Link target description</button>"
goodcode: '<a href="https://example.com/other-page">Link target description</a>'
---

<div class="section bad">

## Bad code

```html
{{ badcode | pretty }}
```
</div>

<div class="section" id="issues">

## Issues and how to fix them

1. A button opening a link will be unexpected behavior for screen reader users. No matter how it is styled.
1. Links disguised as buttons won’t show up in the link list of a site in assistive technologies.
1. Use links for navigation to other pages or sections, and buttons for actions performed on the current page or within the application.

</div>

<div class="section">

## Good code

```html
{{ goodcode | pretty }}
```
</div>

<div class="section">

<h2 id="resources">Resources</h2>

- [`<a>` on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a)
- [`<button>` on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button)
- [Buttons vs. Links by Eric Eggert](https://yatil.net/blog/buttons-vs-links)

</div>
