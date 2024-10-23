---
title: "Submit to the Quirks of HTML"
layout: layouts/advent.md
author: "Felix Hessenberger"
author_bio: "Web & mobile dev at [scale](htt
ps://www.scale.at), founder, dad joke expert"
date: 2024-12-10
author_links:
  - label: "scale Blog"
    url: "https://www.scale.at/blog"
    link_label: "scale.at/blog"
  - label: "Felix on mastodon"
    url: "https://mastodon.social/@felixh10r"
    link_label: "@felixh10r"
active: true
intro: "<p>Even after more than a decade of working with HTML, I sometimes encounter unexpected quirks, like that weird form that won’t submit.</p>"
image: "advent_10"
---

It was on a cold February evening. I had been working on a client project, building an order item list—nothing out of the ordinary. To adjust an item’s quantity, the user would open a popup form with a single input field, type a number, and hit enter.

```html
<form>
  <label>
    Quantity
    <input type="number">
  </label>
</form>
```

 Everything worked as intended when suddenly, a new requirement came in: add another input field to also set a bulk quantity. I did what I was told, but to my horror, the form wouldn’t submit anymore with the new field displayed! 😱
 
 I checked the browser console for any JavaScript errors and double-checked my markup, but to no avail. A quick detour to [Stack Overflow](https://stackoverflow.com/questions/4196681/form-not-submitting-when-pressing-enter) shed light on the situation: according to the [HTML 2.0 spec](https://www.w3.org/MarkUp/html-spec/html-spec_8.html#SEC8.2), it's a feature, not a bug:
 
 <blockquote>When there is only one single-line text input field in a form, the user agent should accept Enter in that field as a request to submit the form.</blockquote>
 
 Some [Web archeology](https://alanflavell.org.uk/www/formquestion.html) later, I found myself pretty deep down the rabbit hole about whether a form will submit on enter:
 
- Single-line `text` input: **YES!**, according to the discussion in the above link, this was seen “as a convenient way to submit simple queries”.
- Other input types: **YES!**, `number`, `email`, `password`, `search`, `tel`, and `url` all are regarded as single-line text inputs; input types not recognized by the browser (e.g. `month` in Firefox at the time of writing), are treated like single-line text inputs.
- One single-line text input together with any other fields that are *not* a single-line text input: **YES!**, you can add any other form elements including input types like `date` or `color`, even a `textarea`) and the form will still submit on enter.
- A second single-line text input in a *different* form: **YES!**, it’s not about how many inputs are on the page; each form is considered individually.
- More than one single-line text input in the same form: **NO!** of course not! 😅 This is, according to the discussion mentioned above, aimed at “reducing the risk, on a complex form, of prematurely submitting it while trying to fill it in.“

The reason I didn’t encounter this behavior before seems to be that I’ve never built a form with *only* one text field; even in a simple chat component, there typically is at least a submit button to send the message. And indeed, adding a submit button magically solves the above problem:
 
```html
<form>
  <label>
    Quantity
    <input type="number">
  </label>
  <label>
    Bulk quantity
    <input type="number">
  </label>
  <input type="submit" hidden>
</form>
```

This obviously enables *power user mode* and makes the form submit on enter, no questions asked. To extend on the list above:

- `<input type="submit">`: **YES!**, the button doesn’t even have to be visible, it just has to be part of the form.
- `<button>`: **YES!**, the `button` element works as well. (`type=“submit”` is the default for buttons in a form.)
- `<button disabled>`: **NO!**, disabling the submit button also disables submitting on enter. 🫠
- `<button type="button">`: **NO!**, it may look the same, but  now there is no way to submit the form.

As a bonus, let’s go the other way and *disable* submit on enter: 😅

```html
<form
    onkeydown="event.key === 'Enter' && event.preventDefault()"
>
    ...
    <button>Submit via button</button>
</form>
```

But enough JavaScript for now, it’s *HTM*Hell after all. I also avoided to touch on how HTML5 form validation plays into all of this since this could/will be a blog post on its own.

This is a nice example that even after more than a decade of working with HTML, I still sometimes encounter unexpected quirks that, after a bit of digging, often turn out to be well-thought-out gems ([for the most part](https://htmhell.dev/adventcalendar/2023/15/)).
