---
title: "text-scale and what it solves"
author: "Kilian Valkhof"
author_bio: "Web developer and creator of Polypane.app, the browser for developers."
date: 2026-12-22
author_links:
  - label: "Site"
    url: "https://kilianvalkhof.com"
    link_label: "Website"
  - label: "Polypane"
    url: "https://polypane.app"
    link_label: "Polypane"
intro: "<p>If you're reading this post, you are probably using `rem`s or `em`s to size your fonts. You do this because, when a user resizes their default font, your text will automatically scale to accommodate that.</p>"
image: "advent26_1"
active: true
---

If you're reading this post, you are probably using `rem`s or `em`s to size your fonts. You do this because, when a user resizes their default font, your text will automatically scale to accommodate that. But what if I told you that's not exactly how it works? Read on to learn why and how to opt into text-scaling properly.

## Using rems

Just a quick refresher: your browser has a default stylesheet for pages, and the default root font size is set to `100%` (or, more specifically, the keyword `medium`). `1rem` is the same as that 100%. `1.5rem` is equivalent to 150%, and so on. 

The idea with using rems is that it doesn't really matter what that 100% is in "actual" pixels. You're designing with a relative scale that will adjust to whatever that 100% ends up being.

When you look into this however, you'll notice that in every browser, `100%` is 16 pixels, regardless of what the default font size on the operating system is.

## Scaling on the web

Before we go over why that is, we need a little refresher on what scaling means on the web. There's roughly three ways to scale content on the web:

- viewport zoom
- page zoom
- text zoom

Viewport zoom is what you're used to on mobile, and nowadays probably the most common way of zooming. You pinch and you zoom into a specific part of the page. The page doesn't change width, you just see less of it on your screen.

![normal and viewport zoom side-by-side](/images/advent2026/22/viewportzoom.png)

Page zoom is what happens when you zoom in on a desktop browser. Under the hood, the browser pretends that the tab is less wide, and scales the entire page to fit. If you have a 1280px wide browser window, and you zoom in to 400%, the resulting page ends up being 320 CSS pixels wide.

![normal and page zoom side-by-side](/images/advent2026/22/pagezoom.png)

Lastly, text zoom is ironically the oldest of the three. You can see it in action if you use Firefox and go to View -> Zoom and then check "Zoom text only".

When you set this, the browser will change only the text size. Other elements, like images will remain the same size.

![normal and text zoom side-by-side](/images/advent2026/22/textzoom.png)

When you use (r)ems, you probably imagine that when a user sets a different default font size on their device, that the browser behaves like the text zoom example. After all, that `100%` default font-size ostensibly means 100% of the user's default operating system font size.

## Current behavior

What you'll find, however, is that the 100% font-size refers to whatever the browser itself has in its settings, separately from the operating system.

The reason this happens is to prevent websites from breaking: users have wildly different default font sizes on their operating system, and even slightly-larger than average (say, 20px instead of 16px) can easily break websites. To prevent that from happening, browsers have decoupled the two. 

However, according to [a quantitative study done by Appt](https://appt.org/en/stats/font-size), roughly 26% of both iOS and Android users increase their default text size, and an additional ~10% decrease it. In other words: a third of your mobile visitors would really prefer a different default font size. That's worth catering to!

## Text-scale: scale

To cater to that one-third of mobile users, add this meta tag:

```html
<meta name="text-scale" content="scale" />
```

If you add that to your `<head>`, you tell the browser that your site is explicitly built to handle the _actual_ default font size that your visitors have, whether that's 16px, 20px or 9px.

Worth noting is that, at time of writing, "the browser" in this case is any Chromium-based browser on mobile devices. Safari and Firefox have no support for it yet, they just ignore the meta tag, and desktop Chromium does not change its behavior based on the meta tag.

It's part of [CSS Fonts level 5](https://drafts.csswg.org/css-fonts-5/#text-scale-meta) though, so it should make its way to other browsers in time.

This text-scaling, like the viewport meta tag, makes it opt-in: if you don't include the meta tag, the browser will use the legacy behavior, which is to ignore the operating system's default font size.

There's also a way to explicitly state you don't support operating system-level text scaling:

```html
<meta name="text-scale" content="legacy" />
```

You can include this meta tag in your `<head>` to indicate that your site does not support operating system-level text scaling explicitly, or as a reminder to yourself to add support at some point in the future.

## What to test

When following the operating system, you'll want to make sure that both scaled down text and scaled up text doesn't break anything.

There are some things that are prone to breaking when text is scaled up:

- Text might be hidden because it overflows a fixed-height container
- Text might overlap with other elements if there isn't enough spacing or if elements are positioned absolutely.
- Text might cause a horizontal scrollbar if it becomes too wide and doesn't allow word-breaking.

Zoomed out text is usually less prone to breaking layouts, but it can still cause issues if your layout relies on fixed heights or widths, and with text being much smaller, it can also cause your design to look unbalanced or elements to appear misaligned.

## How to test

The most accurate test requires an Android device (or emulator), as this is currently the platform that fully supports the text-scale meta tag.

On that Android device, go to your settings, then navigate to Accessibility and then "Display size &amp; text". Here you can drag the "font-size" range slider up or down to increase or decrease the default font size. Then open up your page in Chromium on the device, and check how your site responds to the different text scales (note that this only works if you have included the text-scale meta tag).

If you don't have access to an Android device, Polypane lets you simulate different OS text scales directly in the browser, between 85% and 200%:

![Three panes showing a zoomed out, normal and zoomed in page in Polypane](/images/advent2026/22/os-scale-polypane.png)

This can be a convenient way to quickly check how your site handles various text scales without needing a physical device.

Regardless of how you test, it's important to check your site at both the minimum and maximum text scales to ensure that your layout doesn't break and that things remain readable.

## More reading:

If you want to dive deeper into text scaling and its implications for web design, I highly recommend you check out the following resources for a better understanding of why it matters and how to properly support it in your projects.

- [Let's fix the web's text size at Joshtumath.uk](https://www.joshtumath.uk/posts/2026-07-02-lets-fix-the-webs-text-size/)
- [Try text scaling support in Chrome Canary at Joshtumath.uk](https://www.joshtumath.uk/posts/2026-01-27-try-text-scaling-support-in-chrome-canary/)
- [Text scale at MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta/name/text-scale)
- [Text-scaling meta tag at Matuzo.at](https://matuzo.at/blog/2026/text-scaling-meta-tag)
