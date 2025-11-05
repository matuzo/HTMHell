---
title: "Forms are a badly designed part of HTML"
author: "Jens Grochtdreis"
author_bio: Jens works as a frontend developer for <a href="https://www.swr.de">public radio and tv</a> in Germany. He founded the Webkrauts (the German webstandards movement) in 2005 for evangelising webstandards and better coding for a modern web."
date: 2025-12-20
author_links:
  - label: "blog"
    url: "https://css-weblog.de"
    link_label: "My German weblog, mostly about CSS."
  - label: "Bluesky"
    url: "https://bsky.app/profile/jensgro.bsky.social"
    link_label: "jensgro.bsky.social"    
  - label: "Mastodon"
    url: "https://mastodon.social/@jensgro"
    link_label: "@jensgro@mastodon.social"
  - label: "Codepen"
    url: "https://codepen.io/jensgro"
    link_label: "jensgro"
intro: "<p>Forms, huge or compact, are one of the important building blocks of the web. Without forms the web would be a one-way street. With HTML5 we received an optimized set of form elements. HTML5 turned into a Recommendation in 2014. But until now web developers have to struggle with forms.</p>"
image: "advent25_20"
---

Forms were likely one of the reasons why browser vendors joined forces in the WHATWG in 2004. They felt that HTML standardization was heading into the wrong direction and wanted more practical relevance. While this may be an oversimplification, if true, it highlights the failure of the WHATWG (i.e., the browser vendors) and, subsequently, the W3C. Although the newly standardized form elements and features all point into the right direction, they are incomplete and unfinished. The fact that this is still the case, even more than ten years after HTML5 became a recommendation, is alarming.

## New Form Elements

The WHATWG introduced several new form elements and attributes into the HTML specification, e.g. the email input, telephone input, date field, and range slider. Most of these are simply new types of the input element. This approach was clever — a great example of progressive enhancement. If a browser hasn’t implemented a particular input type yet, a plain text field serves as a fallback. Developers can then use JavaScript if needed. However, when the new elements are supported, JavaScript becomes unnecessary.

Most of the new form elements are essentially shortcuts. They combine regular expressions for validation, an ARIA role, and sometimes trigger a specialized virtual keyboard on mobile phones and tablets. They are similar to web components based on the input element, but are integrated directly into the browser, so no JavaScript is needed for the element to appear. And because they are standardized, the code is consistent across implementations. These are very simple elements.

Combinations of different form elements have unfortunately not been considered at all. As examples, I would like to mention the [combobox](https://open-ui.org/components/combobox.explainer/) and the [range slider](https://open-ui.org/components/enhanced-range-input.explainer/).

### The Combobox

The [combobox](https://component.gallery/components/combobox/) is a combination of a select and a search field. Fluent UI provides a [combobox component](https://fluentsite.z22.web.core.windows.net/0.66.2/maximize/dropdown-example-search-multiple-shorthand/false), as does [Ant Design](https://ant.design/~demos/select-demo-multiple). In both cases, only the search field is a form field. The select is simulated by a list in Fluent, while Ant Design uses a div. The selected options are displayed as (fake) buttons using span and svg elements. This has little to do with actual forms.

### The Enhanced Range Element

The [range element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/range) can unfortunately only represent a single value. The frequently needed [range slider](https://open-ui.org/components/slider.research/) for two or more values (e.g. for shopping portals) does not exist. You'll have to build it yourself. The well-known [noUiSlider](https://refreshless.com/nouislider/) simulates the slider for one or more values consistently with a div. At least ARIA attributes are used throughout. The same goes with the version by [Quasar](https://quasar.dev/vue-components/range/). No form elements were harmed. It’s a pity that this obvious use case was not standardized.

## Built-in Validation

Standardizing validation in the browser was a smart idea. There are built-in regex rules for validation, which can be manually overridden. Validation is controlled via attributes and a standardized JavaScript API, which is great. In practice, however, you quickly run into details that aren’t flexibly solved. This leads to custom solutions using JavaScript.

There is no simple, built-in way to collect all error messages and display them at the top or bottom of the form without JavaScript. Nor is there a way to communicate the total number of errors to the user. Error messages at the element itself are shown via a popup, which cannot be styled or repositioned. For any improvements in usability and clearer communication, you'll need JavaScript. While this is done through a unified API, it still isn’t possible with plain HTML.

It would be desirable to configure different error handling methods using HTML. Instead of relying on JavaScript, we should be able to solve everything with attributes. The less JavaScript is needed, the faster the page will be.

## Inconsistent browser support

The standard doesn't give form elements consistent capabilities and appearance. I don't know whether browser vendors weren't willing to agree on this or if they didn't see any necessity. Consistency in usability, feature set and apperance would be helpful for both users and developers/designers. It seems obvious and easy to integrate the color pickers of the respective operating systems for the color picker control. However, these cannot be styled and offer different features. Android and iOS replace the HTML date picker with their own widget. That’s great. But on desktop, the appearance is completely different and cannot be influenced. While the usability may be familiar to users, for web developers and their clients, this inconsistency is a nightmare. 

The number input offers increment/decrement arrows in one browser but not in another. The usefulness of these arrows is debatable. The date field is only read aloud [by the iOS native screen reader](https://tetralogical.github.io/screen-reader-HTML-support/lookup/lookup.html#input-date)) when a date is already present; it is not announced as a date field. The email input is announced [only by Voice Over on MacOS](https://tetralogical.github.io/screen-reader-HTML-support/lookup/lookup.html#input-email) as an email-field. Others don't specify the semantic, JAWS seems to ignore it. If browser vendors are leading the standardization of these features, I expect better coordination and consistent implementation.

Semantic information should be transported to screenreaders. Otherwise the new semantic field is only half baked. It is more a text input with an integrated regex, triggering an onscreen keyboard. Both last features could have been achieved otherwise without having an explicit email-field.

## Partially Miserable Styling Options

Styling form elements is a major challenge that often ends in failure. Frequently, the form element itself is hidden and instead the label element is styled. Or the form element is hidden and replaced via JavaScript with a construction of DIVs and/or lists, which can then be freely styled.

Fundamentally, styling form elements is miserable. This is why [58% of participants](https://2024.stateofhtml.com/en-US/features/forms/) in the "State of HTML 2024" survey identified styling as by far the biggest pain point with forms.

However, since browser vendors are much more active in CSS than in HTML, there is a faint glimmer of hope on the horizon. Chromium browsers have recently introduced the customizable select, based on an [idea and proposal from OpenUI](https://open-ui.org/components/customizableselect/). Brecht deRuyte has dedicated a [series of articles](https://utilitybend.com/blog/the-customizable-select-part-one-history-trickery-and-styling-the-select-with-css) to the new, fantastic possibilities.

It’s a start. But we need more standardization. All controls that are currently hidden in the browser’s Shadow DOM need standardized structures and names so that we can select and style them consistently.

At CSSDay 2025 in Amsterdam, Tim Nguyen presented the Working Draft "[CSS Form Control Styling Level 1](https://www.w3.org/TR/2025/WD-css-forms-1-20250325/)". Standardization has only just begun. I hope this Working Draft matures quickly and finds its way into browsers. We need to quickly find a way to reliably style form elements.

If forms do not gain more styling options in the near future, we will not be able to move away from [JavaScript-based date pickers](https://open-ui.org/components/datepicker.research/) anytime soon. But what’s the point of having the right element if we have to replace it with a custom construct at the first opportunity because we otherwise have no sufficient styling options? Standards are supposed to help us and make the web better.

[Interop 2025](https://wpt.fyi/interop-2025) had no aspects for designing better forms. Maybe some aspects will make it to Interop 2026. [The selection process](https://github.com/web-platform-tests/interop/blob/main/2026/selection-process.md) should be finished when this article is published.

## Lack of Further Development

We are missing important form elements. These have to be simulated using JavaScript. In recent years, standardizers could and should have filled this gap. In my view it is not satisfying to say that we now have all the building blocks at our disposal to combine them into new elements using JavaScript. The Web Components API would serve as the basis. If you take this argument to its logical conclusion, we could reduce HTML to just the span element. We would then create the rest of the elements as web components, enriched with attributes (including ARIA). That can’t seriously be the goal.

In my view, HTML elements are browser-specific web components. They have the great advantage that they do not require JavaScript because they are built directly into the browser. They are also the same for all end users and devices. A non-standardized form element, on the other hand, exists in many variants, on different technical bases, and in varying quality and implementation.

## Hope Is Rising

The lack of standardization leads to many different approaches to the same problem. What they have in common is that they have little or nothing to do with actual form elements.

Fortunately, practitioners have come together in the "[Open UI](https://open-ui.org/)" community group to advance the standardization of HTML and CSS. They describe several features that are missing as standards in HTML. For the combobox, Open UI has created [a proposal](https://open-ui.org/components/combobox.explainer/). I hope it will be implemented in browsers and standardized soon.

The same applies to the range slider with more than one value. Open UI also offers a great idea for a long-overdue [extension of the standard](https://open-ui.org/components/enhanced-range-input.explainer/).

## A New Wave of Innovation Is Needed

This article is a very rough overview of the state of forms. My main demands for innovation are:

1. We need more complex form fields as standard elements, such as a combobox.
2. We need a range input with multiple handles.
3. We need much better styling opportunities for every form element. The new stylable select shows the right direction. 
4. Form validation should be controlled by HTML-attributes instead of JavaScript. It's styling should be easy and consistent between browsers.
5. Screenreaders should communicate form semantic without flaws.

The innovation of forms should be part of a much larger innovation. WHATWG and W3C demonstrated at the beginning of the millennium that they are capable of such an innovation. After two decades, it is time to revive this spirit and take HTML to a new level. Websites aren't always the strict documents as they were invented for. The usual starting page of a news site has little in common with the  original idea of HTML. Those pages  usually consist mainly of headlines accompanied by a huge amount of images and some short text bites. The startpage of the New York Times presents teasers without headlines. This shows that there is no safe common ground for developers creating such a page type. 

Modern Websites and especially Webapps need a new paradigm. The evolved far beyond the inventor's idea and it won't stop evolving.

The W3C should respond with new elements and paradigms. The document analogy should stand alongside interactive applications as equals. The more that is standardized in this regard, the better it is for the industry. And end users will also benefit from consistently high-quality websites.

