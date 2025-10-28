---
title: "The HTML Elements Time Forgot"
author: "Declan Chidlow"
author_bio: "Front-end developer, designer, writer, and avid user of the superpowered information superhighway."
date: 2025-01-02
author_links:
  - label: "Website"
    url: "https://vale.rocks"
    link_label: "vale.rocks"
  - label: "Fediverse"
    url: "https://fedi.vale.rocks/vale"
    link_label: "@vale@fedi.vale.rocks"
  - label: "Bluesky"
    url: "https://bsky.app/profile/vale.rocks"
    link_label: "@vale.rocks"
intro: "<p>A look at some of HTML's older and lesser-known elements, both standard and non-standard. Assorted arcane obscura, such as <code>nextid</code> and <code>isindex</code>, as well as many others.</p>"
image: "advent25_35"
---

Last year I inflicted upon you the cursed knowledge of [HTML's legacy colour parsing](https://htmhell.dev/adventcalendar/2024/20/), a crime for which I'm still yet to pay. This year, I return with more unwanted and unrequested HTML knowledge of yore.

The truth is, HTML is getting old, folks. The initial release was 1993, 32 years ago. It certainly isn't decrepit, but it does have a storied past – a couple of missteps, tabloid scandals, and unflattering paparazzi photos. That's why I'm so glad you're joining us here today to peruse some of these bad haircuts of HTML's youth.

In the HTML Living Standard there are explicit considerations for what are called [non-conforming features](https://html.spec.whatwg.org/multipage/obsolete.html#non-conforming-features). To quote the standard, "Elements in the following list are entirely obsolete, and must not be used by authors". Thus, I shall issue the disclaimer not to use these lest WHATWG show up at my door.

`<marquee>` is perhaps the most famous of all, second only to `<blink>`, which was never standardised. Daniela Kubesch [wrote about the `marquee` tag and implementing it in a modern way](https://www.htmhell.dev/adventcalendar/2022/15/) previously, so I'll leave that to them.

But there are far more obscure tags which are perhaps less visually dazzling but equally or even more interesting. If you're younger, this might very well be your introduction to them. If you're older, this still might be an introduction, but also possibly a trip down memory lane or a flashback to the horrors of the first browser war. It depends.

## bgsound

`<bgsound>` was a way to play sound in the background, because everyone loves web pages making sounds they didn't ask for at them. It was not standardised, and exclusively part of Internet Explorer. The `<audio>` tag is the much more courteous modern equivalent.

I find it endlessly humorous that the old HTML Wiki's [example section for the tag](https://www.w3.org/html/wiki/Elements/bgsound#Examples) simply states, 'No, really. Don't use it.'. Many of the old and obscure elements share the same detail.

## Framesets

In the olden days, people used 'frames'. Not iframes mind you, just frames. You can think of their usage vaguely like the HTML imports we have now... Wait, what do you mean we still don't have HTML imports?

I digress. This was a time long before single-page applications (SPAs) or anything of that nature. Frames were widely used as a way to aid navigation without needing to reload the page. You could have a navigation frame that persisted while the content frame changed.

`<frame>` is more or less the same as our modern `<iframe>`, though we use iframes much more for embedding than page layout. `<frameset>` holds these frames, so you could write something like `<frameset cols="50%, 50%">` to have two frames next to each other.

The frameset approach had quite a few problems. Accessibility was really poor, and because everything was a single page, it could be hard to link to a specific section. ~~Thankfully we've come a long way since then, and developers take great care with accessibility and ensuring their SPAs respect the web platform.~~

Similarly to how `<noscript>` is triggered if JavaScript isn't supported, `<noframes>` allows you to set content if frames aren't supported.

While they absolutely shouldn't be used anymore, unlike much of what this article covers, frames and framesets are still supported. They may have been deprecated in HTML5, but the web's backward compatibility keeps them going.

## Code

`<pre>` and `<code>` aren't strangers to us. We're good friends, no matter the horrific scripts we may force them to hold. However, pre-`<pre>` and `<code>` there were plenty of other implementations in the wind.

The e**x**a**mp**le element, `<xmp>`, is like our modern `<pre>`, but doesn't interpret special characters like `<`, `>`, or `&`. With `<pre>`, we often need to escape these values to avoid Unwanted Shenanigans™.

`<listing>` is yet another step in presenting code on a page. It was intended as a way to display text on a page as typed but never got proper support and became obsolete with HTML5. Modern browsers handle it the same as `<pre>`.

`<plaintext>` is a funny one. It does what it says on the tin – that is, tells the browser to interpret everything after it as plain text. Of course, this means that any potential closing tag is _also_ interpreted as plain text and therefore not parsed by the browser. Once opened, you cannot close a `<plaintext>`. The rest of the file becomes plaintext for eternity and whatever comes after. It was deprecated in HTML 2 and made invalid in HTML 4, so most modern browsers just interpret it the same as a `<pre>`. The modern approach is to serve content with a MIME type of `text/plain`.

## spacer

Before the modern days of flexbox and grid and even floats, we laid things out with tables. Like cavepeople.

Of course, sometimes with tables, you need a spacer. `spacer.gif` used to be popular – a simple 1px × 1px image that could be used to fill a space. But then Netscape got fancy with it and introduced the totally tubular `<spacer>` tag. You could write `<spacer width="50" height="20">` on your website and get a little element that took up some space.

Pretty fly, though this was only a stop-gap implementation that didn't last long and was never standardised.

## keygen

I hear keygen, and my mind goes to acquiring a copy of a video game or enterprise software in a less than scrupulous way. That isn't to say the `<keygen>` element had anything to do with software cracking, though, and unfortunately didn't come with [sick tunes](https://www.youtube.com/watch?v=0emL2ACcBkk).

It was a way for browsers to generate public-private key pairs for form submissions, primarily used for certificate generation. The idea was to make cryptographic operations easier for users, but in practice, it had security concerns and inconsistent browser support. You can read a little bit of discussion from the time in [this mailing list thread](https://lists.whatwg.org/pipermail/whatwg-whatwg.org/attachments/20080714/07ea5534/attachment.txt). It was deprecated and is now removed from all modern browsers.

## nextid

`<nextid>` comes with the fun trivia of being the first tag to be eliminated from the official public DTD's of HTML versions. It was used by early HTML editors to generate unique identifiers but quickly became obsolete. It was part of those early days of HTML where the vision wasn't just viewing but also editing.

It is a hard element to get much info about, and it seems I'm not alone in thinking that, as the very interesting and well-worth-a-read document [Working NEXTID Tag Element Example](http://the-pope.com/nextid.html) has this to say:

> It is also probably one of the least understood of all of the early HTML elements, being poorly documented, not explained in any depth anywhere, and those who obviously understood how it worked couldn't be bothered to explain it to the rest of us.

## isindex

`<isindex>` is a particularly interesting part of the old web, because it represents, perhaps more than other tags shown here, a very different vision of HTML semantics. It was a way to define a search box that would submit queries directly to the server. You'd write something like:

`<isindex prompt="Enter your search term here:">`

This primitive search functionality was eventually superseded by proper form elements, giving developers much more control over how search interfaces worked.

## dir

I'm talking about `<dir>`, not `dir` – the element, not the property indicating text direction. The purpose of `<dir>` was to serve as a container for files and directories. It wasn't just your bog-standard list, though, because the user agent could apply different styles and icons depending on the content type.

You could also give it the attribute `compact` to make the content take up less space in an effect similar to setting `line-height`. As you might imagine, the modern equivalent is to use a standard list with `<ul>` or `<ol>`.

## Closing Tags

It is easy for us to look back from the year of our lord <code title="Don't you dare send me an email about this.">${new Date().getFullYear()}</code> and ridicule what obviously wasn't to be, but these stumblings have made HTML what it is today. No, they weren't perfect, but it is mistakes that we learn from.

These obsolete tags represent experiments in web development—some more successful than others. They're a reminder that the web platform we use today is the result of decades of trial, error, and evolution. And who knows? Maybe someday developers will look back at our current HTML practices with the same bemused affection.

We often think of the web as forever backwards compatible and never breaking, but that plainly isn't the case. As we've seen, there are plenty of elements that have been left behind in the march of progress. The web evolves, standards change, and what was once cutting-edge becomes a curious footnote in the platform's history.
