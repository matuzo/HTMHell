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

Suffering modal woes? Positioning, backdrops, focus trapping, z-index - Oof.

Just as I was, some of you may have been coding a lot of these functions into a `<div>` by hand with CSS and JavaScript, or using a library to handle them for you.

Either way, things are getting simpler and more declarative all the time - and when we're so busy working, we don't always realise how much has changed! Maybe this will help you shave off some lines of code or remove some dependencies from your codebase.

To those of you new to building on the web, this is for you too, as you lucky things get to skip the old ways :)

## Meet `<dialog>`.

The [dialog element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog) has been available across browsers since March 2022, and allows you to pop a little overlay on your page - a common variant is known as a modal - and it has a whole bunch of abilities built in, with further useful facets still being added.

## Modal and non-modal

We're probably more familiar with the modal variety of dialog, intended to (hopefully only briefly) stop you interacting with the page under it. But there are also plenty of non-modal dialogs to be seen around the web, for example toast notifications.

Dialogs can give us both modal and non-modal variants, depending on how we open them. In the case of more than one dialog being opened, the most recently opened dialog will appear on top.

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

With thanks to [Chris Ferdinandi](https://gomakethings.com/revisiting-how-to-dismiss-native-html-dialog-elements-when-the-backdrop-is-clicked/) and [Konnor Rogers](https://bsky.app/profile/konnorrogers.com/post/3lxczan6dh22b), the following code works well for _modal_ dialogs only, through the magic of the [`::backdrop`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/::backdrop):

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

  // check for clicks on documentElement, having been passed through the backdrop
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

To achieve light dismiss on non-modal dialogs is trickier unfortunately, as they have no backdrop to play with.

<p class="highlight">💡
  There is some light at the end of the dismiss tunnel with the <a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/closedBy">`closedby` property</a>, please feel free to poke any friendly Safari developers you might know! Then it could look as simple as the below:
</p>
  <p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="myVNLmb" data-pen-title="Dialogs with light dismiss (closedby)" data-editable="true" data-user="sarajw" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
      <span>See the Pen <a href="https://codepen.io/sarajw/pen/myVNLmb">
  Dialogs with light dismiss (closedby)</a> by Sara (<a href="https://codepen.io/sarajw">@sarajw</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
      </p>
      <script async src="https://public.codepenassets.com/embed/index.js"></script>

## (Some) styling built in

Apart from limiting the Pirate lorem ipsum text width and centering it, no other custom styling has occurred in the above demos. By default, the 'normal' dialog has no backdrop, while the modal dialog does, and is centered vertically as well as horizontally on the page.

- using dialog[open]
- ::backdrop
- ways to freeze the background, pitfalls

## Accessibility

- focus concerns

<p class="highlight"><strong>Note:</strong> Some text.</p>

```html
<h1>
  <a href="/"> Hello World </a>
</h1>
```
