---
title: "Semantics beyond the tag name"
author: "Nathan Knowler"
author_bio: "HTML and CSS writer living in [Winnipeg](https://www.youtube.com/watch?v=AjqgTtl3YBQ). Passionate about accessiblity, progressive enhancement, and web components. Probably can be found in a mosh pit."
date: 2025-12-22
author_links:
  - label: "Site"
    url: "https://knowler.dev"
    link_label: "knowler.dev"
  - label: "Mastodon"
    url: "https://sunny.garden/@knowler"
    link_label: "@knowler@sunny.garden"
  - label: "Bluesky"
    url: "https://bsky.app/profile/knowler.dev"
    link_label: "@knowler.dev"
intro: "<p>Semantic HTML is the cure to divitis, but we need to go beyond tag names if we want to truly understand how to write it.</p>"
image: "advent25_22"
---

There is a terrible epidemic that plagues the web: <i>divitis</i>.

If you’re unfamiliar, <dfn><i>divitis</i></dfn> is a condition where a website uses an unholy amount of `<div>` elements. Some of the worst cases even include `<div>`s used as buttons—_blasphemy!_

```html
<div class="site-header">
  <div class="site-title">divs r us</div>
  <div class="navigation">
    <div class="link">my favourite divs</div>
    <div class="link">moor divs</div>
  </div>
</div>
<div class="main">
  <div class="content">
    <div class="container">
      <div class="container-inner">
        <div class="card">
          <div class="card-inner">
            <div class="card-header">
              <div>i love div</div>
            </div>
            <div>all my friends are divs</div>
            <div class="card-footer">
              <div class="button">accept div as your lord and saviour</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<div class="site-footer">
  <div class="div-webring">
    <div class="button">join the divitis webring</div>
    <div class="button next">next</div>
    <div class="button prev">previous</div>
  </div>
</div>
```

To avoid <i>divitis</i>, authors are often encouraged to use <i>semantic HTML</i>. As it turns out, HTML has over a hundred elements that are not named `div` or `span`. Semantic HTML elements describe what their content is.

Inspired by this newfound responsibility, authors open the lexicon of HTML elements and begin to compose… _absolute gibberish._

<!-- Copied from Hell #29 -->

```html
<section>
  <aside>
    <div>
      <section>
        <header>
          <a href="/">
            <img src="logo.svg" alt="Logo">
          </a>
        </header>
        <main>
          <a href="/services">Services</a>
          <a href="/products">Products</a>
          <a href="/aboutus">Aboutus</a>
        </main>
        <footer></footer>
      </section>
    </div>
  </aside>
  <section>
    <footer></footer>
    <main>
      <h1>Welcome to Hell</h1>
    </main>
    <footer></footer>
  </section>
</section>
```

To be fair, this is to be expected of anyone learning a new language, however, a problem on the web is that authors delude themselves into thinking that they are “writing semantic HTML,” therefore gaining all of the benefits that are understood to come with that like accessibility, and they never advance past that stage.

It’s like when my own child confidently declares, after learning a handful of words in Japanese, “I know Japanese.” It’s cute and I’m not going to argue with it, because they’re a child.

You’re likely not a child though, so I will tell it to you straight: _this is not cute._

Once you’ve recovered from that devestating realization, we can proceed.

To actually write semantic HTML, we need to know what elements mean beyond just what we infer from their tag names and how to use them. So, how do we find that out?

## Where HTML semantics come from

[The HTML standard][html] is what defines HTML elements. For example, we can find the definition of the `<main>` element in [section 4.4.14](https://html.spec.whatwg.org/multipage/grouping-content.html#the-main-element):

> The `main` element represents the dominant contents of the document.

Beyond the definition, the standard also includes rules and guidance for usage:

> A document must not have more than one `main` element that does not have the `hidden` attribute specified.

> A <dfn>hierarchically correct `main` element</dfn> is one whose ancestor elements are limited to `html`, `body`, `div`, `form` without an accessible name, and autonomous custom elements. Each `main` element must be a hierarchically correct `main` element.

From these descriptions, we can gather that using the `<main>` element for the main content of a card component that’s meant to be used many times throughout a document would be incorrect:

```html
<div class=card>
  <main>
    First card
  </main>
</div>
<div class=card>
  <main>
    Second card
  </main>
</div>
```

Tag names are not enough for us to understand what an element is for. We need to adopt HTML’s own definitions for semantic elements.

### Why follow the HTML Standard?

Now, I’m not your god and neither is the HTML Standard. You don’t have to follow it if you don’t want to. If you choose to use HTML elements for how you perceive them, there will more than likely be undesirable consequences that you cannot control. Consequences like assistive technologies not working well with your documents which can also lead to legal consequences if there are accessibility laws where you live. Who knows? If you don’t follow the HTML Standard, maybe your documents might just end up [in hell](https://www.htmhell.dev/).

### Some elements are “more semantic” than others

Something that’s important to understand about semantic HTML is that, while HTML may define all of its elements, not all elements are meaningful for assistive technologies. With that said, you can spend a lot of time writing valid, semantically correct HTML and accomplish absolutely nothing for what makes semantic HTML the most valuable: [making the web for everyone](https://www.w3.org/TR/w3c-vision/#vision-web).

Beyond the tag name and even HTML semantics, there’s another invisible layer of semantics that we need to understand to write semantic HTML well: implicit ARIA semantics.

## Implicit ARIA semantics

You may be familiar with [ARIA (Accessible Rich Internet Applications)][aria]. ARIA is a set of roles and attributes that can be used in HTML to add accessibility related semantics to web content.

[The first rule of ARIA usage](https://www.w3.org/TR/using-aria/#firstrule) is: don’t use ARIA if you don’t need to. Why? Because many semantic HTML elements and attributes have what’s called implicit ARIA semantics—as well as the built-in functionality necessary for those semantics.

Along with the definitions for each element, the HTML standard includes accessibility considerations for both authors (i.e. you and I) and implementors (i.e. the people implementing the elements in browsers). The linked document for authors is called [“ARIA in HTML”][html-aria] and the one for implementors is called [“HTML Accessibility API Mappings” (HTML-AAM)][html-aam]. The each of these links will jump to the relevant bits for the element in question.

Both of these include what the implicit ARIA semantics are for HTML elements and attributes. “ARIA in HTML” is more geared towards authors: it includes both rules and recommendations for ARIA attribute usage with HTML. HTML-AAM includes specifics of how elements should be mapped to various accessibility APIs including, but not limited to, ARIA.

Turning again to the `<main>` element, we can see that [it has an implicit ARIA role of `main`](https://w3c.github.io/html-aria/#el-main).

If we look at heading elements like `<h1>` or `<h2>`, we see that [they have an implicit ARIA role of `heading` along with an implicit `aria-level` of whatever number is a part of the tag name](https://w3c.github.io/html-aria/#el-h1-h6) (i.e. HTML only includes six heading levels).

Beyond element tag names, there are three details I want to point out in these documents:

1. Both an element’s attributes and its context can effect its implicit ARIA semantics.
2. Some elements do not have implied semantics unless they are named.
3. Not all elements have significant implicit ARIA semantics. That’s not to say they never will, but this gives us a good idea of where we can prioritize our time.

Let’s dig into some examples.

### Attributes affect implicit semantics

Consider the following elements:

```html
<a>Anchor</a>
<a href=https://example.com>Anchor with an <code>href</code> attribute</a>
```

Are these both links?

No, they aren’t. The first is just an anchor element. It’s implicit ARIA role is `generic` which is not interesting for accessibility APIs. CSS also doesn’t even consider it a link as it will not match the `:any-link` or `:link` pseudo-class selectors.

Since the latter anchor element has an `href` attribute, it is considered a link, and therefore has the implicit ARIA role of `link` and can be matched by the above mentioned semantic pseudo-class selectors with CSS.

### Naming affects implicit semantics

A popular favourite among those first starting out with semantic HTML is the `<section>` element. While [the abuses of this element can be extensive](https://www.htmhell.dev/10-section-is-no-replacement-for-div/), what is generally never realized is that it is semantically insignicant if it is not named.

```html
<section>
  <h2>Insignificant section</h2>
</section>
<section aria-labelledby=section-label>
  <h2 id=section-label>Significant document region</h2>
</section>
```

With that said, please do not go name _all_ of your `<section>` elements! If they were meant to be named, then the browser would do this for you. Often adding more landmarks makes it more difficult to identify what’s important on a page.

### Context affects implicit semantics

HTML elements can have different implicit semantics when used in different contexts.

For example, the `<header>` and `<footer>` elements have an important meaning for documents when used outside of the `<main>` element or any other sectioning content element.

```html
<body>
  <header>Header content</header>
  <main>Main content of the document</main>
  <footer>Footer content</footer>
</body>
```

In this scenario, the `<header>` element’s implicit ARIA role is `banner` and the `<footer>` element’s implicit ARIA role is `contentinfo`. Documents should only have one of each of these landmarks.

That does not mean that you cannot use both of these elements in other places within your document, however, if they contain content that should be described by either of those roles, then you likely need to restructure your markup.

As of 2025, when used inside of the `<main>` element or [sectioning content](https://html.spec.whatwg.org/multipage/dom.html#sectioning-content), `<header>` and `<footer>` elements have been mapped to new ARIA roles: [`sectionheader`](https://w3c.github.io/aria/#sectionheader) and [`sectionfooter`](https://w3c.github.io/aria/#sectionfooter).

```html
<body>
  <header>banner landmark role</header>
  <main>
    <article>
      <header>sectionheader role</header>
      <p>Article content</p>
      <footer>sectionfooter role</footer>
    </article>
  </main>
  <footer>contentinfo landmark role</footer>
</body>
```

As of writing, this change has only been implemented in Chromium and WebKit-based browsers. [Gecko has yet to implement them](https://bugzilla.mozilla.org/show_bug.cgi?id=1893684). As these are new roles, the support from assistive technologies will likely be non-existent or quite limited.

### A combinations of these factors affect implicit semantics

Sometimes an element’s implicit semantics are informed by a combination of the factors that we’ve explored so far. Consider the `<aside>` element.

In the following situations, the `<aside>` element’s implicit role is `complementary` because it’s scoped to the `<body>` element or the `<main>` element:

```html
<body>
  <main>
    <p>Main content.
  </main>
  <aside>
    <p>Complementary to the main content, but standalone.
  </aside>
</body>
```

```html
<body>
  <main>
    <p>Main content
    <aside>
      <p>Complementary to the main content, but standalone.
    </aside>
  </main>
</body>
```
If you mark up your blog posts with an `<article>` element which is sectioning content, then unnamed `<aside>` elements have the `generic` role.

```html
<article>
  <h1>Some article</h1>
  <p>Some content, blah, blah, blah…
  <aside>
    <p>Failed attempted at complementary.
  </aside>
</article>
```

The only way to make this element have the `complementary` role is to use `aria-labelledby` or `aria-label`. That could be a challenge if the content has no heading. You may need to be creative about wrapping part of the content to use as a label or introduce a visually hidden label if you want to avoid some of [the translation pitfalls of `aria-label`](https://adrianroselli.com/2019/11/aria-label-does-not-translate.html).

```html
<article>
  <h1>Some article</h1>
  <p>Some content, blah, blah, blah…
  <aside aria-labelledby=complementary-label>
    <p><span id=complementary-label>Failed attempted</span> at complementary.
  </aside>
</article>
```

All of this is not something someone could have inferred from the HTML standard alone. This is why documents like [“ARIA in HTML”][html-aria] and [HTML-AAM][html-aam] are invaluable for good semantic usage.

### Custom elements can have implicit semantics too

[Custom elements][html-custom-elements] are an HTML feature that allow authors to define their own HTML elements. A tag name can be defined as a custom element using the `window.customElements.define()` method in JavaScript. Like built-in HTML elements, custom elements can have their own implicit ARIA semantics. This is set using the [`ElementsInternals`](https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals) API.

Here is an example of defining a custom element and setting an implicit ARIA role for it:

```html
<script>
  class HellButtonElement extends HTMLElement {
    constructor() {
      super();

      const internals = this.attachInternals();

      internals.role = "button";

      // Continue implementing button functionality 🙈
    }
  }

  customElements.define("not-a-div", HellButtonElement);
</script>

<not-a-div>A div is not a button</not-a-div>
```

When you create custom elements, you become responsible for communicating their purpose to other authors. This should also include any implicit semantics you’ve set, as well as, what you consider good authoring practice to be when using them.

I highly recommend using HTML itself as a model for how you build custom elements. In many ways, that might mean thinking less like an author and more like an implementor or a specification writer. “How do I create elements for others to use?” Implicit semantics are an important part of that because they allow you to [put other authors first](https://www.w3.org/TR/design-principles/#priority-of-constituencies).

## Test it in a browser

In the same way that you can spend a whole lot of time writing valid, semantic HTML that has no implicit ARIA semantics, you can also spend a whole lot of time on writing HTML according to the specifications that actually isn’t implemented in any browser or that is implemented incorrectly in browsers. This is why testing is vital.

Testing might look like checking what ARIA roles and properties are computed for elements in a browser’s developer tools. It also might look like actually using assistive technologies such as screen readers or voice control. It is very helpful to understand how assistive technology users experience various elements.

Testing helps us understand what is valuable and what we should focus on. I can spend a whole lot of time trying to perfectly mark up all of my words using [text-level semantics][html-text-level-semantics], but then realize through testing that I’ve delivered little to no semantic value to assistive technology users.

## Go forth and actually write semantic HTML

We’ve learned that:

1. HTML tag names are not a reliable way of understanding what an element is for.
2. The HTML standard defines what semantic HTML elements are for.
3. Some semantic HTML elements also have implicit ARIA semantics, and in some cases that depends on what attributes are set, if the element has an accessible name, the context the element is used in, and even a combination of these things.
4. Custom elements can have implicit ARIA semantics too.
5. Don’t take anyone’s word for it: test it yourself.

## Resources

- [The HTML Standard][html]
- [Accessible Rich Internet Applications (WAI-ARIA)][aria]
- [ARIA in HTML][html-aria]
- [HTML Accessibility API Mappings (HTML-AAM)][html-aam]
- [Screen Reader HTML Support – Lookup](https://tetralogical.github.io/screen-reader-HTML-support/lookup/lookup.html)
- [Tetralogical’s “Browsing with a desktop screen reader”](https://tetralogical.com/blog/2021/09/29/browsing-with-a-desktop-screen-reader/)
  - The first in a series about browsing with various kinds of assistive technologies (linked within).
- [How People with Disabilities Use the Web](https://www.w3.org/WAI/people-use-web/)

[html]: https://html.spec.whatwg.org/multipage/

[html-custom-elements]: https://html.spec.whatwg.org/multipage/custom-elements.html
[html-text-level-semantics]: https://html.spec.whatwg.org/multipage/text-level-semantics.html#text-level-semantics
[html-aria]: https://w3c.github.io/html-aria/
[html-aam]: https://w3c.github.io/html-aam/
[aria]: https://w3c.github.io/aria/
