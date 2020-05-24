---
title: "#18 main divigation"
date: 2020-03-22T07:00:00
permalink: /{{ title | slug }}/index.html
layout: layouts/entry.njk
author: christophfreyer
badcode: '<div class="nav">
 <div>
   <div>about</div>
   <div>thoughts</div>
 </div>
</div>'
goodcode: '<nav>
 <ul class="nav">
   <li><a href="/about">about</a></li>
   <li><a href="/thoughts">thoughts</a></li>
 </ul>
</nav>'
---
<div class="section bad">

Context: The main navigation of a personal website.

## Bad code

```html
{{ badcode | pretty }}
```
</div>

<div class="section" id="issues">

## Issues and how to fix them

1. {{ snippets.div_semantics }}
1. Use `<nav>` for the main navigation, it represents a [landmark](https://www.scottohara.me/blog/2018/03/03/landmarks.html) with links to external or internal pages. Screen reader users may use shortcuts to access the navigation directly or skip it.
1. Use `<ul>` or `<ol>` to structure related links semantically and visually. Screen readers usually announce the number of items in a list.
1. If the order of items in the navigation matters, use `<ol>`, otherwise `<ul>`.
1. {{snippets.div_click }} Use `<a href="">` to link to other pages. It’s (more) accessible to keyboard, screen reader, and mouse users than a fake JavaScript-only link.

</div>

<div class="section">

## Good code

```html
{{ goodcode | pretty }}
```
</div>

<div class="section">

<h2 id="resources">Resources</h2>

* [4.3.4. The nav element](https://www.w3.org/TR/html52/sections.html#the-nav-element)
* [Menu Structure ](https://www.w3.org/WAI/tutorials/menus/structure/)
* [Menus & Menu Buttons ](https://inclusive-components.design/menus-menu-buttons/)

</div>
```
