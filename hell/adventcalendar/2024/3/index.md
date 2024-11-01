---
title: "Smooth Multi-Page Experiences with Just a Few Lines of CSS"
layout: layouts/advent.md
author: "John Allsopp"
author_bio: "John Allsopp is a long-time web developer and author. In April 2000, his “A Dao of Web Design” foreshadowed Responsive Web Design. [Read it here](https://alistapart.com/article/dao/). For two decades, he’s run conferences for web professionals at [Web Directions](https://webdirections.org). He also runs [Conffab](https://conffab.com), a streaming platform for conferences. Find John on Mastodon at [@johnallsopp@indieweb.social](https://indieweb.social)."
date: 2024-12-03
author_links:
  - label: "xy Blog"
    url: "#"
    link_label: "your-awesome-website.com/blog"
  - label: "yx on ABC"
    url: "https://abc-social-media-site"
    link_label: "@xy"
active: true
intro: "<p>Short description of the post</p>"
image: "advent_3"
---

A single line of CSS can enable slick multi-page transitions for web applications, opening up new possibilities for web app architectures. Let’s take a look at View Transitions, why we might want them, and how to get started with just that single line of CSS.
<!-- MM: I know it's an old debate but my first thought was "but what about websites?". "Web applications" makes it sound like you need a webmanifest file, service worker, SPA, etc.-->

## The Web's Long Legacy of Native App Envy

The launch of the iPhone coincided with (and likely ignited) a resurgence of the web. After years of stagnation under the dominance of Internet Explorer, competition and innovation were rekindled by Safari for Mac and Firefox. The iPhone’s killer feature (hard as it might be to believe now) was the “full Safari” on a mobile device.

The Safari team introduced features like gradients, rounded corners, web fonts, transitions, animations, and transforms. Slick interactive experiences were now a reality on the web.

Then native iPhone apps arrived—with their smooth, animated state transitions between views, panels and widgets sliding in and out, and satisfying, physics-driven responses to user interactions. The web's traditional multi-page architecture was no match; moving from one page to another was clunky, with screens going blank as new pages loaded over sluggish 3G networks. Rendering engines struggled on 2010-era chips.

The common refrain was that native apps were inherently better than web apps. In terms of UI slickness, it was hard to argue otherwise.

The nadir perhaps came in August 2010, when the then-bible of the technology industry, Wired, proclaimed on its front cover:

### The Web Is Dead. Long Live the Internet

> Two decades after its inception, the World Wide Web has been eclipsed by Skype, Netflix, peer-to-peer, and a quarter-million other apps [1].

The problem wasn’t just the lack of engaging transitions. Web apps also lacked access to platform APIs, such as address books, cameras, and Bluetooth—features leveraged by native apps to create viral growth and novel experiences. But the absence of smooth UI transitions certainly didn’t help.

The web survived, but the struggle to match native apps remains. A significant response to this challenge was the Single Page App (SPA) architecture.

## Single Page Apps: A Solution with Costs

SPAs sidestepped the need to download each state as a separate page and the associated clunky transitions by running the entire application in a single page. Now, transitions from one state to the next could be accomplished with CSS transitions and animations. However, SPAs carried their own set of challenges that we still grapple with today.

First, an entire app essentially needed to be downloaded before it could be used. This was acceptable for apps from an app store, but it conflicted with the web’s “instant-on” philosophy. Long load times were particularly detrimental on mobile. This not only presented a UX challenge but also a cost one—mobile data was far from cheap a decade ago, and for many people, it still is. Plus, all that app logic had to be served up potentially many times for every user.

The SPA hydration model (downloading an application shell and then rendering the bulk of the app with JavaScript) put significant burdens on device performance. The web's offline and caching capabilities at the time were poor, often requiring the entire app to be downloaded every time it was used. As we learned over time, SPAs also come with SEO challenges, complex codebases, and maintenance headaches—all stemming, in part, from trying to emulate the native app experience.
<!-- MM: It's worth mentioning accessibility here, too. Because out of the box SPAs break a lot of the native accessibility that HTML provides. You can use that as an argument to emphasize the usefuleness of view transitions as a native solution. 
https://www.matuzo.at/blog/2023/single-page-applications-criticism/
 -->

It was not entirely in jest that Next.js creator Guillermo Rauch observed, “SPAs were a zero-interest rate phenomenon.”

## A New Hope: View Transitions

But now, or very soon, we'll be able to create multi-page apps with View Transitions [2]. It’s taken well over a decade for the Web platform to respond, but View Transitions, coupled with the experimental Speculation Rules API [3], promise drastically simplified architectures and reduced complexity.

Today, I want to provide a brief overview of what’s coming (and in some cases, already here) and give you the single line of CSS that can add View Transitions to your app. As of October 2024, View Transitions are supported in Chrome and Safari’s Technology Preview.
<!-- MM: Again: apps. One of the coolest features of view transitions is that they work without JS and for regular websites, too. -->

## Introducing View Transitions

The View Transition API enables:

- Animating between DOM states in SPAs.
- Animating the navigation between documents in multi-page apps (MPAs).
<!-- MM: MPA, which really just stands fore websites, right? -->

Now View Transitions *can* get complex, as they enable sophisticated animations, but let’s start simply.

### A Simple Page Transition

<!-- MM: Note: I'll embed the video here later. -->

<video src="simple-abrupt.mov" controls></video>

Take this classic page transition[4]—quick and clean, thanks to the use of CSS's aspect-ratio and the lazy loading of images. But it’s abrupt. Now, let’s add the magic line of CSS to smooth things out:

```css
@view-transition {
  navigation: auto;
}
```

Alright, I cheated; it’s three lines. But you could write it as a single line!

<video src="simple-smooth.mov" controls></video>

Here it is in action [5] (as supported in Chrome and Safari Tech Preview). The transition is smoother, less abrupt. No JavaScript, libraries, or dependencies—just lovely progressive enhancement. If you want to see it live, visit Conffab, where this effect is used for every page transition.
<!-- MM: Why not link Conffab? -->

There’s no reason not to add this to any website today. And more and more visitors will experience nicer transitions over time, at almost no cost to you as the technology becomes more widely supported.
<!-- MM: 🔥🔥🔥 -->

## Adding Dynamic Transitions

We can also make transitions more dynamic with just a bit more CSS.

Here's a before and after video. First, how browsers traditionally rendered page transitions

<video src="complex-abrupt.mov" controls></video>

And now how Chrome renders this new transition we'll detail below.

<video src="complex-smoth.mov" controls></video>

I hope you'll agree it's a much more engaging effect. So, how do we achieve this?

In our main page, where we have links to individual sessions, we have one end of the transition that looks like these:

```html
<section id="speaker-marco-rogers" style="view-transition-name: marco-rogers-hero"></section>
<section id="speaker-maria-farrell" style="view-transition-name: maria-farrell-hero"></section>
```

Then in the target pages, we have elements like these:

```html
<section id="session-details" style="view-transition-name: marco-rogers-hero"></section>
<section id="session-details" style="view-transition-name: maria-farrell-hero"></section>
```

Notice how the two ‘ends’ of the transition have matching `view-transition-name` values. This tells the browser which DOM elements to transition between.

Inline styles aren’t always ideal, but in this case, it was the easiest solution given the existing codebase. You could alternatively apply the style with CSS, if the endpoints can be uniquely selected on a page (since `view-transition-name` values must be unique on any given page so the browser knows which elements to create a transition from and to).

Currently, this more complex example may have issues in Safari 18's Tech previews, but I’m confident they’ll be resolved soon. Above all, it’s great to see Safari investing in this feature!

## What's Next?

First, add the simple one-liner to all your sites for smoother page transitions.

Then, explore adding more specific transitions like in the second example. For generated pages, adding `view-transition-name` attributes may not present much challenge, and depending on your HTML structure, you could add them with just a bit of CSS.

Now, animation effects can cause difficulties for some users, such as those with vestibular disorders, so we should take our user's preferences about motion into account. Doing that for View Transitions is very straightforward. We add

```css
@media (prefers-reduced-motion: reduce) {
  @view-transition {
    navigation: none;
  }
}
```

Add this after our original `@view-transition` rule. Now, if the user's preferences are set to reduced motion, no view transitions will be triggered on page navigation.

<!-- MM: or instead only apply it when the user has no preference
@media (prefers-reduced-motion: no-preference) {
  @view-transition {
    navigation: auto;
  }
} -->



Finally, take a deeper look at what else the View Transition API can do—this is just the beginning.

* [1] [https://www.wired.com/2010/08/ff-webrip/](https://www.wired.com/2010/08/ff-webrip/)
* [2] [https://developer.mozilla.org/en-US/docs/Web/API/View\_Transitions\_API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API)
* [3] [https://developer.mozilla.org/en-US/docs/Web/API/Speculation\_Rules\_API](https://developer.mozilla.org/en-US/docs/Web/API/Speculation_Rules_API)
* [4] Simple Abrupt transition example
* [5] Simple smooth transition example
* [6] Complex Abrupt transition example
* [7] Complex Smooth transition example