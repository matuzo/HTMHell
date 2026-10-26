---
title: "HTML I refuse to use"
author: "Ida Franceen"
author_bio: "Ida Franceen is a freelance developer. She is also the founder of t12t, a Swedish network focused on digital accessibility. You can find Ida online as Kolombiken."
date: 2026-12-23
author_links:
  - label: "Website"
    url: "https://kolombiken.se"
    link_label: "kolombiken.se"
  - label: "Website"
    url: "https://t12t.se"
    link_label: "t12t.se"
  - label: "Mastodon"
    url: "https://front-end.social/@kolombiken"
    link_label: "@kolombiken"
intro: "<p>Is HTML really accessible by default or are there things that might be good to refuse to use?</p>"
image: "advent26_1"
active: true
---

Have you heard that <q>HTML is accessible by default</q>? I used to believe that when I was younger. Surely the smart people writing specifications, deciding what elements should exist and implementing them in the browser made sure that it works for everyone. Guess what?
That's not the case. There is a lot of problematic HTML that we should think twice about before using or just not use at all.

Right, so is this is about old obscure elements and attributes that are rarely used? Well, there are a couple that I don't think I have used in a long time or even ever. Elements like `<samp>` and `<rp>` or the `"ismap"` attribute on an image. This is not about those. I like to dig into HTML that are quite commonly used but that maybe it would be a good idea to use less. Or just not use at all. Ever.

Let's start!

## Lets bin select

I'm not sure when I started to see this element as something really problematic, but I know that [the talk titled "Bin your select tags" by Alice Bartlett](https://www.youtube.com/watch?v=-dH6a6eMdXE) absolutely did contribute to strengthen my opinion. The talk was given at NordicJS back in 2015, and it points out several ways a `<select>` can be hard for people to use. You might think that it's 2026 now and surely everyone know how to use that element? If that's your opinion then tell me when you last saw a person zooming into their browser to try to see things and then hitting a select handled it? Or how someone confuse the selected state with the focused state resulting in the wrong value being chosen?

A common argument for using the select element is to save space: <q>We just can't display all the choices on the page.</q> I've heard that argument when there are three options to choose from, I've also heard it when there are a hundred. So let me give you a few alternatives.
If you have a short list of options use radio inputs instead. All options are visible without having to open something and it's much easier to navigate and choose. If it's a really long list of alternatives but people know the answer use a text input. Common examples might be a date or a country. When using a text input remember to not force people to write the exact thing. It's easy enough to normalize data nowadays to not demand that. Let people spell things wrong and write in a format they like.
Using three different select elements to fill in a date is just harder for everyone. Let's refuse to use select!

### When to refuse

- When people know the answer, and it's faster and easier to use a text input.
- When there are few alternatives and a radio input provide a better overview and easier interaction.
- When you can choose more than one thing. Few people know how to handle a select with a `"multiple"` attribute even if they are given instructions. Use checkboxes instead.

### When it might be ok

- When people don't know the answer, there are several alternatives to choose from, displaying them all at the same time would make it really hard to get an overview and it's not feasible to build a custom component.

<p class="highlight"><strong>Bonus rant: </strong>Why is the bad decision of using a select for year of birth always followed by the equally terrible decision of having the default be the current year? Unless it's a form for babies it's unlikely to ever be the correct year.<br>
Or, as someone on Mastodon put it: <q>It’s damn humiliating how long it takes to scroll all the way down to 1971!</q></p>

## In your face

The second element is our beloved `<dialog>`. I say beloved cause it seems like a lot of people have really taken to it. And yes, the element itself does solve a lot of things that were very problematic with the custom `<div>`-soup we managed with JavaScript in the past. That's cool.
But often it shouldn't be there in the first place. It's an annoying element, very similar to the window popups of the past. It's in your face and you are desperately trying to close it in order to get back to the page behind the popup. Why did you have to be interrupted like this?
Want people to sign up for your newsletter? Don't use a dialog. Use a form on the page. Want people to log in? Don't use a dialog. Use a dedicated login page or a login form on the current page. Have you ever tried to register an account somewhere via a dialog and then there are terms that opens in a new dialog on top? Dialog misery. Let's use them less!

### When to refuse

- When there is a possibility of having a dialog on top of a dialog.
- When people are still fine even if they don't drop everything to focus on the dialog.

### When it might be ok

- When it's very important that people do drop everything and take action.

## The worst attribute ever

The `"disabled"` attribute. You guessed that this one would pop up? Good job! It's really an attribute that shouldn't be used at all. At least not in the context of a form. It's confusing for everyone. You know that button that you keep hitting without anything happening? I think you know what I mean. And if you don't, then take some time and read [this article by my friend Hampus on why "Disabled buttons suck"](https://axesslab.com/disabled-buttons-suck/).

But it's not only buttons. This is about all form elements. That text input with a value with bad contrast that you can't do anything with. The grey radio input with the wrong value but you can't choose the right one and nobody is telling you why. Disabled form fields are almost always hard to perceive and they end up confusing people. If you'd like to dig deeper [Adrian has an article regarding using disable on form controls](https://adrianroselli.com/2024/02/dont-disable-form-controls.html).

Why do we keep using this attribute? The main reason is that it's easy to implement. You don't have to explain anything and the burden is on people using your form to understand why they can't do something.

A pet-peeve of mine is disabled form elements in a design system. In my opinion a design system should consist of elements that you'd like people to use. Why promote a thing that shouldn't exist?

### When to refuse

- Always. Especially in a form.
- When you are building a design system.

### When it might be ok

- Never.

<p class="highlight"><strong>Bonus rant: </strong>
A dig at the HTML specification. Did you know that you can disable an entire form by setting a disabled attribute on the surrounding fieldset attribute? Why is this allowed? Should be illegal. Let's refuse to use it!</p>

## Be critical

So are there only two elements and one attribute that we should avoid? Of course not. There are more, but it's Christmas Eve tomorrow and I feel like three things are enough right now. (I'm open to writing a part two though.)

The major thing I want you to remember here is not these three things. It's to always be critical of your use of a certain element or attribute. Is it the right HTML for the job? Will this work well for as many people as possible? Are there better options?

Keep in mind that just because something exists it doesn't mean that you should use it. Sometimes the best option might be to refuse to use it.
