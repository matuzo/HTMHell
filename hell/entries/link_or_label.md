---
title: "#13 link or label"
date: 2020-01-15T13:00:00
permalink: /{{ title | slug }}/index.html
layout: layouts/entry.njk
author: odepax
badcode: '<input type="checkbox" id="accept" required>  

  <label for="accept">
    <a href="/legal">
      I accept the confidentiality policy and data…
  </a>
</label>'
goodcode: '<input type="checkbox" id="accept" required>

  <label for="accept">
    I accept the confidentiality policy and data…
</label> 

(read <a href="/legal">Terms and conditions</a>)'
---


<div class="section bad">

## Bad code

```html
{{ badcode | pretty }}
```
</div>

<div class="section" id="issues">

## Issues and how to fix them

1. It’s bad practice to nest elements with [activation behavior](https://www.w3.org/TR/html52/editing.html#activation-behavior) (e.g. click).
1. Users don’t expect a new page to open when they click a label.
1. The ability to click a label provides usability and accessibility benefits (larger hit area).
1. Place links outside the `label` element.

</div>

<div class="section">

## Good code

```html
{{ goodcode | pretty }}
```
</div>

<div class="section">

## Resources

* [4.10.4. The label element](https://www.w3.org/TR/html52/sec-forms.html#the-label-element)
* [Be Wary of Nesting Roles by Adrian Roselli](https://adrianroselli.com/2016/12/be-wary-of-nesting-roles.html)

</div>
