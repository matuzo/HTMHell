---
title: "Displaying structured data: HTML table vs. CSS grid"
author: "Krisztina Závecz"
author_bio: "Krisztina is a Frontend Developer with a love for all things front-of-the-frontend. She works for memoQ, contributing to enterprise-grade localization management software. Besides all this, she is either at a gym, on a run or simply just juggling life with her children."
date: 2026-12-12
author_links:
  - label: "Site"
    url: "https://krisztinazavecz.com"
    link_label: "krisztinazavecz.com"
  - label: "Bluesky"
    url: "https://bsky.app/profile/krisztinazavecz.com"
    link_label: "Krisztina Závecz on Bluesky"
image: "advent26_1"
intro: "HTML tables might be a hard nut to crack. You may be tempted to reach for CSS grid instead. But are they really interchangeable in terms of styling options, responsivity and accessibility?"
active: true
---

## Let’s travel back in time!

At first, we had `<table>`. In the early days of web development, it was very common to define the page layout as a `<table>` element, basically abusing an HTML tag for something it was probably never intended to do. Web designers and webmasters did it, for lack of better tools, to allow a full-width header span over two or three columns of content, then close them down again with a full-width footer (aka different versions of “The Holy Grail Layout”).

Ready for a time-travel? You can check my example of one such [old-school table-based layout](https://codepen.io/editor/zkriszti/pen/01a12bea-9470-7c01-ba9b-7a4182c4af99) here (you’ve been warned! 🤪)

Then, if you really needed to add a genuine table, [you added a nested `<table>` (see my example here)](https://codepen.io/editor/zkriszti/pen/01a13427-5da4-7572-938a-23e92e5e2c64). You did the same if you had a specific part with a more unique layout. That was the time before we could use CSS floats, flexbox or grid. Semantics were not emphasized. With no additional context, an HTML element - such as `<table>` - could mean layout or a genuine table at the same time. If you needed to debug such a layout, well… good luck!

With small-screen devices taking off, the concept of responsive design was born. As years passed by and responsive design took off, we, as a profession, collectively learned to communicate intention with HTML and solve layout by CSS.

## The problem of responsive tables

CSS started to evolve and respond to new requirements, and we weren’t left with using tables for layouts anymore: flexbox and grid have solved many layout issues. But what did you do if you needed to make your table responsive? Where, by table, from here on, we refer to content that really serves as structured tabular data.

Responsive tables were often implemented [as a child element of a width-constrained container that is scrollable](https://codepen.io/editor/zkriszti/pen/01a1390c-7fa8-7c99-8225-4cb4ca861b1f). And yes, this solution is indeed responsive, in a sense that it doesn’t make the layout fall apart. But sometimes you may want to offer your users a scroll-free experience, and that’s when you start to think about other options:

- maybe serving a different HTML-structure via device detection?
- doing crazy DOM-manipulation hacks via JavaScript?
- or you could also shrink the size of your table columns, but with this solution, text could break at weird positions, and the content is harder to grasp. Let alone the fact that in most cases, you have little control over the content itself. Also, it looks a little bit… off!?

Indeed, all these options have their obvious or subtle drawbacks.

Personally, I like to think about responsivity as a concept of _adapting_ to the characteristics of the device, which, in most of the cases, means a narrower screen. And from this aspect, with a scrollable div, we didn’t really _adapt_ to the medium, we just _kind of_ gave an often-good-enough solution. All in all, an HTML element being a `<table>` also dictates some limitations with regards to dimension and layout.

My instinct here (and maybe yours, too) would naturally lead us to using CSS grid. Grid can be incredibly flexible when it comes to laying out content. Grid is also 2D like our good ol’ table. But will it be fit for our purposes? Specifically:

- Will it perform better for responsivity?
- Will it be easily stylable for displaying structured data?
- And most of all: will it be accessible? How does a screen reader read the content?

Let’s see for ourselves!

## A “table”… that is a CSS grid in a trenchcoat

In the following pen, we can compare the basic implementation of a regular `<table>` and that of a layout that is made to _look like a table_ via CSS grid:

<p class="codepen" data-height="300" data-pen-title="COMPARISON: Regular table vs. grid-table on one page" data-version="2" data-default-tab="html,result" data-slug-hash="jEBKrRK" data-editable="true" data-user="zkriszti" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/editor/zkriszti/pen/01a159b3-b72f-7881-bbbb-4db236539876">
  COMPARISON: Regular table vs. grid-table on one page</a> by Kriszti Z. (<a href="https://codepen.io/zkriszti">@zkriszti</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

You can notice they almost look the same! Well… almost! But taking a closer look at them (more specifically, at the code), we might notice some interesting issues:

### Let’s address visuals first:

- the table's width will adapt to the content by default. `display: grid` will make your block 100% wide (unless you use inline-grid instead), which may or may not be what you are after
- grid will not add all the default formatting `<th>`s give you out-of-the-box (bolding, centering)
- still looking at headers: to achieve what HTML gives us with the `colspan` attribute, we could solve it with `grid-template-areas`. Which is not _that_ bad, but… we are breaking the [principle of least power](https://www.w3.org/2001/tag/doc/leastPower.html) here: instead of solving the most possible number of requirements at the lowest level (HTML), we went up to the CSS level!
- you could specify your borders using grid gaps, but formatting them (see rule, column-rule, row-rule) is not yet widely supported as of 2026 Q4 - as a result, we will need to resort to some trickery with background color and adding a small-sized gap
- …which gap might have weird rendering issues (thicker than intended/ not being visible at all), leading you to further hacks

### How about responsivity?

By default, `<table>` and a CSS grid based layout would behave the same way: in case of overflowing content, the whole page gets a horizontal scroll, unless parent container specifies otherwise. But sometimes we just do not want horizontal scrollbars.

There are no media queries for HTML structure. So this is where CSS grid could really shine! Look at the following codepen (to demonstrate the concept simply, I removed the spanning footer here) and try to resize it under / above 600px:

<p class="codepen" data-height="300" data-pen-title="A grid disguised as a responsive &amp;quot;&amp;quot;table&amp;quot;&amp;quot;" data-version="2" data-default-tab="html,result" data-slug-hash="dPvKjKy" data-editable="true" data-user="zkriszti" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/editor/zkriszti/pen/01a15fc0-1ac8-775a-8781-bac67d0bb9b9">
  A grid disguised as a responsive &quot;&quot;table&quot;&quot;</a> by Kriszti Z. (<a href="https://codepen.io/zkriszti">@zkriszti</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

What we are doing here, you can’t really achieve with a `<table>`, and we didn’t even need a _lot_ of extra CSS.

### But… is this accessible?!

While nothing could stop you from using semantic elements for your table-like content, your table or table-like grid should still convey the structured nature of your data (that is, the “meta-information” of your table). And while you get this for free if you are using the semantic `<table>`, the grid-based solution lags behind, and won’t give you the structural information without using specific role attributes.

To investigate this, I used 4 versions of the same structured data:

- a semantic `<table>`
- a flat-structure grid with no roles added
- a flat-structure grid using roles of table, columnheader and cell
- trying to keep a correct accessibility-tree with a row-grouped grid that keeps the layout with `display: contents`, using the roles for all levels: table, row, columnheader and cell.

For testing, I used Firefox with NVDA, and JAWS with Chrome, using default settings for both cases.

Appropriately enough, I’ll present my results in the table below: 😄

{% include comparison_table.html %}

I think we can clearly present our winner here: NVDA yields the correct structure when using the `<table>` element 🏆. It is also the `<table>` element where JAWS is giving the best (that is, most user friendly) results - so `<table>` clearly plays in the top league here! That was kind of expected, but how do our grid-versions compare?

Umm, turns out, not so well!

The plain grid-version (GRID 1) just reads the elements out loud. Zero info about the table structure! While visually looks like a table, screen readers' built-in table mode functionality also breaks. 0/10, would not recommend for structured data!

GRID 2 is a bit friendlier. By adding specific roles, it was at least announced that we are in a table and what specific headers we have. Then all the cells are read out in DOM-order, followed by the footer content, and lastly, NVDA also makes the out-of-table announcement that we didn't have in the plain grid version. But it’s still a subpar experience. For example, this flat grid-structure prevents us from adding row roles. If you are using JAWS, this approach fails spectacularly (ie. it says "table with 20 columns and 1 rows" for a table with 5 columns and 4 rows).

GRID 3 differs from GRID 2 in that our grid now has a nested structure and we use display: contents to handle this. It seems pretty well-groomed at first glance. NVDA announces that we are dealing with a table and gives us information about the table structure. We also get our out-of-table announcement at the end, similarly to our previous grid. Neat, isn’t it? But let’s look at it more closely. Row 1 is our header - so far so good, even though columnheader seems to be ignored. But this is the smaller problem. We have two other issues to handle:

<strong>Look… what happens in our first data row, at the third column?</strong> Even though my code used aria-colspan and aria-colindex trying to handle the spanned name-column, the browser didn’t seem to correctly calculate the math. Now, for my sample data, this is not much of an issue, but what if we had numbers in neighboring columns? Or another spanned set of columns? We would have been in for a complete mess.

The other issue is that while our nested structure makes it possible to add row roles, display: contents may break accessibility in other aspects. You need to be very cautious before using it and get up-to-date info about what it may cause in browsers you need to support.


### The message is clear

Don’t let grid’s great responsive opportunities carry you away - **use `<table>` for structured data whenever possible!** While requirements around responsivity might make you consider grid, this shouldn’t be your first choice, as aria attributes can behave buggy and you have to handle many aspects manually to not exclude users.

If you still (_really, absolutely_ must) choose grid for displaying structured data, make sure, as a bare minimum, to:

- add the “table”, “row” and “cell” roles
- keep a very simple, clean structure
- not just throw the aria labels onto your HTML, but test the result with actual screen reader users!

<p class="highlight">Let grid shine for layouts and let table do the heavy-lifting for structured data!</p>

<strong>NOTE:</strong> you can check out all the code examples mentioned in this article at one place in this [CodePen collection](https://codepen.io/collection/PoQrLb).
