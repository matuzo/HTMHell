---
title: "Why you should (mostly) choose the b/i tags over strong/em for better accessibility"
author: "Jelmer de Maat"
author_bio: "I am a developer from the Netherlands focussing on accessibility and performance."
date: 2025-01-01
author_links:
  - label: "Mastodon"
    url: "https://mastodon.social/@jelmerdemaat"
    link_label: "@jelmerdemaat"
  - label: "GitHub"
    url: "https://github.com/jelmerdemaat"
    link_label: "jelmerdemaat"
  - label: "LinkedIn"
    url: "https://www.linkedin.com/in/jelmerdemaat/"
    link_label: "Jelmer de Maat"
intro: "How the usage of `<strong>` and `<em>` has changed over the years and why you should consider using `<b>` and `<i>`"
image: "advent25_32"
---

If you've been riding a long for some time on the web, you know the `<strong>` and `<em>` tags and you probably use them frequently. They are quite nice:

1. With `<strong>` we can define content with ["strong importance, seriousness, or urgency"](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/strong#:~:text=have%20strong%20importance%2C%20seriousness%2C%20or%20urgency).
1. With `<em>` we can define ["text that has stress emphasis"](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/em#:~:text=text%20that%20has%20stress%20emphasis).

Especially when working with CMS systems, like we do at our agency, they are used a lot inside user content. I have always learned that using `<strong>` and `<em>` is the "better option" when it comes to marking pieces of text as important. The semantic way; the _correct_ way. This is why I was very surprised to find out that when we had some of our websites recently audited with the official WCAG [Evaluation Methodology](https://www.w3.org/WAI/test-evaluate/conformance/wcag-em/), we kept receiving issues that we were over-using these tags, and that we should switch to `<b>` and `<i>`.

In fact; almost _never_ was our usage of `<strong>` and `<em>` tags evaluated as correct. In every website we had evaluated, we got this feedback:

> On page X at location Y, you are using a `<strong>` element. The `strong` element has semantic value: it gives a certain value to the text inside it, by signalling it has strong importance. For this reason you may not use it for a purely visual effect (bold text). Use CSS for this.

It left us confused. What's happening? We tried to do the right thing for years by writing nice, semantic HTML. What was going on here?

## Why we left `<b>` and `<i>` behind

Over the years, `<b>` and `<i>` had left my muscle memory. With evolving web standards, I had always been excited to do things the <i>right way</i>. I heard that the `<strong>` and `<em>` tags were the new, better way to correctly emphasize text in a semantic way. At some point in time the usage of `<b>` and `<i>` was even discouraged. Like Vadim Makeev said back in 2023 in his article [The road to HTMHell is paved with semantics](/adventcalendar/2023/18/) on this very website:

> Following the trend, we started studying the HTML 4 spec to learn the proper meaning of all those tags we’ve already known and many new ones we’ve never heard about. Suddenly, we’ve discovered semantics in HTML, not just visual building blocks. `<b>` and `<i>` weren’t cool anymore: the proper stress and emphasis could only be achieved with `<strong>` and `<em>`.

So, the truth is, I kind of forgot about `<b>` and `<i>`. And not only me: even to this day, there is no way to insert `<b>` and `<i>` tags when using the default editors of popular CMS systems like Wordpress and Drupal. As a non-developer, without writing code, you just can't do it. You can only insert `<strong>` and `<em>` tags in common text editors. Ironically, the design of the buttons that add these elements is always with the bold letter B and the italic letter I, as can be seen in the screenshots below.

<figure>

![Screenshot of the Wordpress Classic Editor](https://ps.w.org/classic-editor/assets/banner-1544x500.png?rev=1998671)

<figcaption>The Wordpress Classic Editor's default text editing interface has several formatting options. Amongst many options, the 'bold' and 'italic' options are visible, which will output 'strong' and 'em' HTML tags. There are no separate options for 'b' or 'i' tags.</figcaption>
</figure>

<figure>

![Screenshot of CKEditor5](https://www.drupal.org/files/issues/2021-09-04/cke5_dialogless_link_editing.png)

<figcaption>CKEditor5, which is used in the Drupal Core, has several formatting options in the editing interface. Amongst many options, the 'bold' and 'italic' options are visible, which will output 'strong' and 'em' HTML tags. There are no separate options for 'b' or 'i' tags.</figcaption>
</figure>

So even when a content editor might know about the difference, there is no way to use `<b>` and `<i>` tags.

## What is the difference?

The key to answering what is the difference between these tags, is the way a person perceives the text: <b>visual, or non-visual</b>. The problem is that right now, in many cases, `<strong>` and `<em>` tags are used as one single solution to two different approaches. You should only use `<strong>` and `<em>` tags if you really want to signal importance or emphasise a text, both when visually reading it and when the text is read to you. By assistive technology, for example.

If you feel the need to use any HTML element for any extra emphasis, ask yourself this question:

"Would a person also want to hear this emphasis loud and clear, by stressing specifically these words when the page is read aloud to them?"

If the answer is no: congratulations! You found a use case for `<b>` and `<i>` tags. Or you could use any other HTML element and give it a custom `font-weight` styling. This is exactly what the WCAG auditor meant with the feedback we got. You intend to make the text only _visually_ emphasized, not audibly.

If the answer is still yes: hang on for a second, and read along why you still might want to choose `<b>` or `<i>`.

## Why strong/em can lead to worse accessibility

The issue with the current usage of `<strong>` and `<em>` tags is that they are too often heavily over-used. Consider an example text in HTML like this:

```html
We hereby would like to invite <strong>all</strong> of our collegues and clients
to a <strong>special event</strong> that will only take place
<strong>once every two years</strong>. During this
<strong>full-day event</strong> we will visit the
<strong>beautiful city center</strong> and have a spectacular dinner at the
restaurant with <strong>100% local food</strong>.
```

Of course I'm exaggerating a bit here, but these kinds of texts happen. This is why our websites get flagged by auditors. Imagine having to hear this text read aloud; would you really want to hear all these words with alternating stress in one sentence? This is exactly the problem. There is too much emphasis on too many words. The non-visual user is almost harassed by the amount of importance it hears.

This problem is in fact so common, most assistive technologies even ignore the special meaning of `<strong>` and `<em>` tags entirely. No special semantics are conveyed anymore to the user of screen readers: it is all presented as normal text. Like Vadim also referenced in his article, Steve Faulkner’s [Screen Readers support for text level HTML semantics](https://www.tpgi.com/screen-readers-support-for-text-level-html-semantics/) article states:

> None of the Screen Readers tested convey strong or em semantics to users. NVDA did for a while but “Having emphasis reported by default has been extremely unpopular with users and resulted in a lot of complaints about NVDA 2015.4. The unfortunate reality is that emphasis is very much over-used in the wild.”

We all tried to do the right thing. Unfortunately, we are left with the end result where `<strong>` and `<em>` tags are so over-used that they don't even "work" anymore.

## To emphasize or not to emphasize

So, answering the previous question comes down to reconsidering your intentions with the text. Do you really, _really_ think it deserves a lot of emphasis or importance, and does that emphasis really, _really_ need to be both visual and auditory? Think of these commonly seen cases:

- A company name, or mission statement in a news article
- A label inside a card defining the category
- A street address of an event, styled in italics
- A subtitle below another heading
- A "read more" label in a news teaser

Most of the time, the answer will be: no. You don't want to emphasize, you want to style. You should use the `<b>` and `<i>` tags, or apply custom styling.

This does definitely not mean `<strong>` and `<em>` should never be used. Especially inside written content like articles and blogs, there may be cases where you certainly mean to emphasize. You can definitely still do that. Even if it is mostly ignored by screen readers (you can still [enable it](https://www.tpgi.com/screen-readers-support-for-text-level-html-semantics/#:~:text=All%20are%20off%20by%20default%2C%20but%20can%20be%20enabled%20though%20user%20settings.) if you want), it may still be of value to other text processing systems that recognize HTML. Just don't over-use it.
