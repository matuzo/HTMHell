---
title: "#33 make me one (input) with everything"
date: 2024-08-19
permalink: /{{ title | slug }}/index.html
layout: layouts/entry.njk
author: moritzgiessmann
badcode: '<label for="textinput">First name</label>
	<input type="text" id="textinput" aria-label="First name" placeholder="First name" title="First name">'
goodcode: '<label for="textinput">First name</label>
	<input type="text" id="textinput">'
---

You might have heard the joke about the Dalai Lama who walks into a pizza shop saying “Make me one with everything”. Though the good intentions were there, in the HTML and Accessibility world, less is sometimes more.

<div class="section bad">

## Bad code

```html
{{ badcode | pretty }}
```
</div>

<div class="section" id="issues">

## Issues and how to fix them


1. The `aria-label`, `placeholder`, and `title` attributes all provide similar or identical information ("First name"), leading to redundancy and potential confusion.
1. The `aria-label` is unnecessary in this context since the input is already correctly labeled by the `<label>` element. This can lead to conflicts or confusion for assistive technology users.
1. The `title` attribute is not needed here, as the label and placeholder already convey the necessary information. Using title in this context adds unnecessary complexity.
1. The `placeholder` text should provide a hint / example to the user what kind of input is expected, it should not act as a label or contain the same content.
1. The `placeholder` may not be accessible to all users, particularly those with visual impairments. It should not be relied upon as the primary means of conveying what the input field is for.

</div>

<div class="section">

## Good code

```html
{{ goodcode | pretty }}
```
</div>

<div class="section">

<h2 id="resources">Resources</h2>
- [`<label>` on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label)
- [`aria-label` on MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label)
- [`placeholder` on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/placeholder)
- [`title` on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/title)

</div>