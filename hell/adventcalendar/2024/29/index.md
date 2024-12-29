---
title: "datalists are more powerful than you think"
layout: layouts/advent.md
date: 2024-12-29
tags: advent2024

author: "Alexis Degryse"
author_bio: "I'm a french UI Developer / Accessibility referent, and work at Astek, based in Lille, France. . I’m in charge of technical support of all topics related to web quality assurance (eco-conception, accessibility, privacy, SEO, responsive, ergonomics, etc.).

I’m really into **HTML & CSS**. Those languages, which are - as I like to say - easy to learn but hard to master, are my daily tools and constitute the main thread of my self-learning.

I do my best to keep my skills updated in order to always provide the most suitable solutions for any project and give best advices about the **implications** and **feasibility** of UI ideas.

Oh ! And I love CSS drawing."
intro: "<p>Alex talks about the datalist element and its possibilities extended by the combination with non-textual form field types.</p>"
author_links:
  - label: "Website"
    url: "https://alexis-degryse.com/"
    link_label: "alexis-degryse.com"
  - label: "Twitter"
    url: "https://twitter.com/twogrey"
    link_label: "@twogrey"
  - label: "Mastodon"
    url: "https://h4.io/@twogrey"
    link_label: "@twogrey@h4.io"
  - label: "LinkedIn"
    url: "https://www.linkedin.com/in/alexis-degryse/"
    link_label: "alexis-degryse"
  - label: "CodePen"
    url: "https://codepen.io/twogrey/"
    link_label: "twogrey"
  - label: "GitHub"
    url: "https://github.com/twogrey"
    link_label: "twogrey"
  - label: "Bluesky"
    url: "https://bsky.app/profile/twogrey.bsky.social"
    link_label: "twogrey.bsky.social"
image: "advent24_28"
active: true
---

I think we all know the `<datalist>` element (and if you don’t, it’s ok). It holds a list of `<option>` elements, offering suggested choices for its associated input field. 

It’s not an alternative for the `<select>` element. A field associated to a `<datalist>` can still allow any value that is not listed in the `<option>` elements.

Here is a basic example:

<iframe height="400" style="width: 100%;" scrolling="no" title="Demo textual datalist on Codepen" src="https://codepen.io/twogrey/embed/preview/QwLEwvG?default-tab=result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true"></iframe>

Pretty cool, isn't it? But what happens if we combine `<datalist>` with less common field types, like `color` and `date`:

```html
<label for="favorite-color">What is your favorite color?</label>
<input type="color" list="colors-list" id="favorite-color">
<datalist id="colors-list">
  <option>#FF0000</option>
  <option>#FFA500</option>
  <option>#FFFF00</option>
  <option>#008000</option>
  <option>#0000FF</option>
  <option>#800080</option>
  <option>#FFC0CB</option>
  <option>#FFFFFF</option>
  <option>#000000</option>
</datalist>
```

<iframe height="400" style="width: 100%;" scrolling="no" title="Demo color type field with datalist on Codepen" src="https://codepen.io/twogrey/embed/preview/YPKWPao?default-tab=result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true"></iframe>

Colors listed in `<datalist>` are pre-selectable but the color picker is still usable by users if they need to choose a more specific one.

```html
  <label for="event-choice" class="form-label col-form-label-lg">Choose a historical date</label>
  <input type="date" list="events" id="event-choice">
  <datalist id="events">
    <option label="Fall of the Berlin wall">1989-11-09</option>
    <option label="Maastricht Treaty">1992-02-07</option>
    <option label="Brexit Referendum">2016-06-23</option>
  </datalist>
```

<iframe height="400" style="width: 100%;" scrolling="no" title="Demo date type field with datalist on Codepen" src="https://codepen.io/twogrey/embed/preview/XJrKJyB?default-tab=result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true"></iframe>

Same here: some dates are pre-selectable and the datepicker is still available. 

Depending on the context, having pre-defined values can possibly speed up the form filling by users.

Please, note that `<datalist>` should be seen as a **progressive enhancement** because of some points:
* For Firefox (tested on 133), the `<datalist>` element is compatible only with textual field types (think about text, url, tel, email, number). There is no support for color, date and time.
* For Safari (tested on 15.6), it has support for color, but not for date and time.
* With some screen reader/browser combinations there are issues. For example, [suggestions are not announced in Safari](https://a11ysupport.io/tests/tech__html__datalist/html__datalist_element/convey_role/vo_macos/safari) and it's not possible to navigate to the datalist with the `down arrow` key (until you type something matched with suggestions). Refer to [a11ysupport.io](https://a11ysupport.io/tech/html/datalist_element) for more.


## Find out more

* [datalist experiment](https://demo.agektmr.com/datalist/) by [Eiji Kitamura](https://bsky.app/profile/agektmr.com)
* [Documentation on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/datalist)