---
title: "#14 not my type"
date: 2020-01-17T07:00:00
permalink: /{{ title | slug }}/index.html
layout: layouts/entry.njk
author: mmatuzo
badcode: '<a type="button" class="button" href="/signup" tabindex="-1">Sign up</a>'
goodcode: '<a href="/signup" class="button">Sign up</a>'
---
<div class="section bad">

## Bad code

```html
{{ badcode | pretty }}
```
</div>

<div class="section" id="issues">

## Issues and how to fix them

1. The `type` attribute has no effect on the semantics of an `<a>` element.
1. An anchor may have the `type` attribute, but the value should be a valid [MIME type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Complete_list_of_MIME_types). Browsers may consider it, but it’s purely advisory.
1. If the presence of the `href` attribute makes sense, you most definitely want to use a proper link (`<a>`) and not a button, no matter how the element looks like in your design.
1. {{ snippets.negative_tabindex }}.
1. {{ snippets.native_semantics }}
1. {{ snippets.use_button }}
</div>

<div class="section">

## Good code

```html
{{ goodcode | pretty }}
```
</div>

<div class="section">

## Resources

* [4.8.2. Links created by a and area elements](https://www.w3.org/TR/html52/links.html#links)
* [4.5.1. The a element](https://www.w3.org/TR/html52/textlevel-semantics.html#the-a-element)

</div>
