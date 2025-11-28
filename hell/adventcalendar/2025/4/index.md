---
title: "Referencing HTML elements inside Shadow DOM"
author: "mehm8128"
author_bio: "Frontend Engineer at [Cybozu](https://cybozu.co.jp/) in Japan, developing Kintone. Interested in Accessibility, HTML, and UI."
date: 2025-12-04
author_links:
  - label: "Website"
    url: "https://portfolio.hm8128.me"
    link_label: "portfolio.hm8128.me"
  - label: "Bluesky"
    url: "https://bsky.app/profile/hm8128.me"
    link_label: "@hm8128.me"
  - label: "Mastodon"
    url: " https://mastodon.social/@mehm8128"
    link_label: "@mehm8128"
intro: "<p>Introducing a way to create accessible Web Components using Reference Target for Cross-root ARIA and its current state.</p>"
image: "advent25_4"
---
# Referencing HTML elements inside the shadow DOM

Web Components is the web standard way for creating reusable components like React or Vue components.
While Web Components have matured significantly, it still has some missing pieces to make accessible components easily using Shadow DOM.

Today I'll introduce one of these difficulties and the proposed solution to resolve it. Part of this solution is already available in Chrome Canary.

## Problems with referencing HTML elements inside the shadow DOM

First, let's consider a case where we create a checkbox component using custom elements and Declarative Shadow DOM.
In this example, we want to reference the internal `<input>` element by referencing `id="checkbox"` on the `fancy-checkbox`, since we cannot directly reference elements inside the shadow DOM.

```html
<script>
  customElements.define(
    "fancy-checkbox",
    class FancyCheckbox extends HTMLElement {}
  );
</script>

<div>
  <label for="checkbox">I agree with the terms and conditions</label>
  <fancy-checkbox id="checkbox">
    <template shadowrootmode="open">
      <input type="checkbox" id="inner-checkbox" />
    </template>
  </fancy-checkbox>
</div>
```

This approach has two limitations compared to not using the shadow DOM because the `<input type="checkbox">` is failing to be associated with the `<label>`.

1. Clicking the label doesn't focus on the checkbox.
2. The checkbox doesn't have an accessible name.

This is the missing piece that this article addresses. It is not easy to make Web Components fully accessible using Shadow DOM.

I'll introduce the proposed solutions to address these problems.

## Solutions

[The proposal](https://github.com/WICG/webcomponents/blob/gh-pages/proposals/reference-target-explainer.md) divides the work into two phases to simplify the problems.
Phase 1 only deals with targeting a single element in Shadow DOM.
Phase 2 addresses targeting multiple elements.

For the initial release, only Phase 1 will be shipped.

### Phase 1

Let's consider an "enclosing element" concept. An "enclosing element" wraps another element and extends it with extra features and HTML elements.
For example, when we create a `<fancy-checkbox>` component using the shadow DOM, this becomes the "enclosing element" for `<input type="checkbox">`. This allows us to encapsulate and make reusable components with custom styling and additional functionality.

In order to enable us to reference the `<input type="checkbox">` element inside the shadow DOM from `<label>`, Phase 1 introduces the `shadowRootReferenceTarget` attribute. This attribute specifies which element should be referenced as the target of `<label for="checkbox">`.

```html
<div>
  <label for="checkbox">I agree with the terms and conditions</label>
  <fancy-checkbox id="checkbox">
    <template shadowrootmode="open" shadowRootReferenceTarget="inner-checkbox">
      <input type="checkbox" id="inner-checkbox" />
    </template>
  </fancy-checkbox>
</div>
```

Now, when `<label for="checkbox">` tries to reference `<fancy-checkbox id="checkbox>`, it automatically references `<input id="inner-checkbox"` because `shadowRootReferenceTarget` attribute designates its mapping. Finally `<label for="checkbox">` can reference `<input type="checkbox" id="inner-checkbox" />` and provide the accessible name "I agree with the terms and conditions" to `<input type="checkbox" id="inner-checkbox">`. Users can also focus on it by clicking `<label for="checkbox">`.

This also enables the use of ARIA attributes, as shown in the following example using `aria-labelledby`. The same applies to `popovertarget`, `commandfor`, and `interestfor`.
What attributes are in scope is not completely decided. Whether `aria-owns` should be included will be discussed and all other IDREF attributes are likely to be in scope.

[Reference Target: Which attributes are in scope? · Issue #1091 · WICG/webcomponents](https://github.com/WICG/webcomponents/issues/1091)

```html
<div>
  <input type="text" aria-labelledby="label" />
  <fancy-label id="label">
    <template shadowrootmode="open" shadowRootReferenceTarget="inner-label">
      <label id="inner-label">Type your name.</label>
    </template>
  </fancy-label>
</div>
```

Phase 1 is available in Chrome Canary with the "Experimental Web Platform features" flag enabled.

[web-platform-tests dashboard](https://wpt.fyi/results/shadow-dom/reference-target/tentative?label=master&label=experimental&aligned)

Mozilla set their position to "positive" in [September](https://github.com/mozilla/standards-positions/issues/1035), and this feature is proposed as part of [Interop 2026](https://github.com/web-platform-tests/interop/issues/1011). I hope this will become available across all major browsers.

Let's take a look at Phase 2 for multiple elements reference support.

### Phase 2

Phase 2 enables referencing multiple elements or other complicated references.
As one of the solution for phase 2, I introduce `shadowRootReferenceTargetMap` attribute, but other solutions are discussed so it's unclear what solution will be adopted for complicated reference.

[Phase 2 section of the explainer](https://github.com/WICG/webcomponents/blob/gh-pages/proposals/reference-target-explainer.md#-phase-2-referring-to-specific-elements-within-a-shadow-root)

Let's consider creating a combobox using `aria-controls` and `aria-activedescendant`.

```html
<input
  role="combobox"
  type="text"
  aria-controls="animals"
  aria-activedescendant="animals"
/>
<animals-listbox id="animals">
  <template
    shadowrootmode="open"
    shadowRootReferenceTargetMap="aria-controls: listbox,
                                  aria-activedescendant: opt1"
  >
    <div role="listbox" id="listbox">
      <div role="option" id="opt1">Otter</div>
      <div role="option" id="opt2">Opossum</div>
      <div role="option" id="opt3">Ocelot</div>
    </div>
  </template>
</animals-listbox>
```

The first part of the value of the `shadowRootReferenceTargetMap` attribute, `aria-controls: listbox`, means when `aria-controls` references `<animals-listbox>` with the id `animals`, it should reference an element inside the shadow DOM with the id `listbox`. That's `<div role="listbox" id="listbox">` here. `aria-activedescendant: opt1` works the same way.

This provides the flexibility to reference HTML elements inside the shadow DOM, but some concerns are under discussion.

Please check out these issues if you're interested in learning more.

- [Reference Target Tracking Issue · Issue #1086 · WICG/webcomponents](https://github.com/WICG/webcomponents/issues/1086)
- [Reference Target "phase 2": seeking feedback and use cases · Issue #1111 · WICG/webcomponents](https://github.com/WICG/webcomponents/issues/1111)

### Conclusion

Reference Target for Cross-root ARIA enables us to reference HTML elements inside the shadow DOM. This makes developing accessible Web Components easier, especially for UI component libraries and design systems. OpenUI is working on [The OpenUI Design System](https://github.com/openui/design-system), and this feature will be valuable for that project.

I recommend trying this feature in Chrome Canary and providing feedback to the [Web Components CG](https://github.com/WICG/webcomponents).
