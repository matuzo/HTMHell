---
title: "For the Love of &lt;details&gt;"
author: "Justin Ferrell"
author_bio: "Justin Ferrell is a web and mobile developer, creator of [Mastowatch](https://apps.apple.com/us/app/mastowatch/id1662271463) and [Audracity](https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://apps.apple.com/us/app/audracity/id6476069436&ved=2ahUKEwi3sbWppaKQAxUIMtAFHd5ZKW0QFnoECBgQAQ&usg=AOvVaw3Cm4QCBLqnPPR89z-A3T7K). He is the Technical Director at Digital Relativity, an ad agency in West Virginia, where he has led web and mobile development since 2011."
date: 2025-12-23
author_links:
  - label: "Personal Blog"
    url: "https://ferrell.rocks"
    link_label: "ferrell.rocks"
  - label: "LinkedIn"
    url: "https://www.linkedin.com/in/developerjustin/"
    link_label: "Justin Ferrell"
  - label: "Mastodon"
    url: "https://mastodon.social/@developerjustin/media"
    link_label: "@developerjustin"
intro: "<p>Short introductory text</p>"
image: "advent25_23"
active: true
---

When you list all the things HTML can do out of the box without the help of CSS or Javascript, it can seem like a short list. Headings and lists will come to mind. You will most likely think of things like images and video. Any good list of HTML elements will grow to include form elements like input and select, the original interactive elements, too. Recently, a lot of work and attention has turned to some of the lesser known semantic HTML elements too. The work of [Heydon Pickering](https://front-end.social/@heydon) comes to mind, and his incredible effort to explain [every HTML element](https://heydonworks.com/article/the-col-element/) in alphabetical order. 

Among the lists and the images and the forms and the videos though, I think there is an unsung hero. There is a piece of semantic markup that exists at the intersection of SEO, accessibility, performance and interactivity. 

I am talking of course about the &lt;details&gt; element and its partner, the &lt;summary&gt; element. 

## &lt;details&gt; Details

For the uninitiated, the &lt;details&gt; element acts as a disclosure widget. When I was getting my start in early 2011, the &lt;details&gt; element would have (incorrectly) been called an accordion if it existed at the time. It consists of an outer &lt;details&gt; element with a &lt;summary&gt; element nested directly beneath it. In its “closed” state, only the &lt;summary&gt; element is visible. When open (with an [open] attribute present on the &lt;details&gt; element) all of the content following the &lt;summary&gt; element is made visible.  

<iframe height="300" style="width: 100%;" scrolling="no" title="Basic Demo of &lt;details&gt; " src="https://codepen.io/developerjustin/embed/OPMzVzX?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/developerjustin/pen/OPMzVzX">
  Basic Demo of &lt;details&gt; </a> by Justin Ferrell (<a href="https://codepen.io/developerjustin">@developerjustin</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

The most remarkable thing about the &lt;details&gt; element is that this disclosure functionality requires no dependencies of any kind. It requires zero CSS or Javascript of any kind, is keyboard navigable and accessible out of the box and is widely understood by search engines and web crawlers alike, making it a semantic choice for things like FAQ’s. 

Put simply, &lt;details&gt; is one of the few semantic, interactive elements HTML gives us. That scarcity makes it special.

## &lt;details&gt; Are Always in Style

If an element gives you so much for free, surely it must fight back when you try to style it, right?

Not the case! 

The triangle disclosure icon that you see in a &lt;details&gt; element is actually the list-item marker of the &lt;summary&gt; element. In modern browsers, you can target it with the summary::marker pseudo-element. You can change the size, color, icon and even if the symbol is present at all. 

Because the open state of the &lt;details&gt; element is marked using an [open] attribute, it’s possible to target the &lt;details&gt; element, the &lt;summary&gt; element and anything therein just by using an attribute selector. 

<iframe height="300" style="width: 100%;" scrolling="no" title="Untitled" src="https://codepen.io/developerjustin/embed/wBMpayo?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/developerjustin/pen/wBMpayo">
  Untitled</a> by Justin Ferrell (<a href="https://codepen.io/developerjustin">@developerjustin</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

And using the **::details-content** selector, you can target the inner content of the &lt;details&gt; element too! This **::details-content** selector is particularly powerful when paired with the [open] attribute selector. 

<iframe height="300" style="width: 100%;" scrolling="no" title="Untitled" src="https://codepen.io/developerjustin/embed/YPqrONy?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true">
	See the Pen <a href="https://codepen.io/developerjustin/pen/YPqrONy">
	Untitled</a> by Justin Ferrell (<a href="https://codepen.io/developerjustin">@developerjustin</a>)
	on <a href="https://codepen.io">CodePen</a>.
</iframe>

Though browser support isn’t perfect, it’s even possible to tweak the animation and transition of a &lt;details&gt; element from its open state to its closed state. 


## The Devil and the &lt;details&gt;
Just like its Cascading Counterpart, Javascript is no stranger to the &lt;details&gt; element. 

The &lt;details&gt; element fires a toggle event when opened or closed. You can attach an event listener to that just like you would with any other element. 
<iframe height="300" style="width: 100%;" scrolling="no" title="Scripted &lt;details&gt; Demo" src="https://codepen.io/developerjustin/embed/dPGJodx?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/developerjustin/pen/dPGJodx">
  Scripted &lt;details&gt; Demo</a> by Justin Ferrell (<a href="https://codepen.io/developerjustin">@developerjustin</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

To really get at what makes the &lt;details&gt; element tick though, you can always set the open property of the element to true/false to open or close the widget respectively.

<iframe height="300" style="width: 100%;" scrolling="no" title="Toggle &lt;details&gt; Demo" src="https://codepen.io/developerjustin/embed/emJyNMK?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/developerjustin/pen/emJyNMK">
  Toggle &lt;details&gt; Demo</a> by Justin Ferrell (<a href="https://codepen.io/developerjustin">@developerjustin</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>


## Prevails Through &lt;details&gt;
The power of &lt;details&gt; does not stop with how you can style it and how you can interact with it via Javascript. The &lt;details&gt; element has additional capabilities via good old HTML that are arguably more powerful than anything you can do it with Javascript. 

### Deeping Linking
A handy feature of most modern browsers (looking at you, [Safari](https://frontendmasters.com/blog/opening-a-details-element-from-the-url/)) is that navigating to an anchor or fragment inside a closed &lt;details&gt; will automatically open it so the user can see the target. 

Remarkably, on-page search supports the &lt;details&gt; element too! Browsers support varies but in most modern browsers, traditional "Command/Control + F" search will query the contents of the &lt;details&gt; element and expand them as needed. 

<iframe height="300" style="width: 100%;" scrolling="no" title="Untitled" src="https://codepen.io/developerjustin/embed/wBMpajg?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/developerjustin/pen/wBMpajg">
  Untitled</a> by Justin Ferrell (<a href="https://codepen.io/developerjustin">@developerjustin</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

### Exclusivity

Details elements support a name attribute to group them into an exclusive set (like radio buttons).  If multiple &lt;details&gt; share the same name, opening one will automatically close any others in that group. 

<iframe height="300" style="width: 100%;" scrolling="no" title="Exclusive &lt;details&gt; Demo" src="https://codepen.io/developerjustin/embed/KwVZpey?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/developerjustin/pen/KwVZpey">
  Exclusive &lt;details&gt; Demo</a> by Justin Ferrell (<a href="https://codepen.io/developerjustin">@developerjustin</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

It's worth flagging the potential for [accessibility issues](https://yatil.net/blog/exclusive-accordions) related to this feature. Exclusive &lt;details&gt; elements are more likely to cause a higher cognitive load and make the comparison of details more difficult. Exclusive &lt;details&gt; elements are by nature more complicated to use with a keyboard and may also cause issues with visibility and screen readers. 

## "But her &lt;details&gt;!"
In 2025, &lt;details&gt; is well supported across major browsers, though some versions of Safari still have quirks like not auto-opening on anchor links. It’s pretty unlikely that you’ll run into meaningful issues but it’s always good to see what browsers your users are using. 

## In &lt;summary&gt;

While humble on the surface, the &lt;details&gt; element is an untapped treasure trove of interactivity. It can do so much out of the box but paired with some creative HTML and CSS, it’s easy to imagine dozens of uses for the &lt;details&gt; element that do not compromise on performance, accessibility or SEO visibility. 

Here are 6 not-so-real world examples with a focus on accessibility and SEO. 

* **Frequently Asked Questions (FAQs):** This really is the gold standard for this element. It can help keep pages tidy while ensuring the content is fully indexable by search engines and completely accessible to screen readers without complex ARIA attributes.
* **Video & Audio Transcripts:** A massive SEO and accessibility win. &lt;details&gt; allows you to include the full text of a podcast or video for keyword indexing and hearing-impaired users, without forcing users to scroll past a massive wall of text to reach the footer.
* **Product Specification Tables:** &lt;details&gt; allows you to hide dense, technical rows (dimensions, materials, voltages) that are crucial for technical SEO rankings but visually overwhelming for the average shopper.
* **Table of Contents:** Placing a collapsible "On this page" navigation widget at the top (or sticky side) of long articles helps bots understand page structure and helps users jump to relevant sections immediately.
* **Long-form Content "TL;DR":** Placing an Executive Summary at the very top of a long article that expands for the full breakdown. This improves "Time on Page" metrics by letting users get the gist immediately rather than bouncing because the article looks too long.
* **Expanded Author Bios:** Enhance your E-E-A-T (Experience, Expertise, Authoritativeness, and Trustworthiness) signals by including full credentials, past work, and social links in a bio that expands, rather than just a simple name and photo.

I hope you find even more uses for &lt;details&gt; in your own work! 
