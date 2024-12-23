---
title: "Misleading Icons: Icon-Only-Buttons and Their Impact on Screen Readers"
layout: layouts/advent.md
author: "Alexander Muzenhardt"
author_bio: "Alex is a skilled Frontend Developer with a career spanning back to 2015. Since joining cit GmbH in 2019, Alex has specialized in accessibility, crafting inclusive and user-friendly digital experiences that ensure seamless web engagement for everyone."
date: 2024-12-27
tags: advent2024
author_links:
  - label: "Website"
    url: "https://alexmuzenhardt.de/"
    link_label: "alexmuzenhardt.de"
  - label: "Alex on LinkedIn"
    url: "https://www.linkedin.com/in/alexmuzenhardt/"
    link_label: "LinkedIn"
  - label: "Alex on Bluesky"
    url: "https://bsky.app/profile/alexmuzenhardt.bsky.social"
    link_label: "Bluesky"
  - label: "Alex on Github"
    url: "https://github.com/alexmuzenhardt"
    link_label: "Github"
active: true
intro: "<p>In this article, we explore the accessibility challenges of icon-only buttons, their impact on screen readers, and practical solutions to make them inclusive for all users.</p>"
image: "advent24_27"
---

## Introduction

Imagine you’re tasked with building a cool new feature for a product. You dive into the work with full energy, and just before the deadline, you manage to finish it. Everyone loves your work, and the feature is set to go live the next day.
A few days later, you receive an email from a user who can’t access the new feature. The user points out that they don’t understand what the button does. What do they mean? You review your code, locate the button, and start digging into the problem.

```html
<button>
  <i class="icon">📆</i>
</button>
```

## The Problem

You find some good resources explaining that there are people with disabilities who need to be considered in these cases. This is known as accessibility. For example, some individuals have motor impairments and cannot use a mouse. In this particular case, the user is visually impaired and relies on assistive technology like a screen reader, which reads aloud the content of the website or software. The button you implemented doesn’t have any descriptive text, so only the icon is read aloud. In your case, the screen reader says, “Tear-Off Calendar button”. While it describes the appearance of the icon, it doesn’t convey the purpose of the button. This information is meaningless to the user. A button should always describe what action it will trigger when activated. That’s why we need additional descriptive text.

## The Challenge

Okay, you understand the problem now and agree that it should be fixed. However, you don’t want to add visible text to the button. For design and aesthetic reasons, sighted users should only see the icon. Is there a way to keep the button “icon-only” while still providing a meaningful, descriptive text for users who rely on assistive technologies like screen readers?

## The Solution

First, you need to give the button a descriptive name so that a screen reader can announce it.

```html
<button>
  <span>Open Calendar</span>
  <i class="icon">📆</i>
</button>
```

The problem now is that the button’s name becomes visible, which goes against the design guidelines. To prevent this, additional CSS is required.

```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

```html
<button>
  <span class="sr-only">Open Calendar</span>
  <i class="icon">📆</i>
</button>
```

The CSS ensures that the text inside the span-element is hidden from sighted users but remains readable for screen readers. This approach is so common that well-known CSS libraries like TailwindCSS, Bootstrap, and Material-UI include such a class by default.

Although the text of the buttons is not visible anymore, the entire content of the button will be read aloud, including the icon — something you want to avoid.

In HTML you are allowed to use specific attributes for accessibility, and in this case, the attribute **aria-hidden** is what you need. ARIA stands for “Accessible Rich Internet Applications” and is an initiative to make websites and software more accessible to people with disabilities.

The attribute **aria-hidden** hides elements from screen readers so that their content isn’t read. All you need to do is add the attribute **aria-hidden** with the value “true” to the icon element, which in this case is the “i”-element.

```html
<button>
  <span class="sr-only">Open Calendar</span>
  <i class="icon" aria-hidden="true">📆</i>
</button>
```

## Alternative

An alternative is the attribute **aria-label**, which you can assign a descriptive, accessible text to a button without it being visible to sighted users. The purpose of **aria-label** is to provide a description for interactive elements that lack a visible label or descriptive text. All you need to do is add the attribute **aria-label** to the button. The attribute **aria-hidden** and the span-Element can be deleted.

```html
<button>
  <span>Open Calendar</span>
  <i class="icon">📆</i>
</button>
```

With this adjustment, the screen reader will now announce “Open calendar,” completely ignoring the icon. This clearly communicates to the user what the button will do when clicked.

## Which Option Should You Use?

At first glance, the aria-label approach might seem like the smarter choice. It requires less code, reducing the likelihood of errors, and looks cleaner overall, potentially improving code readability.

However, the first option is actually the better choice. There are several reasons for this that may not be immediately obvious:

- Some browsers do not translate aria-label
- It is difficult to copy aria-label content or otherwise manipulated it as text
- aria-label content will not show up if styles fail to load

These are just a few of the many reasons why you should be cautious when using the aria-label attribute. These points, along with others, are discussed in detail in the excellent article "[aria-label is a Code Smell](https://ericwbailey.website/published/aria-label-is-a-code-smell)" by [Eric Bailey](https://github.com/ericwbailey/ericwbailey.website).

## The First Rule of ARIA Use

The “[First Rule of ARIA Use](https://www.w3.org/TR/using-aria/#firstrule)” states:

If you can use a native HTML element or attribute with the semantics and behavior you require already built in, instead of re-purposing an element and adding an ARIA role, state or property to make it accessible, then do so.

## Browser compatibility

Both **aria-label** and **aria-hidden** are supported by all modern browsers and can be used without concern.

## Conclusion

Ensuring accessibility in web design is more than just a nice-to-have—it’s a necessity. By implementing simple solutions like **aria-label** or combining CSS with **aria-hidden**, you can create a user experience that is both aesthetically pleasing and accessible for everyone, including those who rely on screen readers. While there may be different approaches to solving accessibility challenges, the key is to be mindful of all users' needs. A few small adjustments can make a world of difference, ensuring that your features are truly usable by everyone.

Cheers
Alex

# Resources / Links

- [Unicode Character “Tear-Off Calendar”](https://www.compart.com/en/unicode/U+1F4C6)
- [comport Unicode Website](https://www.compart.com/en/unicode/)
- [mdn web docs aria-label](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label)
- [mdn web docs aria-hidden](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-hidden)
- [WAI-ARIA Standard Guidlines](https://www.w3.org/WAI/standards-guidelines/aria/)
- [Tailwind CSS Screen Readers (sr-only)](https://tailwindcss.com/docs/screen-readers)
