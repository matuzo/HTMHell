---
title: "Discovering Dialogs"
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

Just as I did, some of you may have been coding a lot of these functions into a `<div>` by hand with CSS and JavaScript, or using a library to handle them for you.

Either way, things are getting simpler and more declarative all the time - and when we're so busy working, we don't always realise how much has changed! Maybe this will help you shave off some lines of code or remove some dependencies from your codebase.

To those of you new to building on the web, this is for you too, as you lucky things get to skip the old ways :)

## Meet `<dialog>`.

This is a way of popping up a little overlay on your page - a common variant is known as a modal - and it has a whole bunch of abilities built in.

## Modal and non-modal

We're probably more familiar with the modal variety of dialog, intended to stop you interacting with the page under it. But there are also plenty of non-modal dialogs to be seen around the web, for example toast notifications.

Dialogs can give us both modal and non-modal variants, depending on how we open them. In the case of more than one dialog being opened, the most recently opened dialog will appear on top.

## Opening with JS

To open a dialog, we use one of two JavaScript functions on a dialog element:

```js
.show()
.showModal()
```

Likely based on the click of a button, you will run something like the following (you will likely have a much more specific querySelector):

```js
document.querySelector("dialog").show();
// or
document.querySelector("dialog").showModal();
```

<p class="highlight"><strong>Note:</strong>
  There is a declarative method available to <a href="">invoke</a> dialogs, but for now I will stick to what is currently available across the main browsers.
</p>

In the codepen below, both kinds of dialog opening method are available. You'll notice that you can still interact with the Open Modal button after having opened the dialog, but not vice-versa. The modal can be closed with the Esc key, the normal modal cannot.

<p class="codepen" data-height="300" data-default-tab="js,result" data-slug-hash="ZYQvJQG" data-pen-title="Dialogs!" data-editable="true" data-user="sarajw" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
      <span>See the Pen <a href="https://codepen.io/sarajw/pen/ZYQvJQG">
  Dialogs!</a> by Sara (<a href="https://codepen.io/sarajw">@sarajw</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
      </p>
      <script async src="https://public.codepenassets.com/embed/index.js"></script>

## Closing dialogs

You'll also not see any JS for the closure of the dialogs. Pop into the HTML tab in the demo, and you might spot the `method="dialog"` in the `<form>` element. Here I'm only using it to close the dialogs with a button. If you include more inputs here, `method="dialog"` will <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/form#method">send a submit event and close the dialog</a>, but not actually submit any data anywhere.

Dialogs can also be closed without using this form method, instead having a button activating some JS:

```js
document.querySelector("dialog").close();
// or
document.querySelector("dialog").requestClose();
```

This <a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/requestClose">`requestClose()`</a> is a new addition, allowing access to the cancel event, otherwise thrown when exiting a modal with the Esc key. This may be useful to create 'are you sure?' interactions. (But please do use with care! We'll have no deceptive patterns here..)

## (Some) styling built in

Apart from limiting the Pirate lorem ipsum text width and centering it, no other styling has occurred in the above demo. By default, the 'normal' dialog has no backdrop, while the modal dialog does, and is centered vertically as well as horizontally on the page.

<p class="highlight"><strong>Note:</strong> Some text.</p>

```html
<h1>
  <a href="/"> Hello World </a>
</h1>
```
