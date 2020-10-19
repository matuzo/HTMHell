---
title: "#22 the good ol’ div link"
seo_title: "22 the good ol div link"
date: 2020-10-14T07:00:00
permalink: /{{ seo_title | slug }}/index.html
layout: layouts/entry.njk
author: mmatuzo
badcode: '<div>About us</div>'
badcode2: "<div onClick=\"location.href='about.html'\">

About us

</div>"
badcode3: '<div data-page="aboutus" data-url="index.php">

    About us
    
</div>'
goodcode: '<a href="aboutus.html">

About us

</a>'
---
<div class="section bad">
Context: A link to another page.

## Bad code

```html
{{ badcode | pretty }}
```
```html
{{ badcode2 | pretty }}
```
```html
{{ badcode3 | pretty }}
```

…or any other variation of this pattern where an element other than `<a>` is used to link to a page.

</div>

<div class="section" id="issues">

## Issues and how to fix them

1. {{ snippets.div_semantics }}
1. {{ snippets.div_click }} {{ snippets.a_click }}
1. {{ snippets.div_focus }}
1. The context menu on right click doesn’t provide options like “Open in new tab/window” or “Bookmark this link”.
1. By default, screen readers just announce the text in a `div` (e.g. “about us”), in a proper link (`<a>`) a screen reader announces the text and the role (e.g. “about us, link”).
1. Attributes like `aria-label` might not work (properly) on `div` elements.
1. Screen reader users may use a shortcut to list all links in a page. <em>“div-links”</em> wouldn’t be listed, unless they have a role of “link”.

</div>

<div class="section">

## Good code

```html
{{ goodcode | pretty }}
```
</div>
