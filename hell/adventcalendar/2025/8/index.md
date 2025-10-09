---
title: "What's wrong with this HTML, and is it valid?"
author: "Patrick Brosset"
author_bio: "I'm in love with the web platform and developer tools. I have been working on browsers for more than 10 years. Currently a product manager on the Edge team at Microsoft, I used to work at Mozilla, and was a web developer before that. I do developer relations, technical documentation, and work on a wide range of web platform technologies and tools. Always happy to chat on social media!"
date: 2025-12-08
author_links:
  - label: "Site"
    url: "https://patrickbrosset.com"
    link_label: "patrickbrosset.com"
  - label: "Mastodon"
    url: "https://mas.to/@patrickbrosset"
    link_label: "@patrickbrosset@mas.to"
  - label: "Bluesky"
    url: "https://bsky.app/profile/patrickbrosset.com"
    link_label: "@patrickbrosset.com"
intro: "<p>Short introductory text</p>"
image: "advent25_8"
---
Behold this magnificient HTML document:

```html
<html>
  <body marginheight=150 marginwidth=300 bgcolor=black text=white>
    <marquee>
      <b>Hello <i>HTML</b> World!</i>
    </marquee>
```

To try it in your browser, copy the following line and paste it into the address bar:

`data:text/html,<html><body marginheight=150 marginwidth=300 bgcolor=black text=white><marquee><b>Hello <i>HTML</b> World!</i></marquee>`

## What's wrong with it?

Everything? I mean, this HTML looks like it was written in 1998!

Here's what's wrong with it:

1. The document is in _quirks mode_ because it lacks a proper [`DOCTYPE` preamble](https://developer.mozilla.org/docs/Glossary/Doctype).

   If you've never heard of quirks mode, then you're probably lucky enough to have started your web development areer after it was an important thing to know about. Suffice to say it's weird. Here are some of the ways quirks mode impacts HTML documents:

   * The box model behaves differently, which affects layout and spacing.
   * Some CSS properties don't really work as you'd expect.
   * Certain inline elements don't vertically align the way you think they should.
   * Font sizes don't inherit on table elements.

1. The `<head>` tag is missing, which means the document has no `<title>` either, which is bad for accessibility.

   A common thing that assistive technology users do is read the title of a page first to know if they want to spend more time reading the page's content. Without a descriptive title, folks are forced to start reading more of the content to know if that's what they were looking for in the first place, which is time-consuming and potentially confusing.

1. The `<body>` tag uses deprecated attributes: `marginheight`, `marginwidth`, `bgcolor`, and `text`.

   These attributes are [obsolete and discouraged by the spec itself](https://html.spec.whatwg.org/multipage/obsolete.html#obsolete).

1. The `<marquee>` tag is [obsolete](https://html.spec.whatwg.org/multipage/obsolete.html#the-marquee-element) and should be avoided in favor of CSS animations.

   Plus, if you really must animate scrolling text, then please use the [`prefers-reduced-motion` media query](https://developer.mozilla.org/docs/Web/CSS/@media/prefers-reduced-motion) to respect user preferences.

1. The `<b>` and `<i>` tags look like they're used for styling used for styling. That's wrong, right?

   More on that later.

1. The `<b>` and `<i>` tags are improperly nested. The nesting is `<b><i></b></i>` which is out of order.

1. The closing `</body>` and `</html>` tags are missing.

## Is this valid HTML?

Well, yes and no:

* No: if you send this to the [W3C HTML validator](https://validator.w3.org/nu/), it'll be pretty angry at you and will list the errors I mentioned earlier.
* But also, yes: the resulting page just loads and works fine in browsers.

Before discussing each point in details, don't you think this is just beautiful? HTML is so self-correcting that making a browser fail only by using HTML is really hard to achieve, and HTML that looks like it was written two decades ago still works! I mean, take a look at [www.spacejam.com](https://www.spacejam.com/1996/), [this old bar website](https://www.thecrystalcornerbar.com/), or even [the very first web page that was ever created](https://info.cern.ch/hypertext/WWW/TheProject.html).

Now let's go over the list of issues I mentioned earlier one more time, but this time, let's talk about why they're not actually causing any issues:

1. Sure, quirks mode can lead to weird rendering issues if you don't know that you're using it, but it's still implemented in browsers and perfectly ok to use.

   Even if quirks mode was added for [historical reasons](https://quirks.spec.whatwg.org/#history), to support web pages that were made before the CSS specification was fully fleshed, the code in browser engines which detects the document mode and renders it accordingly is here to stay.

   _TODO: show how to detect quirks mode in devtools._

1. The `<head>` tag can definitely be omitted. Neither the [HTML specification](https://html.spec.whatwg.org/multipage/semantics.html#the-head-element), nor browser implementations require the tag to be present.

   It's bad for accessibility reasons if you omit it, again because you probably also won't have a `<title>` tag, but it still works.

   In fact, you can also omit `<html>` and `<body>` tags too. Personally, I commonly use this to quickly test things out in the browser. Instead of creating a new HTML file on my computer, which takes a bit more time, I just type some HTML in the address bar directly. For example: `data:text/html,<div>something`. No `<html>`, no `<head>`, no `<body>` elements.

1. `marginheight`, `marginwidth`, `bgcolor`, or `text` are deprecated presentational attributes. But, even if they're deprecated and discouraged, they're still implemented in browsers, for backward compatibility reasons.

   In fact, here are other similar attributes: `alinkColor`, `vlinkColor`, _TODO: add others, and detail what they do._
   These presentational attributes act as 0-specificity CSS properties. _TODO: add more content here._

1. The `<marquee>` element still animates text in browsers. In fact, if you want to go crazy with it, try nesting two `<marquee>` elements, like this:

   ```html
   <marquee
      direction="down"
      width="200"
      height="200"
      behavior="alternate">
      <marquee behavior="alternate">This text will bounce</marquee>
    </marquee>
   ```

   Take a look at [the example on codepen](https://codepen.io/captainbrosset/pen/dPGvrMQ?editors=1100).


1. Using `<b>` and `<i>` is perfectly valid. They used to be meant for making the text bold and italic, hence their names. But they were deprecated in HTML4, and the meaning of the tags was changed to mean something else. The `<b>` tag now means _bring attention_ and the `<i>` tag now means _idiomatic text_.

   `<b>` is now used to markup keywords, product names, or other spans of text whose typical presentation would be boldfaced, but not including any special importance.

   `<i>` is now used to markup text that is set off from the normal prose for readability reasons.

   More semantic tag names have since been invented too: `<strong>`, `<em>`, or `<mark>`, which convey slightly different semantics.

   If there's no semantic aspect to the piece of text you want to make bold or italic, don't use `<b>` or `<i>`, use CSS `font-weight` and `font-style` instead.

1. Misnested tags are perfectly valid in HTML.

   The following markup: `<b><i></b></i>`, creates the following DOM tree:

   ```
   ⌊_ b
   |  |
   |  ⌊_ i
   |
   ⌊_ i
   ```

   This is even specified in the HTML spec: the previous example is taken care of by _the adoption agency algorithm_ that's described in the spec. _TODO: maybe describe a little more, and link to the relevant part of the spec._

   It doesn't mean you should do this. It's still important to create correctly nested HTML markup. But there are historical reasons for such misnesting to work. Back in the early days, different browser engines would parse HTML in different ways, which meant that HTML documents didn't always lead to the same DOM tree in different browsers.

   In order to ensure that as much of the web as possible was supported across all browsers, and do this in a simple way (i.e. without having to reverse engineer how other browsers did things), it was easier to just support how other browsers did things.
   _TODO: find more details about the specific `<b><i></b></i>` history here. Chris Wilson is, I think, responsible for this, and this was done on purpose, to match authors intent._

1. Missing end tags are fine. The HTML parser is able to close most of them on its own.

   For example, a list item doesn't need to be closed if what follows is another list item or the end of the list. So, this works fine:

   ```html
   <ul>
     <li>Item 1
     <li>Item 2
     <li>Item 3
   </ul>
   ```

   The same is true for paragraphs. You can omit the closing `</p>` tag if what follows is another paragraph, a heading, a list, and a whole lot of other elements:

   ```html
   <section>
     <p>This is a paragraph
     <p>This is another paragraph
     <h2>This is a heading</h2>
     <p>This is yet another paragraph
   </section>
   ```

   You can find out more about these examples, and others, in the [Optional tags section of the HTML spec](https://html.spec.whatwg.org/multipage/syntax.html#optional-tags).

   Also, think about it, you're probably already using this without realizing. Have you ever closed a `<img>`, `<input>`, or `<link>` tag? Probably not, and that's fine. The HTML spec defines a whole lot of elements which don't require closing tags: `<base>`, `<link>`, `<meta>`, `<hr>`, `<br>`, `<source>`, `<img>`, `<input>`, and others.

## So, what's the moral of the story?

HTML can be very forgiving, and browsers implement things that may seem obscure or weird, but they do so for a very good reason: backward compatibility!

The web is the only platform where sites that were written years ago can still work fine today. This isn't to say that things never get removed though, they do, and probably more often than you realize. Remember AppCache, WebSQL, module import assertions, or special rules that apply to the font-size of `<h1>` elements when nested inside certain elements?



This is both a blessing and a curse. The fact that so much of the languages we use are so forgiving and time-enduring made the web what it is today. A welcoming platform that doesn't take so much effort to get used to, and kind of just works. But, this also means that old features and bad practices can linger on for a long time and, if they're used by many sites and users, can't really ever be removed.
