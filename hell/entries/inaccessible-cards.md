---
title: "#17 inaccessible cards"
date: 2020-03-14T07:00:00
permalink: /{{ title | slug }}/index.html
layout: layouts/entry.njk
author: sime
badcode: '<section><section><h2>Overview</h2>
<figure class="card" data-url="image1.html" style="background: url(image1.jpg)">
            <figcaption>
              <h4>My heading</h4>
              <article>Teasertext...</article>
            </figcaption>
          </figure>
<figure class="card" data-url="image2.html" style="background: url(image2.jpg)">  
…  
</figure>
</section></section>'
goodcode: '<div><section><h2>Overview</h2>
<article class="card">
  <h3>
    <a href="image1.html">
      My heading
    </a>
  </h3>
  <img src="image1.jpg" alt="Description of image1" />
  <p>Teasertext...</p>
</article>
<article class="card">  
…  
</article>
</section></div>'
---
<div class="section bad">

Context: A list of linked cards, each with heading, image, and teaser text.

## Bad code

```html
{{ badcode | pretty }}
```
</div>

<div class="section" id="issues">

## Issues and how to fix them

1. You might not need (so many) `<section>`s. Read [Why You Should Choose HTML5 &lt;article&gt; Over &lt;section&gt;](https://www.smashingmagazine.com/2020/01/html5-article-section/) by [Bruce Lawson](https://www.brucelawson.co.uk/) for more details.
1. {{ snippets.skip_headings }}
1. The figure element represents content, optionally with a caption, that is self-contained, but in this example there’s no content, only a caption.
1. The image in a card usually isn’t decorative, it conveys information. It should be part of the HTML document and not added via CSS. Background images are not accessible to everyone.
1. The card is only linked via JavaScript. If there’s no proper HTML anchor (`<a href="path/to/page">`), the “link” is inaccessible to screen reader and keyboard users.
1. The `<h1>` - `<h6>` elements represent introductory headings for their sections. The `<h4>` is flow content and thus technically allowed as a descendent of `figcaption`, but it’s better to use it to introduce the card as a whole.
1. The `article` element represents a self-contained composition in a page or site. This could be a newspaper article, an essay or report, a blog or other social media post. For a simple paragraph use `<p>`.
1. Making accessible cards where the whole card is clickable isn’t easy. Read the articles in the [resources](#resources) section for more information.

</div>

<div class="section">

## Good code

```html
{{ goodcode | pretty }}
```
</div>

<div class="section">

<h2 id="resources">Resources</h2>


* [Semantic Structure](https://webaim.org/techniques/semanticstructure/)
* [Block Links, Cards, Clickable Regions, Etc.](https://adrianroselli.com/2020/02/block-links-cards-clickable-regions-etc.html)
* [Inclusive Components: Cards](https://inclusive-components.design/cards/)
* [Teaser with multiple links](https://justmarkup.com/articles/2020-02-21-teaser-with-multiple-links/)
* [Block Links Are a Pain (and Maybe Just a Bad Idea)](https://css-tricks.com/block-links-are-a-pain-and-maybe-just-a-bad-idea/)
</div>
