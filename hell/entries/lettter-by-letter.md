---
title: "#15 letter by letter"
date: 2020-01-24T07:00:00
permalink: /{{ title | slug }}/index.html
layout: layouts/entry.njk
author: claire
badcode: '<h3>
  <div style="display: block; text-align: start; position: relative;" class="title">
    <div style="position: relative; display: inline-block; transform: rotateX(90deg); transform-origin: 50% 50% -30.8917px;" class="char">H</div>
    <div style="position: relative; display: inline-block; transform: rotateX(90deg); transform-origin: 50% 50% -30.8917px;" class="char">e</div>
    <div style="position: relative; display: inline-block; transform: rotateX(90deg); transform-origin: 50% 50% -30.8917px;" class="char">a</div>
    <div style="position: relative; display: inline-block; transform: rotateX(90deg); transform-origin: 50% 50% -30.8917px;" class="char">d</div>
    <div style="position: relative; display: inline-block; transform: rotateX(90deg); transform-origin: 50% 50% -30.8917px;" class="char">i</div>
    <div style="position: relative; display: inline-block; transform: rotateX(90deg); transform-origin: 50% 50% -30.8917px;" class="char">n</div>
    <div style="position: relative; display: inline-block; transform: rotateX(90deg); transform-origin: 50% 50% -30.8917px;" class="char">g</div>
  </div>
</h3>'
goodcode: '<h3>
  Heading
</h3>'
goodcode2: '<h3 class="title">
  <span class="sr-only">Heading</span>
    <div aria-hidden="true">
      <div style="transform-origin: 50% 50% -30.8917px;" class="char">H</div>
      <div style="transform-origin: 50% 50% -30.8917px;" class="char">e</div>
      <div style="transform-origin: 50% 50% -30.8917px;" class="char">a</div>
      <div style="transform-origin: 50% 50% -30.8917px;" class="char">d</div>
      <div style="transform-origin: 50% 50% -30.8917px;" class="char">i</div>
      <div style="transform-origin: 50% 50% -30.8917px;" class="char">n</div>
      <div style="transform-origin: 50% 50% -30.8917px;" class="char">g</div>
    </div>
</h3>'
goodcode2CSS: '.title {
  display: block; text-align: start; position: relative;
}

.char {
  position: relative; display: inline-block; transform: rotateX(90deg);
}

.sr-only {
position: absolute;
white-space: nowrap;
width: 1px;
height: 1px;
overflow: hidden;
border: 0;
padding: 0;
clip: rect(0 0 0 0);
clip-path: inset(50%);
margin: -1px;
}'
---
<div class="section bad">

## Bad code

Letters are wrapped in `div`s to animate each letter with JavaScript.

```html
{{ badcode | pretty }}
```
</div>

<div class="section" id="issues">

## Issues and how to fix them

1. Assistive technology may announce the word letter by letter, if each letter is wrapped in an element.
    <div class="video"><iframe loading="lazy" width="700" height="394" src="https://www.youtube.com/embed/-Q4xk1QMex0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen title="VoiceOver demo: Each letter in a heading wrapped in a div"></iframe></div>
    <a href="https://codepen.io/matuzo/pen/vYEbmxp">Code for this demo</a>

1. {{ snippets.dom_size }}
1. {{ snippets.dom_tree }}
2. The separation of presentation from content is advised. Move styles that don’t change dynamically into a CSS file.

</div>

<div class="section">

## Good code (Solution 1)

```html
{{ goodcode | pretty }}
```
</div>

<div class="section">

## Good code (Solution 2)

If you really have to.  
Provide an accessible version of the text for screen readers and hide the inaccessible text by using `aria-hidden="true"`.

```html
{{ goodcode2 | pretty }}
```

{{ snippets.sr_only }}

```css
{{ goodcode2CSS | pretty }}
```

</div>

<div class="section">

## Resources

* [Uses An Excessive DOM Size](https://developers.google.com/web/tools/lighthouse/audits/dom-size)
* [Performance and the Accessibility Tree](https://www.technica11y.org/performance-and-the-accessibility-tree)
</div>
