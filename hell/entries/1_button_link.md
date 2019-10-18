---
title: "button disguised as a link"
date: 2019-10-17
layout: layouts/entry.njk
author: mmatuzo
sample: '<button role="link" title="Name of website" tabindex="0"><img alt="Image description" src="logo.jpg" title="Name of website"></button>'
---

```html
  {{ sample | nl2br }}
```
