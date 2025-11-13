---
title: "Discover Dialog"
author: "Sara Joy"
author_bio: "Sara has been extremely online since 1998, making her own personal websites since 1999. She switched her career from electronic engineering to front end web development in 2022. She loves the web platform, and wants it to be accessible to everyone."
date: 2025-12-09
author_links:
  - label: "Homepage"
    url: "https://sarajoy.dev"
    link_label: "sarajoy.dev"
intro: "<p>The dialog element has been available across browsers since March 2022, but can still do with some re-introducing as people look to move out of libraries and back onto the web platform.</p>"
image: "advent25_9"
---

Suffering modal woes? Positioning, backdrops, focus trapping, z-index — Oof.

Just as I was, some of you may have been coding a lot of these functions into a `<div>` by hand with CSS and JavaScript, or using a library to handle them for you.

Either way, things are getting simpler and more declarative all the time - and when we're so busy working, we don't always realise how much has changed! Maybe this will help you shave off some lines of code or remove some dependencies from your codebase.

To those of you new to building on the web, this is for you too, as you lucky things get to skip the old ways :)

## Meet <button id="openMeetDialog">&lt;dialog&gt;</button>

<dialog id="meetDialog" closedby="any">
  <p>
    Hello 👋
    <br>Nice to meet you!
  </p>
  <form method="dialog">
    <button>Close</button>
  </form>
</dialog>

The [dialog element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog) has been available across browsers since March 2022, and allows you to pop a little overlay on your page - a common variant is known as a modal - and it has a whole bunch of abilities built in, with further useful facets still being added.

```html
<dialog id="meetDialog">
  <p>
    Hello 👋
    <br />Nice to meet you!
  </p>
  <form method="dialog">
    <button>Close</button>
  </form>
</dialog>
```

## Modal and non-modal

We're probably more familiar with the modal variety of dialog, intended to (hopefully only briefly) stop you interacting with the page under it. But there are also plenty of non-modal dialogs to be seen around the web, for example <button id="openToastDialog">toast</button> notifications.

<dialog
  id="toastDialog"
  closedby="any"
  style="
    margin: 0;
    border: 0.25em solid saddlebrown;
    background-color: burlywood;
    border-radius: 2em 2em 0.5em 0.5em;
    rotate: 10deg;
    position: fixed;
    left: 3em;
    bottom: 3em;
    z-index: 10;
  "
>
  <p>
    Pop! Do I look
    <br> a little burned?
  </p>
  <form method="dialog">
    <button>Close</button>
  </form>
</dialog>

Dialogs can give us both modal and non-modal variants, depending on how we open them. In the case of more than one dialog being opened (assuming no close action happening on the previous dialogs), the most recently opened dialog will appear on top.

## Opening with JS

To open a dialog, we use one of two JavaScript functions on a dialog element:

```js
.show()
.showModal()
```

Likely based on the click of a button, you will run something like the following (you will likely use a much more specific `querySelector`):

```js
document.querySelector("dialog").show();
// or
document.querySelector("dialog").showModal();
```

<p class="highlight">💡
  There is a declarative method available to <a href="">invoke</a> dialogs, but for now I will stick to what is currently available across the main browsers.
</p>

In the CodePen below, both kinds of dialog opening method are available. You'll notice that you can still interact with the Open Modal button after having opened the dialog, but not vice-versa. The modal can be closed with the Esc key, the normal modal cannot.

<p class="codepen" data-height="300" data-default-tab="js,result" data-slug-hash="ZYQvJQG" data-pen-title="Dialogs!" data-editable="true" data-user="sarajw" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
      <span>See the Pen <a href="https://codepen.io/sarajw/pen/ZYQvJQG">
  Dialogs!</a> by Sara (<a href="https://codepen.io/sarajw">@sarajw</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
      </p>
      <script async src="https://public.codepenassets.com/embed/index.js"></script>

## Closing dialogs

You'll also not see any JS for the closure of the dialogs. Pop into the HTML tab in the demo, and you might spot the [`method="dialog"`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/form#method) in the `<form>` element wrapping the `<button>`. Here I'm only using it to close the dialogs with said button. If you include more inputs here, `method="dialog"` will send a submit event and close the dialog, but not actually submit any data anywhere.

```html
<form method="dialog">
  <button>Close</button>
</form>
```

Dialogs can also be closed without using this form method, instead by activating some JS (maybe also with a button):

```js
document.querySelector("dialog").close();
// or
document.querySelector("dialog").requestClose();
```

This [`requestClose()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/requestClose) is a newly available addition, allowing access to the [cancel event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/cancel_event), otherwise thrown before the [close event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/close_event) when exiting a modal with the `Esc` key. This may be useful to create _"are you sure?"_ type interactions. (Please do so with care if you must! We'll have no deceptive patterns here..)

### Light dimissal

You're probably already trying to close the dialogs by clicking away, which is a common pattern and is often referred to as _light dismiss_.

This isn't available by default, but can be coded in with CSS and JS.

With thanks to [Chris Ferdinandi](https://gomakethings.com/revisiting-how-to-dismiss-native-html-dialog-elements-when-the-backdrop-is-clicked/) and [Konnor Rogers](https://bsky.app/profile/konnorrogers.com/post/3lxczan6dh22b) for the inspiration, I find the following code works well for **modal** dialogs only, through the magic of the [`::backdrop`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/::backdrop):

```css
/* disallow pointer events on the backdrop, so they
   don't register as clicks on the dialog itself */
dialog::backdrop {
  pointer-events: none;
}
```

```js
document.addEventListener("click", (event) => {
  // find any open dialogs
  const openDialogs = document.querySelectorAll("dialog[open]");
  // return if none open
  if (!openDialogs) return;

  // check for clicks on documentElement, passed through the backdrop
  if (event.target === document.documentElement) {
    // close the open dialogs
    openDialogs.forEach((dialog) => dialog.close());
  }
});
```

<p class="codepen" data-height="300" data-default-tab="js,result" data-slug-hash="yyepzaX" data-pen-title="Dialogs with light dismiss (JS)" data-editable="true" data-user="sarajw" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
      <span>See the Pen <a href="https://codepen.io/sarajw/pen/yyepzaX">
  Dialogs with light dismiss (JS)</a> by Sara (<a href="https://codepen.io/sarajw">@sarajw</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
      </p>
      <script async src="https://public.codepenassets.com/embed/index.js"></script>

<p class="highlight">💡
  You may have spotted we selected <code>dialog[open]</code> in the JS above.
  <br>
  <br>Yes, open dialogs do get <code>open</code> added as an attribute, and it is <em>possible</em> to toggle this to open and close a dialog, but it is <a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/open">not recommended</a>. It will always open as a non-modal dialog when done in this way, and may lead to confused or missing <code>close</code> events.
</p>

To achieve light dismiss on non-modal dialogs is trickier unfortunately, as they have no backdrop to play with...

But there is some light at the end of the dismiss tunnel with the <a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/closedBy">`closedby`</a> property, which is very nearly available across the big browsers - so please feel free to poke any friendly Safari developers you might know! Then it could look as simple as the below:

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="myVNLmb" data-pen-title="Dialogs with light dismiss (closedby)" data-editable="true" data-user="sarajw" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
    <span>See the Pen <a href="https://codepen.io/sarajw/pen/myVNLmb">
Dialogs with light dismiss (closedby)</a> by Sara (<a href="https://codepen.io/sarajw">@sarajw</a>)
on <a href="https://codepen.io">CodePen</a>.</span>
    </p>
    <script async src="https://public.codepenassets.com/embed/index.js"></script>

## (Some) styling built in

Apart from limiting the piratey _lorem ipsum_ column width and centering it, no other custom styling has occurred in the CodePen demos.

By default, the normal dialog has no backdrop, while the modal dialog's `::backdrop` has a subtle transparent grey, and the dialog itself is centered vertically as well as horizontally on the page.

I am going to stand on the shoulders of giants here, and suggest some places you can go to look at amazing dialog CSS styling and animation:

- [Have a dialog by Adam Argyle at nerdy.dev](https://nerdy.dev/have-a-dialog)
- [Getting Creative With HTML Dialog by Andy Clarke at css-tricks.com](https://css-tricks.com/getting-creative-with-html-dialog/)
- [Animating the Dialog Element by Matthew Morete at frontendmasters.com](https://frontendmasters.com/blog/animating-dialog/)

## Scrollin', scrollin', scrollin'...

That by default the website under your modal is still scrollable may or may not bother you. It bothers _me_!

There are ways and means to stop that happening, thankfully.

A classic and elegant way made possible with the sort-of-new-but-well-supported [`:has()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:has) pseudo-class and [`scrollbar-gutter`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/scrollbar-gutter) property is the following:

```css
/* Check whether any dialogs are open */
html:has(dialog[open]) {
  /* Poof! No more scrolling! */
  overflow: hidden;
  /* keep the scrollbar width */
  scrollbar-gutter: stable;
}
```

The `scrollbar-gutter` property keeps the text on the page from reflowing with a jerk, when it suddenly becomes one scrollbar-width wider as the rest of the page beyond the viewport is hidden.

<p class="highlight">💡
  If you have both non-modal and modal dialogs on your page, you may want to make sure this selector only triggers on open _modal_ dialogs.
</p>

<p class="codepen" data-height="300" data-default-tab="css,result" data-slug-hash="OPMzjBY" data-pen-title="Modal dialog with scroll-stop" data-editable="true" data-user="sarajw" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
      <span>See the Pen <a href="https://codepen.io/sarajw/pen/OPMzjBY">
  Modal dialog with scroll-stop</a> by Sara (<a href="https://codepen.io/sarajw">@sarajw</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
      </p>
      <script async src="https://public.codepenassets.com/embed/index.js"></script>

You've may have noticed - if you can see a scrollbar - that the scrollbar gutter isn't taking on the backdrop style. Yeah. Go ahead and comment out the `scrollbar-gutter: stable;` line in the CSS, open/close the modal a few times, and see whether the scrollbar appearing and disappearing bothers you more. It might not - but it bothers _me_!

Reinstate `scrollbar-gutter: stable;`, then scroll down a little in the CSS of the above CodePen and uncomment the following:

```css
dialog[open]::backdrop {
  background-color: transparent;
  backdrop-filter: blur(0.25rem);
}
```

Here I've dropped the default shading of the `::backdrop` and applied a blur instead - meaning the gutter blends in, assuming the gutter and page are both the same colour. You might even have some fun with seeing how the scrollbars change with `color-scheme`...

Honestly though, different browsers and OSes and dark and light modes and device types make scroll bars look different all over the place.

On a MacBook whether you even _see_ the scrollbar when you're not actively scrolling depends on whether you have an external pointing device connected or not! So many people now browse the web with mobile devices, where the scrollbars and gutters are largely hidden - so it likely isn't worth spending too much effort trying to "fix" this. Trust me. Don't waste your time on it, I've wasted enough for both of us!

## Accessibility

While a lot of this just works for everyone, there is some discussion about where to put the focus, when a user opens a modal. For a sighted user with a pointing device, you probably don't notice where the focus lands - but it's very important if you're a screen reader user, as the focus determines where in a document the reader lands and begins reading from.

I heartily recommend reading [Where to Put Focus When Opening a Modal Dialog](https://adrianroselli.com/2025/06/where-to-put-focus-when-opening-a-modal-dialog.html?Theme=Light) by Adrian Roselli to help you decide where the focus will land on your dialog. Then read [O dialog focus, where art thou?](https://www.matuzo.at/blog/2023/focus-dialog/) to help you consistently get it where you want it.

<p class="highlight">
  If you read the MDN page on dialogs and are bothered by <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog#attributes">this warning about <code>tabindex</code> on <code>&lt;dialog&gt;</code></a>, you may either take Adrian or Manuel's word that it's OK, or you can enjoy this deep dive into <a href="https://www.matuzo.at/blog/2025/whats-an-interactive-element">What's an interactive element?</a>. Enjoy!
</p>

## Dialogs discovered

I hope this has been enough to convince you that its worth using dialogs, if you aren't already, or maybe you've found a couple of interesting tidbits you otherwise werent aware of.

HTML is still changing and improving - it's not at all archaic or just there to provide divs into which we can inject all the things with JavaScript (though of course you can still do that, just please inject accessible elements)!

Feel free to contact me on the social medias to start a, uh, dialog.

<script>
  const meetDialogButton = document.getElementById("openMeetDialog");
  const meetDialog = document.getElementById("meetDialog");
  meetDialogButton.addEventListener("click", () => meetDialog.showModal());
  const toastDialogButton = document.getElementById("openToastDialog");
  const toastDialog = document.getElementById("toastDialog");
  toastDialogButton.addEventListener("click", () => toastDialog.show());
</script>
