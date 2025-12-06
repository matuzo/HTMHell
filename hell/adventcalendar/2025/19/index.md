---
title: "Don't leave the screen reader hungry"
intro: "<p>Screen readers don’t always announce what’s visually on screen. This article explores that gap - through the medium of burritos.</p>"
author: "Geri Reid"
author_bio: "Your short bio"
date: 2025-12-19
author_links:
  - label: "Website"
    url: "https://gerireid.com/"
    link_label: "gerireid.com"
  - label: "Bluesky"
    url: "https://bsky.app/profile/gerireid.com"
    link_label: "@gerireid.com"
image: "advent25_19"
---

{{ intro }}

## The burrito you can't order

A customer complained they couldn't order a burrito. "The menu advertises burritos, but my screen reader won't let me order one!"

I was baffled. The menu was about as Mexican as a Yorkshire pudding. There was no mention of a burrito. 

After a lot of searching, I discovered someone had dropped an emoji into the heading:

```html
<h2>Sandwiches 🌯</h2>
```

Visually, it looked decorative and *kind of like a sandwich*. But screen readers don't read an emoji as decoration, they announce its <a href="https://unicode.org/emoji/charts/full-emoji-list.html">Unicode character name</a>. So screen reader users heard: "Sandwiches, Burrito."

That little emoji isn't just sitting in your markup looking pretty. It's making promises your website can't keep. One tiny flourish in your heading tag and suddenly your sandwich bar sounds like a taqueria.

## What's on the menu?

What I'm highlighting here is screen readers don't consistently announce what you see visually on the screen. This article explores the gap between what HTML gives you for free and what you need to supply yourself. 

I've made some quick reference tables to demonstrate how popular screen readers JAWS, NVDA, and VoiceOver handle elements, showing where HTML does the work and where you need to add stuff in addition.

Documenting and recording screen reader requirements is also problematic, so it sometimes falls through the gaps between design and code. I’ve got some ideas to help solve this.

### You hungry? 

Since you're probably craving Mexican food by now, we're going to frame this through the medium of burritos. Put your apron on, taquero - it's time to get cooking!

Let’s imagine the browser is your tortilla: it holds everything together. HTML adds some fillings by default. For a successful burrito, you need the right toppings. The trick is knowing which toppings to add and when to stop.

---

## What you get for free (the fillings)

Like a burrito that comes with rice, beans and your choice of protein, semantic HTML automatically packs the essentials into your tortilla. Correctly marked-up headings, links, buttons, lists, form controls, and tables are announced by default. And like a burrito starts with a good tortilla, screen readers work best when paired with their preferred browser: 

- JAWS with Chrome on Windows
- NVDA with Firefox or Chrome on Windows
- VoiceOver with Safari on Apple

Here's how JAWS, NVDA and VoiceOver screen readers announce for me using their default settings (I've included my testing specs in the footer). Use this as a guide. Your announcements might differ slightly based on verbosity and device settings, browser and software version. The way you navigate also changes what you hear. For example, using a heading shortcut key may produce a different announcement than letting the screen reader read through linearly.

The exact announcement doesn't really matter. 

What matters is knowing what you get for free and when you have to add something to get meaningful announcements. 

<div class="u-oa" tabindex="0" role="region" aria-label="Exemplary announcements">


| Element                                                                        | JAWS says                                                | NVDA says                                                     | Mac OS VoiceOver says                                                                  | Annotation                                                                     |
| ------------------------------------------------------------------------------ | -------------------------------------------------------- | ------------------------------------------------------------- | -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| `<h1>Burritos</h1>`                                                            | “Burritos, Heading level 1”                              | “Burritos, Heading level 1”                                   | “Heading level 1, Burritos”                                                            | No extras needed. Use correct heading levels for structure.                    |
| `<button>Checkout</button>`                                                    | “Checkout button”                                        | “Checkout, button”                                            | “Checkout, button”                                                                     | No extras needed.              |
| `<a href="burrito.html">Order burrito</a>`                                     | “Order burrito, link”                                    | “Order burrito, link”                                         | “link, Order burrito”                                                                  | No extras needed. Just make sure the link text makes sense out of context.     |
| `<ul> <li>Burrito</li> <li>Taco</li> </ul>`                                    | “List of 2 items. Bullet Burrito. Bullet Taco. List end” | “List with 2 items. Bullet Burrito. Bullet Taco. Out of list” | “List 2 items.&#xA;Bullet Burrito, 1 of 2. &#xA;Bullet Taco, 2 of 2.&#xA;End of list.” | No extra needed. |
| `<label for=name">Name</label> <input id="name" type="text">`                  | “Name, edit”                                             | “Name, edit”                                                  | “Name, edit text”                                                                      | No extra needed.                                                               |
| `<input id="cheese" type="checkbox"> <label for="cheese">Extra cheese</label>` | “Extra cheese, check box, not checked”                   | “Check box, not checked, Extra cheese”                        | “Extra cheese, unticked, tick box”                                                     | No extra needed.                                                               |
| `<button disabled>Not taking orders</button>`                                  | “Order, button, unavailable”                             | “Button unavailable, Order”                                   | “Order, dimmed, button”                                                                | No extra needed. Visually appears disabled, not focusable.                     |

---

</div>

## What you must supply (the toppings)

Here’s where you roll up your sleeves. These elements stay silent or may not announce as you’d expect until you add the right toppings.

<div class="u-oa" tabindex="0" role="region" aria-label="Exemplary announcements with missings attributes">

| Element                                                   | JAWS says                                | NVDA says                               | Mac OS VoiceOver says               | Annotation                                                                  |
| --------------------------------------------------------- | ---------------------------------------- | --------------------------------------- | ----------------------------------- | --------------------------------------------------------------------------- |
| `<img src="burrito.png">`                                 | "Unlabelled graphic"                     | "Unlabelled graphic"                    | “Unlabelled image” or "burrito.png" | Add alt text describing the image. Or use `alt=""` if decorative.           |
| `<button><svg>burrito svg icon</svg></button>`       | “unlabelled button”                      | “button”                                | “button”                            | Add accessible name via `aria-label` or `aria-labelledby`.                  |
| `<iframe src="#"></iframe>`                      | “frame”, or “frame 2 of 4” if multiple                                 | “frame”, or “frame 2 of 4” if multiple                                 | “frame”                             | Add a descriptive `title` for context.                                        |

</div>

The trick: add the toppings that matter, but don't overload the burrito. An overstuffed burrito can fall into your lap, potentially ruining a first date.

## Edge cases and oddities (HTMHell's Kitchen)

These ingredients look tasty but behave unpredictably under heat. Use with caution or your markup might fall apart.

<div class="u-oa" tabindex="0" role="region" aria-label="Exemplary oddities">

| Element                                                                | JAWS says                                          | NVDA says                                          | Mac OS VoiceOver says | Annotation                                                                                                                        |
| ---------------------------------------------------------------------- | -------------------------------------------------- | -------------------------------------------------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `<strong>Burrito!</strong>`                                            | "Burrito"                                          | "Burrito"                                          | "Burrito"             | Emphasis not reliably spoken on default verbosity settings. Don't rely on for meaning.                                            |
| `<em>Spicy</em>`                                                       | "Spicy"                                            | "Spicy"                                            | "Spicy"               | Emphasis not reliably spoken on default verbosity settings. Don't rely on for meaning.                                            |
| `£8 <s>£10</s>`                                                        | "£8 strikethough deletion £10"                     | "£8 deleted £10"                                   | "£8 £10" or "£8 deletion £10"             | Strikeout not reliably announced.                                                           |
| `<sup>2</sup> / <sub>2</sub>`                                          | "2, 2"                                             | "2, 2"                                             | "2, 2"                | Not read as superscript or subscript.                                                       |
| `<hr>`                                                                 | "separator"                                        | "separator"                                        | Silent                | Don't rely on for meaning. Add `aria-label` if the separation needs context.                                                      |
| `<abbr title="Street Provisions In Corn-based Envelopes">SPICE</abbr>` | "SPICE, Street Provisions In Corn-based Envelopes" | "Spice"                                            | "Spice"               | Full title not reliably announced. Spell out abbreviation in text.                                                                |
| 🌯                                                                     | "Burrito"                                          | "Burrito"                                          | "Burrito"             | Emojis announce their [Unicode name](https://unicode.org/emoji/charts/full-emoji-list.html). For decorative use, add `aria-hidden`. |

</div>

## Help! My burrito is busted!

- If you're second-guessing what should announce, TetraLogical recently released a [detailed guide to screen reader announcements](https://github.com/TetraLogical/screen-reader-HTML-support?tab=readme-ov-file) along with an [HTML Element test file](https://stevefaulkner.github.io/AT-browser-tests/)  you can run your screen reader over to test elements in isolation.

- If you’re looking for video examples of how elements and components announce, check out the [HTML section of atomica11y](https://www.atomica11y.com/accessible-web/). 

- If you work on a Mac and need to test on Windows screen readers, try [AssistivLabs](https://assistivlabs.com/) or set up an [emulator like UTM](https://getutm.app/). You can run NVDA for free and JAWS has a free 40 minute developer mode which is sufficient for testing. [40% of the screen reader market uses JAWS](https://webaim.org/projects/screenreadersurvey10/#primary) so if you only test on VoiceOver you might miss issues.

---

## Documenting screen reader requirements

If you're building a website, you need a consistent way to document screen reader announcements. Don't leave it up to chance. Current design tools don't have space for accessibility information and much of it is non-visual, so it easily gets overlooked during implementation.

### Documenting with design annotation kits

Visual annotation kits for Figma, Sketch or Penpot offer a solution. There are plenty of excellent open-source examples shared in community files that you can tailor to your organisation's needs. If you're looking for inspiration, Jan Maarten and Daniel Henderson-Ede did a talk showcasing how [different design teams annotate for accessibility](https://www.youtube.com/live/O1GmngpGokU?si=Y6uxWmX1Z6pxfRDD) at this year's Inclusive Design 24.

As a designer, I find it helpful to pair with an engineer and mark up design files together to capture all the accessibility requirements. 

A problem with sticky note annotations is that they often die in design files once development begins. Developers don't revisit design files, designers move on and the accessibility details you've spent time documenting get lost. Even if they are used effectively in implementation, you end up rewriting a similar set of notes for subsequent projects.

### Documenting with text

Text-based documentation in machine-readable formats (YAML, JSON, markdown tables, or structured specifications) solves this. Instead of static notes trapped in design files, if you record your annotations as text you can create queryable records that travel. Think of it like your restaurant having a digital ordering system instead of handwritten tickets. The kitchen gets the exact burrito order every time, with all the special instructions intact. 

These formats also unlock AI integration through tools like RAG or MCP servers. When a developer asks an AI assistant about a component, it can surface the exact accessibility requirements. You could even structure these specs to generate automated test criteria.

The long game: shift to living documentation that can be queried on demand. Some clever folks like Nathan Curtis have already started ​to explore ways to [record specs with data](https://medium.com/@nathanacurtis/components-as-data-2be178777f21).

---

## Let's wrap up! 🌯

- HTML gives you a tortilla full of free fillings: headings, lists, buttons, form controls, tables. However, some elements require you to add a topping to make them meaningful. 

- Document which toppings are needed so they don't get lost between design and development. Without clear documentation, developers have to guess at the requirements or skip them entirely, leaving accessibility as an afterthought rather than an integral part of the build.

Remember that a good burrito, like good markup, is about knowing which toppings to add and when to stop. Get it right and your screen reader users get a memorable burrito. Get it wrong and they're left with a stain on their shirt. 

---

### About Geri Reid

Geri is an accessibility and design systems nerd from London. As design and accessibility lead on design systems at News UK and Lloyds Banking Group, she helped some of the UK’s largest media and banking brands to design at scale. She is currently Lead Accessibility Specialist at Just Eat Takeaway. 

- Blog: [gerireid.com](https://gerireid.com)
- Bluesky: [@gerireid.com](https://bsky.app/profile/gerireid.com)
- LinkedIn: [@gerireid](https://www.linkedin.com/in/gerireid/)


---



#### Screen reader testing on:

- JAWS (2025) with Chrome Version 140.0.7339.128 (Official Build) (64-bit) on Windows 11
- NVDA (2025) with Chrome Version 140.0.7339.128 (Official Build) (64-bit) on Windows 11
- VoiceOver (2025) with Safari Version 26.0.1 on Mac, Sequoia 15.7.1
