---
title: "Hidden until found"
author: "Roy Keur"
author_bio: "Front-end developer at Dutch digital and creative agency Gedachtegoed in Amsterdam, Netherlands. Travels frequently by train for leisure, does shamefully not own a bicycle, likes 100% pure chocolate."
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

The `hidden` attribute has always been an odd way of hiding elements. It allows a developer to hide elements with HTML and this by itself has been a source of debate since it was introduced. [A couple of years ago, this attribute was already discussed over here](https://www.htmhell.dev/adventcalendar/2023/11/), but what that article described as the future has now become reality: `hidden` is no longer _truly_ so hidden anymore since we have got a new value for this attribute: `until-found`. 

We were promised in the specs that when you add `hidden` to an element, you make it hidden from all presentations. Since `until-found` has been implemented, I feel being lied to a bit, as this new value seems to break that promise. I would say it is a good idea to revisit this nefarious attribute to see what has actually changed and what we can learn from it.


## Hiding important content with `display: none` has shortcomings

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


_Note: you can read `display: none` here as if the `hidden` attribute was in place. The original example used here, however, used `display: none` and I have retained this. Essentially, both hide elements identically anyway._ 

`display: none` can hide elements very well, but it can produce some issues. If you want to search for "_departure time_" in such an article, you have got two choices: either read the whole article or use the in-browser **find-in-page** functionality that can for instance be triggered by pressing `CMD+F` or `CTRL+F` on a keyboard. If you try to use the latter, however, you will get zero (0) results. Why? If you hide content with `display: none`, you render it not only invisible and inaccessible for the user, but also for the user agent, causing find-in-page to fail to produce any results. 

What also will not work with hidden content is linking to a page anchor (by referring to an `id` attribute set, think of `website.test/some-page#paragraph-1`) and using text fragments in the URL to highlight text (think of `website.test/some-page#:~:text=departure%20time`).


## How `hidden="until-found"` fixes these shortcomings

To make hidden content searchable, we can now use `hidden="until-found"`, which uses `content-visibility: hidden` instead of `display: none`. With `content-visibility`, the element keeps its box, but its contents are not rendered, and the browser retains its state (scroll positions, form values, focus) instead of throwing it away like `display: none` does. It allows a browser to tell content that should _really_ be hidden apart from content that is hidden but should still be searchable. 

When a user searches for a term with find-in-page or text fragments, the browser searches through all searchable content on the web page and in case there is a match, the browser triggers an associated `beforematch` event on the element that contains the match and the `hidden="until-found"` attribute will be removed from the element, before scrolling to the newly revealed match. The removed attribute will not be re-added to the element, even when closing find-in-page, so the element will not be hidden again in the currently active browser session. 

Note: just using `content-visibility` on an element by itself does not make the element searchable though. Using `hidden="until-found"` _does_. Also, it is worth to mention that using `until-found` still does _not_ make content available to screen readers: `hidden` is meant to hide content from all presentations (see below) and a user agent is not a presentation.


## Notes on what specs state about `hidden`

[The specs state the following](https://html.spec.whatwg.org/multipage/interaction.html#the-hidden-attribute) about the `hidden` attribute: "_if something is marked hidden, it is hidden from all presentations, including, for instance, screen readers_". It is fairly strict on what you should use `hidden` for. Using `hidden` on elements that "_could legitimately be shown in another presentation_" (for example, in a tabs pattern) is literally deemed 'incorrect' because "_the tabbed interface is merely a kind of overflow presentation_", explaining you could "equally well" have "one big page with a scrollbar". 

### Incorrect usage of `hidden`

This definition is confusing. I tend to agree with this vision from a stance of "(information on) the internet should be available to all" and "important information should not be hidden anyway", but what bothers me is this: when we _do_ want to temporarily hide content, we should apparently _not_ use `hidden`, but should we also not use `display: none` since that is essentially what `hidden` does? That would truly be strange, as we all use `display: none` to hide elements in all kinds of use-cases, such as accordions, tabs, header navigation menus, etc. Even a closed native `<dialog>` uses `display: none` internally. Is that supposed to be different, then?

### The `Hidden` State

Interestingly, the specs also state this: "_User agents should not render elements that are in the Hidden **state**_". This state is what `hidden` sets `display: none` apart. Applying `display: none` to an element, does not give that element the `Hidden` state. To whom does this matter? Well, basically to no-one. Only the browser cares about this and this gets relevant later on in the article.

So, elements with the `hidden` attribute get the Hidden state, but didn't `until-found` explicitly enable user agents to actually _render_ elements? Perhaps surprisingly, elements with `hidden="until-found"` do _not_ get the `Hidden` state, so `hidden="until-found"` is funnily enough not `Hidden`. Instead, a special `Hidden Until Found` state was introduced, which allows an element to be accessible to find-in-page and fragment navigation, but the element "_needs to be affected by layout containment_" (essentially if `display` is not `none`, `contents` or `inline`). It appears `hidden="until-found"` is more different from just `hidden` than I thought.


## Comparison with `<details>`

Essentially, `hidden="until-found"` works similarly to `<details>`, as both use `content-visibility` to hide content. However, `<details>` was not meant to work like this when it was introduced. Its original purpose was simply to allow a user to toggle the visibility of content without having to resort to using JavaScript or CSS and yes, its original implementation worked with a `display: none` toggle. Only when `content-visibility` arrived in browsers was `display: none` replaced by it, which created a way to expand any `<details>` through find-in-page. 

The notable difference to `hidden="until-found"` is that you **will be able to collapse `<details>` natively** after a match has caused to expand it. Apart from this, `hidden="until-found"` does not come with any additional user interface additions, unlike `<details>` that comes with a marker, suggesting there is hidden content to expand.   


## An accordion use-case with `hidden="until-found"`

Let us make an accordion where we can actually search in collapsed content, using `hidden="until-found"`. [As a base, we can take this Accordion Example in the ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/examples/accordion/#support-notice-header). That example already makes use of `hidden=""` – the attribute the specs kind of told us _not_ to use here! – to hide content, so make the content available for find-in-page is as simple as adding `until-found` as a value to that same attribute. 

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

Essentially, here we manage to more or less replicate `<details>`, as we can search in the collapsed content and we can actively expand and collapse the content, but there are notable differences.

Firstly, **headings keep their semantic meaning** consistently. `<details>` has a limitation in its usage [Scott O'Hara elaborates in more detail about](https://www.scottohara.me/blog/2022/09/12/details-summary.html), but the core issue here is that when you would place a heading inside the compulsory `<summary>`, browsers and screen readers could interpret this heading as _presentational_, which messes up with the intended semantics of the page.

Secondly, we **do need JavaScript** to control the visibility state of the content and the state of `aria-expanded`. Using JavaScript allows us to let `hidden="until-found"` truly shine in here, as we can use the `beforematch` event to our advantage to toggle this visibility state.


## About browser support

Chromium has shipped `hidden="until-found"` since 2022 (Chrome 102), Firefox followed in February 2026 (Firefox 148), and Safari 26.2 (December 2025) shipped it as well, together with the `beforematch` event. Safari's support still counts as partial because it does not yet scroll to the revealed match ([WebKit bug 304174](https://bugs.webkit.org/show_bug.cgi?id=304174)).

If a browser does not support `until-found`, it falls back to using `display: none`, as if it were a plain `hidden` attribute, which makes this a neat progressive enhancement. Instead of relying on its intended fallback, I would rather _show_ the content by default by applying `display: block`. The same principle counts for users who have JavaScript disabled, except here we need to use `content-visibility: visible` and I would suggest hiding the toggle button, too, as the content will be visible for them anyway. It all will not change the semantics of `hidden` and its associated state, but it is better than just keeping it hidden if your intention is to show it anyway at some point.


## A cursed thought experiment

A screen reader user will need to use a button (with JavaScript) to toggle the visibility of hidden content to be able to access the content, whether it has `until-found` or not. In case you would want to let screen readers access hidden content without them having to press a toggle, there are ways to work around this limitation.

I have come up with a cursed way of implementing `hidden="until-found"` by actually _not_ hiding its contents by default. Consider this CSS snippet:

```css
[hidden='until-found'] {
    content-visibility: visible;
    display: block;
    contain: strict; 
    contain-intrinsic-height: 1px;
}
```

What this essentially does is this: it hides content visually, while keeping it searchable for browsers _and_ keeping it available to screen readers. You can use the same JavaScript toggle described in the use-case above to make this work exactly like a 'normal' accordion that uses `hidden="until-found"` to hide its collapsed content.

A few notes on this:
- I apply `content-visibility: visible` to override the default browser implementation of `hidden="until-found"`;
- I apply `display: block` to override any odd `display: none` in case there is a normalise/reset file that sets `[hidden]` to `display: none`;
- `contain-intrinsic-height` must be at least `1px`, as otherwise NVDA or the in-browser speech functionality won't announce the hidden content at all.

Compared to a regular accordion where you deliberately hide content and render it inaccessible, here, the mindset is the opposite.

- Content is accessible by default, albeit visually hidden if there is satisfactory browser support;
- it is accessible to screen readers without the need to toggle (I was able to verify this with the most recent versions of VoiceOver, NVDA and JAWS);
- one can browser-search within the hidden content;
- one can interact with interactive elements (links, buttons) within the hidden content and by adding a `focusin` event listener, you can even toggle the visibility when a user focuses on such an item.

Below is a snippet that implements this experiment. It is simplified to leave only the important parts in.

<p class="codepen" data-height="420" data-pen-title="Hidden until-found in use as an accordion" data-version="2" data-default-tab="result" data-slug-hash="QwpBwLm" data-user="roye7777777" style="height: 420px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/editor/roye7777777/pen/01a16504-de67-7157-bcc0-376e510e2a12">
  Hidden until-found in use as an accordion</a> by Roy (<a href="https://codepen.io/roye7777777">@roye7777777</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

There is much to think of here, but here are a few things I want to mention.

The toggle button is still present, even when the visually hidden content is accessible to screen readers. It will still toggle the visibility. For screen reader users, this makes no difference anymore, since all content is readily available to them. To then still find a button that suggests an element is still collapsed, while it is not _actually_ is wrong and one reason not to use this altogether. One could try to hide the button from screen reader users, but there is not much one can do, really. Applying `aria-hidden="true"` onto a button is wrong, as hiding a focusable element hidden from assistive technology is an accessibility failure in itself. 

Also: what would happen if you use a screen reader in combination with a magnifier? Content would be announced, but the user would not be able to see where this text is coming from, since it is visually hidden. It's potentially confusing.


## A final note on reader mode

There's one more thing I want to mention: browsers these days have a reader mode functionality, and its intention is to make content-heavy articles easier to read with less noise. Those who have been testing with this know that reader mode in each browser behaves differently. Each browser engine has a different implementation of this non-standardised concept, and their specific rules and guidelines are often undocumented.

Rules of thumb for reader mode are generally: let the HTML be semantically correct, have enough content for reader mode to trigger active, and most importantly in this context: **any hidden content will stay hidden**. It means: any hidden content, despite being able to be visible at some point, will always remain hidden in reader mode. To me, when using `hidden="until-found"` and `<details>`, this feels wrong. I expect content in both `hidden="until-found"` and `<details>` to be visible in reader mode. Yes, they are hidden, but they all can natively become visible, and that ability, together with this special so-called `Hidden Until Found` state, has been implemented in browsers for a reason after all! I hope this will change in browsers in the future.

Unlike `print` or `noscript`, we cannot just use a media query to override a certain undesired state. I suppose the restrictiveness in reader mode is intentional to keep it as clean as possible (read: to prevent developers spamming reader mode with noise anyway), but _oh my_, it annoys me. If you were to use `hidden="until-found"` in a content-heavy article with collapsed chapters on a mobile device (to essentially remove the need for a separate table of content), you basically deny users the ability to read any content in reader mode, as in reader mode the presence of the `hidden` attribute _by itself_ will always make the content invisible, regardless what CSS is assigned to it. There is no way to work around this without resorting to duplicating content and rendering it invisible differently by means of `opacity: 0`, clipping, positioning it out of view or whatever nonsense, as then this duplicated content is semantically _not_ hidden. Now _that_ is hell!
