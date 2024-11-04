---
title: "Makeshift hot reload"
layout: layouts/advent.md
author: "Evan Hahn"
author_bio: "[Evan Hahn](https://evanhahn.com) is a computer programmer. He's worked in security at [Signal](https://signal.org), the encrypted messenger, and on [Helmet](https://helmetjs.github.io/), a Node security module. He's worked on non-profit peer-to-peer software at [Awana Digital](https://awana.digital). He's written a couple of JavaScript books, such as [Express in Action](https://www.manning.com/books/express-in-action). He loves a good panini."
date: 2024-12-19
author_links:
  - label: "Website"
    url: "https://evanhahn.com"
    link_label: "evanhahn.com"
  - label: "Mastodon"
    url: "https://bigshoulders.city/@EvanHahn"
    link_label: "@EvanHahn"
active: true
intro: "<p>Hot reloading is super useful for iterative development, but it requires a fancy dev server. If you don't have one of those, you can put a single tag in your `<head>` to get some of the same effect.</p>"
image: "advent_19"
---
<!-- SS: I like this hack for refreshing to see the live changes, since I hate complicated build systems and using JS for everything in general. But I feel the article should focus more on indicating that this is a very minimal replacement of hot reloading, that someone can use for their own personal coding workflow. And maybe have a section mentioning the certain factors that might need to be taken into cosnideration while using this approach, for example, using devtools along with this solution can be irritating with continous refresh, or like there are accessibility issues that a teammate using assistive tech for development/QA might face. -->

*In short: put `<meta http-equiv="refresh" content="1">` in your `<head>` element to refresh your page every second, like a makeshift hot reload.*

Hot reloading automatically reloads parts of your page while you work. Change some HTML and see your work instantly! Tweak some CSS and the results are right there! Gone are the days of repeatedly switching to your browser to refresh, because hot reload takes care of it.

It's called "hot" reloading because it's *hot*. It's powerful. Everyone loves it.

But here's the problem: hot reload requires fancy build tooling. It's built into tools like Vite, Parcel, and LiveReload, but what if you aren't using one of these? What if you're writing HTML the way God intended: by editing some damn files on disk? In other words, without a build system?

Can you still get that hot, hot reloading?
<!-- MM: I mean, yeah, by pressing a button in the Go Live plugin for VS Code ;) -->

## Home-grown hot reload

You can create a makeshift hot reload by putting this somewhere in your `<head>` tag:

```html
<!-- Reload the whole page every second. -->
<meta http-equiv="refresh" content="1">
```

Adding this will make the whole page reload every second.

Now, when you edit some HTML, you'll only have to wait a second before you see your changes. When you tweak your CSS, you'll see the results pretty quickly.

When you're all done, you should remove this tag so that the page doesn't reload for your users.

This simulates the [`Refresh` HTTP response header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Refresh), instructing browsers to reload the page after a certain number of seconds.

This isn't as powerful as hot reloading, to be sure. It's a little slower and can't intelligently swap out parts of your app. But this minimal solution can be useful when you just need something simple.
<!-- MM: That's the best argument and the whole point of this snippet. -->

## Tweaking the recipe

You can change the duration if it's reloading too often for your taste. For example, if you want it to reload the page every 3 seconds:

```html
<!-- Reload every 3 seconds. -->
<meta http-equiv="refresh" content="3">
```

I usually find that *2 seconds is the sweet spot* for development. Not so fast that my page reloads before I can get a good look at it, but fast enough that I don't have to wait long.

Though I remove these tags after I'm done working, there are legitimate cases where you'd want to leave it in. You might imagine a news feed that reloads itself every minute, or a sports score tracker that reloads every 30 seconds, or a live blog that reloads every 5. No need for JavaScript!
<!-- MM: Those examples sound horrible for UX and accessibility. To maintain focus and the scroll position, in real life you'd always use JavaScript for that, no? -->

<!-- SS: I always love a good JS alternative, being a developer focused on privacy. But this sounds more like a progressive enhancement situation, and I don't think we should ideally recommend a JS alternative solution which has accessibility issues. -->

Hot reloading is useful, to be sure. But a simple `<meta>` tag can get you most of the way there in a fraction of the fanciness.
