---
title: 'What the slot?'
layout: layouts/advent.md
author: 'Egor Kloos (aka dutchcelt)'
author_bio: 'Egor Kloos was a web designer or front-end developer (depending on who you ask) but is now focused on being a UX engineer. Design implementation is the work that bridges the gap between design and development. His passion for Web Components and Design Systems was, ultimately, inevitable.'
date: 2023-12-01
tags: advent2023
author_links:
  - label: 'Blog'
    url: 'https://dutchcelt.nl'
    link_label: 'dutchcelt.nl'
  - label: 'Egor on Mastodon'
    url: 'https://mastodon.social/@dutchcelt'
    link_label: 'Mastodon'
active: true
intro: '<p>Is the slot tag a convenience or a pain in the rear? The short answer is yes. First, what the hell is a <slot> anyway, and why would anybody want to use it? It&apos;s, apparently, all about content and Web Components. With recent advancements, we have options that allow you to skip slots altogether, sort of. This article will take a closer look and try not to ruin this Christmas and the next.</p>'
---

Web Components. They're popping up all over the place and have nifty features for creating components using JavaScript, CSS, and a bit of HTML. Everybody is excited.  
Not surprisingly, there is lots of talk about Custom Elements with Shadow DOM—mostly about JavaScript and CSS and their enhanced encapsulation abilities. Let’s not forget the power of HTML, which is often overlooked. HTML is catered for with HTML Templates and `<slots>` that provide a portal to the Shadow DOM. They’re kinda magical and can prove very useful. They do have some oddities. You may need to examine your use case to see if it’s worth the hassle.

## What are slots?

I’ve heard some relate them to Custom Elements, which they’re not. You can have slots associated with a div, a section element, or even the body[^1].  
They are part of the Shadow DOM. We have, in effect, two types of DOM. A Light DOM (the document) or the Shadow DOM attached to a Custom element or a [small set of HTML elements](https://developer.mozilla.org/en-US/docs/Web/API/Element/attachShadow).  
The Custom Element contains markup sent from a CMS, for example, to the template cloned into the Shadow DOM that itself was ‘attached’ to the Custom Element. It’s simple and confusing at the same time. I forget to mention it. It may be tempting, but please avoid distilled liquor while reading this article.

![](https://dutchcelt.nl/hotlinked/slots.webp)

The code would look like this.

##### Custom element

```html
<card-component>
  <h1 slot="heading">This is the Card Title</h1>
  <blockquote>This will be passed on to the unnamed slot. Lorem ipsum dolor...</blockquote>
</card-component>
```

##### Template

The Template is what ends up in the Shadow DOM. The `<slot>` pulls in the content inside the Custom Element.

```html
<template>
  <a id="linkheader">
    <slot name="heading"></slot>
  </div>
  <div id="content">
    <slot></slot>
  </div>
</template>
```

## What is good?

Anything that can access the document can access that content, including search engines[^2]. They’re all on the page, in the Light DOM.  
Slots can be placed in any order. Document order or source order isn’t necessarily relevant here. The Shadow DOM template determines the order. Note that the template has its own markup and places the `slot` tags where it is convenient.

- Easy to add content
- Easy for machines to index (i.e. search engines and crawlers like chatGPT)
- Content changes are visible inside the Component. Slots are live; Ummm, I mean reactive!
- Slots bring the styles they were given in the Light DOM to the Shadow DOM.

This all sounds very tasty. But before we choke on an unclosed `<article>` let’s see what’s whiffy about slots.

## What is bad?

What’s good can also be a royal pain in the whatchamacallit. Slots bring the styles they were given in the Light DOM to the Shadow DOM. Great, but what about encapsulation? Yeah, what about it? Sounds great, but you can only have the leaky version. Okay?

Styling slots from the Shadow DOM isn't really recommended, especially if you don't have control over the styles loaded into the document. The `::slotted()` selector is weak by design.

```css
/* Light DOM style */
blockquote {
  margin: 0;
  padding: 0;
  color: dodgerblue;
  background-color: wheat;
}
```

```css
/* Shadow DOM slotted styling */
::slotted(blockquote) {
  margin: 2rem;
  padding: 2rem;
  color: white;
  background-color: hotpink;
}
```

###### THE LIGHT DOM WINS BY DEFAULT

This is okay, but sometimes, it’s a real problem when the Web Component has a specific context that the document isn’t aware of.  
Also, one tip is to use `<slot>`’s for content only and not for forms or other interactive elements. In those cases, it’s about the input and the actions, not about the content.

## What are your options?

Only style web components via the light dom. This [Codepen shows how to add your overrides](https://codepen.io/dutchcelt/full/WNYEEMd) to the document using `adoptedStyleSheets`.

```javascript
const sheet = new CSSStyleSheet();
sheet.replaceSync(`
  card-compoent blockquote{
    margin: 2rem;
    padding: 2rem;
    background-color: hotpink;
    color: white;
  }
`);
document.adoptedStyleSheets = [sheet];
```

You could add the overriding style via a stylesheet in the document the 'normal' way. However, this way, both the Light DOM and Shadow DOM code for the component is grouped together and makes maintaining the code a lot easier.

Regardless of your approach, with or without distilled liquor is totally understandable. Enjoy the holidays, and drive safe.

[^1]: Adding Shadow DOM to the body can unlock many styling and markup options that are hard or complicated to achieve.
[^2]: many search engines have the ability to read out Shadow DOM content, so from an SEO perspective, it’s becoming less relevant.
