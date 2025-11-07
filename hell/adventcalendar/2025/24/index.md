---
title: "Styling by Language: Using the lang Attribute for Multilingual Design"
author: "Julia Undeutsch"
author_bio: "I am Dev & UX Accessibility Specialist at Atos. After graduating University in Musicology and Japanese Studies in summer 2020, I started learning front-end development and specialized in the topic of web accessibility early on. I have been certified by IAAP as a Certified Professional in Web Accessibility (CPWA) and got accepted in the Google Developer Expert Program in 2023."
date: 2025-12-24
author_links:
  - label: "Blog"
    url: "https://www.accessibilityfirst.at/"
    link_label: "Accessibility First Blog"
intro: "<p>The <code>lang</code> attribute isn’t just for accessibility—it can also help you design elegantly across languages that look and feel very different. English and Japanese are a great example: two writing systems with unique visual rhythms, spacing needs, and font personalities.</p>"
image: "advent25_24"
---

<style>
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100..900&family=Noto+Sans:ital,wght@0,100..900;1,100..900&family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap');

  :lang(en) {
  font-family: "Nunito Sans", sans-serif;
  }

  :lang(ja) {
    font-family: "Noto Sans JP", sans-serif;
  }

  p.adjust:lang(ja) {
    font-weight: 300;
  }

  span.adjust:lang(en) {
    font-weight: 400;
  }

  h2.adjust:lang(ja) {
    font-weight: 500;
    letter-spacing: 0.05em;
  }

  h2.adjust span:lang(en) {
    font-family: "Noto Sans", sans-serif;
    font-size: 1.06em;
    letter-spacing: 0;
    vertical-align: -0.03em;
  }
</style>

## When East Meets West (on the Same Page)

If you’ve ever built a bilingual English – Japanese website, you know the struggle. English uses letters with ascenders, descenders, and varying widths. Japanese, on the other hand, mixes three scripts: [kanji](https://en.wikipedia.org/wiki/Kanji), [hiragana](https://en.wikipedia.org/wiki/Hiragana), and [katakana](https://en.wikipedia.org/wiki/Katakana), each forming balanced, square-like characters.

Already last year, I told you about a special HTML element that you can use to style this scripts. Read my post [HTML and CSS I didn't even know about before I started creating content](https://www.htmhell.dev/adventcalendar/2024/12/).

This is not usually a big problem if the entire page is in one language. But when Latin letters are mixed with Japanese characters, as is increasingly the case, the font becomes more difficult to handle.

That means:

- Japanese text usually needs more line height to breathe.
- Kanji often appear denser and more detailed than Latin letters.
- Western fonts can feel too “light” next to Japanese text.

This is where the `lang` attribute becomes your best friend. And he brings a plus one: CSS.

## Let the Language Drive the Design

```html
<p lang="en">Welcome to Starbucks.</p>
<p lang="ja">スターバックスへようこそ。</p>
```

```css
:lang(en) {
  font-family: "Nunito Sans", sans-serif;
}

:lang(ja) {
  font-family: "Noto Sans JP" sans-serif;
}
```

<p lang="en">Welcome to Starbucks.</p>
<p lang="ja">スターバックスへようこそ。</p>

Here, the English text uses **Nunito**, which has friendly, rounded shapes. The Japanese version pairs quite good with **Noto Sans JP (Google Fonts)**, which was designed specifically as a typeface for all writing systems around the world. Since the content is separate, both fonts appear suitable and visually balanced.
Read more about the [Noto: A typeface for the world](https://fonts.google.com/noto/specimen/Noto+Sans+JP) project.

## Font Weight and Visual Balance

However, when both writing systems are mixed together, which is common in the Japanese language today, typographical mismatches become noticeable. Meaning, When mixing languages, a font weight of `400` for Japanese might look visually heavier than `400` in Latin text because kana systems are more complex in shape.

```html
<p lang="ja"><span lang="en">Starbucks</span>へようこそ。</p>
```

<p lang="ja"><span lang="en">Starbucks</span>へようこそ。</p>

You can correct this by slightly adjusting weights between languages:

```css
:lang(en) {
  font-weight: 400;
}

:lang(ja) {
  font-weight: 300;
}
```

<p lang="ja" class="adjust"><span lang="en" class="adjust">Starbucks</span>へようこそ。</p>

This subtle change keeps both scripts visually balanced without the Japanese text looking darker. But if you look more closely and highlight the text, you will notice that the default line height of the whole text is slightly different, due to the different fonts used. And the whole thing becomes even more challenging when kanji characters are mixed in with the text.

## Kanji: Density and Design

Kanji are logographic characters—each one carries meaning, not just sound. Because they’re compact but information-dense, large blocks of kanji can look heavier.

```html
<h2 lang="en">Apple unveils the new iPhone 17 Pro.</h2>
<h2 lang="ja">
  <span lang="en">Apple</span>が新型<span lang="en">iPhone 17 Pro</span>を発表。
</h2>
```

<h2 lang="en">Apple unveils the new iPhone 17 Pro.</h1>
<h2 lang="ja">
  <span lang="en">Apple</span>が新型<span lang="en">iPhone 17 Pro</span>を発表。
</h2>

You can help readability with

- generous `line-height` (1.7–1.9)
- slightly looser letter spacing (`letter-spacing: 0.05em`)
- a not too heavy `font-weight`
- avoiding `all-caps` Latin text near kanji — caps feel bulky by comparison

```css
:lang(ja) {
  font-family: "Noto Sans JP", sans-serif;
  font-weight: 500;
  letter-spacing: 0.05em;
}

:lang(en) {
  font-family: "Noto Sans", sans-serif;
  font-size: 1.06em; /* +5% larger than Japanese */
  letter-spacing: 0;
  vertical-align: -0.03em; /* align baseline slightly */
}
```

<h2 lang="ja" class="adjust"><span lang="en">Apple</span>が新型<span lang="en">iPhone 17 Pro</span>を発表。</h2>

When styled this way, the English and Japanese text sit naturally on the same line — adjusting the English spans with a slightly larger font size and a small `vertical-align` nudge raises their baseline just enough to match the Japanese characters. The result feels balanced in both weight and rhythm — one cohesive headline, not two scripts stitched together.

<p class="highlight"><strong>Bonus Tip: Variable Fonts!</strong> Google’s <a href="https://fonts.google.com/knowledge/glossary/variable_fonts">Variable Fonts</a> make it even easier to fine-tune weight and width dynamically between scripts. If you use <code><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/font-variation-settings">font-variation-settings</a></code>, you can ensure text looks balanced across both languages at every viewport size.</p>

## Takeaway

Multilingual design isn’t just about translation — it’s about typographic empathy. English and Japanese each have their own rhythm, density, and shape language. Using the `lang` attribute with the right fonts helps you respect both, creating an experience that feels natural to all readers.

Next time you use different scripts on your page, don’t just think about switching words. Think about switching _style_, and let your typography speak both languages fluently.

## Resources

- [Noto: A typeface for the world](https://fonts.google.com/noto)
- [Variable Fonts](https://fonts.google.com/knowledge/glossary/variable_fonts)
