---
title: "How HTML changes in ePub"
author: "Robin Whittleton"
author_bio: "Still calling myself a front-end developer, though these days more focused on spreading the good word of accessibility."
date: 2025-12-11
author_links:
  - label: "Site"
    url: "https://www.robinwhittleton.com/"
    link_label: "robinwhittleton.com"
  - label: "Mastodon"
    url: "https://front-end.social/@robinwhittleton"
    link_label: "front-end.social/@robinwhittleton"
intro: "<p>Robin explains why building an ePub might be both easier and harder than you’d think.</p>"
image: "advent25_11"
---

[ePub](https://www.w3.org/TR/epub-33/) is the W3C standard for ebooks. It lets you take your knowledge of the web, and use it to produce little self-contained sets of documents that can be freely distributed as a single file ready for reading on extremely low-power devices, and they even reflow to fit any screen.

Yet while I said that you can use your knowledge of the web to build ePubs, the technology in use is twisted in unforeseen ways, and you might have to unlearn the things you think you knew. Prepare yourself…

## HTML, sort of

ePubs, at their core, use HTML, just like the websites we build every day. Except, well, there’s a big asterisk after that. Let’s dive into the differences.

A few decades ago [XML](https://www.w3.org/TR/xml/) emerged from the pit. XML – an extensible standard for expressing marked up data – could be used for documents, data transfer, and a bunch of other things, and people genuinely liked it (or, much like AI today, pretended to for job security). They liked it so much that a concerted effort was started to take HTML and rebuild it on top of XML. This project had a name you might have heard of: [XHTML](https://www.w3.org/TR/xhtml11/).

XHTML didn’t work out, for a number of reasons. The extensibility of XML turned out to not be useful when browsers didn’t support even common extensions. Then there was the problem of fragility: any syntax problems with your XHTML and your users would get a blank screen. If those two problems weren’t enough, XHTML was slower in practice because the browser needed to wait to download the entire document before doing anything else.

But there is one place where XHTML still rules the roost: ePub. ePub books are, at their heart, a collection of XHTML documents (now using [the XHTML flavour of the HTML Living Standard](https://html.spec.whatwg.org/#html-vs-xhtml)). This means that:

1. Valid, syntactically correct XML markup is needed. Without that, your e-reader will complain. This means self-closing tags, correct namespaces, XML attributes in the XML namespace (`xml:lang`), and so on.
2. Other XML languages can be included directly into XHTML by adding namespaces.
3. The `epub` namespace is unlocked, which adds additional functionality to your ePub in e-readers.

We’ll come back to that…

## CSS, sort of

So HTML is actually XHTML in ePub. Is CSS some sort of XCSS? Actually, no: CSS is broadly the same as you know it, but with a few quirks.

First up, e-readers and e-reader software are, compared to our normal evergreen browsers, typically really basic. They can run on underpowered hardware, people often keep their e-readers for over a decade, and the engines they use can be positively historic. To put it another way, I’m wary of using `:not()` in ePub CSS for a widely distributed title. While I might be overly cautious here, don’t expect nowadays normal pseudoclasses like `:is()` to have wide support. Luckily, layout tends to be simpler in a document-focused format, and progressive enhancement is possible with `@supports`.

Next, as our markup is now namespace aware, our CSS needs to follow. For example, if you wanted to style a piece of text in a different language that you’ve marked up like:

```html
<p>As Jean-Paul Sartre said, <q xml:lang="fr">L’enfer, c’est les autres</q>.</p>
```

Then you can’t simply use an attribute selector like `q[lang]`, you need to define your namespaces and reference them in your selectors using the `|` separator:

```css
@namespace xml "http://www.w3.org/XML/1998/namespace";

q[xml|lang] { … }
```

## Strange extensions

As mentioned earlier, namespace support means that other XML-compatible markup languages can be incorporated directly into your XHTML document. These could be just additional semantic attributes, or even new elements. Obviously to get anything useful out of them you need e-reader support, but that’s present in a few cases. Let’s take a look at a couple.

You might actually be familiar with MathML, as it’s [supported in HTML5](https://html.spec.whatwg.org/#mathml). The way you use it in HTML is that there’s a broad agreement that the contents of the MathML spec will just work when used in HTML. Adding a basic MathML equation using standard MathML tags (`math`, `mi`, `mo`, `mn`, and so on) to your normal HTML document ends up looking something like <math alttext="n + 1"><mi>n</mi><mo>+</mo><mn>1</mn></math>.

But in XHTML (because it’s an XML language) there’s a standard integration process for any XML language you want to bring in. First, you define your MathML namespace against the root element:

```html
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:m="http://www.w3.org/1998/Math/MathML">
```

Then the MathML elements are available to use inside the document under that namespace:

```html
<m:math alttext="n + 1">
  <m:mi>n</m:mi>
  <m:mo>+</m:mo>
  <m:mn>1</m:mn>
</m:math>
```

Same goes for SVG: in HTML [it’s just allowed to be included](https://html.spec.whatwg.org/#svg-0) with standard SVG tags; using `svg`, `title` and `path` can get you something like <svg style="height: 1em" viewBox="0 0 452 452"><title>the HTMHell logo</title><path d="M198.2.94c-28.6 3.3-61.4 14.6-87.3 29.9-61.2 36.2-102.2 99.8-110 170.8-1.8 16-.8 47.3 1.9 62.7 5.3 29.9 17 59.3 33.9 85 68.8 105 209.3 133.9 314 64.5 33.9-22.5 60.3-52.7 78.2-89.5 10.5-21.5 16.5-40.6 20.7-66 2.4-15 2.4-48.2-.1-64.5-7.9-51.9-30.4-95.7-67.7-131.5-35.6-34.2-82.3-56.2-130.1-61.4-11.2-1.3-42.9-1.2-53.5 0m55.2 19.4c14.7 2.1 23.7 4.1 36 8.1 11.9 3.9 34.9 14.5 45.9 21.3l6.9 4.3 7.4-5.2c4.1-2.9 7.6-5 7.9-4.7.3.2-.7 4-2.1 8.3-1.3 4.4-2.5 8.2-2.5 8.5s4.9 4.9 10.9 10.2c48.3 42.8 74.5 109.7 68.1 173.8-.9 8.8-4.2 26.9-6.5 36-.6 2.3.1 3 7.1 8l7.7 5.4-9.6.3-9.6.3-1.9 5.2c-11.5 30.5-33.6 61.5-59 82.8-32.1 26.8-70.7 43.8-109.2 47.9-5.8.6-12.4 1.3-14.7 1.6l-4.2.5-2.7 8.2c-1.4 4.5-3 8.5-3.3 9-.4.4-2-3.3-3.6-8.2l-2.8-9-4.6-.5c-2.5-.3-7.7-.8-11.6-1.1-18.2-1.6-42.2-8.1-62.2-16.9-47.2-20.6-88.8-63.8-107.4-111.1-1.3-3.3-2.7-6.5-3.2-7.2-.6-.8-4.3-1.3-10-1.5l-9.1-.3 7.6-5.7 7.6-5.7-1.8-6.8c-5.3-20.1-7.5-52.2-5.1-73.4 5.3-45.8 24.7-87.2 56.5-120.6 5.4-5.7 12.7-12.6 16.2-15.4 5.4-4.3 6.3-5.5 5.8-7.3-3.9-11.8-5.1-16.5-4.1-16 .7.4 4.2 2.9 7.9 5.6 3.7 2.6 7 4.8 7.4 4.8.3 0 2.4-1.3 4.7-2.9 6.9-4.7 20.5-11.7 32.2-16.6 17.5-7.3 36.5-12.3 57-14.8 8.3-1.1 40.9-.5 50 .8"/><path fill="#d72b2b" d="M165.9 218.04c-3 2.1-5.9 4.3-6.3 4.8-.5.4 14.1 47 32.4 103.4s33.7 102.2 34 101.8c.8-.7 42.9-129.9 42.9-131.3 0-.5-3.5-.9-7.8-.9h-7.8l-13.5 41.5c-7.4 22.8-13.7 41.5-14 41.5s-12.4-36.6-26.9-81.3c-14.5-44.6-26.6-81.7-26.9-82.3-.4-.8-2.5.2-6.1 2.8m137.7-4.7-2.5 7.5 35.4 25.7 35.5 25.8-86.6.3c-65.4.1-86.5.5-86.5 1.4 0 .6 1 4.2 2.2 8l2.2 6.8h217.8l-57.1-41.5c-31.5-22.8-57.3-41.5-57.5-41.5s-1.6 3.4-2.9 7.5m-184.8 11.3-87.6 63.7 70 .3c38.5.1 70.2 0 70.5-.2.2-.3-.7-3.8-1.9-7.8l-2.4-7.3-43.9-.5-44-.5 68.5-49.7c37.6-27.3 69.2-50.3 70.2-51 1.7-1.2 1.3-1.8-4.8-6.1-3.6-2.6-6.6-4.7-6.8-4.7-.1.1-39.6 28.8-87.8 63.8m169.8-123.5-56.7 41.2 2.7 2.3c1.6 1.2 4.5 3.4 6.5 4.8l3.8 2.7 6.7-5c37.2-27 64.4-46.5 64.7-46.2.1.2-11.8 37.5-26.6 82.9-14.7 45.4-26.8 82.6-26.8 82.8s3.6.2 8.1 0l8.1-.3 33.4-102.9c18.4-56.6 33.3-103 33.2-103.2-.2-.1-25.9 18.3-57.1 40.9m-182.7-40.8c0 1.1 42 130.7 42.9 132.3.5.9 2.5-.1 6.9-3.4 3.4-2.5 6.2-4.9 6.2-5.2 0-.4-6.1-19.1-13.5-41.7-7.4-22.5-13.2-41.1-13-41.3s31.6 22.4 69.9 50.2 70 50.6 70.4 50.6c.7 0 5.2-12.4 5.2-14.3 0-.3-37.9-28.2-84.2-61.8-46.4-33.7-85.8-62.3-87.5-63.7-1.8-1.3-3.3-2.1-3.3-1.7"/></svg>. But in XHTML you’ll need to declare the SVG namespace and use that with your images:

```html
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:svg="http://www.w3.org/2000/svg">
```

```html
<svg:svg viewBox="0 0 452 452">
  <svg:title>the HTMHell logo</svg:title>
  <svg:path d="M198.2.94c-28.6 3.3-61.4…"/>
</svg:svg>
```

Of course, we’re talking about ePub here. There’s a [W3 ePub specification (currently at version 3.3)](https://www.w3.org/TR/epub-33/) that defines the structure and metadata of an ePub document, and gives us the [`epub:type` attribute](https://www.w3.org/TR/epub-33/#dfn-epub-type). This attribute (in conjunction with the [Structural Semantics Vocabulary specification](https://www.w3.org/TR/epub-ssv-11/)) can be used in a few ways to improve your collection’s usability within an e-reader. Let’s look at an example.

One thing books often have is endnotes, but there’s no easy way of expressing that semantic state in HTML. In ePub’s vocabulary though we find the [`noteref` attribute value](https://www.w3.org/TR/epub-ssv-11/#noteref). If we use this on a link then readers know to pull in a fragment from another place and typically display then this inside a modal that can be dismissed to return to the existing place. This looks something like:

```html
<p>ePub is hellish.<a href="endnotes.xhtml#note-1" id="noteref-1" epub:type="noteref">1</a></p>
```

And in your collection of endnotes:

```html
<li id="note-1" epub:type="endnote">
  <p>…unless you read HTMHell. <a href="page.xhtml#noteref-1" epub:type="backlink">↩</a></p>
</li>
```

<p class="highlight"><strong>Note:</strong> <code>epub:type</code> is gradually being deprecated in favour of the <code>role</code> values defined in the <a href="https://www.w3.org/TR/dpub-aria-1.1/">Digital Publishing WAI-ARIA spec</a>, but currently that functionality is either unimplemented or only available in the latest systems. For example, the above endnotes functionality doesn’t yet work in Apple Books (generally a good e-reader) if you use <code>role="doc-noteref"</code> and <code>role="doc-endnotes"</code>.</p>

As well as these ePub semantic vocabulary, we also have things like the [Z39.98-2012 Structural Semantics Vocabulary](https://www.daisy.org/z3998/2012/vocab/structure/). This extends the base ePub spec, and takes the form of `z3998`-namespaced attribute _values_, which definitely looks odd if you’re not used to it. You can use these to express even more fine-grained semantic values, for example [Roman numerals](https://www.daisy.org/z3998/2012/vocab/structure/#roman) (`<span epub:type="z3998:roman">DCLXVI</span>`) or [parts of letters](https://www.daisy.org/z3998/2012/vocab/structure/#h_letters). Broad support for extracting any functionality from these is extremely lacking, but when did that ever stop us front-end developers from going over the top?

## Want to try this all out?

Writing an ePub isn’t exactly hard, but there’s some scaffolding necessary to get to a workable structure. You need a [`container.xml` file](https://www.w3.org/TR/epub-33/#sec-container-metainf-container.xml) in a `META-INF` directory that points at [a package file](https://www.w3.org/TR/epub-33/#sec-package-doc). The package file contains a bunch of metadata about your ePub, including [a manifest](https://www.w3.org/TR/epub-33/#sec-pkg-manifest) of the XHTML files in your book (for example, different chapters), and [a spine](https://www.w3.org/TR/epub-33/#sec-pkg-spine) describing the order they should be shown to the reader. You then add your XHTML files, reference them in the manifest and spine, and finally zip the whole directory up into a single archive and rename it to a <code>.epub</code>.

To get you started, I’ve prepared [a copy of this blog post as an ePub](htmhell-2025-12-11.epub) ready for your favourite e-reader (assuming it’s modern: I haven’t included any compatibility hacks). To inspect the contents we just need to unzip it; try renaming the file to have a `.zip` at the end and opening it with your favourite unarchiver. The markup can be found in `src/epub/text`.

If you want to create your own ePubs I’d personally recommend starting with [the Standard Ebooks toolset](https://github.com/standardebooks/tools): it can create unbranded ePubs and has a bunch of compatibility tooling built in. Once installed, you can create a directory with the requisite scaffolding with `se create-draft --white-label`, and then build that into an ePub with `se build`.

I hope you have fun putting your own ebooks together! It’s a useful new skill that reuses a lot of your existing knowledge.
