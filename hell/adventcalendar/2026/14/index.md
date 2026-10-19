---
title: "I added the `crossoriginstorage` attribute to my `link` and `script` tags, and you won't believe what happened next"
author: "Thomas Steiner"
author_bio: "Tom is a Developer Relations Engineer on the Google Chrome team."
date: 2026-12-14
author_links:
  - label: "Site"
    url: "https://blog.tomayac.com"
    link_label: "Website"
intro: "<p>Short introductory text</p>"
image: "advent26_1"
active: true
---
Remember the "good old days" when we were all told to [use a CDN](https://web.archive.org/web/20130414101422/https://developer.yahoo.com/blogs/ydn/high-performance-sites-rule-2-content-delivery-network-7173.html)
and to agree on the same CDN URLs for maximum performance due to cache hits?

## The "good old days"

Let's teleport us all back to the times when saying "HTML5" was considered cutting-edge. HTML5 Rocks. HTML5 Boilerplate. Rings a bell? Alright, let's dive in then! Up until [h5bp/html5-boilerplate#2225](https://github.com/h5bp/html5-boilerplate/pull/2225/changes), the, at the time, highly popular [HTML5 Boilerplate](https://html5boilerplate.com/) template included the following HTML snippet:

```html
<script
    src="https://code.jquery.com/jquery-3.5.0.min.js"
    integrity="sha256-xNzN2a4ltkB44Mc/Jz3pT4iU1cmeR0FkXs4pru/JxaQ="
    crossorigin="anonymous"
></script>
<script>
  window.jQuery || document.write('<script src="js/vendor/jquery-3.5.0.min.js"><\/script>')
</script>
```

There's a lot going on here, so let's unpack what's in the first `<script>` tag:

* `src="https://code.jquery.com/jquery-3.5.0.min.js"`: This points at a specific [versioned URL of jQuery](https://code.jquery.com/jquery-3.5.0.min.js) on the official [jQuery CDN](https://releases.jquery.com/).
* `integrity="sha256-xNzN2a4ltkB44Mc/Jz3pT4iU1cmeR0FkXs4pru/JxaQ="`: This is a [Subresource Integrity](https://developer.mozilla.org/docs/Web/Security/Subresource_Integrity) (SRI) hash that ensures the fetched file has not been tampered with.
* `crossorigin="anonymous"`: Cross-origin requests that use Subresource Integrity must use the [Cross-Origin Resource Sharing](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS) (CORS) protocol. The `crossorigin` attribute is needed because, by default, a resource loaded from a document's HTML is loaded in `no-cors` mode.

## Trust, but verify

Using third-party CDNs _without_ `integrity` requires you to trust the CDN provider to not tamper with the files being served. HTML5 Boilerplate did so until [h5bp/html5-boilerplate#1904](https://github.com/h5bp/html5-boilerplate/pull/1904/changes) landed. And because on the Internet we can't have nice things, eventually what had to happen happened: this naive trust in CDNs to be a good thing was eroded by incidents like the [polyfill.io takeover](https://blog.cloudflare.com/automatically-replacing-polyfill-io-links-with-cloudflares-mirror-for-a-safer-internet/).

Luckily, HTML5 Boilerplate itself was spared, and the jQuery CDN did _not_ tamper with the data it serves, which you can verify with my [SRI Hash Generator](https://tomayac.github.io/sri-hash/?url=https%3A%2F%2Fcode.jquery.com%2Fjquery-3.5.0.min.js&algorithm=sha256). The highlighted hash matches the one from the code snippet earlier in the article.

![Running jQuery 3.5.0 through the SRI Hash Generator shows that the hash matches the one from the code snippet earlier in the article.](jquery-hash.png)

<p class="highlight"><strong>Note:</strong>
  Rather than use mine, better use an established <a href="https://srihash.org/">SRI hash generator</a>! I couldn't find a generator that would let me create linkable URLs, so I created one, but also because I could have just hard-coded my generator to always spit out the expected hash. Trust no one on the Internet, trust me, bro!
</p>

Had they tampered with the data, the calculated hash wouldn't match the expected hash, `sha256-xNzN2a4ltkB44Mc/Jz3pT4iU1cmeR0FkXs4pru/JxaQ=`, and the browser would have outright refuse to load the script.

This is then where the second `<script>` of the boilerplate comes into play: the fallback script that loads a local copy of jQuery if the CDN version fails. It first checks if `window.jQuery` is defined, which is the case if the CDN version has loaded successfully, and if not, it dynamically writes a `<script>` tag to load the local version.

## Why on the Internet we can't have nice things?

Remember how I wrote before that on the Internet we can't have nice things? This is true because of malicious takeovers like in the case of polyfill<span>.</span>io, but also because of a general type of attack that's based on timing how long a resource took to load. For example, imagine an attacker wanted to track you across different websites.

On site&nbsp;A, the attacker might load a script I minted just for you for the sole purpose of the attack (so no other site can have cached it before). On site&nbsp;B, which the attacker suspects you also frequent, they then load the same script. By comparing the load times, they can potentially correlate your visits across these sites. (On site&nbsp;B, the script gets served faster from the cache than from the network if you were on site&nbsp;A before.) This type of attack is known as a [cache-timing attack](https://en.wikipedia.org/wiki/Cross-site_leaks#Cache-timing_attacks), and it was used, for example, for [cross-site leaks](https://sirdarckcat.blogspot.com/2019/03/http-cache-cross-site-leaks.html).

## Cache isolation

While the problem of tampered-with code is solved by Subresource Integrity (SRI) without any collateral damage, cache-timing attacks required browsers to pull out a sledgehammer and isolate all caches, rendering the above attack impossible, but also breaking all legitimate cross-origin caching like the one used for CDNs and shared resources.

Since 2020, all major browsers have isolated their caches:

* [Safari by top-level `eTLD+1`](https://webkit.org/blog/8613/intelligent-tracking-prevention-2-1/#:~:text=their%20shorter%20expiry.-,Verified%20Partitioned%20Cache,-WebKit%20implemented%20partitioned)
* [Chrome by top-level `scheme://eTLD+1` and frame `scheme://eTLD+1`](https://developer.chrome.com/blog/http-cache-partitioning/)
* [Firefox by top-level `scheme://eTLD+1`](https://blog.mozilla.org/security/2021/01/26/supercookie-protections/)

## Why we might be able to have nice-ish things

On the Chrome team, we're working on bringing the legitimate cross-origin caching benefits back to the browser with a new dedicated API called [Cross-Origin Storage](https://github.com/WICG/cross-origin-storage/) (COS). COS is a content-addressable browser cache that shares files across origins by hash, with k-anonymity-based availability gating to prevent cross-site tracking. Again that's a lot to digest, so let's break it down.

## Content addressability

Usually when we want to address resources on the Web, we use URLs, unique resource identifiers. An example is `https://code.jquery.com/jquery-3.5.0.min.js`. It uniquely _addresses_ a resource, but without integrity checks, we can't guarantee that it actually serves in the tin what it says on the tin. By changing our mindset from thinking in terms of "where" a resource is located to "what" a resource is, we can start to think about content-addressable caching. If we say "this resource is identified by its hash", like `sha256-xNzN2a4ltkB44Mc/Jz3pT4iU1cmeR0FkXs4pru/JxaQ=`, then we can safely share it across origins without worrying about tampering.

Remember how in the very beginning of the article I wrote "agree on the same CDN URLs"? This is in fact what made the effects of cache isolation not as drastic as you intuitively might have thought they were. Turns out, most developers did _not_ agree on the same URLs (and versions), so both [Chrome](https://developer.chrome.com/blog/http-cache-partitioning#what_is_the_impact_of_this_behavioral_change) and [Firefox](https://blog.mozilla.org/security/2021/01/26/supercookie-protections/#:~:text=Our%20metrics%20show%20a%20very%20modest%20impact%20on%20page%20load%20time%3A%20between%20a%200.09%25%20and%200.75%25%20increase%20at%20the%2080th%20percentile%20and%20below%2C%20and%20a%20maximum%20increase%20of%201.32%25%20at%20the%2085th%20percentile.) observed relatively modest impact of cache isolation on page load times.

Back to jQuery. Is the jQuery addressed by
`https://unpkg.com/jquery@3.5.0/dist/jquery.min.js` the same jQuery as the one addressed by `https://code.jquery.com/jquery-3.5.0.min.js`? The answer is yes, confirmed by my [SRI Hash Generator](https://tomayac.github.io/sri-hash/?url=https://unpkg.com/jquery@3.5.0/dist/jquery.min.js&algorithm=sha256) (that I invite you to verify against whatever SRI hash generator you trust).

The problem now is that to the browser, despite the matching `integrity` attributes, these are still considered two different resources because they have different URLs and because they are requested from different origins.

If this is your site…

```html
<!-- Your site -->
<script
    src="https://code.jquery.com/jquery-3.5.0.min.js"
    integrity="sha256-xNzN2a4ltkB44Mc/Jz3pT4iU1cmeR0FkXs4pru/JxaQ="
    crossorigin="anonymous"
></script>
```

…and this is my site…

```html
<!-- My site -->
<script
  src="https://unpkg.com/jquery@3.5.0/dist/jquery.min.js"
  integrity="sha256-xNzN2a4ltkB44Mc/Jz3pT4iU1cmeR0FkXs4pru/JxaQ="
  crossorigin="anonymous"
></script>
```

…the browser will download the same resource for both sites. 

Cross-Origin Storage aims to enable browsers to recognize and share identical resources across different origins, reducing redundant downloads and improving performance.

## Cross-Origin Storage

The proposed COS API introduces an imperative `navigator.crossOriginStorage.getFileHandle()` API through which web apps store and retrieve large files across origin boundaries, identified by a cryptographic hash. You can read all about it in the [COS explainer](https://github.com/WICG/cross-origin-storage/).

<img src="cos-logo.svg" alt="Cross-Origin Storage (COS) logo, consisting of a folder icon with a crossing person." width=200 height="171">

This is the HTMHell advent calendar, so I want to exclusively focus on the HTML integration we're proposing for the COS API. At its core, it's just one new attribute, `crossoriginstorage` (no dashes, those are reserved for potential [HTML custom attributes](https://github.com/WICG/webcomponents/issues/1029), which I root for).

```html
<script
  src="https://unpkg.com/jquery@3.5.0/dist/jquery.min.js"
  integrity="sha256-xNzN2a4ltkB44Mc/Jz3pT4iU1cmeR0FkXs4pru/JxaQ="
  crossoriginstorage
  crossorigin="anonymous"
></script>
```

## Sharing levels

The `crossoriginstorage` attribute can take different values that determine the sharing level of the resource:

* Omitting the value (`crossoriginstorage`) or setting it to the empty string (`crossoriginstorage=""`) keeps the file readable by [same-site](https://web.dev/articles/same-site-same-origin#same-site-cross-site) origins only. This is the default, and it fits resources shared across all of an organization's own subdomains.
* Passing a list of space-separated origins (<code>crossoriginstorage="<span>https://</span>write.example <span>https://</span>calculate.example"</code>) restricts access to those origins and their same-site origins. Use this for proprietary resources shared across a company's own properties, and for anything where you don't expect global cache hits. With the list form, whoever serves the bytes needs to authorize each origin in the list using the `Cross-Origin-Storage-Allow-Origin` header.
* Passing `crossoriginstorage="*"` makes the file globally available, subject to the availability gating through the Public Hash List described later.

So back to the jQuery example. This is a resource that is (still) widely used across many sites, but of course it's not something you'd use today (not jQuery per se, just this particular old version). Instead, let's use something as non-controversial as Tailwind. At the time of this writing, the latest version is  `4.3.3`, and it can be loaded from a CDN like jsDelivr with the `crossoriginstorage` attribute:

```html
<script
  src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4.3.3/dist/index.global.js"
  integrity="sha256-pgx4VjCgYZaAjL555ve9tKvMj0QhpHtW8pM4/ISAXjs="
  crossoriginstorage="*"
  crossorigin="anonymous"
></script>
```

<iframe style="border: 6px solid #000;" allow="cross-origin-storage" src="tailwind-demo.html" width="100%" height="300"></iframe>

When the browser encounters this today, absolutely nothing different will happen than when you had loaded the resource without `crossoriginstorage` attribute. Thanks for reading my HTMHell advent calendar contribution, that's it.

