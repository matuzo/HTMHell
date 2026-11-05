---
title: "HTML-in-Canvas: The \"why\" behind the viral"
author: "Natalia Markoborodova"
author_bio: "Natalia is a Developer Relations Engineer on the Chrome team at Google, where she works on immersive Web experiences, including APIs like HTML-in-Canvas and WebGPU. She believes the web should be fun, engaging, and accessible, in that order of visibility but not of importance."
author_links:
  - label: "LinkedIn"
    url: "https://www.linkedin.com/in/natalia-markoborodova"
    link_label: "natalia-markoborodova"
  - label: "X"
    url: "https://x.com/nmarkoborodova"
    link_label: "@nmarkoborodova"
  - label: "Bluesky"
    url: "https://bsky.app/profile/nmarkoborodova.bsky.social"
    link_label: "@nmarkoborodova.bsky.social"
  - label: "GitHub"
    url: "https://github.com/ewewraw"
    link_label: "ewewraw"
intro: "<p>Canvas has always been HTMHell's blind spot: lots of pixels, no markup to roast. Why did an API that puts real, accessible HTML inside canvas go viral?</p>"
image: "advent26_"
active: true
date: 2026-12-08
---
In the history of HTMHell, 35 entries in the [Hell collection](https://www.htmhell.dev/) and about 130 Advent Calendar articles since 2021, the `<canvas>` element has never been roasted. Not once.

This is probably because there was never much to roast. Until Chrome 157, a canvas full of text and buttons was, as far as HTML was concerned, a single element: the text and buttons were just pixels, with no markup behind them. You can't write bad markup if there's no markup. Canvas wasn't in HTMHell. Like the souls in limbo, the first circle of Dante's hell, it did nothing wrong. It was just shut out on a technicality.

This year, the deal changed. [Chrome 157 shipped the HTML-in-Canvas API](https://developer.chrome.com/blog/html-in-canvas), and before it even shipped, the web lost its mind over it. Let's talk about what it is, and, more interestingly, *why* so many people cared.

## Welcome to canvas hell

Bad markup gets you into HTMHell. No markup gets you here:

```html
<!-- 🔥 Canvas hell 🔥 -->
<canvas id="wishlist" width="600" height="400" aria-hidden="true"></canvas>

<script>
  const ctx = wishlist.getContext("2d");
  ctx.font = "24px serif";
  ctx.fillText("Dear Santa, I would like:", 20, 40);
  ctx.fillText("1. A puppy", 20, 80);
  // ...and now hand-roll a text input. With a caret. And selection.
  // And IME support. And right-to-left text. Good luck.
</script>
```

Those are pixels pretending to be words. To an unsuspecting user, the result looks like a regular web page, but under the hood, there are no text nodes, no elements, and nothing in the accessibility tree behind it. The disguise falls apart as soon as the user tries to interact with the content: screen readers can't help, <kbd>Ctrl</kbd>+<kbd>F</kbd> finds nothing, and Santa can't select items from your wishlist, copy it, or translate it.

If you want real interactive content in a canvas, like text fields, links, or buttons, you've had two options:

1. **Rebuild the browser yourself**: Draw text fields, carets, and selection highlights with canvas calls, handle every keystroke in JavaScript, and maintain a second, invisible DOM so assistive technology has something to read. Many apps do exactly this, and this means building and keeping in sync two UIs. For example, [Google Docs moved to canvas rendering in 2021](https://workspaceupdates.googleblog.com/2021/05/Google-Docs-Canvas-Based-Rendering-Update.html), reassuring users that screen readers, braille devices, and screen magnification would not be affected (although a warning that some Chrome extensions might stop working was in place).
2. **Float real HTML on top of the canvas** and recalculate its `style.transform` every frame. It jitters when the camera moves, it can never sit *behind* a 3D object, and the browser re-parses CSS strings every frame for every overlay.

The first option makes accessibility a separate project that you have to build and maintain yourself. The second keeps the HTML accessible, but turns visual sync into a constant battle. And neither is fun.

## Welcome to HTML-in-Canvas heaven

HTML-in-Canvas flips this around. You put **real HTML inside the `<canvas>` element** and ask the browser to draw it:

```html
<canvas id="canvas" width="600" height="400" content="drawable">
  <form id="letter" drawable>
    <h2>Dear Santa,</h2>
    <label for="wish">I would like:</label>
    <input id="wish" name="wish" autocomplete="on" value="a puppy">
    <button>Send to the North Pole</button>
  </form>
</canvas>
```

```js
const ctx = canvas.getContext("2d");
canvas.onpaint = () => {
  ctx.reset();
  ctx.drawElementImage(letter, 20, 20);
};
```

- `content="drawable"` on the `<canvas>` tells the browser to lay out its children.
- `drawable` marks an element that you can draw independently.
- `drawElementImage()` paints that element's pixels into the canvas. In 2D, it also keeps the DOM geometry in sync with where you drew it, so clicks, focus, and hit testing land in the right place.

The `<form>` is still a `<form>`. It's in the accessibility tree. <kbd>Tab</kbd> moves focus into it. Autofill fills it. <kbd>Ctrl</kbd>+<kbd>F</kbd> highlights "puppy" *in the canvas*. Translate translates it. DevTools inspects it.

And because these are still canvas pixels, you can do what canvas does best: run them through **WebGL or WebGPU shaders**, wrap them around 3D meshes, melt them, shatter them, or hang them on a cloth that waves in the wind. In 3D you calculate the transform yourself and tell the browser where the element ended up:

```js
canvas.updateElementGeometry(letter, { canvasTransform: matrix });
```

No CSS string parsing, no style recalculation, no overlay drift.

Try the demo in Chrome 157+:

<iframe src="https://ewewraw.github.io/html-in-canvas-santa/" title="A letter to Santa: an HTML-in-Canvas demo" width="100%" height="640" loading="lazy" style="border: 0;"></iframe>

If you're reading this in a browser without support, open the `<details>` in the demo above. (Yes, the fallback is in a `<details>` element. HTMHell has published an article about `<details>` on December 23rd three years in a row: [2023](https://www.htmhell.dev/adventcalendar/2023/23/), [2024](https://www.htmhell.dev/adventcalendar/2024/23/), [2025](https://www.htmhell.dev/adventcalendar/2025/23/). I'm just keeping the tradition alive.)

## The viral part

Here's what surprised me most. New web platform APIs usually arrive quietly: an explainer, a spec issue, a few polite thumbs-up emoji, and a demo by the person who wrote the spec.

HTML-in-Canvas did the opposite. While it was still an [**experimental origin trial**](https://developer.chrome.com/blog/html-in-canvas-origin-trial), with an API that [changed](https://developer.chrome.com/blog/html-in-canvas-ot-changes) under people's feet (as with any emerging API, attributes and methods were renamed along the way based on the discussions with browser vendors and engineers who know the Web by heart), the community:

- **Starred the explainer on GitHub about 2,400 times in a single month.** The count went from roughly 650 to over 3,000 in April 2026, and it's now past 4,000. That makes it the second most-starred repository in the history of the [WICG](https://github.com/WICG/), the [W3C](https://www.w3.org/) group where new web features incubate. Only [Web Components](https://github.com/WICG/webcomponents) has more, and it had a ten-year head start.
- **Built libraries before the API was stable.** [Three.js](https://threejs.org/), [Babylon.js](https://www.babylonjs.com/), [PlayCanvas](https://playcanvas.com/), and [PixiJS](https://pixijs.com/) all added support, and people built new libraries such as [CanvasUI](https://canvasui.dev/) specifically for UI components powered by HTML-in-Canvas.
- **Made demos.** So many [demos](https://github.com/GoogleChromeLabs/css-web-ui-demos/blob/main/html-in-canvas/awesome-html-in-canvas.md): A to-do list that's also a Duck Hunt game. Buttons that wobble like jelly. Compiz-style page transitions (remember the spinning desktop cube?). A form on a piece of cloth inside a 3D world that you can still type into. A landing page that shatters and heals. Liquid-glass UI with live DOM inside it.
- **Signed up for the origin trial in record numbers.** HTML-in-Canvas saw one of the highest numbers of Chrome origin trial sign-ups in years.
- **Wrote headlines like "The Web Is Fun Again."**

So why *this* API? I'd love to say it's because it finally makes canvas accessible. That was the point all along. But accessibility alone doesn't usually make a spec go viral. So instead, I have three hypotheses. Feel free to roast them.

## Hypothesis 1: It unlocks the effects we were told not to want

For years, the "serious" advice was: keep visuals in CSS, keep interactivity in HTML, and if you reach for canvas, accept that you're leaving accessibility behind. That's good advice! But it meant entire categories of creative work had to pick a side.

HTML-in-Canvas removes the trade-off. Shaders on real text. Real forms inside 3D scenes. Readable books in WebXR. Distortion, ripple, and glitch effects, applied to content that's still semantic. Designers and creative coders who had been stuck working around the platform suddenly had a primitive built for them.

## Hypothesis 2: Developers like to work smart, not hard

Developers didn't skip canvas accessibility because they *didn't care*. They skipped it because canvas made it *absurdly hard*. The built-in way was "fallback content": child elements between the `<canvas>` tags that the browser never draws but that assistive technology can read. That means building a second, invisible version of your UI and keeping it in sync with every pixel you paint. The numbers show how that went. Chrome's public usage counters, [quoted in the explainer's GitHub discussions](https://github.com/WICG/html-in-canvas/issues/11#issuecomment-3505140115), show `<canvas>` on about **45%** of page loads, but only about **0.4%** of page loads put *any* HTML between the `<canvas>` tags.

HTML-in-Canvas makes the right thing the easy thing: you write HTML, and the browser does the rest. Developers may not star a repo *for accessibility*, but they love it when the platform does the hard work for them.

## Hypothesis 3: It's for humans

This is the one I keep coming back to.

Look at what's dominated web development conversations over the last couple of years: making sites "agent-ready", exposing tools to AI agents, structuring content so it can be consumed by models, generating whole interfaces with a prompt. There's an endless stream of talks, guides, and checklists about making the web more **agentic**.

This work is genuinely useful, I'm not here to dunk on it (and HTML-in-Canvas content is still in the DOM, so crawlers and agents can now read the HTML drawn into the canvas, too). But HTML-in-Canvas isn't *about* agents. It doesn't make anything faster for a bot. Its whole point is to make something **delightful for a human**: a form that waves, a button that wobbles, a 3D scene you want to show a friend. In the same year that agent APIs dominated the conversation, this human-first API drew a comparable wave of attention. Maybe *because* it's for humans.

I read that as a signal. Under all the "make your site machine-readable" hype, there's a large, loud community that still wants the **weird, expressive, and fun web**. And the best part is that this time, the fun parts don't have to come at the cost of the people who use screen readers, translation, or keyboard navigation.

## Accessibility was the point all along

The shaders won the audience's hearts. But go back to the [very first version of the explainer](https://github.com/WICG/html-in-canvas/blob/2fb015bd01e7a212c94ad1c3447f2a4400606b64/README.md), from August 2024, back when the API was still called `placeElement`. Its first paragraph says the goal is to let canvas "benefit from all of the styling, layout and behaviors of HTML, including interactive elements and **built-in accessibility**." And it said the quiet part out loud:

> *"The current status quo is that it's impossible for developers to 'do the right thing', i.e., text in 3D contexts — for example — is currently always inaccessible. This API would allow developers to do the right thing."*

That's the problem behind the numbers from earlier. With `<canvas>` on about 45% of page loads and fallback content on only about 0.4%, canvas has effectively been an accessibility black hole.

Accessibility didn't just motivate the API. It **reshaped** it, in public. Accessibility experts raised concerns [within the first month](https://github.com/WICG/html-in-canvas/issues/11), and in the middle of the origin trial, [pointing out](https://github.com/WICG/html-in-canvas/issues/134), for example, that drawing only *direct* children of `<canvas>` would force authors to flatten their markup. That 36-comment discussion is why the API now has the `drawable` attribute, which lets you draw any descendant and keep the semantic structure around it, and why each drawn element's on-screen position is passed to the accessibility tree (see the explainer's [Accessibility section](https://github.com/WICG/html-in-canvas#accessibility)).

So the semantic version of my Santa letter isn't a workaround. It's the design:

```html
<canvas id="canvas" content="drawable">
  <figure>
    <img drawable id="puppy" src="puppy.png" alt="A small, very fluffy puppy">
    <figcaption drawable id="caption">Exhibit A: what I want for Christmas.</figcaption>
  </figure>
</canvas>
```

The `<figure>` keeps the image and caption together for assistive technology, even though they're drawn separately, maybe on two different walls of a 3D gallery.

## Hellish markup you can write now

The other hellish thing is the markup that HTML-in-Canvas lets you write. The question I get asked most, usually as a joke, is: *"Can I put a canvas in the HTML that's in the canvas?"*

Yes, you actually can! It's even in the [web-platform-tests](https://github.com/web-platform-tests/wpt/blob/master/html/canvas/element/manual/draw-element-image/triple-nested-content-drawable-canvas.tentative.html), three levels deep:

```html
<canvas content="drawable">
  <div drawable>
    <canvas content="drawable">
      <div drawable>
        <canvas content="drawable">
          <div drawable>🎄 Help, I'm trapped in a canvas factory</div>
        </canvas>
      </div>
    </canvas>
  </div>
</canvas>
```

Change the innermost `<div>`, and `paint` fires on all three canvases, innermost first, so each level can redraw the one inside it.

Here are some other cursed-but-legal things you can do:

- **A whole web page on a spinning cube.** Same-origin `<iframe>`s inside a drawable element are painted into the canvas, so you can wrap a live page around a 3D mesh. (Cross-origin content in the iframe stays blank. See the security section of the explainer for why.)
- **Video inside HTML inside canvas.** Put a `<video>` in a drawable element and `paint` fires as frames change, so you can run a playing video through a shader.
- **HTML inside SVG inside canvas inside HTML.** `<foreignObject>` works in a drawable `<svg>`. The nesting hell continues.
- **Your modal escapes.** Call `showModal()` on a `<dialog>` inside the canvas and it goes to the top layer, rendered by the page, not by your shader. Your beautifully warped 3D UI opens a perfectly flat, perfectly normal dialog. This is intended, and honestly, your users will thank you.
- **Rendering off the main thread.** `captureElementImage()` gives you a transferable snapshot that a Web Worker can draw into an `OffscreenCanvas`.
- **Export it all.** `toBlob()` and `captureStream()` turn your HTML-in-canvas scene into an image or a video, which makes a nice holiday card.

## Not everything is heaven (yet)

To keep this honest:

- **Browser support.** HTML-in-Canvas shipped in Chromium-based browsers. Use feature detection and a fallback (static rendering, overlays, or a library) for other browsers. The API is in Stage 3 in the [WICG](https://github.com/WICG/html-in-canvas), meaning that the API shape is approved.
- **Undrawn content is still content.** Everything inside `<canvas content="drawable">` is in the accessibility tree, even what you never draw. Hide stale views, closed panels, and leftovers with `hidden`, `inert`, or `aria-hidden="true"`, or remove them from the DOM.
- **3D needs your help.** In 2D, drawing an element updates its on-screen position automatically. In WebGL and WebGPU, the browser can't know where your texture ended up, so call `updateElementGeometry()` to [synchronize the DOM and the pixels](https://developer.chrome.com/docs/web-platform/html-in-canvas/concepts?hl=en#geometry).
- **No support for non-linear transformations (yet).** Shaders can bend your HTML any way you like, but hit testing only follows linear transforms, so clicks won't track text wrapped around a sphere.
- **Main thread only (for now).** There's no support for [threaded animations](https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/CSS_JavaScript_animation_performance#off_main_thread_animation) yet, so your scene is tied to main-thread performance.
- **Some content stays blank.** For privacy, the browser doesn't paint cross-origin images and iframes into the canvas, or private details like visited links.
- **Motion.** Wobbly, shattering UIs are fun until they make someone sick. Respect [`prefers-reduced-motion`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion).

## Conclusion

For years, canvas sat in limbo. Now it's full of real markup, and it's getting the kind of attention few web APIs ever get. Welcome to HTMHell, canvas. You've earned it.

You know what to do. Put a `<form>` on a snowflake. Wrap an `<article>` around a planet. Make your `<button>` wobble. To get started:

- [HTML-in-Canvas documentation](https://developer.chrome.com/docs/web-platform/html-in-canvas)
- [HTML-in-Canvas in Chrome 157](https://developer.chrome.com/blog/html-in-canvas)
- [Awesome HTML-in-Canvas community demos](https://github.com/GoogleChromeLabs/css-web-ui-demos/blob/main/html-in-canvas/awesome-html-in-canvas.md)
- [Share feedback on GitHub](https://github.com/WICG/html-in-canvas/issues)

Merry Christmas, and may your canvases be interactive and accessible. 🎄
