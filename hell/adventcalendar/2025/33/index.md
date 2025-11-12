---
title: "Abbreviations done right: The &lt;abbr&gt; element and why not use it"
author: "Alexander Muzenhardt"
author_bio: "Alex is a skilled Frontend Developer with a career spanning back to 2015. Since joining cit GmbH in 2019, Alex has specialized in accessibility, crafting inclusive and user-friendly digital experiences that ensure seamless web engagement for everyone."
date: 2025-01-02
author_links:
  - label: "Website"
    url: "https://alexmuzenhardt.de/"
    link_label: "Website Alex Muzenhardt"
  - label: "Alex on LinkedIn"
    url: "https://www.linkedin.com/in/alexmuzenhardt/"
    link_label: "LinkedIn"
  - label: "Alex on Github"
    url: "https://github.com/alexmuzenhardt"
    link_label: "Github"
intro: "<p>A deep dive into why the &lt;abbr&gt; element is not the accessibility win it claims to be — and how to handle abbreviations the right way instead.</p>"
image: "advent25_33"
---

# Abbreviations done right: The `<abbr>` element and why not use it

# Introduction
Abbreviations are great. They save time and space, make things efficient and tidy, and can even improve readability. But with the wrong technique, these abbreviations can turn into hell when it comes to accessibility.

# The perfect element for abbreviations
So, the first thing you do: you look up “abbreviations in HTML” and land straight on MDN (Mozilla Developer Network), at the `<abbr>` element. `<abbr>` is the short form for abbreviation. The [documentation](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/abbr) shows exactly how to use it properly — and even has an accessibility section. It says that `<abbr>` helps people understand what an abbreviation means, especially when it is technical or industry jargon.

```html
<p>The <abbr title="Mozilla Developer Network">MDN</abbr> is a documentation repository and learning resource for web developers.</p>
```

Perfect. Exactly what you were looking for. Semantic, accessible — what could go wrong?  
So you start using `<abbr>` everywhere, only to get immediate feedback telling you what your abbreviations mean *and* an accessibility report complaining about … those very same abbreviations.

Why? According to MDN, you did everything right.

# The problem with abbr
The biggest problem with the `<abbr>` element is that it behaves completely inconsistently across browsers, and some assistive technologies do not read parts of it at all.  
Adrian Roselli has already run extensive tests on his blog article “[Using abbr Element with title Attribute](https://adrianroselli.com/2024/01/using-abbr-element-with-title-attribute.html#Testing)” showing that the `title` attribute on `<abbr>` elements is not announced by assistive technologies.

On top of that, the `title` attribute is a problem on touch devices — there is simply no way to access it on a smartphone. It only appears on hover, and hover does not exist on touchscreens.

No matter how you look at it, when you use `<abbr>`, at least one group of users will always miss out on information they need.

# The simple solution we are all looking for
The easiest way to make abbreviations accessible is to spell them out the first time they appear, followed by the abbreviation in parentheses or vice versa.  
After that, you can simply use the abbreviation throughout the rest of the text — it’s already been explained once.

This approach is also accepted by WCAG (Web Content Accessibility Guidelines) 2.2 as a “Sufficient Technique” under “[G97: Providing the first use of an abbreviation immediately before or after the expanded form](https://www.w3.org/WAI/WCAG22/Techniques/general/G97)”.  
And the best part: you do not even need to touch your HTML markup — you just make your text a bit clearer.

## Examples
### First example
In this example, the abbreviation comes first, followed by its full meaning in parentheses.  
"The WAI (Web Accessibility Initiative) demonstrates the W3C (World Wide Web Consortium) commitment to accessibility."

### Second example
The reverse is equally correct and accessible.  
"The United Nations High Commissioner for Human Rights (UNHCR) was established in 1950 to provide protection and assistance to refugees."

The key is consistency: do not switch between the two styles on the same website. Pick one and stick with it.

# The alternatives you may need
Below are three possible alternatives. They vary in complexity, and when implementing them, accessibility should always remain a priority. This is especially true for the third option — a dictionary search — where the input field and surrounding UI also need to be accessible.

I am intentionally leaving out implementation details here, as they would go beyond the scope of this article. These examples rely on other WCAG techniques that are not directly related to abbreviations. You will find plenty of examples online — and if you have questions about any of these approaches, feel free to reach out.

## Linking to definitions
Of course, spelling out abbreviations is not the only option. You can also link an abbreviation to a page that explains it in detail. There are several ways to do this, all clearly outlined in “[G55: Linking to definitions](https://www.w3.org/WAI/WCAG22/Techniques/general/G55)”.

## Providing a glossary
Another option is to provide an internal or external glossary that lists and explains all abbreviations used on your website. You can either link to it or simply reference it when abbreviations appear.  
Just like in books, glossaries can live at the end of a site or section — and readers can look up terms as needed.  
A clear explanation of this approach can be found under “[G62: Providing a glossary](https://www.w3.org/WAI/WCAG22/Techniques/general/G62)”.

## Providing a function to search an online dictionary
A more elegant approach is to include a search feature on your site that queries an online dictionary for abbreviations and displays relevant results.  
You can find more information on this technique in “[G70: Providing a function to search an online dictionary](https://www.w3.org/WAI/WCAG22/Techniques/general/G70)”.

# Conclusion
Skip the `<abbr>` element altogether.  
Right now, it does not add any real value — it only creates a false sense that your abbreviations are truly accessible and understandable by all persons.

The best and by far simplest solution is to clearly spell out each abbreviation the first time you use it, and then stick to the short form for the rest of the text.

Cheers  
Alex

# Resources
* [Using abbr Element with title Attribute](https://adrianroselli.com/2024/01/using-abbr-element-with-title-attribute.html) \- by Adrian Roselli
* [THE ABBR ELEMENT](https://heydonworks.com/article/the-abbr-element/#main) \- by Heydon Pickering
* [The HTML abbr-tag – Managing Abbreviations the Right Way (German)](https://stolperfrei.digital/html-abbr-tag/) \- by Ria Weyprecht
* [\<abbr\>: The Abbreviation element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/abbr) \- by mdn
* [Understanding SC 3.1.4: Abbreviations (Level AAA)](https://www.w3.org/WAI/WCAG22/Understanding/abbreviations.html) \- by W3C
* [Technique G55: Linking to definitions](https://www.w3.org/WAI/WCAG22/Techniques/general/G55) \- by W3C
* [Technique G62: Providing a glossary](https://www.w3.org/WAI/WCAG22/Techniques/general/G62) \- by W3C
* [Technique G70: Providing a function to search an online dictionary](https://www.w3.org/WAI/WCAG22/Techniques/general/G70) \- by W3C
* [Technique G97: Providing the first use of an abbreviation immediately before or after the expanded form](https://www.w3.org/WAI/WCAG22/Techniques/general/G97) \- by W3C
