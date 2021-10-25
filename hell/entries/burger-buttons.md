---
title: "#26 HTMHell special: tasty buttons"
seo_title: 26-tasty-buttons
teaser: "The second HTMHell special focuses on another highly controversial pattern in front-end development:  


🔥 the burger button. 🔥


The burger button and his tasty friends (kebab, meatball and bento) usually reveal a list of links when activated. According to our studies, these buttons are highly optimized for mouse and touch users, but lack support for keyboard and screen reader users in most cases.
    

After less than 1 hours of research, HTMHell presents a collection of 18 different bad practices found on real websites."
date: 2021-10-25T07:00:00
permalink: /{{ seo_title }}/index.html
layout: layouts/entry.njk
author: mmatuzo
badcode: '<div class="burger">
  <span></span>
  <span></span>
  <span></span>
</div>'
badcode_b: '<div class="burger"></div>'
badcode_c: '<div class="burger">
  <div></div>
  <div></div>
  <div></div>
</div>'
badcodeCSS: '.burger {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 20px;
  cursor: pointer;
}

.burger span {
  height: 1px;
  display: block;
  background: #000;
}
'
badcode2: '<img class="menu" src="menu.png">'
badcode3: '<svg class="hamburger" viewBox="0 0 20 20" aria-labelledby="title">
  <title>Open Navigation</title>
	<g>
		<rect y="3" width="20" height="2"></rect>
		<rect y="9" width="20" height="2"></rect>
		<rect y="15" width="20" height="2"></rect>
	</g>
</svg>'
badcode4: '<button class="navbar-toggle" type="button">
  <span class="icon-bar"></span>
  <span class="icon-bar"></span>
  <span class="icon-bar"></span>
</button>'
badcode5: '<a class="menuButton"></a>'
badcode6: '<a role="button" aria-label="menu" aria-expanded="false" class="burger">
  <span aria-hidden="true"></span>
  <span aria-hidden="true"></span>
  <span aria-hidden="true"></span>
</a>'
badcode7: '<span class="mobile-nav" aria-hidden="true"> 

  Show nav  

  <span></span>  
  <span></span>  
  <span></span>  
  <span></span>
</span>'
badcode8: '<a class="toggle-link" href="javascript:">
<i class="fa fa-reorder"></i>
</a>'
badcode8_css: '.fa-reorder::before {
  content: "";
}' 
badcode9: '<div class="mega-toggle-block" tabindex="0">
  <span class="mega-toggle-label" role="button" aria-expanded="false">
  </span>
</div>'
badcode10: '<a href="#menutoggle" id="menutoggle">☰</a>'
badcode11: '<div class="bento">
  <input type="checkbox" id="bento">
  <label for="bento"></label>
</div>'
badcode11_css: '.bento label {
    background-image: url(data:image/svg+xml;charset=utf-8;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnPjxwYXRoIGQ9J00zIDNoNHY0SDN6bTE0IDBoNHY0aC00em0tNyAwaDR2NGgtNHptLTcgN2g0djRIM3ptMTQgMGg0djRoLTR6bS03IDBoNHY0aC00em0tNyA3aDR2NEgzem0xNCAwaDR2NGgtNHptLTcgMGg0djRoLTR6JyBmaWxsPScjQTdBQUIyJy8+PC9zdmc+);
    width: 30px;
    height: 30px;
    display: block;
  }

  .bento input {
    position: absolute;
    opacity: 0;
    pointer-events: none;
    left: -9999px;
    top: -9999px;
  }'
badcode12: '<ul class="offcanvas-icon">
  <li> 
    <a href="#" class="menu-button">
      <span class="dot1"></span>
      <span class="dot2"></span>
      <span class="dot3"></span>
      <span class="dot4"></span>
      <span class="dot5"></span>
      <span class="dot6"></span>
      <span class="dot7"></span>
      <span class="dot8"></span>
      <span class="dot9"></span>
    </a>
  </li>
</ul>'
badcode13: '<a href="https://example.com/">• • •</a>'
badcode14: '<div class="menu" title="Menu">
	<i></i>
	<i></i>
	<i></i>
</div>'
badcode15: '<button class="nav__toggle-button" aria-label="Hamburger Menu">
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <path d="M0 0h24v24H0z" fill="none"></path>
    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" fill="currentColor"></path>
  </svg>
</button>'
badcode16: '<button aria-label="All Company expand to see list of Company products and services" aria-expanded="false"></button>'
goodcode: '<button type="button" aria-expanded="false">

  Menu

</button>
'
goodcode2: '<button type="button" aria-expanded="false">
  <svg aria-hidden="true">
    …
  </svg>

  Menu
</button>
'
goodcode3: '<button type="button" aria-expanded="false">
  <span class="u-hidden">Menu</span>
  <svg aria-hidden="true">
    …
  </svg>
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
clip-path: inset(50%);
margin: -1px;
}'
goodcode4: '<button type="button" aria-label="Menu" aria-expanded="false">
  <svg aria-hidden="true">
    …
  </svg>
</button>
'
---
<div class="section">

{{ teaser }}

## Pattern 1: the unsemantic burger

```html
{{ badcode | pretty }}
```
```css
{{ badcodeCSS | prettyCSS }}
```

### Issues and how to fix them

1. {{ snippets.div_semantics }} {{ snippets.use_button }}
1. {{ snippets.div_click }} {{ snippets.button_click }}
1. {{ snippets.div_focus }}
1. {{ snippets.no_text }}
1. {{ snippets.aria_expanded }}
1. Screen readers announce: Nothing.

### Other variations of this pattern

#### The empty burger
```html
{{ badcode_b | pretty }}
```

#### The all div burger
```html
{{ badcode_c | pretty }}
```

</div>

<div class="section">

## Pattern 2: The classic image burger

```html
{{ badcode2 | pretty }}
```

### Issues and how to fix them

1. A click event on an `img` triggers only on click. {{ snippets.button_click }}
1. An `img` isn’t keyboard focusable.
1. {{ snippets.noalt }}
1. {{ snippets.aria_expanded }}
1. Screen readers may announce: menu.png, image.”

</div>

<div class="section">

## Pattern 3: The modern image burger

```html
{{ badcode3 | pretty }}
```

### Issues and how to fix them

1. A click event on an `svg` triggers only on click. {{ snippets.button_click }}
1. An `svg` isn’t keyboard focusable in most browsers (IE 11 is an exception).
1. The value of `aria-labelledby` references elements by their id, not by tag name.
1. {{ snippets.aria_expanded }}
1. Screen readers interpret `svg` elements differently. To get a consistent result the `role="img"` attribute should be present on the `svg`.
1. Screen readers may announce: “Open Navigation, graphic” or “Open Navigation, group.”

</div>


<div class="section">

## Pattern 4: Almost a burger

```html
{{ badcode4 | pretty }}
```

### Issues and how to fix them

1. {{ snippets.no_text }}
1. {{ snippets.aria_expanded }}
1. Screen readers announce: button.

</div>


<div class="section">

## Pattern 5: The placeholder link burger button

```html
{{ badcode5 | pretty }}
```

### Issues and how to fix them

1. A link without `href` is still not a button.
1. {{ snippets.aplaceholder }}<sup><a href="#resources"><span class="u-hidden">Footnote</span>2</a></sup>  
1. {{ snippets.aplaceholder_click }}  
1. {{ snippets.aplaceholder_focus }}
1. {{ snippets.no_text }}
1. {{ snippets.aria_expanded }}
1. Screen readers announce: probably nothing.

</div>

<div class="section">

## Pattern 6: The wannabe button burger link

```html
{{ badcode6 | pretty }}
```

1. {{ snippets.native_semantics }}
1. {{ snippets.aplaceholder }}<sup><a href="#resources"><span class="u-hidden">Footnote</span>2</a></sup>  
1. {{ snippets.aplaceholder_click }}  
1. {{ snippets.aplaceholder_focus }}
1. Screen readers may announce: “menu, collapsed, button”

</div>

<div class="section">

## Pattern 7: The unsemantic burger with extra bacon

```html
{{ badcode7 | pretty }}
```

### Issues and how to fix them

1. Pretty much the same as [Pattern 1: The unsemantic burger](#pattern-1-the-unsemantic-burger) except that this button has a label which is good, but it also has `aria-hidden="true"` which means that it's completely inaccessible to screen reader users.
1. Screen readers announce: Nothing.

</div>

<div class="section">

## Pattern 8: The JavaScript link burger button

```html
{{ badcode8 | pretty }}
```
```css
{{ badcode8_css) | prettyCSS }}
```

### Issues and how to fix them

1. {{ snippets.csscontent }}<sup><a href="#resources"><span class="u-hidden">Footnote</span>1</a></sup>
1. {{ snippets.fa_icons }}
1. {{ snippets.i_elem }}
1. {{ snippets.no_text }}
1. {{ snippets.linkvsbutton }}
1. {{ snippets.aria_expanded }}
1. Screen readers announce: “link”.

</div>

<div class="section">

## Pattern 9: The “I have no idea what I'm doing, let's just add some attributes” burger button

```html
{{ badcode9 | pretty }}
```

### Issues and how to fix them

1. {{ snippets.div_semantics }} {{ snippets.use_button }}
1. {{ snippets.div_click }} {{ snippets.button_click }}
1. The `div` is focusable, but it has no `role` or label.
1. The `span` tries to mimic a `button`, but it's not focusable and it has no label.
1. {{ snippets.div_tabindex }}
1. {{ snippets.no_text }}
1. Screen readers may announce: “group”.


</div>

<div class="section">

## Pattern 10: The heavenly anchor link burger button

```html
{{ badcode10 | pretty }}
```

### Issues and how to fix them

1. A screen reader may announce this as _trigram for heaven_, because ☰ is the unicode character for the [trigram for heaven](https://en.wikipedia.org/wiki/Bagua).
1. The purpose of the icon is decorative, it should be hidden from screen readers. Consider adding decorative images using background properties in CSS.
1. An anchor link is not a `<button>`.
1. An anchor link should not refer to itself.
1. {{ snippets.linkvsbutton }}
1. {{ snippets.aria_expanded }}
1. Screen readers announce: “trigram for heaven, link”.

</div>


<div class="section">

## Pattern 11: The bento checkbox button

<style>
  [data-component="burger"] label {
    background-image: url(data:image/svg+xml;charset=utf-8;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnPjxwYXRoIGQ9J00zIDNoNHY0SDN6bTE0IDBoNHY0aC00em0tNyAwaDR2NGgtNHptLTcgN2g0djRIM3ptMTQgMGg0djRoLTR6bS03IDBoNHY0aC00em0tNyA3aDR2NEgzem0xNCAwaDR2NGgtNHptLTcgMGg0djRoLTR6JyBmaWxsPScjQTdBQUIyJy8+PC9zdmc+);
    width: 30px;
    height: 30px;
    display: block;
  }

  [data-component="burger"] input {
    position: absolute;
    opacity: 0;
    pointer-events: none;
    left: -9999px;
    top: -9999px;
  }
</style>

<p data-component="burger">
  <input type="checkbox" id="burger">
  <label for="burger"></label>
</p>

```html
{{ badcode11 | pretty }}
```
```css
{{ badcode11_css) | prettyCSS }}
```

### Issues and how to fix them

1. A checkbox is not a `<button>`.
1. The default key events on a checkbox and a button are not the same.
1. {{ snippets.linkvsbutton }}
1. {{ snippets.aria_expanded }}
1. This “button” has no label.
1. Screen readers may announce: “unticked tickbox”.

</div>


<div class="section">

## Pattern 12: The bento list anchor link button

```html
{{ badcode12 | pretty }}
```

### Issues and how to fix them

1. Use `<ul>` to group and list related items, not as a button wrapper.
1. An anchor link is not a `<button>`.
1. CSS is quite powerful, you don't need 9 `span`s to display 9 dots.
1. {{ snippets.linkvsbutton }}
1. {{ snippets.aria_expanded }}
1. This “button” has no label.
1. Screen readers may announce: “list 1 item”.

</div>

<div class="section">

## Pattern 13: The meatball link

<style>
  .meatball {
    text-decoration: none;
  }
</style>

<a href="https://example.com/" class="meatball">• • •</a>

(Note: There was a click event on the link that prevented default.)

```html
{{ badcode13 | pretty }}
```

### Issues and how to fix them

1. A link is not a `<button>`.
1. The default key events on a link and a button are not the same.
1. {{ snippets.linkvsbutton }}
1. {{ snippets.aria_expanded }}
1. This “button” has no label.
1. Screen readers may announce: “link, bullet bullet bullet”.

</div>

<div class="section">

## Pattern 14: The kebab div button

<style>
  .kebab {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 30px;
    height: 38px;
    cursor: pointer;
  }

  .kebab i {
    background: #737473;
    height: 4px;
    width: 4px;
    margin: 4px auto;
    border-radius: 5px;
    display: block;
  }
</style>

<p class="kebab" title="Menu">
	<i></i>
	<i></i>
	<i></i>
</p>

```html
{{ badcode14 | pretty }}
```

### Issues and how to fix them

1. Pretty much the same as [Pattern 1: The unsemantic burger](#pattern-1-the-unsemantic-burger).
1. {{ snippets.i_elem }}
1. Screen readers may announce: nothing.
</div>


<div class="section">

## Pattern 15: The hamburger

```html
{{ badcode15 | pretty }}
```

### Issues and how to fix them

1. Not as bad as all the others, but the term “Hamburger” might confuse users.
1. {{ snippets.aria_expanded }}
1. Screen readers may announce: “button, Hamburger Menu”.
</div>

<div class="section">

## Pattern 16: The chatty burger button

```html
{{ badcode16 | pretty }}
```

### Issues and how to fix them

1. Not as bad as all the others, but the label is too long. Keep it short and simple.
1. Screen readers may announce: “button, All Company expand to see list of Company products and services, expanded”.
</div>


<div class="section">

## Alternatives

### Solution 1: A button with visible text and no icon.


```html
{{ goodcode | pretty }}
```

<button aria-expanded="false" type="button">Menu</button>

1. Text only: easy to implement and comprehensible.
1. Screen readers may announce: Menu, button”.

</div>
<div class="section">

### Solution 2: A button with visible text and only visually accessible icon.

```html
{{ goodcode2 | pretty }}
```

<button aria-expanded="false" type="button" style="align-items: center; gap: 10px; display: flex;"><svg aria-hidden="true" height="24" viewBox="0 0 16 16" version="1.1" width="24"><path fill-rule="evenodd" d="M1 2.75A.75.75 0 011.75 2h12.5a.75.75 0 110 1.5H1.75A.75.75 0 011 2.75zm0 5A.75.75 0 011.75 7h12.5a.75.75 0 110 1.5H1.75A.75.75 0 011 7.75zM1.75 12a.75.75 0 100 1.5h12.5a.75.75 0 100-1.5H1.75z" fill="currentColor"></path></svg>Menu</button>

1. If you want to use an icon, hide it from screen readers by wrapping it in a `span` with `aria-hidden="true"`.
1. Screen readers may announce: Menu, button”.

</div>
<div class="section">

### Solution 3: A button with hidden text and only visually accessible icon.

```html
{{ goodcode3 | pretty }}
```
```css
{{ goodcodeCSS3 | prettyCSS }}
```

<button aria-expanded="false" type="button"><span class="u-hidden">Menu</span><svg aria-hidden="true" height="24" viewBox="0 0 16 16" version="1.1" width="24"><path fill-rule="evenodd" d="M1 2.75A.75.75 0 011.75 2h12.5a.75.75 0 110 1.5H1.75A.75.75 0 011 2.75zm0 5A.75.75 0 011.75 7h12.5a.75.75 0 110 1.5H1.75A.75.75 0 011 7.75zM1.75 12a.75.75 0 100 1.5h12.5a.75.75 0 100-1.5H1.75z" fill="currentColor"></path></svg></button>

1. {{ snippets.sr_only }}
1. Screen readers may announce: Menu, button”.

</div>
<div class="section">

### Solution 4: A button with accessible text and only visually accessible icon.

```html
{{ goodcode4 | pretty }}
```

<button aria-expanded="false" type="button" aria-label="Menu"><svg aria-hidden="true" height="24" viewBox="0 0 16 16" version="1.1" width="24"><path fill-rule="evenodd" d="M1 2.75A.75.75 0 011.75 2h12.5a.75.75 0 110 1.5H1.75A.75.75 0 011 2.75zm0 5A.75.75 0 011.75 7h12.5a.75.75 0 110 1.5H1.75A.75.75 0 011 7.75zM1.75 12a.75.75 0 100 1.5h12.5a.75.75 0 100-1.5H1.75z" fill="currentColor"></path></svg></button>


1. If you don’t want to show text on screen, provide a text alternative for your icon or SVG by adding `aria-label` to the button.
1. Screen readers may announce: Menu, button”.

</div>


<div class="section">

<h2 id="resources">Resources</h2>

1. [Accessibility support for CSS generated content](https://tink.uk/accessibility-support-for-css-generated-content/)
1. [The a element](https://html.spec.whatwg.org/#the-a-element)
1. [The accessibility of placeholder links ](https://www.scottohara.me/note/2019/07/17/placeholder-link.html)

</div>

<div class="section">

## Wanna learn accessibility testing?

Are you interested in learning how to discover these accessibility issues and a lot more? Then join me for a [Smashing Magazine workshop](https://smashingconf.com/online-workshops/workshops/manuel-matuzovic/) starting on November 4th.

**Deep Dive On Accessibility Testing**  
Workshop, 5×2.5h + Q&A  
Thu & Fri, November 4–18 202109:00 – 11:30 AM PT (Pacific, US) • 18:00 – 20:30 CET (Europe)

Use this link for a [special -15% discount](https://ti.to/smashingmagazine/online-workshops/discount/welcometomyworkshop).


</div>
