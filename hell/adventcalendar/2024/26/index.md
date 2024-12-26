---
title: "The underrated &lt;dl&gt; element"
layout: layouts/advent.md
author: "David Luhr"
author_bio: "David Luhr is a senior design engineer focused on accessible design and development. He is passionate about creating a more responsible web for everyone, eliminating waste, and creating free educational content through his [Build UX YouTube channel](https://www.youtube.com/@buildux)."
date: 2024-12-26
author_links:
  - label: "Personal website and blog"
    url: "https://luhr.co"
    link_label: "luhr.co"
  - label: "YouTube"
    url: "https://www.youtube.com/@buildux"
    link_label: "youtube.com/@buildux"
  - label: "LinkedIn"
    url: "https://www.linkedin.com/in/davidluhr/"
    link_label: "linkedin.com/in/davidluhr"
active: true
intro: "<p>The Description List element is useful for many common visual design patterns, but is unfortunately underutilized.</p>"
image: "advent24_26"
tags: advent2024
---

The [Description List (`<dl>`) element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dl) is useful for many common visual design patterns, but is unfortunately underutilized.

It was originally intended to group terms with their definitions, but it's also a great fit for other content that has a key/value structure, such as product attributes or cards that have several supporting details.

Developers often mark up these patterns with overused heading or table semantics, or neglect semantics entirely. With the Description List (`<dl>`) element and its dedicated Description Term (`<dt>`) and Description Definition (`<dd>`) elements, we can improve the semantics and accessibility of these design patterns.

The `<dl>` has a unique content model:
- A parent `<dl>` containing one or more groups of `<dt>` and `<dd>` elements
- Each term/definition group can have multiple `<dt>` (Description Term) elements per `<dd>` (Description Definition) element, or multiple definitions per term
- The `<dl>` can optionally accept a single layer of `<div>` to wrap the `<dt>` and `<dd>` elements, which can be useful for styling

## Examples

An initial example would be a simple list of terms and definitions:

![Example design with bold text terms followed by regular text definitions.](./terms-and-definitions.jpg)

```html
<dl>
	<dt>Compression damping</dt>
	<dd>Controls the rate a spring compresses when it experiences a force</dd>
	<dt>Rebound damping</dt>
	<dd>Controls the rate a spring returns to it's extended length after compressing</dd>
</dl>
```

A common design pattern is "stat callouts", which feature mini cards of small label text above large numeric values. The `<dl>` is a great fit for this content:

![Example design with 3 groupings of small label text above large, bold number values.](./stat-callouts.jpg)

```html
<dl>
	<div>
		<dt>Founded</dt>
		<dd>1988</dd>
	</div>
	<div>
		<dt>Frames built</dt>
		<dd>8,678</dd>
	</div>
	<div>
		<dt>Race podiums</dt>
		<dd>212</dd>
	</div>
</dl>
```

And, a final example of a product listing, which has a list of technical specs:

![Example design a large placeholder image next to a product title and a key/value list of product details.](./product-details.jpg)

```html
<h2>Downhill MTB</h2>

<dl>
	<div>
		<dt>Front travel:</dt>
		<dd>160mm</dd>
	</div>
	<div>
		<dt>Wheel size:</dt>
		<dd>27.5"</dd>
	</div>
	<div>
		<dt>Weight:</dt>
		<dd>15.2 kg</dd>
	</div>
</dl>
```

## Accessibility

With this markup in place, [common screen readers will convey important semantic and navigational information](https://a11ysupport.io/tech/html/dl_element). In my testing, NVDA on Windows and VoiceOver on MacOS conveyed a list role, the count of list items, your position in the list, and the boundaries of the list. TalkBack on Android only conveyed the term and definition roles of the `<dt>` and `<dd>` elements, respectively.

If the design doesn't include visible labels, you can at least include them as visually hidden text for assistive technology users. But, I always advocate to visually display them if possible.

## Wrapping up

The `<dl>` is a versatile element that unfortunately doesn't get much use. In over a decade of coding, I've almost never encountered it in existing codebases. It also doesn't appear anywhere in the top HTML elements lists in [the Web Almanac 2024](https://almanac.httparchive.org/en/2024/markup#element-diversity) or [an Advanced Web Ranking study of over 11.3 million pages](https://www.advancedwebranking.com/seo/html-study). The next time you're building out a design, look for opportunities where the underrated Description List is a good fit.

To go deeper, be sure to check out this [article by Ben Myers on the `<dl>` element](https://benmyers.dev/blog/on-the-dl/).
