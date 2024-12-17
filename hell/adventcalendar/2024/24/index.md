---
title: "The search input: They almost got it right"
layout: layouts/advent.md
author: "Steve Frenzel"
author_bio: "Web developer, accessibility advocate & hot sauce lover! 🔥"
date: 2024-12-24
author_links:
  - label: "GitHub"
    url: "https://github.com/stevefrenzel"
    link_label: "stevefrenzel"
  - label: "LinkedIn"
    url: "https://www.linkedin.com/in/stevefrenzel/"
    link_label: "stevefrenzel"
  - label: "Mastodon"
    url: "https://mastodon.online/@stvfrnzl"
    link_label: "@stvfrnzl"
  - label: "Website"
    url: "https://stevefrenzel.dev/"
    link_label: "stevefrenzel.dev"
active: true
intro: "<p>A real life example missing the label element and multiple ways to fix it easily.</p>"
image: "advent24_24"
---

This example is a classic - in a bad way - and can cause quite some confusion for users of assistive technology (AT). But it's also very easy to fix! It's the `<input>` element missing its dear friend, the `<label>`... 😭

## Bad code

```html
<input placeholder="Search" />
```

It's not relevant for this article, but here's the "button" to submit the content of the `<input>`:

```html
<div class="_icon_1f3oz_44">
  <span title="" class="gl-icon__wrapper" role="img">
    <svg class="gl-icon">
      <use xlink:href="#search"></use>
    </svg>
  </span>
</div>
```

The cherry on top: It's not even wrapped inside a `<form>` element, so it's very likely that the submit is handled via JavaScript. 🍒

So what's the issue with this `<input>` element? In theory, having a `placeholder` instead of a `<label>` element is only a temporary solution! Once you've typed something, the placeholder gets replaced with whatever you've typed.

This could be a big issue for screen reader users. Let's check how different screen readers handle this kind of situation with different browsers.

You can do it yourself here: [The search input: They almost got it right (bad code example)](https://codepen.io/stvfrnzl/pen/jENPqxb)

What I checked was if the placeholder value still gets announced after typing something. I tested with macOS Sequoia 15.1.1 on December 1, 2024 using the latest versions of screen readers and browsers.

|           | Google Chrome | Mozilla Firefox | Microsoft Edge | Apple Safari |
| --------- | ------------- | --------------- | -------------- | ------------ |
| JAWS      | Yes           | Yes             | Yes            | n/a          |
| NVDA      | Yes           | Yes             | Yes            | n/a          |
| Narrator  | Yes           | Yes             | Yes            | n/a          |
| VoiceOver | No            | Yes             | No             | No           |

Only VoiceOver had issues announcing announcing the `placeholder` attribute (except when using Firefox), which might be a bug! This issue has been mentioned back in 2017 for iOS at [WebKit Bugzilla](https://bugs.webkit.org/show_bug.cgi?id=170334) and I wonder how long it's been present again on MacOS since then...

<!-- MM: Not so curious to me because that's the expected behavior. The fact that VO doesn't announce it looks like a bug to me. Have you checked the webkit bug tracker? -->

## Advantages of using `<label>` instead of `placeholder`

Even though almost all screen readers in this list seem to handle a missing `<label>` and a present `label` attribute well, there are still many reasons why you should do it the other way around:

### Reduce cognitive load

Having a form with many inputs, no labels and only placeholders will make it very hard to remember the required information. This lacking clarity can place a huge burden on people having trouble to recall many things at once.

It will also make it harder to check against the requirements of the inputs, as the placeholder acting as a hint has been replaced with what you've typed. Therefore errors will be harder to fix, as you can't easily check against the requirement anymore.

Using a descriptive `<label>` can avoid these issues, as it's persistent.

### Avoid flaky browser and screen reader support

Some older browsers might hide the placeholder text once the input is focused. And as you read earlier, some screen readers might have issues with a `placeholder` instead of a `<label>`.

Using a descriptive `<label>` can avoid these issues, as it has [great browser support](https://caniuse.com/mdn-html_elements_label) and will be [recognized by screen readers](https://a11ysupport.io/tech/html/label_element) as well.

### Increase touch target size

A `placeholder` is inside the text input. When using a mouse, this will be the only area you can click to focus this input. People with tremors might have a hard time doing that, depending on the size of the inputs and how close they're to each other.

Using a descriptive `<label>` can avoid these issues, as clicking it will focus the input.

For more reasons why, check out Adam Silver's article listed under [Further reading](#further-reading).

Enough of the theory, let's check out some working examples! You can find them here: [The search input: They almost got it right (good code examples)](https://codepen.io/stvfrnzl/pen/VYZLjLR)

## 1. Good code with explicit label

```html
<label for="search-input">Search:</label>
<input id="search-input" name="search" type="search" />
```

This common approach provides a visual cue for the `<input>` element and can be processed by AT.

The `<input>` is now of `type="search"`, which should expose it as "searchbox" in the [accessibility tree](https://developer.mozilla.org/en-US/docs/Glossary/Accessibility_tree).

Clicking the label will also focus the input. This is a nice helper for sighted users and people with motor disabilities, as the target area for clicking has been increased.

Additionally, you can target this input now with CSS! This way you can check yourself that you implemented semantic and accessible HTML:

```css
input[type="search"] {
  /* Your code */
}
```

`for="search-input"` of `<label>` is referencing `id="search-input"` of `<input>`, so they're now "connected", if you will. AT should always announce the label of this input, no matter what you've typed.

The `name` attribute is useful when submitting the form, so you know which `<input>` contains what information.

If, for whatever reason, you don't want to show the visual label, you could also do it this way:

## 2. Good code using `aria-label`

```html
<input aria-label="Search" id="search-input" name="search" type="search" />
<button type="submit">Search</button>
```

There's no direct connection between `<input>` and `<button>`, but it is still of `type="search"` and has the accessible name "Search", which should give enough clues for AT users.

However, the only visual clue here is the button. So make sure it's close to the input, in order for people to make the mental connection. Not a fan of it though, as I would rather connect the two elements with each other:

## 3. Good code using `aria-labelledby`

```html
<input aria-labelledby="search-input" name="search" type="search" />
<button id="search-input" type="submit">Search</button>
```

Still no visual cue, but whenever we change the `<button>` name, the accessible name of the `<input>` will change accordingly. The power of the `aria-labelledby` attribute! 💪 There's one more approach:

## 4. OK code with implicit label

```html
<label>
  Search:
  <input type="search" name="search" />
</label>
```

As the `<input>` is wrapped inside the `<label>` element, they are both connected now. However, AT support for this solution might not be as good as an explicit label (see [Associating labels implicitly](https://www.w3.org/WAI/tutorials/forms/labels/#associating-labels-implicitly)).

## Going the extra mile using landmarks

To make it even easier for AT users to access the search functionality on your website, you could add `role="search"` to your `<form>` element, or wrap it inside the `<search>` [landmark](https://developer.mozilla.org/en-US/blog/aria-accessibility-html-landmark-roles/):

```html
<form role="search">
  <label for="search-input">Search:</label>
  <input id="search-input" name="search" type="search" />
</form>
```

This should announce the container as "search" in the accessibility tree, same goes for this approach:

```html
<search>
  <label for="search-input">Search:</label>
  <input id="search-input" name="search" type="search" />
</search>
```

When people are traversing the [DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model) using landmarks, this could help them find the search input on your website much quicker. And even if it's not announced as "search", you'd still have a very descriptive `<label>` element and a user input of `type="search"`.

## Conclusion

All in all, this wasn't a very complex or time consuming fix and it will help people a lot to locate and use the search input on your website. Different approaches are possible, like using an implicit or explicit label, or even no visual label at all!

I personally like to use an explicit label, as it's a common pattern AND it's something you could target with CSS. Don't use an `<input>` element without a `<label>` or `aria-label`, as it comes with plenty of benefits for you and your users.

And wrapping an input inside a `<form role="search">` or the `<search>` landmark will provide an extra hint for them, which could make it even easier to get there. So don't forget to always pair `<input>` with a `<label>`, they belong together and are the ultimate couple! ❤️

## Further reading

- [`<input type="search">`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/search)
- [`<input>`: The HTML Input element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input)
- [`<search>`: The generic search element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/search)
- [Accessibility Support: Will your code work with assistive technologies?](https://a11ysupport.io/)
- [The problem with placeholders and what to do instead](https://adamsilver.io/blog/the-problem-with-placeholders-and-what-to-do-instead/)
