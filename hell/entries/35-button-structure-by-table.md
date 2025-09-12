---
title: "#35 a perfectly structured button"
date: 2025-09-11
permalink: /{{ title | slug }}/index.html
layout: layouts/entry.njk
author: annedrtlf
badcode: "<button type=\"button\"  onclick=\"window.open('https://example.com/other-page')\">
<table><tbody><tr><td><i class=\"fa fa-arrow-left\" aria-hidden=\"true\"></i></td><td align=\"left\">Back</td></tr></tbody></table>
</button>"
goodcode: "<button type=\"button\" style=\"padding: 12px 16px;\" onclick=\"window.open('https://example.com/other-page')\"><i class=\"fa fa-arrow-left\" aria-hidden=\"true\"></i>Back</button>"
---

<div class="section bad">

## Bad code

```html
{{ badcode | pretty }}
```
</div>
<button type="button" onclick="window.open('example.com/other-page')">
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

1. Technically it works to put a table inside a button. As the buttons content is representational the syntax is valid. Nevertheless it adds complexity to the code and is not needed.
1. Based on the [MDN content categories](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories) a table is not allowed inside a button. As the table qualifies as flow content and the button accepts phrasing content only.

1. Keep it simple and structure the button using CSS.
1. If necessary structure buttons using phrasing content such as `<i>` and `<span>`

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

</div>
