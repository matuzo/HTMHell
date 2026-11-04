---
title: "Hidden until found"
author: "Roy Keur"
author_bio: "Front-end developer at Dutch digital and creative agency Gedachtegoed in Amsterdam, the Netherlands. Travels frequently by train for leisure, does shamefully not own a bicycle, likes 100% pure chocolate."
date: 2026-12-07
author_links:
  - label: "Bluesky"
    url: "https://bsky.app/profile/sprintercity.bsky.social"
    link_label: "sprintercity.bsky.social"
  - label: "Mastodon"
    url: "https://zug.network/@sprintercity"
    link_label: "zug.network/@sprintercity"
intro: "<p>The new until-found value of the hidden attribute lets authors hide content while keeping it available to the user agent. An analysis of what it improves, its limitations and its issues, compared with several alternatives.</p>"
image: "advent26_7"
active: true
---

The `hidden` attribute has always been an odd way of hiding elements. It allows a developer to hide elements with HTML and this by itself has been a source of debate since it was introduced. [A couple of years ago, this attribute was already discussed over here](https://www.htmhell.dev/adventcalendar/2023/11/), but what has been predicted as the future has turned into a reality today.
It appears `hidden` is no longer _truly_ hidden since the introduction of `until-found` as a new value for this attribute.

From the beginning, we were promised in the specs that when you add `hidden` to an element, you make it hidden from all presentations. Since `until-found` has been implemented, I feel a bit lied to, as this new value seems to break that promise. I would say it is a good idea to revisit this nefarious attribute to see what has actually changed and what we can learn from it.


## Hiding important content with `display:none` (and `hidden`) has shortcomings

Let's start with a brief reminder of why `hidden="until-found"` was introduced in the first place. The very basics are that `hidden` applies `display: none` to an element, as defined in the user agent stylesheet, but using `display: none` can lead to some shortcomings.

Some years ago, various news media found it a good idea to cut stories on their websites in two parts by inserting a 'Continue reading' button at some point in their articles, especially on mobile devices. Below is a simplified snippet of how this concept is applied today:

```html
<p>
    You could either take a boat or fly to Lorem Ipsum Island, but the flights are all cancelled due to a lack of available aircraft, so you will have to take a boat.
</p>
<button type="button" aria-expanded="false">
    Continue reading this article
</button>
<p data-readmore-hidden="1" style="display: none;">
    You can either use a catamaran, which takes one hour and fifteen minutes with departure time at 11:30, or take the slower cruise ship which takes two hours and 30 minutes, with departure time at 9:30.
</p>
```

_Note: the original code in this snippet uses `display: none`, not `hidden`, and I have retained this. In the chapter about the specs later on, I will discuss why `display: none` might indeed be a better choice than `hidden` in this context._ 


If you want to search for "_departure time_" in this snippet, you have got two choices: either read the whole article or use the in-browser **find-in-page** functionality that can for instance be triggered by pressing `CMD+F` or `CTRL+F` on a keyboard. If you try to use find-in-page, however, you will get zero (0) results. Why? If you hide content with `display: none`, you render it not only invisible and inaccessible to the user, but also to the user agent and that is what tries to search for any matches. 

What also will not work with hidden content is linking to a page anchor (think of `website.test/some-page#paragraph-1`) and using text fragments in the URL to highlight text (think of `website.test/some-page#:~:text=departure%20time`).


## How `hidden="until-found"` fixes these shortcomings

To make hidden content searchable by the user agent, we can now use `hidden="until-found"`, which uses `content-visibility: hidden` instead of `display: none`. 

By using `content-visibility`, the element keeps its box, but its contents are not rendered, and the browser retains its state (for example, scroll positions) instead of throwing it away like `display: none` does. It allows a browser to tell content that should _really_ be hidden apart from content that is hidden but should still be searchable.

Note: just using `content-visibility` on an element by itself does not make the element searchable. Using `hidden="until-found"` _does_. Also, it is worth mentioning that using `until-found` still does _not_ make content available to screen readers: `hidden` is meant to hide content from all presentations (see below) and a user agent is _not_ a presentation.

In practice, `hidden="until-found"` works like this: when a user searches for a term with find-in-page or text fragments, the browser searches through all searchable content. In case of a match, the browser triggers an associated `beforematch` event on the element that contains the match and `hidden="until-found"` will be removed from the element, before scrolling to the newly revealed match. The removed attribute will not be re-added to the element, even when closing find-in-page, so the element will not be hidden again in the currently active browser session.


## Notes on what specs state about `hidden`

[The specs state the following](https://html.spec.whatwg.org/multipage/interaction.html#the-hidden-attribute) about the `hidden` attribute: "_if something is marked `hidden`, it is hidden from all presentations, including, for instance, screen readers_". It is fairly strict on what you should use `hidden` for. Using `hidden` on elements that "_could legitimately be shown in another presentation_" (for example, in a tabs pattern) is deemed 'incorrect' because "_the tabbed interface is merely a kind of overflow presentation_", explaining you could "equally well" have "one big page with a scrollbar".

I tend to agree with the principle of this statement from a vision of "(information on) the internet should be available to all" and "important information should not be hidden anyway", but what if when we _do_ want to temporarily hide content? We should apparently _not_ use `hidden`, but should we also not use `display: none` since that is essentially what `hidden` does? That would be strange, as we all use `display: none` to hide elements in all kinds of use-cases, such as this previous snippet, but also accordions, tabs, header navigation menus, etc. Even a closed native `<dialog>` uses `display: none` internally. Is that supposed to be different, then?

### The mysterious `Hidden` state

Interestingly, the specs also state (no pun intended) this: "_User agents should not render elements that are in the `Hidden` state_". This **state** is what sets `hidden` apart from `display: none` semantically: applying `display: none` to an element does not give an element the `Hidden` state. 

This `Hidden` state is only relevant for the browser, as it is the _browser_ that uses this state to determine the relevance of the content. A user will not notice the visible difference between `hidden` and `display: none`. There can be cases, however, where states _do_ get relevant for the user. I will talk about such a case in the final chapter of this article.

So, elements with the `hidden` attribute get the `Hidden` state, but didn't `until-found` explicitly enable user agents to actually make elements visible? Perhaps surprisingly, elements with `hidden="until-found"` do _not_ get the `Hidden` state. Instead, a special `Hidden Until Found` state is introduced, which allows an element to be accessible to find-in-page and fragment navigation, although conditionally an element "_needs to be affected by layout containment_" (essentially if `display` is not `none`, `contents` or `inline`). It appears `hidden="until-found"` is more different from `hidden` than I thought.


## Comparison with `<details>`

`hidden="until-found"` works similarly to `<details>`. Both use `content-visibility` to hide content. However, `<details>` was not meant to work like this when it was introduced. Its original purpose was simply to allow a user to toggle the visibility of content without having to resort to using JavaScript or CSS and its original implementation worked with a `display: none` toggle too. Only when `content-visibility` arrived in browsers was `display: none` replaced by it. 

Notable differences to `hidden="until-found"` are that you **will be able to collapse `<details>` natively** after a match has caused it to expand and `<details>` has user interface additions like a (native) marker, suggesting there is hidden content to expand, while `hidden="until-found"` does not give any visual clues. 


## An accordion use-case with `hidden="until-found"`

Let us make an accordion where we can search in collapsed content, using `hidden="until-found"`. [As a base, we can take this Accordion Example in the ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/examples/accordion/#support-notice-header). That example already makes use of `hidden=""` – the attribute the specs kind of told us _not_ to use here! – to hide content, so to make the content available for find-in-page is as simple as adding `until-found` as a value to that same attribute. 

Consider the following HTML snippet, where JavaScript has been omitted for brevity:

```html
<div id="accordionGroup" class="accordion">
    <h3>
        <button type="button" aria-expanded="false" class="accordion-trigger" aria-controls="sect1" id="accordion1id">
            <span class="accordion-title">
                Some title
                <span class="accordion-icon"></span>
            </span>
        </button>
    </h3>
    <div id="sect1" role="region" aria-labelledby="accordion1id" class="accordion-panel" hidden="until-found">
        Some hidden content.
    </div>
</div>
```

Here we manage to more or less replicate `<details>`, as we can expand the content by searching inside the hidden content, while also being able to collapse it, but there are notable differences.

Firstly, **headings keep their semantic meaning** consistently. `<details>` has a limitation [Scott O'Hara elaborates on in more detail](https://www.scottohara.me/blog/2022/09/12/details-summary.html), but the core issue here is that when you place a heading inside the compulsory `<summary>`, browsers and screen readers could interpret this heading as _presentational_, which messes up the intended semantics of the page.

Secondly, we **do need JavaScript** to control the visibility state of the content and the state of `aria-expanded`. Using JavaScript allows us to let `hidden="until-found"` truly shine here, as we can listen for the `beforematch` event to fire and use that to toggle the visibility state. Interestingly, just like how you can't just place `content-visibility: hidden` somewhere and an element will be searchable for the user agent, you cannot just place a `beforematch` event listener on an element with visually clipped content and expect it to fire. You must use `hidden="until-found"` for this to work.


## About browser support

Chromium has shipped `hidden="until-found"` since 2022 (Chrome 102), Firefox followed in February 2026 (Firefox 148), and Safari 26.2 (December 2025) shipped it as well, together with the `beforematch` event. Safari's support still counts as partial because it does not yet scroll to the revealed match ([WebKit bug 304174](https://bugs.webkit.org/show_bug.cgi?id=304174)).

If a browser does not support `until-found`, it falls back to using `display: none`, as if it were a plain `hidden` attribute, which makes this a neat progressive enhancement. Instead of using the regular fallback, I would rather _show_ the content by default by applying `display: block`. The same principle applies when JavaScript is disabled, except here we need to additionally declare `content-visibility: visible`. With JavaScript disabled, consider hiding the toggle button too, as the content will be visible anyway. Nowadays applying CSS when JavaScript is disabled is easy, since `@media (scripting: none)` is widely available.


## A cursed thought experiment

In case `<details>` is not a viable option, we need to use JavaScript and that means a screen reader user will need to use a button to toggle the visibility of hidden content, whether it has `until-found` or not. There are ways to work around this need to toggle.

I have come up with a cursed way of implementing `hidden="until-found"` by actually _not_ hiding its contents by default. Consider this CSS snippet:

```css
[hidden='until-found'] {
    content-visibility: visible;
    display: block;
    contain: strict; 
    contain-intrinsic-height: 1px;
}
```

Some key points here:

- `content-visibility: visible` is applied to override the default browser implementation of `hidden="until-found"`;
- `display: block` is applied to override any odd `[hidden] { display: none }` in case of a normalise/reset file;
- `contain-intrinsic-height` must be at least `1px`, as otherwise NVDA or the in-browser speech functionality will not announce the hidden content.

Compared to a regular accordion where you deliberately hide content and render it inaccessible, here, the mindset is the opposite.

- Content is accessible by default, albeit visually hidden;
- it is accessible to screen readers without the need to toggle (I was able to verify this with recent versions of VoiceOver, NVDA and JAWS);
- one can browser-search within the hidden content;
- one can interact with interactive elements (links, buttons) within the hidden content and by adding a `focusin` event listener, you can even toggle the visibility state when a user focuses on such an item.

Below is a snippet that implements this experiment. It is simplified to leave only the relevant parts in, including a minimum bit of JavaScript to make the toggle work both on `click` (on the button), on `beforematch` and on `focusin`.

<p class="codepen" data-height="420" data-pen-title="Hidden until-found in use as an accordion" data-version="2" data-default-tab="result" data-slug-hash="QwpBwLm" data-user="roye7777777" style="height: 420px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/editor/roye7777777/pen/01a16504-de67-7157-bcc0-376e510e2a12">
  Hidden until-found in use as an accordion</a> by Roy (<a href="https://codepen.io/roye7777777">@roye7777777</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

There is much to think of here, but there are a few things I want to mention.

The toggle button is still present, even when the visually hidden content is accessible to screen readers. It will still toggle the visibility. For screen reader users, this makes no difference, since all content is readily available to them. To then still find a button that suggests an element is still collapsed, while it actually is not, is wrong and one reason not to use this altogether. You could try to hide the button from screen reader users, but there is not much you can do, really. Applying `aria-hidden="true"` onto a button is wrong as hiding a focusable element from assistive technology is an accessibility failure in itself.

Also: what would happen if you use a screen reader in combination with a magnifier? Content could probably be announced, but the user would not be able to see where this text is coming from, since it is visually hidden. Although it is not uncommon to see this in practice (particularly in these 'read more' articles), it is potentially confusing. 


## Final notes on reader mode

There's one more thing I mentioned earlier in this article that I want to discuss, and it is the `Hidden` state. 

Browsers have a reader mode functionality these days, and their intention is to make content-heavy articles easier to read with less noise. Those who have been testing with this know that reader mode in each browser behaves differently. Each browser engine has a different implementation of this non-standardised concept, and their specific rules and guidelines are often undocumented. Unlike `print` or `noscript`, there is not something like a media query to override a certain undesired state within reader mode and I suppose this restrictiveness is intentional to keep it as clean as possible (read: to prevent developers spamming reader mode with noise anyway).

Rules of thumb for reader mode are generally: let the HTML be semantically correct, have enough content for reader mode to become active, and most importantly in this context: **any hidden content will stay hidden**. Any element with the `hidden` attribute set, even with `until-found` as its value and even when overridden with `display: block`, will always be hidden in reader mode.

To me, when using specifically `hidden="until-found"` and `<details>`, this principle feels wrong. I expect content both `hidden="until-found"` and `<details>` to be _visible_ in reader mode. Yes, these elements are hidden, but they all can natively become visible and that ability, together with this special so-called `Hidden Until Found` state, has been implemented in browsers for a reason after all! Why would in a group of `<details>` all `<details>` be hidden except for the first as it contains an `open` attribute? I hope this behaviour will change in browsers in the future, or at least there will be an option where one can express a desire to show a collapsible element in reader mode.

So, important to remember here is this: if you were to use `hidden="until-found"` in a content-heavy article, you deny users the ability to read all content in reader mode. There is no way to work around this without resorting to duplicating content and rendering it invisible differently by means of `opacity: 0`, clipping, positioning it out of view or whatever nonsense, as then this duplicated content is semantically _not_ hidden. Now _that_ is hell!
