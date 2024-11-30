---
title: "Makeshift hot reload"
layout: layouts/advent.md
author: "Evan Hahn"
author_bio: "[Evan Hahn](https://evanhahn.com) is a computer programmer. He's worked in security at [Signal](https://signal.org), the encrypted messenger, and on [Helmet](https://helmetjs.github.io/), a Node security module. He's worked on non-profit peer-to-peer software at [Awana Digital](https://awana.digital). He's written a couple of JavaScript books, such as [Express in Action](https://www.manning.com/books/express-in-action). He loves a good panini."
date: 2024-12-11
author_links:
  - label: "Website"
    url: "https://evanhahn.com"
    link_label: "evanhahn.com"
  - label: "Mastodon"
    url: "https://bigshoulders.city/@EvanHahn"
    link_label: "@EvanHahn"
active: true
intro: "<p>Hot reloading is super useful for iterative development, but it can require fancy tooling. If you don't have that, you can put a single tag in your `<head>` to hack in some of the same effect.</p>"
image: "advent_11"
---

*In short: put `<meta http-equiv="refresh" content="1">` in your `<head>` element to refresh your page every second. This is a makeshift "hot reload" for development. It's not perfect, but it can be a quick solution!*

Hot reloading automatically reloads parts of your page while you're working. Change some HTML and see your work instantly! Tweak some CSS and the results are right there! Gone are the days of repeatedly switching to your browser to refresh, because hot reload takes care of it.

It's called "hot" reloading because it's *hot*. It's powerful. Everyone loves it.

But here's the problem: hot reload requires fancy build tooling. It's built into tools like Vite, Parcel, and various editor plugins. But what if you aren't using one of these? What if you're writing HTML the way God intended: by editing some damn files on disk? In other words, without a build tool?

Can you still get that hot, hot reloading?

## Home-grown hot reload

You can create a makeshift hot reload by putting this somewhere in your `<head>` tag:

```html
<!-- Reload the whole page every second. -->
<meta http-equiv="refresh" content="1">
```

Adding this will make the whole page reload every second.

Now, when you edit some HTML, you'll only have to wait a second before you see your changes. When you tweak your CSS, you'll see the results promptly.

This simulates the [`Refresh` HTTP response header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Refresh), instructing browsers to reload the page after a certain number of seconds. You can change the duration if it's reloading too often for your taste; I find that 2 seconds is my sweet spot.

When you're all done, you should remove this tag so that the page doesn't reload for your users.

This isn't as powerful as hot reloading, to be sure. This primitive solution has a lot of drawbacks:

- It's usually slower than real hot reloading.
- It can't intelligently swap out parts of your app, and instead brutally reloads the whole page.
- It can mess with any state you've set up, such as scroll position.
- It also refreshes the browser's developer tools, making them difficult to use.
- If you use a screen reader, it's likely that this constant reloading will mess things up.

Despite the disadvantages, this solution has one big plus: it's a single line of HTML that doesn't require any additional tooling. This minimal solution can be useful if you just need something simple. And that's hot.
