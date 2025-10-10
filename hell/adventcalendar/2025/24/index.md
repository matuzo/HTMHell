---
title: "Styling by Language: Using the lang Attribute for Multilingual Design"
author: "Julia Undeutsch"
author_bio: "I am Dev & UX Accessibility Specialist at Atos. After graduating University in Musicology and Japanese Studies in summer 2020, I started learning front-end development and specialized in the topic of web accessibility early on. I have been certified by IAAP as a Professional in Accessibility Core Competencies (CPACC) and Web Accessibility Specialist and got accepted in the Google Developer Expert Program in 2023."
date: 2025-12-24
author_links:
  - label: "Blog"
    url: "https://www.accessibilityfirst.at/"
    link_label: "Accessibility First Blog"
intro: "<p>The <code>lang</code> attribute isn’t just for accessibility—it can also help you design elegantly across languages that look and feel very different. English and Japanese are a great example: two writing systems with unique visual rhythms, spacing needs, and font personalities.</p>"
image: "advent25_24"
---

## When East Meets West (on the Same Page)

If you’ve ever built a bilingual English – Japanese website, you know the struggle. English uses letters with ascenders, descenders, and varying widths. Japanese, on the other hand, mixes three scripts: kanji, hiragana, and katakana, each forming balanced, square-like characters.

That means:

- Japanese text usually needs more line height to breathe.
- Kanji often appear denser and more detailed than Latin letters.
- Western fonts can feel too “light” next to Japanese text.

This is where the lang attribute becomes your best friend. And he brings a plus one: CSS.

## Let the Language Drive the Design

```html
<p lang="en">Welcome to our café.</p>
<p lang="ja">私たちのカフェへようこそ。</p>
```

```css
:lang(en) {
  font-family: "Nunito Sans", sans-serif;
  letter-spacing: 0.02em;
}

:lang(ja) {
  font-family: "Noto Sans JP", sans-serif;
  font-optical-sizing: auto;
  line-height: 1.8;
  font-weight: 400;
}
```

Here, the English text uses **Nunito**, which has friendly, rounded shapes. The Japanese version pairs beautifully with **Noto Sans JP (Google Fonts)**, which was designed specifically to harmonize with Latin characters. Read more about the [Noto: A typeface for the world](https://fonts.google.com/noto/specimen/Noto+Sans+JP) project.

### Other solid Japanese font pairings:

- `Noto Serif JP` — more traditional, elegant tone.
- `Roboto` + `Roboto Flex JP` — good for UI-heavy sites.
- `Source Han Sans JP` — professional and high legibility.

## Font Weight and Visual Balance

When mixing languages, a font weight of `400` for Japanese might look visually heavier than `400` in Latin text because kanji are more complex in shape.
You can correct this by slightly adjusting weights between languages:

```css
:lang(en) {
  font-weight: 400;
}

:lang(ja) {
  font-weight: 300;
}
```

This subtle change keeps both scripts visually balanced without the Japanese text looking darker.

## Kanji: Density and Design

Kanji are logographic characters—each one carries meaning, not just sound. Because they’re compact but information-dense, large blocks of kanji can look heavier.

You can help readability with

- Generous `line height` (1.7–1.9)
- Slightly looser letter spacing (`letter-spacing: 0.05em`)
- Avoiding `all-caps` Latin text near kanji—caps feel bulky by comparison

## A Harmonious Example

```html
<h1 lang="en">Discover Japan’s Hidden Spots</h1>
<h1 lang="ja">日本の隠れたスポットを見つけよう</h1>
```

```css
:lang(en) {
  font-family: "Nunito", sans-serif;
  font-weight: 600;
  margin-bottom: 0.5em;
}

:lang(ja) {
  font-family: "Noto Sans JP", sans-serif;
  font-weight: 500;
  line-height: 1.8;
  margin-bottom: 1em;
}
```

When styled this way, the English and Japanese headers align beautifully — neither overpowers the other. It feels cohesive, not like two separate websites forced together.

<p class="highlight"><strong>Bonus Tip: Variable Fonts!</strong> Google’s Noto Sans JP Variable or Roboto Flex JP make it even easier to fine-tune weight and width dynamically between scripts. If you use font-variation-settings, you can ensure text looks balanced across both languages at every viewport size.</p>

## Takeaway

Multilingual design isn’t just about translation — it’s about typographic empathy. English and Japanese each have their own rhythm, density, and shape language. Using the `lang` attribute with the right fonts helps you respect both, creating an experience that feels natural to all readers.

Next time you build a bilingual site, don’t just think about switching words. Think about switching _style_, and let your typography speak both languages fluently.
