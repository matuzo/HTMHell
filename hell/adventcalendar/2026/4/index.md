---
title: "The struggle with the IME composition issue during form submit event"
author: "mehm8128"
author_bio: "Frontend Engineer at [Cybozu](https://cybozu.co.jp/) in Japan, developing Kintone. Interested in Accessibility, HTML, and UI."
date: 2026-12-04
author_links:
  - label: "Website"
    url: "https://portfolio.hm8128.me"
    link_label: "portfolio.hm8128.me"
  - label: "Bluesky"
    url: "https://bsky.app/profile/hm8128.me"
    link_label: "@hm8128.me"
  - label: "X"
    url: "https://x.com/mehm8128"
    link_label: "@mehm8128"
intro: "<p>Japanese users often accidentally submit forms while typing. It's not only a Japanese problem: let's see why it happens and how to avoid it.</p>"
image: "advent26_4"
active: true
---

Many of us in Japan have accidentally submitted a form or a command by pressing Enter while typing. But this is not a Japanese-specific problem: it can affect Chinese and Korean users as well.

So why does it happen? Let's dive into the cause and its solutions.

## The problem

First, please watch the GIF.

<figure>
<img src="/images/advent2026/ime-composition/form-with-ime.gif" alt="Screen recording of a text field in a browser. While the user is converting typed text with an IME, pressing Enter to confirm the conversion also submits the form." />
<figcaption>The user types "<span lang="ja">標準化団体</span>" (standards organization) with an IME (Input Method Editor). Pressing Enter to confirm the conversion also submits the form.<sup><a id="ref-fn-1" href="#fn-1" role="doc-noteref" aria-label="Footnote #1">[1]</a></sup></figcaption>
</figure>

Chinese, Japanese, and Korean (CJK) users type text with an IME. With an IME, we type the sounds of the words on a keyboard, and the IME converts them into the intended characters. The conversion is called "composition", and the Enter key is typically used to confirm the converted text.

An IME operates at the OS level, so it works in every application, including browsers. You can use the one built into your OS or install another one.

While composing, we expect Enter to confirm the text in the input field. However, some pages treat that key press as an application shortcut and, for example, submit the form unexpectedly.

This is not limited to Enter. Other keys used to operate the IME, such as Tab, the arrow keys, and Esc, can cause the same problem when pages use them as shortcuts.

This was presented by a Japanese developer at Frontend Conference Tokyo 2025.

[IME vs Input Field Shortcuts: Enhancing Text Input Accessibility - Slidev](https://ef81sp.github.io/ime-vs-input-keyboard-shortcut/)

Another IME-related issue was shared at another conference.
[【フロカン@名古屋】F8キーだけがバグる話〜日本語IMEとフォームバリデーション設計〜 (【Frontend Conference@Nagoya】The issue where only the F8 key is buggy: Japanese IME and form validation design)](https://www.canva.com/design/DAHI-amzUYs/iWurz9nUscJssWTecCputA/view)

## The cause and the solution

When you implement form submission using the `keydown` event, this problem can happen.

```js
inputElement.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    submit();
  }
});
```

The `keydown` event can fire even during IME composition. So when users press Enter to confirm the composition, the handler runs and the form is submitted unexpectedly.

You can guard against this with `event.isComposing`, which tells whether an IME composition is in progress.
The following code prevents the unintentional submission.

```js
inputElement.addEventListener("keydown", (event) => {
  if (event.isComposing) {
    return;
  }
  if (event.key === "Enter") {
    submit();
  }
});
```

However, Safari fires these events in a different order. Per the spec, the `keydown` of the Enter key that confirms the composition fires before `compositionend`, so `event.isComposing` is `true`. Safari fires `compositionend` first, so `event.isComposing` is already `false` and the guard doesn't work. Adding a check for `event.keyCode` makes the guard more robust.

```js
inputElement.addEventListener("keydown", (event) => {
  if (event.isComposing || event.keyCode === 229) {
    return;
  }
  if (event.key === "Enter") {
    submit();
  }
});
```

`229` is the `keyCode` that browsers use for key events handled by an IME. See also [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/keydown_event#keydown_events_with_ime).

WebKit landed a fix for this in April 2026, but disabled it again in June 2026 because of too many regression reports. The correct ordering is still behind a feature flag that is off by default, so you should keep the `keyCode` check for now.

[311717 – Fix a regression and turn on correct composition event ordering by default](https://bugs.webkit.org/show_bug.cgi?id=311717)

Alternatively, you can avoid `event.isComposing` and `event.keyCode` by changing how you submit the form. Use the native `submit` event of the `<form>` element instead of `keydown`, or change the shortcut from `Enter` to `Ctrl + Enter`.
Note that this only works for Enter. It does not help with other keys, such as Tab, mentioned in the slides above.

Also note that on Windows, the `keydown` event fired during composition usually has `event.key === "Process"`. So under this condition, checking `event.key === "Enter"`, as in the first example, is enough to avoid the problem there.

## The activities

Several activities have started around the IME problem, mainly by Japanese developers.

- [An ESLint rule (eslint-plugin-ime-safe-form)](https://github.com/hiroya-uga/eslint-plugin-ime-safe-form)
- [A discussion to add a similar lint rule to Biome](https://github.com/biomejs/biome/discussions/10041)
- [A guide in modern-web-guidance](https://github.com/GoogleChrome/modern-web-guidance/blob/main/skills/modern-web-guidance/guides/forms/ime-safe-enter-submit.md)
- [The WebKit bug introduced above, with a fix by a Japanese WebKit developer that is currently disabled again](https://bugs.webkit.org/show_bug.cgi?id=311717)
- [An issue](https://github.com/w3c/wcag/issues/5075) and [a PR](https://github.com/w3c/wcag/pull/5081) to add a sufficient technique to WCAG 2
- [An issue for whatwg/html asking whether IME composition should be treated as a distinct input context](https://github.com/whatwg/html/issues/12398)
- [An issue to add a page about it to the W3C Internationalization (i18n) resources](https://github.com/w3c/i18n-drafts/issues/879)

Thanks to these activities, awareness is slowly growing, and some projects, such as WordPress, have started to handle it.

[Discussion: Help contributors understand how IME (Input Method Editor) users actually type · Issue #82263 · WordPress/gutenberg](https://github.com/WordPress/gutenberg/issues/82263)

## What I don't know

However, I haven't completely understood where this should be handled. Is there a problem in some layer of the OS, the IME, or the browser? Or should developers keep being careful by using the techniques introduced in this article?

If you have an idea, please let me know, or create an issue, PR, or discussion.

## Conclusion

This time it was the IME, which is specific to CJK users. Likewise, your own region may have its own specific problems.
As with web accessibility, what is normal in your environment may not be normal in others. We need to know that and develop with it in mind. It is also important that people who notice a problem raise it in the appropriate place.

The W3C Internationalization Working Group collects known i18n problems and techniques, like the IME issue in this article. Other examples include "Personal names around the world" and "Structural markup and right-to-left text in HTML". Please take a look.

[List of articles and videos - W3C Internationalization](https://www.w3.org/International/articlelist)

Finally, after reading this article, please check whether your forms handle IME composition correctly 😄

<section aria-labelledby="fns">
<h2 id="fns">Footnotes</h2>
<ol>
<li id="fn-1">As described in the cause and the solution section, this doesn't happen on Windows with the naive implementation, so the behavior in the GIF is reproduced artificially. <a href="#ref-fn-1" role="doc-backlink" aria-label="Back to article">↩︎</a></li>
</ol>
</section>
