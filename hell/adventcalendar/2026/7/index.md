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

## How `hidden` hides elements

As a quick reminder, the `hidden` attribute uses `display: none` which is defined in the user agent stylesheet. Because it is defined over there, it renders immediately, but it is also as easy to override this behaviour by using a `0-0-0` specificity declaration (looking at you, `:where()`) and this is why we often find a `[hidden]` declaration in reset stylesheets. It is to make sure it _consistently_ hides elements, since an element with the `hidden` attribute that is actually _not_ hidden is kind of cursed.


## Sites that hide important content

Some years ago, various news media found it a good idea to cut stories on their websites in two parts by inserting a 'Continue reading' button at some point in their articles, especially on mobile devices. Below is a simplified snippet of how this concept is applied, even today:

```html
<p>
    You could either take a boat or fly to Heligoland, but the flights are all cancelled due to a lack of available aircraft, so you will have to take a boat.
</p>
<button type="button" aria-expanded="false">
    Continue reading this article
</button>
<p data-readmore-hidden="1" style="display: none;">
    You can either use a catamaran, which takes one hour and fifteen minutes with departure time at 11:30, or take the slower so-called <em lang="de">Seebäderschiff</em> which takes two hours and 30 minutes, with departure time at 9:30.
</p>
```


`display: none` can hide elements very well, but it can produce some issues. If you want to search for "_departure time_" in such an article, you have got two choices: either read the whole article or use the in-browser **find-in-page** functionality that can for instance be triggered by pressing `CMD+F` or `CTRL+F` on a keyboard. If you try to use the latter, however, you will get zero (0) results. Why? If you hide content with `display: none`, you render it not only invisible and inaccessible for the user, but also for the user agent, causing find-in-page to fail to produce any results. 


## How `hidden="until-found"` hides elements differently

To make hidden content searchable, we can now use `hidden="until-found"`, which uses `content-visibility: hidden` instead of `display: none`. With `content-visibility`, the element keeps its box, but its contents are not rendered, and the browser retains its state (scroll positions, form values, focus) instead of throwing it away like `display: none` does. It allows a browser to tell content that should _really_ be hidden apart from content that is hidden but should still be searchable. 

Just using `content-visibility` on an element does not make the element accessible for find-in-page and text fragments in the URL, but using `hidden="until-found"` _does_. Note that `until-found` still does _not_ make content available to screen readers: `hidden` is meant to hide content from all presentations and a user agent is not a presentation.


### What the specs state about `hidden`

The specs state this about the `hidden` attribute: "_if something is marked hidden, it is hidden from all presentations, including, for instance, screen readers_". It is fairly strict on what you should use `hidden` for. Using `hidden` on elements that "_could legitimately be shown in another presentation_" (for example, in a tabs pattern) is literally deemed 'incorrect' because "_the tabbed interface is merely a kind of overflow presentation_", explaining you could "equally well" have "one big page with a scrollbar". 

I tend to agree with this vision from a stance of "(information on) the internet should be available to all" and "important information should not be hidden anyway", but what bothers me is this: when we _do_ want to temporarily hide content, we should apparently _not_ use `hidden`, but should we also not use `display: none` since that is essentially what `hidden` does? It sounds odd to me, as we all use `display: none` to hide elements in accordions, tabs, header navigation menus, etc.

Another interesting sentence can be found in the specs regarding state: ["User agents should not render elements that are in the Hidden state"](https://html.spec.whatwg.org/multipage/interaction.html#attr-hidden). Elements with the `hidden` attribute get the Hidden state, but didn't `until-found` explicitly enable user agents to render elements? Well, perhaps surprisingly: elements with `hidden="until-found"` do _not_ get the `Hidden` state. Instead, they get a special `Hidden Until Found` state, which allows the element to be accessible to find-in-page and fragment navigation, as long as the element is affected by layout containment (essentially if `display` is not `none`, `contents` or `inline`). It appears `hidden="until-found"` is more different from `hidden` than I already thought.


### Comparison with `<details>`

Essentially, `hidden="until-found"` works similarly to `<details>`, except `<details>` was not meant to work like this when it was introduced. Instead, its purpose was to allow a user to simply toggle the visibility of content without having to resort to using JavaScript or CSS and yes, it originally worked with a `display: none` toggle. 

Only when `content-visibility` arrived in browsers was `display: none` replaced by it, which created a way to expand any `<details>` through find-in-page. The notable difference to `hidden="until-found"` is that you **will be able to collapse `<details>` natively** after a match has caused to expand it.


### An accordion use-case with `hidden="until-found"`

Let us make an accordion where we can actually search in collapsed content, using `hidden="until-found"`. [As a base, we can take this Accordion Example in the ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/examples/accordion/#support-notice-header). Since that example already makes use of `hidden=""`, the addition to make the content visible with find-in-page is as simple as adding `until-found` as a value to that attribute.

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

Essentially, here we manage to more or less replicate `<details>`, as we can search in the collapsed content, but there are a few differences.

Firstly, **headings keep their semantic meaning** consistently. `<details>` has a limitation in its usage [Scott O'Hara elaborates in more detail about](https://www.scottohara.me/blog/2022/09/12/details-summary.html), but the core issue is that when you would place a heading inside the compulsory `<summary>`, browsers and screen readers could interpret this heading as presentational, which messes up with the intended semantics of the page.

Secondly, we **do need JavaScript** to control the visibility state of the content in case we want to collapse the accordion. This allows us to let `hidden="until-found"` truly shine in here, as we can use the `beforematch` event to our advantage to toggle the visibility state.


### About browser support

Chromium has shipped `hidden="until-found"` since 2022 (Chrome 102), Firefox followed in February 2026 (Firefox 148), and Safari 26.2 (December 2025) shipped it as well, together with the `beforematch` event. Safari's support still counts as partial, because it does not yet scroll to the revealed match ([WebKit bug 304174](https://bugs.webkit.org/show_bug.cgi?id=304174)).

If a browser does not support `until-found`, it falls back to using `display: none`, as if it were a plain `hidden`, which makes this a neat progressive enhancement. Instead of relying on its intended fallback, I would rather _show_ the content by default by applying `display: block`. The same principle counts for users who have JavaScript disabled, except here we need to use `content-visibility: visible` and I would suggest hiding the toggle button, too, as the content will be visible for them anyway.


## A cursed thought experiment

A screen reader user will need to use a button (with JavaScript) to toggle the visibility of hidden content to be able to access this, whether it has `until-found` or not, but there are ways to work around this.

I have come up with a cursed way of implementing `hidden="until-found"` by actually _not_ hiding its contents by default. Consider this CSS-snippet:

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
- I apply `display: block` to override any odd `display: none` in case there is a normalize/reset file that sets `[hidden]` to `display: none`;
- `contain-intrinsic-height` must be at least `1px`, as otherwise NVDA or the in-browser speech functionality won't announce the hidden content at all.

Compared to a regular accordion where you deliberately hide content and render it inaccessible, here, the mindset is the opposite.

- Content is accessible by default, albeit visually hidden if there is satisfactory browser support;
- it is accessible to screen readers without the need to toggle (I was able to verify this with the most recent versions of VoiceOver, NVDA and JAWS);
- one can browser-search within the hidden content;
- one can interact with interactive items (links, buttons) within the hidden content and by adding a `focusin` eventlistener, you can even toggle the visibility when a user focuses on such an item.

Below is a snippet that implements this experiment. It is simplified to leave only the important parts in.

<p class="codepen" data-height="420" data-pen-title="Hidden until-found in use as an accordion" data-version="2" data-default-tab="result" data-slug-hash="QwpBwLm" data-user="roye7777777" style="height: 420px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/editor/roye7777777/pen/01a16504-de67-7157-bcc0-376e510e2a12">
  Hidden until-found in use as an accordion</a> by Roy (<a href="https://codepen.io/roye7777777">@roye7777777</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

There is much to think of here, but here are a few things I want to mention.

The toggle button is still present, even when the visually hidden content is accessible to screen readers. It will still toggle the visibility, but when using a screen reader, this makes no difference. Whether one collapases or expands, one element ahead is the (hidden) content that is being announced and this is confusing to screen reader users. 

One could try to hide the button from screen reader users, but there is not much one can do. Applying `aria-hidden="true"` onto a button is wrong, as hiding a focusable element hidden from assistive technology is an accessibility failure in itself. 

Also: what would happen if you use a screen reader in combination with a magnifier? Content would be announced, but the user would not be able to see where this text is coming from, since it is visually hidden. 

There are several additional reasons why using this in production would be a bad idea. It can be worse, still. If one really wants a toggle while refraining from using JavaScript and if one wants to commit felonies, one could abuse a checkbox and its `:checked` state to toggle content visible/invisible while applying `hidden="until-found"`, but let's not get onto that territory... 


## A final note on reader mode

There's one more thing I want to mention: browsers these days have a reader mode functionality, and its intention is to make content-heavy articles easier to read with less noise. Those who have been testing with this know that reader mode in each browser behaves differently. Each browser engine has a different implementation of this unstandardized concept, and their specific rules and guidelines are often undocumented.

Rules of thumb for reader mode are generally: let the HTML be semantically correct, have enough content for reader mode to become available, and most importantly in this context: **any hidden content will stay hidden**. It means: any visually hidden content that can eventually be rendered visible, because it is hidden for the sake of aesthetics or usability, will always remain hidden in reader mode, despite being able to toggle its visibility. To me, that feels wrong. I expect content in `<details>` and in `hidden="until-found"` to be visible in reader mode. Yes, they are hidden, but they natively have the ability to become visible, and that ability has been implemented in browsers for a reason after all!

Unlike `print` or `noscript`, we cannot just use a media query to override a certain undesired state. I suppose the restrictiveness is intentional to keep reader mode as clean as possible (read: to prevent developers spamming reader mode with noise anyway), but _oh my_, it annoys me. If you were to use `hidden="until-found"` in a content-heavy article with collapsed chapters on a mobile device, you basically deny users the ability to read the content in reader mode, as in reader mode the presence of the `hidden` attribute by itself will always make the content invisible, regardless of what CSS is assigned to it. There is no way to work around this without resorting to duplicating content and rendering it invisible differently by means of `opacity: 0`, clipping, positioning it out of view or whatever nonsense, as then this duplicated content is semantically _not_ hidden. Now _that_ is hell!
