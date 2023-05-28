---
title: "#30 Bullet “list”"
date: 2022-01-13
seo_title: "30 bullet list"
permalink: /{{ seo_title | slug }}/index.html
layout: layouts/entry.njk
author: huy_ngo
badcode: '<p>  

• HTML<br> 

• CSS<br>

• JavaScript
</p>'
goodcode: '<ul>
<li>HTML</li>
<li>CSS</li>
<li>JavaScript</li>
</ul>'
---

<div class="section bad">

## Bad code

```html
{{ badcode | pretty }}
```
</div>

<div class="section" id="issues">

## Issues and how to fix them

1. Use `<p>` for paragraphs, not lists. The standard way for creating basic lists is `<ul>` (when the order doesn't matter) or `<ol>` (when the order matters), and `<li>` for each item.
1. The “list” won't be announced as a list when using a screen reader.
1. `<ul>` and `<ol>` provide [useful semantic information](/tips/ol-vs-ul-vs-div/). What and how assistive technology announces information differs, but:
    1. screen readers might announce it as a “list with items”
    1. screen readers might announce the number of items in the list, e.g. “list with 3 items”
    1. screen readers might announce the bullet or number of each item
    1. screen readers might announce when you enter or leave a list
1. Screen reader users may use shortcuts to jump from list to list on a page
1. `<ul>` and `<ol>` provide a selector for styling in CSS
1. When copying the fake list, all the bullets will go along with it
1. You can turn the bullet into a fire emoji using `::marker` 🔥

</div>

<div class="section">

## Good code

```html
{{ goodcode | pretty }}
```
</div>
