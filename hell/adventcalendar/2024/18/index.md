---
title: "Microdata for books"
layout: layouts/advent.md
author: "Alan Dalton"
author_bio: "Alan Dalton worked for Ireland’s National Disability Authority for 8½ years, mostly as Accessibility Development Advisor. That involved working closely with public sector bodies to make websites, services, and information more accessible to all users, including users with disabilities. More recently, he wrote a trilogy of web accessibility articles for the [24 ways](https://24ways.org/) advent calendar: [Web Content Accessibility Guidelines—for People Who Haven’t Read Them](https://24ways.org/2017/wcag-for-people-who-havent-read-them/), [Web Content Accessibility Guidelines 2.1—for People Who Haven’t Read the Update](https://24ways.org/2018/wcag-for-people-who-havent-read-the-update/), and [Future Accessibility Guidelines—for People Who Can’t Wait to Read Them](https://24ways.org/2019/future-accessibility-guidelines/)."
date: 2024-12-18
author_links:
  - label: "Twitter"
    url: "https://x.com/RealAlanDalton"
    link_label: "@RealAlanDalton"
  - label: "Mastodon"
    url: "https://alpaca.gold/@Alan"
    link_label: "@Alan@alpaca.gold"
  - label: "Threads"
    url: "https://www.threads.net/@RealAlanDalton"
    link_label: "@RealAlanDalton"
intro: "<p>Books are the best Christmas presents. Let’s use them as an example to see how HTML’s microdata features can convey a lot of programmatically determinable information with little effort.</p>"
image: "advent24_18"
tags: advent2024
active: true
---

## Dive into marking up books

Books are the best Christmas presents, especially for us web geeks. (I hope you’ll find a [Web Accessibility Cookbook](https://accessibility-cookbook.com/) in your Christmas stocking, gentle reader.) Unfortunately, [A Book Apart closed](https://abookapart.com/pages/about/) this year. Fortunately, the authors reacquired the rights to their books. 

To track the authors’ preferred ways of making their books available, I created an [“Authors Apart” webpage](https://alandalton.github.io/Authors-Apart/). For the HTML, I recalled the [“‘Distributed,’ ‘Extensibility,’ & Other Fancy Words” chapter](https://diveinto.html5doctor.com/extensibility.html) of Mark Pilgrim’s seminal [Dive Into HTML5](https://diveinto.html5doctor.com/), which explains [HTML’s microdata features](https://html.spec.whatwg.org/multipage/microdata.html#microdata). Mark wrote that article 13 years ago with a focus on Google Rich Snippets, and so I also referred to his [unofficial guide to migrating Google Rich Snippets to schema.org](https://web.archive.org/web/20110607011745/http://diveintomark.org/archives/2011/06/02/schema-org) and the more recent [“Book” schema from Schema.org](https://schema.org/Book). Armed with that knowledge, here’s how I structured the HTML for each book to convey the name, URL, author’s name, author’s URL, original publishing date, date when the book was updated (if any), and whether it’s available for free:

```html
<li itemscope itemtype="https://schema.org/Book">
	<div itemprop="name">
		<a itemprop="url" href="https://html5forwebdesigners.com/"><abbr title="HyperText Markup Language">HTML</abbr>5 for Web Designers</a>
	</div>
	<div itemprop="author" itemscope itemtype="https://schema.org/Person">
		<span itemprop="name">
			<a itemprop="url" href="https://adactio.com/">Jeremy Keith</a>
		</span>
	</div>
	<div itemprop="author" itemscope itemtype="https://schema.org/Person">
		<span itemprop="name">
			<a itemprop="url" href="https://x.com/rachelandrew/">Rachel Andrew</a>
		</span>
	</div>
	<time itemprop="datePublished">2010</time>, 
	<time itemprop="dateModified">2016</time>
	<div itemprop="isAccessibleForFree" content="true">🆓</div>
</li>
```

## Why I like this HTML

I like this HTML because it conveys so much programmatically determinable information — check out the [structured data](https://validator.schema.org/#url=https%3A%2F%2Falandalton.github.io%2FAuthors-Apart%2F)! — using only 13 elements, and without compromising accessibility. In 2022’s [Modern HTML as a foundation for progressive enhancement](https://www.htmhell.dev/adventcalendar/2022/17/), Gaël Poupard asked, “What if we could improve the HTML stack […], making the markup step more resilient?” I consider microdata, like [WAI-Aria](https://www.w3.org/WAI/standards-guidelines/aria/), a valuable enhancement to HTML. 

Mark’s article asked the reader to pay attention to each word in this sentence: “Microdata annotates the DOM with scoped name/value pairs from custom vocabularies.” The annotation is the enhancement: microdata won’t interfere with your usual best practices for HTML, and — as Doug Abrams explained in [Mind The (Remediation) Gap](https://www.tpgi.com/mind-the-remediation-gap/) — “The vast majority of accessibility lives in the markup.” Getting the name/value pairs right can involve some trial and error, but Mark’s book includes a helpful table that shows [where microdata property values come from](https://diveinto.html5doctor.com/extensibility.html#property-values). You can probably spot those pairs in the HTML above. For example, `itemprop="url"` and `href="https://html5forwebdesigners.com/"` specify the URL for the HTML5 for Web Designers book, inside the `a` element. Notice how nicely this microdata plays with the existing HTML: I was also able to include an `abbr` element to explain the HTML abbreviation. For whatever content your webpage includes, you can probably find a useful schema in the surprisingly comprehensive [full schema hierarchy](https://schema.org/docs/full.html). Schema.org’s [Getting started with schema.org using Microdata](https://schema.org/docs/gs.html) is a useful, concise guide, and that site’s [validator](https://validator.schema.org) will instantly show you the structured data that you’ve added to your webpage with microdata.

## A brief note on laziness

Christmas is a time for relaxing. [Programming Perl](https://www.oreilly.com/library/view/programming-perl-4th/9781449321451/) names laziness, impatience, and hubris as the three great virtues of a programmer, and this code offers us a good opportunity to practice those. Using microdata schemas from Schema.org means that you probably won’t need to spend time thinking up class names or IDs to use in your CSS; instead, you can just write [attribute selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/Attribute_selectors) based on the microdata that you’ve added, like so:

```css
[itemtype="https://schema.org/Book"] > [itemprop="name"] {
font-weight : bold;
font-size : large;
margin-bottom : 1em;
}
```

## How microdata could help your users

I got ahead of myself there; the [HTML design principles](https://www.w3.org/TR/html-design-principles/#:~:text=consider%20users%20over%20authors) say to “consider users over authors”. So, here are some ways in which microdata can benefit your users:

### Microdata could help users when they search the web

Mark Pilgrim’s [“‘Distributed,’ ‘Extensibility,’ & Other Fancy Words” chapter](https://diveinto.html5doctor.com/extensibility.html) concluded with a hypothetical search result in which the search engine shows not only an excerpt of the text from the webpage, but also some of the microdata that he added. That does seem useful: it lends some credibility to the search result, and so should allow users to more easily find what they’re looking for. This has persisted: Google Search Central’s [Introduction to structured data markup in Google Search](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data#:~:text=Adding%20structured%20data%20can%20enable%20search%20results%20that%20are%20more%20engaging%20to%20users%20and%20might%20%20encourage%20them%20to%20interact%20more%20with%20your%20website) says that “Adding structured data can enable search results that are more engaging to users and might encourage them to interact more with your website […]”. To prove the point, Google Search Central’s [case studies](https://developers.google.com/search/case-studies?hl=en) show how well-known organisations have used these techniques to improve search experiences for their users. However, the search engines may or may not show your webpage’s microdata. It doesn’t seem to have happened for my “Authors Apart” webpage yet, and I’m not suprised; Mark qualified his hypothetical example by saying, “And here (modulo the whims of Google, the phase of the moon, and so on and so forth) is what my review might look like in a search result listing”.

### Microdata could help users when they use Artificial Intelligence tools

Similarly to Mark’s point about the whims of Google, Jono Alderson’s recent [What if Schema.org is just… Labels?](https://www.jonoalderson.com/conjecture/what-if-schema-org-is-just-labels/) describes Google’s use of microdata as feeling “limited, selective, inconsistent, and often frustratingly opaque”. Jono goes on to highlight how the relationships that we define through microdata can help users who use AI tools. Of course, you might not consider this to be a net benefit: Molly White’s [AI isn't useless. But is it worth it?](https://www.citationneeded.news/ai-isnt-useless/) weighs up the costs and benefits of these new tools.

### Microdata could help your users by making HTML more prevalent

This is my favourite benefit of using microdata, even if it’s indirect. See, personally, I agree with the National Center on Disability and Access to Education’s [Principles of Accessible Design](https://www.ncdae.org/resources/factsheets/principles.php#:~:text=HTML%20is%20still%20the%20most%20accessible%20format%20for%20almost%20every%20type%20of%20content.) when they said in 2007, “HTML is still the most accessible format for almost every type of content”. So, it seems to me that the more we use HTML, the more accessible our content is for our users. My favourite recent example of this is Knut Hühne’s [microdata-enhanced HTML Webcomponent for Leaflet](https://blog.k-nut.eu/leaflet-microdata-html-webcomponent). ([Leaflet](https://leafletjs.com) is “an open-source JavaScript library for mobile-friendly interactive maps”.) In a nice piece of progressive enhancement, Knut uses microdata to mark up geographical data from an API, so that basic address information is available to everyone on every browser, and graphical maps are available too.

To quote Mark Pilgrim one more time, “Angle brackets don’t impress me much, but I have to admit, that’s pretty cool.’