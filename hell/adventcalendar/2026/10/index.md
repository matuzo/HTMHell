---
title: "Build an Accessible Responsive Header Navigation with HTML and CSS"
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
intro: "<p>Build a responsive header navigation that keeps its links visible as a row by default and enhances them into a popover menu when the header is narrow. This guide combines semantic HTML, the Popover API, and CSS container queries, with a fallback for browsers that lack popover support.</p>"
image: "advent26_1"
active: true
---

Responsive header navigation seems simple: keep the links in a row when there is enough room, then switch to a menu button (often called a hamburger menu) when space is limited. Implementations often use JavaScript or duplicate the navigation markup to create those two layouts. Neither is necessary here.

We'll start with semantic HTML, add the Popover API, then use a CSS container query to switch the same list of links between a horizontal navigation and a compact menu. A container query checks the size of an element's container. Here, it responds to the header's width instead of the viewport's width, so the navigation also works in a narrow sidebar or a wider page layout.

This solution uses modern HTML and CSS, so we'll build it as a progressive enhancement: the basic navigation works first, and browsers that support the newer features get the compact menu as an extra. In browsers without popover support, the links stay visible and can wrap onto multiple lines.

## Start with the HTML structure

I usually prefer a mobile-first approach, but this time we'll start with the wide layout and add the compact version as a progressive enhancement. That way, the navigation still works in browsers without popover support.

Start with a header containing a logo and a navigation landmark. The `aria-label` gives the landmark a name, which helps people using screen readers tell it apart from other navigation areas on the page.

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

This first example shows the simple version of the markup. We'll add a button and the `popover` attribute to this same list in the next section.

## Set up the wide-layout

Before making the navigation responsive, let's set up its basic styles. These examples use CSS nesting, which lets us write styles for child elements inside their parent rule. This reset removes the default list markers, margin, and padding from the navigation list.

```css
body {
  font-family: system-ui, sans-serif;
  margin: 0;
}

button,
input {
  font: inherit;
}

button {
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

Next, add the header layout and colors.

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

The logo and navigation will sit on opposite sides of the header. We'll also add a border to help separate the header in forced-colors mode, where a user's chosen color settings replace many page colors.

Use Flexbox to lay out the links in a row. `flex-wrap: wrap` is the fallback: if the links do not fit, they move onto another line instead of being hidden or overflowing.

```css
.main-header nav {
  ul {
    display: flex;
    flex-wrap: wrap; /* The ultimate fallback */
  }
}
```

## Add a popover menu button

Now add a button to open and close the navigation popover. The button's SVG icon has a title element that is linked with the svg via `aria-labelledby` to ensure it is accessible to assistive technologies.

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

This is the complete markup, replacing the simpler example from the first section. The button controls the list by its `id`. The list becomes a popover, so the browser can show it when the button is activated.

At this point, the button is always visible and the links are hidden by the browser's default popover styles. Next, we'll restore the wide layout: hide the button and show the links as a row.

The `display: flex` declaration overrides the hidden default for the popover list. The other declarations reset some of the browser's default popover styles.

```css
.main-header nav {
  button {
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

Next, we'll decide when to use the compact layout. We could put all its styles inside feature and size checks, but instead we'll set one custom property when the required features are supported and the header is narrow.

The `@supports` rule checks for popover support. The `@container` rule checks that the header is narrower than `60ch` and that CSS style queries are available. The `ch` unit is based on the width of the “0” character, so `60ch` gives us a text-based starting point for the switch. Adjust this value to suit your own links and design.

```css
.main-header {
  --show-mobile-nav: false;
  container: header / inline-size;

  nav {
    @supports selector(:popover-open) {
      @container header (inline-size < 60ch) and style(--show-mobile-nav: false) {
        --show-mobile-nav: true;
      }
    }
  }
}
```

Now that we've set the condition, we can use a single style query to apply the compact menu styles. We call this the “mobile” layout in the CSS variable, but the query responds to the header's width, not the device or viewport.

## Style the compact navigation

When the header is narrow, show the button and style the list as a popover. CSS anchor positioning places the popover relative to the header: its top edge starts at the bottom of the header, and its inline end aligns with the header's inline end (the right edge in left-to-right text, and the left edge in right-to-left text). The background, border, and link padding make the menu easier to distinguish and use.

```css
.main-header {
  anchor-name: --nav-header;

  nav {
    @container style(--show-mobile-nav: true) {
      button {
        display: revert;
      }

      [popover] {
        display: revert;
        flex-direction: column;
        position: absolute;
        position-anchor: --nav-header;
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

That's it! We now have a responsive header navigation for wide and narrow containers. The links remain available in browsers that do not support the features used for the compact menu.

## Optional: Animate the menu

The navigation works without animation. If you'd like, add these styles to animate the menu button and popover.

First, turn the hamburger icon into a close icon while the popover is open. The SVG has four lines: two overlap in the middle. Rotate those middle lines to make a cross, and shrink the top and bottom lines until they disappear.

Only add the transition when the user has not asked for reduced motion. This respects the system setting that reduces or removes animation.

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

We can also animate the popover as it opens and closes, again only when the user has not requested reduced motion. The `scale` property makes the menu grow when it opens and shrink when it closes. Because a popover switches between being displayed and hidden, the transition also needs to include `display` and `overlay` with `allow-discrete`. The `@starting-style` rule sets the popover's starting appearance when it opens.

One detail: the CSS so far uses logical properties, which adapt to left-to-right and right-to-left languages. The `scale` property does not know which direction the text uses, so set the transform origin with a custom property. This makes the menu grow from the edge nearest the page edge in either direction.

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
        /* Make the popover grow from the outer edge in both text directions. */
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

This is one way to build an accessible header navigation that adapts to the space available, without JavaScript. You still need to choose a width in the container query to switch between the wide and compact layouts. Treat `60ch` as a starting point and adjust it until the links fit comfortably in your design.

If you want the switch to happen exactly when the links stop fitting, JavaScript could measure the navigation and the space available, then update the custom property. That is outside the scope of this post.

See the CodePen for the full example, including a way to test both left-to-right and right-to-left text directions:

[View the example on CodePen](https://codepen.io/editor/th3s4mur41/pen/01a116cf-9b21-7d44-a370-b568033f4db1).
