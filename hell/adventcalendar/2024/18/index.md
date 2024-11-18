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
active: true
intro: "<p>Books are the best Christmas presents. Let’s use them as an example to see how HTML’s microdata features can convey a lot of programmatically determinable information with little effort.</p>"
image: "advent_18"
---
<!-- MM: Thanks for the post. I really like that you picked microdata. I'm happy with it but two things are missing:

1. An explanation how the data is or can be used. Right now all we know is that it's useful in CSS because you don't have to write extra classes. I'd be especially interesting to see how it benefits Authors Apart. 
2. A closing sentence -->

## 📚
<!-- MM: Is it okay if we replace this with text? -->

Books are the best Christmas presents, especially for us web geeks. (I hope you’ll find a [Web Accessibility Cookbook](https://accessibility-cookbook.com/) in your Christmas stocking, gentle reader.) Unfortunately, [A Book Apart closed](https://abookapart.com/pages/about/) this year. Fortunately, the authors reacquired the rights to their books. 
<!-- MM: <3 -->

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

I like this HTML because it conveys so much programmatically determinable information — check out the [structured data](https://validator.schema.org/#url=https%3A%2F%2Falandalton.github.io%2FAuthors-Apart%2F)! — using only 13 elements, and without compromising accessibility. In last year’s [Modern HTML as a foundation for progressive enhancement](https://www.htmhell.dev/adventcalendar/2022/17/), Gaël Poupard asked, “What if we could improve the HTML stack […], making the markup step more resilient?” I consider microdata, like [WAI-Aria](https://www.w3.org/WAI/standards-guidelines/aria/), a valuable enhancement to HTML. 

Mark’s article asked the reader to pay attention to each word in this sentence: “Microdata annotates the DOM with scoped name/value pairs from custom vocabularies.” The annotation is the enhancement: microdata won’t interfere with your usual best practices for HTML, and — as Doug Abrams explained in [Mind The (Remediation) Gap](https://www.tpgi.com/mind-the-remediation-gap/) — “The vast majority of accessibility lives in the markup.” Getting the name/value pairs right can involve some trial and error, but Mark’s article includes a helpful table that shows [where microdata property values come from](https://diveinto.html5doctor.com/extensibility.html#property-values). You can probably spot those pairs in the HTML above. For example, `itemprop="url"` and `href="https://html5forwebdesigners.com/"` specify the URL for the HTML5 for Web Designers book, inside the `a` element. Notice how nicely this microdata plays with the existing HTML: I was also able to include an `abbr` element to explain the HTML abbreviation. For whatever content your webpage includes, you can probably find a useful schema in the surprisingly comprehensive [full schema hierarchy](https://schema.org/docs/full.html).
<!-- MM: Mark's article or Mark's book? -->

## A brief note on laziness

Christmas is a time for relaxing. [Programming Perl](https://www.oreilly.com/library/view/programming-perl-4th/9781449321451/) names laziness, impatience, and hubris as the three great virtues of a programmer, and this code offers us a good opportunity to practice those. Using microdata schemas from Schema.org means that you probably won’t need to spend time thinking up class names or IDs to use in your CSS; instead, you can just write [attribute selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/Attribute_selectors) based on the microdata that you’ve added, like so:

```css
[itemtype="https://schema.org/Book"] > [itemprop="name"] {
font-weight : bold;
font-size : large;
margin-bottom : 1em;
}
```

<!-- KS: Great post, thank you! I think you've made a very good case
     as to why microdata is good for developers. But is there a user
     benefit that could be made more clear and explicit here? You note
     that this pattern can be used "without compromising accessibility,"
     but are there ways in which this helps information to become more
     accessible? Especially if we're thinking about *accessibility* in
     broad terms? -->

