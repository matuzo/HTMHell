---
title: "My favourite colour is Chuck Norris red"
layout: layouts/advent.md
author: "Declan Chidlow"
author_bio: "Front-end developer, designer, dabbler, and avid user of the superpowered information superhighway."
date: 2024-12-22
author_links:
  - label: "Website"
    url: "https://vale.rocks"
    link_label: "vale.rocks"
  - label: "Fediverse"
    url: "https://fedi.vale.rocks/vale"
    link_label: "@vale@fedi.vale.rocks"
  - label: "Bluesky"
    url: "https://bsky.app/profile/vale.rocks"
    link_label: "@vale.rocks"
active: true
intro: "<p>An exploration of how legacy HTML color parsing turns random text like 'chucknorris' into valid colours through a fascinating series of cleanup rules and character replacements.</p>"
image: "advent_22"
---
<!-- MM: That's soooo interesting. I love it! The only thing I'd request is that you link to a source for the parsing rules.  -->
<!-- SS: Great article! I think some links for the parsing rules have been added in the end of the article. -->

Setting the colour of text on a webpage is usually a simple affair involving whipping it out the good ol' CSS `color` property. But this is HTMHell, dammit. None of that wishy-washy CSS nonsense here. No siree. We use HTML as the good lord intended and shalln't stray into the sins of cascading sheets lest we end up some non-HTML variant of hell where they define page structure with JavaScript vars.

But HTML isn't great for defining styles -- or at least, it isn't anymore. If we wind back the clocks a few years to HTML versions of old, we find the colour attribute. If you've been around for a while, you've no doubt seen it. Something like this:


```html
<font color="#d72b2b">HTMHell rules!</font>
```

<font color="#d72b2b">HTMHell rules!</font>

If we render that in a browser, we get some text in the lovely HTMHell red. That's great. That's what we'd expect. Next we'll choose another colour. Something a bit different. Let's try 'chucknorris'.

```html
<font color="chucknorris">But... Chuck Norris isn't a colour.</font>
```

<font color="chucknorris">But... Chuck Norris isn't a colour.</font>

If you go through the effort of loading _that_ up in a browser, you might notice it makes the text red. Why?

## Some funny character parsing

HTML generally doesn't have an error state, at least not one akin to what would happen if writing something like invalid JavaScript. Browsers are very forgiving when parsing HTML (which explains how people have gotten away with the crimes documented throughout this website) and generally do their best to make up for user error. If you leave a dangling `<div>`, the browser will do its best to close it up and render it out.

This forgiveness is the reason behind the funkiness. Browsers simply try to forge ahead with the invalid value and hope it'll work. The specific parsing works like this:

1. Initial Cleanup:

   - If an octothorpe (#) is located at the start of the value, it's removed.
   - The color attribute only accepts hexes, so there isn't a point keeping it.
   - Example: "#FF0000" becomes "FF0000".

2. Replace Invalid Characters:

   - Any non-hexadecimal characters (anything not 0-9 or A-F/a-f) are removed and replaced with '0'.
   - Example: 'abcxyz123' becomes 'abc000123'.

3. Standardise Length:

   - While the string's length is 0 or not divisible by 3, append '0'.
   - Examples:
     - "F" becomes "F00" (padded to length 3).
     - "FFFF" becomes "FFFF00" (padded to length 6).
     - "FFFFFF0" becomes "FFFFFF000" (padded to length 9).

4. Split into Red, Green, and Blue:

   - The first third becomes the red value.
   - The second third becomes the green value.
   - The last third becomes the blue value.
   - Example: "FFFFFF000" becomes ["FFF", "FFF", "000"].

5. Handle Length:

   - If any component is longer than 8 characters, remove the characters from the left until it's 8 characters long.
     - Example: "123456789" → "23456789"
   - While the length is greater than 2, and all components start with '0', remove the leading '0' from each component.
     - Example: ["000F", "000F", "000F"] becomes ["00F", "00F", "00F"] which then becomes ["0F", "0F", "0F"].
   - If length is still greater then 2 keep only the first 2 characters of each component.
     - Example: ["ABC", "DEF", "123"] becomes ["AB", "DE", "12"].

6. Putting It Together:
   - Get the final red, blue, and green components, then put them together in that order to create the colour.
   - Example: ["AB", "DE", "12"] becomes ABDE12.

I've written a small tool over on CodePen that will take any inputted value, break down the processing step by step, and output the colour as it would be handled. Go have a bit of fiddle!

<p class="codepen" data-height="300" data-default-tab="result" data-slug-hash="yLmKBpN" data-pen-title="Legacy HTML Colour Parsing Demo" data-user="OuterVale" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/OuterVale/pen/yLmKBpN">
  Legacy HTML Colour Parsing Demo</a> by Declan Chidlow (<a href="https://codepen.io/OuterVale">@OuterVale</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

## Some fun examples

So, we know this happens and why. The next task is obviously to have some fun with it. Finding words whose computed colours correlate with them is great fun. For example, 'Sonic' gives us a lovely blue. I've put together a little table of some of these.

<p class="codepen" data-height="300" data-default-tab="result" data-slug-hash="wvLbjpZ" data-pen-title="Word Correlations With HTML Colour Parsing" data-user="OuterVale" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/OuterVale/pen/wvLbjpZ">
  Word Correlations With HTML Colour Parsing</a> by Declan Chidlow (<a href="https://codepen.io/OuterVale">@OuterVale</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

## Interesting parsing in the modern era

So, that's all well and good, but it's old news. The `color` and `bgcolor` attributes that permitted our parsing adventures are relics of HTML 4. They're obsolete (though still in active use on a disturbingly high number of websites). That isn't to say quirks like that have disappeared completely though. CSS has its own set of fascinating peculiarities when it comes to handling invalid colour values. Most modern browsers will clamp values rather than reject them outright -– throw rgb(300, -50, 1000) at a browser and it won't fail; it'll helpfully transform it into rgb(255, 0, 255).
<!-- SS: "though still in active use on a disturbingly high number of websites" --> Can you provide a link with some stats showing this? or this a general observation? -->

The web's foundational principle of forgiveness -– the inherent flexibility that allows "chucknorris" to be parsed as red, even though the reason it does so is old, silly, and unsupported –- hasn't gone anywhere. Modern browsers still bend over backward to make our code work, even when we throw nonsense at them. It doesn't take long to see this forgiveness in action within the cursed examples held within the pages of HTMHell. Each horrifying snippet, each questionable hack, each "it works but why" moment exists because browsers simply refuse to give up on rendering our 'mistakes'.

The web is built on this foundation of resilience, both in technology and [ethos](https://www.w3.org/blog/2022/a-letter-from-our-ceo-the-web-as-the-ultimate-tool-of-resilience-for-the-world). It's what allows a website from 1996 to still render in a modern browser. It's what lets a page load even when half the CSS is invalid. It's what makes it magic.

I've heard people quip that browsers should be less forgiving and enforce perfection. That allowing jank makes it somehow 'bad'. I think a perfect web would be a boring web. I certainly wouldn't be here writing about here were it 'perfect'. It's about making the web work, no matter what we throw at it, and I wouldn't have it any other way.

After all, in a perfect web, "chucknorris" would just be another error message -– and where's the fun in that?

## Resources

- [Sam's Place - A little rant about Microsoft Internet Explorer's color parsing](http://scrappy-do.blogspot.com/2004/08/little-rant-about-microsoft-internet.html)
- [HTML Standard](https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#rules-for-parsing-a-legacy-colour-value)
- [Why does HTML think "chucknorris" is a color?](https://stackoverflow.com/q/8318911)
