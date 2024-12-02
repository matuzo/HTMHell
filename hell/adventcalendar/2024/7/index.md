---
title: "HTMHAIL"
layout: layouts/advent.md
author: "Léonie Watson"
author_bio: "Accessibility engineer, Director of TetraLogical, Chair of W3C Board of Directors, W3C WebApps co-Chair, writer and speaker, screen reader user, tequila drinker and crime fiction junkie."
date: 2024-12-07
author_links:
  - label: "Mastodon"
    url: "#"
    link_label: "your-awesome-website.com/blog"
  - label: "Mastodon"
    url: "https://front-end.social/@tink"
    link_label: "@tink"
intro: "<p>Ever wondered what would have happened if Arthur Dent had asked the Nutrimatic Drinks Dispenser for some HTML, instead of a cup of tea?</p>"
image: "advent24_7"
tags: advent2024
---

# Almost, but not quite, entirely unlike...

<blockquote class="blockquote-no-quotes highlight">Can you give me the HTML for an accessible button please?</blockquote>

It was a simple enough question. Or it would have been, had I been asking another person. As it was, I was asking ChatGPT, and so of course there was nothing simple about it.

For the briefest of moments, I caught myself thinking even ChatGPT couldn't get this wrong. The `<button>` element is probably the most talked about HTML element in accessibility. Literally all you have to do is use it, give it an accessible name, attach some JavaScript to get it to do something if it isn't part of a form, and you don't even need to think about keyboard accessibility because the browser takes care of all that for you.

Then reality kicked me in the shins and told me to snap out of it, and, as if to prove reality's point, ChatGPT burbled:

<blockquote class="blockquote-no-quotes highlight">Absolutely! Here’s an accessible button in its simplest form, following best practices to ensure compatibility with screen readers and keyboard navigation.</blockquote>

OK, I thought to myself, that doesn't sound too terrible. I sat up a little straighter and read on as ChatGPT presented me with: 

```html
  <button type="button" class="accessible-button" aria-label="Submit form">
    Submit
  </button>
```

I stared at my screen for a while and wondered where it had all gone wrong.

At first glance it looks like a perfectly reasonable bit of HTML. Well, except it isn't just HTML, but we'll come back to that in a minute.

It's clearly supposed to be a button for submitting a form. It says so right there, twice in fact. So why then does it have `type="button"` and not `type="submit"`?

When the `type` attribute has a value of "submit" it causes the browser to submit form data. When the `type` attribute has a value of "button", it tells the browser to do nothing when the button is pressed - but a bit of JavaScript to listen for the button's events is all that's needed for the button to do something useful when pressed.

I checked my question. No, definitely no mention of a submit button. Not even any mention of what I wanted the button for. "Fine" I thought. I'll ask it what it thinks it's up to:

<blockquote class="blockquote-no-quotes highlight">Why do I need the type attribute?</blockquote>

Without missing a beat, ChatGPT told me:

<blockquote class="blockquote-no-quotes highlight">The <code>type</code> attribute in the <code>&lt;button&gt;</code> element is important because it determines how the button behaves, especially in the context of forms. Without specifying the type, the browser applies a default behavior that might not align with your intentions.</blockquote>

It went on:

<blockquote class="blockquote-no-quotes highlight"><ol><li><code>type="submit"</code> (default behavior):

* If you don’t explicitly set a type, the button defaults to submit. This means that if the button is inside a form, clicking it will submit the form.

* Use case: When you want the button to submit the form data to the server or trigger a form submission.

</li>

<li><code>type="button"</code>:

  * This type ensures that the button does not submit the form when clicked. Instead, it is just a clickable button that you can use for custom actions (e.g., toggling content, triggering JavaScript functions).
  * Use case: When you want the button to perform an action other than submitting a form.
  
  </li>
</ol>
[…]
</blockquote>

I set down my teacup and put my face in my hands. *“Right”* I said, finally looking up and channelling my inner [Basil Fawlty](https://youtu.be/gy7xPCImMXk?t=46):

<blockquote class="blockquote-no-quotes highlight">So, why did you give me an example of a submit button with a type attribute set to "button"?</blockquote>

There was an almost infinitesimal pause before ChatGPT chirped:

<blockquote class="blockquote-no-quotes highlight">You're absolutely right to point out the inconsistency! In the example I gave, the button was labelled "Submit" and intended to suggest a submission action, but I set the type="button", which prevents it from submitting the form. This could definitely be confusing since "Submit" usually implies that the button should submit a form.</blockquote>

I closed my eyes and contemplated my life choices.

When I opened them again, nothing much seemed to have changed, so I took a deep breath and in the kind of slow and careful voice that hasn't been heard since [Joyce Grenfell in the Nursery School sketch](https://www.youtube.com/watch?v=ZXhHFgDRNBQ), I asked:

<blockquote class="blockquote-no-quotes highlight">OK, never mind the type attribute, why did you use the aria-label attribute when the <code>&lt;button&gt;</code> has a perfectly good accessible name already?</blockquote>

I narrowed my eyes as ChatGPT brightly informed me:

<blockquote class="blockquote-no-quotes highlight">You're absolutely right again! The `aria-label` attribute is not needed when the button already has a clear, visible text label. The visible text content of a <code>&lt;button&gt;</code> element is automatically accessible to screen readers and other assistive technologies, so there's no need for `aria-label` unless you want to provide an alternative or additional description that's not visible.</blockquote>

Suddenly I knew exactly how Arthur Dent felt, dealing with the [Nutrimatic Drinks Dispenser](https://www.youtube.com/watch?v=eAswvg60FnY) in The Hitchhiker's Guide to the Galaxy. Just like the cup of tea it dispensed to Arthur, the code provided by ChatGPT was, to paraphrase, almost, but not quite, entirely unlike the HTML for an accessible button.

If ChatGPt hadn't been trained by indiscriminately hoovering up everything on the web, and if humans hadn't spent the last 30 years creating so many inaccessible buttons for it to hoover up in the first place, then the answer it gave me should have gone a little something like this:

<blockquote class="blockquote-no-quotes highlight">To create an accessible button in HTML (outside of a form), you can use the <code>&lt;button&gt;</code> element like this:</blockquote>

```html
<button>Accessible name</button>
```

<blockquote class="blockquote-no-quotes highlight">This element works well with a keyboard: you can focus it using the Tab key and activate it with either the Spacebar or Enter key. When triggered this way, the browser will run any JavaScript tied to the button’s click event. Just make sure to style the button so that its appearance changes when it gets focus, providing clear feedback to users.
<br>
For users relying on screen readers or other assistive technologies, the button element is automatically recognized as a button. Just remember to replace "Accessible name" with a descriptive label that fits your button’s function—such as "Search" or "Play."</blockquote>

