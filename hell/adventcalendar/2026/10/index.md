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
intro: "<p>Build a responsive header navigation that keeps its links visible as a row by default and enhances them into a popover navigation when the header is narrow. This guide combines semantic HTML, the Popover API, and CSS container queries, with a fallback for browsers that lack popover support.</p>"
image: "advent26_1"
active: true
---

Imagine a header that keeps its navigation links in a clean row when there's room, then turns them into a compact navigation when the header gets narrow—all without JavaScript or duplicate markup. That's what we'll build: one semantic navigation enhanced with the Popover API and a CSS container query, so it adapts to the header's width whether it's in a full page or a narrow sidebar.

Preview the finished result in the [CodePen](https://codepen.io/editor/th3s4mur41/pen/01a116cf-9b21-7d44-a370-b568033f4db1). Resize the header and try both left-to-right and right-to-left text directions to see how the same navigation adapts.

We'll build it as a progressive enhancement: the basic navigation works first, and browsers that support the newer features get the compact navigation as an extra. In browsers without popover support, the links stay visible and can wrap onto multiple lines.

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
nav {
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
}
```

The [CodePen demo](https://codepen.io/editor/th3s4mur41/pen/01a116cf-9b21-7d44-a370-b568033f4db1) contains more styling rules, but those are not absolutely necessary to make the layout work correctly.
Next, add the header layout and colors.

```css
.main-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-block: 0.5rem;

  background: var(--color-bg-subtle);
  /* Adding a border helps with visual separator in forced-color mode */
  border-block-end: 1px solid var(--color-bg-subtle);
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

## Add a popover button

Now add a button to open and close the navigation popover. The button's SVG icon has a title element that is linked with the svg via `aria-labelledby` to ensure it is accessible to assistive technologies.

```html
<header class="main-header">
  <img class="logo" src="logo.png" alt="Site logo" />
  <nav aria-label="Main">
		<button popovertarget="main-nav" popovertargetaction="toggle">
			<svg
				class="hamburger"
				xmlns="http://www.w3.org/2000/svg"
				width="32"
				height="32"
				viewBox="0 0 256 256"
				aria-labelledby="menu"
			>
				<title id="menu">Menu</title>
				...
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

Next we could add the mobile layout and wrap it all in feature and container queries to toggle the layout, but I personally prefer to set a single custom property and use it to control the layout. That way, you only need to check all of the conditions in one place and have a simple style query to switch between the mobile and wide layouts wherever you need it.

So first, we'll use an `@supports` rule that checks for popover support. Then we'll use a `@container` query to check that the header is narrower than `60ch` and that CSS style queries are available. Here, `60ch` is simply the width that fits this example's content. Choose a breakpoint that works for your own content and design; the right value depends on what you're laying out.

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

Now that we've set the condition, we can use a single style query to apply the compact navigation styles. We call this the “mobile” layout in the CSS variable, but the query responds to the header's width, not the device or viewport.

## Style the compact navigation

When the header is narrow, show the button and style the list as a popover. CSS anchor positioning places the popover relative to the header: its top edge starts at the bottom of the header, and its inline end aligns with the header's inline end (the right edge in left-to-right text, and the left edge in right-to-left text). The background, border, and link padding make the navigation easier to distinguish and use.

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

That's it! We now have a responsive header navigation for wide and narrow containers. The links remain available in browsers that do not support the features used for the compact navigation.

### Supporting browsers without style queries

Style queries are a recent addition to CSS (Baseline newly available 2026). In browsers that don't support them, the compact layout won't be applied, so the links remain visible and can wrap as needed.

If you need to support browsers without style queries, you can omit the style query and apply the compact styles directly inside the popover support and container-width conditions, as shown below. This is more verbose because both conditions need to wrap the compact styles, but browsers that support popovers and size container queries can still use the compact layout. Browsers that lack those features retain the always-visible navigation.

```css
.main-header {
  --show-mobile-nav: false;
  container: header / inline-size;

  nav {
    @supports selector(:popover-open) {
      @container header (inline-size < 60ch) {
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
}
```

## Optional: Add some animations

The navigation works without animation. If you'd like, add these styles to animate the button and popover.

First, turn the hamburger icon into a close icon while the popover is open. The SVG in the [CodePen](https://codepen.io/editor/th3s4mur41/pen/01a116cf-9b21-7d44-a370-b568033f4db1) has four lines: two overlap in the middle. Rotate those middle lines to make a cross, and shrink the top and bottom lines until they disappear.

The icon animation is unlikely to cause a problem, but since it is purely aesthetic, it can safely be disabled when the user has requested reduced motion. This respects the system setting that reduces or removes animation.

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

We can also animate the popover as it opens and closes, again only when the user has not requested reduced motion. The `scale` property makes the popover grow when it opens and shrink when it closes. Because a popover switches between being displayed and hidden, the transition also needs to include `display` and `overlay` with `allow-discrete`. The `@starting-style` rule sets the popover's starting appearance when it opens.

One detail: the CSS so far uses logical properties, which adapt to left-to-right and right-to-left languages. The `scale` property does not know which direction the text uses, so set the transform origin with a custom property. This makes the popover grow from the edge nearest the page edge in either direction.

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
