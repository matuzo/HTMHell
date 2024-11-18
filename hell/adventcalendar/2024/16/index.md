---
title: "You don’t need the isOpen class"
layout: layouts/advent.md
author: "Maureen Holland"
author_bio: "Lead front-end web developer at silverorange.com. Passionate about accessibility, performance, and biking around Scotland."
date: 2024-12-16
author_links:
  - label: "Work"
    url: "https://blog.silverorange.com/"
    link_label: "blog.silverorange.com"
  - label: "Personal"
    url: "https://maureenholland.ca/magpie/"
    link_label: "maureenholland.ca/magpie"
  - label: "Mastodon"
    url: "https://hachyderm.io/@maureenholland"
    link_label: "@maureenholland"
active: true
intro: "<p>How to get a quick accessibility win by repurposing the logic of applying a conditional class to provide meaningful semantics.</p>"
image: "advent_16"
---
<!-- Short and on point. No comments from me. :) -->
Don’t get me wrong. You can keep it if you like it. But you don’t *need* it.

A class selector can allow us to visually show or hide content for disclosure widgets, like a custom select component or dropdown navigation menu. But a disclosure widget is made of two parts:

1. A button that controls show/hide behaviour
2. Related content that is shown or hidden *depending on the button state*

Whether the `isOpen` class is applied or not, a screenreader would announce this button as **"Click me!, button"**.

```html
<button>Click me!</button>
<p class="isOpen">Content that displays depending on a conditionally applied class.</p>
```

One of the principles of web accessibility is to be perceivable. That means not relying exclusively on one sense, like sight, to provide information. In the above case, if I can’t see the content being shown or hidden, how do I know my button click did anything?

We *need* a corresponding semantic update to indicate what happened. This is what the `aria-expanded` attribute provides.

The following button would read: **"Click me!, expanded, button"**.

```html
<button aria-expanded="true">Click me!</button>
<p>Content that displays depending on button's expanded state.</p>
```

This one would be **"Click me!, collapsed, button"**.

```html
<button aria-expanded="false">Click me!</button>
<p>Content that displays depending on button's expanded state.</p>
```

The `aria-expanded` attribute also provides a ready-made CSS selector for collapsed and expanded states. So, we don’t need to add an `isOpen` class at all.

If you’ve used the `:checked` pseudo-class before, you’ll be familiar with the idea of styling scoped to a particular state. It’s a good idea. As a bonus, you get a mini accessibility test in your CSS! The styles only apply if the semantics are correct.

```css
button[aria-expanded="false"] + * {
 /* collapsed content styles here */
 display: none;
}

button[aria-expanded="true"] + * {
 /* expanded content styles here */
 display: block;
}
```

I first learned of this technique through [Heydon Pickering’s Inclusive Components](https://inclusive-components.design/collapsible-sections/) and have been using it ever since. It’s simple, effective, and a great way to keep accessibility in mind at every stage of development.

<p class="highlight">
<strong>Note:</strong> You will not need <code>aria-expanded</code> on the HTML <code>details</code> element. Stateful information is automatically provided through its <code>open</code> attribute. <a href="https://www.scottohara.me/blog/2022/09/12/details-summary.html">See Scott O’Hara for more details on <code>details</code></a>.
</p>

<!-- KS: Great post, thank you! I wonder if it's worth also introducing
     the `aria-controls` attribute? That makes the code look a little
     more readable, and could also help with the poor performance
     inherent in `*` selectors (since selectors are evaluated right
     to left). -->
