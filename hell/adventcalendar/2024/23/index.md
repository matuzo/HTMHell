---
title: "The devil is in the &lt;details&gt;"
layout: layouts/advent.md
author: "J. Pedro Ribeiro"
author_bio: "J. Pedro Ribeiro is Brazilian frontend developer who loves to build performant sites and apps that deliver great user experience."
date: 2024-12-23
author_links:
  - label: "Blog"
    url: "https://jpedroribeiro.com/"
    link_label: "jpedroribeiro.com"
  - label: "On X (Twitter)"
    url: "https://twitter.com/jpedroribeiro"
    link_label: "@jpedroribeiro"
  - label: "On LinkedIn"
    url: "https://www.linkedin.com/in/joaopedroribeiro/"
    link_label: "LinkedIn"
intro: "<p> intro goes here?</p>"
image: "advent24_23"
tags: advent2024
active: true
---
     
Not too long ago, building an accordion component would require you to use a combination of JavaScript and CSS. If you've been around for as long as I have, you might have used a library like [jQuery](https://jqueryui.com/accordion/) or _Mootools_.
If you went *"vanilla"*, your code would look something like this:


```html
<div class="my-js-accordion">
  <span>Learn more about accordions</span>
  <p class="hidden">Accordions encapsulate content under a heading.</span>
</div>
```

  ```css
.hidden {
    display: none; 
}
```

```js 
document.querySelectorAll(".my-js-accordion").forEach((accordion)=>{
  accordion.querySelector("span").addEventListener("click", (e)=>{
    accordion.querySelector("p").classList.toggle("hidden");
  });
});
```

And it would work as you expected:
<style>
.my-js-accordion {
  font-family: sans-serif;
  font-size: 16px;
  border: 1px solid #ccc;
  background: #efefef;
  padding: 8px;
  border-radius: 10px;
  margin-bottom: 16px;
}
</style>
<style>
.my-js-accordion span {
  cursor: pointer;
}
</style>
<style>
.my-js-accordion p {
  margin: 8px 0 0;
}
</style>
<style>
.my-js-accordion .hidden {
  display: none;
}
</style>
<div class="my-js-accordion ex1-js">
  <span>→ Learn more about accordions</span>
  <p class="hidden">Accordions encapsulate content under a heading.</p>
</div>
<div class="my-js-accordion ex1-js">
  <span>→ This one was built with JS and CSS</span>
  <p class="hidden">We needed JavaScript and CSS to make this work. Click the heading again to close it.</p>
</div>
<div class="my-js-accordion ex1-js">
  <span>→ Each accordion on this example works independently</span>
  <p class="hidden">For any other advanced feature, more JavaScript will be needed.</p>
</div>
<script>
document.querySelectorAll(".ex1-js").forEach((accordion)=>{
  accordion.querySelector("span").addEventListener("click", (e)=>{
    accordion.querySelector("p").classList.toggle("hidden");
  });
});
</script>

The more adventurous would hack together some `input` and `label` elements together. With the help of `:checked` and some clever
CSS selectors, you could achieve the same visual representation as the one above but without the need for JavaScript.

```html
<div class="my-css-accordion">
  <input type="checkbox" id="accordion1">
  <label for="accordion1">→ Learn more about accordions</label>
  <p>Accordions encapsulate content under a heading.</p>
</div>
```

```css
.my-css-accordion input[type="checkbox"],
.my-css-accordion p {
  display: none;
}

.my-css-accordion input[type="checkbox"]:checked + label + p {
  display: block;
}
```

And it would be visually the same as the previous example:

<style>
.my-css-accordion input[type="checkbox"],
.my-css-accordion p {
  display: none;
}
</style>
<style>
.my-css-accordion input[type="checkbox"]:checked + label + p {
  display: block;
}
</style>
<style>
.my-css-accordion label {
  cursor: pointer;
  font-weight: normal;
}
</style>
<div class="my-css-accordion my-js-accordion">
  <input type="checkbox" id="accordion1">
  <label for="accordion1">→ Learn more about accordions</label>
  <p>Accordions encapsulate content under a heading.</p>
</div>
<div class="my-css-accordion my-js-accordion">
  <input type="checkbox" id="accordion2">
  <label for="accordion2">→ This one was built without JavaScript</label>
  <p>Only CSS and HTML!</p>
</div>
<div class="my-css-accordion my-js-accordion">
  <input type="checkbox" id="accordion3">
  <label for="accordion3">→ Same looks, same behaviour</label>
  <p>However, the code is slightly harder to maintain</p>
</div>

These techniques work but there have some disadvantages: not only they're hard to maintain, they're also not accessible, and their reliance on JavaScript makes them not the ideal candidate for a modern web application.
In summary, another case of [HTMLHell](https://www.htmhell.dev).


## Here comes a new challenger

Since 2020, all major browsers [support](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details#browser_compatibility) the `<details>` and its companion `<summary>` elements. Combined, they replace the need for JavaScript and CSS hacks to create an accordion component.
We use the following syntax:

```html
<details>
  <summary>Your heading goes here</summary>
  <p>Any content you like goes below the summary tag.</p>
  <p>As many elements as you need.</p>
</details>
```
And it will work just like the previous examples, but with some added benefits:
* Less code ✅
* Fully accessible ✅
* Works without JavaScript ✅
* No need for hacks ✅
* Fully stylable ✅

As seen below:

<style>
.styled {
  border: 1px solid #ccc;
  background: #efefef;
  padding: 8px;
  border-radius: 10px;
  margin-bottom: 20px;
}</style>

<style>
.styled summary {
font-family: sans-serif;
font-size: 16px;
  cursor: pointer;
  font-weight: normal;
}
</style>

<style>
.styled p {
font-family: sans-serif;
font-size: 14px;
  margin: 8px 0;
}
</style>

<details class="styled">
  <summary>Your heading goes here</summary>
  <p>Any content you like goes below the summary tag.</p>
  <p>As many elements as you need.</p>
</details>

<details class="styled">
  <summary>This is the second heading</summary>
  <p>Any content you like goes below the summary tag.</p>
  <p>As many elements as you need.</p>
</details>

<details class="styled">
  <summary>And the third entry it's here</summary>
  <p>Any content you like goes below the summary tag.</p>
  <p>As many elements as you need.</p>
</details>

On the example above, each `<details>` element works independently of each other. But what if you want them to behave like true accordions, where only one can be opened at a time?

## One More Thing... Exclusive Accordions

Not too long ago, the `name` attribute was added to the `details` element. 
Similarly to the usage in the [radio input](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio), it allows you to group multiple elements together. This means we can have _exclusive_ accordions: when only one can be opened at a time.

Here is an example of the usage:

```html
<details name="my-accordion-group">...</details>
<details name="my-accordion-group">...</details>
<details name="my-accordion-group">...</details>
```
Give the same `name` attribute to all the `details` elements you want to group together and they'll work as expected:
<style>
.styled {
  border: 1px solid #ccc;
  background: #efefef;
  padding: 8px;
  border-radius: 10px;
  margin-bottom: 20px;
}</style>

<style>
.styled summary {
font-family: sans-serif;
font-size: 16px;
  cursor: pointer;
  font-weight: normal;
}
</style>

<style>
.styled p {
font-family: sans-serif;
font-size: 14px;
  margin: 8px 0;
}
</style>

<details name="group" class="styled">
  <summary>3 separate entries</summary>
  <p>First block content.</p>
  <p>End of first block.</p>
</details>
<details name="group" class="styled">
  <summary>Only one can be opened at a time</summary>
  <p>Second block content.</p>
  <p>End of second block.</p>
</details>
<details name="group" class="styled">
  <summary>Still, no JS needed!</summary>
  <p>Third block content.</p>
  <p>End of third block.</p>
</details>

**Note**: It's worth highlighting that exclusive accordion come with some _drawbacks_, including poor UX on keyboard navigation and reduced usability for screen readers. Eric Eggert wrote about [these issues](https://yatil.net/blog/exclusive-accordions), offering some solutions and insights that are worth reading.

## Take it to the next level
Recently, Chrome 131 [added support](https://developer.chrome.com/blog/styling-details) to new ways you can style both `<details>` and `<summary>` elements. Still early days but the future looks bright!
Combine these features with some creative styling and you can create really complex components with accessibility and scalability built-in.

Further reading and examples:
[Code snippets](https://codepen.io/jpedroribeiro/pen/YzmxNYx) | [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details) | [Can I use](https://caniuse.com/details) | [web.dev](https://web.dev/learn/html/details)