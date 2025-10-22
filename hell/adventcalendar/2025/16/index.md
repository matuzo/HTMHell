---
title: "Controlling dialogs and popovers with the Invoker Commands API"
author: "Aubrey Sambor"
author_bio: "Aubrey Sambor is a front-end developer and accessibility advocate. She's one of the organizers of [A11yTalks](https://a11ytalks.com), a monthly virtual meetup featuring speakers and conversations around digital accessibility. She loves CSS, fountain pens, knitting, coffee, and sushi."
date: 2025-12-16
author_links:
  - label: "Aubrey's website"
    url: "https://aubreysambor.com"
    link_label: "aubreysambor.com"
  - label: "Aubrey on Mastodon"
    url: "https://labyrinth.social/@starshaped"
    link_label: "@starshaped@labyrinth.social"
intro: "<p>Short introductory text</p>"
image: "advent25_16"
---
The [Invoker Commands API](https://developer.mozilla.org/en-US/docs/Web/API/Invoker_Commands_API) is a new way to control popovers and modal dialogs without having to write JavaScript. Dialogs have been available in all modern browsers since March 2022, and the Popover API is available in all modern browsers as of January 2025.

Until now, users wanting to implement the `<dialog>` element needed to write their own JavaScript to power the show and hide functionality using the `HTMLDialogElement` interface, while the Popover API and Invoker Commands API for popovers work identically by using `HTMLElement` attributes to show, hide, or toggle the popover.

Why should you use this new API, and what benefits does it bring?

## Dialogs vs popovers
First, let's go over the difference between a dialog and a popover. Hidde de Vries [wrote a blog post in 2022](https://hidde.blog/dialog-modal-popover-differences/) detailing the differences, but in short:

* Dialogs usually contain an action to take, such as agreeing to text or choosing an option. Popovers usually display short-lived information such as a date picker or toast notification.
* A dialog must be explicitly closed, either by taking an action within the dialog or closing via a close button, while a popover can be lightly dismissed by clicking outside of the popover.
* A dialog can either be modal or non-modal, while a popover is always non-modal by design. As of late 2025 the Invoker Commands API only has a built-in command for a modal dialog, so I will be focusing on modal dialogs only in this post.
* Dialogs have a built in backdrop functionality to tint the background a different color, while popovers shouldn't use a backdrop in most cases.
* A dialog is an HTML element with a role of `dialog`, while a popover is considered an attribute and does not come with a role.

## The `command` and `commandfor` attributes
The Invoker Commands API introduces two new attributes to the `<button>` element—`command` and `commandfor`.  The `commandfor` attribute acts as a connector between the `<button>` controlling the functionality and the element that the command acts upon, while `command` contains the action that should be taken on the element.

As of late 2025 the following commands are supported within the API, which right now can only be used for `<dialog>` or `<div role="dialog">` elements or on elements with the `popover` attribute. These commands are:

* `show-modal`: Shows a `<dialog>` element as a modal. If you're familiar with the underlying API to show a `<dialog>` as a modal, this is equivalent to the `HTMLDialogElement.showModal()` method.
* `close`: Closes a `<dialog>` element. This is equivalent to the `HTMLDialogElement.close()` method.
* `request-close`: This command works similarly to the `close` command, but before the `<dialog>` can be closed, a `cancel` event is triggered first to cancel the closure of the dialog if required actions do not occur, such as selecting required options within the `<dialog>`. This is equivalent to the `HTMLDialogElement.requestClose()` method. This concept is a little tricky, so I'll show an example later in the post. 
* `show-popover`: Shows a popover element. This is equivalent to both the `popoveraction="show"` attribute and the `HTMLElement.showPopover()` method.
* `hide-popover`: Hides a popover element. This is equivalent to both the `popoveraction="hide"` attribute and the `HTMLElement.hidePopover()` method.
* `toggle-popover`: Toggles a popover element; if the popover is hidden, it will be shown, and if the popover is shown, it will be hidden. This is equivalent to both the `popoveraction="toggle"` attribute and the `HTMLElement.togglePopover()` method.
* Custom values: This is where The Invoker API really shines! A user can provide a custom value, prefixed by two hyphens (`--`) to create a custom `command` event. This event is usually written in JavaScript and provided by the user to add new functionality. The possibilities are endless!

## Examples
### The Invoker Commands API with a `<dialog>` element
This is a basic example of how to use the Invoker Commands API with a `<dialog>` element. One button fires the `show-modal` command when it is clicked, and within the `<dialog>`, another button fires the `close` command to close the dialog. No JavaScript necessary, it's all built in for you!

```html
<button commandfor="my-fancy-dialog" command="show-modal" aria-haspopup="dialog">Open dialog</button>
<dialog id="my-fancy-dialog" aria-labelledby="my-fancy-heading">
  <h2 id="my-fancy-heading">My fancy dialog</h2>
  <p>Dialog content</p>
  <button commandfor="my-fancy-dialog" command="close">Close dialog</button>
</dialog>
```

### The `request-close` command on a `<dialog>` element
To use the `request-close` command, a bit of JavaScript is needed. First, use the same code as above, but change the command on the button inside the `<dialog>` from `close` to `request-close`:

```html
<button commandfor="my-fancy-dialog" command="show-modal" aria-haspopup="dialog">Open dialog</button>
<dialog id="my-fancy-dialog" aria-labelledby="my-fancy-heading">
  <h2 id="my-fancy-heading">My fancy dialog</h2>
  <p>Dialog content</p>
  <button commandfor="my-fancy-dialog" command="request-close">Close dialog</button>
</dialog>
```

Now, since a `cancel` event is fired on the `<dialog>` element (as that's the element that can be closed), an event listener needs to be added to capture the cancel event when `request-close` is called. In this example, an alert displays when the close button is clicked, and then, when the user clicks 'OK', the alert closes and then the dialog closes. This causes the user to have to perform an action before the dialog is closed.

```js
const myFancyDialog = document.getElementById("my-fancy-dialog");

myFancyDialog.addEventListener("cancel", (event) => {
  window.alert(
    "A cancel event gets fired when using the 'request-close' command."
  );
});
```
### The Invoker Commands API with the popover attribute
Commands for the popover attribute also exist in the Invoker Commands API. The new `show-popover`, `hide-popover`, and `toggle-popover` commands are equivalent to the `show`, `hide`, and `toggle` values on the `popovertargetaction` attribute in the Popover API. The `popover` attribute still needs to be added to the popover's container, but the Invoker Commands API handles the rest of the popover's functionality. 

```html
<button commandfor="mycommandpopover" command="toggle-popover">Toggle popover</button>
<div id="mycommandpopover" popover>Popover content</div>
```
### The Invoker Commands API with a custom command
This is where the Invoker Commands API gets fun! You can add your own custom commands if the command you wish to run does not exist. Since a mechanism for opening and closing `<details>` elements does not yet exist as a command, I wrote a custom `--toggle-details` command to open and close the `<details>` element when the `<button>` element is clicked. 

```html
<button class="my-fancy-button" commandfor="my-fancy-details" command="--toggle-details">Open details element</button>
<details id="my-fancy-details">
  <summary>This is a details element</summary>
  <p>Here is the text inside the details element, opened by a custom command!</p>
</details>
```

```js
const detailsElement = document.querySelector("details");

detailsElement.addEventListener("command", (event) => {
  if (event.command === "--toggle-details") {
    detailsElement.open = !detailsElement.open;
  }
});
```
## Looking ahead
The Invoker Commands API is not widely supported across all modern browsers just yet—as of late 2025, the Invoker Commands API is available in Chrome and Edge as of version 135, Opera as of version 120, Firefox as of version 144, and Safari Technology Preview. However, if older browsers need to be supported, you're in luck as there's a [polyfill](https://github.com/keithamus/invokers-polyfill) created by the API author. 

To learn what's coming next for the Invoker Commands API, the authors have created an [explainer document](https://open-ui.org/components/future-invokers.explainer/) with potential future enhancements to the API, including commands to open, close, or toggle a `<details>` element, a command to open a native HTML date picker, and commands to play, pause, and mute HTML `<audio>` and `<video>` elements. Users can also [submit an issue](https://github.com/openui/open-ui/issues) to add other commands that are not yet implemented—go forth and add your ideas!

## Further reading
* [Can native web APIs replace custom components in 2025?](https://blog.logrocket.com/can-native-web-apis-replace-custom-components-2025/#invoker-commands)
* [Introducing command and commandfor](https://developer.chrome.com/blog/command-and-commandfor)
* [`command` and `commandfor`: the Invoker Commands API](https://webinista.com/updates/command-and-commandfor-invoker-commands-api)
* [Going JavaScript-free with the new Invoker Command API!](https://gomakethings.com/going-javascript-free-with-the-new-invoker-command-api/)
