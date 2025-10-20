---
title: "Them’s the Breaks"
author: "Tyler Sticka"
author_bio: "Tyler Sticka is a creative director, designer, writer and artist from Portland, Oregon. He works with organizations to create and ship expressive, powerful and performant web applications and experiences. He co-owns Cloud Four, a tight-knit web design and development consultancy with an outsized impact. The browser is his favorite design tool, and he loves to draw."
date: 2025-12-17
author_links:
  - label: "Tyler’s homepage and blog"
    url: "https://tylersticka.com"
    link_label: "tylersticka.com"
  - label: "Tyler’s company, Cloud Four"
    url: "https://cloudfour.com"
    link_label: "cloudfour.com"
  - label: "Follow Tyler on Mastodon"
    url: "https://social.lol/@tylersticka"
    link_label: "@tylersticka@social.lol"
intro: "<p>Tyler walks through several HTML options for managing mid-content line breaks: How they work, when they’re appropriate, and alternatives to consider.</p>"
image: "advent25_17"
---

On the web, it’s easy to take line breaks for granted.

We get them for free between our headings, paragraphs, list items, `<div>` elements and more. We display them as-is in our code snippets thanks to `<pre>`. And most magically of all, our browsers insert breaks _automatically_ where lines of text (or other text-like “inline” elements) would otherwise outgrow their container.

But sometimes, that isn’t enough.

Some words are too long and continuous to break automatically. Some words can be “orphaned” onto their own, lonely line. Occasionally, our content demands an overt break; more often, our designs call for their addition or removal.

So it makes sense that HTML provides a few options for managing mid-content breaks. Some famously overused, others less known or understood:

- The “break” element, `<br>`
- The “word break opportunity” element, `<wbr>`
- The “soft hyphen” character, `&shy;`
- The “non-breaking space” character, `&nbsp;`

Let’s “break” down (nyuk, nyuk) those techniques: What they do, when they’re appropriate, and alternatives to consider.

## The “break” element, `<br>`

99% of the time, line breaks in text that are truly _meaningful_ to your content will justify a new paragraph, list item, `<div>` or other block element.

The `<br>` (“break”) element is for those rare exceptions.

For example, a `<br>` can force a break between lines of poetry or song (apologies to [Linkin Park](https://en.wikipedia.org/wiki/One_Step_Closer_(Linkin_Park_song))):

```html
<p>
  Everything you say to me<br>
  (Takes me one step closer to the edge)<br>
  (And I’m about to break)
</p>
```

Or within an address:

```html
<address>
  Portland Japanese Garden<br>
  611 SW Kingston Ave.<br>
  Portland, Oregon 97205
</address>
```

And… that’s pretty much it. As commonplace as `<br>` is, it’s rarely preferable to more semantic HTML.

## The “word break opportunity” element, `<wbr>`

The `<wbr>` element is `<br>`’s less famous, more introverted cousin. It inserts a break _only_ when the text will overflow and the browser can’t find a “break opportunity” (whitespace) of its own.

You wouldn’t want to use `<wbr>` for most text: There’s no hyphenation or anything to indicate where breaks occur. But it can be useful when a string has predictable breakpoints that aren’t spaces.

For example, the slashes in a URL or directory path:

```html
https://htmhell.dev<wbr>/adventcalendar<wbr>/2025<wbr>/17<wbr>/index.html
```

Or dot notation in an object chain:

```html
namespace<wbr>.class<wbr>.object<wbr>.property
```

`<wbr>` should only be used to signify clear break points: You should _not_ attempt to auto-insert `<wbr>` elements willy-nilly as a form of general overflow avoidance. It is also a poor choice for any list-like content, such as breadcrumb navigation.

## The “soft hyphen” character, `&shy;`

The `&shy;`(“soft hyphen”) character reference (`&#173;` for the Unicode stans) functions a lot like `<wbr>`, except a hyphen is inserted just before the break:

```html
anti&shy;dis&shy;establishmen&shy;taria&shy;nism
```

`&shy;` is also surprisingly configurable via CSS. You can replace the hyphens with a character of your choice:

```css
p {
  hyphenate-character: "⋯";
}
```

Or disable them entirely:

```css
p {
  hyphens: none;
}
```

(Why do either of those things? No idea. But you can!)

The hyphenation makes `&shy;` more suitable for typical prose than `<wbr>`. That said, hyphenation in general is a bit of a minefield:

- Breaking up a word between two lines, hyphenated or not, can be challenging for many readers.
- While hyphenation has a long and rich typographic history, its readability has always been highly dependent on the size, layout and justification of the overall text.

I occasionally find `&shy;` helpful when I’m writing and notice a word flowing in a particularly troublesome way. I’d consider frequent usage a signal to simplify my verbiage or tweak my design.

## The “non-breaking space” character, `&nbsp;`

Normally, whitespace characters are the most reliable indication of a line break opportunity. The `&nbsp;` character openly _defies_ that convention, applying a space that is, much like Kimmy Schmidt, _unbreakable_:

```html
Keep&nbsp;it&nbsp;together
```

(The non-breaking space is just one of [many whitespace characters](https://en.wikipedia.org/wiki/Whitespace_character#Unicode) that will prevent a string from breaking as you’d normally expect.)

As useful as that sounds, `&nbsp;` and its cousins should be considered a last resort. They don’t play very well with other techniques for managing breaking and text flow, and they’re virtually impossible to style without additional selectors or [truly epic hacks](https://css-tricks.com/modifying-specific-letters-with-css-and-javascript/).

## Gently Apply Your Breaks

If you’ve followed along to this point, you may notice a pattern: These techniques all have pretty limited use cases!

- `<br>` for poems and addresses
- `<wbr>` for weird run-on strings
- `&shy;` for very occasional hyphenation in prose
- `&nbsp;` when you must avoid a break at all cost

For other mid-content break scenarios, your best bet is CSS!

With `display`, we can stack inline elements as if they were blocks:

```html
<p style="display: grid;">
  <span>Ms. Boop Squanklin,</span>
  <span>Beloved Activist &amp; Icon</span>
</p>
```

Or flow block elements together:

```html
<hgroup style="display: flex; flex-wrap: wrap; column-gap: 1ch;">
  <h1>Heading</h1>
  <p>Subtitle</p>
</hgroup>
```

Or keep key phrases wrapping as one:

```html
<p>
  “Come Together” by
  <span style="display: inline-block;">
    The Beatles
  </span>
</p>
```

We can encourage long strings to wrap more aggressively with `overflow-wrap`:

```css
p {
  overflow-wrap: anywhere;
  /* or */
  overflow-wrap: break-word;
  /* or */
  word-break: break-all;
}
```

Rescue typographic orphans with `text-wrap`:

```css
p {
  text-wrap: balance;
  /* or */
  text-wrap: pretty;
}
```

Or micro-manage break behavior with `white-space`:

```css
.yolo-single-line {
  white-space: nowrap;
}
```

(We can even apply hyphenation and truncation via CSS, but these present their own challenges. See [my justified text explorations](https://cloudfour.com/thinks/justified-text-better-than-expected/) and [some classic truncation wisdom from Karen McGrane](https://css-tricks.com/embracing-asymmetrical-design/).)

Content that calls for a semantic break is rare, but real: It’s good to understand your HTML options for that scenario. But once you’ve plopped in _one_ quick `<br>`, its immediacy makes it tempting to overuse. Resist the urge, and embrace the accessibility, power and maintainability of CSS alternatives. Your audience and your project’s future maintainers will be happy you did!
