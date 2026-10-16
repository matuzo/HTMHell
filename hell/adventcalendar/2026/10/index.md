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

Responsive navigation seems simple: keep the links in a row on a wide screen, then switch to a menu button (often called a hamburger menu) on a narrow one. Implementations often reach for JavaScript or duplicate the navigation markup to create those two layouts. Neither is necessary.

We'll start with semantic HTML, add the Popover API, then use a container query to switch the same list of links between a horizontal navigation and a compact menu. Because the query responds to the header's width instead of the viewport's width, the component also works when it is placed in a narrow sidebar or a wider page layout.

This solution uses modern HTML and CSS, so we'll build it as a progressive enhancement. In browsers that do not support the newer features, the links remain visible and can wrap onto multiple lines.

## The base

While I usually prefer to work with a mobile first approach, in this case we'll start by setting up the desktop version first and add the narrow screen version on top as a progressive enhancement. That way, we can make sure the navigation will always work, even without popover support.

So, let's start with the basic structure of the header: a site logo and a navigation landmark. We'll make sure to add an `aria-label` on `<nav>` to give the navigation landmark a name.

```html
<header class="main-header">
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

Now that we have a basic structure, let's add some styling to make sure our navigation is responsive.

But before we get to that, let us setup the basic CSS structure for our header navigation.
First, let's add a basic reset to remove some margin and padding from common elements as well as the list marker from the navigation lists.

```css
body {
  font-family: system-ui, sans-serif;
  margin: 0;
}

button,
input {
  font: inherit;
  cursor: pointer;
}

:is(button, a, input):focus-visible {
  outline-color: currentcolor;
}

nav {
  ul {
    list-style: none;
    padding: unset;
    margin: unset;
  }
}

svg {
  fill: currentcolor;
}
```

Now that we have a good base, let's add some basic header layout and styling.

```css
body {
  --color-bg: light-dark(oklch(1 0 0), oklch(0 0 0));
  --color-bg-subtle: light-dark(oklch(0.9 0 0), oklch(0.25 0 0));
  --color-text: light-dark(oklch(0 0 0), oklch(1 0 0));

  color-scheme: light dark;
  background: var(--color-bg);
  color: var(--color-text);
}

.main-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-block: 0.5rem;

  background: var(--color-bg-subtle);
  /* Adding a border helps with visual separator in forced-color mode */
  border-block-end: 1px solid var(--color-bg-subtle);
  box-shadow: 0 0 4px 2px oklch(from currentcolor l c h / 0.25);

  .logo {
    block-size: 2lh;
    inline-size: auto;
  }
}
```

### Regular Layout

Now that the header is in place, let's setup the desktop navigation layout which is pretty simple.
We'll add a `flex-wrap: wrap;` as the ultimate fallback to ensure the navigation links wrap to the next line if they no longer fit in a single row since we don't have any popover yet.

```css
.main-header nav {
  ul {
    display: flex;
    flex-wrap: wrap; /* The ultimate fallback */
  }
}
```

## Adding the popover

Next, we'll add a button to open and close the navigation popover.
The icon has a `<title>` linked with `aria-labelledby`, which gives the button an accessible name.

```html
<header class="main-header">
  <img class="logo" src="logo.png" alt="Site logo" />
  <nav aria-label="Main">
    <button commandfor="main-nav" command="toggle-popover">
      <svg
        class="hamburger"
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 256 256"
        aria-labelledby="menu"
      >
        <title id="menu">Menu</title>
        <line
          x1="40"
          y1="128"
          x2="216"
          y2="128"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="16"
        ></line>
        <line
          x1="40"
          y1="128"
          x2="216"
          y2="128"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="16"
        ></line>
        <line
          x1="40"
          y1="64"
          x2="216"
          y2="64"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="16"
        ></line>
        <line
          x1="40"
          y1="192"
          x2="216"
          y2="192"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="16"
        ></line>
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

But our navigation is broken now and always shows the popover button, even when there's enough room for the links to be displayed in a row.
So let's revert that with CSS.

All we need to do here is hide the popover button and make sure the navigation (currently hidden by the default popover styles) is displayed.

```css
.main-header nav {
  button {
    /* hide the button */
    display: none;
  }
  ul {
    display: flex;
    flex-wrap: wrap; /* The ultimate fallback */

    /* reset popover styles */
    position: unset;
    border: none;
    background: none;
  }
}
```

Next, we'll add the styles for the popover layout. We could wrap all that inside supports and container queries, but for the sake of clean and DRY code, we'll define the popover styles separately and then conditionally apply them using a single style query.

So let's start by defining our conditions:

```css
.main-header {
  --show-mobile-nav: false;
  container: header / inline-size;

  nav {
    /* first check popover support */
    @supports selector(:popover-open) {
      /* then check for container size and for style query support */
      @container header (inline-size < 60ch) and style(--show-mobile-nav: false) {
        --show-mobile-nav: true;
      }
    }
  }
}
```

Now that we've defined the conditions for showing the mobile navigation, we can proceed to implement the styles for popover layouts by just checking a single condition.

So let's define the popover layout, which will be used when the navigation links no longer fit in a single row.

First, we'll restore the popover button and the popover styles itself that were hidden in the regular layout.
Then we'll anchor the popover to the header's bottom on the top as well as the right and bottom edge of the page.
Finally we'll add a background color to the popover and some padding to the links for better spacing.

```css
.main-header {
  anchor-name: --nav-button;

  nav {
    @container style(--show-mobile-nav: true) {
      button {
        display: revert;
      }

      [popover] {
        display: revert;
        flex-direction: column;
        position: absolute;
        position-anchor: --nav-button;
        inset-inline-start: unset;
        inset-inline-end: 0;
        inset-block-start: anchor(end);
        inset-block-end: 0;
        block-size: auto;
        /* Make sure the popover background is not transparent */
        background: var(--color-bg-subtle);
        /* Adding a border helps with visual separator in forced-color mode */
        border-inline-start: 1px solid var(--color-bg-subtle);
        box-shadow: 0 6px 4px 2px oklch(from currentcolor l c h / 0.25);

        a {
          display: block;
          padding-block: 0.5em;
          padding-inline: 1.5em;
        }
      }
    }
  }
}
```

That's it! Now we have a working responsive and accessible header navigation for both narrow and wide screen.

## Bonus

All that's left to do is add some styles and animations to make it look and feel nice.

Let's first make out hamburger button turn into a close button when the popover is open.
We've explicitely prepared the SVG with 4 lines (2 lines being stacked in the middle) lnes to prepare for a smooth transition.
All we need is to shrink the top and bottom line into nothing and rotate the middle lines to form a cross.

For accessibility's sake, make sure to wrap the transition into a `prefers-reduced-motion` media query.

```css
.hamburger line {
  transform-origin: center;
}
nav:has(:popover-open) .hamburger {
  & line:nth-of-type(1) {
    transform: rotate(45deg);
  }
  & line:nth-of-type(2) {
    transform: rotate(-45deg);
  }
  & line:nth-of-type(n + 3) {
    transform: scaleX(0);
  }
}

@media (prefers-reduced-motion: no-preference) {
  .hamburger line {
    transition: transform 0.2s ease-out;
  }
}
```

Of course we also want to animate the popover coming and going smoothly, here to only if the user has not requested reduced motion.
The principle is simple, we'll use the scale property to let the navigation grow when opening and shring to nothing when closing.
As many of you might now, to animate popovers smoothly, we need to transition also `display` and `overlay` properties with `allow-discrete`, and use the `@starting-style` at-rule to define the initial state before the transition begins.

There is one caveat though. You might have noticed so far that all the code has been written using logical properties to make is work with both left-to-right and right-to-left languages.
The scale property though is not logical, meaning it doesn't automatically adapt to the text direction. That's why we need to use the `--dir-origin` custom property to adjust the transform origin based on the direction.

```css
html {
  --dir-origin: 1;
  :dir(rtl) {
    --dir-origin: 0;
  }
}

@media (prefers-reduced-motion: no-preference) {
  @container style(--show-mobile-nav: true) {
    nav {
      [popover] {
        transform: scaleX(0);
        /* Use the --dir-origin to make sure the popover is pushed out of to the viewport edge in both LTR & RTL directions */
        transform-origin: calc(100% * var(--dir-origin));
        transition:
          transform,
          display allow-discrete,
          overlay allow-discrete;
        transition-duration: 0.3s;

        &:popover-open {
          transform: scaleX(1);

          @starting-style {
            transform: scaleX(0);
          }
        }
      }
    }
  }
}
```

## Conclusion

This is an easy way to create a responsive and accessible header navigation that adapts to both narrow and wide screens.
The only downside to this is that you still need one "magic number" in the container query to determine when to switch between the narrow and wide layouts.

That is definitely a minor inconvenience, one that could definitely be solved with a few lines of javascript.
All it needs needs is to measure and store the size of the desktop navigation compare it to the viewport and flip the custom property, but that falls out of the scope of this post.

If you want to check the full code including an easy way to test both reading mode, have a look at the CodePen below.

https://codepen.io/editor/th3s4mur41/pen/01a116cf-9b21-7d44-a370-b568033f4db1
