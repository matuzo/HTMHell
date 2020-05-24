---
title: "#1 button disguised as a link"
date: 2019-10-17T01:00:00
permalink: /{{ title | slug }}/index.html
layout: layouts/entry.njk
author: mmatuzo
badcode: '<button role="link" title="Name of website" tabindex="0">
  <img alt="Name of website" src="logo.jpg" title="Name of website">
</button>'
goodcode: '<a href="https://"><img alt="Name of website" src="logo.jpg"></a>'
---

<div class="section bad">

## Bad code

```html
{{ badcode | pretty }}
```
</div>

<div class="section" id="issues">

## Issues and how to fix them

1. Wrong usage of the button element. There’s an element for linking to external sites (`<a>`). {{ snippets.native_semantics }}
1. It’s possible to link to pages without JavaScript.
1. The `title` attribute is redundant.
1. The `tabindex` attribute is redundant. A button doesn’t need `tabindex`, it’s focusable by default.
</div>

<div class="section">

## Good code

```html
{{ goodcode | pretty }}
```
</div>
