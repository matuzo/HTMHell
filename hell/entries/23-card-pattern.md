---
title: "#23 A card pattern"
seo_title: 23-card-pattern
teaser: ""
date: 2020-11-12T21:00:00
permalink: /{{ seo_title }}/index.html
layout: layouts/entry.njk
author: erik
badcode: '<article>
  <div>
    <div class="sr-only">Image</div>
    <img src="/feature-teaser.png" alt="Feature teaser"/>
  </div>
</article>

<div>
  <span>
    <span>Exciting feature!</span> 
  </span>
  <div>
    This text describes what the feature does!
  </div>
  <a href="/blog/feature">
    <span>Read more</span>
    <svg viewBox="0 0 9 12" xmlns="http://www.w3.org/2000/svg">
      <path d="M.84 10.59L5.42 6 .84 1.41 2.25 0l6 6-6 6z"></path>
    </svg>
  </a>
</div>'
goodcode: '<section>
  <div>
    <img src="/feature-teaser.png" alt=""/>
  </div>

  <div>
    <h4>Exciting feature!</h4> 
    <p>This text describes what the feature does!</p>
    <a href="/blog/feature">
      <span>Read more about our exciting feature </span>
      <svg aria-hidden="true" viewBox="0 0 9 12" xmlns="http://www.w3.org/2000/svg">
        <path d="M.84 10.59L5.42 6 .84 1.41 2.25 0l6 6-6 6z"></path>
      </svg>
    </a>
  </div>
</section>'

---
<div class="section bad">

## Bad code

```html
{{ badcode | pretty }}
```
</div>

<div class="section" id="issues">

## Issues and how to fix them

1. The example code uses an `<article>`. This element is meant for standalone content that can be re-used by itself. If there is anything reusable here, it is the entire “card”. More appropriate is a `<section>`.
1. There is a piece of text before the image, with the text image. This seems to be some sort of definition of the role of the element following. When using proper semantic HTML, the HTML-elements already communicate their semantics. Adding text is superfluous and confusing.
1. The alt-attribute states that image is a teaser for the feature mentioned below. Adding the text teaser does not make it a teasing image. The visual function of the image does not work in code. The image adds nothing of value to the textual content of the card. An empty alt-attribute would have hidden the image (and made clear that it is decorative).
1. There is a `<span>` with text that is meant to be a heading. Assistive technology can make use of headings in the code. When this card is nested below an `<h3>`, this heading could be an `<h4>` instead.
1. The main paragraph inside the card is wrapped in a `<div>`. Using a `<p>` would communicate its intentions more clearly.
1. “Read more” is not a very descriptive link text. It is especially bad when it’s in a list with more links with the same text. The users does not know where this link leads.
1. The `<svg>` within the link doesn’t provide additional information and should be hidden from screen readers.
</div>

<div class="section">

## Good code

```html
{{ goodcode | pretty }}
```
</div>

<div class="section">

<h2 id="resources">Resources</h2>

* [The Generic Section element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/section)

</div>
