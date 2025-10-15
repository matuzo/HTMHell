---
title: "Accessible by Design: The Role of the 'lang' Attribute"
author: "Todd Libby"
author_bio: "Current desert nomad, lobster aficionado, long-time developer, founder of RouteReady, and W3C Invited Expert."
date: 2025-12-66
author_links:
  - label: "Site"
    url: "https://toddl.dev"
    link_label: "unfiltered"
  - label: "Bluesky"
    url: "https://bsky.app/profile/toddl.dev"
    link_label: "@toddl.dev"
  - label: "Mastodon"
    url: "@colabottles@notacult.social"
    link_label: "@colabottles"
  - label: "GitHub"
    url: "https://github.com/colabottles"
    link_label: "Todd @ GitHub"
intro: "<p>Sometimes, a tiny detail can make or break the experience for millions of users. One of these tiny, powerful details is the language attribute in your HTML.</p>"
image: "advent25_6"
---

Let&apos;s face it, in web development, we focus on making things for ourselves and if _it works on our computer, it must work everywhere&excl; Right&quest;_ I used to see it rarely when a developer or framework would have the `lang` attribute used in their work.

I see it more these days, but there are still the issues of accessibility education, new developers entering the field who aren&apos;t aware, framework authors that just don&apos;t make their work accessible, or developers in general not making things accessible.

**But sometimes, a tiny detail can make or break the experience for millions of users.** One of these tiny, powerful details is the `lang` attribute in your HTML.

The `lang` attribute is a simple piece of code that tells _web browsers and screen readers_ what human language your page is written in. For example&colon;

`<html lang="en">` means the page is in English.
`<html lang="es">` means the page is in Spanish.

When you forget this attribute, you&apos;re not just missing a semantic tag—you&apos;re creating a **major accessibility barrier**. If you don't tell the computer what language you're using, assistive tools won't know how to read your content correctly.

## There Is Data Here and You Should Read It

The [WebAIM Million Report](https://webaim.org/projects/million/) is an accessibility report done by WebAIM every year and it is an accessibility evaluation of the top one million homepages on the internet. 2025 marked the seventh year this has been done and the results are not surprising.

### Let&apos;s show the data for the language attribute.

[!A graph showing the top six accessibility issues found in the top one million websites by WebAIM. Low contrast of text is number one followed by missing alt text, missing labels, empty links, empty buttons and finally missing language attribute.](https://res.cloudinary.com/colabottles/image/upload/v1760556179/images/webaim-million-2.png)

For the seventh year in a row, a missing document language made the list.

[!A graph showing the top six accessibility issues found in the top one million websites by WebAIM by year starting in 2019 up to 2025. Low contrast of text is number one followed by missing alt text, missing labels, empty links, empty buttons and finally missing language attribute.](https://res.cloudinary.com/colabottles/image/upload/v1760556180/images/webaim-million-3.png)

As with the rest of the items in the data, it has been a common theme the last seven years. Missing language attribute has always been the last item on the _repeating list of common failures_. So what are the implications&quest;

A numerical look shows the data is still trending to the **same six problems** in the report. So why is it that these issues are the ones that stay in the top six&quest;

[!The WebAIM Million report showing the percentage of top million websites tested and the percentage of those with issues starting with low contrast of text at seventy-nine point one percent followed by missing alternative text for images at fifty-five point five percent, missing form input labels at forty-eight point two percent, empty links at forty-five point four percent, empty buttons at twenty-nine point six percent, and finally missing language attribute at fifteen point eight percent. ](https://res.cloudinary.com/colabottles/image/upload/v1760556179/images/webaim-million-1.png)

## What Happens When the Language is Missing? The Wrong Voice Problem

The main device affected by a missing `lang` tag is the screen reader. Screen readers are essential tools that read web content aloud for people who are blind or have low vision.

Screen readers don't just use one voice&semi; they use specialized software packages for each language. This software knows the pronunciation rules, rhythm, and stress for English, French, Japanese, etc.

When your page is missing the lang attribute, the screen reader has to guess the language. It usually guesses based on the user&apos;s computer settings (for example, if the user lives in Germany, the screen reader will try to use the German voice).

### Example: English Text Read by a German Voice

Imagine your entire website is in clear English. If a German screen reader tries to read it, it will apply German pronunciation rules.

<p class="highlight"><strong>&ldquo;The&rdquo; might sound like &ldquo;Tee-hay.&rdquo;</strong></p>

or;

<p class="highlight"><strong>&ldquo;Data&rdquo; might be pronounced with a hard &lsquo;A&rsquo; sound instead of a soft one.</strong></p>

The result is garbled, unnatural, and often unintelligible speech. The text is still on the page, but for the screen reader user, the content is lost. They cannot understand your article, buy your product, or use your service.

This single small mistake transforms your helpful website into a frustrating, unusable experience.

## It&apos;s a Rule, Not a Suggestion(WCAG)

Using the `lang` attribute isn't just a friendly suggestion&semi; it&apos;s a **core requirement** for making your website accessible.

The _Web Content Accessibility Guidelines (WCAG)_ is the international standard for web accessibility. WCAG **Success Criterion 3.1.1 (Language of Page)** states that the language of the page must be clear to the computer. This is a level &lsquo;A&rsquo; requirement, which means it&apos;s mandatory for basic accessibility.

If your website fails this check, it is officially considered inaccessible.

## How It Affects Other Tools

The lang attribute helps more than just screen readers&colon;

### 1. Braille Displays
A refreshable braille display translates text into small patterns of raised bumps. Different languages use different contraction rules in braille (called Grade 2 braille). If the language is not set, the braille translator might use the wrong rules, turning clear text into meaningless gibberish for the braille reader.

### 2. Automated Translation
When a user relies on tools like Google Translate or a browser&apos;s built-in translation feature, telling the tool the source language (the language you wrote it in) ensures a much more accurate translation. If the source language is unclear, the translation quality drops sharply.

## What About Pages with Two Languages?

_What if your page is mostly English but includes a quote in Spanish&quest;_ If you don't do anything, the screen reader will read the Spanish quote using the English voice, again leading to mispronunciation.

You can fix this instantly by adding the `lang` attribute to the specific element that changes language&colon;

```html
<p lang="en">
    The artist once said, "Always remember this phrase:
    <span lang="fr">Je ne regrette rien.</span>" I think that sums up his career.
</p>
```

In this code, the screen reader switches to the French voice for the quote and then immediately switches back to the English voice for the rest of the sentence. This small change ensures all users hear the content exactly as intended.

## How to Set the Language in Modern Web Frameworks

In modern websites built with tools like React, Vue, or Angular, you usually don&apos;t touch the main HTML file very often. Since these tools mostly control the content inside the `<body>` tag, you have to know where to find the root template file to set the `lang` attribute correctly.

### Here&apos;s a simple guide for the most popular frameworks&colon;

| Framework          | What File to Edit                      | Where to Put the Code                                        |
| :---               |                 :----:                 |                                                         ---: |
| React              | public/index.html                      | Directly on the `<html>` tag in that file.                   |
| Next.js            | app/layout.tsx (or similar root file)  | Set the lang in the JSX for the root `<html>` element.       |
| Vue                | public/index.html                      | Directly on the `<html>` tag in that file.                   |
| Nuxt               | nuxt.config.ts                         | Inside the app.head.htmlAttrs setting in your config file.   |
| Angular            | src/index.html                         | Directly on the `<html>` tag in that file.                   |
| Svelte/SvelteKit   | index.html or src/app.html             | Directly on the `<html>` tag in the main template file.      |

### Example&colon; Setting the Language in a Static Template

For most simple apps (React, Angular, plain HTML), you will open your main `index.html` file and change the first line like this&colon;

```html
<!DOCTYPE html>
<!-- Change the line below from <html> to the correct language code -->
<html lang="en">
<head>
    <!-- ... -->
</head>
<body>
    <!-- Your app code loads here -->
</body>
</html>
```

## Conclusion
The `lang` attribute is a tiny line of code that provides **universal access to your content**. It&apos;s arguably the easiest, fastest, and most impactful accessibility fix you can make on any website.

By correctly setting the language, you ensure that screen readers, braille displays, and translation tools have the fundamental information they need to do their jobs correctly. It&apos;s a simple commitment that makes the web better for everyone.

Don&apos;t let a missing two-letter code turn your content into a foreign language for your users and don&apos;t be afraid to use it or add it in&excl;
