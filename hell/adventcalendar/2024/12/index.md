---
title: "HTML and CSS I didn't even know about before I started creating content in Japanese"
layout: layouts/advent.md
author: "Julia Undeutsch"
author_bio: "I am Dev & UX Accessibility Specialist at Atos. After graduating University in Musicology and Japanese Studies in summer 2020, I started learning front-end development and specialized in the topic of web accessibility early on. Since then, I take every opportunity to spread awareness on the topic by regularly creating content in form of writing blog articles and such. I have been certified by IAAP as a Professional in Accessibility Core Competencies (CPACC) in 2022 and got accepted in the Google Developer Expert Program in 2023."
date: 2024-12-12
author_links:
  - label: "Blog"
    url: "https://www.accessibilityfirst.at/"
    link_label: "accessibilityfirst.at"
  - label: "LinkedIn"
    url: "https://www.linkedin.com/in/juliaundeutsch/"
    link_label: "@juliaundeutsch"
active: true
intro: "<p>When creating Japanese web content, there are special HTML elements for characters and bidirectional text that are often unknown but significantly improve the display and functionality, which we will now look at in more detail.</p>"
image: "advent24_12"
---
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

That's the text we'll work with. It means "Example of vertical text. Japanese culture is very rich.":

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
