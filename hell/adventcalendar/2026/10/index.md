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

svg {
  fill: currentcolor;
}
```

** TODO: Add basic layout part here **

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

  nav {
    @supports selector(:popover-open) {
      /* Check for popover support */
      @container header (inline-size < 60ch) and not style(--supports-popover: false) {
        /* Checking for style query with a query itself since support is better than at-rule and for container width to display mobile navigation */
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
@container style(--show-mobile-nav: true) {
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
      background: var(
        --color-bg-subtle
      ); /* Make sure the popover background is not transparent */

      a {
        padding-inline: 1em;
      }
    }
  }
}
```

That's it! Now we have a working responsive and accessible header navigation for both narrow and wide screen.
All that's left to do is add some styles and animations to make it look and feel nice.

** TODO: Add UI and animations styles here **












## Conclusion

This is an easy way to create a responsive and accessible header navigation that adapts to both narrow and wide screens.
The only downside to this is that you still need one "magic number" in the container query to determine when to switch between the narrow and wide layouts.

That is definitely a minor inconvenience, one that could definitely be solved with a few lines of javascript.
All it needs needs is to measure and store the size of the desktop navigation compare it to the viewport and flip the custom property, but that falls out of the scope of this post.
And I'm already pretty happy we our current approach.



---

Check out the CodePen for the full code and to see it in all in action.

https://codepen.io/editor/th3s4mur41/pen/01a116cf-9b21-7d44-a370-b568033f4db1
