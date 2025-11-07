---
title: "#35 a perfectly structured button"
date: 2025-09-11
permalink: /{{ title | slug }}/index.html
layout: layouts/entry.njk
author: annedrtlf
badcode: "<button type=\"button\"  onclick=\"window.open('https://example.com/other-page')\">
<table><tbody><tr><td><i class=\"fa fa-arrow-left\" aria-hidden=\"true\"></i></td><td align=\"left\">Back</td></tr></tbody></table>
</button>"
goodcode: "<button type=\"button\" onclick=\"alert('Hello World!')\">\nBack\n</button>"
---
<style>button table { margin: 0; } .fa-arrow-left::before {content:"←"}</style>
<div class="section bad">

## Bad code

```html
{{ badcode | pretty }}
```
</div>

{{ badcode | raw }}

<div class="section" id="issues">

## Issues and how to fix them

1. The HTML isn't valid because the table element isn't allowed as a child of the button element.
1. Based on the [content categories listed on MDN](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories), the table element qualifies as flow content and can only be placed inside an element that expects flow content. The button element, on the other hand, expects phrasing content, not flow content.
1. The semantic information of the table doesn't cause any issues because the button's content is presentational See [Buttons Role on W3C](https://w3c.github.io/aria/#button), [Presentational Children](https://www.w3.org/TR/wai-aria-1.2/#childrenArePresentational).

1. Keep it simple and structure the button element using CSS, such as Flexbox.
1. Instead of using tables to structure the button element, use phrasing content elements, such as span, img, or SVG.

</div>

<div class="section">

## Good code

```html
{{ goodcode | pretty }}
```
</div>

<div class="section">

<h2 id="resources">Resources</h2>

- [`<button>` on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button)
- [`<table>` on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table)
- [Content categories on MDN](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories)
- [Buttons Role on W3C](https://w3c.github.io/aria/#button)
- [`<button>` on W3Schools](https://www.w3schools.com/tags/tag_button.asp)
- [`<table>` on W3Schools](https://www.w3schools.com/tags/tag_table.asp)
- [Presentational Children](https://www.w3.org/TR/wai-aria-1.2/#childrenArePresentational)

</div>
