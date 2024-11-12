---
title: "Grouping (input) fields"
layout: layouts/advent.md
author: "Matthias Kittsteiner"
author_bio: " Matthias is a passionate full stack web developer and responsible for the technical aspects on more than 1.000 websites, including performance, reliability, accessibility and functionality. That’s why he is very interested in many things around the web, and has a big focus on building inclusive web applications and websites."
date: 2024-12-21
author_links:
  - label: "Blog"
    url: " https://epiph.yt/en/"
    link_label: "epiph.yt"
active: true
intro: "<p> Using fieldsets to group multiple (input) fields into a single one can be an ideal way to provide context to otherwise lonely fields inside a form, enhancing the accessibility of using them.</p>"
image: "advent_21"
---
<!-- MM: Thanks for the post. I like it but it lacks 2 things:
1. What's the actual outcome for screen reader users in detail? What does the software announce and when? Only when I enter the group or with every option? If with every option, how and when?
2. When exactly mustn't I use them and why.
-->

When I first stumbled upon `fieldset` and `legend`, I didn’t know much about HTML and especially not about accessibility. Everything I noticed was the special way a `legend` is displayed inside a `fieldset` – or rather: alongside the border of a `fieldset`. 
<!-- MM: If you want to, we could display a simple fieldset example here so that everyone knows what you're talking about.
edit: Or even better, put it in the What is a `fieldset` section. -->
Fast forward to (kind of) today: while working on a contact form, I first could get my hands on this element and learned more about it.

## What is a `fieldset`?

Every so often I’m surprised how well chosen names in HTML are. `fieldset` is no exception here. It’s basically a list of (input) fields, creating a group of all fields inside of it, a set of fields. As for the `legend`, it is used as caption of the `fieldset` (and ultimately a caption for the (input) field group).
<!-- MM: Why (input) in parentheses? What are the other fields? Is the a better term to describe all of them? Like "form elements" maybe? -->
<!-- MM: The fieldset is the group!? -->

## Why does it matter?

While for users capable of browsing websites visually, a `fieldset` often stays hidden, except for maybe displaying the `legend` as caption for a group of fields, it’s a whole different story for e.g. users required to use a screen reader. For every field inside the `fieldset`, the screen reader announces that it is part of a group on the one hand, and also the caption of the group on the other hand. It makes sure that the user is always aware that the current active field is part of a specific group.
<!-- MM: There are also non-blind scren reader users. -->
<!-- MM: How's the fieldset hidden? It's super prominent. The border, padding, placement, etc. of the legend. I'd rephrase this and highlight both benefits, the visual and semantic grouping. -->
<!-- MM: Please don't use the on one hand on the other hand phrasing. It makes it sound like the arguments are in opposition. -->
Additionally, by using the `disabled` attribute, you can easily disable a whole group of fields within the `fieldset`. Feels a little bit like magic. Such disabled fields are neither editable (they ignore inputs completely), nor will they be submit in a form.
<!-- MM: Just checking: Have you tested this with different screen reader/browser pairings? -->
One note though: think about it first before using it. 
<!-- MM: I mean, yeah, that's generally a good advice. ;) -->
Make sure fields inside a `fieldset` are actually connected to each other and require an identical context whatsoever. Otherwise, it just makes filling them slower as it should be.
<!-- MM: Would you recommend to always put first and last name in a group? They are connected to each other. -->
<!-- MM: What does a field qualify to "require an identical context"? -->
<!-- MM: Is slower really the right term you want to use here? Please explain how fieldsets make it _slower_- -->
## Usage examples

Having multiple choice questions, e.g. in a survey, is an ideal example in grouping (input) fields. You can use the `legend` as question and use radio buttons as the answers:

```html
<fieldset>
	<legend>When did you hear about fieldsets the first time?</legend>
	
	<input type="radio" id="before-2000" name="eyes-opened" value="before 2000" />
	<label for="before-2000">Before 2000</label><br />
	
	<input type="radio" id="between-2000-2009" name="eyes-opened" value="2000 – 2009" />
	<label for="between-2000-2009">Between 2000 and 2009</label><br />
	
	<input type="radio" id="between-2010-2019" name="eyes-opened" value="2010 – 2019" />
	<label for="between-2010-2019">Between 2010 and 2019</label><br />
	
	<input type="radio" id="today" name="eyes-opened" value="2020 – today" />
	<label for="today">Between 2020 and today</label><br />
</fieldset>
```

It could also be used to connect fields for a day, a month and a year for individual input fields to select a specific date, as well as hours and minutes to select a time. Or having different fields for a credit card number by splitting them into four digits each. You see, there are many possibilities to use fieldsets, just don’t overuse them – because with many possibilities comes great responsibility – or so.
<!-- MM: How do I know if I'm overusing? -->