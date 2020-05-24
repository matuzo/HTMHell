---
title: "#10 <section> is no replacement for <div>"
seo_title: "#10 section is no replacement for div"
date: 2019-11-22T01:00:00
permalink: /{{ seo_title | slug }}/index.html
layout: layouts/entry.njk
author: smaerdian
badcode: '<section id="page-top">
    <section data-section-id="page-top" style="display: none;"></section>
  </section>

  <main>
    <section id="main-content">
      <header id="main-header">
        <h1>...</h1>
        <section class="container-fluid">
          <section class="row">
            <article class="content col-sm-12">
              <section class="content-inner">
                <div class="content__body">
                  <article class="slider">
                    <section class="slide">
                      …
                    </section>
                  </article>
                </div>
              </section>
            </article>
          </section>
        </section>
      </header>
    </section>
  </main>'
goodcode: '<div id="page-top">
    <div data-section-id="page-top" style="display: none;"></div>
  </div>

  <main>
    <section id="main-content">
      <header id="main-header">
        <h1>...</h1>
      </header>
      <div class="container-fluid">
        <div class="row">
          <div class="content col-sm-12">
            <div class="content-inner">
              <section aria-labelledby="sliderheading" class="content__body">
                <h2 id="sliderheading" hidden>New Products</h2>
                <ul class="slider">
                  <li class="slide">
                    …
                  </li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>'
---


<div class="section bad">

## Bad code

```html
{{ badcode | pretty }}
```
</div>

<div class="section" id="issues">

## Issues and how to fix them

1. [Sectioning content](https://www.w3.org/TR/html52/sections.html#the-section-element) (`<article>`, `<aside>`, `<nav>`, `<section>`) is content that potentially has a heading and is appropriate only if the element’s contents would be listed explicitly in the document’s outline. 
1. [It’s OK to nest sectioning content](https://www.w3.org/TR/html52/sections.html#headings-and-sections), but it only makes sense if the contents of the inner elements are related to the contents of the outer element.
1. In this specific example, the sectioning elements are used for styling purposes only. They must not convey any semantic meaning, most of these sections and articles should be divs.
1. Screen readers may announce the role of a labelled `<section>` (_region_), when a user navigates to this section. User Agents may also provide methods to navigate to section elements. Using too many (nested) sections may make interfaces for screen reader users unnecessarily complicated.
1. `<section>`s are no replacement for `<div>`s.
1. A`<header>` typically only contains a group of introductory or navigational aids for its nearest ancestor `<main>` element or sectioning content or sectioning root element. If it’s not a descendant of the main element or a sectioning content element, then that [header is scoped to the body](https://www.w3.org/TR/html52/sections.html#the-header-element). 
1. The [carousel (.slider) should be enclosed in a labeled region](https://www.w3.org/WAI/tutorials/carousels/structure/), to allow users to find it easily.

</div>

<div class="section">

## Good code

```html
{{ goodcode | pretty }}
```
</div>

<div class="section">

## Further reading

* [Accessibility Support - section element (html)](https://a11ysupport.io/tech/html/section_element)
* Thanks to [Adrian Roselli](https://adrianroselli.com/) for feedback

</div>
