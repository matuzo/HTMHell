---
title: "Accessible and Responsive Header Navigation"
author: "Michaël Vanderheyden"
author_bio: "Michaël Vanderheyden is a web developer passionate about building accessible, user-friendly interfaces with clean and modern HTML and CSS. As a martial artist, he brings discipline and respect to creating thoughtful, high-quality digital experiences."
date: 2026-12-10
author_links:
  - label: "Website"
    url: "https://th3s4mur41.me"
    link_label: "th3s4mur41.me"
  - label: "Bluesky"
    url: "https://bsky.app/profile/th3s4mur41.me"
    link_label: "@th3s4mur41.me"
intro: "<p>A step-by-step guide to an accessible header navigation that responds to available space, using modern HTML and CSS without JavaScript or a 'magic' breakpoint.</p>"
image: "advent26_1"
active: true
---

Responsive navigation seems simple: keep the links in a row, then switch to a menu button (often called a hamburger menu) when they no longer fit. The tricky part is knowing when to switch. The classic solution is setting a fixed breakpoint, but this is only an estimate: longer labels in another language or larger text can make the links overflow sooner. A more advanced solution might use JavaScript to measure the links and trigger the switch. In this walkthrough, we'll instead let CSS respond to the space available, so the layout adapts without a script or a guessed breakpoint.

We’ll start with semantic HTML, add the Popover API, then use CSS to switch between the horizontal links and a compact menu as space allows.

This solution uses modern HTML and CSS, so we'll build it as a progressive enhancement. In browsers that do not support the newer features, we'll fallback to classic solutions to ensure navigation stays usable.

## The Markup

Let's start with the basic structure of the header: a site logo and a navigation landmark. We'll make sure to add an `aria-label` on `<nav>` to give the navigation landmark a name.

```html
<header>
  <img class="logo" src="logo.png" alt="Site logo" />
  <nav aria-label="Main">
    <ul id="main-nav">
      <li><a href="#">Home</a></li>
      <li><a href="#">Page 1</a></li>
      <li><a href="#">Page 2</a></li>
      <li><a href="#">About</a></li>
      <li><a href="#">Contact</a></li>
    </ul>
  </nav>
</header>
```

Next, we'll add a button to open and close the navigation popover. Later, CSS will show the button only when the links no longer fit in a row. The icon has a `<title>` linked with `aria-labelledby`, which gives the button an accessible name.

```html
<header>
  <img class="logo" src="logo.png" alt="Site logo" />
  <nav aria-label="Main">
    <button commandfor="main-nav" command="toggle-popover">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 256 256"
        aria-labelledby="menu"
      >
        <title id="menu">Menu</title>
        <path
          d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,6H216a8,8,0,0,0,0-16Z"
        ></path>
      </svg>
    </button>
    <ul id="main-nav" popover>
      <li><a href="#">Home</a></li>
      <li><a href="#">Page 1</a></li>
      <li><a href="#">Page 2</a></li>
      <li><a href="#">About</a></li>
      <li><a href="#">Contact</a></li>
    </ul>
  </nav>
</header>
```

<p class="highlight"><strong>Note:</strong> This example uses <a href="https://developer.mozilla.org/en-US/docs/Web/API/Invoker_Commands_API">invoker commands</a> to toggle the popover. They reached Baseline in 2025. For broader browser support, replace <code>commandfor</code> and <code>command</code> with <code>popovertarget</code> and <code>popovertargetaction</code>.</p>

That's all the HTML we need. Right now, the popover gives us the compact version of the navigation. Next, we'll use CSS to keep the links in a row when there's enough room and show the popover button when they no longer fit.
