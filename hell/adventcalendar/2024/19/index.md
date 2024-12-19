---
title: "Getting Oriented with HTML Video"
author: "Scott Jehl"
author_bio: "Web Designer & Developer. Author of Web Components Demystified, Lightning-Fast Web Performance, Responsible Responsive Design, and Designing with Progressive Enhancement."
author_links:
    - label: "Scott Jehl's Personal Site"
      url: "https://scottjehl.com"
      link_label: "scottjehl.com"
    - label: "Web Components Demystified"
      url: "https://scottjehl.com/learn/webcomponentsdemystified/"
      link_label: "Course"
    - label: "Bluesky"
      url: "https://bsky.app/profile/scottjehl.com"
      link_label: "@scottjehl.com"
    - label: "Mastodon"
      url: "https://elk.zone/mstdn.social/@scottjehl"
      link_label: "@scottjehl"
intro: "<p>In this post, Scott shows us how to serve various orientations, sizes, or even aspect ratios of video declaratively with HTML</p>"
layout: layouts/advent.md
date: 2024-12-19
image: "advent24_19"
tags: advent2024
active: true
---
A couple years back, I was in a window seat on a flight from Amsterdam to New York. The weather was gray and drizzly as the plane took off, but as it punched through the clouds a very different scene revealed itself. Out my window, it looked like a [Maxfield Parrish](https://en.wikipedia.org/wiki/Maxfield_Parrish) painting brought to life. And the plane's speed made it appear to scroll by with this uncanny effect, like a parallax effect that used the wrong easing function. Mesmerizing! I pulled out my phone and recorded a couple of videos.

One in landscape:

<video controls playsinline muted loop class="u-mb">
    <source src="sunset-landscape-1080.mp4">
</video>

And one in portrait:

<video controls playsinline muted loop>
    <source src="sunset-portrait-1080.mp4">
</video>

I didn't realize at the time that those video orientations would come in handy for a little post on this website.

Let's jump ahead a year to mid 2023. For years, many of us had been advocating for a simple, HTML-based way to serve video files in different sizes and formats using media queries—essentially how the `picture` element handles images. I won't rehash the entire history here, but that concept wasn't new or mine to claim. In fact, we once had exactly such a feature. It was a web standard, supported by all browsers, and it even inspired the design of the `picture` element—not the other way around. However, just as `picture` was on track to land, the `video` features that inspired it were removed from the HTML spec and supporting browsers (except WebKit). Many of us believed this was a mistake, as it left developers without an HTML-only solution to serve responsive, art-directed video content. Finally, sometime mid 2023, representatives from Chrome and Firefox agreed and expressed interest in reintroducing the feature, and "responsive video" was back on the standards track.

Jump forward to today: responsive video is once again part of the HTML standard and built back into browsers as well ([I was able to contribute the commits to Firefox](https://scottjehl.com/posts/responsive-video/))! Now that it's back, we can use `media` attributes on HTML `source` elements within HTML `video`, which allow us to describe the conditions in which a particular version or format of a static video file should be downloaded and displayed. It's not meant to solve every video use case, but it's nice for many of them; particularly if you just want to serve an appropriate video file and can't be bothered (or aren't able) to set up HLS streaming.

In today's post, I want to show you how to use this feature to deliver my airplane video so that it's optimized for any viewport it happens to land on.

Let's start with the HTML: a `video` element with some `source`s. Below, I'm offering one video orientation or the other using media queries (check those `media` attributes on the `source` elements)!

```html
<video autoplay controls playsinline muted loop>
  <source media="(orientation: landscape)" src="sunset-landscape-1080.mp4">
  <source src="sunset-portrait-1080.mp4">
</video>
```

Nice. We can do better, though. A 1080px-wide video is a large file to send smaller screens and mp4 isn't the smallest format we can offer for a high-quality video of any resolution. Let's use more media queries to offer some smaller video sizes for each orientation and a webm format for each source too, which I put first so that supporting browsers will pick it over the heavier mp4 alternative.

```html
<video autoplay controls playsinline muted loop>
    <source media="(min-width:721px) and (orientation: landscape)" type="video/webm" src="sunset-landscape-1080.webm">
    <source media="(min-width:721px) and (orientation: landscape)" src="sunset-landscape-1080.mp4">
    <source media="(min-width:721px) and (orientation: portrait)" type="video/webm" src="sunset-portrait-1080.webm">
    <source media="(min-width:721px) and (orientation: portrait)" src="sunset-portrait-1080.mp4">

    <source media="(min-width:481px) and (orientation: landscape)" type="video/webm" src="sunset-landscape-720.webm">
    <source media="(min-width:481px) and (orientation: landscape)" src="sunset-landscape-720.mp4">
    <source media="(min-width:481px) and (orientation: portrait)" type="video/webm" src="sunset-portrait-720.webm">
    <source media="(min-width:481px) and (orientation: portrait)" src="sunset-portrait-720.mp4">

    <source media="(orientation: landscape)" type="video/webm" src="sunset-landscape-480.webm">
    <source media="(orientation: landscape)" src="sunset-landscape-480.mp4">
    <source media="(orientation: portrait)" type="video/webm" src="sunset-portrait-480.webm">
    <source media="(orientation: portrait)" src="sunset-portrait-480.mp4">
</video>
```

Nice! That's a hefty chunk of HTML to be fair, but it does demonstrate the power we're afforded through these features. The video below uses that exact markup, so depending on the size and shape of your viewport when you load this page, you'll be delivered an appropriate video:


<video controls playsinline muted loop>
    <source media="(min-width:721px) and (orientation: landscape)" type="video/webm" src="sunset-landscape-1080.webm">
    <source media="(min-width:721px) and (orientation: landscape)" src="sunset-landscape-1080.mp4">
    <source media="(min-width:721px) and (orientation: portrait)" type="video/webm" src="sunset-portrait-1080.webm">
    <source media="(min-width:721px) and (orientation: portrait)" src="sunset-portrait-1080.mp4">
    <source media="(min-width:481px) and (orientation: landscape)" type="video/webm" src="sunset-landscape-720.webm">
    <source media="(min-width:481px) and (orientation: landscape)" src="sunset-landscape-720.mp4">
    <source media="(min-width:481px) and (orientation: portrait)" type="video/webm" src="sunset-portrait-720.webm">
    <source media="(min-width:481px) and (orientation: portrait)" src="sunset-portrait-720.mp4">
    <source media="(orientation: landscape)" type="video/webm" src="sunset-landscape-480.webm">
    <source media="(orientation: landscape)" src="sunset-landscape-480.mp4">
    <source media="(orientation: portrait)" type="video/webm" src="sunset-portrait-480.webm">
    <source media="(orientation: portrait)" src="sunset-portrait-480.mp4">
</video>

It's worth reiterating a caveat here: responsive video works as you'd expect when you first load the page, but it does not reevaluate sources again after that, so you won't see sources adapt as you resize your browser for example. This is intentional: unfortunately, this first pass of reinstated responsive video support needed to match the behavior it formerly had, which only selected an appropriate video source at page load time. As far as I'm concerned, this is a bug that should be addressed. <a href="https://scottjehl.com/posts/rwd-video/">I've written about it and a few others here</a> if you're interested.

Anyway, for now the native implementation falls a little short, but it handles the hard parts and we can make it a little better if we want to anyway!

Below, I'm wrapping the video in <a href="https://scottjehl.com/posts/even-responsiver-video/">a little HTML Web Component I made called `responsive-video`</a>, which will cause the browser to reevaluate its sources when media conditions change, and also keep the video timecode sync'd properly should a source video change. Markup-wise, it works like this, by wrapping the video and referencing a script:

```html
<responsive-video>
    <video>
    ...sources go here
    </video>
</responsive-video>
<script type="module" src="responsivevideo.js"></script>
```

And here it is in action!

<responsive-video>
    <video controls playsinline muted loop>
        <source media="(min-width:721px) and (orientation: landscape)" type="video/webm" src="sunset-landscape-1080.webm">
        <source media="(min-width:721px) and (orientation: landscape)" src="sunset-landscape-1080.mp4">
        <source media="(min-width:721px) and (orientation: portrait)" type="video/webm" src="sunset-portrait-1080.webm">
        <source media="(min-width:721px) and (orientation: portrait)" src="sunset-portrait-1080.mp4">
        <source media="(min-width:481px) and (orientation: landscape)" type="video/webm" src="sunset-landscape-720.webm">
        <source media="(min-width:481px) and (orientation: landscape)" src="sunset-landscape-720.mp4">
        <source media="(min-width:481px) and (orientation: portrait)" type="video/webm" src="sunset-portrait-720.webm">
        <source media="(min-width:481px) and (orientation: portrait)" src="sunset-portrait-720.mp4">
        <source media="(orientation: landscape)" type="video/webm" src="sunset-landscape-480.webm">
        <source media="(orientation: landscape)" src="sunset-landscape-480.mp4">
        <source media="(orientation: portrait)" type="video/webm" src="sunset-portrait-480.webm">
        <source media="(orientation: portrait)" src="sunset-portrait-480.mp4">
    </video>
</responsive-video>
<script type="module" src="responsivevideo.js"></script>

With that little helper component, our video adapts its size and orientation not only at load, but continuously through a session. *Somebody tell YouTube Shorts and TikTok!*

So now you know how to serve a video in portrait or landscape orientation declaratively with HTML. Happy Holidays.


<script>
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const videos = document.querySelectorAll('video');
  if (!mediaQuery.matches) {
      videos[0].setAttribute('autoplay', 'autplay')
  }
</script>