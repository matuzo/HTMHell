---
title: "#7 anchor tag used as button"
date: 2019-10-30
author: svsven
permalink: /{{ title | slug }}/index.html
badcode: '<a href="#" onclick="modal.open()">Login</a>'
goodcode: '<button onclick="modal.open()" aria-label="login">Login</button>'
---

<div class="section bad">

## Bad code

```html
{{ badcode | pretty }}
```

</div>

<div class="section">

## Issues and how to fix them

1. The anchor tag is being used as a button instead of a link, without having the `role="button"` attribute.
1. The `href` attribute returns a placeholder value that does not link anywhere.
1. Due to the above points, this element has accessibility issues. Use the semantically correct `<button></button>` element instead.


</div>

<div class="section">

## Good code

```html
{{ goodcode | pretty }}
```

</div>
