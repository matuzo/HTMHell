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
intro: "<p>With the right CSS makeup and a click event, almost anything can pretend to be a button. In accessibility work, we spot the fakes and fix them, but teaching others why and how to do it is just as important. It’s not just about correcting a single mistake; it’s about introducing developers to accessibility concepts and approaches that they can comfortably return to and reuse across all their projects.
More importantly, it encourages them to think beyond the sighted user with a mouse and consider the needs of those who rely on assistive technologies.
</p>"
image: "advent24_15"
---
<!-- MM: Great post, thank you! -->
<!-- KS: Outstanding, well written post. Thank you! -->

With the right CSS makeup and a click event, almost anything can pretend to be a button. In accessibility work, we spot these fakes and fix them, but teaching others why and how to do it is just as important. It’s not just about correcting a single mistake; it’s about introducing developers to accessibility concepts and approaches that they can comfortably return to and reuse across all their projects. More importantly, it encourages them to think beyond the sighted user with a mouse and consider the needs of those who rely on assistive technologies. 

## Really, How Bad Can a Fake Button Be?!

So, how do we answer this question? I used to demo the problems using a screen reader, but I've found that it can be overwhelming for developers new to accessibility. I prefer now a different approach, using simpler tools: the keyboard and the accessibility tree. They are easy to pick up and give developers a good feel for what’s really going on.

No, the message is not to avoid screen readers, but to start with tools that have a gentler learning curve. The tree itself gives developers plenty of clues about how each node may (or may not!) be recognized by assistive tech like screen readers or voice recognition software. And for whatever the tree can’t reveal, keyboard testing can fill in some of the gaps. 

Of course, no tool is perfect, and the accessibility tree does have its limitations. It’s important that we remind developers of them as well. So, what exactly does this approach entail? 

## Build a Genuine Button with a `<button>`

```html
<button type="button" class="button one">
    Change Color ONE
</button>
```

```javascript
function changeColor(event) {
    const element = event.currentTarget; 
    const currentColor = getComputedStyle(element).backgroundColor;
    element.style.backgroundColor = currentColor === 'rgb(0, 128, 0)' ? 'rgb(58, 58, 242)' : 'rgb(0, 128, 0)';
}

const buttonOne = document.querySelector('.button.one');
buttonOne.addEventListener('click', changeColor);
```

First, we create a genuine button using the `<button>` tag, and then examine how it appears in the accessibility tree. We focus on the attributes and properties exposed for this node, discussing what each one means in terms of interaction with assistive technologies. At every step, we also test with a keyboard.

Note: I regularly work on a Windows computer and am familiar with the accessibility tree in both Firefox and Chromium browsers. For this exercise, I’ll mostly use Firefox since it offers some clues about the shortcomings of fake buttons.

<img src="./images/Firefox-SemanticButton.jpg" alt="accessibility tree within Firefox's developer tools, highlighting the properties of a button element built with a button tag" width="500" aspect-ratio="658/693" loading="lazy">

So, what is the view from the accessibility tree revealing?

- The node has the role `button`, which comes with some privileges: it will be announced as a button by a screen reader, and since buttons support name from content, its text becomes its `accessible name`. So, a screen reader will announce it as `Change Color ONE, button`. Users relying on voice recognition software can activate it by voice command, such as saying `Click Change Color One`.
<!-- SS: Based on the code example and the image, won't it announce `Change color ONE, button` ? Maybe you can update the code example to change the text to Theme Toggle or vice versa? -->
<!-- CM: Thank you SS! -->

- The `states` array shows that the button is focusable, so we know we can reach it via the `tab` key. 

But where does the keyboard come in? It helps us confirm the `focusable` property by allowing us to navigate to the button with the `tab` key. Plus, it confirms that we can activate the button using the `Enter` key or the `Space` bar, another built-in perk of genuine buttons that is not immediately obvious from the accessibility tree.

Next step: build a fake button.

## Build a Fake Button with a `<div>`
```html
<div class="button two">
    Change Color TWO
</div>
```

```javascript
const buttonTwo = document.querySelector('.button.two');
buttonTwo.addEventListener('click', changeColor);
```

We simply attach a click event to a `div`, and with nearly the same CSS as we’d use for a genuine button, we create something a sighted user will recognize as a button.

Here’s the view from Firefox’s accessibility tree:

<img src="./images/Firefox-FakeButtonNotFixed.jpg" alt="accessibility tree within Firefox's developer tools, highlighting the properties of a div element used as a button" width="500" aspect-ratio="660/729" loading="lazy">

What should we be looking or testing for? The same attributes and behaviors we found for the genuine button:
- role, 
- name, 
- focusable property, and 
- keydown and keyup events. 

The node’s role defaults to `generic` since the building block is a `div`. It also remains unnamed because generic nodes don’t have naming privileges, despite containing text. Keyboard users will not reach it, let alone activate it, and we don’t even have to test with a keyboard to prove it. We simply notice that the `states` array does not list the `focusable` property.

Once we make it focusable by adding a `tabindex="0"` we notice something else: we can't activate it with the `Enter` key or the `Space` bar. Is this lack of functionality reflected in the accessibility tree as well? Sort of. The genuine button lists a `Press` event under the `actions` property, while the fake button only shows `Click`. But more on that later.

Firefox is also explicitly warning us about the lack of focus and "interactive semantics", and it's connecting us to MDN for more information. So, what are we still missing? We need:
- a `keydown` event for activation via `Enter`,
- a `keyup` event for activation via `Space`, and
- a `button` role to have it announced properly by screen readers, and also to assign it a name based on its content.

Here's what the HTML would look like with all the additions:

```html
<div class="button two" role="button" tabindex="0">
    Change color TWO
</div>
```

while the JavaScript would have to include the following as well:
```javascript
buttonTwo.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        changeColor(event);
    }
});

buttonTwo.addEventListener('keyup', function(event) {
    if (event.key === ' ') {
        event.preventDefault();
        changeColor(event);
    }
});
```
<!-- MM: Cool, I didn't know that `event.key === ' '` worked -->
<!-- MM: Is "or" valid JS? -->
<!-- MM: Shouldn't it say changeColor(event);? Did you test this code? -->
<!-- MM: That would create a different behavior compared to the native button. A native <button> fires on key down when Enter is pressed and on key up when Space is pressed -->
<!-- CM: Many apologies for the extra headache. I went through several iterations of the code examples, and I guess in the end I managed to produce a very eclectic code salad -->
<!-- CM: Thank you so much MM, I did not know that Space triggers a button on keyup. -->

For developers it might seem tempting to add these missing features one by one. The advice, of course, is that the simpler and more robust solution is to replace the `<div>` with a `<button>`. However, for the sake of exploring what the accessibility tree reveals — or fails to! — and the importantce of manual testing, we’ll go ahead and add all the necessary code to make this `div` fully functional.

## The Accessibility Tree Can Only Do So Much

Is the retrofitted `div` recognized as a button now? Yes. It has the role `button`, it has a name, and it's focusable.

<!-- updated -->
<img src="./images/Firefox-FakeButtonFixed.jpg" alt="accessibility tree within Firefox's developer tools, highlighting the properties of button built with a div tag" width="500" aspect-ratio="658/693" loading="lazy">

Is the retrofitted button's tree view different in any way from the one of the genuine button? Yes again.

First, the `DOMNode` property reminds us that we started with a div. Next, something curious happens within the `actions` array.
<!-- MM: But that's not a shortcoming of Firefox. If you disable it (`user-select: none;`) it behaves like the native button and the property goes away. -->
<!-- CM: Thank you MM! I removed the sentence re: selectable property. It wasn't meant as a critique, but just to highlight the difference between the two. -->

Since we’ve added the `keydown` and `keyup` events we would not expect any differences between the `actions` arrays of the two buttons, right? Wrong. The updated view still shows `Click` instead of `Press`. It seems that manually adding the keyboard events does not change the action keyword. But is this a Firefox oversight, or just a subtle dig at fake buttons? Just kidding! 

It's worth noting that the Chromium browsers also take the approach of differentiating between the two buttons. They do not display this information as part of the accessibility tree, but separately, under the `Event Listeners` tab in DevTools. For the genuine button, their keyword of choice is `click` and not `Press`, but then, just like Firefox, they treat the div button differently. When keyboard events are explicitly added, Chromium’s event listeners include `click` along with `keydown` and `keyup`. 
<!-- MM: just a reminder to change this accordingly because we don't just have key down but key up events, too -->
<!-- MM: I'd love to know the difference between Click and Press. I asked a friend at Firefox: https://front-end.social/@matuzo/113473891024615301 If he replies, you may be able to add more info. -->
<!-- CM: Manuel, I'm keeping an eye on that conv and happy to update if we have an asnwer before the deadline. I have myself tried -->

<img src="./images/Chrome-FakeButtonFixedEvents.jpg" alt="accessibility tree within Chrome's developer tools, highlighting a button built with a div tag. Click, keydown and keyup are listed under event listeners" width="500" aspect-ratio="670/258" loading="lazy">

The Chromium behavior makes sense: when we attach a click handler to a native button, it automatically works for all input methods (mouse, touch, keyboard). That's why it only shows one `click` listener linking to one particular function. For the div button, since we manually added separate keyboard handlers, DevTools shows links to all three function implementations - one for click and two for keyboard events.

But enough nerding over keywords and browser inconsistencies, as interesting as this detective work might be. The point to make is that on keyboard interactions the browsers send mixed signals, and that testing, in this case keyboard testing, is irreplaceable. (Is this my subtle way of turning your attention away from the fact that I don't have (yet!) an explanation about these inconsistencies? Totally! I've spent time poking around the Firefox and Chromium codebases, but so far the answer remains a mystery.)

Let's end with a keyboard interaction anomaly that only keyboard testing could reveal: while theoretically both buttons are now fitted with proper keyboard support, there's an important difference in how they handle the `keyup` event. The benefit of a `keyup` event is that the user can cancel the action on a button. They can press `Space`, change their mind, move focus away with `Tab`, and release `Space` without triggering the button. When we build our own button from a div, we need extra code to track whether the `Space` key was initially pressed while focused on that button. Without this check, it would incorrectly activate when receiving focus while `Space` is being released, even if `Space` was originally pressed on a different element. And while we add more code to our creation, the browsers will, of course, take good care of the genuine button and gracefully ignore Space keyup events that don't belong to it. 
<!-- CM: optional paragraph. Not sure if this anomaly is real or just a symptom of the code I used to implement the keyup event. A CodePen to test: https://codepen.io/Cor-Ina/pen/OPLJYry -->

### Takeaways for Developers

1. Semantic HTML is powerful. Always consider it first.

2. No tool is perfect, and the accessibility tree and the DevTools in general are no exception. Testing is key. In our particular case, testing with the keyboard is enough, but in other scenarios testing with a screen reader will be necessary. In general, accessibility requires a holistic approach and that we select tools and tests based on the specific functionality we are assessing.

## Wrapping Up

Does this approach work? At the minimum, it introduces developers to the accessibility tree and reinforces the usefulness of a familiar tool, the ubiquitous keyboard. If it ends with "Now I know I shouldn't just add a click event to a div" then yes, it does work. 

From experience, it can sometimes make developers nervous about their ability to choose the right tools or worry about overlooking crucial details. This is still a win. It shows that they care. If you've had any accessibility mishaps in your past, this might be actually a good moment to reveal them, and prove that progress is possible. If you've had none, feel free to use one of mine: before I started using screen readers, I used to add a `tabindex` to headings. 

What should we encourage developers to focus on, no matter their initial reaction? Know their HTML, consider the needs of different types of users, lean into testing. And ask questions.

<!-- MM: Sorry to say that, but I guess this entire chapter needs to be replaced or removed. -->
<!-- CM: No problem at all. Removed!-->
