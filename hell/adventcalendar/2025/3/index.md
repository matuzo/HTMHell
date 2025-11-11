---
title: "Speculation rules improvements"
author: "Barry Pollard"
author_bio: "<p>Barry Pollard is a Developer Relations Engineer on the Google Chrome team working on making the web go faster.</p>"
date: 2025-12-03
author_links:
  - label: "Bluesky"
    url: "https://bsky.app/profile/tunetheweb.com"
    link_label: "@tunetheweb.com"
  - label: "Mastodon"
    url: "https://mastodon.social/@tunetheweb"
    link_label: "@tunetheweb@mastodon.social"
intro: "<p>The Speculation Rules API is becoming even better with improved mobile support, and a few other improvements to help speed up your websites.</p>"
image: "advent25_3"
---

The [Speculation Rules API](https://developer.mozilla.org/docs/Web/API/Speculation_Rules_API) allows you to speed up future navigations by prefetching or even prerendering URLS in advance of a user actually clicking a link. When the link is clicked, the speculation is used, and the user experiences a faster load than if no speculation was used.

[Schepp](https://schepp.dev/) covered [the API in last year's post](/adventcalendar/2024/28/) and discussed the `eagerness` value which allowed you to, for example, hover over a link to speculatively prerender it with the simple addition of this rule to your HTML:

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

This hover technique is a common functionality offered by libraries, plugins, and frameworks, but now this is baked right into the browser. Chromium-based browsers only for now, but it is being worked on by Safari and Firefox, and as a progressive enhancement, nothing is broken on non-supporting browsers — they just don't benefit from the performance improvement.

Using mouse hover as a signal works well on desktop, but what about mobile, where "hover" is not really a thing? At least in browser terms — I'm sure many of us have hovered over a link without fingers, but as that is not detected by the browser as an event, we can't act upon it.

Well, solving that is just one of many improvements the API has seen in the last year that we'll cover in this post.

## Improved mobile viewport heuristics

Since hover does not exist, we have updated the `eagerness: moderate` on mobile to instead look at the following heuristics:

- Anchor links within 30% vertical distance from the previous pointer down.
- Anchor links at least 0.5× as big as the largest anchor in the viewport.
- The browser waits 500 milliseconds after the user stopped scrolling.

The aim is to avoid, as much as possible, over-speculating links that users are less likely to click. For example, because they are still scrolling, or they are very small links (terms and conditions and the like!).

You can see this in action in the following video where the [Web Almanac](https://almanac.httparchiv.org) prerenders same-origin links with `moderate` eagerness:

<figure>
  <video controls playsinline muted loop>
      <source src="/images/advent2025/speculation-rules-mobile-viewport-demo.mp4" width=2420 height=1320>
  </video>
  <figcaption><p>An example of scrolling down a mobile page triggering speculations.</p></figcaption>
</figure>
<script>
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!mediaQuery.matches) {
      document.querySelector('video').autoplay = true;
  }
</script>

In the video, you can see that as you scroll down the page, links are being successfully prerendered, ready for the user to browse to the page.

<p class="highlight"><strong>Note:</strong> Speculating has a cost. To both your users and for sites with potential increased traffic and resulting infrastructure usage. Always weigh those costs against the benefit to the user.</p>

To conserve memory, Chrome keeps up to two speculations in memory at a time. As the user scrolls further and new links — which are more likely to be clicked on — enter the viewport, the old prerenders are cancelled. Should these links be re-speculated (for example, but the user scrolls back up), then they will be fetched from the HTTP cache and so prerender even faster.

## `eager` eagerness improvements

As well as the improvements to the `moderate` eagerness, the `eager` value has also been recently changed to offer an option somewhere between `immediate` (where links are speculated as soon as possible) and `moderate`.

On desktop, `moderate` rules trigger after a 10 millisecond hover, and on mobile we consider ALL links in the viewport after the user has stopped scrolling for 100 milliseconds, rather than the more restrictive set of heuristics above.

One common technique is to prefetch the HTML document with `eager` value  as that  is often relatively cheap. Then upgrade this `prefetch` to a full `prerender` on `moderate` when you have more signals that the users may click on the link, and so think it's worthwhile to speculatively start to render the page in full, as prerender has more costs including downloading subresources and using memory and CPU needed to render the page.

```html
<script type="speculationrules">
{
  "prefetch": [{
    "where": { "href_matches": "/*" },
    "eagerness": "eager"
  }],
  "prerender": [{
    "where": { "href_matches": "/*" },
    "eagerness": "moderate"
  }]
}
</script>
```

In addition you can also restrict the links considered for speculating using the `where` object.

## Further improvements to the API

I'll close out with a sneak peek into the future, as one further improvement being worked on is a middle group between the `prefetch` and `prerender`. This is useful for those sites concerned with any negative impact with fully prerendering a page.

A new **Prender Until Script** option is currently available behind a flag in Chrome (`chrome://flags/#prerender-until-script`). As its name suggests, it will start prerendering a page, but pause when it encounters a synchronous `<script>` element. Scripts with the `async` or `defer` attribute (or `module` scripts which are `defer` by default) will be downloaded but not executed.

This means:

- Pages without any JavaScript can be fully prerendered.
- Pages with only async/deferred JavaScript can be fully prerendered, with JavaScript executed on navigation.
- Pages with only sync `<script>` JavaScript can start prerender, but pause before any `<script>` causes any intended consequences. They will continue to download subresources (thanks to the [preload scanner](https://web.dev/articles/preload-scanner)), so they still have a significant performance benefit over `prefetch`.

After enabling the flag, you can use this new mode in exactly the same way as `prefetch` and `prerender`:

```html
<script type="speculationrules">
{
  "prerender_until_script": [{
    "where": { "href_matches": "/*" },
    "eagerness": "moderate"
  }]
}
</script>
```

This enhancement should be released next year, but in the meantime, have a place and <a href="https://bsky.app/profile/tunetheweb.com">let me know</a> how you get on! 

## Conclusion

The Speculation Rules API continues to improve with new options and features to help site owners deliver fast, HTML-driven websites! With our first signs of cross-browser adoption of the API, I'd speculate (boom! boom!) 2026 will be another bumper year for the API and for users of sites that implement it.
