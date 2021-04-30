---
title: "#25 A link is a button is a link"
teaser: ""
date: 2021-04-23T21:00:00
permalink: /{{ title | slug }}/index.html
layout: layouts/entry.njk
author: andreavaghi
badcode: '<a tabindex="0" type="button" href="https://" role="link">
  <span class="focus" tabindex="-1"></span>
  <span>
    <span>
      <span>Click</span>
      <i class="icon icon-external-link" aria-hidden="true" role="img"></i>
    </span>
  </span>
</a>'
goodcode: '
<a href="https://">
  Click
  <span class="fa fa-external-link" role="img" aria-label="External link" target="_blank"></span>
</a>
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

1. You don’t need the `tabindex` attribute if you use an `a` tag. HTML hyperlinks are focusable by default.
2. The `type` attribute on `a` tag is used to hint at the linked URL’s format with a MIME type, eg: `type="image/svg+xml"`
3. Using `role=link` on an `a` tag is not needed since the you can get that behaviour for free using a standard hyperlink.
4. {{ snippets.negative_tabindex }}
5. {{ snippets.i_elem }}
6. While `aria-hidden` can be useful to hide content that is not needed for screen readers (in this case an icon image), it's useful to add an `aria-label` when that content is meaningul for everyone, like declaring that an hyperlink will open in an external tab.

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

- [Using the link role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_link_role)
- [Semantically identifying a font icon with role="img"](https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA24.html)

</div>
