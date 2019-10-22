---
title: "#3 image-buttons"
date: 2019-10-22
author: mmatuzo
permalink: /{{ title | slug }}/index.html
badcode: '<img src="/images/edit.gif" onclick="openEditDialog(123)">
<img src="/images/delete.gif" onclick="openDeleteDialog(123)">'
goodcode: '<button onclick="openEditDialog(123)">
  <img src="/images/edit.gif" alt="Edit product XY">
</button>

<button onclick="openDeleteDialog(123)">
  <img src="/images/delete.gif" alt="Delete product XY">
</button>'
---

<div class="section">

## Bad code

```html
{{ badcode | pretty }}
```
</div>

<div class="section">

## What's bad about it

1. The purpose of the `img` element is to display images, not to execute JavaScript.
1. A click event on a `img` triggers only on click. A click event on a `button` triggers on click and if the users presses the <kbd>Enter</kbd> or <kbd>Space</kbd> key.
1. There's no text alternative for the image.
</div>

<div class="section">

## Good code

```html
{{ goodcode | pretty }}
```
</div>


