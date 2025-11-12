---
title: "Top layer troubles: popover vs. dialog"
author: "Stephanie Eckles"
author_bio: "Stephanie Eckles is a Senior Design Engineer for Adobe Spectrum CSS, a member of the CSSWG, and the author of ModernCSS.dev. Steph has 15+ years of webdev experience that she enjoys sharing as an author, workshop instructor, and conference speaker. She's an advocate for accessibility, scalable CSS, and web standards. Offline, she's mom to two girls and enjoys baking and watercolor painting."
date: 2025-12-01
author_links:
  - label: "Blog"
    url: "https://moderncss.dev"
    link_label: "ModernCSS.dev"
  - label: "Mastodon"
    url: "https://front-end.social/@5t3ph"
    link_label: "@5t3ph"
intro: "<p>A sneaky accessibility conflict can arise when trying to use modal dialogs with the popover API. Learn about the conflict and how to resolve it.</p>"
image: "advent25_1"
---

Have you ever tried to set `z-index: 9999` to solve element layering issues? If so, you’ve been fighting a fundamental CSS concept of _stacking contexts_.

The stacking context defines the order things are placed in the third dimension, or the “z” axis. Think of the z-axis as layers of DOM elements between the root of the stacking context within the viewport, and you, the user, looking through the browser viewport.

![A diagram showing a series of four diamonds representing element layers arranged to create a stack. To the left is an arrow point up from the bottom of the stack, with the label of 'z-axis'.  At the bottom of the arrow is the label of 'viewport' and at the top is the label of 'user', demonstrating how stacking contexts build element layers along the z-axis between the viewport and the user.](../../../images/advent2025/top-layer/stacking-context.jpg)

An element can only be re-layered within the same stacking context. While `z-index` is the tool to do it, the failure happens due to a change in stacking contexts. This can happen in a few ways, such as a fixed or sticky positioned element, or combining position absolute or relative along with a z-index, among others [as listed on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_positioned_layout/Stacking_context).

A modern web feature is the “[top layer](https://developer.mozilla.org/en-US/docs/Glossary/Top_layer),” which is guaranteed to be the top-most layer above any other stacking context. It spans the entire viewport, although elements existing in the top layer may have smaller visible dimensions.

Promoting an element to the top layer breaks it free of any stacking context it may otherwise exist within.

Although the top layer directly addresses a CSS-related issue, there is currently no property available to promote an element to the top layer. Instead, certain elements and conditions gain access to the top layer, including native dialogs via `showModal()` and elements designated as popovers.

The [popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API/Using) is a newly available HTML feature that enables you to create declarative non-modal overlay elements. The ability to escape any stacking context by gaining top layer access is usually a desirable feature of choosing the popover API. However, there’s a sneaky potential conflict to be aware of before hastily opting for this native upgrade.

## Setting the scene

Picture this, the web, 2025: your web app includes a notification service that displays via “toast” messages. You know, those pop-up messages that usually appear in a corner or other location with a lower likelihood of obstructing any other UI.

Usually these toast notifications are for real-time alerts of things like a successful save, or errors such as a failed form submit. They are sometimes time limited, or include a dismissal mechanism like a close button. Sometimes they include an additional action, such as to “Retry” for re-submitting a failed workflow.

Since your app is hip to the times, you’ve recently decided to upgrade the toasts to use the popover API. This enables you to place the toast component anywhere in the app structure, and not have to hack around stacking context issues. After all, toasts absolutely must appear over everything else, so the top layer access afforded via popovers makes sense!

You ship the enhancement, proud of your work.

Later that week, you get an urgent bug report. Not just any bug report, but an accessibility violation.

## Dialog vs. popover

Because your app is hip, you also had previously upgraded to native HTML dialogs. That was an incredible upgrade because you got to reduce a JavaScript dependency in favor of a native web feature. That’s another reason you were excited to enhance your toasts to use popover as well.

So, what was the bug? A keyboard user was in a workflow that involved a dialog. While the dialog was open, a background process caused a toast notification to trigger. The notification was for an error, and required user interaction.

The bug occurred when the keyboard user tried to tab into the toast, which they were able to visually see above the dialog backdrop. Unfortunately, their focus never successfully entered the toast, and instead seemed to skip over it, jumping unexpectedly to the browser UI instead.

You can experience this error yourself in this CodePen, where by using the tab key, you too will never be able to access the toast. You can also try it out using a screen reader, and notice that the virtual cursor is also unable to get into the toast.

<p class="codepen" data-height="400" data-default-tab="result" data-slug-hash="RNrJxyo" data-pen-title="conflicting" data-user="5t3ph" data-token="ba02f03947d400a202a02e01c643eaea" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
<span>See the Pen <a href="https://codepen.io/5t3ph/pen/RNrJxyo/ba02f03947d400a202a02e01c643eaea">
conflicting</a> by Stephanie Eckles (<a href="https://codepen.io/5t3ph">@5t3ph</a>)
on <a href="https://codepen.io">CodePen</a>.</span>
</p>

If you are able to click on the popover, you may think it’s at least working with that method. But shortly we’ll learn that thing aren’t always as they seem.

## Why the toast popover is unreachable

While top layer allows beating out standard stacking contexts, items that exist within the top layer create their own layering order. The most recently added top layer item appears over previous top layer items. This is why the toast was visually appearing over the dialog’s backdrop.

So if the popover is _visually_ available, why is it unreachable via keyboard or a screen reader’s virtual cursor?

The reason has to do with the popover competing with a _modal_ dialog. When the native HTML dialog is launched via `showModal()`, the page outside of the dialog becomes _inert_. The state of _inert_ is a necessary accessibility behavior, which results in isolating the dialog contents, and prevents both tab and virtual cursor access to the background page.

The bug is due to the toast popover being part of the background page’s DOM. This means it has been made inert due to being outside of the DOM boundary of the dialog.

But, due to top layer order, since it was created after the dialog was opened, it is confusingly sitting visually over the dialog.

If you thought clicking the popover was working, it’s in fact not, even though the popover does dismiss. What is really happening is that you are triggering the _light dismiss_ behavior of the popover. This means it is closing because you are technically clicking outside of it’s boundaries, since the dialog is capturing the click instead.

So, while the popover was dismissed, the “Retry” button was _not_ actually clicked, meaning any associated event listener was not triggered.

Even if you created an automated test to check your alert functionality specifically when a dialog was open, the automated test may have had a false positive because it triggered a programmatic click on the toast button. That pseudo click was falsely getting around the issue created from the dialog causing the page to be inert.

## Regaining popover access

The solve is two-fold:

1. move the popover physically inside the DOM of the dialog
2. ensure use of `popover="manual"` to prevent clicks inside the dialog from prematurely triggering light dismiss on the popover

Once we’ve done both of those things, the popover is now both visually available and fully interactive via any method.

<p class="codepen" data-height="400" data-default-tab="result" data-slug-hash="qEbKpJd" data-pen-title="conflicting" data-user="5t3ph" data-token="57e8ec936911cf8549df0df72c650650" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
<span>See the Pen <a href="https://codepen.io/5t3ph/pen/qEbKpJd/57e8ec936911cf8549df0df72c650650">
conflicting</a> by Stephanie Eckles (<a href="https://codepen.io/5t3ph">@5t3ph</a>)
on <a href="https://codepen.io">CodePen</a>.</span>
</p>

## Learnings and additional considerations

What we’ve learned is that you will need to work out a mechanism to launch popovers from within dialogs if your website or app has the possibility of both displaying at once, and they have independent timelines.

Alternatively, you could opt to supress background page popovers until the dialog closes. This may not be ideal if notifications require timely interaction, or if the dialog contents have the potential to trigger a toast.

Another issue you may need to handle for, besides visibility and interactivity, is if the popover needs to outlive the dialog. As in, it needs to remain open - perhaps to keep waiting for the user to take action - once the dialog is closed.

While I am a huge proponent of using native platform features, and I think popover in particular is an incredible feature, sometimes conflict points can’t be entirely avoided. In fact, you may have already had to contend with a similar conflict against the inert behavior of a modal dialog. So, this article may mostly be a warning to not entirely rip out your previous custom popover architecture _if_ you have this potential issue of displaying background popovers and modal dialogs simultaneously.

If this is an issue that currently, or may in the future affect your work, keep an eye on [this HTML issue where solutions are being discussed](https://github.com/whatwg/html/issues/9936).

<script async src="https://public.codepenassets.com/embed/index.js"></script>
