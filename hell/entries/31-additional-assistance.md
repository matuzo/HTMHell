---
title: "#31 additional “assistance”"
seo_title: "31-additional-assistance"
date: 2022-04-12
permalink: /{{ seo_title }}/index.html
layout: layouts/entry.njk
author: smellai
badcode: '
    <a href="/contact" aria-label="If you find that you need additional 
    
    assistance in navigating or accessing the content of this website, 
    
    please call our customer service toll free number 1-800-666-8654309"

    title="If
    
    you find that you need additional assistance in navigating or accessing 
    
    the content of this website, please call our customer service 
    
    toll free number 1-800-666-8654309">
    
    Contact
    
    </a>

<a href="/login" aria-label="If you find that you need additional assistance in navigating or accessing the content of this website, please call our customer service toll free number 1-800-666-8654309" title="If you find that you need additional assistance in navigating or accessing the content of this website, please call our customer service toll free number 1-800-666-8654309">

Login

</a>'
goodcode: '<a href="/contact">

    Contact

</a>

<a href="/login">

    Login

</a>'
---

<div class="section bad">

## Bad code

```html
{{ badcode | pretty }}
```
</div>

<div class="section" id="issues">

## Issues and how to fix them

1. `aria-label`, `aria-labelledby`, etc. must not be misused for dumping contact information or other unrelated content.
1. Text in a link must describe the purpose or the target of the link.
1. The visible label of an element should match the accessible name.
1. Information concerning accessibility should be on a dedicated page (e.g. an <a href="https://www.w3.org/WAI/planning/statements/">accessibility statement</a>) and/or the contact page.
1. The `title` attribute shouldn't be used for important contact information due to inconsistent browser support and lack of accessibility.
1. Redundant link text should be avoided.
</div>

<div class="section">

## Good code

```html
{{ goodcode | pretty }}
```
</div>

<div class="section">

<h2 id="resources">Resources</h2>

- [The Trials and Tribulations of the Title Attribute](https://www.24a11y.com/2017/the-trials-and-tribulations-of-the-title-attribute/)

</div>


