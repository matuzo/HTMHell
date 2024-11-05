---
title: "The Gift You Do NOT Want: A Div in a Button's Clothing"
layout: layouts/advent.md
author: "Corina Murg"
author_bio: "Corina is a self-taught developer interested in all things accessibility."
date: 2024-12-15
author_links:
  - label: "website"
    url: "https://webforeveryone.us"
    link_label: "Web for Everyone"
  - label: "Corina on LinkedIn"
    url: "https://www.linkedin.com/in/corinamurg/"
    link_label: "LinkedIn"
active: true
intro: "<p>The magic of a button lies in its built-in features, ones often overlooked by sighted users with a mouse. Browsers recognize it's a button simply by seeing the `<button>` tag. This recognition extends to the accessibility tree, where it’s assigned a button `role`, something a screen reader announces to users. It’s also focusable by default, no `tabindex` needed. And the best part? We can activate it with the `Enter` key or the `Space` bar. 

If you work in accessibility, you know there's a catch — once we swap that `<button>` for a `<div>`, all those built-in perks vanish. With the right CSS makeup it will continue to look like a button, but suddenly, it only really works for sighted users with a mouse. At this point, since it's not accessible to everyone, we could stop calling it a button, right?</p>"
image: "advent_15"
---

The magic of a button lies in its built-in features, ones often overlooked by sighted users with a mouse. Browsers recognize it's a button simply by seeing the `<button>` tag. This recognition extends to the accessibility tree, where it’s assigned a button `role`, something a screen reader announces to users. It’s also focusable by default, no `tabindex` needed. And the best part? We can activate it with the `Enter` key or the `Space` bar. 

If you work in accessibility, you know there's a catch — once we swap that `<button>` for a `<div>`, all those built-in perks vanish. With the right CSS makeup it will continue to look like a button, but suddenly, it only really works for sighted users with a mouse. At this point, since it's not accessible to everyone, we could stop calling it a button, right?

## Really, How Bad Can a Fake Button Be?!

So, how do we answer this question? The thing is, if we explain it well, the benefits go beyond just this one issue. I used to turn on a screen reader to demo the problems, but that’s a tough ask for developers new to accessibility. Now, I prefer a different approach, using simpler tools: the keyboard and the accessibility tree. They are easy to pick up and give developers a good feel for what’s really going on.

No, the message is not to avoid screen readers, but to start with tools that have a gentler learning curve. The tree itself gives developers plenty of clues about how each node may (or may not!) be recognized by assistive tech like screen readers or voice recognition software. And for whatever the tree can’t reveal about user interactions, keyboard testing fills in the gaps. 

Using tools that are straightforward makes it more likely that developers will keep coming back to them and building better in the long run. Of course, no tool is perfect, and we’ll explore some of their limitations in the examples to come. It’s important to remind developers of these gaps along the way.

So, what exactly does this approach entail? 

## Build a Button with a `<button>`

```html
<button type="button" class="button one">
    Change color ONE
</button>
```

```javascript
function changeColor(event) {
    const element = event.currentTarget; 
    element.style.backgroundColor = element.style.backgroundColor === "gray" ? "white" : "gray";
}

const buttonOne = document.querySelector('.button.one');
buttonOne.addEventListener('click', changeColor);
```

First, we create a genuine button using the `<button>` tag and then examine how it appears in the accessibility tree. We focus on the attributes and properties exposed for this node, discussing what each one means in terms of interaction with assistive technologies. At every step, we also test with a keyboard.

Note: I regularly work on a Windows computer and am familiar with the accessibility tree in both Firefox and Chromium browsers. For this exercise, I’ll mostly use Firefox since it offers specific clues about the shortcomings of fake buttons, and, as a bonus clue, a way to spot a fake button just from the UI.

<img src="./images/Firefox-GenuineButton.jpg" alt="accessibility tree within Firefox's developer tools, highlighting the properties of a button element built with a button tag" width="500" aspect-ratio="748/691" loading="lazy">

So, what is the view from the accesssibility tree revealing?

- The node has the role `button`, which comes with some privileges: it will be announced as a button by a screen reader, and since buttons support name from content, its text becomes its accessible name. So, a screen reader will announce it as `Theme Toggle, button`. Users relying on voice recognition software can activate it by voice command, such as saying `Click Theme Toggle`.

- The `states` array shows that the button is focusable, so we know we can reach it via the `tab` key. 

But where does the keyboard come in? It helps us confirm the `focusable` property by allowing us to navigate to the button with the `tab` key. Plus, it confirms that we can activate the button using the `Enter` key or the `Space` bar, another built-in perk of genuine buttons that is not immediately obvious from the accessibility tree. But more on that later.

Next step: build a fake button.

## Build a Button with a `<div>`
```html
<div class="button two">
    Change color TWO
</div>
```

```javascript
const buttonTwo = document.querySelector('.button.two');
buttonTwo.addEventListener('click', changeColor);
```

We simply attach a click event to a `div`, and with nearly the same CSS as we’d use for a genuine button, we create something a sighted user will recognize as a button.

Here’s the view from Firefox’s accessibility tree:

<img src="./images/Firefox-FakeButton.jpg" alt="accessibility tree within Firefoxes's developer tools, highlighting the properties of a div element used as a button" width="500" aspect-ratio="747/759" loading="lazy">

The node’s role defaults to `generic` since the building block is a `div`. It also remains unnamed because generic nodes don’t have naming privileges, despite containing text. Keyboard users will not reach it, let alone activate it, and we don’t even have to test with a keyboard to prove it. We simply notice that the `states` array does not list the `focusable` property.

We can't test for `keydown` events since the fake button is not focusable. Once we make it focusable we notice that we can't activate it with the `Enter` key or the `Space` bar. Is this lack of functionality reflected in the accessibility tree as well? Sort of. The genuine button lists a `Press` event under the `actions` property, while the fake button only shows `Click`. 

Firefox is also explicitly warning us about the missing focus and "interactive semantics", and it's connecting us to MDN for more information. So, what are we missing? We need:
- a `tabindex` to make it focusable,
- `keydown` events for activation via `Enter` or `Space` bar, and
- a `button` role to assign it a name based on its content, like `Theme Toggle`, and to have it announced properly by screen readers.

Here's what we lack in actual code:


// HTML
```html
tabindex="0"
role="button"
```

// JavaScript
```javascript
buttonTwo.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' or event.key === ' ') {
        event.preventDefault();
        changeColor;
    }
});
```

For developers it might seem tempting to add these missing features one by one. The advice, of course, is that the simpler and more robust solution is to replace the `<div>` with a `<button>`. However, for the sake of exploring what the accessibility tree reveals — or fails to! — we’ll go ahead and add all the necessary code to make this `<div>` fully functional.

## Don't Give the Impression that the Accessibility Tree is Perfect

Is the retrofitted `div` recognized as a button now? Yes! It has the role `button`, it has a name, and it's focusable.

<img src="./images/Firefox-FakeButton-Fixed-Highlights.jpg" alt="accessibility tree within Firefox's developer tools, highlighting the properties of button built with a div tag" width="500" aspect-ratio="747/721" loading="lazy">

Is the retrofitted button's tree view different in any way from the one of the genuine button? Yes again!

First, the `DOMNode` property reveals that we started with a div. Then the `states` array continues to list `selectable text` just like it did for the fake button.

Since we’ve added the keydown events we would not expect any differences betwwen the `actions` arrays, right? Wrong! The updated tree still shows `Click` instead of `Press`. Whether this is a Firefox oversight or a subtle dig at fake buttons (just kidding!), we now have to remember that the absence of `Press` doesn’t mean keydown events won’t work. In fact, `Press` is a specific Firefox keyword. Chromium browsers handle this differently. When keydown events are explicitly added, Chromium’s event listeners include both `click` and `keydown` for the div button. For the genuine button, it would only list `click`!

<img src="./images/Chrome-FakeButton-Fixed.jpg" alt="accessibility tree within Firefox's developer tools, highlighting the properties of a button element built with a div tag. Press and Click are listed under event listeners" width="500" aspect-ratio="745/226" loading="lazy">


Moral of the story? Developers need to understand the limitations of the accessibility tree and that it might miss details about user interactions. It's important to always back up assumptions with keyboard testing.

## PS: How About that "Selectable Text" Property?

Here’s a fun question: How can we spot a fake button, or even a retrofitted one, just from the UI?

You guessed it! If the text is selectable, then we know it likely started as a div.

<div style="display: flex; gap: 20px; margin-block:20px; text-align: center">
    
<button class="button one" style="background-color: gray;" onclick="changeColor(this)">
    Change color ONE
</button>

<div 
    class="button one" 
    onclick="changeColor(this)"
    style="display: inline-block; background-color: gray;" 
    tabindex="0"
>
    Change color TWO
</div>

</div>


<style>
    .button {
        border: 2px solid black;
        border-radius: 5px;
        color: black;
        cursor: pointer;
        font-size: 1rem;
        font-weight: 500;
        font-family: Arial;
        text-align: center;
        width: 12rem;
    }
</style>

<script>
    function changeColor(element) {
        element.style.backgroundColor = element.style.backgroundColor === "gray" ? "white" : "gray";
    }
</script>


Note: I only tested this in Chromium and Firefox. To check:
- With a mouse: Hover over the button, left-click, and try selecting the text by dragging the cursor over it.
- With a keyboard (for me it only work in Firefox!): Move focus to the button, or click on it and keep cursor in place. Hold `Shift` and press the right arrow key. If the text highlights, it’s selectable!


## Wrapping Up

Does this approach work? I believe it does. It typically ends with developers realizing, "Now I know I shouldn't just add a click event to a div." This method not only introduces them to the accessibility tree but also reinforces the usefulness of a familiar tool — the ubiquitous keyboard. The key takeaway is always to test and envision how the component they are building will be accessible to users based on their specific needs.
