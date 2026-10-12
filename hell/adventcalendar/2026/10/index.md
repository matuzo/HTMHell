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

## The styles

Now we need to create 2 styles: one for the regular navigation layout and one for the popover layout.
Usually I would go with the mobile first approach, but in this case, we need CSS to evaluate the available space and need to know when the navigation links no longer fit in a row. This requires working with a desktop first approach instead.

But before we get to that, let us setup the basic CSS structure for our header navigation.
First, let's add a basic reset to remove some margin and padding from common elements as well as the list marker from the navigation lists.

```css
body {
  font-family: system-ui, sans-serif;
  margin: 0;
}

button {
  font: inherit;
  cursor: pointer;
}

nav {
  ul {
    list-style: none;
    padding: unset;
    margin: unset;
  }
}
```

** TODO: Add basic layout part here **

### Regular Layout

Now that the header is in place, let's setup the desktop navigation layout which is pretty simple.
All we need to do here is hide the popover button and make sure the navigation (currently hidden by the default popover styles) is displayed.
We'll also add a `flex-wrap: wrap;` as a fallback to ensure the navigation links wrap to the next line if they no longer fit in a single row since we don't have any popover yet.

```css
nav {
  button {
    display: none;
  }
  ul {
    display: flex;

    /* reset popover styles */
    position: unset;
    border: none;
    background: none;

    /* The ultimate fallback */
    flex-wrap: wrap;
  }
}
```

### Popover Layout

Now let's define the popover layout, which will be used when the navigation links no longer fit in a single row.
We'll use a style container query as a trigger for the switch (we'll get to that later).

First, we'll restore the popover button and the popover styles itself that were hidden in the regular layout.
Then we'll anchor the popover to the header's bottom on the top as well as the right and bottom edge of the page.
Finally we'll add a background color to the popover and some padding to the links for better spacing.

```css
@container style(--show-mobile-nav: true) and style(--supports-popover: true) {
  nav {
    button {
      display: revert;
    }

    [popover] {
      display: revert;
      position: absolute;
      position-anchor: --nav-button;
      inset-inline-start: unset;
      inset-inline-end: 0;
      inset-block-start: anchor(end);
      inset-block-end: 0;
      block-size: auto;
      background: oklch(from currentcolor l c h / 0.1);

      a {
        padding-inline: 1em;
      }
    }
  }
}
```

For the automatic switch based on the menu space to work, we'll need to rely on `scroll-timeline` which isn't widely supported yet, so before getting into that, let's add another layer of fallback using a good all container query and magic number combination.

So we'll setup 2 variables: `--supports-popover` and `--show-mobile-nav`.
If both popover and style container queries are supported, we can rely on them to switch between regular and popover layouts.

Then we'll setup the classic container query that will switch to the mobile view based on a predifined fixed value (60ch in our example).

```css
body {
  --supports-popover: false;
  --show-mobile-nav: false;

  @supports selector(:popover-open) {
    @container not style(--supports-popover: unknown) {
      /* if both popover and style query are supported */
      --supports-popover: true;
    }
  }
}

header {
  nav {
    @container (inline-size < 60ch) {
      /* Switch to mobile view with fixed header width */
      --show-mobile-nav: true;
    }
  }
}
```

We'll also disable the `flex-wrap` in our desktop view styles we defined earlier.

```css
ul {
    ...
		/* The ultimate fallback if style queries are not supported */
		flex-wrap: wrap;

		@container style(--supports-popover: true) {
			flex-wrap: nowrap;
		}
	}

```

Now we have a robust responsive layout for our navigation. But the pattern so far isn't new, and still has this magic number in the media/container query that can quickly become an issue. But we' dont want to add JavaScript to calculate the available space, instead we'll rely on `scroll-timeline` and a little trick I learner from Ahmad Shadeed in his [Detect when element overlap with CSS](https://ishadeed.com/article/css-detect-overlap/) article.

### Automatic Switch with Scroll-Timeline

** TODO: Add automatic switching here **
