---
title: "Past HTML, Future HTML?"
layout: layouts/advent.md
author: "Jens Oliver Meiert"
author_bio: "Jens Oliver Meiert is a frontend engineering leader and tech author/publisher. He specializes in HTML and CSS optimization and maintainability."
date: 2024-12-08
author_links:
  - label: "Jens’s Blog"
    url: "https://meiert.com/en/"
    link_label: "meiert.com"
  - label: "Jens on Mastodon"
    url: "https://mas.to/@j9t"
    link_label: "@j9t@mas.to"
  - label: "Jens on Twitter/X"
    url: "https://x.com/j9t"
    link_label: "@j9t"
active: true
intro: "<p>Appreciating HTML code from the past, to challenge HTML from the present.</p>"
image: "advent_8"
---

<!--
MM: This piece is definitely different than the others but I like it. It's original and it's totally you.
The only thing missing for me is the message. You explain why you like it but the post kind of lacks a pargraph that rounds it up. The title it "Past HTML, Future HTML?" _Past_ yeah, but the _future_ part is not coming completely through.
-->

Consider the following HTML document:

```html
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 1996-01//EN">
<html>
  <head>
    <title></title>
  </head>
  <body>
    <p class="Author">
    <h1></h1>
    <P>
    <P>
    <H2></H2>
    <P>
    <UL>
      <LI>
      <LI>
      <LI>
    </UL>
    <P>
    <!-- … -->
  </body>
</html>
```

You will notice a few things:

* The unusual doctype
* The inconsistencies in element case (most notably, `<p>` vs. `<P>`)
* The inconsistencies in omitting optional tags (like dropping `</p>` and `</li>` end tags, but keeping `</body>` and `</html>`)

Yet in some respects, this document structure is better than the code we find on many modern websites (and that is sites, not even apps).

Why? What’s to like about this kind of code?

1. _It’s valid._ If you run this and the respective original page’s code through an HTML conformance checker like [the W3C markup validator](https://validator.w3.org/), the code will validate. This is basic _professional_ work [that we don’t see often anymore](https://meiert.com/en/blog/html-conformance-2024/).

2. _It’s focused._ There’s close to no superfluous code. While there’s a little bit more [optional markup](https://meiert.com/en/blog/optional-html/) to be removed, as well as perhaps the `Author` class, one might rather _add_ code, like the style sheet reference that’s conspicuously missing.

3. _It’s… open-minded._ These inconsistencies, they may rub us, and we likely prefer a consistent formatting. But that shouldn’t distract from the fact that the code is valid (which includes uppercase tag names), and that it represents legitimate ways of writing HTML (which in this case means [HTML–HTML, and not XHTML–HTML](https://css-tricks.com/write-html-the-html-way-not-the-xhtml-way/)).

So where is this code from? It’s from [T.V. Raman’s](https://en.wikipedia.org/wiki/T._V._Raman) documentation on [style sheets for spoken renderings](https://www.w3.org/Style/CSS/Speech/speech.html), published on February 12, _1996_. The [1990s](https://frontenddogma.com/topics/1990s/) and [2000s](https://frontenddogma.com/topics/2000s/) are behind us in many areas—and yet in some, they may still be ahead.
