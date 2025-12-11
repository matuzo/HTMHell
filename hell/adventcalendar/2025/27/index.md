---
title: "Class names for content not design"
author: "Darice de Cuba"
date: 2025-12-27
intro: "<p>Short introductory text</p>"
image: "advent25_27"
---
One of the first thing I learned when I started coding HTML, besides using `div` instead of `tables` for the layout, was naming classes. One of the core ideas being that with HTML and CSS we keep content separate from design. A website should have solid HTML and class names in such a way that you can redesign the website by only editing the CSS and maybe a little bit of the HTML.

But to do that, the class and id names need to be reusable. If you make the class names design and layout specific, you will have to edit your HTML files every time you want to change these elements their position or design, instead of only editing the CSS file.

Due to the use of frameworks, a lot of sites nowadays have become a div and class soup that makes the HTML code unreadable and hard to troubleshoot. Developers who never learnt to code HTML from scratch lack the basic understanding of a solid HTML layout with good class names.

## Generic class names

Some example of bad class names are:

* `<h1 class="text-header-blue">` a better way is `<h1 class="site-name">` and for articles `<h1 class="post-title">`

* `<nav class="top">` a better way is `<nav class="main">`

* `<li class="border-bottom">` a better way is `<li class="selected">`

Class names shouldn’t be design dependent, but specific to content. A text header won’t always be blue, but it will always be the site name. It also makes it easier to read your HTML code  3 months later and not be confussed about what is what.

Best practice is to never use, colours, spacing, marking, etc. as class names. Only generic names that are independent of how the layout and design looks like.

A basic weblog homepage can look like this:

```html 
<article>
    <div class="meta">
        <span class="date"> December 29, 2025 </span>
        <span class="category">HTML</span>
    </div>
    <h1 class="post-title">
        <a href="https://site.org">How to HTML</a>
    </h1>

    <div class="intro">
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
            voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </p>
    </div>
    <a href="https:/site.org/2025/12/29/how-to-html/" class="read-more">Read more <span
            class="visually-hidden">about 'How to HTML'</span></a>
</article>
```

The above HTML example is completely design and layout neutral. The layout and design can be edited only with CSS without having to change things in the HTML.

## Conclusion
Keep your class and variable names generic. You want to avoid having to go through all your HTML and CSS code to change names to keep the code readable. There is nothing more painful than having to come back after each design or layout edit and be at lost what is what because `<h1 class="serif-text-header-blue">` is not blue any more, but a sans font in bright pink. 








