---
title: "#16 alt, no wait…, aria-label, no wait…, alt"
date: 2020-02-09T07:00:00
permalink: /alt-no-aria-label-no-alt/index.html
layout: layouts/entry.njk
author: spell
badcode: '<a tabindex="0">
  <div alt="Browser Wars: The Last Engine" aria-label="Browser Wars: The Last Engine">
    <div>
      <img alt="Browser Wars: The Last Engine" src="thumbnail.jpg">
    </div>
  </div>
</a>'
goodcode: '<a href="detail.html">
  <div>
    <img alt="Browser Wars: The Last Engine" src="thumbnail.jpg">
  </div>
</a>'
---
<div class="section bad">

Context: A list of images that link to detail pages.

## Bad code

```html
{{ badcode | pretty }}
```
</div>

<div class="section">

## Issues and how to fix them

1. > If the `<a>` element has no `href` attribute, then the element represents a placeholder for where a link might otherwise have been placed.  
(<a href="#foot-note1">HTML spec</a>)
1. If you're adding a click event to a placeholder link, you probably don't want to use a placeholder link, but an actual link with an `href` attribute or a `<button>`, depending on what's happening on click.
1. Placeholder links aren't focusable. `tabindex` makes them focusable, but the attribute is another indicator that a proper link would be a better choice here.

1. `alt` is not allowed on `div` elements and it has no effect on their semantic meaning.
1. Avoid `aria` attributes when possible. The `aria-label` attribute on the `div` is redundant, because the `img` already has an accessible name (the value of the  `alt` attribute).

</div>

<div class="section">

## Good code

```html
{{ goodcode | pretty }}
```
</div>

<div class="section">

## Resources

* <a href="https://html.spec.whatwg.org/#the-a-element" id="foot-note1" rel="noopener">The a element</a>
* [The accessibility of placeholder links ](https://www.scottohara.me/note/2019/07/17/placeholder-link.html)
</div>

