---
title: "The road to HTMHell is paved with semantics"
layout: layouts/advent.md
author: "Vadim Makeev"
author_bio: "Frontend developer in love with the Web, browsers, bicycles, and podcasting."
date: 2023-12-08
tags: advent2023
author_links:
  - label: "Blog"
    url: "https://pepelsbey.dev/"
    link_label: "pepelsbey.dev"
  - label: "Vadim on Mastodon"
    url: "https://mastodon.social/@pepelsbey"
    link_label: "@pepelsbey"
  - label: "Vadim in Telegram"
    url: "https://t.me/pepelsbey_dev"
    link_label: "@pepelsbey_dev"
active: true
intro: "<p>HTML semantics is a nice idea, but does it really make a difference? There’s a huge gap between HTML spec’s good intentions and what browsers and screen readers are willing to implement. Writing semantic markup only because <a href='https://youtu.be/EIBRdBVkDHQ'>the good spec is a spec, and it is good, and it’s a spec</a> is not the worst approach you can take, but it might lead you to HTMHell.<p>"
status:
  review_manuel: "done"
  review_eric: "done"
  review_saptak: "skipped"
---

HTML semantics is a nice idea, but does it really make a difference? There’s a huge gap between HTML spec’s good intentions and what browsers and screen readers are willing to implement. Writing semantic markup only because [the good spec is a spec, and it is good, and it’s a spec](https://youtu.be/EIBRdBVkDHQ) is not the worst approach you can take, but it might lead you to HTMHell.

## Simple days

Like most people involved in the front-end, I started my journey into Web development from HTML. It was simple enough, close to a natural language, and easy to use: you type some tags, save a text file, and reload the browser to see the result. And it would almost never fail if I made a mistake!

Back then, I considered HTML a simple set of visual building blocks. It was too late for purely visual `<font>` elements (the CSS has replaced them), but the general idea stayed pretty much the same: if you wrap your text into `<h1>`, it becomes big and bold, if you have two `<td>` cells in a row, that’s your two-column layout. Easy! I learned tags to be able to achieve certain styles and behaviors. Remember `<marquee>`?

<marquee behavior="alternate" scrollamount="7">

```html
<marquee
  behavior="alternate"
  scrollamount="7"
></marquee>
```

</marquee>

<!-- Eric: This is cute, but distracting without the ability to pause it (ironic, I know) -->

That was just the beginning: soon, I needed calendars, popups, icons, etc. It turned out I had to code them myself! And so I did, mainly using divs, spans, and some CSS. Back in the mid-2000s, there weren’t any particular “logical” tags or functional widgets, only the ones you’d find on a typical text editor panel.

But at some point, a trend called “web standards” emerged: it suggested to stop using HTML as a set of visual blocks and start thinking about the meaning of the content and wrapping it into appropriate tags: `<table>` only for tabular data, not layout; `<blockquote>` only for quotes, not indentation, etc. The people bringing the web standards gospel were convincing enough, so I joined the movement.

<!-- Eric: Can we link to a high-level resource about what the web standards movement is? Maybe webstandards.org? -->

## Semantics

Following the trend, we started studying the HTML 4 spec to learn the proper meaning of all those tags we’ve already known and many new ones we’ve never heard about. Suddenly, we’ve discovered semantics in HTML, not just visual building blocks.

- `<b>` and `<i>` weren’t cool anymore: the proper stress and emphasis could only be achieved with `<strong>` and `<em>`.
- `<ul>` and `<ol>` weren’t only for bulleted/numbered lists in content anymore, but for all kinds of UI lists: menus, cards, icons.
- `<dl>`, `<dt>`, `<dd>` were accidentally discovered in the spec and extensively used for all kinds of lists with titles.
- `<table>` was banned from layout usage mainly because it wasn’t meant for that by the spec, but later, we also discovered rendering performance reasons.

Why? Because we started paying attention to the spec, and it was semantically correct to do so. Every decision we make would have to be checked to determine whether it’s semantic enough. And how would we do that? By reading the spec like it’s a holy book that gives you answers in challenging moments of your life. On top of that, there was the [HTML Validator](https://validator.w3.org/)’s seal of approval.

![W3C HTML 4.01 badge with a checkmark.](images/valid.svg)

But then came the [Cambrian explosion](https://en.wikipedia.org/wiki/Cambrian_explosion) that changed everything: HTML 5.

## A new hope

Just after the failed promise of [XHTML](https://en.wikipedia.org/wiki/XHTML), HTML 5 brought us new hope. Many new elements were added based on existing naming conventions to pave the cow paths. The new spec has challenged browsers for years ahead, from supporting the new parsing algorithm to default styles and accessibility mappings.

For the web standards believers of the old spec, the new one was just a promised land:

- Landmarks to mark logical parts like headers, footers, asides, navigations, sections, and articles.
- Variety of new form elements other than the text ones: dates, emails, numbers, ranges, and colors.
- Media and interactive elements for video, audio, and graphics.

<!-- Eric: Can we link to spec resources for these? This might be a HTML blog, but I bet some of its readers aren't aware of them all. -->

There was even a logo for semantics in the [HTML 5’s design](https://www.w3.org/html/logo/)!

![Semantics logo with three horizontal angled lines pointing up.](images/semantics.svg)

Apart from extending the list of functional building blocks, the spec added several semantic elements that didn’t even come with any styling, just meaning. But not only that! Some old, purely visual elements were lucky enough not to be deprecated but redefined. For example, `<b>` and `<i>` became cool again, though no one could explain the use cases, apart from rather vague taxonomy and emphasis ones and… naming ships. You think I’m kidding? [Check the spec!](https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-i-element)

```html
<i>Boaty McBoatface</i>
```

<!-- Eric: I love how they tossed boat names in like, "Uhhh, and boat names! Yeah! That too!" 😅 -->

Don’t get me wrong, I think HTML 5 significantly advanced the Web, but it has also detached us from reality even further. Especially the idea of an outline algorithm and multiple nested `<h1>` elements that would change the level based on nesting. It was never implemented by any browser but existed in the spec for a long, long time [until finally removed in 2022](https://github.com/whatwg/html/pull/7829).

```html
<section>
    <h1>Level 1</h1>
    <section>
        <h1>Level 2</h1>
        <section>
            <h1>Level 3</h1>
        </section>
    </section>
</section>
```

⚠️ Please don’t use the code above. It’s wrong and harmful.

<!-- Eric: People don't read, they skim. Because of that I might also suggest adding a comment to the actual code block itself that indicates it's harmful code -->

Personally, I’ve wasted too many hours arguing about the difference between `<article>` and `<section>` for purely theoretical reasons instead of focusing on good user experience.

<!-- Eric: Amen. -->

## Drunk on semantics

Although the spec would provide examples, it primarily focused on marking up content, not UI. Even examples themselves were often purely theoretical with a kind of usage that would be semantically correct, not always practically useful. There’s another whole story about the difference between the W3C and WHATWG spec versions, but the W3C’s examples were usually better.

<!-- 
  Eric:
  >There’s another whole story about the difference between the W3C and WHATWG spec versions, but the W3C’s examples were usually better.
  While I agree here, I don't think this sentence adds value to the post. As a reader unfamiliar with this history I might be left with more questions than answers. 
-->

I’ve seen a lot of weird stuff and did it myself, too. People would often look at the HTML spec as a dictionary, looking up a word in the list of elements for an idea they had in mind. Try to read the following examples through the eyes of a beginner, giving a shallow look at the spec. They totally make sense!

- `<menu>` for wrapping the navigation menus.
- `<article>` for the content of an article.
- `<input type="number">` for a phone number.
- `<button>` for everything that looks like a button.

I haven’t seen the `<slot>` element used on a casino website to mark up a slot machine, but maybe only because I’m not into gambling. But the rest of the examples are real.

At the same time, a lot of people would read the spec carefully and use `<footer>`, `<header>`, `<main>`, and other semantic elements properly. But the reason for that won’t be any different: they would also aim for semantically correct markup only because the spec says so. And if it does, the smartest of us would think it should be good for users, search engines, etc. Right?

It turned out that the spec could be wrong, and semantically correct markup wouldn’t guarantee good practical results.

<!-- Eric: I'd suggest bolding "semantically correct markup wouldn’t guarantee good practical results". It's wonderfully phrased and cuts to the heart of what you're getitng at. -->

I don’t blame people who gave up on following the spec altogether and became cynical enough to use `<i>` for icons instead of naming damn ships. Fortunately, I didn’t go this way. I found another reason to keep caring about markup: user experience and accessibility.

## Good intentions

Unlike many other languages, HTML is a user-facing one. It means that our decisions directly affect users. Fortunately, it doesn’t matter how we format our markup, but our selection of elements matters a lot. So when I hear “this markup is semantic,” it often means that it’s correct according to the spec but not exactly good for actual users. Even though both can be true at the same time, the focus is in the wrong place.

<!-- Eric: "our decisions directly affect users" is another banger of a phrase. Bold it! -->

<!-- 
  Eric:
  >Fortunately, it doesn’t matter…
  I might suggest adding a paragraph break here. It's a new thought and it will make both it and the previous thought more impactful if separated.
-->

It seems to me that we decided to trust the spec’s recommendations at some point without checking whether they were true. I firmly believe that the spec authors’ intentions are always good, and I know many smart people working on the HTML spec. But when it comes to implementation in browsers or screen readers, these intentions don’t always survive the reality.

There are usually three main obstacles:

1. Product priorities: you probably know that already, but accessibility isn’t always a number one priority for various reasons, including complexity and the lack of people who know the area.
2. Different points of view: for the same reason, automated testing won’t save you from accessibility issues, different user agents might have other points of view on certain platform features.
3. Actual user experience: browsers call themselves “user agents” for a reason. When a specific platform feature or how developers use it hurts the users, browsers tend to intervene.

For example, the following list won’t be exposed as a list to VoiceOver in Safari only because you decided to disable default counters and implement custom ones via CSS pseudo-elements.

```html
<ul style="list-style: none">
    <li>Item</li>
    <li>Item</li>
</ul>
```

You can force the usual behavior by adding `role="list"` to every list you style, but how convenient is that? Not at all for you as a developer. But Safari has probably had some reasons, most likely to improve their users’ experience by ignoring all semantically correct lists we started using so much outside of content.

As for the screen readers, Stephen Falkner’s “[Screen Readers support for text level HTML semantics](https://www.tpgi.com/screen-readers-support-for-text-level-html-semantics/)” article might open your eyes to the actual value of those tags we’re so passionately arguing about.

<!-- Manuel: Steve Faulkner? -->

<blockquote>No browsers expose <code>&lt;strong&gt;</code> or <code>&lt;em&gt;</code> element role semantics in the accessibility tree.</blockquote>

Again, you can force some semantics via ARIA roles, but should you? That’s an open question. The answer depends on the value you’re trying to bring your users.

Does it mean we should immediately stop using semantic elements if they don’t bear any value for the users? I don’t think so. But I stopped using a _semantics argument_ when talking about good markup. Just like tabs and spaces, semicolons, or quotes, semantics is mostly a stylistic preference.
<!-- Manuel:
"semantics is mostly a stylistic preference" <- only because browsers don't interpret text-level semantics? I wouldn't say that using headings, landmarks, the button element or lists is only a a stylistic preference. -->

There’s also a future-proofing argument that suggests using semantic markup with the hope that someday, browsers will start supporting all those elements they choose to ignore now. I wouldn’t rely on it too much and prefer to focus on what’s important right now.

But if you decide to follow the spec, please don’t forget to test your code and learn cases when semantic markup is less optimal or even harmful for your users and cases when it’s fully neutral.
<!-- Manuel: or cases when it's critical because those exists, no? -->

<!-- Eric: I think the opposite is also worth pointing out here: Don't try to force what you expect to hear or see for assistive technology. Doing so is probably going to make the experience worse. -->

I used to be among those people who’d judge the quality of a website based on the number of divs it’s built of. We’d say, “Nah, too many divs, it’s not semantic.” Now I know that what’s inside of those divs matters the most. Enough landmarks, headings, links, and buttons would make it good, even if the divs/semantic elements ratio is 1000 to 10. We are _divelopers,_ [as Chris Coyer once said](https://twitter.com/chriscoyier/status/1050456501414838272). Don’t be ashamed of this, wear this name with pride.

<!-- Eric: "what’s inside of those divs matters the most" is another one worthy of a bolding! -->

## Good result

Following spec’s recommendations with semantic markup might still be a good start, and I mostly agree with this idea often expressed by accessibility experts:

<blockquote>If you write semantic markup, it will be mostly accessible.</blockquote>

But I think there’s a better one, relying not only on good intentions but seeking a good result.

<blockquote>If you care about users, your markup will be fully accessible.‌‌</blockqoute>

<!-- Manuel: 
"if you care about users" <- but was does that mean?
I really like how you build up the article. You did a great job of explaining your criticism and how your perspective changed but your article fails to offer an alternative. 
yes, don't believe that "according to spec" means "accessibility"! 
yes, obessing over stuff the specs says just because it's in the spec is nonsense! 
yes, we should focus more on users and UX, but how does that contradict with following the spec? I believe you need to elaborate the sentence "But if you decide to follow the spec, please don’t forget to test your code and learn cases" like, how can I as someone who teaches people about a11y do a better job? what better advice can I give them than "learn HTML", "learn who your users are and how they use the web" and "learn how to test your code". or is your point that most people stop at the first
advice? 
I believe that you have a really good and important point with your "criticism", but I don't find the argument "it's not worth caring about semantics, care about users" unsatisfying because it doesn't offer guidance.
-->

And you know what? It doesn’t matter if you agree with me on the value of semantics. I’m sure you’ll be making the right decisions. After all, you’ve just read a big rant on HTML in the HTMHell advent calendar.
