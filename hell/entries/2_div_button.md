---
title: "div with button role"
date: 2019-10-17
author: schepp
badcode: '<div tabindex="-1">
  <div role="button">
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="24">
      …
    </svg>
  </div>
</div>'

goodcode: '<div tabindex="-1">
  <div role="button">
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="24">
      …
    </svg>
  </div>
</div>'
---

<div class="section">

## Bad code

```html
{{ badcode | pretty }}
```
</div>

<div class="section">

## What's bad about it

1. Wrong usage of the button element. There's a tag for linking to external sites (`<a>`).  
Do not change native semantics, unless you really have to.
1. It's possible to link to pages without JavaScript.
1. The `title` attribute is redundant.
1. The `tabindex` attribute is redundant. A button doesn't need `tabindex`, it's focusable by default.
</div>

<div class="section">

## Good code

```html
{{ goodcode | pretty }}
```
</div>


