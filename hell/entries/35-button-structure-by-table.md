---
title: "#35 a perfectly structured button"
date: 2025-09-11
permalink: /{{ title | slug }}/index.html
layout: layouts/entry.njk
author: annedrtlf
badcode: "<button type=\"button\"  onclick=\"window.open('https://example.com/other-page')\">
<table><tbody><tr><td><i class=\"fa fa-arrow-left\" aria-hidden=\"true\"></i></td><td align=\"left\">Back</td></tr></tbody></table>
</button>"
goodcode: "<button type=\"button\" style=\"padding: 12px 16px;\" onclick=\"alert('Hello World!')\">Back</button>"
---

<div class="section bad">

## Bad code

```html
{{ badcode | pretty }}
```
</div>
<button type="button" onclick="alert('Hello World!')">
<table>
<tbody>
<tr>
<td><i class="fa fa-arrow-left" aria-hidden="true"></i></td>
<td align="left">Back</td>
</tr>
</tbody>
</table>
</button>
<div class="section" id="issues">

## Issues and how to fix them

1. It's not valid, as the table element is not allowed as child of button element.
1. Based on the [MDN content categories](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories) the table element qualifies as flow content and is only allowed to be put inside an element which expects flow content. The button element on the other hand expects phrasing content, not flow content.
1. It is working as the semantics of the table is not exposed because the button's content is presentational. See [Buttons Role on W3C](https://w3c.github.io/aria/#button), [Presentational Children](https://www.w3.org/TR/wai-aria-1.2/#childrenArePresentational).

1. Keep it simple and structure the button element using CSS, such as Flexbox.
1. Instead of using tables to structure the button element, use phrasing content, such as span, img, svg, etc. elements.

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
