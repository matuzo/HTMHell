---
title: "#25 A link is a button is a link"
teaser: ""
date: 2021-04-30T21:00:00
permalink: /{{ title | slug }}/index.html
layout: layouts/entry.njk
author: andreavaghi
badcode: '<a tabindex="0" type="button" href="/signup" role="link">
  <span class="focus" tabindex="-1"></span>
  <span>
    <span>
      <span>Sign up</span>
      <i class="icon icon-external-link" aria-hidden="true" role="img"></i>
    </span>
  </span>
</a>'
goodcode: '
<a href="/signup">

  Sign up  
  
  <span class="fa fa-external-link" role="img" aria-label="External link">
  
  </span>
</a>
'
goodcode2: '
<a href="/signup">
  Sign up  
</a>
'
---

Note: We've removed most classes to improve readability.

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
3. Using `role=link` on an `a` tag is not needed since you already get that behaviour for free by using a standard hyperlink (`<a href="">`).
4. {{ snippets.negative_tabindex }}
1. An additional `span` to handle focus isn’t necessary, `a` can do that by itself. 💪🏻
5. {{ snippets.i_elem }}
1. If you’re using `aria-hidden` on an element, you don’t need to declare a `role`, because the element is inaccessible to screen reader users, anyway.
1. {{ snippets.dom_size}} {{ snippets.dom_tree }} {{ snippets.divspanusage }}
6. Icon option 1: While `aria-hidden` can be useful to hide content that is not needed for screen readers (in this case an icon image), it's useful to add an `aria-label` when that content is meaningul for everyone, like declaring that an hyperlink will open in an external tab.
1. Icon option 2: The icon can be removed, because in the original snippet the link points to a page on the same site that opens in the same tab. The external link icon is intended to inform users that by clicking the link they’re leaving the site.

Check out the [resources section](#resources) at the bottom of this page for more.

</div>

<div class="section">

## Good code

```html
{{ goodcode | pretty }}
```

or

```html
{{ goodcode2 | pretty }}
```

</div>

<div class="section">

<h2 id="resources">Resources</h2>

- [Using the link role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_link_role)
- [Semantically identifying a font icon with role="img"](https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA24.html)

</div>
