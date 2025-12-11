---
title: "Semantics beyond the tag name"
author: "Nathan Knowler"
author_bio: "HTML and CSS writer living in [Winnipeg](https://www.youtube.com/watch?v=AjqgTtl3YBQ). Passionate about accessibility, progressive enhancement, and web components. Probably can be found in a mosh pit."
date: 2025-12-19
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
image: "advent25_19"
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

```html
<my-card>
  <header>
    <section>
      <h1>divs suck</h1>
      <h2>and so do classes</h2>
    </section>
  </header>
  <main>
    <section>who needs classes when you have semantic HTML. combine elements however you’d like to explore new possibilities.</section>
  </main>
  <footer>
    <section>
      <nav>
        <a href="/hell">
          <button>
            <label>I have no class</label>
          </button>
        </a>
      </nav>
    </section>
  </footer>
</my-card>

<my-card>
  <header>
    <section>
      <h1>replace all your divs with sections</h1>
      <h2>they’re so semantic</h2>
    </section>
  </header>
  <main>
    <section>whenever I don’t know what element to choose, section is there for me. section is my best friend forever.</section>
  </main>
  <footer>
    <section>
      <nav>
        <a href="/hell">
          <button>
            <label>become semantic with sections</label>
          </button>
        </a>
      </nav>
    </section>
  </footer>
</my-card>
```

Now, this might not seem like gibberish on the surface—it might actually seem like it makes a lot of sense. The problems will become more apparent throughout this post. We cannot simply use HTML elements based on their tag names and expect them to translate to anything actually meaningful.

To be fair, this is to be expected of anyone learning a new language. However, a problem on the web is that authors delude themselves into thinking that they are “writing semantic HTML,” therefore gaining all of the benefits that are understood to come with that like accessibility, and they never advance past that stage.

It’s like when my own child confidently declares, after learning a handful of words in Japanese, “I know Japanese.” It’s cute and I’m not going to argue with it, because they’re a child.

You’re likely not a child though, so I will tell it to you straight: _this is not cute._

Once you’ve recovered from that devastating realization, we can proceed.

To actually write semantic HTML, we need to know what elements mean beyond just what we infer from their tag names and how to use them. So, how do we find that out?

## Where HTML semantics come from

[The HTML standard][html] is what defines HTML elements. For example, we can find the definition of the `<main>` element in [section 4.4.14](https://html.spec.whatwg.org/multipage/grouping-content.html#the-main-element):

> The `main` element represents the dominant contents of the document.

Beyond the definition, the standard also includes rules and guidance for usage:

> A document must not have more than one `main` element that does not have the `hidden` attribute specified.

> A <dfn>hierarchically correct `main` element</dfn> is one whose ancestor elements are limited to `html`, `body`, `div`, `form` without an accessible name, and autonomous custom elements. Each `main` element must be a hierarchically correct `main` element.

From these descriptions, we can gather that using the `<main>` element for the main content of a card component, which can be used multiple times like the ones in the earlier “gibberish” example, would be incorrect:

```html
<my-card>
  <header><!-- … --></header>
  <main><!-- first card main content --></main>
  <footer><!-- … --></footer>
</my-card>
<my-card>
  <header><!-- … --></header>
  <main><!-- second card main content --></main>
  <footer><!-- … --></footer>
</my-card>
```

Tag names are not enough for us to understand what an element is for. We need to adopt HTML’s own definitions for semantic elements.

### Why follow the HTML Standard?

I’m not your god, and neither is the HTML Standard—but if you choose to use HTML elements for how you perceive them, things break in ways you can’t control. Assistive tech, legal requirements, user expectations... it all hinges on the platform’s actual definitions. Ignore them and, well, your documents might just end up [in hell](https://www.htmhell.dev/).

### But what about ARIA? Can’t I just use that instead?

[Accessible Rich Internet Applications][aria], more commonly known by the acronym ARIA, is a set of roles and attributes that can be used in HTML to add accessibility related semantics to web content.

It can be tempting to think that we don’t need semantic HTML, instead we can just sprinkle our <i>divitis</i> with <em>holy</em> ARIA roles and attributes. Well, while this can improve the accessibility of that hoard of elements, we’re likely breaking [the first rule of ARIA usage](https://www.w3.org/TR/using-aria/#firstrule): don’t use ARIA if you don’t need to.

```html
<div role=button>accept div as your lord and saviour</div>
```

Many semantic HTML elements have what’s called <i>implicit ARIA semantics</i>. These are ARIA roles and properties that the browser has mapped for us. Instead of needing to explicitly write out the ARIA semantics for an element each time you use it, we can use semantic HTML elements as a shorthand for these.

```html
<button>This machine kills fascists</button>
```

Beyond simply being a shorthand for a set of ARIA semantics, built-in HTML elements also include the necessary functionality and presentation that would be expected of an element bearing such semantics. In many cases, this means that you don’t need to write any JavaScript for your HTML to work as expected. Using JavaScript in lieu of built-in HTML functionality is wasteful and error prone, degrading the usability of your website.

Now that we understand the folly of ignoring the first rule of ARIA usage, let’s turn our attention to <i>implicit ARIA semantics</i> and how they work in semantic HTML.

## The implicit ARIA semantics of HTML

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

A popular favourite among those first starting out with semantic HTML is the `<section>` element. What is often never realized is that it has no valuable ARIA semantics if it is not named (i.e. its implicit role is `generic`). This makes it not much different than using a `<div>` (i.e. its implicit role is also `generic`).

```html
<section>
  <h2>Insignificant section</h2>
</section>
<section aria-labelledby=section-label>
  <h2 id=section-label>Significant document region</h2>
</section>
```

With that said, please do not go name _all_ of your `<section>` elements!

```html
<section aria-labelledby=section-1-label>
  <h1 id=section-1-label>Top one hundred reason I love sections</h1>
  <p>…</p>
</section>
<section aria-labelledby=section-2-label>
  <h2 id=section-2-label>Section is whatever I want it to be</h2>
  <p>…</p>
</section>
<section aria-labelledby=section-3-label>
  <h2 id=section-3-label>Section is my friend</h2>
  <p>…</p>
</section>
```

A labelled `<section>` element will have [the `region` ARIA role][aria-region]. This is what’s called a <dfn><i>landmark</i></dfn>. [Landmarks](https://tetralogical.com/blog/2022/03/18/landmarks/) are important sections of a document that a user might benefit from easy access to.

The problem here is that everything is a landmark, then nothing is a landmark.

It can be easy to think that labelling your `<section>` elements satisfies the requirement for using them, but that is not the case here. Both the meaning of the tag name and the HTML definition of a `<section>` element is way more generic than the `region` ARIA role. Before you label your `<section>`  elements ensure they make sense as regions, otherwise, you’ll likely be making it more difficult to find what’s important on a page. If you’re already using [a good heading structure](https://tetralogical.com/blog/2022/02/28/headings/) throughout your document, that is good enough for what you’re likely trying to do.

### Context affects implicit semantics

HTML elements can have different implicit ARIA semantics when used in different contexts.

For example, the `<header>` and `<footer>` elements have an important meaning for documents when used outside of the `<main>` element or any other sectioning content element.

```html
<body>
  <header>Header content</header>
  <main>Main content of the document</main>
  <footer>Footer content</footer>
</body>
```

In this scenario, the `<header>` element’s implicit ARIA role is `banner` and the `<footer>` element’s implicit ARIA role is `contentinfo`. Documents should only have one of each of these landmarks.

That does not mean that you cannot use either of these elements in other places within your document. When we review [the definition of a `<header>` element](https://html.spec.whatwg.org/multipage/sections.html#the-header-element) it says:

> “The `header` element represents a group of introductory or navigational aids.”

That implies much broader usage than [the definition of the `banner` role](https://w3c.github.io/aria/#banner):

> “A `landmark` that contains mostly site-oriented content, rather than page-specific content.”

Until 2025, when used inside of the `<main>` element or [sectioning content](https://html.spec.whatwg.org/multipage/dom.html#sectioning-content), `<header>` and `<footer>` elements were mapped with a `generic` role which means they didn’t have any value for accessibility purposes. After relatively recent changes to the latest ARIA spec and HTML-AAM drafts, in these contexts they have been mapped to new ARIA roles: [`sectionheader`](https://w3c.github.io/aria/#sectionheader) and [`sectionfooter`](https://w3c.github.io/aria/#sectionfooter).

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

As of writing, these changes have been implemented in Chromium-based browsers and Safari. [Firefox has yet to implement them](https://bugzilla.mozilla.org/show_bug.cgi?id=1893684). With that said, as these roles are new, the support from assistive technologies will likely be non-existent or quite limited.

The `<header>` and `<footer>` elements are examples of context being an important factor for implicit ARIA semantics. At first, only specific usage was used for setting the landmark roles. Now, later on, the broader usage allowed of these elements in other contexts can be exposed semantically.

### A combinations of these factors affect implicit semantics

Sometimes an element’s implicit semantics are informed by a combination of the factors that we’ve explored so far. Consider the `<aside>` element.

In the following situations, the `<aside>` element’s implicit role is `complementary` (a landmark) because it’s scoped to the `<body>` element or the `<main>` element:

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
    <p><span id=complementary-label>Failed attempt</span> at complementary.
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

## Test, test, test

In the same way that you can spend a whole lot of time writing valid, semantic HTML that has no implicit ARIA semantics, you can also spend a whole lot of time on writing HTML according to the specifications that actually isn’t implemented in any browser or that is implemented incorrectly in browsers. This is why testing is vital.

Testing might look like checking what ARIA roles and properties are computed for elements in a browser’s developer tools ([use the accessibility tree in Chrome/Edge and Firefox](https://devtoolstips.org/tips/en/see-accessibility-tree/) or [Accessibility section of the Node Panel in Safari’s Web Inspector](https://webkit.org/web-inspector/elements-tab/#node-panel)). It also might look like actually using assistive technologies such as screen readers or voice control. It is very helpful to understand how assistive technology users experience various elements and so seeking real feedback is invaluable to the testing process. Just make sure to show anyone you do involve that you value their time and labour.

Testing helps us understand what is valuable and what we should focus on. I can spend a whole lot of time trying to perfectly mark up all of my words using [text-level semantics][html-text-level-semantics], but then realize through testing that I’ve delivered little to no semantic value to assistive technology users.

Courses such as [Sara Soueidan’s Practical Accessibility](https://practical-accessibility.today) or [Marcy Sutton’s Testing Accessibility](https://testingaccessibility.com) are great resources for those wanting to get started with testing various assistive technologies.

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

[aria-region]: https://w3c.github.io/aria/#region
