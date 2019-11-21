---
title: "#10 <section> is no replacement for <div>"
date: 2019-11-08T01:00:00
permalink: /{{ title | slug }}/index.html
layout: layouts/entry.njk
author: mmatuzo
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
              <section aria-labelledby="carouselheading" lass="content__body">
                <h3 id="carouselheading" hidden>New Products</h3>
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

<div class="section">

## Issues and how to fix them

1. Sectioning content (`<article>`, `<aside>`, `<nav>`, `<section>`) is content that potentially has a heading and is appropriate only if the element’s contents would be listed explicitly in [the document’s outline](https://www.w3.org/TR/html52/sections.html#the-section-element). 
1. [It's OK to nest sectioning content](https://www.w3.org/TR/html52/sections.html#headings-and-sections), but it only makes sense if the contents of the inner elements are related to the contents of the outer element.
1. In this specific example, the sectioning elements are used for styling purposes only. They must not convey any semantic meaning.
1. Screen readers may announce the role of a `<section>` (_region_), when a user navigates to this section. User Agents may also provide methods to navigate to section elements. Using too many (nested) sections may make interfaces for screen reader users unnecessarily complicated.
1. `<section>`s are no replacement for `<div>`s.
1. [A`<header>` typically only contains a group of introductory or navigational aids](https://www.w3.org/TR/html52/sections.html#the-header-element) for its nearest ancestor `<main>` element or sectioning content or sectioning root element.
1. The slider should be enclosed in a labeled region, to allow users to find it easily.

<div class="section">

## Good code

```html
{{ goodcode | pretty }}
```
</div>
