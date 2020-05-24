---
title: "#6 link with void operator as href value"
date: 2019-10-25
author: smaerdian
permalink: /{{ title | slug }}/index.html
badcode: "<a href=\"javascript:void(1)\" onClick='window.location=\"index.html\"'>Link</a>"
goodcode: '<a href="index.html">Link</a>'
---

<div class="section bad">

## Bad code

```html
{{ badcode | pretty }}
```

</div>

<div class="section" id="issues">

## Issues and how to fix them

1. Links won't work, if JavaScript fails to load or execute.
1. You don’t need JavaScript to link to other pages, you can use the `href` attribute for that. Browser support is pretty good (100% of all browsers).
1. The context menu on right click is different, "Open in new tab/window" is not available.
1. <kbd>CMD</kbd> + Click to open a link in the background won't work.

</div>

<div class="section">

## Good code

```html
{{ goodcode | pretty }}
```

</div>
