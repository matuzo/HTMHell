---
title: "A link on a logo in the header, what should the alt-text be?"
layout: layouts/advent.md
author: "Rian Rietveld"
author_bio: "Web accessibility specialist and developer from the Netherlands."
date: 2024-12-01
author_links:
  - label: "Site"
    url: "https://rianrietveld.com"
    link_label: "rianrietveld.com"
  - label: "Social"
    url: "https://mstdn.io/@rianrietveld"
    link_label: "@rianrietveld@mstdn.io"
active: true
intro: "<p>An alt text doesn't always only describe what's on the image. How not to confuse screenreader users about where a link lead to. </p>"
image: "advent_1"
---

It's a common pattern to use a logo in the header as a link to the homepage.
But what should be the alt-text of that image? 
"the site name" or "homepage" or "logo" or "IMG_123"? Does it even matter?

Fun fact: the alt text of the image inside a link, will be added to the link text.

The problem with linking a logo is that it serves 2 purposes:

- a logo, that tells you which site you are visiting;
- a link, that leads to the homepage.

So add both that info in the alt text. Explain what's on the image and where the link leads to: "Site name logo, to the homepage".
<!-- MM: It's a functional image, so do you really need the info "logo"? Are there any benefits of including it? -->
<!-- SS: Agree with MM on this. I am little wary of adding words like "logo", "image of", etc. in a functional image -->

**Note**: Start the alt text with the visible text, then the link will be easier to target for people using voice recognition software.

Let's take as example the logo of my home town Leidschendam-Voorburg.

In code (simplified):

```html
<a href="/">
  <img 
    alt="Leidschendam-Voorburg logo, to the homepage" 
    src="logo-lv.svg" 
  />
</a>
```

<!-- MM: Is this a violation of 2.5.3? https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1&showtechniques=253#label-in-name If not, can you address why?-->

Generated HTML: 

<a href="https://www.lv.nl/en">
  <img alt="Leidschendam-Voorburg logo, to the homepage" src="logo-lv.svg" width="300" height="76" loading="lazy" style="background-color: #1a194e; padding: 1em;"/>
</a>

VoiceOver in Safari will announce this as:
"Link, image, Leidschendam-Voorburg logo, to the homepage".
<img alt="Screenshot of this VoiceOver output." src="voice-over.png" width="432" height="133" loading="lazy" />

All info is there.

There is an advantage of using the alt text instead of an `aria-label` solution. When the connection is slow, the alt text will show up before the image does and already informs all users of the site name and link destination. It's quite robust.

<!--
  KS: Possibly, but following up on Manuel's question about WCAG above,
  would it not be even more robust to include, say, a heading element
  that is accessibly hidden from view for sighted users?

  See https://www.w3.org/WAI/WCAG22/Techniques/general/G208.html

  One of the disadvantages of both `alt` and `aria-label` is that they
  have only the semantics of a plain-text string, whereas other HTML
  elements (including those pointed at by `aria-labelledby`) can be
  much more expressive for all users.
-->

Happy Holidays!
