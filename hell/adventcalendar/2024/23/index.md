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
active: true
intro: "<p> intro goes here?</p>"
image: "advent_23"
---
<!-- MM: Great post, thank you! -->
Not too long ago, building an accordion component would require you to use a combination of JavaScript and CSS. If you've been around for as long as I have, you might have used a library like [jQuery](https://jqueryui.com/accordion/) or _Mootools_.
If you went *"vanilla"*, your code would look something like this:


```html
<div class="ex_1">
  <span>Click here to learn about accordions</span>
  <p class="hidden">This one needs JavaScript and CSS to work.</span>
</div>
```

  ```css
.hidden {
    display: none; 
}
```

```js 
document.querySelector(".ex_1 span").addEventListener("click", (e)=>{
  document.querySelector(".ex_1 p").classList.toggle("hidden");
});
```

And it would work as you expected:
<style>
.ex_1 {
  font-family: sans-serif;
  font-size: 16px;
  border: 1px solid #ccc;
  background: #efefef;
  padding: 8px;
  border-radius: 10px;
  margin-bottom: 32px;
}
</style>
<style>
.ex_1 span {
  cursor: pointer;
}
</style>
<style>
.ex_1 p {
  margin: 8px 0 0;
}
</style>
<style>
.ex_1 .hidden {
  display: none;
}
</style>
<div class="ex_1">
  <span>→ Click here to learn more about accordions</span>
  <p class="hidden">This one needs JavaScript and CSS to work. Click the heading again to close it.</p>
</div>
<script>
document.querySelector(".ex_1 span").addEventListener("click", ()=>{
  document.querySelector(".ex_1 p").classList.toggle("hidden");
});
</script>

The more adventurous would hack together some `input` and `label` elements together. With the help of `:checked` and some clever
CSS selectors, you could achieve the same visual representation as the one above but without the need for JavaScript.

```html
<div class="ex_2">
  <input type="checkbox" id="accordion1">
  <label for="accordion1">→ Click here to learn even more about accordions</label>
  <p>This one works without JavaScript, only CSS and HTML!</p>
</div>
```

```css
.ex_2 input[type="checkbox"],
.ex_2 p {
  display: none;
}

.ex_2 input[type="checkbox"]:checked + label + p {
  display: block;
}
```

And it would be visually the same as the previous example:

<style>
.ex_2 input[type="checkbox"],
.ex_2 p {
  display: none;
}
</style>
<style>
.ex_2 input[type="checkbox"]:checked + label + p {
  display: block;
}
</style>
<style>
.ex_2 label {
  cursor: pointer;
  font-weight: normal;
}
</style>
<div class="ex_2 ex_1">
  <input type="checkbox" id="accordion1">
  <label for="accordion1">→ Click here to learn even more about accordions</label>
  <p>This one works without JavaScript, only CSS and HTML!</p>
</div>

The disadvantages of both these methods are quite obvious. Not only they're hard to maintain, they're also not very accessible and their reliance on JavaScript makes them not the ideal candidate for a modern web application.
In summary, another case of [HTMLHell](https://www.htmhell.dev).
<!-- MM: "The disadvantages of both these methods are quite obvious" <- Not for everyone. Since this is HTMHell, it would be great if you would list the disadvantages of both techniques -->


## Here comes a new challenger

Since 2020, all major browsers [support](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details#browser_compatibility) the `<details>` and its companion `<summary>` elements. Combined, they replace the need for JavaScript and CSS hacks to create an accordion component.
We can simply use:

```html
<details>
  <summary>Your heading goes here</summary>
  <p>Any content you like goes below the summary tag.</p>
  <p>As many elements as you need.</p>
</details>
```
And it will work just like the previous examples, but with some added benefits:
* Simpler code ✅
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
<!-- MM: It would be great if you could address some of the downsides in terms of accessibility. See: https://yatil.net/blog/exclusive-accordions -->
<!-- MM: Did you have a chance to test this with screen readers? I'd love to know what they annouce. -->

The usage is pretty straightforward:

```html
<details name="group">...</details>
<details name="group">...</details>
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

## Take it to the next level
Recently, Chrome 131 [added support](https://developer.chrome.com/blog/styling-details) to new ways you can style both `<details>` and `<summary>` elements. Still early days but the future looks bright!
Combine these features with some creative styling and you can create really complex components with accessibility and scalability built-in.

Further reading and examples:
[Code snippets](https://codepen.io/jpedroribeiro/pen/YzmxNYx) | [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details) | [Can I use](https://caniuse.com/details) | [web.dev](https://web.dev/learn/html/details)
