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

# Introduction

Imagine you’re tasked with building a cool new feature for a product. You dive into the work with full energy, and just
before the deadline, you manage to finish it. Everyone loves your work, and the feature is set to go live the next day.
A few days later, you receive an email from a user who can’t access the new feature. The user points out that they don’t
understand what the button does. What do they mean? You review your code, locate the button, and start digging into the
problem.

![Code snippet showing a button element containing an icon with a calendar emoji. The button lacks accessible labels for screen readers.](./button-without-name.png)

```html

<button>
  <i class="icon">📆</i>
</button>
```

# The Problem
You find some good resources explaining that there are people with disabilities who need to be considered in these
cases. This is known as accessibility. For example, some individuals have motor impairments and cannot use a mouse. In
this particular case, the user is visually impaired and relies on assistive technology like a screen reader, which reads
aloud the content of the website or software. The button you implemented doesn’t have any descriptive text, so only the
icon is read aloud. In your case, the screen reader says, “Tear-Off Calendar button”. While it describes the appearance
of the icon, it doesn’t convey the purpose of the button. This information is meaningless to the user. A button should
always describe what action it will trigger when activated. That’s why we need additional descriptive text.
