---
title: "Minimal javascript accordions"
author: "Justin Yarbrough"
author_bio: "Justin is a blind digital accessibility specialist with nearly a decade of experience in higher education, consulting, and finance. He currently works for a large U.S. bank as a lead accessibility coach, embedding within agile crews and helping them incorporate accessibility into the SDLC."
date: 2026-12-09
author_links:
  - label: "Site"
    url: "https://yarbrough.info"
    link_label: "Website"
intro: "<p>How to build an accessible accordion with minimal JavaScript</p>"
image: "advent26_1"
active: true
---

As a blind screen reader user and accessibility specialist, nothing gets under my skin quite like when I see no JavaScript components talked about like they're the greatest thing since sliced bread. While they may sound simple on the surface, they often use non-standard patterns and create accessibility barriers.

That being said, I do believe that we can learn from some of these patterns and take advantage of CSS to minimize the amount of JavaScript needed for a project. Below I'll break down my approach to developing an accordion that uses just a tiny bit of JavaScript and leans heavily on CSS to provide core functionality.

## Why not just use summary/details?

You can create more or less the same functionality as I’ll describe below by simply using the summary and details elements with zero JS, but that’s not really a viable option if you want the button triggering the accordion to have heading semantics. While the [MDN article for the summary element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/summary) states that you can use heading elements within the summary element, doing so isn’t supported by many browser and screen reader combinations since the [underlying semantics are stripped out](https://w3c.github.io/aria/#tree_exclusion:~:text=Any%20descendants%20of,Children%20Presentational%3A%20True%22%3A) of all children of anything with a button role.

## Building the accordion

Let’s take a look at what’s needed for this minimal javascript accordion.

### HTML

The underlying HTML for the accordion is pretty simple, consisting of a heading element, a button as a child of the heading, and a div to contain the panel that's shown/hidden:

```
<h2 class="acc-header">
<button aria-expanded="false">
Accordion label goes here
</button>
</h2>
<div class="acc-panel">
<!--Accordion content goes here-->
</div>
```

A few notes on the elements being used

- The level of the heading element doesn't matter and should be adjusted to fit the content structure of your page. This simply ensures the button it wraps has the proper heading level applied. I added the "acc-heading" class to it  to simplify the CSS used later in this example.
- A button element as the first child of the heading element. The inner text of the button serves as the visual label and the `aria-expanded` attribute will indicate to screen readers if the content in the panel below is displayed or hidden. This attribute is very important for this pattern, as you'll see below.
- A `<div>` to serve as the container for the content that is shown or hidden when the button is activated. For this example, we’ll add the class "acc-panel"to it.

While the [ARIA Authoring Practices Guide accordion example](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/) has a good bit more attributes and such, they’re not really needed and don’t really impact functionality.

### JS

From a JS perspective, all you really need to do is loop through all of the buttons with an `aria-expanded` attribute and add an event listener to them that will toggle the value of the attribute between true and false when clicked.

```
document.querySelectorAll('[aria-expanded]').forEach((accButton) => {
  accButton.addEventListener('click', function () {
    this.ariaExpanded = this.ariaExpanded == 'true' ? 'false' : 'true';
  })
})
```

This approach ensures two things:

- That the button will announce as expanded or collapsed correctly to screen reader users
- That keyboard users will be able to expand the controls since a click event listener on a native HTML button element gives us keyboard accessibility for free.

### CSS

By now you may be asking yourself how we’re going to actually show or hide the panel of content the button is supposed to control. Thanks to the greatness of the [:has sudo-class](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:has), we can lean on the CSS for this. Simply put, if the button has `aria-expanded="false"` applied, we hide the panel below using `display: none;`.

```
.acc-heading:has(> [aria-expanded="false"]) + .acc-panel {
  display: none;
}
```

The great thing about doing it this way is that it ensures the semantics on the button are accurate since the panel will only be displayed if the button has `aria-expanded="true"` on it.

## Putting it together

It’s certainly possible to add a lot more bells and whistles to this as I have done on my website, and I’d encourage you to tinker away to your heart’s content to meet your needs, but the few bits of code above provide a great starting point. I've also created [a CodePen](https://codepen.io/editor/jyarbrough/pen/01a12789-aa60-78ac-866b-ca229bf909eb) to demonstrate the pattern in action.