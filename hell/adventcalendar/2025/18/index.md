---
title: "Giving pages a clear shape by using headings"
author: "Steve Barnett"
author_bio: "Steve Barnett is a human-centred front-end developer and user experience designer living in Aotearoa New Zealand. He helps software teams have happier customers by making more user-friendly software. That means making sites that everyone can use, regardless of their device, the network they’re on, or any disabilities they might have."
date: 2025-12-18
author_links:
  - label: "Personal website"
    url: "https://human-centred.nz/"
    link_label: "human-centred.nz"
  - label: "Where I work"
    url: "https://intopia.digital/"
    link_label: "Intopia"
intro: "<p>The three most common ways that headings go wonky, and how to fix them!</p>"
image: "advent25_18"
---


We can make our pages easier to understand by using headings to give our pages a clear shape. Our users might visually scan the page, use an extension or bookmarklet to list the headings, navigate using assistive technology like a screen reader, or ask AI for a summary of the page. High quality headings can make things better for everyone.

In my day job as a Digital Accessibility Consultant, there are a couple of ways that I've seen things go a bit... wonky. Let's go through the three most common issues, and how to fix them.

## Text *should not* be a heading

Ah, this one's a real classic! When we have some big and bold text, for Design Reasons, we sometimes take a bit of a shortcut and mark it up as a heading. Let's say an `<h2>`, because it seems about the right size, or that’s what it says in the design file. But here's the thing: this text doesn't introduce or describe the content that follows. It just "needs" to be big for the look of it. 

This is an issue because when things are marked up as headings that are not headings, it makes the page harder to understand. Users of assistive technology like screen readers hear things read as headings of section that are not headings.

### An example

Let's say we have a page explaining colours, RGB-style. We might have headings marked up as follows.

- `<h1>`Colours
  - `<h2>`Red
  - `<h2>`Green
    - `<h3>`Make it pop!
  - `<h2>`Blue

In this case "Make it pop!" is just some big text, designed to be eye-catching. It's not the start of a section of content.

### How to fix it

Stop using HTML and start using CSS. Instead of using a heading element, using a `<p>` or `<span>` or  `<div>` element and use CSS to make it big and bold.

## Text *should* be a heading

Now let's come from the other side. We look at a design and see some bold text. Some big, some bigger, some biggest. Sweet! We fling down a bunch of `<div>` elements, add some styles and we're done. It looks just like the design, chef's kiss, and so on. But here's the thing: this text looks like a heading, but doesn't have any semantics.

This is an issue because when text is marked up as a heading even though it isn’t one, it makes the page harder to understand. Screen readers won't announce it as a heading with its level, making it hard to understand the content and structure when listening to all the headings.

### An example

Let's say we have a page explaining what the web is made of. We might have some big bold text marked up as follows.

- `<h1>`The world wide web
  - `<h2>`HTML
  - `<p>`CSS
  - `<h2>`JavaScript

In this case "CSS" isn't just a paragraph. It's the start of a section of content.

### How to fix it

Stop using CSS and start using HTML. Instead of using a `<p>` or `<span>` or `<div>` element, use a heading element at the right level to give it semantic structure: from `<h1>` to `<h6>`. If we have some big and bold text that introduces or describes the content that follows, it should probably be a heading.

## Headings do not reflect the content structure

Okay, we've sorted out text that should and shouldn't be a heading: only things that are structural headings are marked as headings. Hooray! There's one more snag that we might hit: when the headings are in a weird order. For example: let's say we have a page listing edible things. We mark up `<h3>`Fruit`</h3>` as a section, and then `<h2>`Apples`</h2>` as a sub-section of Fruit. Maybe we've done this because that's what the styles in the design file suggest. But here's the thing: it's wonky because the headings don't represent the hierarchical relationships. 

This is an issue because users of assistive technology like screen readers use headings to understand how each section of the page relates to each other and the page as a whole. When the headings are wonky, the shape of the page is harder to understand.

### How to fix it

Use HTML to give the headings the correct nesting and ordering. Use CSS to make them look appropriately sized and shiny.

I like to start from the page as a whole and work my way down.

1. What’s the topic or purpose of this page? That text should be in an `<h1>` element near the top of the page.
2. What are the sections of the page? The name of each section should be in an `<h2>` element, at the start of the section.
3. What (if any) are the subsections of each section? The name of each subsection should be in an `<h3>` element, at the start of the subsection.
4. What (if any) are the sub-subsections of each subsection? The name of each sub-subsection should be in an `<h4>` element, at the start of the sub-subsection.
5. And so on, down to an `<h6>` element. Although if you've reached an `<h6>` element, it might be worth reviewing the content and seeing if there's Too Much Stuff there!

The list of headings should read a bit like a table of contents for the page.

## Other weird heading things

There are other aspects of wonkiness that may occur. Keep a watch for these too!

- **Heading text that doesn't make sense.** The heading text should describe and introduce the content that follows it.
- **No headings at all on the page.** There's probably some text that should be a heading.
- **`<h1>` shenanigans: no `<h1>` element, or multiple `<h1>` elements.** Just one `<h1>` element, please! It should describe the topic or purpose of page.
- **Skipped heading levels**, for example: jumping from an `<h2>` element to an `<h4>` element. Keep the nesting and order correct: `<h3>` elements for subsections of a section with an `<h2>` heading.

## Accessibility nerd corner

The big three issues we started with all fall under [Web Content Accessibility Guidelines Success Criteria 1.3.1 Info and Relationships (A)](https://www.w3.org/TR/WCAG22/#info-and-relationships): "Information, structure, and relationships conveyed through presentation can be programmatically determined or are available in text."

- "Text should not be a heading" and "Text should be a heading" are "If it looks like a thing, it must be the thing in code too"
- "Headings do not reflect the content structure" are "If it looks nested and order, it must be nested and ordered in code too"

When we spot these issue in the course of an [Accessibility Assessment](https://intopia.digital/services/accessibility-usability-testing/), we usually log them as Medium Severity: it causes problems or frustrations for users.

Headings that aren't descriptive fall under [WCAG Success Criteria 2.4.6 Headings and Labels (AA)](https://www.w3.org/TR/WCAG22/#headings-and-labels). These are usually Medium Severity too.

## Use your head(ings)

Using headings to give our pages a clear shape makes them easier to understand.

Make sure that:

- text that functions as a heading is marked up as a heading
- text that does not function as a heading is not marked up as a heading
- headings reflect the content structure

### Useful tools

Two of my favourite ways to visualise headings are:

- the Headings bookmarklet at [Accessibility Bookmarklets](https://accessibility-bookmarklets.org/install.html)
- the Headings toggle (in Ad hoc tools) of the [Accessibility Insights for Web](https://accessibilityinsights.io/docs/web/overview/) extension.

Both of them add annotation-like boxes and text, making it easier scroll through and visually spot weird heading things.
