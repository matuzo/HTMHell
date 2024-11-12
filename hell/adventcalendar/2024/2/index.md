---
title: "Starting off right: Where autofocus shines"
layout: layouts/advent.md
author: "Kilian Valkhof"
author_bio: "Web developer and creator of Polypane.app, the browser for developers."
date: 2024-12-02
author_links:
  - label: "Blog"
    url: "https://kilianvalkhof.com"
    link_label: "kilianvalkhof.com"
  - label: "Mastodon"
    url: "https://mastodon.social/@kilian"
    link_label: "@kilian"
  - label: "X"
    url: "https://twitter.com/kilianvalkhof"
    link_label: "@kilianvalkhof"
  - label: "Polypane"
    url: "https://polypane.app"
    link_label: "Polypane.app"
active: true
intro: "<p>Autofocus is a great attribute, but you should use it sparingly.</p>"
image: "advent_2"
---

Focus is where the user is on your website. It's what makes it possible to navigate your site with the keyboard or other assistive technologies, and it's how a browser knows which form element you're typing in. It's vital to get right if you want to build good websites.

Whenever you're dealing with code that can “steal” focus you have to be aware of how that affects your visitor. So it's not strange that many folks will tell you to leave focus alone, to stay away from `tabindex` and `autofocus`.

All of that advice is good advice: you _should_ be careful when moving the focus away from where it would normally be and where the user would expect it to be, or you'll quickly find yourself in a world of accessibility issues.

But if you start off on the right foot, managing focus is a delightful HTML detail that makes your site a joy to use.

## Autofocus

The `autofocus` attribute can be added to any element to make it **auto**matically **focus**ed on page load, skipping over any other elements that might have been focused before. It can be used on any element because any element can be focusable, for example if it has the `contenteditable` attribute.
<!-- MM: that sounds like it's ok to put contenteditable on any element. Maybe rephrase to "It can be used on any focusable element". -->

<!-- SS: I also kind of feel that even though it is possible to make any element focusable and hence can have autofocus, since that is not recommended, and a bad practise, maybe better to avoid mentioning that example. I feel someone who is not aware that this is not a recommended practise might not understand. -->

As mentioned above, you'll rarely want to use `autofocus`. Messing with people's focus usually doesn't make them want to use your website more. It will probably make them want to use it less, so don't autofocus your purchase button or search field.

But there's a place where `autofocus` shines: On single-purpose pages containing forms.

...which is a bit of an obtuse way to say “login pages”, “signup pages”, “password reset pages” and “Two-factor authentication (2FA) pages”, you get the idea.

## Adding Autofocus

Your login page has one purpose: to get the user to log in.

The user has one goal: to log in.

So why not make it as easy as possible for them?

```html
<form method="post">
  <label for="username">Username</label>
  <input id="username" type="text" autofocus />

  <label for="password">password</label>
  <input id="password" type="password" />
</form>
```

Add autofocus to the first field and your visitor can start typing as soon as the page loads. No need to click or tab or search for forms on the page.

If the user uses assistive technology, it will announce the label and the field, and then announce that the field is focused.

Similarly, your password reset page (single field) and signup page (single purpose) will have the same structure and will likewise benefit from

If your login page is followed by a 2fa page, then that `autofocus` is <del aria-hidden="true">even more useful</del> <ins>vital</ins>.

Few things are as "throw pc out of the window"-frustrating as frantically typing in that 2fa code as the last few seconds tick away, only to find the field wasn't focused. And now you have to do it all over again.

<!-- SS: Agreed and definitely a good mention. Though there can be multiple ways of 2FA e.g., push notification, hardware authentication using FIDO2 devices. Might be slightly overcomplicating things but maybe mentioning that 2FA where user has to enter a code, or soemthing similar. -->

Argh!

Some things just get to me.

### When not to use autofocus on single-purpose pages

Even if you have a page with a single purpose, you might not want to add autofocus.

If you have a login form but people can also use social logins (Google, GitHub, and the like) and you don't know which one they'll use don't add an autofocus.

Instead, keep track of what they use to log in. As soon as you know which one they're using you can store that in a cookie (or localStorage) and focus on the field or button they need to interact with the next time they visit.

<!--
  KS: I'd like to see you at least note some of the accessibility concerns
  mentioned at https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/autofocus#accessibility_concerns
  as I think that will help fill out the "When not to use..." section
  here more faithfully for readers.
-->

## Conclusion

So let's get back to the point: `autofocus` is a great way to make your forms more user-friendly, as long as you use it in the right place.

Are you building a page that has:

- A single purpose
- A single form
- No other choices available

Then `autofocus` is your and your visitor's friend.

So go ahead and use it on your login pages, your signup pages, your password reset pages, and your 2fa pages. Your users will thank you for it.
