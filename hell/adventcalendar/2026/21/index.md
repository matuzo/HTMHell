---
title: "Conditionally loading images"
author: "Sid Vishnoi"
author_bio: "Sid Vishnoi is obsessed with the web platform, exploring every layer from the frontend to browser extensions and engine internals."
date: 2026-12-21
author_links:
  - label: "Site"
    url: "https://sidvishnoi.com/"
    link_label: "Website"
intro: "<p>Stop wasting mobile bandwidth! Conditionally load images using CSS, the HTML picture element, or native lazy loading.</p>"
image: "advent26_21"
active: true
---

In a design I worked on, the hero section featured two images arranged in an asymmetric grid ([preview](./sample-layout.png)). On mobile, stacking both images pushed the actual content too far down, so we showed only one. The second image wasn't purely decorative, but it wasn't worth downloading on a phone either.

We may be tempted to do something like this:

```html
<img
  src="image.png"
  class="desktop-only"
  alt="description of image"
  width="600"
  height="400"
/>

<style>
  @media (max-width: 480px) {
    img.desktop-only {
      display: none;
    }
  }
</style>
```

However, if we check the Network Panel in DevTools, we'll see that the image did load but was only hidden with CSS ([demo](https://test.sidvishnoi.com/conditional-image-loading/css-display-none.html)). So, how can we prevent an image from loading altogether under particular conditions? The condition can be any media query: hide only on mobile, hide only on desktop, or skip an animated GIF when the user prefers reduced motion. In this post, I'll use `max-width: 480px` to imply "mobile device".

Let's explore a few ways to conditionally load images and why you would want to use each. I tested everything here in the latest versions of Chrome and Firefox (desktop and Android) and Safari on desktop, as of writing. I didn't get to test Safari on iOS.

## CSS background image

If the image is decorative only, we can use CSS `background` to define the image URL.

```html
<div class="desktop-only"></div>

<style>
  .desktop-only {
    background: center / cover no-repeat url("image.png");
    max-width: 100%;
    aspect-ratio: 600 / 400;
  }

  @media (max-width: 480px) {
    .desktop-only {
      display: none;
    }
  }
</style>
```

This will correctly prevent loading the image on small viewports ([demo](https://test.sidvishnoi.com/conditional-image-loading/css-background-img.html)), but there are some drawbacks.

First, we need to define the image/container size in CSS for each such image (either via width/height or using aspect-ratio), as our `<div>` has no height. We can't use the image's natural height like with `<img>`. We can use CSS variables to avoid editing our stylesheet for every instance:

```html
<div
  class="desktop-only"
  style="--src: url('image.png'); --width: 600; --height: 400;"
></div>

<style>
  .desktop-only {
    background: center / cover no-repeat var(--src);
    width: 100%;
    max-width: calc(var(--width) * 1px);
    aspect-ratio: var(--width) / var(--height);
  }

  @media (max-width: 480px) {
    .desktop-only {
      display: none;
    }
  }
</style>
```

Second, if we want the image to start loading sooner (on desktop), we'll need to preload it manually with a matching media query. Otherwise, we'll have to wait for the stylesheet to finish loading/parsing first. The HTML parser won't preload URLs from CSS.

```html
<link rel="preload" as="image" href="image.png" media="(width > 480px)" />
```

## HTML `<picture>` element

The `<picture>` element lets us specify multiple image sources that can be adjusted for different media queries. It is often used to load different-resolution images based on device width to save bandwidth, or to use alternative formats (e.g., a smaller AVIF over JPEG when possible). However, we can use the `media` attribute a little more creatively.

To avoid loading an image, we can substitute it with a [transparent 1px image](https://stackoverflow.com/questions/6018611/smallest-data-uri-image-possible-for-a-transparent-image) encoded as a data URI.

```html
<picture class="desktop-only">
  <source
    srcset="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'/%3E"
    media="(max-width: 480px)"
  />

  <img src="image.png" alt="Use alt text folks" width="600" height="400" />
</picture>
```

This approach handles image dimensions as expected. There won't be an image load request (apart from a local data URI) either ([demo](https://test.sidvishnoi.com/conditional-image-loading/html-picture.html)). The browser's speculative preloading (loading the image in the presence of a parser-blocking script) will work appropriately as well, and only on desktop as it should.

By the way, assuming you've passed width and height attributes (which you should to [prevent layout shifts](https://www.aleksandrhovhannisyan.com/blog/setting-width-and-height-on-images/)), this `<picture>` will take up the space/aspect ratio of the `<img>` even when using the other 1px `<source>`. We'll need some CSS to hide that transparent space:

```css
@media (max-width: 480px) {
  picture.desktop-only img {
    display: none;
  }
}
```

## Native lazy loading

If we add `loading="lazy"` to a regular `<img>` and hide it on mobile with `display: none`, the browser won't request it on mobile at all ([demo](https://test.sidvishnoi.com/conditional-image-loading/html-lazy.html))! A lazy image only loads when it's about to become visible, and an image with `display: none` never becomes visible.

```html
<style>
  @media (max-width: 480px) {
    img.desktop-only {
      display: none; /* Prevents loading altogether on mobile */
    }
  }
</style>

<img
  src="avatar.png"
  loading="lazy"
  class="desktop-only"
  alt=""
  width="128"
  height="128"
/>
```

This needs no extra markup. And while `<picture>` element only reacts to media queries, this lazy loading technique respects any CSS that hides the image, including container queries ([demo](https://test.sidvishnoi.com/conditional-image-loading/html-lazy-container-query.html)).

There are a few caveats:

- Images visible on first render on desktop, like my hero images, get delayed by lazy loading. This hurts Largest Contentful Paint (LCP).
- The hiding CSS has to be there at first render, from a regular stylesheet in the `<head>` or an inline `<style>`, not one loaded asynchronously.
- Browsers ignore `loading="lazy"` when JavaScript is disabled, so the image loads then.

User avatars in a long comment thread are a good fit for this approach: we might want to avoid loading these images on compact mobile layouts, and they're rarely visible when the page first loads.

## Using JavaScript (please don't)

Ideally, the above should be our go-to approaches, but for completeness, let's review how we could do it with a little JS.

In the olden days, we used a `data-src` attribute on `<img>` that we turned into `src` with JavaScript to lazy-load images. We can try something like that here as well:

```html
<img
  data-src="image.png"
  src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'/%3E"
  class="desktop-only"
  alt="description of image"
  width="600"
  height="400"
/>
<!-- Transparent placeholder: src above is required for valid markup. -->

<style>
  @media (max-width: 480px) {
    img.desktop-only {
      display: none;
    }
  }
</style>

<script>
  const mobileViewport = window.matchMedia("(max-width: 480px)");
  function loadImages() {
    document.querySelectorAll("img[data-src]").forEach((img) => {
      if (!mobileViewport.matches) {
        img.setAttribute("src", img.dataset.src);
        img.removeAttribute("data-src");
      }
    });
  }
  loadImages();
  // Load later if the viewport grows (resize, rotation, zooming out)
  mobileViewport.addEventListener("change", loadImages);
</script>
```

We can't do the opposite here: keep `src` by default and then turn it into `data-src`, as that'll be too late. We don't get any loading benefits on desktop either. We also need `display: none` on mobile, because the placeholder still takes up space. The same CSS hides the images again if the viewport shrinks after they've loaded. Not sure why someone would do this, unless they want to use JS for everything?

## Conclusion

1. Use `<picture>` with a placeholder `<source>` for images visible on first load, like a hero image. The browser can start loading it early on desktop.
2. Use `loading="lazy"` with `display: none` for images that aren't visible on first load on desktop. It needs the least code.
3. Use a CSS `background-image` for purely decorative images, if you're fine setting dimensions in CSS and adding a preload tag for early loading.
4. Avoid JavaScript for this. Images load later, and you have to handle resizing yourself.
