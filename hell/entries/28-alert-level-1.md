---
title: "#28 alert level 1"
teaser: ""
date: 2021-11-28T21:00:00
permalink: /{{ title | slug }}/index.html
layout: layouts/entry.njk
author: mmatuzo
badcode: '<h1 aria-busy="true" aria-live="polite" role="alert" class="sr-only">

  Done

</h1>'
goodcode: '
<div role="status">

  Changes saved.

</div>
'
---

<div class="section bad">

## Bad code

```html
{{ badcode | pretty }}
```

</div>

<div class="section" id="issues">

## Issues and how to fix them

* The element is used for communicating status updates, not to structure the page. A `div` with a `role` of `status` or `alert` is more suitable than a `h1`.
* The heading is semantically not a `heading` anymore, but an `alert` container. This can be confusing, NVDA, for example, announces “alert busy Done level 1”. {{ snippets.native_semantics }}
* `aria-live="polite"` turns the element explicitly into a <em>polite</em> live region. This behavior is overwritten by `role="alert"` which turns it implicitly into an <em>assertive</em> live region.
* For frequent updates it might be better to use a polite (`role="status"`) and a not an assertive (`role="alert"`) live region.
* `aria-busy` indicates whether an element, and its subtree, are currently being updated. The text of the live region “Done” indicates that all the necessary updates have finished. If that's the case, `aria-busy` should be removed or set to `false`.
* “Done” might not be descriptive enough, consider a brief but more informative status message, something like “Changes saved” or “Product added to cart”.
* The heading/live region is visually hidden. Consider showing it because everyone might benefit from the information.

Check out the [resources section](#resources) at the bottom of this page for more.

</div>

<div class="section">

## Good code

```html
{{ goodcode | pretty }}
```
</div>

<div class="section">

<h2 id="resources">Resources</h2>

- [ARIA live regions (MDN)](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions)
- [aria-busy (MDN)](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-busy)
- [aria-busy (WAI-ARIA 1.1 spec)](https://www.w3.org/TR/wai-aria/#aria-busy)
- [aria-live (WAI-ARIA 1.1 spec)](https://www.w3.org/TR/wai-aria/#aria-live)
- [Live Region Playground](https://dequeuniversity.com/library/aria/liveregion-playground)

</div>
