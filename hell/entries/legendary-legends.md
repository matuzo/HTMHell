---
title: "#21 Legendary legend!"
seo_title: "#21 Legendary legend"
date: 2020-07-24T07:00:00
permalink: /{{ seo_title | slug }}/index.html
layout: layouts/entry.njk
author: vavroom
badcode: '<button class="panel-heading" tabindex="0" href="#collapse0" aria-expanded="true">
    <legend >
        Industries Served
    </legend>
</button>'
goodcode: '<button class="panel-heading" aria-expanded="true">

Industries Served

</button>'
---
<div class="section bad">

Context: A button that expands and collapses a section of text.

## Bad code

```html
{{ badcode | pretty }}
```
</div>

<div class="section" id="issues">

## Issues and how to fix them

1. `legend` is not allowed as a child of any other element than `fieldset`.
(<a href="#foot-note1">HTML spec for legend</a>)
1. {{ snippets.div_tabindex }}  
1. `href` attribute is not allowed on the `button` element.
(<a href="#foot-note2">HTML spec for button</a>)

</div>

<div class="section">

## Good code

```html
{{ goodcode | pretty }}
```
</div>

<div class="section">

## Resources

* <a href="https://html.spec.whatwg.org/#the-legend-element" id="foot-note1" rel="noopener">The legend element</a>
* <a href="https://html.spec.whatwg.org/#the-button-element" id="foot-note2" rel="noopener">The button element</a>

</div>

