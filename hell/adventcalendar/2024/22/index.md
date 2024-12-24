---
title: "PSA: Stop using the title attribute as tooltip!"
layout: layouts/advent.md
author: "Daniela Kubesch"
author_bio: "<p>Daniela Kubesch is an accessibility engineer who is passionate about user experience and inclusive design. She strongly believes in equality and inclusion and is committed to making digital services accessible. Daniela is also a co-creator of <a href='https://a11yphant.com'>a11yphant.com</a>, a platform that teaches the basics of web accessibility.</p>"
date: 2024-12-22
author_links:
  - label: "Website/Blog"
    url: "https://dnikub.dev"
    link_label: "dnikub.dev"
  - label: "Mastodon"
    url: "https://front-end.social/@dnikub"
    link_label: "front-end.social/@dnikub "
  - label: "Twitter"
    url: "https://twitter.com/dnikub"
    link_label: "@dnikub"
  - label: "LinkedIn"
    url: "https://linkedin.com/in/danikubesch"
    link_label: "danikubesch"
intro: "<p>Images, text, buttons, and more — developers love to add the title attribute to any element in sight, in 99% of cases to create a tooltip. The issue is that the title attribute isn't accessible. But don't worry, the popover attribute has got you covered!</p>"
image: "advent24_22"
tags: advent2024
active: true
---

It's almost 2025, so it's time to stop using the `title` attribute everywhere. Images, text, buttons, ... you name it, devs really like to put it on any element in sight. Most of the time, people actually want to create a tooltip. You know, that little bubble of information designed to clarify the purpose of otherwise unclear elements, that pops up attached to an element when its receives focus or a user hovers their mouse over it.

The identifying thing about tooltips is that they contain no interactive elements (aka. only plain text), and are always attached to existing interactive elements.
Whenever you want to add interactive elements inside your information bubble, it's not called _tooltip_, but _toggletip_. Toggletips can contain semantic markup, rich content and interactive elements, and usually only appear when an element is clicked. The great thing about toggletips is that they're accessible on touchscreens and easier to find and recognise for users with low vision.

So depending on your use case, you need to implement a tooltip or a toggletip.

But let's circle back to the `title` attribute. Often, people use it to create a tooltip. However, this is not the recommended way to go.

## But why, I love my `title`!?

It's simple. The `title` attribute is inaccessible. Users of mobile phones and tablets, users of assistive technologies, and keyboard only users cannot interact with it.
If you want a tooltip, a much better, and accessible, option is using the `popover` attribute.

**Note:** The only place where you should (& must) use the `title` attribute is on an `iframe`! See [Steve Faulkner's post](https://html5accessibility.com/stuff/2021/08/26/named-and-framed/) for more information.

## How to use `popover`

Firstly, before we get started, it is always better to display clear, permanently visible information. So, if space permits, do not use tooltips. Instead, provide clear labels and sufficient text. This is particularly important for forms!

However, if you wanna go down that path, the `popover` attribute provides a starting point for building popover-like interactions on the web. Its purpose is simply to add 'popover/tooltip behaviour'. So we'll use it to create our custom plain-text tooltip.

To start, we just need an interactive element (like a button) which is used to trigger the tooltip, even when navigating with a keyboard only, and a `<div>` containing the tooltip content.

The `<button>` is linked to the tooltip with `aria-describedby`.
The `<div>` receives the `popover` attribute and an `id`.
As the `popover` attribute just adds behaviour, not semantics, we need to [add our own role when it makes sense](https://hidde.blog/popover-semantics/). Therefore we add `role='tooltip'` to the `<div>`.

```html
<p>
  There is a
  <button type="button" aria-describedby="tooltip">secret</button> to accessible
  HTML!
</p>

<div popover role="tooltip" id="tooltip">
  <div>a div is not a button ✨</div>
</div>
```

### Let's make it interactive

If we would want to create a _toggletip_, which opens `onClick`, we could simply add `popovertarget="ID"` to the `<button>`, with the `id` of the toggletip.

```html
There is a 
<button type="button" aria-describedby="toggletip" popovertarget="toggletip">
  secret
</button>
to accessible HTML!

<div popover id="toggletip">
  <div>a div is not a button ✨</div>
</div>
```

<div class="demo-toggletip">

There is a <button type="button" class="popoverbutton togglebutton" aria-describedby="toggletip" popovertarget="toggletip">secret</button> to accessible HTML!

<div popover id="toggletip">
  <div class="tooltip-content">a div is not a button ✨</div>
</div>

</div>

However, if we want our _tooltip_, that is triggered when the interactive element is hovered or focused, we need JavaScript.
We can display the tooltip by using `.hidePopover()` and `.showPopover()`.
If `showPopover()` is called on an element with the popover attribute that is currently hidden, the element is added to the top rendering layer.

A tooltip usually disappears when hitting the Escape key or when the mouse is moved away from the interactive element.
But it's also important to make sure that the tooltip content is reachable with the mouse pointer. That way, users can copy the text or read it with magnification software.
That's why, with the help of JavaScript, we show the tooltip on `mouseover` of the interactive element and keep it visible when the tooltip itself is hovered (by also listening to `mouseover`).
With `mouseout` we can hide the tooltip as soon as the mouse leaves either the tooltip or the interactive element that triggered it.

To open or close the tooltip with keyboard navigation, we must listen to the `focusin` and `focusout` events of the button.
The tooltip must be easy to dismiss (e.g. by pressing the Escape key).
It's also worth noting that tooltips don't actually get the focus themselves. The focus stays on the element that triggered the tooltip.
However, it's content is still read to screen reader users and is accessible by the screen readers virtual cursor.
But remember, in general, if we're showing content automatically when an element receives focus, it's important not to suddenly change context and confuse users.

#### Wait, is this new attribute supported?

Good news! The `popover` attribute is [supported by all modern browsers](https://caniuse.com/?search=popover) with versions released between mid-2023 and 2024 (starting with Safari 17.0, Firefox 125, Chrome 114 and Edge 114).

### Looks bad though

That's why the last thing to do is use CSS to style the tooltip.
If you want to change how the tooltip looks when it's displayed, you can use the `:popover-open` pseudo-class.

We also need to make sure the tooltip is correctly positioned.
We can use `position-anchor` and `position-area` for Chrome and Edge, but they're still in the experimental phase, so we need an alternative for other browsers. The simplest option would be to use a library like [Floating UI](https://floating-ui.com/).

<style>
  html {
    --anchor-name: --tooltip;
    }
.popoverbutton {
  font-size: 20px;
  font-family: sans-serif;
  font-weight: 600;
}
.demo-toggletip {
    --anchor-name: --toggletip;
}
.popoverbutton {
  all: unset;
  padding: 0;
  margin: 0;
  background: none;
  border: none;
  border-bottom: 1px dashed #000;
  anchor-name: var(--anchor-name);
  font-weight: bold;
}
.popoverbutton:hover {
  background: transparent;
}
[popover] {
  overflow: visible;
  padding: 0;
  margin: 0;
  border: none;
  background: none;
  position-anchor: var(--anchor-name);
  position-area: var(--popover-inset-area, block-start);
  opacity: 0;
}
[popover]:popover-open {
    opacity: 1;
}
.tooltip-content {
  position: relative;
  text-align: center;
  line-height: 1.2;
  max-inline-size: max-content;
  background-color: #0a0a0a;
  color: #f2f2f2;
  border: 2px solid #f2f2f2;
  border-radius: 0.4rem;
  padding: 0.5rem 0.75rem;
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 0.25rem;
}
.tooltip-content:after {
  font-size: 20px;
  content: "";
  position: absolute;
  bottom: -25%;
  left: 45%;
  transform: rotate(180deg);
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  width: 1.25rem;
  height: 0.75rem;
  background-color: #0a0a0a;
}
</style>

<p>
  There is a
  <!-- interactive element triggering the tooltip -->
  <button
    type="button"
    aria-describedby="tooltip"
    class="popoverbutton js-button">
      secret
  </button> to accessible HTML!
</p>

<!-- The custom tooltip -->
<div
     popover
     role="tooltip"
     id="tooltip"
     class="js-content">
  <div class="tooltip-content">
    a div is not a button ✨
  </div>
</div>

<script>
  const tooltip = document.querySelector('.js-content');
const tooltipTrigger = document.querySelector('.js-button');
const openTooltip = () => {
  tooltip.showPopover()
};
const closeTooltip = () => {
  tooltip.hidePopover()
};
tooltipTrigger.addEventListener('mouseover', openTooltip);
tooltip.addEventListener('mouseover', openTooltip);
tooltipTrigger.addEventListener('mouseout', closeTooltip);
tooltip.addEventListener('mouseout', closeTooltip);
tooltipTrigger.addEventListener('focusin', openTooltip);
tooltipTrigger.addEventListener('focusout', closeTooltip);
</script>

And that's it, you just created a custom tooltip!
Find the detailed code in this [CodePen](https://codepen.io/dnikub/pen/PwYqwJE).
