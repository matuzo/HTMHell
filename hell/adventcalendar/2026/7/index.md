---
title: "Hidden until found"
author: "Roy Keur"
author_bio: "Front-end developer at Dutch digital and creative agency Gedachtegoed in Amsterdam, Netherlands. Travels frequently by train for leisure, does shamefully not own a bicycle, likes 100% pure chocolate."
date: 2026-10-22
author_links:
  - label: "Bluesky"
    url: "https://bsky.app/profile/sprintercity.bsky.social"
    link_label: "sprintercity.bsky.social"
  - label: "Mastodon"
    url: "https://zug.network/@sprintercity"
    link_label: "zug.network/@sprintercity"
intro: "<p>The new hidden until-found attribute allows users to hide content, while keeping it available for the User Agent. An analysis on what this improves, its limitations and its issues, in comparison with several alternatives.</p>"
image: "advent26_7"
active: true
---

The question “How to hide an element?” is about as old as the question “How to center a div?” and its answers are almost equally as diverse, as there are indeed many ways to hide an element:

- use `display: none` (some jokers will add `!important` to the answer “because only _then_ you can be sure it’s gone, right?”);
- use `opacity: 0`;
- use `visibility: hidden` (with its nefarious perk that one can essentially ‘undo’ the hidden visibility in descendents by placing `visibility: visible` on any descendent);
- “one can also just use `position fixed, top -999px, left -999px, width 0px, height 0px` to move it out of view, right?”;
- use the `hidden` attribute.

`hidden` has always been an odd way of hiding elements. It allows you to hide elements by means of HTML and that has been food for debate for a long time. [A couple of years ago, this attribute was already discussed](https://www.htmhell.dev/adventcalendar/2023/11/), but what in the article back then had been predicted as the future, has now become a reality and so I would say it is a good idea revisit this nefarious attribute and see what has changed and what we can learn from it. 

## Why `hidden` and how hidden hides elements (and how it does not)

For those who forgot the backstory: basically, the `hidden` attribute applies `display: none`, which is defined in the UA-stylesheet. It can be applied to any element, but its effect is uncertain, as even a declaration with a specificity of `0-0-0` will override the default behaviour in the UA-stylesheet. This is why oftentimes developers choose to add an explicit `[hidden]` declaration in their reset-stylesheet or wherever, to make sure it actually/consistently hides elements. Not doing so could lead to an element still being visible, despite the presence of the `hidden` attribute and that is kind of cursed... or is it?

The core principle of `hidden` is to be a semantic and readable manner to convey that any element with this attribute _should not_ be available to the user. [User Agents should not display elements using this attribute](https://html.spec.whatwg.org/multipage/interaction.html#attr-hidden).


The `hidden` attribute comes along with a few special features in JavaScript, like other attributes that can exist without a value associated to it. One does not need to use `setAttribute` (the reason why this crazy `hidden="hidden"` pops up in the wild sometimes as some do not seem to know they can leave the second argument empty), as one can use `element.hidden = true`. It could make you think that this is some kind of boolean attribute, but it's not, as it is an enumerated attribute, since `hidden="false"` will still hide your element.


### An analysis on what the specs state about `hidden`

The specs are fairly strict on what you should use `hidden` for. Using `hidden` on elements that "_could legitimately be shown in another presentation_" (for example in a tabs pattern) is literally deemed 'incorrect' because "_the tabbed interface is merely a kind of overflow presentation_", explaining one could "equally well" just have "one big page with a scrollbar". 

I tend to agree with this vision from a stance of "(information on) the internet should be available to all" and "important information should not be hidden anyway", but when we _do_ want to temporarily hide content... we should _not_ use `hidden`, therefore also not `display: none` since that is essentially what `hidden` does? It feels so conflicting, as we all use `display: none` to hide things in e.g. accordions, tabs, header navigation menus, etc.  


### Should you use `hidden`?

I have wondered since the beginning what `hidden` is good for, _at all_, if `display: none` basically does the same thing. If most of the use-cases I can come up with would not be in the spirit of what it is supposed to do. I could even go as far as stating that using the `hidden` attribute is a bad practice due to its weak default in the UA-stylesheet; its strict definition in the specs that seem too strict and is it _really_ that semantic? If it actually were _that_ semantic, what would be the added value? Does `hidden` make an element _more hidden_ than by using `display: none`? Also, if I would declare `display:block` on a `[hidden]` selector, any element with this will become visible anyway and there is not a single screen reader that will keep on announcing an element with this attribute as being hidden.

If I were you, I would not use it _as-is_. Surely, I could keep on arguing about "just show whatever important information you have!", but I know _very well_ that there are _perfectly acceptable and reasonable_ arguments and use-cases to hide certain fragments of content. If one has to/wants to hide elements, just adding `hidden` (or `display: none`) will not make an element more (or less) accessible, as just toggling this visibility will not suffice (speaking about using some `aria` attributes alongside). 


## People who use the in-browser find-in-page functionality

In the spirit of 'don't hide important content': if you hide content in an accordion or in tabs, you render it not only invisible, but also inaccessible. A user must have interaction with e.g. a button first to render the content visible and to be able to see the content.

What if you do not have a button at your disposal or simply do not want to press open tens of items in an imaginary (probably AI-slopped, SEO-optimized) FAQ-list? In that case, you want to scan through the page by using the in-browser find-in-page functionality (triggered by e.g. CMD+F / CTRL+F). Well, you cannot, as you will get zero (0) results, even if you _know_ there is content _somewhere_ on that page. Why? Any element with `display: none` will be rendered invisible, and the browser will not know about its contents. 

### Examples of sites that hide important content

A few examples of sites where important content is being hidden are news media, blogs and other sites with articles that contain long chapters. Expecially news media found it several years ago a good idea to cut their articles in half by inserting a 'Continue reading' button, especially on mobile devices, as it would increase ad revenue and as it actually registered how many users actually _read_ an article. By doing this, they deliberately hide parts of an article and if the user wants to read the whole article, they press a button to load the remaining content. Below is an example of how certain well known news media do this to this day:

```html
<p>Lorem ipsum dolor sit amet.</p>
<button type="button" aria-expanded="false">
    Read More
</button>
<p data-readmore-hidden="1" style="display: none;">
    Consectetur adipiscing elit.
</p>
```

Imagine you visit such a page, and you want to only see if for instance a particular person is mentioned. You probably do not want to spend all of your time reading the whole article, so you would reach for the in-browser find-in-page functionality. Unfortunately, your query returns no results and by then you would probably leave if you did not know there is a 'continue reading' button somewhere that could possibly contain the information you were looking for. That would be quite a shame, wouldn't it? 


Other types of content-heavy websites tend to be 'smart' by treating headings as buttons for imaginable accordions, so a user can expand content within a certain chapter of their interest. On a mobile device, where space is sparse, it removes the need for a long and prominent table of contents, as a group of collapsed chapters will function like a table of contents by themselves. The only issue, however, is that to hide the content, one had to resort to using `display: none` and especially in articles like these, you would probably want to globally search for certain important data as well, only to find nothing with the find-in-page functionality, as everything is collapsed and therefor inaccessible. To work around this problem, one could expand every single chapter in that article (from the bottom up of course, as from top to bottom means you have to scroll down each time to get to the next chapter, right?), and _then_ be able to find results, but _man_, that is just tedious.


## The "solution": `hidden="until-found"`

This inability to search within hidden content you later might want to show anyway is why `hidden="until-found"` has come available in browsers, despite what the specs state about what you should not use `hidden` for. 


### How hidden until found hides content, until it is found

Instead of using `display: none`, it uses the newer `content-visibility: hidden` property. What `content-visibility` does different, is that it does not remove the element's layout box from the DOM, while effectively not rendering it either. In other words: instead of having to repaint and re-render a hidden element each time it is hidden by `display: none`, now we can _retain_ the _state_ and the calculated _space_ for its content. The practical difference for users: the browser can now make a difference between content that should _really_ be hidden and content that should be hidden while its content should still be indexable. Any element that has `hidden="until-found"` on it, will be available for the in-browser find-in-page functionality and even by using text fragments in the URL.

When a user searches for a certain text, the browser triggers an associated `beforeMatch` event, which will remove the `hidden="until-found"` attribute on the element in case that element contains an active match. Any content that used to be hidden with `hidden="until-found"` will remain visible. Even when the user closes the in-browser find-in-page functionality, the `hidden` attribute will not return in that browser session: it is gone for good.


### How it is different from `<details>`

Essentially, `hidden="until-found"` works similarly to `<details>`, except `<details>` was not meant to work like this when it was introduced. Instead, its purpose was to allow a user to simply toggle the visibility of content without having to resort to using JavaScript or CSS and yes, it originally worked with a `display: none` toggle. 

It was only by the time `content-visbility` was introduced in browsers, that `display` had been replaced by `content-visibility`, thus creating a way to expand any `<details>` by using the in-browser find-in-page functionality, but the notable difference between this and `hidden="until-found"` is that one _will be able_ to collapse `<details>` natively after a match has expanded it. 

<div class="highlight u-mb">
Note: do not use <code>&lt;details&gt;</code> to hide content in semantic content-heavy articles. <code>&lt;details&gt;</code> requires a <code>&lt;summary&gt;</code> as its first child and to me, regardless what the specs state, the <code>summary</code> is essentially a button. Even though <code>summary</code> is not supposed to have a role in browsers (by the specs), browsers <em>do</em> give them a role and many screen readers <em>will</em> announce the <code>summary</code> as a button. If you were to place a <strong>heading inside a button, the heading would lose its semantic meaning</strong>, since any children of a button are rendered <em>presentational</em>. To make matters worse, <code>summary</code> is implemented inconsistently in browsers and screen readers: one gets inconsistent results and might get a different semantical result of a page than intended. Avoid this.
</div> 


### A use-case for `hidden="until-found"`

Below is an example of `hidden="until-found"` as an alternative for the situation described above. Here we manage to let 
- headings semantically stay headings 
- while also let these headings function like buttons to collapse content 
- while making sure the hidden content is indexable by the in-browser find-in-page functionality.

The only condition, though, is that we **need JavaScript** to control the visibility state of the content:

```html
<section data-section-id="1" aria-labelledby="heading">
    <div>
        <h2 id="heading">Chapter</h2>
        <button type="button" 
                aria-controls="content" 
                aria-labelledby="heading" 
                aria-expanded="false">
            <span class="icon" aria-hidden="true"></span>
        </button>
    </div>
    <div id="content" hidden="until-found">
        <p>Lorem ipsum dolor sit amet.</p>
    </div>
</section>
```

One can listen for the `beforeMatch` event to toggle the visibility state through JavaScript and by keeping a visibility state in JavaScript, one can re-apply the `hidden="until-found"` attribute again to the element to collapse it once more. 

Aside `beforeMatch`, there is also this terribly long event called `contentvisibilityautostatechange`, which fires when `content-visibility` gets any other state than `auto`, but this seems to fire once and only once and its purpose is not the same as `beforeMatch`. 

By the way, if a user has JavaScript disabled, we can declare the following to make sure we render all hidden content visible anyway:

```html
<noscript>
    <style>
        [hidden="until-found"] {
            display: block; /* just in case a browser does not support content-visibility */
            content-visibility: visible;
        }
    </style>
</noscript>
```

## About browser support

Chromium has shipped `hidden="until-found”` since 2022, Firefox finally shipped it at the beginning of 2026 and although it seems Safari does still not support this, to me, it nevertheless works as expected, as if it were shipped anyway, since Safari supports both `content-visibility` and the `beforeMatch` event (this is important!) and together, Safari still is able to capture matches and it is able to remove the `hidden` attribute on elements where these matches are found. 

Either way, supported or not yet, if a browser does not support `until-found` as a value, it will fall back to using `display: none` as if it only was `hidden`. It makes this a neat progressive enhancement, but like what I wrote about users with JavaScript disabled, it is better to just show everything by default, so `display: block` would be your better fallback.


## The `hidden` specs revisited

Now we have `hidden="until-found"` as a tool in the toolbox, which allows us to show hidden content anyway, while otherwise it would stay hidden. To me, it leads to conflicting thoughts. The specs are clear about the usage of `hidden`: "if something is marked hidden, it is hidden from all presentations, including, for instance, screen readers", but hey, now we have `hidden="until-found"` and this deliberately allows us to still access hidden content through the in-browser find-in-page functionality. What does one want to convey with this? 

A screen reader makes no difference between interpreting an inline `style="display:none"` and `hidden`, and it even announces content that contains a `hidden` attribute when a developer rebels and declares `[hidden] { display: block }` to forcibly render it visible. Using `hidden="until-found"` basically tells me: you _actually_ want to make this content available at some point, and this conflicts with the whole primary meaning of the `hidden` attribute in the first place. 

Speaking about screen readers: these do not function like the in-browser find-in-page functionality: `hidden` content actually is and stays hidden, even when `until-found` is used. A screen reader user will need to use a button to toggle the visibility of hidden content to be able to access it... or do they? 

### A cursed thought experiment

Consider this:
```css
[hidden='until-found'] {
    content-visibility: visible;
    display: block;
    contain: strict; 
    contain-intrinsic-height: 0;
}
```

What this essentially does is this: it hides content visibly (by clipping it with a contain intrinsic height restriction), while keeping it indexable for browsers _and_ for screen readers. You can use the same JavaScript toggle described in the use-case provided above to let a button toggle make this work exactly the same as a 'normal' `hidden="until-found"` accordion.

A few additional notes on this:
- I apply `content-visibility: visible` to override the default browser implementation of `hidden="until-none”`;
- I apply `display: block` to override any odd `display: none` in case you have a normalize/reset file that sets `[hidden]` to `display: none` (use `!important` with caution);
- I use `contain: strict` here, not just `size`. This is because e.g. any link in hidden (essentially clipped) text will become visible in the hidden (reserved!) area. If a browser does not support this, one could use `overflow: clip` (not `hidden` as any tab into this content will make the browser ‘scroll’ to any focusable element, thus messing with the alignment of text one cannot fix without additional JavaScript).
- I use `contain-intrinsic-size: 0` to let the content container collapse. If a browser would not support this, one could implement a fallback with `height`, but this value must at least be `1px`, as otherwise NVDA won’t announce the hidden content at all.

Compared to a regular accordion where one deliberately hides content and renders it inaccessible, here, the mindset is the opposite.
- content is accessible by default, be it visually hidden;
- it is accessible to screen readers (I was able to verify this with VoiceOver, NVDA and JAWS);
- one can browser-search within the hidden content;
- one can still interact with interactive elements and by using some JavaScript, one can listen for focus and toggle visibility to show content anyway, but aside of a listener for `beforeMatch`, one also needs an eventlistener for `focusIn`, to achieve the same visibility toggle effect as if one were to use the in-browser find-in-page functionality.

To make all this sound even more crazy: any button to toggle the hidden content visible has to contain `aria-hidden="true"`, as this button now is no longer needed for screen readers: the content is already available for them after all!

<div class="embed_container" style="border: 6px solid #000;margin:0 0 2.4rem;">
    <p class="codepen" data-height="420" data-pen-title="Hidden until-found in use as an accordion" data-version="2" data-default-tab="result" data-slug-hash="QwpBwLm" data-user="roye7777777" style="height: 420px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
      <span>See the Pen <a href="https://codepen.io/editor/roye7777777/pen/01a16504-de67-7157-bcc0-376e510e2a12">
      Hidden until-found in use as an accordion</a> by Roy (<a href="https://codepen.io/roye7777777">@roye7777777</a>)
      on <a href="https://codepen.io">CodePen</a>.</span>
    </p>
    <script async src="https://public.codepenassets.com/embed/index.js"></script>
    <style>.embed_container > .cp_embed_wrapper{margin: 0;}</style>
</div>

## A note on reader mode

There’s one more thing I want to mention: browsers these days have a reader mode functionality, and its intention is to make content-heavy articles easier to read with fewer noise. Those who have been testing with this know that reader mode in each browser behaves differently. Each browser engine has a different implementation of this unstandardized concept, and their specific rules and guidelines are often unavailable. 

Rules of the thumb for reader mode are generally: let the HTML be semantically correct, let there be sufficient content in order to make it trigger reader mode available and most importantly in this context: **any hidden content will stay hidden**. It meand: any visually hidden content that eventually can be rendered visible as it is hidden for the sake of aesthetics or usability, will always remain hidden in reader mode, despite being able to toggle its visibility. To me, that feels wrong. I expect content in `<details>` and in `hidden="until-found"` to be visible in reader mode. Yes, they are hidden, but they natively have the ability to become visible, and that ability has been implemented in browsers for a reason after all! 

Unlike `print` or `noscript`, we cannot just use a media query to override a certain undesired hidden state in some states. I suppose this is intentional to keep reader mode as clean as possible (read: to prevent developers spamming reader mode with noise anyway), exactly by being strict on what is allowed to use, but _o my_, annoys me. If you were to use `hidden="until-found"` in a content-heavy article with collapsed chapters on a mobile device, you basically deny users the ability to read the content in reader mode, as in reader mode the presence of the `hidden` attribute by itself will always make the content invisible, irrelevant of what CSS is assigned to it. There is no way to work around this without resorting to duplicating content and rendering it invisible differently by means of `opacity: 0`, clipping, positioning it out of view or whatever nonsense, as then this duplicated content is semantically _not_ hidden. Now _that_ is hell!
