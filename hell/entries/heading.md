---
title: "#19 heading in the wrong direction"
date: 2020-05-14T07:00:00
permalink: /{{ title | slug }}/index.html
layout: layouts/entry.njk
author: sime
badcode: '<h1>Product Status</h1> 
<h2>Is the product available?</h2> 

<div>
  <h3>
    <div>
      <div>
        <i>
          <h3 class="message is-success">

            It‘s <a>available</a>.

          </h3>
          </i>
      </div>
    </div>
  </h3>
</div>'
goodcode: '
<h1>Product Status</h1> 
<p>Is the product available?</p> 
<p class="message is-success">

It‘s <a href="/product.html">available</a>.

</p>
'
---
<div class="section bad">

Context: A simple page that displays the availability of a product.

## Bad code

```html
{{ badcode | pretty }}
```
</div>

<div class="section" id="issues">

## Issues and how to fix them

1. `h1 – h6` elements must not be used to markup subheadings, subtitles, alternative titles and taglines unless intended to be the heading for a new section or subsection.<sup><a href="#resources">1</a></sup>
1. All `div` elements in this specific example are superfluous. It’s likely that they only exist because a front-end framework adds them by default. Use [Fragments in React](https://reactjs.org/docs/fragments.html) or similar techniques in other frameworks to avoid unnecessary markup.
1. {{ snippets.dom_size }}
1. {{ snippets.dom_tree }}
1. Only [phrasing content](https://www.w3.org/TR/html52/dom.html#phrasing-content) is allowed as children and descendants of `h1 – h6` elements. (`h3` and `div` don’t fall in the phrasing content category).
1. {{ snippets.i_elem }}
1. {{ snippets.aplaceholder }} <sup><a href="#resources">3</a></sup>
1. {{ snippets.aplaceholder_click }}
</div>

<div class="section">

## Good code

```html
{{ goodcode | pretty }}
```
</div>

<div class="section">

<h2 id="resources">Resources</h2>

1. [4.13.1. Subheadings, subtitles, alternative titles and taglines](https://www.w3.org/TR/html52/common-idioms-without-dedicated-elements.html#common-idioms-without-dedicated-elements)
1. [4.5.22. The i element](https://www.w3.org/TR/html52/textlevel-semantics.html#the-i-element)
1. [4.5.1 The a element](https://html.spec.whatwg.org/#the-a-element)
</div>
```
