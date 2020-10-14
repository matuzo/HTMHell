---
title: "#20 HTMHell special: close buttons"
seo_title: 20-close-buttons
teaser: "This first HTMHell special inspects one of the most complicated and most controversial patterns in front-end development:  
  

🔥 the close button. 🔥   
  

In modals, ads, and other overlays you often find a button with a close symbol that allows users, or at least some of them, to close the overlay. This functionality is often limited to mouse users, because most implementations of close buttons suck.
    
    
After less than 2 hours of research, HTMHell presents a collection of 11 different bad practices."
date: 2020-05-23T07:00:00
permalink: /{{ seo_title }}/index.html
layout: layouts/entry.njk
author: mmatuzo
badcode: '<div class="close"></div>'
badcodeCSS: '.close::after {

  background: url("close.png");
  content: "";
}'
badcode2: '<div class="close">

✕

</div>'
badcode3: '<div class="close">

  <i class="fas fa-times"></i>

</div>'
badcodeCSS3: ".fa-times::before {
  
    content: '\\f00d';

}"

badcode4: '<a href="#" class="close">

</a>'
badcodeCSS4: 'a::after {
font-size: 28px;
display: block;
content: "×";
}
'

badcode5: '<a href="#" class="close">

Close

</a>'
badcodeCSS5: '.close::before {
    content: "\e028";
}
'
badcode6: '<a class="close" onclick="close()">×</a>'
badcode7: '
<a onclick="close();">
  <img src="close.png">
</a>
'
badcode8: '
<label class="close" for="close">
  <svg>
  …
  </svg>
</label>
<input id="close" type="radio">
'
badcodeCSS8: '[type="radio"] {
  display: none;
}'
badcode9: '<button class="close" type="button">

×

</button>'
badcode10: '<button class="close">
  <svg>
    …
  </svg>
</button>'
badcode11: '<div role="button" tabindex="0">X</div>'

goodcode: '<button type="button">

  Close

</button>
'
goodcode2: '<button type="button">

  Close

  <span aria-hidden="true">×</span>
</button>
'
goodcode3: '<button type="button">
  <span class="sr-only">Close</span>
  <span aria-hidden="true">×</span>
</button>
'
goodcodeCSS3: '.sr-only {
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
goodcode4: '<button type="button" aria-label="Close">
  <span aria-hidden="true">×</span>
</button>
'
goodcode5: '<button type="button" class="close" aria-label="Close">
  <span class="fa fa-times" aria-hidden="true"></span>
</button>

'
---
<div class="section">

{{ teaser }}

## Pattern 1: div and background image

```html
{{ badcode | pretty }}
```
```css
{{ badcodeCSS | prettyCSS }}
```

### Issues and how to fix them

1. {{ snippets.div_semantics }}
1. {{ snippets.div_click }} {{ snippets.button_click }}
1. {{ snippets.div_focus }}
1. There’s no text alternative for the background image.
1. Screen readers announce: Nothing.
</div>

<div class="section">

## Pattern 2: div and icon

```html
{{ badcode2 | pretty }}
```

### Issues and how to fix them

1. {{ snippets.timessign }}
1. See Pattern 1 for details about the `<div>`.
1. Screen readers may announce: something like “multiplication x” or “times”.

</div>

<div class="section">

## Pattern 3: Font Awesome icons

```html
{{ badcode3 | pretty }}
```
```css
{{ badcodeCSS3 | prettyCSS }}
```

### Issues and how to fix them

1. {{ snippets.csscontent }}<sup><a href="#resources"><span class="u-hidden">Footnote</span>1</a></sup>
1. {{ snippets.fa_icons }}
1. {{ snippets.fa_times }}
1. {{ snippets.i_elem }}
1. See Pattern 1 for details about the `<div>`.
1. Screen readers may announce: “times”.

</div>

<div class="section">

## Pattern 4: A close link

```html
{{ badcode4 | pretty }}
```
```css
{{ badcodeCSS4 | prettyCSS }}
```

### Issues and how to fix them

1. {{ snippets.ahref }}
1. {{ snippets.buttontypebutton }}
1. {{ snippets.linkvsbutton }}
1. {{ snippets.csscontent }}<sup><a href="#resources"><span class="u-hidden">Footnote</span>1</a></sup> {{ snippets.timessign }}
1. Screen readers may announce: “link, times”.

</div>

<div class="section">

## Pattern 5: A close link with text

```html
{{ badcode5 | pretty }}
```
```css
{{ badcodeCSS5 | prettyCSS }}
```

### Issues and how to fix them

1. Nice try, but it’s still a link and not a button.
1. See Pattern 4 for details about `<a>` and CSS generated content.
1. Screen readers may announce: “link, times close”.

</div>  


<div class="section">

## Pattern 6: A close link without the `href` attribute

```html
{{ badcode6 | pretty }}
```

### Issues and how to fix them

1. Another nice try, but a link without `href` is still not a button.
1. {{ snippets.aplaceholder }}<sup><a href="#resources"><span class="u-hidden">Footnote</span>2</a></sup>  
1. {{ snippets.aplaceholder_click }}  
1. {{ snippets.aplaceholder_focus }}
1. {{ snippets.linkvsbutton }}
1. Screen readers may announce: “times, clickable.”

</div>

<div class="section">

## Pattern 7: Placeholder link and img

```html
{{ badcode7 | pretty }}
```

### Issues and how to fix them

1. {{ snippets.noalt }}
1. See Pattern 6 for details about placeholder links.
1. Screen readers may announce: “close.png, image.”

</div>

<div class="section bad">

## Pattern 8: Radio button

```html
{{ badcode8 | pretty }}
```
```css
{{ badcodeCSS8 | prettyCSS }}
```

### Issues and how to fix them

1. When accessibility advocates say “[Just use button](https://www.youtube.com/watch?v=CZGqnp06DnI)” they mean the `button` element, not radio buttons.
1. Radio buttons are used in radio button groups describing **a set of related options**.
1. {{ snippets.svg}}
1. `display: none` on the `input` make the `label` inaccessible, too.
1. Screen readers may announce: Nothing.

</div>

<div class="section">

## Pattern 9: Button with icon

```html
{{ badcode9 | pretty }}
```

### Issues and how to fix them

1. {{ snippets.timessign }}
1. Screen readers may announce: “times, button”.

</div>

<div class="section">

## Pattern 10: Button with svg

```html
{{ badcode10 | pretty }}
```

### Issues and how to fix them

1. {{ snippets.svg}}
1. Screen readers may announce: “button”.

</div>

<div class="section">

## Pattern 11: The good ol' X

```html
{{ badcode11 | pretty }}
```

### Issues and how to fix them

1. {{ snippets.div_button }}
1. {{ snippets.div_tabindex }}
1. See Pattern 1 for details about the `<div>`.
1. The letter X is not a close icon.
1. Screen readers may announce: “X, button”.

<blockquote>
  Using "x" for your close buttons is like using salt in your coffee cause it looks the same as sugar.
</blockquote>
<cite><a href="https://twitter.com/mxbck/status/1187446513284325376">Max Böck</a></cite>

</div>

<div class="section">

You can find all [bad practices on CodePen](https://codepen.io/matuzo/pen/qBOvagg?editors=1100).

</div>

<div class="section">

## Alternatives

### Solution 1: A button with visible text and no icon.


```html
{{ goodcode | pretty }}
```

<button type="button">Close</button>

1. Text only: easy to implement and comprehensible.
1. Screen readers may announce: “Close, button”.

</div>
<div class="section">

### Solution 2: A button with visible text and only visually accessible icon.

```html
{{ goodcode2 | pretty }}
```

<button type="button">
  Close
  <span aria-hidden="true">×</span>
</button>

1. If you really have to use the times icon, hide it from screen readers by wrapping it in a `span` with `aria-hidden="true"`.
1. Screen readers may announce: “Close, button”.

</div>
<div class="section">

### Solution 3: A button with hidden text and only visually accessible icon.

```html
{{ goodcode3 | pretty }}
```
```css
{{ goodcodeCSS3 | prettyCSS }}
```

<button type="button">
  <span class="u-hidden">Close</span>
  <span aria-hidden="true">×</span>
</button>

1. {{ snippets.sr_only }}
1. Screen readers may announce: “Close, button”.

</div>
<div class="section">

### Solution 4: A button with hidden text and only visually accessible icon.

```html
{{ goodcode4 | pretty }}
```

<button type="button" aria-label="Close">
  <span aria-hidden="true">×</span>
</button>

1. If you don’t want to show text on screen, provide a text alternative for your icon or SVG by adding `aria-label` to the button.
1. Screen readers may announce: “Close, button”.

</div>
<div class="section">

### Solution 5: Font Awesome

For the sake of completeness, a close button with a Font Awesome icon.

```html
{{ goodcode5 | pretty }}
```

</div>

<div class="section">

### General remarks

Sometimes it makes sense to use more descriptive labels like “Close dialog”, “Close gallery”, or “Close ad”.

If you use third party solutions for modals, dialogs, etc., please check how they’ve been implemented before you add them to your site. Don’t rely on others for code quality and accessibility. 

You can find all [close button best practices on CodePen](https://codepen.io/matuzo/pen/zYvbmvm?editors=1100).

</div>

<div class="section">

<h2 id="resources">Resources</h2>

1. [Accessibility support for CSS generated content](https://tink.uk/accessibility-support-for-css-generated-content/)
1. [The a element](https://html.spec.whatwg.org/#the-a-element)
1. [The accessibility of placeholder links ](https://www.scottohara.me/note/2019/07/17/placeholder-link.html)
</div>
