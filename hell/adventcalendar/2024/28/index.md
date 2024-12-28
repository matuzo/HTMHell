---
title: "Boost website speed with prefetching and the Speculation Rules API"
layout: layouts/advent.md
author: "Schepp"
author_bio: "Christian Schaefer, known as \"Schepp\", is a freelance front-end developer and podcaster from Düsseldorf, Germany, and very much in love with Web Performance & CSS."
date: 2024-12-28
tags: advent2024
author_links:
  - label: "Website"
    url: "https://schepp.dev"
    link_label: "schepp.dev"
  - label: "Bluesky"
    url: "https://bsky.app/profile/schepp.dev"
    link_label: "@schepp.dev"
  - label: "Mastodon"
    url: "https://mastodon.social/@Schepp"
    link_label: "@Schepp@mastodon.social"
  - label: "LinkedIn"
    url: "https://www.linkedin.com/in/christian-schaefer-a696041a"
    link_label: "linkedin.com"
intro: "<p>Discover how to enhance website performance with prefetching, prerendering, and the Speculation Rules API.</p>"
image: "advent24_28"
active: true
---

Everybody loves fast websites, and everyone despises slow ones even more. Site speed significantly contributes to the overall user experience (UX), determining whether it feels positive or negative. To ensure the fastest possible page load times, it’s crucial to design with performance in mind. However, performance optimization is an art form in itself. While implementing straightforward techniques like file compression or proper cache headers is relatively easy, achieving deeper optimizations can quickly become complex.

But what if, instead of solely trying to accelerate the loading process, we triggered it earlier—without the user noticing?

One way to achieve this is by prefetching pages the user might navigate to next using `<link rel="prefetch">` tags. These tags are typically embedded in your HTML, but they can also be generated dynamically via JavaScript, based on a heuristic of your choice. Alternatively, you can send them as an [HTML `Link` header](https://www.debugbear.com/blog/resource-hints-rel-preload-prefetch-preconnect#resource-hints-in-http-headers) if you lack access to the HTML code but can modify the server configuration. Browsers will take note of the prefetch directives and fetch the referenced pages as needed.

<aside class="info">

_**⚠︎ Caveat:** To benefit from this prefetching technique, you must allow the browser to cache pages temporarily using the `Cache-Control` HTTP header. For example, `Cache-Control: max-age=300` would tell the browser to cache a page for five minutes. Without such a header, the browser will discard the pre-fetched resource and fetch it again upon navigation, rendering the prefetch ineffective._

</aside>

In addition to `<link rel="prefetch">`, Chromium-based browsers support `<link rel="prerender">`. This tag is essentially a supercharged version of `<link rel="prefetch">`. Known as "[NoState Prefetch](https://developer.chrome.com/blog/nostate-prefetch)," it not only prefetches an HTML page but also scans it for subresources—stylesheets, JavaScript files, images, and fonts referenced via a `<link rel="preload" as="font" crossorigin>` — loading them as well.

### The Speculation Rules API

A relatively new addition to Chromium browsers is the **Speculation Rules API**, which offers enhanced prefetching and enables actual prerendering of webpages. It introduces a JSON-based syntax for precisely defining the conditions under which preprocessing should occur.

Here’s a simple example of how to use it:

```html
<script type="speculationrules">
{
  "prerender": [{
    "urls": ["next.html", "next2.html"]
  }]
}
</script>
```

<aside class="info">

Alternatively, you can place the JSON file on your server and reference it using an HTTP header: `Speculation-Rules: "/speculationrules.json"`.

</aside>

The above `list`-rule specifies that the browser should prerender the URLs `next.html` and `next2.html` so they are ready for instant navigation. The keyword `prerender` means more than fetching the HTML and subresources—it instructs the browser to fully render the pages in hidden tabs, ready to replace the current page instantly when needed. This makes navigation to these pages feel seamless.

Prerendered pages also typically score excellent Core Web Vital metrics. Layout shifts and image loading occur during the hidden prerendering phase, and JavaScript execution happens upfront, ensuring a smooth experience when the user first sees the page.

Instead of listing specific URLs, the API also allows for pattern matching using `where` and `href_matches` keys:

```html
<script type="speculationrules">
{
  "prerender": [{
    "where": { "href_matches": "/*" }
  }]
}
</script>
```

For more precise targeting, CSS selectors can be used with the `selector_matches` key:

```html
<script type="speculationrules">
{
  "prerender": [{
    "where": { "selector_matches": ".navigation__link" }
  }]
}
</script>
```

These rules, called `document`-rules, act on link elements as soon as the user triggers a `pointerdown` or `touchstart` event, giving the referenced pages a few milliseconds' head start before the actual navigation.

If you want the preprocessing to begin even earlier, you can adjust the `eagerness` setting:

```html
<script type="speculationrules">
{
  "prerender": [{
    "where": { "href_matches": "/*" },
    "eagerness": "moderate"
  }]
}
</script>
```

**Eagerness values:**
- `immediate`: Executes immediately.
- `eager`: Currently behaves like `immediate` but may be refined to sit between `immediate` and `moderate`.
- `moderate`: Executes after a 200ms hover or on `pointerdown` for mobile devices.
- `conservative` (default): Speculates based on pointer or touch interaction.

For even greater flexibility, you can combine `prerender` and `prefetch` rules with different eagerness settings:

```html
<script type="speculationrules">
{
  "prerender": [{
    "where": { "href_matches": "/*" },
    "eagerness": "conservative"
  }],
  "prefetch": [{
    "where": { "href_matches": "/*" },
    "eagerness": "moderate"
  }]
}
</script>
```

### Limitations and Challenges

While the Speculation Rules API is powerful, it comes with some limitations:

1. **Browser support:** Only Chromium-based browsers support it. Other browsers lack this capability, so treat it as a progressive enhancement.
2. **Bandwidth concerns:** Over-aggressive settings could waste user bandwidth. Chromium imposes limits to mitigate this: a maximum of 10 prerendered and 50 prefetched pages with `immediate` or `eager` eagerness.
3. **Server strain:** Poorly optimized servers (e.g., no caching, heavy database dependencies) may experience significant load increases due to excessive speculative requests.
4. **Compatibility:** Prefetching won’t work if a Service Worker is active, though prerendering remains unaffected. Cross-origin prerendering requires explicit opt-in by the target page.

Despite these caveats, the Speculation Rules API offers a powerful toolset to significantly enhance perceived performance and improve UX. So go ahead and try them out!

_I would like to express a big thank you to the Webperf community for always being ready to help with great tips and expertise. For this article, I would like to thank Barry Pollard, Andy Davies, and Noam Rosenthal in particular for providing very valuable background information. ❤️_
