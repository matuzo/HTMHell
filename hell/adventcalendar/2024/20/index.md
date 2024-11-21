---
title: "HTML and CSS that I didn't even know about before I started creating content in Japanese"
layout: layouts/advent.md
author: "Julia Undeutsch"
author_bio: "Short intro about yourself"
date: 2024-12-20
author_links:
  - label: "xy Blog"
    url: "#"
    link_label: "your-awesome-website.com/blog"
  - label: "yx on ABC"
    url: "https://abc-social-media-site"
    link_label: "@xy"
active: true
intro: "<p>Short description of the post</p>"
image: "advent_20"
---
<!-- MM: Love it! -->
<!-- MM: Please send me a short bio (1-2 paragraphs), a short description of the post (1 sentence), and links you want to add to your website, social media, etc. -->

<!-- SS: Really enjoyed reading this article! Always happy to read more articles tackling web content in different languages. -->

Since I started to create content in Japanese, I also wanted to learn about traditional setups, like having Japanese text flow from top to bottom, right to left, like you’d see in newspapers or novels. That's when I discovered CSS properties like `writing-mode: vertical-rl` and HTML tags like `<ruby>`, which add [furigana (phonetic guides)](https://en.wikipedia.org/wiki/Furigana) over [kanji characters](https://en.wikipedia.org/wiki/Kanji).

Honestly, I’d never used these properties before and almost forgot they even existed! But now that I’ve dived into them, I’ll break down how you can implement them step-by-step to get that traditional Japanese look.

<style>
  .step1 {
  font-size: 2rem; /* Adjust font size as needed */
  letter-spacing: 0.2em; /* Ensures legibility */
  line-height: 1.5; /* Adjust line height for spacing */
  text-orientation: mixed; /* Allow for mixed orientation (e.g., hiragana and kanji) */
  writing-mode: vertical-rl; /* Set writing mode to vertical, right to left */
  }
  .vertical-text {
  font-size: 2rem; /* Adjust font size as needed */
  letter-spacing: 0.2em; /* Ensures legibility */
  line-height: 1.5; /* Adjust line height for spacing */
  text-orientation: mixed; /* Allow for mixed orientation (e.g., hiragana and kanji) */
  writing-mode: vertical-rl; /* Set writing mode to vertical, right to left */
}
</style>

<!-- MM: I added this sentence and embedded demo directly in the text. That makes it more tangible. Can you please add the translation? -->
That's the text we'll work with. It means XXXX:

<div class="step0">
  <h1>
    縦書(たてが)きのテキストの例(れい)
  </h1>
  <p>
    日本(にほん)の文化(ぶんか)はとても豊(ゆた)かです。
  </p>
</div>

## Step 1: Setting Up Vertical Text with CSS

First up, we’ll make the text flow vertically from right to left, top to bottom. The CSS property `writing-mode: vertical-rl` is perfect for this. It’s how you make Japanese text look like it’s traditionally printed.

```css
.vertical-text {
  font-size: 2rem; /* Adjust font size as needed */
  letter-spacing: 0.2em; /* Ensures legibility */
  line-height: 1.5; /* Adjust line height for spacing */
  text-orientation: mixed; /* Allow for mixed orientation (e.g., hiragana and kanji) */
  writing-mode: vertical-rl; /* Set writing mode to vertical, right to left */
}
```

<!-- MM: Added another demo here -->
<div class="step1">
  <h1>
    縦書(たてが)きのテキストの例(れい)
  </h1>
  <p>
    日本(にほん)の文化(ぶんか)はとても豊(ゆた)かです。
  </p>
</div>

`writing-mode: vertical-rl`: This property turns the text to vertical, flowing from the top to bottom, starting on the right side of the page.

`text-orientation: mixed`: This keeps kanji and other characters readable. Japanese text often mixes different character types, so mixed is generally the best setting here.

`font-size`, `letter-spacing` and `line-height`: Adjust these to make the text readable and nicely spaced.

## Step 2: Adding Margins for Better Spacing
<!-- MM: Shouldn't this be step 3? Add ruby first and then tweak the styling. -->
When working with vertical text, you can add spacing between blocks with `margin-block`. This CSS property acts like `margin-top` and `margin-bottom` for horizontal text, and `margin-left` and `margin-right` for vertical text.

```css
ruby rt {
  font-size: 0.7rem;
  margin-block: 1px; /* Adds some space between text and ruby text */
}
```

The property comes in very handy when working with multiple languages on your website, because it adjusts spacing based on the flow direction of the text.

<!-- SS: Not necessary but I think you can mention logical CSS properties or provide a link to read more about logical CSS properties, since I believe that is what this section is more about? -->

## Step 3: Adding Furigana with `<ruby>`

In Japanese, furigana (small [hiragana](https://en.wikipedia.org/wiki/Hiragana) or [katakana](https://en.wikipedia.org/wiki/Katakana) text) is often placed above kanji characters to show pronunciation. We can add furigana with the `<ruby>` and `<rt>` tags, which are specifically meant for this purpose.

Here’s how to add furigana:

```html
<div class="vertical-text">
  <ruby>日本<rp>(</rp><rt>にほん</rt><rp>)</rp></ruby>
  の<ruby>文化<rp>(</rp><rt>ぶんか</rt><rp>)</rp></ruby> はとても<ruby
    >豊<rp>(</rp><rt>ゆた</rt><rp>)</rp></ruby
  >
  かです。
</div>
```

<!-- MM: Added another demo here -->
<div class="vertical-text">
  <h1>
    <ruby>縦書<rp>(</rp><rt>たてが</rt><rp>)</rp></ruby>きのテキストの<ruby>例<rp>(</rp><rt>れい</rt><rp>)</rp></ruby>
  </h1>
  <p>
    <ruby>日本<rp>(</rp><rt>にほん</rt><rp>)</rp></ruby>の<ruby>文化<rp>(</rp><rt>ぶんか</rt><rp>)</rp></ruby>はとても<ruby>豊<rp>(</rp><rt>ゆた</rt><rp>)</rp></ruby>かです。
  </p>
</div>

`<ruby>`: Wraps around the kanji characters.

`<rt>`: Contains the furigana, displayed above the kanji.

`<rp>`: Provides fall-back parentheses for browsers that do not support display of ruby annotations.

## Step 4: Putting It All Together

Now, let’s combine everything in a full HTML example. This includes vertical text styling, spacing, and furigana for a traditional Japanese feel:

```html
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <title>Vertical Japanese Text Example</title>
    <style>
      * {
        margin: 0;
      }

      body {
        display: flex;
        justify-content: flex-end;
        padding: 25px;
      }

      .vertical-text {
        font-family: "Noto Sans JP", sans-serif;
        font-size: 1.5rem;
        letter-spacing: 0.2em;
        line-height: 1.5;
        text-orientation: mixed;
        writing-mode: vertical-rl;
      }

      h1 {
        font-size: 2.5rem;
        margin-block: 10px;
      }

      ruby rt {
        font-size: 0.7rem;
        margin-block: 1px;
      }
    </style>
  </head>
  <body>
    <div class="vertical-text">
      <h1>
        <ruby>縦書<rp>(</rp><rt>たてが</rt><rp>)</rp></ruby>きのテキストの<ruby
          >例<rp>(</rp><rt>れい</rt><rp>)</rp></ruby
        >
      </h1>
      <p>
        <ruby>日本<rp>(</rp><rt>にほん</rt><rp>)</rp></ruby>の<ruby
          >文化<rp>(</rp><rt>ぶんか</rt><rp>)</rp></ruby
        >はとても<ruby>豊<rp>(</rp><rt>ゆた</rt><rp>)</rp></ruby>かです。
      </p>
    </div>
  </body>
</html>
```

And there you have it! With just a few CSS properties and HTML tags, you can transform your text to reflect a more traditional Japanese reading style.

実験を楽しむ！

_Enjoy experimenting!_

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="poMawje" data-pen-title="Japanese Example" data-user="YuriDevAT" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/YuriDevAT/pen/poMawje">
  Japanese Example</a> by Julia Undeutsch (<a href="https://codepen.io/YuriDevAT">@YuriDevAT</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

## Resources

- [text-orientation on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/text-orientation)
- [writing-mode on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/writing-mode)
- [margin-block on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/margin-block)
- [ruby on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ruby)
- [rp on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/rp)
- [rt on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/rt)
