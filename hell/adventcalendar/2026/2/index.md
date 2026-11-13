---
title: "Accessible Fallback HTML for Canvas Elements"
author: "Rhiana Heppenstall"
author_bio: "Rhiana Heppenstall is a Software Engineer, Accessibility Lead at 3P learning, specialising in making web sites and applications accessible for people with disabilities. Combining her background in educational psychology and a love of computers she prides herself in developing software that is a delight for users and fellow developers alike. She has spoken and given workshops to businesses, at meetups and conferences around Australia, as she is a big advocate for professional development. Based in Melbourne when she isn't working she's going to the latest festival, museum or zoo with her two children. "
date: 2026-12-02
author_links:
  - label: "Site"
    url: "https://rhiana.github.io/"
    link_label: "Website"
intro: "<p>Using the HTML fallback feature in Canvas elements to improve accessibility of complex, interactive content.</p>"
image: "advent26_1"
active: true
---

## Canvas, the Good, the Bad and the Inaccessible
If you’re a parent (or primary school teacher) you’re probably familiar with Readingeggs. A colourful, engaging, learning to read program with ants that sing and dance. Activities range from tapping the correct letter, matching words with their pictures, reading books and answering quiz questions.

Back when it was being developed it was using Flash, which supported that fun, interactive mix of animations and activities. With the decline of Flash, especially for iOS apps, in 2010, the team quickly converted the hundreds and possibly thousands of activities and videos onto Canvas, an HTML element that can support this functionality. With it you are free to draw, add images, animations, sound effects and interactive elements. If developed today a combination of native HTML and JavaScript would be used instead, but it was not an option at the time.

Canvas elements, however, are not accessible to keyboards and screen readers. They are treated as blank images and are commonly used to draw pictures and diagrams on the web. You can add a basic description in a similar way to alt text, but that just wasn’t going to cut it for such detailed activities.

## The Fallback

Our accessibility team researched potential ways to make the activities more accessible and discovered that Canvas elements are designed to have fallback HTML in case they don’t load, which can be harnessed for accessibility. By having fallback HTML the screen reader can read out what’s on the screen. Interactive elements, such as links and buttons, can also be linked to images and text on the Canvas with JavaScript, to mimic that interactivity and add focus states when using a keyboard.

```html
<canvas>
  <h1>Activity Title</h1>
  <p>Instructions</p>
  <button>Press me!</button>
</canvas>
```

We set to work adding in fallback HTML to closely resemble what was on the screen. However we found that these are not traditional web pages, and do not resemble them in any way. How to match the components to the closest HTML element that makes sense? How to fill in the gaps when that wasn’t possible?

<p class="highlight"><strong>Note:</strong> Adding the HTML inside the Canvas was advised in the documentation, but we found it wasn't compatible with some browser screen reader combinations. Instead we tried adding it afterwards, which fixed the issue.</p>

```html
<canvas>
</canvas>
<h1>Activity Title</h1>
<p>Instructions</p>
<button>Press me!</button>
```

## Demo
[Lesson 3 Letter Grid](https://student-client.readingeggs.com/sample/lesson/3/7)

![A screenshot of the Letter Grid activity in readingeggs. Showing a topbar with progress, lives and an audio button. The Letter grid is a 6 by 6 grid with a variety of letters. It has a second progress bar on the side with a number of stars.](../../../images/advent2026/2/letter-grid.png)

## The HTML
### Top Bar
![A screenshot of the topbar with progress, lives and an audio button.](../../../images/advent2026/2/top-bar.png)

The top bar is a new addition to help improve the accessibility, by creating a consistent navigation area with consistent icons and buttons to help students figure out what to do. For example, in the letter grid activity demo, it has their progress, their “lives” and a replay instruction audio button. It can also have a speed toggle to slow down activities that are timing dependent.

So how to best match up these visual elements with the HTML equivalent for screen readers and keyboard? If you have a look at the demo the HTML is roughly this:


```html
<h1>Letter grid</h1>
<header aria-label="Top Bar">
  <span>Round 2 of 2</span>
  <span aria-live="polite">2 lives remaining</span>
  <button>Play Instructions</button>
</header>
```
The `<h1>` here is to give context to the activity, it shows visually on the previous page which has the instructions, but not on the activity page itself. The WCAG guidelines stipulate the need to have an `<h1>` on each page, although it was hard to tell if it was needed here or if it would cause more confusion; the title of the activity is also found in the title of the page itself, so would it cause repetition? Some activities will have heading levels below this, so it does make it consistent across the lessons. We decided it’s best to have it here for now, but this may change in the future.

Next we have the top bar header landmark element. There aren’t any words in the top bar as this lesson is designed for preschool children who won’t necessarily be able to read yet. So we needed to figure out written fallback HTML that would be easily understood when read out loud by a screen reader. Simply having it read out “2/2” or “A heart with two green squares” or “speaker icon” would not give useful information to the student. Thinking about the meaning we had a simple span for “Round 2 out of 2” as this would be read out at the top of each question. We added the `aria-live="polite"` to the life counter so it would be announced when a life was lost from an incorrect guess, as this could happen at any point.

![A screenshot of the audio button with a custom keyboard focus outline.](../../../images/advent2026/2/focus-button.png)

Finally a button that replays the instructions that were given on the introduction page. Helpful for many an impatient child who clicks play before finishing reading the instructions. As buttons are operable by the keyboard, this HTML was also linked to the Canvas object with JavaScript, so when the HTML button is in keyboard focus a custom focus outline appears around the Canvas object, in a similar way a real button would in the browser. While I can’t share this code directly, here is a [demo example we used to get started by Paul J. Adam](https://pauljadam.com/demos/canvas.html).

### The Activity

![A screenshot of the first two rows of the letter grid.](../../../images/advent2026/2/letter-grid-two-rows.png)

Each activity starts the same way. With a named `<section>` to highlight this Canvas area as the activity itself, seperate to the top bar or any feedback HTML. This is followed by the activity instructions for the screen reader. These may be a bit more specific than what’s read out by the impatient-child button, for if the user is also hearing impaired this will allow them to use a braille reader to access the instructions, or for it to be read out more slowly using their preferred screen reader tool. Like the `<h1>` this does not match anything visual on the current page, but we can use the `aria-description` to give additional instructions to help sight-impaired students complete the activity.

```html
<section aria-label="Activity Content">
  <ul aria-label="Click on 'i'" aria-description="Find and select all the letters matching 'i'">
  ...
  </ul>
</section>
```

For the Letter Grid activity, we chose to mark-up the letters as HTML buttons inside an unordered list. This allows the keyboard user to tab between each letter and also the screen reader user to hear how many items are in the list. Each letter button has the `disabled` attribute added when selected correctly, so users can’t unselect the button, which mimics the existing visual and mouse usability.

```html
<li><button disabled="">i</button></li>
<li><button>o</button></li>
<li><button>o</button></li>
<li><button>r</button></li>
<li><button>j</button></li>
<li><button>g</button></li>
...
```

Like the audio button in the top bar, custom focus styles were added to the letter buttons to make sure the keyboard focus was always visible:

![A screenshot of a letter button with a custom keyboard focus outline.](../../../images/advent2026/2/focus-letter.png)

### The Feedback
If the child selects the wrong answer a “wrong” sound is played and the life counter goes down. In addition a hidden error message is read out, giving them more information like this:

```html
<div aria-live="polite" aria-atomic="true">"l" is incorrect. Try again.</div>
```

Lastly this activity has a track counter to show you how many letters you have left to find:

![A screenshot of the star tracker chart. One is on and one is off](../../../images/advent2026/2/star-counter.png)

One option here would be to have separate image tags for each star, but this was determined to be a bit challenging as the user would have to count them one by one. Instead we added in a description of what the images were conveying, which was how many letters they had found and how many they had left.

```html
<span aria-description="Scoreboard">2 out of 6 found.</span>
```

## Up for Debate

When it comes to adding in screen reader specific text it is important to find a useful balance so as not to overwhelem the screen reader user, but also give them the information they need to complete the task. To make sure it matched the intent of the visuals of the activity, as well as adding extra context for screen reader users at an age appropriate level. It may require user testing and tweaking in the future to achieve the correct balance.

Another consideration that came up with a few lessons were around punctuation and character case, as users may have to pick a letter of the right case or the correct punctuation mark. In this case should we write the letter and the case or the full name of the punctuation? e.g. “Lower case i”, “Upper case I”, “full stop”, “exclamation mark”. We chose not to do this, as it was discovered in the screen readers that were tested, such as Voice Over, there are settings where the screen reader reads out and describes each character individually, which would solve this issue natively.

For some lessons, there was also the consideration of focus order. Generally in a web page you want a focus order that matches the reading order, in our case this is left to right, up to down. What about a grid where the content goes in two directions? Should the user be able to tab through it or use the arrow keys to navigate in two directions? For some pages we have implemented arrow key support as well as tab to more closely match the content, but are mindful that custom keypress controls may not be intuitive to users and may confuse screen readers.

Lastly, the question of what HTML fallback would be best for the main activity content? Our activities are technically questions and answers, so would `<form>` elements be best, with `<legend>`'s, `<input>`'s and submit `<button>`'s? This is what the WCAG guidelines recommend, however this solution did not match the exisiting visual UX, where the student presses a button and the question is automatically submitted. It is here where we rememeber, that this is an activity for children as young as 4, not adults filling in their tax returns. So keeping the exisiting, more simple UX was chosen, and the HTML to represent this was changed to `<button>`'s, with screen reader instructions letting them know that pressing a button will submit their answer. `aria-live` attributes were added to the feedback HTML elements to annouce the screen readers users progress through the activity, without disrupting their position. This may violate the WCAG guidelines technically, but not in spirit as it provides a better user experience.

## In Conclusion

One of the priorities for adding in the HTML fallback for the Canvas activities was to keep the best of both worlds, keeping our existing interactive content, but adding in hooks for screen readers and keyboard. This has been a huge step forward for making our program more accessible, but still has some limitations and questions. As you can see even one activity out of hundreds can raise many questions and debates about how to best represent the HTML for the user.

This is a really tough balance to find, while we have tested it out on screen readers ourselves next steps here would be some user testing with native screen reader users, preferably in the younger age range. To make sure we meet not only the check points of the WCAG, but make something that would make a meaningful difference to a young users' educational experience.

