---
title: "Swallowing camels"
layout: layouts/advent.md
author: "Ida Franceen"
author_bio: "Ida Franceen is a freelance developer. She is also the founder of t12t, a Swedish network focused on digital accessibility. You can find Ida online as Kolombiken."
date: 2023-12-01
tags: advent2023
author_links:
  - label: "t12t.se"
    url: "https://t12t.se"
    link_label: "Website"
  - label: "Kolombiken on Mastodon"
    url: "https://strangeobject.space/@kolombiken"
    link_label: "Mastodon"
active: true
intro: "<p>It's easy to get caught up in fixing less important things. Like arguing about how the screen reader really should be reading things while all of our buttons are still marked up as spans with an onClick event.</p>"
---

When it comes to speaking, writing, and teaching people about accessibility it bothers me when it's all about rules, restrictions, and judgment. In the first draft of this, I was writing to an imaginary colleague. When I read what I had written I realized that it was exactly the opposite of what I wanted it to be. It was full of judgment, rules, and restrictions. But I still felt like there were some good things here and if I could just remove the negativity then this could be useful to someone. Hopefully.

> "So I don't like how the screen reader reads these numbers and I've been experimenting with different kinds of markup to get it to read better, like injecting spans to force it to make proper pauses…"

> "I think the section element is a better fit than the article here but if we change these, then, of course, we need to update the class names in the CSS since it would be weird if it says article when it's a section…"

> "Sometimes there is a h3 when there really should be a h4 so I'm thinking if we could maybe build a plugin that would switch to the correct heading-level automatically then…"

I'm very much guilty of everything mentioned here so I decided that instead of an imaginary colleague, I would write this to myself. And I'm not trying to judge myself. I'm trying to help and make things better. So here it goes.

## The biggest problem

Instead of starting with the first issue I come across, I think a good idea is to start looking into the core functionality. Are there any issues there? If yes, I need to fix them first. But what is the core functionality?

Well, if I'm selling things then the core functionality is probably people being able to buy things. But if I'm trying to get a specific screen reader to read the prices in a way that I like better, and my checkout is broken because no proper form labels are making it impossible for some people to fill in their addresses. Then yes, I'm working on the wrong thing. In other words, I'm straining mosquitoes from my drink while swallowing camels.

## 100% accessible

I've always wanted to make the websites I'm working on perfect. But there is no such thing. Especially when it comes to accessibility. Websites are either more accessible or less accessible. They are never a 100% accessible.

If my core functionality has big issues then my website is less accessible. Trying to fix it all and I will probably end up just fixing a few of the not-so-important things. If I want to move fast towards being more accessible I need to focus on fixing the core issues. There needs to be priorities.

## It's not about me

As a developer, it's so easy to have a so-called "definition-of-done" where things work properly when I test it on my computer. I know there are other devices and other ways of using the web but I constantly need to remind myself of this. It is really easy to get caught up in details like how a screen reader pronounces things. But it's probably not the most important thing for me to care about.

Yes, of course really bad pronunciation may be an indicator that something is missing. Maybe a proper language attribute? Or maybe that my screen reader is not set up properly?
The point is that I need to move away from my priorities and what I find annoying or interesting and consider what might be the biggest obstacle for other people.

## Take a step back

So, if I find myself arguing whether an extra div makes it too tricky for people to apply custom CSS or if the short description list element might be better off as an unordered list then it might be good for me to take a step back, to check the core functionality, and make sure that I didn't just swallow another camel.

P.S. If ”swallowing a camel” is unfamiliar you can [read about the expression at the Cambridge Dictionary Website](https://dictionary.cambridge.org/dictionary/english/strain-at-a-gnat-and-swallow-a-camel).
