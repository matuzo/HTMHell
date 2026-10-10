---
title: "Minimal javascript accordions"
author: "Justin Yarbrough"
author_bio: "Justin is a blind digital accessibility specialist with nearly a decade of experience in higher education, consulting, and finance. He currently works for a large U.S. bank as a lead accessibility coach, embedding within agile crews and helping them embed accessibility into the SDLC."
date: 2026-12-09
author_links:
  - label: "Site"
    url: "https://yarbrough.info"
    link_label: "Website"
intro: "<p>How to build an accessible accordion with minimal JavaScript</p>"
image: "advent26_1"
active: true
---

As a blind screen reader user and accessibility specialist, nothing gets under my skin quite like anytime I see someone on social media sharing some component they’ve come up with that doesn’t use JavaScript since those almost always have serious accessibility issues. For the most part, just a tiny bit of JS will create a similar effect and ensure the component’s accessible to users with disabilities. To illustrate my point, I present to you an accordion using a minimum amount of JavaScript and leaning on CSS for some core functionality.
## Why not just use summary/details?
You can create more or less the same functionality as I’ll describe below by simply using the summary and details elements with zero JS, but that’s not really a viable option if you want the button triggering the accordion to have heading semantics. While the [MDN article for the summary element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/summary) states that you can use heading elements within the summary element, doing so isn’t supported by many browser and screen reader combinations since the underlying semantics are stripped out of all children of anything with a button role.
## Building the accordion
Let’s take a look at what’s needed for this minimal javascript accordion, the code for it really is pretty simple
### HTML
For this pattern, we need exactly three HTML elements to make this work:
- A heading element, h1-h6, with a class of “acc-heading” applied
- A button element as the first child of the heading element with an aria-expanded attribute. The inner text of the button serves as the visual label.
- A cdiv to serve as the container for the content that is shown or hidden when the button above is activated. For this example, we’ll add the class “acc-panel” to it.
While the [ARIA Authoring Practices Guide accordion example](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/) has a good bit more attributes and such, they’re not really needed and don’t really impact functionality.
### JS
From a JS perspective, all you really need to do is loop through all of the buttons with an aria-expanded attribute and add an event listener to them that will toggle the value of the attribute between true and false when clicked. This approach ensures two things:
- That the button will announce as expanded or collapsed correctly to screen reader users
- That keyboard users will be able to expand the controls since a click event listener on a native HTML button element gives us keyboard accessibility for free.
### CSS
By now you may be asking yourself how we’re going to actually show or hide the panel of content the button is supposed to control. Thanks to the greatness of the [:has sudo-class](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:has), we can lean on the CSS for this. All we have to do is target the “acc-heading” class, use :has to see if aria-expanded is set tr false, and set the following “acc-panel” class to be display: none; if this is the case. This ensures that the semantics conveyed by screen readers are accurate.
## Putting it together
It’s certainly possible to add a lot more bells and whistles to this, and I’d encourage you to tinker away to your heart’s content to meet your needs, but everything in the CodePen below gives you a great foundation to start with.

<p class="codepen" data-height="300" data-pen-title="Minimal JS Accordion" data-version="2" data-default-tab="html,result" data-slug-hash="PwpQPPO" data-user="jyarbrough" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/editor/jyarbrough/pen/01a12789-aa60-78ac-866b-ca229bf909eb">
  Minimal JS Accordion</a> by Justin Yarbrough (<a href="https://codepen.io/jyarbrough">@jyarbrough</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

## Conclusion
One of my basic philosophies for accessible web development is to keep it simple. This accordion pattern does that, leaning on simple HTML, CSS, and JS to make the pattern accessible.
