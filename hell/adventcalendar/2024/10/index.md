---
title: "Submit to the Quirks of HTML"
layout: layouts/advent.md
author: "Felix Hessenberger"
author_bio: "Web & mobile dev at [scale](https://www.scale.at), founder, dad joke expert"
date: 2024-12-10
author_links:
  - label: "scale Blog"
    url: "https://www.scale.at/blog"
    link_label: "scale.at/blog"
  - label: "Felix on mastodon"
    url: "https://mastodon.social/@felixh10r"
    link_label: "@felixh10r"
intro: "<p>Even after more than a decade of working with HTML, I sometimes encounter unexpected quirks, like that weird form that won’t submit.</p>"
image: "advent24_10"
tags: advent2024
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
 
- Single-line `text` input: **YES!**, according to the discussion linked above, this was seen “as a convenient way to submit simple queries”.
- Other input types: **YES!**, `number`, `email`, `password`, `search`, `tel`, and `url` all are regarded as single-line text inputs; input types not recognized by the browser (e.g. `month` in Firefox at the time of writing), are treated like single-line text inputs.
- One single-line text input together with any other fields that are *not* a single-line text input: **YES!**, you can add any other form elements including input types like `date` or `color`, even a `textarea`) and the form will still submit on enter (when the focus is on the text field).
- A second single-line text input in a *different* form: **YES!**, it’s not about how many inputs are on the page; each form is considered individually.
- More than one single-line text input in the same form: **NO!** of course not! 😅 This is, according to the discussion mentioned above, aimed at “reducing the risk, on a complex form, of prematurely submitting it while trying to fill it in.“.

[Try the above examples on CodePen](https://codepen.io/felix-scale/pen/qEWEama)

The reason I didn’t encounter this behavior before seems to be that I’ve never built a form with *only* one text field; even in a simple chat component, there typically is at least a submit button to send the message. And indeed, adding a submit button magically solves the problem:
 
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

To extend on the list above:

- `<input type="submit">`: **YES!**, a submit button enables submit on enter in forms with more than one text input.
- `<input type="submit" hidden>`/`<input type="submit" style="display: none;">`: **YES!**, the button may be hidden (which I did above to preserve the original appearance).
- `<button>`: **YES!**, the `button` element works as well. (`type="submit"` is the default for buttons within a form.)
- `<button disabled>`: **NO!**, disabling the submit input/button also disables submitting on enter.
- `<button type="button">`: **NO!**, it may look the same, but now there is no way to submit the form anymore.

[Try the above examples on CodePen](https://codepen.io/felix-scale/pen/vEBEWZO)

All points listed in this article are the same across browsers; interestingly, the behavior of the submit button isn’t defined anywhere in the HTML spec—it was initially just copied from Internet Explorer and Netscape for consistency (like discussed in this 23 year old (and still open) [Firefox issue](https://bugzilla.mozilla.org/show_bug.cgi?id=104211)). *However*, as outlined in [this article](https://jansensan.net/blog/enter-key-should-submit-form-currently-focus), the behavior can effectively be derived from combining the [WCAG](https://www.w3.org/WAI/standards-guidelines/wcag/)’s recommendation that all forms should include a submit button and the HTML spec’s rule that the enter key should submit the form *implicitly*.

Bonus fact: The default keyboard on Android has a button that looks like an enter key, but it only submits the form when the *last text field* in the form is focused—otherwise, it moves focus to the next text field. It doesn’t move the focus to any other form inputs.

This is a nice example that even after more than a decade of working with HTML, I still sometimes encounter unexpected quirks that, after a bit of digging, often turn out to be well-thought-out gems ([for the most part](https://htmhell.dev/adventcalendar/2023/15/)).
