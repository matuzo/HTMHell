---
title: "Getting started with Web Performance 🚀"
layout: layouts/advent.md
author: "Alistair Shepherd"
author_bio: "Alistair is a Front End Developer, working the full range of the web but particularly focusing on accessibility, performance and privacy. He works at the agency Series Eight as Lead Developer, building creative websites, ecommerce stores and web apps. He blogs and speaks about performance and making the web simpler."
date: 2023-12-01
tags: advent2023
author_links:
  - label: "Website and blog"
    url: "https://www.alistairshepherd.uk"
    link_label: "alistairshepherd.uk"
  - label: "Mastodon"
    url: "https://mastodon.scot/@accudio"
    link_label: "@accudio@mastodon.scot"
  - label: "Work"
    url: "https://serieseight.com"
    link_label: "Series Eight"
active: true
intro: "<p>Web performance is very important to make websites accessible to all, to improve SEO and to increase conversions. It can be pretty tricky though! We're going to to through why it's important, how to measure performance with metrics and testing tools and some top tips to get going with!</p>"
---

<p>
  <figure>
    <a href="/images/advent2023/web-performance/www-sheep.jpg">
      <picture>
        <source
          type="image/avif"
          srcset="/images/advent2023/web-performance/www-sheep-740.avif 740w, /images/advent2023/web-performance/www-sheep-1000.avif 1000w"
          sizes="(min-width: 62.5rem) 46.25rem, (min-width: 768px) calc(100vw - 16.25rem), calc(100vw - 2.5rem)">
        <source
          type="image/webp"
          srcset="/images/advent2023/web-performance/www-sheep-740.webp 740w, /images/advent2023/web-performance/www-sheep-1000.webp 1000w"
          sizes="(min-width: 62.5rem) 46.25rem, (min-width: 768px) calc(100vw - 16.25rem), calc(100vw - 2.5rem)"
        >
        <img
          alt="Illustration of a sheep eating grass with 'www.'' written on its side. Someone is observing it at a distance through binoculars"
          src="/images/advent2023/web-performance/www-sheep-740.jpg"
          srcset="/images/advent2023/web-performance/www-sheep-740.jpg 740w, /images/advent2023/web-performance/www-sheep-1000.jpg 1000w"
          sizes="(min-width: 62.5rem) 46.25rem, (min-width: 768px) calc(100vw - 16.25rem), calc(100vw - 2.5rem)"
          width="1000"
          height="697"
          loading="eager"
          fetchpriority="high"
        >
      </picture>
    </a>
    <figcaption>Carefully observing websites in the wild</figcaption>
  </figure>
</p>

As the murderous tortoises start to converge on Ryūji’s hideout, they pull out their phone. It’s a cheap, older device but it’s survived the toils of the tortoise-ageddon well so far. Thankfully the internet still exists, although a bit slower, so they’re able to search online for how to scare tortoises away. The first result looks promising so they quickly tap through to find the information they need. But as the loading bar moves at barely a crawl, Ryūji realises with horror that this website is loading far too slowly—20 seconds have passed and it’s still just a white screen! They look up and realise they’ve run out of time, poor website performance was Ryūji’s downfall.

As Ryūji discovered, web performance really matters, and is about making websites fast. I hope that most of us don’t encounter as drastic circumstances as they have! For the rest of us a well performing website is more accessible to people, offers a more enjoyable experience, and may even encourage more views, shares or sales.

But web performance is also quite tricky! Let us go through some of the reasoning, jargon, metrics, tools, and some top tips on how you can improve the performance of websites you look after. Whether you’re a practised performance prophet, dipping your toes into the river of load times, or are desperately hoping someone will explain what an FCP is and why Google wants one, let’s all dig into web performance together!

We’ll be diving into the river of load times and exploring what web performance is, why it’s important, how to measure it and finally my click-baity “**Ten Wild Web Performance Tips! You’ll be saving number 5 for later!**”. If you already know your CLS’ from your FCPs, lab from field data, and are well familiar with Lighthouses (not the ones with big lights) then you can [jump straight to the tips](#tips).

Before we start getting into it, there’s one thing I want to make super clear especially if you haven’t spent a lot of time with web performance: Web performance can be pretty tricky. I mention this so you don’t get demoralised if you hit a wall or struggle to identify an issue as we’re going to fill your performance toolbox with some great metrics, strategies, tools, and tips. These will help you make some real improvements, but know that even with years of experience some things are still a challenge to find! With our toolbox you’ll find that developers, designers, and even managers can each make a meaningful impact on website performance without necessarily being crowned Speed Supremo.

## Table of Contents

1. [Why web performance is important, why should we care?](#why)
2. [What does web performance look like?](#look)
3. [Performance science with Metrics](#metrics)
    1. [Core Web Vitals and the Chrome User Experience report](#cwv-crux)
    2. [LCP — Largest Contentful Paint](#lcp)
    3. [INP — Interaction to Next Paint](#inp)
    4. [CLS — Cumulative Layout Shift](#cls)
    5. [Some bonus metrics if you’re keen](#bonus-metrics)
4. [Testing 101](#testing)
5. [Ten Wild Web Performance Tips!](#tips)
6. [What next?](#what-next)

<h2 id="why">Why web performance is important, why should we care?</h2>

Web performance can often be overlooked, and that’s generally a big mistake. It’s easy to put it on the backlog, assume your development tooling is solving it for you, or think that modern hardware and networks remove the need completely.

But performance is just as important as it ever has been, perhaps even more so! More people than ever are online, relying on the web for crucial services, yet the gap in hardware between the best iPhone and cheapest smartphone has never been more extreme. For that reason, web performance isn’t just a tech problem to solve, it’s a social issue. Our societies require people to use websites, yet we serve 10MB poorly-optimised JavaScript-heavy ‘apps’ via metered connections to a $30 smartphone—that’s never going to work!

Phew, I got a bit serious there! To reiterate, building a website that performs well is important not just for SEO and sales, but also to open the web to more people making it more inclusive and accessible to all.

On a personal level, I travel on trains quite a bit and there’s nothing like free train WiFi or spotty 3G or 4G in rural areas for showing up websites with poor performance (at least in the UK!). When one site takes 5 seconds to load and another takes 50 seconds, I know which one I’d prefer to use.

If you need more convincing, web performance can often be directly correlated to business metrics like traffic, conversions, and sales. [WPO Stats](https://wpostats.com) lists fantastic performance-related Case Studies if you need material to send to your boss or client. Google is also using web performance as a ranking factor in its algorithms—I’ve seen performance improvements increase impressions from Google Search by 300%. That’s nothing to scoff at!

<h2 id="look">What does web performance look like?</h2>

Simply put, web performance is how fast a website loads and feels, and how fast it feels while using it.

There are a few different factors that we’ll get into, but a website that takes a second to go from clicking the link to a fully complete page is pretty quick. On the other hand a slow page might have a long loading screen, parts missing for ages after load, or take a second to react to every click.

<video style="aspect-ratio:740/208" width="740" height="208" controls muted playsinline preload="metadata">
  <source src="/images/advent2023/web-performance/general-740.mp4" type="video/mp4">
</video>
<details>
  <summary>Video description</summary>

  The video shows two websites loading side-by-side, with a timer below each of them. The page they're loading is visually identical at the end, but they load differently.

  The page itself features the HTMHell logo, a title of "HTMHell's Handsome Hat House", a couple of 'article' images, some placeholder content and a large image of hats filling half of the page.

  **On the left** the page loads in with unstyled text after 1 second. As images slowly load in top-to-bottom, they move the other page content around. After 13 seconds the headings increase in size and change style, which after a further 2 seconds is replaced with a custom font. The page finishes loading at 15 seconds.

  **On the right** the page loads in a lot faster, and without any images moving content around. The images and font load in significantly earlier, and the page has finished loading at 4.8 seconds.
</details>
<p><a href="/images/advent2023/web-performance/general.mp4">Full size video</a></p>

<h2 id="metrics">Performance science with Metrics</h2>

Now we know what web performance feels like! Unfortunately feeling is notoriously a not great™ way of comparing things, and humans unfortunately haven’t evolved the ability to instinctively determine web performance just yet. I have been trying to hone my sense of Time To First Byte but am yet to see positive results.

There’s some good news though, the web performance and development community have come up with some fantastic tests, metrics, and analysis methods to help us measure, understand, and compare performance. These make it easy to quantify improvements, set measurable goals and find out where websites can be improved.

I am back with the bad news though: there’s bloody loads of them. They’re a mixture of meaningless jargon and 3 or 4 letter initialisms that will leave you extremely confused and wondering if you’re reading a sci-fi novel. Just take a look at some of this mess:

<p>
  <a href="/images/advent2023/web-performance/wordcloud.png">
    <img
      alt="Wordcloud with around 50 web-performance related terms. The terms don’t matter, the point is how ridiculously busy and chaotic it is"
      src="/images/advent2023/web-performance/wordcloud-740.png"
      srcset="/images/advent2023/web-performance/wordcloud-740.png 740w, /images/advent2023/web-performance/wordcloud-1000.png 1000w"
      sizes="(min-width: 62.5rem) 46.25rem, (min-width: 768px) calc(100vw - 16.25rem), calc(100vw - 2.5rem)"
      width="1000"
      height="500"
      loading="lazy"
    >
  </a>
</p>

If you know your web perf and questioned PES and THWIMP, pat yourself on the back. Those ones aren’t real and I’m pulling your leg. PES is obviously Parakeets Eat Seeds and a THWIMP is obviously this cutie from Super Mario World:

<p>
  <img
    style="image-rendering:pixelated"
    alt="Thwimp from Super Mario World, pixel graphics big rock with spiky edges and a grumpy frown face"
    src="/images/advent2023/web-performance/thwimp.png"
    width="64"
    height="64"
    loading="lazy"
  >
</p>

In all seriousness however, there are loads of metrics, definitions, and jargon that are so easy to forget or get confused about. I’m going to simplify this down, and give you a glossary and description of only the metrics you really need to know. For the moment this will be a summary, we’ll get into the tips on how to fix them later!

<h3 id="cwv-crux">Core Web Vitals and the Chrome User Experience report</h3>

If you’ve used Google’s Pagespeed Insights or Search Console then you may have already heard of Core Web Vitals or the Chrome User Experience report.

Core Web Vitals, initialised to CWV, is a collection of metrics that help to measure web performance in a way that emulates how a user may feel about performance. Google collects and analyses these metrics and a few others to know how fast a website performs. These results can then be used in their search algorithms to reward well-performing websites.

How do they collect those metrics? People navigating with Google Chrome have the performance of the websites they visit anonymously recorded and sent to Google. That’s where the Chrome User Experience Report (CRUX) comes in. CRUX consists of a giant database of the real-world performance of all websites that are visited by a statistically significant number of Chrome users.

You can access CRUX data through Pagespeed Insights, Google Search Console, Google developer APIs, and using various other tools. You can also query the database itself using Google’s BigQuery, but watch out as that can get expensive quickly!

The three metrics used in Core Web Vitals are some of the best we have to understand how fast a website is for real people, and so those metrics will be what we focus on. You can find lots more information about these metrics and many more at [web.dev](https://web.dev/explore/learn-core-web-vitals), I’d recommend checking that out for more technical info.

<h3 id="lcp">LCP — Largest Contentful Paint</h3>

“Wow this website is taking a long time to load” we may say, as we click on a link and are left with a blank or sparse screen for what feels like an age. What we’re seeing here is a slow Largest Contentful Paint.

<video style="aspect-ratio:740/208" width="740" height="208" controls muted playsinline preload="metadata">
  <source src="/images/advent2023/web-performance/lcp-740.mp4" type="video/mp4">
</video>
<details>
  <summary>Video description</summary>
  The video shows two pages loading side-by-side, with a timer below each of them. The page they're loading is visually identical at the end, but they load differently.
  The page itself features the HTMHell logo, a title of "HTMHell Horticultural Heuristics", some placeholder content and a background image of some house plants.
  Both pages load the logo, title and content similarly within 3.5 seconds. The page on the right loads a background image in relatively quickly, appearing all at once at 4 seconds in. The page on the left takes significantly longer to load the image, doing it from top-to-bottom and taking 15.7 seconds before it's completed.
</details>
<p><a href="/images/advent2023/web-performance/lcp.mp4">Full size video</a></p>

LCP measures how long it takes for the largest single piece of content to appear when loading the page. That piece of content could be an image, heading, video, or graphic. For most websites it ends up being a large ‘hero’ image at the top of the page, although this varies per-site.

The goal of LCP is to understand when the main parts of the page load—the parts that the visitor will be most interested in. Your goal should be to load those elements as fast as possible. Aim for an LCP of 2.5 seconds or less.

<h3 id="inp">INP — Interaction to Next Paint</h3>

Imagine we’re browsing a website and click a button or link. We expect it to react instantly but instead we’re left waiting. Did it work? Maybe it didn’t go through? Should we click it again? Turns out it was just very slow at reacting to clicks. We’ve encountered poor Interaction to Next Paint in the wild.

<video style="aspect-ratio:740/352" width="740" height="352" controls muted playsinline preload="metadata">
  <source src="/images/advent2023/web-performance/inp-740.mp4" type="video/mp4">
</video>
<details>
  <summary>Video description</summary>

  The video shows a page with HTMHell logo, a title of "HTMHell Humour Hobbies" and a set of accordions.

  The recording shows a user trying to interact with the accordion buttons, but it takes a second or two after clicking before the accordion responds, making it a bit confusing as they seemingly randomly open/close.

  The accordion titles are a bit silly:
  - What are the HTMHell Humour Hobbies?
  - Is this entire thing complete nonsense?
  - Am I good at coming up with placeholder content for demos?
  - No it appears that I'm probably not actually
</details>
<p><a href="/images/advent2023/web-performance/inp.mp4">Full size video</a></p>

How a website appears is a major part of performance, but if everything appears quickly yet takes a second for any of the buttons or links to respond that’s pretty frustrating! Interaction to Next Paint measures the time it takes between the user interacting with a page and the website something on the screen in response.

Websites with lots of JavaScript running in the background may take longer to ‘react’ to a button press. Your goal should be to make sure interactions are as snappy and responsive as you can. Ideally this will be as fast as you can make it, but you should aim for at least within 200ms.

_Note: Interaction to Next Paint is not yet in Core Web Vitals—it’ll replace the similar First Input Delay (FID) in March 2024. I would recommend focusing on INP already though, you’ll be getting ready and very likely improving FID at the same time!_


<h3 id="cls">CLS — Cumulative Layout Shift</h3>

We’re buying a new Microwave online, have just gone through the full checkout process and are about to click confirm. Oh silly us, we’ve accidentally added 10 Microwaves! We go to click the Cancel button, but suddenly an advert appears, shifting the “Confirm” button to where we clicked! Disaster! That’s Cumulative Layout Shift, one of the trickiest and most frustrating performance metrics.

<video style="aspect-ratio:740/494" width="740" height="494" controls muted playsinline preload="metadata">
  <source src="/images/advent2023/web-performance/cls-740.mp4" type="video/mp4">
</video>
<details>
  <summary>Video description</summary>

  The video shows a page with HTMHell logo, a title of "HTMHell Hamburger Heating Hardware", and a product page for a microwave. There's an image of a generic microwave, a title of "Microwave", description "A very good microwave I'm sure" and "Selected quantity &times;10". Below are two buttons, one saying "Pay now — $6,000" and another saying "I don't need that many microwaves".

  The recording shows a mouse cursor reviewing the page and highlighting the quantity line. They then go and hover over the "I don't need that many microwaves", but just before they click an advert appears above the two buttons. The advert says "YOU NEED MORE BARBECUES BUY BARBECUES AD" and shifts the two buttons down so the user has instead accidentally clicked on the "Pay now — $6,000" button. It changes to "Loading...", the user highlights things in frustration and then the buttons and ad are replaced with a message saying "Success! Enjoy your microwaves".
</details>
<p><a href="/images/advent2023/web-performance/cls.mp4">Full size video</a></p>

Cumulative Layout Shift measures the amount the page shifts around in an unexpected way. Our Microwave example is particularly drastic, where someone ends up doing something they didn’t want to do based on the page shifting. In addition to interactive elements shifting under someone’s cursor, CLS can create extremely frustrating reading experiences where sentences jump around whilst you’re reading them.

CLS is trickier to quantify than LCP and FID. Throughout the user’s visit, every content shift will be given a score based on how much it moved and added up for a ‘cumulative’ total. Lower is better here, so a single small shift may be 0.04 units, whilst a huge advertisement loading late, and pushing content out of the way would be higher at 0.5. You should aim for absolutely no CLS, but less than 0.1 at least.


<h3 id="bonus-metrics">Some bonus metrics if you’re keen</h3>

There are plenty more metrics, and a few others that are very handy to know!

<p>
  <details>
    <summary>Bonus Metrics: FCP, TTFB, SI and FID</summary>

    **First Contentful Paint** (FCP) is similar to Largest Contentful Paint (LCP), but whilst LCP measures the largest piece of content rendered on the screen, FCP measures the first content shown. I guess it _is_ in the names.

    Your FCP could be triggered just by a small amount of text, leaving the page still looking mostly incomplete until the titles, graphics and images appear after. It doesn’t really suggest how fast the site feels, but it is helpful to understand how quickly _something_ is shown, even if this is not the main content of the page.

    **Time to First Byte** (TTFB) is a very simple metric: How long does it take from the very beginning of the request to zoom off to the server and come back with data? TTFB doesn’t tell you anything about what that data is and how long it will take to fully load or appear on the screen, but it can give you some insight into how fast or far away your server is.

    **Speed Index** (SI) is a really handy general metric that provides a rough idea of performance, but doesn’t really tell you any specific information. It measures how quickly a page is visually complete above-the-fold (what is visible on first visit without scrolling). It’s a bit older but still handy for comparison and ongoing tracking.

    **First Input Delay** (FID) is similar to Interaction to Next Paint, but uses a slightly different measurement method and only considers the first input. Interaction to Next Paint is likely more useful especially once adopted by CWV but FID can give you a good impression of responsiveness.
  </details>
</p>

<h2 id="testing">Testing 101</h2>

There are lots of fantastic tools and services that help you to measure and check the performance of websites. Each provides you with access to at least some of the metrics we’ve discussed above, and many will also make it easy to see where improvements can be made. These vary in depth, functionality, and difficulty so try them out and see what works best for you! Most of these tools are free, but there are some bonus paid ones.

One distinction to keep in mind is that not all kinds of tests are the same when it comes to web performance. There are two main types, lab tests and field tests.

* **Lab tests** are run in a controlled environment, like a laboratory! They go off and do some experimentation on your website and report the result. This might be run on your computer or on a remote server. They’re very good at giving you controlled, somewhat consistent results with lots of debug information and suggestions.
* **Field tests** are real-world testing, including the Core Web Vitals we mentioned previously. The data they report comes from real users and is a better representation of how your website performs ‘in the wild’. They’re best for knowing how your website performs on real devices, on real networks and for your audience.

[Google’s Page Speed Insights](https://pagespeed.web.dev) is a handy tool that combines running a lab test with Core Web Vitals to gain some simple field test data. By entering a URL, you’ll get average scores across the Core Web Vitals, alongside a few other metrics from CRUX. It will also run a lab test from a Google server giving you those metrics along with some more in-depth info and suggestions. Page Speed Insights is a fantastic place to start with performance, as it makes it really easy to get the information you need and some tips on what you can improve. Don’t take the improvement times as gospel though, you will likely see some improvement but unlikely as much as it says!

<p>
  <figure>
    <a href="/images/advent2023/web-performance/pagespeed-insights.png">
      <picture>
        <source
          type="image/avif"
          srcset="/images/advent2023/web-performance/pagespeed-insights-740.avif 740w, /images/advent2023/web-performance/pagespeed-insights-1000.avif 1000w"
          sizes="(min-width: 62.5rem) 46.25rem, (min-width: 768px) calc(100vw - 16.25rem), calc(100vw - 2.5rem)">
        <source
          type="image/webp"
          srcset="/images/advent2023/web-performance/pagespeed-insights-740.webp 740w, /images/advent2023/web-performance/pagespeed-insights-1000.webp 1000w"
          sizes="(min-width: 62.5rem) 46.25rem, (min-width: 768px) calc(100vw - 16.25rem), calc(100vw - 2.5rem)"
        >
        <img
          alt="screenshot of a PageSpeed Insights result for developer.mozilla.org with URL field, “Analyze” button and tabs for “Mobile” and “Desktop”. It reports “Discover what your real users are experiencing. Core Web Vitals Assessment: Passed”. It gives results for LCP, FID, CLS, FCP, INP, TTFB and some metadata. Cut off at the bottom is a heading “Diagnose performance issues”"
          src="/images/advent2023/web-performance/pagespeed-insights-740.jpg"
          srcset="/images/advent2023/web-performance/pagespeed-insights-740.jpg 740w, /images/advent2023/web-performance/pagespeed-insights-1000.jpg 1000w"
          sizes="(min-width: 62.5rem) 46.25rem, (min-width: 768px) calc(100vw - 16.25rem), calc(100vw - 2.5rem)"
          width="1000"
          height="586"
          loading="lazy"
        >
      </picture>
    </a>
    <figcaption>Screenshot of a PageSpeed Insights result for developer.mozilla.org</figcaption>
  </figure>
</p>

[Lighthouse](https://developer.chrome.com/docs/lighthouse/overview/) is a lab test that is built into Google Chrome and most Chromium-based browsers. It’s actually what powers the Page Speed Insights lab test and gives you the same information, but because this runs from your computer you have a little more control over the test conditions. You can access it by opening the browser developer tools with F12 and going to the “Lighthouse” or “Audit” tab. It’s a very easy and handy way to quickly check a page you’re working on.

<p>
  <figure>
    <a href="/images/advent2023/web-performance/lighthouse.png">
      <img
        alt="screenshot of Lighthouse within Google Chrome dev tools. It’s testing the HTMHell homepage and has achieved 100 scores across Performance, Accessibility, Best Practices and SEO, and PWA has confetti on it. Under Performance it gives statistics for FCP, LCP, Total Blocking Time, CLS and Speed Index"
        src="/images/advent2023/web-performance/lighthouse-740.png"
        srcset="/images/advent2023/web-performance/lighthouse-740.png 740w, /images/advent2023/web-performance/lighthouse-1000.png 1000w"
        sizes="(min-width: 62.5rem) 46.25rem, (min-width: 768px) calc(100vw - 16.25rem), calc(100vw - 2.5rem)"
        width="1999"
        height="1160"
        loading="lazy"
      >
    </a>
    <figcaption>Screenshot of a Lighthouse report for htmhell.dev</figcaption>
  </figure>
</p>

I really like [GTMetrix](https://gtmetrix.com) for performance tests also, and similar to Page Speed Insights and Lighthouse it’s extremely easy to use and gives you direct feedback and suggestions you can look into. It’s based on a lab test, reports all of the common metrics and has suggestions on improvements that are helpfully categorised by “Impact” which makes prioritising improvements a bit easier.

<p>
  <figure>
    <a href="/images/advent2023/web-performance/gtmetrix.png">
      <picture>
        <source
          type="image/avif"
          srcset="/images/advent2023/web-performance/gtmetrix-740.avif 740w, /images/advent2023/web-performance/gtmetrix-1000.avif 1000w"
          sizes="(min-width: 62.5rem) 46.25rem, (min-width: 768px) calc(100vw - 16.25rem), calc(100vw - 2.5rem)">
        <source
          type="image/webp"
          srcset="/images/advent2023/web-performance/gtmetrix-740.webp 740w, /images/advent2023/web-performance/gtmetrix-1000.webp 1000w"
          sizes="(min-width: 62.5rem) 46.25rem, (min-width: 768px) calc(100vw - 16.25rem), calc(100vw - 2.5rem)"
        >
        <img
          alt="screenshot of GTMetrix performance report of htmhell.dev. It includes report metadata, a grading of A and performance and structure grades of 100%, the Web Vitals LCP, TBT and CLS. Below are tabs for more information including “Summary”, “Performance”, “Structure”, “Waterfall”, “Video” and “History”."
          src="/images/advent2023/web-performance/gtmetrix-740.jpg"
          srcset="/images/advent2023/web-performance/gtmetrix-740.jpg 740w, /images/advent2023/web-performance/gtmetrix-1000.jpg 1000w"
          sizes="(min-width: 62.5rem) 46.25rem, (min-width: 768px) calc(100vw - 16.25rem), calc(100vw - 2.5rem)"
          width="1000"
          height="586"
          loading="lazy"
        >
      </picture>
    </a>
    <figcaption>Screenshot of GTMetrix performance report for htmhell.dev</figcaption>
  </figure>
</p>

[WebPageTest](https://www.webpagetest.org) is amazing, and is where we start to get into the more technical and powerful tools for performance testing. It runs a lab test that is extremely configurable and returns a huge amount of data that you can then analyse. Although it does give you some suggestions, its real power is exposing data about the full loading cycle to you in a way that you can really dig into. For example, did a specific third-party script delay the loading of other assets? When you need to really analyse a website in a repeatable way with as much data as possible WebPageTest is ideal.

<p>
  <figure>
    <a href="/images/advent2023/web-performance/webpagetest.png">
      <picture>
        <source
          type="image/avif"
          srcset="/images/advent2023/web-performance/webpagetest-740.avif 740w, /images/advent2023/web-performance/webpagetest-1000.avif 1000w"
          sizes="(min-width: 62.5rem) 46.25rem, (min-width: 768px) calc(100vw - 16.25rem), calc(100vw - 2.5rem)">
        <source
          type="image/webp"
          srcset="/images/advent2023/web-performance/webpagetest-740.webp 740w, /images/advent2023/web-performance/webpagetest-1000.webp 1000w"
          sizes="(min-width: 62.5rem) 46.25rem, (min-width: 768px) calc(100vw - 16.25rem), calc(100vw - 2.5rem)"
        >
        <img
          alt="screenshot of webpagetest result screen. It includes a lot of metrics but is broken down into three sections, “Performance Summary”, “Page Performance Metrics” and “Visual Page Loading Process”. The Performance Summary has blocks for “Is it Quick?”, “Is it Usable?” and “Is it Resilient?”. The Page Performance Metrics lists a lot of metrics, and the Visual Page Loading Process shows page screenshots against the time they were taken."
          src="/images/advent2023/web-performance/webpagetest-740.jpg"
          srcset="/images/advent2023/web-performance/webpagetest-740.jpg 740w, /images/advent2023/web-performance/webpagetest-1000.jpg 1000w"
          sizes="(min-width: 62.5rem) 46.25rem, (min-width: 768px) calc(100vw - 16.25rem), calc(100vw - 2.5rem)"
          width="1000"
          height="586"
          loading="lazy"
        >
      </picture>
    </a>
    <figcaption>Screenshot of a very small part of the WebPageTest report for htmhell.dev. There is much, much more and a lot more depth that the summary you see here</figcaption>
  </figure>
</p>

In addition to Lighthouse, Chromium-based browsers have some very handy performance tools built into the development tools. The **Network pane** is handy for seeing the full list of requests made by the browser, where they came from and how long they took. This is ideal for checking request order, caching behaviour, and what third-parties are being connected to. The **Performance pane** gives you even more information about how the browser is performing, including JavaScript call stacks, frame counts, tasks in the event loop, and more. These are pretty advanced tools but very powerful.

<p>
  <figure>
    <a href="/images/advent2023/web-performance/chrome-performance.png">
      <picture>
        <source
          type="image/avif"
          srcset="/images/advent2023/web-performance/chrome-performance-740.avif 740w, /images/advent2023/web-performance/chrome-performance-1000.avif 1000w"
          sizes="(min-width: 62.5rem) 46.25rem, (min-width: 768px) calc(100vw - 16.25rem), calc(100vw - 2.5rem)">
        <img
          alt="screenshot of Performance pane within Chrome Devtools. There’s a lot going on including a filmstrip of the site loading, Network Graph and collapsed sections for Timings, Main, GPU, and more. At the bottom there is a Summary and tabs for Bottom-Up, Call Tree and Event Log"
          src="/images/advent2023/web-performance/chrome-performance-740.jpg"
          srcset="/images/advent2023/web-performance/chrome-performance-740.jpg 740w, /images/advent2023/web-performance/chrome-performance-1000.jpg 1000w"
          sizes="(min-width: 62.5rem) 46.25rem, (min-width: 768px) calc(100vw - 16.25rem), calc(100vw - 2.5rem)"
          width="1000"
          height="586"
          loading="lazy"
        >
      </picture>
    </a>
    <figcaption>Screenshot of the Performance tab within the Chrome developer tools. The first things you would look at here are Network, Timings, Frames and Main</figcaption>
  </figure>
</p>

**Firefox and Safari** also have handy performance tools built-in. Safari has the Timelines tab which records a page load and provides screenshots and a huge amount of detail on Network Requests, Layout & Rendering, JavaScript & Events, and CPU usage. Firefox’s Network tab works similarly to Chrome’s with the addition of a quick “Performance Analysis” which reports details about content types, weights, and caching.

We’ve discussed the Chrome User Experience Report a few times already, and a couple of methods of getting that data. One way you can access that data, particularly when looking at how average measurements have changed over time, is by using the **CRUX History API**. There are a few tools for accessing this, but my favourite is through [the CRUX History API notebook on Google Colab](https://colab.research.google.com/github/GoogleChrome/CrUX/blob/main/colab/crux-history-api.ipynb). By inserting a URL and a free CRUX API key you’ll be able to see graphs of how CRUX metrics have changed over time.

Those are the main free tools which I use regularly for testing, but there are a few others that may cost money or are a bit more specific:

* [Calibre](https://calibreapp.com) — automated lab testing and monitoring
* [Speedcurve](https://www.speedcurve.com) — automated lab and field testing, and monitoring
* [Speedlify](https://github.com/zachleat/speedlify) — open-source tester and aggregator of web performance and accessibility
* [Treo](https://treo.sh) — automated lab testing and core web vitals analysis
* Open-source tools based on Lighthouse — there are a ton of open-source tools that use lighthouse for whole-site crawling and testing and more

<h2 id="tips">Ten Wild Web Performance Tips! You’ll be saving number 5 for later!</h2>

Okay, now it’s time for the section we’ve all been waiting for, unless you skipped here from the links in the intro. If you did, you missed some real great stuff up there and at least three jokes that I should have never committed to writing.

On these specific tips, they are some of the most common issues and fixes for websites I encounter. Not every site has all of them, but generally at least a handful. Going into the exact code and details for each will put everyone to sleep, but they’ll give you somewhere to start looking!

### 1. Test! Test! Test!

Tools like the ones above can make it easy to see a simple summary of web performance and give you tips on what to focus on. Run some lab tests after major changes to confirm you’ve actually improved performance, or to check you haven’t caused a regression.

Also consider setting up automated performance monitoring to monitor performance over time, alert you to regressions, and to flag issues on specific pages before lots of visitors are affected.

### 2. Optimise images, optimise them again, and then once more for good luck

Unless you already have perfectly optimised images, they are always the first place to look for performance improvements. In most websites the Largest Contentful Paint element is an image, and generally a huge amount of the total ‘weight’ of pages are images.

There are a few different things you can and should do when optimising images:

* Compress images to reduce file size at the cost of quality. If a 85% quality image at 100kB looks identical to a 100% one at 2MB it’s an easy choice
* Convert to more recent image formats like WebP, AVIF or JpegXL. These formats may make certain images a lot smaller than their JPEG and PNG counterparts
* Resize images to the exact size you need them, and use [responsive images](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images) with `srcset` to offer smaller sizes. This way a browser doesn’t download a huge image it doesn’t need

Manual processing tools like [squoosh.app](https://squoosh.app) make it easy to convert, resize, and optimise images by hand. A CMS may also have partial or full automatic optimisation, or you could consider an image CDN like [Cloudinary](https://cloudinary.com), [Imgix](https://imgix.com) or [CloudImage](https://www.cloudimage.io) to help optimise and resize images on request.

You can also use `loading="lazy"` on your image elements to wait until they’re in view and needed before downloading them, and [Priority Hints](https://web.dev/articles/fetch-priority) with `fetchpriority="high"` to ask the browser to prioritise downloading your LCP image sooner.

### 3. As little JavaScript as possible

JavaScript is the most expensive resource in terms of performance on the web, and is a really common bottleneck when used too much.

Where you can implement something in HTML or CSS then do, and make sure your pages can start rendering without JavaScript.

Avoid large JS libraries where you can and instead use built-in JavaScript APIs, progressive enhancement, or smaller and more performant libraries.

### 4. Watch out for third-parties

Third-party code, tag managers, analytics tools, embeds, and more can have a huge impact on performance. Where it’s possible, consider removing these, or at least take measurements to make sure everyone is aware of their impact!

You’ll be amazed at the number of marketing departments that ask you to “fix their site speed” despite having seven tag managers enabled.

### 5. Cache me if you can

If someone has visited your site and their browser has downloaded all the resources once before, should they really need to do so again?

You can [use caching headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching) to make repeat and subsequent visits a huge amount faster by reusing static assets like CSS and JavaScript instead of having to re-download them frequently.

### 6. Be bold, optimise your fonts

One of the biggest culprits for Cumulative Layout Shift issues is due to web fonts. With a poorly optimised web font you may find your website loading almost entirely with a fallback font or invisible text, and then the entire page shifting as the font kicks in at a different size.

In an ideal performance world you could consider using a system font to avoid loading web fonts at all. In most cases though we can keep the web font but optimise it to make it load faster and more smoothly!

* Serve the font from your origin/domain instead of a third-party
* Limit the number of font files you need to load by reducing the number of weights you use. Do you really need a regular, medium and a semibold?
* Use `font-display:swap;` within `@font-face` to smooth the switch from fallback to custom fonts
* Subset fonts to just the characters you need with a tool like [glyphhanger](https://github.com/zachleat/glyphhanger). If you have a website in only ASCII characters you can reduce your font sizes by up to 50%!
* [Variable Fonts](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Fonts/Variable_Fonts_Guide) combine multiple font weights and styles into a single font file. Whilst it may be larger than a single non-variable font, it’ll generally be smaller than 3 traditional fonts. Go variable it if you can!
* Preload the most important font or two using `&lt;link rel="preload" as="font"&gt;`

Depending on the licence of your font you may not be able to do all of the above — particularly subsetting or loading from your server — so make sure you double-check the font licence first. As Google Fonts are open-source you can do all of the above!

[Zach Leatherman](https://www.zachleat.com/web/comprehensive-webfonts/) and [Harry Roberts](https://csswizardry.com/2020/05/the-fastest-google-fonts/) have some fantastic further reading for font optimisation.

### 7. Server side speed shenanigans

This is one for the full-stackers, back-enders, all-rounders, and devops!

If your website relies on a single, slow server then you may have bottlenecked your site performance on your server speed. If it takes 2 seconds before the browser receives the HTML to render then no matter how much you do on the front-end that’s going to be your limit. You can get an idea of this by looking at the Time to First Byte on a fast connection close to the server. It depends on the systems and work being done but you want to be as close to 0ms as possible, definitely under 500ms.

You can improve this by optimising your servers and code, using a CDN like [Bunny CDN](https://bunny.net/pricing/) or [Fastly](https://www.fastly.com) to cache HTML that’s the same for every user, or by speaking to your web host.

### 8. Stop sharding, or too many origins

Back in the day it was good advice to split up your assets across multiple origins/domains to deal with connection limits in HTTP 1, and to use public CDNs for shared caching. That hasn’t been good advice for a long time now since HTTP/2. It’s time to get everything on one origin!

Put as many assets on your main domain as possible. HTTP/2 or 3 can easily handle those resources and it avoids extra connections to new domains which takes valuable time.

### 9. Split that code

If you have some CSS or JavaScript that runs on only a single page, consider loading that separately only when needed, rather than across the entire website. It will improve the speed of all other pages, and avoid the extra cost of downloading something that a user might never use!

### 10. Consider preloads, but here be dragons

Preloads are a way of having more control over how the browser loads resources. You can use them to ask for certain assets to be downloaded in advance of when they’re needed, or to make the browser prioritise one asset over another.

Be careful with them however, preloading one asset will always delay the loading of something else so it can be very easy to accidentally make things worse!

Preloads are particularly handy for font files, where the browser won’t start downloading them until the CSS has downloaded and rendering has begun. It can also be used for images or other assets that you’re finding are discovered too late.

[Web.dev has an article about preloading critical assets](https://web.dev/articles/preload-critical-assets).

<h2 id="what-next">What next?</h2>

Now my friends, go forth and make fast websites! I hope that you’ve gained more knowledge, confidence, understanding, and resources to test, diagnose and make websites perform better.

This is just the beginning, and there are loads of fantastic resources and people to follow to further your journey to Practised Performance Prophet!

### Courses

* [Lightning Fast Web Performance](https://www.webpagetest.org/learn/lightning-fast-web-performance/) by Scott Jehl
* [Everything I Have Done to Make CSS Wizardry Fast by Harry Roberts](https://csswizardry.gumroad.com/l/eihdtmcwf)

### Books

* [Responsible JavaScript](https://abookapart.com/products/responsible-javascript) by Jeremy Wagner — Book
* [Image Optimization by Addy Osmani](https://www.smashingmagazine.com/2021/04/image-optimization-pre-release/) — Book

### Blogs

* [Google's web.dev](https://web.dev/explore/metrics)
* [CSS Wizardry by Harry Roberts](https://csswizardry.com/archive/)
* [Zach Leatherman](https://www.zachleat.com)
* [Jake Archibald](https://jakearchibald.com)
* [Sia Karamalegos](https://sia.codes)
* [Calibre](https://calibreapp.com/blog)
* [SpeedCurve](https://www.speedcurve.com/blog/)
* [Cloudfour](https://cloudfour.com)
* [Web Performance Calendar](https://calendar.perfplanet.com)
* [DebugBear](https://www.debugbear.com/blog)
