---
title: "#24 A placeholder is not a label"
teaser: ""
date: 2020-11-29T21:00:00
permalink: /{{ title | slug }}/index.html
layout: layouts/entry.njk
author: mmatuzo
badcode: '<input type="text" placeholder="First name">'
goodcode: '
<label for="firstname">First name</label>
<input type="text" id="firstname">'

---

<div class="section bad">

## Bad code

```html
{{ badcode | pretty }}
```

</div>

<div class="section" id="issues">

## Issues and how to fix them

1. Every form input element needs a label. When screen reader users access a form field, the label is announced with the field type (e.g. _first name, edit text_). If it’s missing, users might not know what they’re supposed to fill in (e.g. _edit text_).
2. Some screen readers fall back to `placeholder` as the label, but it’s not recommended to rely on it.
3. By default, placeholder text is displayed in a light grey color with low contrast. It might not be readable for people with low vision or under certain conditions, like strong sunlight.
4. It’s possible to increase contrast by using the `::placeholder` pseudo element, but if contrast is too high, users may mistake a placeholder for data that was automatically filled in.
5. Using and displaying a `<label>` increases the target size of the form field which can be of great help, especially on touch devices.
6. If `placeholder` functions as the only label, the label disappears when the user types. This strains their short-term memory, especially on complex or rarely used forms.
7. Users cannot check what they’ve filled in before submitting a form, because they only see values and no labels.
8. If browsers auto-fill fields, users have to cut-and-paste auto-filled values to check if browsers filled in fields correctly.
9. Placeholder text is cut off if it goes beyond the size of the field.
10. Translation tools like Google Translate might not translate attribute values.
11. Labels work best when they’re placed above the corresponding text field, not _in_ the field.

Check out the [resources section](#resources) at the bottom of this page for more.

</div>

<div class="section">

## Good code

```html
{{ goodcode | pretty }}
```

</div>

<div class="section">

<h2 id="resources">Resources</h2>

- [Placeholders in Form Fields Are Harmful](https://www.nngroup.com/articles/form-design-placeholders/)
- [11 reasons why placeholders are problematic](https://medium.com/simple-human/10-reasons-why-placeholders-are-problematic-f8079412b960) by [Adam Silver](https://twitter.com/adambsilver)
- [Don’t Use The Placeholder Attribute](https://www.smashingmagazine.com/2018/06/placeholder-attribute/) by [Eric W. Bailey](https://ericwbailey.design/)
- [Form Design Quick Fix: Group Form Elements Effectively Using White Space](https://www.nngroup.com/articles/form-design-white-space/)

</div>
