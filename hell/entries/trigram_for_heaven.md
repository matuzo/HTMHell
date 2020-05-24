---
title: "#11 The trigram for heaven"
date: 2019-11-29T01:00:00
permalink: /{{ title | slug }}/index.html
layout: layouts/entry.njk
author: mmatuzo
badcode: '<span class="nav-toggle">
☰ Menu
</span>'
goodcode: '<button class="nav-toggle" aria-expanded="false">
<span aria-hidden="true">☰</span> 
Menu
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

1. A screen reader may announce this as _trigram for heaven menu_, because ☰ is the unicode character for the [trigram for heaven](https://en.wikipedia.org/wiki/Bagua).
1. The purpose of the icon is decorative, it should be hidden from screen readers. Consider adding decorative images using background properties in CSS.
1. {{ snippets.span_click }} {{ snippets.button_click }}
1. A `span` isn’t keyboard focusable, but this element must be focusable, because it’s used for opening and closing the main navigation.
1. `aria-expanded` must be added to indicate wheather the main navigation is collapsed or not.

</div>

<div class="section">

## Good code

```html
{{ goodcode | pretty }}
```
</div>

<div class="section">

## Fun fact

> The Bagua or Pa Kua are eight symbols used in Taoist cosmology to represent the fundamental principles of reality, seen as a range of eight interrelated concepts. Each consists of three lines, each line either "broken" or "unbroken", respectively representing yin or yang. Due to their tripartite structure, they are often referred to as Eight Trigrams in English.
<https://en.wikipedia.org/wiki/Bagua>

</div>
