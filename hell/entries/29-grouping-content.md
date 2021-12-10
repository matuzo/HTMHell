---
title: "#29 Randomly grouping content"
teaser: ""
date: 2021-12-10T21:00:00
permalink: /{{ title | slug }}/index.html
layout: layouts/entry.njk
author: mmatuzo
badcode: '<section>
  <aside>
    <div>
      <section>
        <header>
          <a href="/">
            <img src="logo.svg" alt="Logo">
          </a>
        </header>
        <main>
          <a href="/services">Services</a>
          <a href="/products">Products</a>
        <a href="/aboutus">Aboutus</a>
        </main>
        <footer></footer>
      </section>
    </div>
  </aside>

  <section>
    <footer></footer>
    <main>
      <h1>Welcome to Hell</h1>
    </main>
    <footer></footer>
  </section>
</section>'
goodcode: '
<header>
    <a href="/">
        <img src="logo.svg" alt="Homepage">
    </a>
    <nav>
        <ul>
            <li><a href="/services">Services</a></li>
            <li><a href="/products">Products</a></li>
            <li><a href="/aboutus">Aboutus</a></li>
        </ul>
    </nav>
</header>
<main>
    <h1>Welcome to Hell</h1>
</main>
'
---

<div class="section bad">

## Bad code

```html
{{ badcode | pretty }}
```

</div>

<div class="section" id="issues">

## Issues and how to fix them

* Use the <code>&lt;section&gt;</code> element only to mark up a grouping of related content, typically introduced with a heading. Learn more about sections in [Issue #8 - the section element](/tips/the-section-element/).
* Use the `<aside>` element only for content that is tangentially related to the main content and not for important parts of the page or site.
* Use the `<nav>` elements for important navigational groupings of links. Learn more about landmarks in [Issue #16 - Landmarks](/tips/landmarks/).
* If a link contains an image and no text, the `alt` attribute of the image serves as the link text. In such a case it might make sense to use the attribute not to describe the image, but the functionality of the link.
* You can structure the links in a `<nav>` by wrapping them in an `<ul>` or `<ol>`. Learn more about lists in [Issue #13 - ol vs. ul vs. div](/tips/ol-vs-ul-vs-div/)
* Try to avoid empty elements.
* A document must not have more than one `<main>` element that does not have the `hidden` attribute specified. Having more than one visible `<main>` element can confuse users because screen readers don’t announce the number of `<main>` elements.
* The `<main>` element must not appear as a descendant of the `<section>` or `<aside>` element.
* A page or sectioning content like `<article>` or `<section>` should only contain a single `<footer>`.

Check out the [resources section](#resources) at the bottom of this page for more.

</div>

<div class="section">

## Good code

```html
{{ goodcode | pretty }}
```
</div>

<div class="section">

<h2 id="resources">Resources</h2>

- [Use Only One main on a Page](https://adrianroselli.com/2015/09/use-only-one-main-on-a-page.html)
- [Accessibility of the section element](https://www.scottohara.me/blog/2021/07/16/section.html)

</div>