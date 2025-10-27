---
title: "a11y freedom beaver"
author: "Steve Faulkner"
author_bio: "Accessibility is Political
I have done stuff on the web for a period of time, some of which I am pleased with
I also sell Web Standards leisurewear"
date: 2025-12-10
author_links:
  - label: "HTML Accessibility"
    url: "https://html5accessibility.com/stuff/"
    link_label: "HTML Accessibility"
intro: "<p>The ghost of ARIA past. Don't add ARIA for ChatGPT Atlas, you don't need to. 
</p>"
image: "advent25_10"
---

<p><span role="img" aria-label="Accessibility Freedom Beaver">♿☮️🦫</span> sez: [Know your Standards](https://html5accessibility.com/stuff/2020/11/24/know-your-standards/)</p>

## 1st Rule of ARIA
The **first rule** originally appeared in 2012 [Notes on using ARIA](https://www.tpgi.com/html5-accessibility-chops-using-aria-notes/), it was then moved to a new home [Using ARIA](https://w3c.github.io/using-aria/#rule1).

It's not really a **rule** in any formal sense; I just made it up. It has remained unchanged for 14 years but remains relevant today.

<blockquote>
**First Rule of ARIA Use**

If you can use a native HTML element [HTML](https://html.spec.whatwg.org/multipage/) or attribute with the semantics and behavior you require already built in, instead of re-purposing an element and adding an ARIA role, state or property to make it accessible, then do so.

**Under what circumstances may this not be possible?**

* If the feature is available in [HTML](https://html.spec.whatwg.org/multipage/) but it is not implemented or it is implemented, but accessibility support is not
* If the visual design constraints rule out the use of a particular native element, because the element cannot be styled as required
* If the feature is not currently available in [HTML](https://html.spec.whatwg.org/multipage/)
</blockquote>
source: [Using ARIA](https://w3c.github.io/using-aria/#rule1)

### Reasons to be cheerful (about not having to use ARIA so much)

> the feature is available in [HTML](https://html.spec.whatwg.org/multipage/) but it is not implemented or it is implemented, but accessibility support is not
When I first wrote the first rule there were many new features in HTML, many of which had not had their accessibility support (or support in general) wired up. Which is why I started documenting support for new features back in 2010 ([HTML5Accessibility.com WayBack Machine snapshot October 2010](https://web.archive.org/web/20101011095344/http://www.html5accessibility.com/)) Last time I checked back in [August 2020](https://html5accessibility.com/), things were looking much better. So these days there is little to no need to use ARIA to supplement native HTML semantics, the browsers do it for you _mostly_. In fact the **unecessary use of ARIA** is a HTML conformance error as defined in the [ARIA in HTML](https://w3c.github.io/html-aria/#docconformance) specification.

> visual design constraints rule out the use of a particular native element, because the element cannot be styled as required
In 2025 the opportunity for a front end developer to craft visual UI that meets the needs of their bosses is much improved. CSS and browser implementations continue to be enhanced to make it possible.

<blockquote>the feature is not currently available in [HTML](https://html.spec.whatwg.org/multipage/)
</blockquote>
This is still a valid reason for building stuff from HTML elements that carry little or no semantics, then adding ARIA to convey meaning robustly and interoperably to people that make use of assistive technology to render web content understandable. But valid _less so_ as many of the features that are routinely foisted upon users are now available as native HTML, for example, [dialogs](https://html.spec.whatwg.org/multipage/interactive-elements.html#the-dialog-element) and [disclosures](https://html.spec.whatwg.org/multipage/interactive-elements.html#the-details-element)

## What ARIA does not do

The good thing about using HTML elements is they have operability built in: **ARIA does not**.
For example, a `<button>`-element is automatically included in the taborder and will have eventlisteners attached, an element with `role="button"` will _not_ have those charactaristics by default.
Please read [What ARIA still does not do](https://html5accessibility.com/stuff/2024/07/15/what-aria-still-does-not-do/) for details.
A popular use case for ARIA is custom elements, to appreciate what you need to do to make them accessible, the [Web Components punch list](https://www.tpgi.com/web-components-punch-list/) may be helpful.

## Last words
We [already know](https://webaim.org/projects/million/#aria):
<blockquote>Increased ARIA usage on pages was associated with higher detected errors. The more ARIA attributes that were present, the more detected accessibility errors could be expected.</blockquote>
Do not introduce more ARIA into your code in an effort to please the knowledge ghouls of OpenAI and their [new browser](https://html5accessibility.com/stuff/2025/10/23/atlas-ableism/) Although you wouldn't know it from the [_bumpf_ OpenAI published](https://adrianroselli.com/2025/10/openai-aria-and-seo-making-the-web-worse.html) - **It is not needed**.

and a merry fucking xmas to all!
