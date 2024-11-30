---
title: "O label where art thou"
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
intro: "<p>A real life example missing the label element and multiple ways to fix it easily.</p>"
image: "advent24_24"
tags: advent2024
---

This example is a classic (in a bad way), can cause quite some confusion for users of assistive technology (AT) but is also very easy to fix. It's the `<input>` element missing its dear friend, the `<label>`... 😭

## Bad code

```html
<input
  placeholder="Search"
  data-auto-id="searchinput-desktop"
  class="_input_1f3oz_13"
/>
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

ANYWAY, what's the issue with this `<input>` element? Let's say you're dependent on a screen reader and you have to fill out a form with dozens of inputs like that.

All placeholders got replaced with whatever you've typed. You hit the submit button and got an error message: A certain input needs correction. Quickly scanning the `<form>` and its `<input>` elements got tricky because their descriptions are gone now!

This will also fail two [Web Content Accessibility Guidelines](https://www.w3.org/WAI/standards-guidelines/wcag/) success criteria:

### 1. WCAG 2.0 SC [3.3.2 - Labels or Instructions (Level A)](https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions.html)

This criterion requires that labels or instructions are provided when content requires user input. If an input field lacks a visible label, it fails this criterion because users may not understand what information is required.

### 2. WCAG 2.0 SC [2.4.6 - Headings and Labels (Level AA)](https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels.html)

This criterion states that headings and labels must describe the topic or purpose. Without a label, users cannot identify the purpose of the input field, leading to confusion.

Using inputs in combination with the `<label>` element will provide a persistent (visual) cue for any user, no matter what you've typed.

## 1. Good code with explicit label

```html
<label for="search-input">Search:</label>
<input id="search-input" name="search" type="search" />
```

This common approach provides a visual cue for the `<input>` element and can be processed by AT. The `<input>` is now of `type="search"`, which should expose it as "searchbox" in the [accessibility tree](https://developer.mozilla.org/en-US/docs/Glossary/Accessibility_tree).

Additionally, you can target this input now with CSS! This way you can check yourself that you implemented semantic and accessible HTML:

```css
input[type="search"] {
  /* Your code */
}
```

I've removed the `placeholder` attribute, because we have a persistent input description now. I also got rid of `class` and `data-auto-id`, as they're not relevant for this article.

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
  <input type="search" name="search" />
  Search
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

I personally like to use an explicit label, as it's a common pattern AND it's something you could target with CSS. Don't use an `<input>` element without a `<label>` or `aria-label`, as it will not only fail two WCAG success criteria, but it can also make it much harder for AT users to find and use it.

And wrapping this input inside a `<form role="search">` or the `<search>` landmark will provide an extra hint for them, which could make it even easier to get there. So don't forget to always pair `<input>` with a `<label>`, they belong together and are the ultimate couple! ❤️

## Further reading

- [`<input type="search">`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/search)
- [`<input>`: The HTML Input element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input)
- [`<search>`: The generic search element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/search)
- [Accessibility Support: Will your code work with assistive technologies?](https://a11ysupport.io/)
