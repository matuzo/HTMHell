---
title: "#8 anchor tag used as button"
date: 2019-10-30
author: svsven
permalink: /{{ title | slug }}/index.html
badcode: '<a href="#" onclick="modal.open()">Login</a>'
goodcode_one: '<button type="button" onclick="modal.open()">Login</button>'
goodcode_two: '<a href="/login" onclick="modal.open()">Login</a>'
---

<div class="section bad">

## Bad code

```html
{{ badcode | pretty }}
```

</div>

<div class="section" id="issues">

## Issues and how to fix them

1. The anchor tag is being used as a button instead of a navigational link. Its only purpose is to trigger an action on the same page. An anchor tag should be used for navigation; to create links to other pages, anchor points on the same page or to resources such as PDF files.
1. In this case, the `href` attribute contains a placeholder value that links to the same page but does not navigate to an anchor point.
1. Due to the above points, this element has accessibility issues. Browsers and devices that do not support JavaScript will not be able to access the content and functionality on the modal, and screen readers may parse the element incorrectly.


</div>

<div class="section">

## Good code

### Solution #1: Use a button element
```html
{{ goodcode_one | pretty }}
```

Since the only purpose of this element is to trigger an action on the same page instead of navigation; the `<button></button>` element is the semantically correct element to use.


### Solution #2: Add a valid href value to the login form
```html
{{ goodcode_two | pretty }}
```

Another solution is to add a `href` value to a location where the same actions as the modal can be performed.
This provides a fallback for browsers and devices that do not support JavaScript. This is an example of progressive enhancement.


</div>
