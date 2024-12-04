---
title: "PSA: Stop using the title attribute as tooltip!"
layout: layouts/advent.md
author: "Daniela Kubesch"
author_bio: "<p>Daniela Kubesch is an accessibility engineer who is passionate about user experience and inclusive design. She strongly believes in equality and inclusion and is committed to making digital services accessible. Daniela is also a co-creator of <a href='https://a11yphant.com'>a11yphant.com</a>, a platform that teaches the basics of web accessibility.</p>"
date: 2024-12-12
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
active: true
intro: "<p>Short description of the post</p>"
image: "advent24_12"
---
<!-- MM: Great post, thank you! After reading your post I had a couple of questions:

1. Does the popover attribute provide any implict semantics?
2. Is JavaScript a requirement for using popovers?
3. Why does the tooltip only show on hover and focus and not click?
4. Is it a good idea to show content automatically on focus?
5. Is the popover element accessible via the virtual cursor in a screen reader?
6. Is there feature detection? I'm running on Safari 16.5 and there it doesn't work.

If would be great if you could answer those in your post.

 -->

It's almost 2025, so it's time to stop using the `title` attribute everywhere. Images, text, buttons, ... you name it, devs really like to put it on any element in sight. Most of the time, people actually want to create a tooltip. You know, this small information bubble designed to clarify the purpose of otherwise unclear elements. It appears `onFocus` and `onHover` (not `onClick`), has no interactive elements (aka. only plain text), and is attached to existing interactive elements.

## But why not use `title`?

The `title` attribute is inaccessible. Users of mobile phones and tablets, users of assistive technologies, and keyboard only users cannot interact with it.
If you want a tooltip, a much better, and accessible, option using the `popover` attribute.

**Note:** The only place where you should (& must) use the `title` attribute is on an `iframe`!

<!-- 
  MM: Maybe link to Steve Faulkner post or another resource?
  https://html5accessibility.com/stuff/2021/08/26/named-and-framed/
 -->

## How to use `popover`

Firstly, before we get started, it is always better to display clear, permanently visible information. So, if space permits, do not use tooltips. Instead, provide clear labels and sufficient text. This is particularly important for forms!

However, if you wanna go down that path, the `popover` attribute provides a starting point for building popover-like interactions on the web. Its purpose is simply to add 'popover/tooltip behaviour'. So we'll use it to create our custom plain-text tooltip.

To start, we just need an interactive element (like a button) which is used to trigger the tooltip, even when navigating with a keyboard only, and a `<div>` containing the tooltip content.

The `<div>` receives the `popover` attribute, `role='tooltip'` and an `id`. The `<button>` is linked to the tooltip with `aria-describedby`.

```html
<p>
    There is a
    <button
        type="button"
        aria-describedby="tooltip">
        secret
    </button> to accessible HTML!
</p>

<div
    popover
    role="tooltip"
    id="tooltip">
    <div>
        a div is not a button ✨
    </div>
</div>
```

With the help of JavaScript we can display the tooltip by using `.hidePopover()` and `.showPopover()`. It is important to ensure that the tooltip is displayed long enough for the mouse pointer to reach the content of the tooltip (`mouseover`, `mouseout`), in order for users being able to copy the text within the tooltip or read it with magnification software. To open or close the tooltip with keyboard navigation, we must check for `focusin` and `focusout` as well.

Now all that is left is to use CSS to style the tooltip and ensure that it is correctly positioned. The `:popover-open` pseudo-class, for example, can be used to add styling for when the tooltip is displayed.

<style>
  html {
    --anchor-name: --tooltip
}
.popoverbutton {
  font-size: 20px;
  font-family: sans-serif;
  font-weight: 600;
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
    class="popoverbutton">
      secret
  </button> to accessible HTML!
</p>

<!-- The custom tooltip -->
<div
     popover
     role="tooltip"
     id="tooltip">
  <div class="tooltip-content">
    a div is not a button ✨
  </div>
</div>

<script>
  const tooltip = document.querySelector('[popover]');
const tooltipTrigger = document.querySelector('button');
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
